import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq, and, desc, like } from "drizzle-orm";
import { hashPassword, verifyPassword, signJWT, verifyJWT } from "./lib/auth";
import { createDb } from "./db";
import {
  pages, products, news, users,
  pageVersions, media, mediaFolders,
  productCategories, services as servicesTable,
  teamCategories, teamMembers, branches,
  rateCategories, rates, newsCategories,
  events, noticeCategories, notices,
  reportCategories, reports, albums, galleryImages,
  downloadCategories, downloads, faqCategories, faqs,
  jobListings, jobApplications,
  contactSubmissions, loanEnquiries, newsletterSubscribers,
  auctionNotices, merchantOffers, siteSettings,
} from "./db/schema";

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
  R2_DOCUMENTS: R2Bucket;
  EMAIL_QUEUE: Queue<unknown>;
  SITE_URL: string;
  ADMIN_EMAIL: string;
  FROM_EMAIL: string;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

// ── Health ──
app.get("/api/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── Auth Middleware ──
async function requireAuth(c: any, next: any) {
  const auth = c.req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return c.json({ error: "Unauthorized" }, 401);
  const token = auth.slice(7);
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ error: "Unauthorized" }, 401);
  c.set("user", payload);
  await next();
}

// ── Public API ──

app.get("/api/pages", async (c) => {
  const db = createDb(c.env.DB);
  const lang = c.req.query("lang") || "en";
  const result = await db
    .select()
    .from(pages)
    .where(and(eq(pages.status, "published"), eq(pages.language, lang)))
    .all();
  return c.json(result);
});

app.get("/api/pages/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const result = await db
    .select()
    .from(pages)
    .where(and(eq(pages.slug, slug), eq(pages.status, "published")))
    .get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.get("/api/homepage", async (c) => {
  const db = createDb(c.env.DB);
  const [productsResult, servicesResult, featuredNews] = await Promise.all([
    db.select().from(products).where(eq(products.status, "published")).limit(6).all(),
    db.select().from(servicesTable).where(eq(servicesTable.status, "published")).all(),
    db.select().from(news).where(eq(news.isFeatured, true)).orderBy(desc(news.publishedAt)).limit(4).all(),
  ]);
  return c.json({ products: productsResult, services: servicesResult, featuredNews });
});

// ── CMS Auth ──
app.post("/api/cms/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json() as { email: string; password: string };
    if (!email || !password) return c.json({ error: "Email and password required" }, 400);
    const db = createDb(c.env.DB);
    const user = await db.select().from(users).where(eq(users.email, email)).get();
    if (!user) return c.json({ error: "Invalid credentials" }, 401);
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return c.json({ error: "Invalid credentials" }, 401);
    const token = await signJWT(
      { sub: user.id.toString(), email: user.email, role: "admin" },
      c.env.JWT_SECRET
    );
    return c.json({
      token,
      user: { id: user.id.toString(), email: user.email, name: user.name, role: "admin" },
    });
  } catch (err) {
    return c.json({ error: "Internal server error", details: String(err) }, 500);
  }
});

app.post("/api/cms/auth/seed", async (c) => {
  try {
    const db = createDb(c.env.DB);
    const existing = await db.select().from(users).limit(1).all();
    if (existing.length > 0) return c.json({ error: "Already seeded" }, 400);
    const { email, password, name } = await c.req.json() as { email: string; password: string; name: string };
    if (!email || !password || !name) return c.json({ error: "email, password, name required" }, 400);
    const hashed = await hashPassword(password);
    const result = await db.insert(users).values({ name, email, passwordHash: hashed }).returning().get();
    const token = await signJWT({ sub: result.id.toString(), email, role: "admin" }, c.env.JWT_SECRET);
    return c.json({ token, user: { id: result.id.toString(), email, name, role: "admin" } }, 201);
  } catch (err) {
    return c.json({ error: "Seed failed", details: String(err) }, 500);
  }
});

// Protect all /api/cms/* routes except auth (defined above)
app.use("/api/cms/*", requireAuth);

// ── CMS: Pages CRUD ──

app.get("/api/cms/pages", async (c) => {
  const db = createDb(c.env.DB);
  const status = c.req.query("status");
  const lang = c.req.query("lang") || "en";
  const conditions = [eq(pages.language, lang)];
  if (status) conditions.push(eq(pages.status, status));
  const result = await db.select().from(pages).where(and(...conditions)).orderBy(desc(pages.updatedAt)).all();
  return c.json(result);
});

app.get("/api/cms/pages/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const result = await db.select().from(pages).where(eq(pages.id, id)).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.post("/api/cms/pages", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  const result = await db.insert(pages).values({
    slug: data.slug,
    title: data.title,
    content: data.content || null,
    bannerImage: data.bannerImage || null,
    language: data.language || "en",
    parentId: data.parentId || null,
    template: data.template || "default",
    metaTitle: data.metaTitle || null,
    metaDescription: data.metaDescription || null,
    status: data.status || "draft",
    sortOrder: data.sortOrder || 0,
    createdBy: 1,
  }).returning().get();
  return c.json(result, 201);
});

app.put("/api/cms/pages/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;

  // Save version before updating
  const existing = await db.select().from(pages).where(eq(pages.id, id)).get();
  if (existing) {
    const versions = await db.select().from(pageVersions).where(eq(pageVersions.pageId, id)).all();
    await db.insert(pageVersions).values({
      pageId: id,
      content: {
        title: existing.title,
        content: existing.content,
        metaTitle: existing.metaTitle,
        metaDescription: existing.metaDescription,
        status: existing.status,
      },
      versionNumber: versions.length + 1,
      createdBy: 1,
    }).run();
  }

  await db.update(pages).set({
    slug: data.slug,
    title: data.title,
    content: data.content,
    bannerImage: data.bannerImage,
    language: data.language,
    parentId: data.parentId,
    template: data.template,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    status: data.status,
    sortOrder: data.sortOrder,
    updatedAt: new Date().toISOString(),
  }).where(eq(pages.id, id)).run();

  const updated = await db.select().from(pages).where(eq(pages.id, id)).get();
  return c.json(updated);
});

app.delete("/api/cms/pages/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(pages).where(eq(pages.id, id)).run();
  return c.json({ success: true });
});

app.get("/api/cms/pages/:id/versions", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const result = await db.select().from(pageVersions).where(eq(pageVersions.pageId, id)).orderBy(desc(pageVersions.versionNumber)).all();
  return c.json(result);
});

// ── CMS: Media ──

app.get("/api/cms/media", async (c) => {
  const db = createDb(c.env.DB);
  const folderId = c.req.query("folder") ? parseInt(c.req.query("folder")!) : undefined;
  const conditions = folderId ? [eq(media.folderId, folderId)] : [];
  const result = await db.select().from(media).where(and(...conditions)).orderBy(desc(media.createdAt)).all();
  return c.json(result);
});

app.get("/api/cms/media/folders", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(mediaFolders).all();
  return c.json(result);
});

app.post("/api/cms/media/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as unknown as File;
    const folderId = formData.get("folderId") ? parseInt(formData.get("folderId") as string) : null;

    if (!file) return c.json({ error: "No file provided" }, 400);

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const buffer = await file.arrayBuffer();

    await c.env.R2.put(filename, buffer, {
      httpMetadata: { contentType: file.type },
    });

    const db = createDb(c.env.DB);
    const result = await db.insert(media).values({
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: `${c.env.SITE_URL}/api/media/${filename}`,
      folderId,
      uploadedBy: 1,
    }).returning().get();

    return c.json(result, 201);
  } catch (err) {
    return c.json({ error: "Upload failed", details: String(err) }, 500);
  }
});

app.delete("/api/cms/media/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const item = await db.select().from(media).where(eq(media.id, id)).get();
  if (item) {
    await c.env.R2.delete(item.filename);
    await db.delete(media).where(eq(media.id, id)).run();
  }
  return c.json({ success: true });
});

// ── CMS: CRUD Generator ──
function crud(table: any, basePath: string, tableName?: string) {
  const name = tableName || basePath.split("/").pop()!;
  // List
  app.get(`/api/cms/${basePath}`, async (c) => {
    const db = createDb(c.env.DB);
    try {
      const result = await db.select().from(table).orderBy(desc(table.id)).all();
      return c.json(result);
    } catch {
      const result = await db.select().from(table).all();
      return c.json(result);
    }
  });
  // Get one
  app.get(`/api/cms/${basePath}/:id`, async (c) => {
    const db = createDb(c.env.DB);
    const id = parseInt(c.req.param("id"));
    const result = await db.select().from(table).where(eq(table.id, id)).get();
    if (!result) return c.json({ error: "Not found" }, 404);
    return c.json(result);
  });
  // Create
  app.post(`/api/cms/${basePath}`, async (c) => {
    const db = createDb(c.env.DB);
    const data = await c.req.json();
    const result = await db.insert(table).values({ ...data, createdBy: 1 }).returning().get();
    return c.json(result, 201);
  });
  // Update
  app.put(`/api/cms/${basePath}/:id`, async (c) => {
    const db = createDb(c.env.DB);
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    await db.update(table).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(table.id, id)).run();
    const updated = await db.select().from(table).where(eq(table.id, id)).get();
    return c.json(updated);
  });
  // Delete
  app.delete(`/api/cms/${basePath}/:id`, async (c) => {
    const db = createDb(c.env.DB);
    const id = parseInt(c.req.param("id"));
    await db.delete(table).where(eq(table.id, id)).run();
    return c.json({ success: true });
  });
}

// ── CMS: Dashboard Stats ──
app.get("/api/cms/dashboard/stats", async (c) => {
  const db = createDb(c.env.DB);
  const [pageCount, productCount, svcCount, newsCount, mediaCount, teamCount, branchCount] = await Promise.all([
    db.select({ count: pages.id }).from(pages).all(),
    db.select({ count: products.id }).from(products).all(),
    db.select({ count: servicesTable.id }).from(servicesTable).all(),
    db.select({ count: news.id }).from(news).all(),
    db.select({ count: media.id }).from(media).all(),
    db.select({ count: teamMembers.id }).from(teamMembers).all(),
    db.select({ count: branches.id }).from(branches).all(),
  ]);
  return c.json({
    pages: pageCount.length, products: productCount.length, services: svcCount.length,
    news: newsCount.length, media: mediaCount.length, team: teamCount.length, branches: branchCount.length,
  });
});

// ── CMS: All Resource Routes ──
// Format: crud(table, "url-path")
crud(productCategories, "product-categories");
crud(products, "products");
crud(servicesTable, "services");
crud(teamCategories, "team-categories");
crud(teamMembers, "team-members");
crud(branches, "branches");
crud(rateCategories, "rate-categories");
crud(rates, "rates");
crud(newsCategories, "news-categories");
crud(news, "news");
crud(events, "events");
crud(noticeCategories, "notice-categories");
crud(notices, "notices");
crud(reportCategories, "report-categories");
crud(reports, "reports");
crud(albums, "albums");
crud(galleryImages, "gallery-images");
crud(downloadCategories, "download-categories");
crud(downloads, "downloads");
crud(faqCategories, "faq-categories");
crud(faqs, "faq");
crud(jobListings, "careers");
crud(jobApplications, "job-applications");
crud(contactSubmissions, "contact-submissions");
crud(loanEnquiries, "loan-enquiries");
crud(newsletterSubscribers, "newsletter");
crud(auctionNotices, "auctions");
crud(merchantOffers, "merchants");
crud(siteSettings, "settings");

// ── Search ──
app.get("/api/search", async (c) => {
  const q = c.req.query("q");
  if (!q) return c.json([]);
  const db = createDb(c.env.DB);
  const [pageResults, newsResults, productResults] = await Promise.all([
    db.select({ title: pages.title, slug: pages.slug }).from(pages).where(and(eq(pages.status, "published"), like(pages.title, `%${q}%`))).limit(5).all(),
    db.select({ title: news.title, slug: news.slug }).from(news).where(like(news.title, `%${q}%`)).limit(5).all(),
    db.select({ title: products.title, slug: products.slug }).from(products).where(like(products.title, `%${q}%`)).limit(5).all(),
  ]);
  return c.json([
    ...pageResults.map(r => ({ ...r, type: "page" as const })),
    ...newsResults.map(r => ({ ...r, type: "news" as const })),
    ...productResults.map(r => ({ ...r, type: "product" as const })),
  ]);
});

export default app;

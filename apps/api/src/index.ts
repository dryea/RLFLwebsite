import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq, and, desc, like, sql } from "drizzle-orm";
import { hashPassword, verifyPassword, signJWT, verifyJWT } from "./lib/auth";
import { contactConfirmation, contactNotification, loanEnquiryNotification, jobApplicationNotification } from "./lib/email";
import { createDb } from "./db";
import {
  pages, products, news, users, roles,
  pageVersions, media, mediaFolders,
  productCategories, services as servicesTable,
  teamCategories, teamMembers, branches,
  rateCategories, rates, newsCategories,
  events, noticeCategories, notices,
  reportCategories, reports, albums, galleryImages,
  downloadCategories, downloads, faqCategories, faqs,
  jobListings, jobApplications,
  contactSubmissions, loanEnquiries, newsletterSubscribers,
  auctionNotices, merchantOffers, siteSettings, calendarEvents,
  heroSlides, offeringCards, offeringLinks, siteStats, appBanner, csrActivities,
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

app.use("/*", cors({
  origin: ["https://reliancenepal.com.np", "https://www.reliancenepal.com.np", "https://rfil-web.sudeepdhakal.workers.dev", "http://localhost:3000"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// ── Simple rate limiter (per-IP, in-memory) ──
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 100; // requests per window per IP
const RATE_WINDOW = 60_000; // 1 minute

app.use("/api/*", async (c, next) => {
  const ip = c.req.header("CF-Connecting-IP") || c.req.header("x-forwarded-for") || "unknown";
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
  } else {
    entry.count += 1;
    if (entry.count > RATE_LIMIT) {
      return c.json({ error: "Too many requests", retryAfter: Math.ceil((entry.resetAt - now) / 1000) }, 429);
    }
  }
  await next();
});

// ── Health ──
app.get("/api/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── Media Serving ──
app.get("/api/media/:filename", async (c) => {
  try {
    const filename = c.req.param("filename");
    const obj = await c.env.R2.get(filename);
    if (!obj) return c.json({ error: "Not found" }, 404);
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    return new Response(obj.body, { headers });
  } catch { return c.json({ error: "Not found" }, 404); }
});

app.get("/api/documents/:filename", async (c) => {
  try {
    const filename = c.req.param("filename");
    const obj = await c.env.R2_DOCUMENTS.get(filename);
    if (!obj) return c.json({ error: "Not found" }, 404);
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    return new Response(obj.body, { headers });
  } catch { return c.json({ error: "Not found" }, 404); }
});

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

// Permission middleware factory
function requirePermission(resource: string, action: string) {
  return async function(c: any, next: any) {
    await requireAuth(c, async () => {
      const user = c.get("user");
      const db = createDb(c.env.DB);
      const userWithRole = await db.select({
        roleId: users.roleId,
        permissions: roles.permissions,
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.id, parseInt(user.sub)))
      .get();

      if (!userWithRole) return c.json({ error: "Forbidden" }, 403);

      if (user.role === "admin" || user.role === "super-admin") {
        await next();
        return;
      }

      const perms = userWithRole.permissions as Record<string, string[]> || {};
      const resourcePerms = perms[resource];
      if (!resourcePerms || !resourcePerms.includes(action)) {
        return c.json({ error: `Missing ${action} permission on ${resource}` }, 403);
      }
      await next();
    });
  };
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

// ── Homepage: CMS-managed content ──

app.get("/api/homepage/full", async (c) => {
  const db = createDb(c.env.DB);
  const [
    slidesResult,
    offeringsResult,
    statsResult,
    bannerResult,
    csrResult,
  ] = await Promise.all([
    db.select().from(heroSlides).where(eq(heroSlides.isActive, true)).orderBy(heroSlides.sortOrder).all(),
    db.select().from(offeringCards).where(eq(offeringCards.isActive, true)).orderBy(offeringCards.sortOrder).all(),
    db.select().from(siteStats).where(eq(siteStats.isActive, true)).orderBy(siteStats.sortOrder).all(),
    db.select().from(appBanner).where(eq(appBanner.isActive, true)).limit(1).all(),
    db.select().from(csrActivities).where(eq(csrActivities.isActive, true)).orderBy(csrActivities.sortOrder).limit(6).all(),
  ]);

  // Fetch offering links for each card
  const offeringLinksPromises = offeringsResult.map(async (card) => {
    const links = await db.select().from(offeringLinks).where(eq(offeringLinks.cardId, card.id)).orderBy(offeringLinks.sortOrder).all();
    return { ...card, links };
  });
  const offeringsWithLinks = await Promise.all(offeringLinksPromises);

  return c.json({
    slides: slidesResult,
    offerings: offeringsWithLinks,
    stats: statsResult,
    appBanner: bannerResult[0] || null,
    csrActivities: csrResult,
  });
});

// ── Public Content Endpoints ──

app.get("/api/news", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(news).where(eq(news.status, "published")).orderBy(desc(news.publishedAt)).all();
  return c.json(result);
});

app.get("/api/news/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const result = await db.select().from(news).where(and(eq(news.slug, slug), eq(news.status, "published"))).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.get("/api/events", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(events).orderBy(desc(events.eventDate)).all();
  return c.json(result);
});

app.get("/api/notices", async (c) => {
  const db = createDb(c.env.DB);
  const cat = c.req.query("category");
  const conditions = [eq(notices.status, "published")];
  if (cat) conditions.push(eq(notices.categoryId, parseInt(cat)));
  const result = await db.select().from(notices).where(and(...conditions)).orderBy(desc(notices.publishedDate)).all();
  return c.json(result);
});

app.get("/api/notices/categories", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(noticeCategories).all();
  return c.json(result);
});

app.get("/api/reports", async (c) => {
  const db = createDb(c.env.DB);
  const cat = c.req.query("category");
  const conditions = [eq(reports.status, "published")];
  if (cat) conditions.push(eq(reports.categoryId, parseInt(cat)));
  const result = await db.select().from(reports).where(and(...conditions)).orderBy(desc(reports.publishedAt)).all();
  return c.json(result);
});

app.get("/api/reports/categories", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(reportCategories).all();
  return c.json(result);
});

app.get("/api/services", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(servicesTable).where(eq(servicesTable.status, "published")).orderBy(servicesTable.sortOrder).all();
  return c.json(result);
});

app.get("/api/services/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const result = await db.select().from(servicesTable).where(and(eq(servicesTable.slug, slug), eq(servicesTable.status, "published"))).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.get("/api/products", async (c) => {
  const db = createDb(c.env.DB);
  const cat = c.req.query("category");
  const type = c.req.query("type");
  const conditions = [eq(products.status, "published")];
  if (cat) conditions.push(eq(products.categoryId, parseInt(cat)));
  if (type) conditions.push(eq(productCategories.type, type as any));
  const result = await db.select().from(products).where(and(...conditions)).orderBy(products.sortOrder).all();
  return c.json(result);
});

app.get("/api/products/categories", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(productCategories).where(eq(productCategories.isActive, true)).orderBy(productCategories.sortOrder).all();
  return c.json(result);
});

app.get("/api/products/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const result = await db.select().from(products).where(and(eq(products.slug, slug), eq(products.status, "published"))).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.get("/api/branches", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(branches).where(eq(branches.isActive, true)).orderBy(branches.sortOrder).all();
  return c.json(result);
});

app.get("/api/team/categories", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(teamCategories).orderBy(teamCategories.sortOrder).all();
  return c.json(result);
});

app.get("/api/team/:categorySlug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("categorySlug");
  const cat = await db.select().from(teamCategories).where(eq(teamCategories.slug, slug)).get();
  if (!cat) return c.json([]);
  const result = await db.select().from(teamMembers).where(and(eq(teamMembers.categoryId, cat.id), eq(teamMembers.isActive, true))).orderBy(teamMembers.sortOrder).all();
  return c.json(result);
});

app.get("/api/faq", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(faqs.sortOrder).all();
  return c.json(result);
});

app.get("/api/gallery/albums", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(albums).where(eq(albums.isActive, true)).orderBy(albums.sortOrder).all();
  return c.json(result);
});

app.get("/api/gallery/albums/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const album = await db.select().from(albums).where(and(eq(albums.slug, slug), eq(albums.isActive, true))).get();
  if (!album) return c.json({ error: "Not found" }, 404);
  const images = await db.select().from(galleryImages).where(eq(galleryImages.albumId, album.id)).orderBy(galleryImages.sortOrder).all();
  return c.json({ album, images });
});

app.get("/api/downloads", async (c) => {
  const db = createDb(c.env.DB);
  const cat = c.req.query("category");
  const conditions = [eq(downloads.isActive, true)];
  if (cat) conditions.push(eq(downloads.categoryId, parseInt(cat)));
  const result = await db.select().from(downloads).where(and(...conditions)).orderBy(downloads.sortOrder).all();
  return c.json(result);
});

app.get("/api/downloads/categories", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(downloadCategories).orderBy(downloadCategories.sortOrder).all();
  return c.json(result);
});

app.get("/api/careers", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(jobListings).where(eq(jobListings.status, "open")).all();
  return c.json(result);
});

app.get("/api/rates", async (c) => {
  const db = createDb(c.env.DB);
  const cat = c.req.query("category");
  const conditions = [eq(rates.status, "active")];
  if (cat) conditions.push(eq(rates.categoryId, parseInt(cat)));
  const result = await db.select().from(rates).where(and(...conditions)).all();
  return c.json(result);
});

app.get("/api/auctions", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(auctionNotices).where(eq(auctionNotices.status, "published")).all();
  return c.json(result);
});

app.get("/api/calendar/events", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(calendarEvents).orderBy(calendarEvents.adDate).limit(100).all();
  return c.json(result);
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

// ── CMS: Users & Roles ──

const allResources = ["pages", "products", "services", "team", "branches", "rates", "news", "events", "notices", "reports", "gallery", "downloads", "faq", "careers", "applications", "media", "users", "roles", "settings", "enquiries", "calendar", "auctions", "merchants"];

// Seed default roles if none exist
app.post("/api/cms/roles/seed", async (c) => {
  const db = createDb(c.env.DB);
  const existing = await db.select().from(roles).limit(1).all();
  if (existing.length > 0) return c.json({ error: "Already seeded" }, 400);

  const defaultRoles = [
    {
      name: "super-admin",
      description: "Full access to everything",
      permissions: allResources.reduce((acc, r) => ({ ...acc, [r]: ["create", "read", "update", "delete", "publish", "schedule"] }), {}),
    },
    {
      name: "admin",
      description: "All CRUD + publish + user management",
      permissions: allResources.reduce((acc, r) => ({ ...acc, [r]: ["create", "read", "update", "delete", "publish", "schedule"] }), {}),
    },
    {
      name: "editor",
      description: "CRUD + publish on content, no users/roles",
      permissions: Object.fromEntries(
        allResources.filter(r => !["users", "roles", "settings"].includes(r)).map(r => [r, ["create", "read", "update", "delete", "publish"]])
      ),
    },
    {
      name: "author",
      description: "Create + edit own content, cannot publish",
      permissions: Object.fromEntries(
        allResources.filter(r => !["users", "roles", "settings"].includes(r)).map(r => [r, ["create", "read", "update"]])
      ),
    },
  ];

  for (const role of defaultRoles) {
    await db.insert(roles).values(role).run();
  }
  return c.json({ success: true, count: defaultRoles.length });
});

// List roles
app.get("/api/cms/roles", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(roles).all();
  return c.json(result);
});

// CRUD for users
app.get("/api/cms/users", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select({
    id: users.id, name: users.name, email: users.email,
    roleId: users.roleId, isActive: users.isActive,
    createdAt: users.createdAt,
  }).from(users).all();
  return c.json(result);
});

app.get("/api/cms/users/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const result = await db.select({
    id: users.id, name: users.name, email: users.email,
    roleId: users.roleId, isActive: users.isActive,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.id, id)).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

app.post("/api/cms/users", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.name || !data.email || !data.password) return c.json({ error: "Name, email, password required" }, 400);
  const hashed = await hashPassword(data.password);
  const result = await db.insert(users).values({
    name: data.name, email: data.email, passwordHash: hashed,
    roleId: data.roleId || null, isActive: data.isActive !== false,
  }).returning().get();
  return c.json(result, 201);
});

app.put("/api/cms/users/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;
  const updateData: Record<string, any> = {
    name: data.name, email: data.email,
    roleId: data.roleId, isActive: data.isActive,
  };
  if (data.password) {
    updateData.passwordHash = await hashPassword(data.password);
  }
  await db.update(users).set(updateData).where(eq(users.id, id)).run();
  const updated = await db.select().from(users).where(eq(users.id, id)).get();
  return c.json(updated);
});

app.delete("/api/cms/users/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(users).where(eq(users.id, id)).run();
  return c.json({ success: true });
});

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
    titleNp: data.titleNp || null,
    content: data.content || null,
    contentNp: data.contentNp || null,
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
    titleNp: data.titleNp,
    content: data.content,
    contentNp: data.contentNp,
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

// Publish/schedule a page
app.post("/api/cms/pages/:id/publish", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const { scheduledAt } = await c.req.json() as { scheduledAt?: string } || {};
  
  const currentUser = (c as any).get("user");
  if (scheduledAt) {
    await db.update(pages).set({
      status: "scheduled",
      scheduledAt,
      updatedBy: parseInt(currentUser.sub),
    }).where(eq(pages.id, id)).run();
  } else {
    await db.update(pages).set({
      status: "published",
      publishedAt: new Date().toISOString(),
      scheduledAt: null,
      updatedBy: parseInt(currentUser.sub),
    }).where(eq(pages.id, id)).run();
  }
  const updated = await db.select().from(pages).where(eq(pages.id, id)).get();
  return c.json(updated);
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
crud(heroSlides, "hero-slides");
crud(offeringCards, "offering-cards");
crud(offeringLinks, "offering-links");
crud(siteStats, "site-stats");
crud(appBanner, "app-banner");
crud(csrActivities, "csr-activities");

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

// ── Email-enabled form submissions ──

app.post("/api/contact", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  const result = await db.insert(contactSubmissions).values({
    name: data.name, email: data.email, phone: data.phone || null,
    subject: data.subject, message: data.message,
  }).returning().get();

  try {
    await c.env.EMAIL_QUEUE.send([
      { to: data.email, subject: "Thank you for contacting Reliance Finance", html: contactConfirmation(data.name) },
      { to: c.env.ADMIN_EMAIL, subject: `New Contact: ${data.subject}`, html: contactNotification(data.name, data.email, data.phone || "", data.subject, data.message) },
    ]);
  } catch (e) { console.error("Email queue error:", e); }

  return c.json(result, 201);
});

app.post("/api/loan-enquiry", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  const result = await db.insert(loanEnquiries).values({
    name: data.name, address: data.address, phone: data.phone,
    email: data.email, nationality: data.nationality,
    customerProfile: data.customerProfile || null,
    loanType: data.loanType, proposedAmount: data.proposedAmount || null,
    preferredBranch: data.preferredBranch || null, remarks: data.remarks || null,
    consent: data.consent || false,
  }).returning().get();

  try {
    await c.env.EMAIL_QUEUE.send([
      { to: data.email, subject: "Loan Enquiry Received - Reliance Finance", html: `<p>Dear ${data.name},<br/>We have received your loan enquiry. Our team will contact you shortly.</p>` },
      { to: c.env.ADMIN_EMAIL, subject: `New Loan Enquiry from ${data.name}`, html: loanEnquiryNotification(data) },
    ]);
  } catch (e) { console.error("Email queue error:", e); }

  return c.json(result, 201);
});

app.post("/api/careers/apply", async (c) => {
  const db = createDb(c.env.DB);
  const formData = await c.req.formData();
  const data = {
    jobId: parseInt(formData.get("jobId") as string),
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string || null,
    coverLetter: formData.get("coverLetter") as string || null,
  };

  let cvUrl = "";
  const cvFile = formData.get("cv") as File | null;
  if (cvFile && cvFile.size > 0) {
    const filename = `cvs/${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const buffer = await cvFile.arrayBuffer();
    await c.env.R2_DOCUMENTS.put(filename, buffer, { httpMetadata: { contentType: cvFile.type } });
    cvUrl = `${c.env.SITE_URL}/api/documents/${filename}`;
  }

  const result = await db.insert(jobApplications).values({
    jobId: data.jobId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address || "",
    coverLetter: data.coverLetter || "",
    cvUrl,
  }).returning().get();

  try {
    const job = await db.select().from(jobListings).where(eq(jobListings.id, data.jobId)).get();
    await c.env.EMAIL_QUEUE.send([
      { to: data.email, subject: "Application Received - Reliance Finance", html: `<p>Dear ${data.name},<br/>Thank you for applying. We will review your application and contact you.</p>` },
      { to: c.env.ADMIN_EMAIL, subject: `New Job Application: ${job?.title || "Unknown"}`, html: jobApplicationNotification(data.name, data.email, data.phone, job?.title || "") },
    ]);
  } catch (e) { console.error("Email queue error:", e); }

  return c.json(result, 201);
});

// ── Cron Jobs ──

export default {
  fetch: app.fetch,
  async scheduled(event: any, env: any, ctx: any) {
    const db = createDb(env.DB);
    switch (event.cron) {
      case "0 0 * * *":
        await db.update(pages).set({ status: "published", publishedAt: new Date().toISOString() })
          .where(and(eq(pages.status, "scheduled"), sql`scheduled_at <= ${new Date().toISOString()}`)).run();
        break;
      case "0 2 * * *":
        // Daily backup of core content tables to R2
        try {
          const tables = ["pages", "products", "services", "news", "branches", "team_members",
            "rates", "notices", "reports", "faqs", "downloads", "albums", "gallery_images",
            "events", "job_listings", "contact_submissions", "loan_enquiries", "site_settings"];
          const backup: Record<string, unknown[]> = {};
          for (const table of tables) {
            const result = await env.DB.prepare(`SELECT * FROM ${table}`).all().catch(() => null);
            if (result && result.results) backup[table] = result.results;
          }
          const date = new Date().toISOString().slice(0, 10);
          await env.R2.put(`backups/${date}.json`, JSON.stringify(backup, null, 2), {
            httpMetadata: { contentType: "application/json" },
          });
          console.log(`Backup saved for ${date}`);
        } catch (err) {
          console.error("Backup failed:", err);
        }
        break;
    }
  },
};

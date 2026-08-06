import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq, and, desc, like, sql } from "drizzle-orm";
import { hashPassword, verifyPassword, signJWT, verifyJWT } from "./lib/auth";
import { contactConfirmation, contactNotification, loanEnquiryNotification, jobApplicationNotification, applicationStatusEmail } from "./lib/email";
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
  reviews, appointments, trainings,
  navigation, navigationItems,
  seoSettings, seoAnalysis, rankTracker, seoRedirects, schemaMarkup,
  analyticsEvents, accountApplications, loanApplications,
} from "./db/schema";
import { analyzeSeo, type SeoAnalyzerInput } from "./lib/seo";

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

// ── Global error handler ──
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }
  return c.json({ error: "Internal server error" }, 500);
});

// ── Security headers ──
app.use("/*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  c.header("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  c.header("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'");
});

app.use("/*", cors({
  origin: ["https://reliancenepal.com.np", "https://www.reliancenepal.com.np", "https://rfil-web.sudeepdhakal.workers.dev", "http://localhost:3000"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// ── Rate limiter (per-IP, in-memory) ──
// GET (reads): 600/min per IP — page loads fire many API reads
// POST/PUT/DELETE (mutations): 30/min per IP — protects forms and CMS writes
const rateLimits = new Map<string, { getCount: number; postCount: number; resetAt: number }>();
const GET_LIMIT = 600;
const POST_LIMIT = 30;
const RATE_WINDOW = 60_000;

app.use("/api/*", async (c, next) => {
  const path = c.req.path;
  if (path === "/api/health" || path.startsWith("/api/media/")) {
    return next();
  }
  const ip = c.req.header("CF-Connecting-IP") || c.req.header("x-forwarded-for") || "unknown";
  const method = c.req.method;
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimits.set(ip, { getCount: 0, postCount: 0, resetAt: now + RATE_WINDOW });
    return next();
  }
  if (method === "GET") {
    entry.getCount += 1;
    if (entry.getCount > GET_LIMIT) {
      return c.json({ error: "Too many requests", retryAfter: Math.ceil((entry.resetAt - now) / 1000) }, 429);
    }
  } else {
    entry.postCount += 1;
    if (entry.postCount > POST_LIMIT) {
      return c.json({ error: "Too many requests", retryAfter: Math.ceil((entry.resetAt - now) / 1000) }, 429);
    }
  }
  await next();
});

// ── Health ──
app.get("/api/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ── Media Serving ──
app.get("/api/media/*", async (c) => {
  try {
    const filename = c.req.path.replace("/api/media/", "");
    if (!filename) return c.json({ error: "Not found" }, 404);
    const obj = await c.env.R2.get(filename);
    if (!obj) return c.json({ error: "Not found" }, 404);
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    // Ensure correct content type for images if not already set
    if (!headers.get("content-type")) {
      const mime = filename.endsWith(".png") ? "image/png"
        : filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? "image/jpeg"
        : filename.endsWith(".webp") ? "image/webp"
        : filename.endsWith(".avif") ? "image/avif"
        : filename.endsWith(".gif") ? "image/gif"
        : filename.endsWith(".svg") ? "image/svg+xml"
        : filename.endsWith(".ico") ? "image/x-icon"
        : filename.endsWith(".pdf") ? "application/pdf"
        : "application/octet-stream";
      headers.set("content-type", mime);
    }
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
  const rows = await db
    .select({
      id: reports.id,
      categoryId: reports.categoryId,
      category: reportCategories.slug,
      title: reports.title,
      titleNp: reports.titleNp,
      slug: reports.slug,
      fiscalYear: reports.fiscalYear,
      description: reports.description,
      fileUrl: reports.fileUrl,
      fileSize: reports.fileSize,
      coverImage: reports.coverImage,
      status: reports.status,
      publishedAt: reports.publishedAt,
    })
    .from(reports)
    .leftJoin(reportCategories, eq(reports.categoryId, reportCategories.id))
    .where(and(...conditions))
    .orderBy(desc(reports.publishedAt))
    .all();
  return c.json(rows);
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
  const audience = c.req.query("audience");
  const conditions = [eq(products.status, "published")];
  if (cat) conditions.push(eq(products.categoryId, parseInt(cat)));
  if (type) conditions.push(eq(productCategories.type, type as any));
  if (audience) conditions.push(eq(products.audience, audience as any));
  let result;
  if (type || audience) {
    result = await db
      .select({
        id: products.id,
        categoryId: products.categoryId,
        categorySlug: productCategories.slug,
        categoryName: productCategories.name,
        slug: products.slug,
        title: products.title,
        titleNp: products.titleNp,
        summary: products.summary,
        content: products.content,
        icon: products.icon,
        bannerImage: products.bannerImage,
        features: products.features,
        eligibility: products.eligibility,
        documentsRequired: products.documentsRequired,
        interestRateInfo: products.interestRateInfo,
        minAmount: products.minAmount,
        maxAmount: products.maxAmount,
        maxTenure: products.maxTenure,
        metaTitle: products.metaTitle,
        metaDescription: products.metaDescription,
        status: products.status,
        audience: products.audience,
        isFeatured: products.isFeatured,
        isPopular: products.isPopular,
        details: products.details,
        sortOrder: products.sortOrder,
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .where(and(...conditions))
      .orderBy(products.sortOrder)
      .all();
  } else {
    result = await db.select().from(products).where(and(...conditions)).orderBy(products.sortOrder).all();
  }
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

// ── Reviews ──
app.get("/api/reviews", async (c) => {
  const db = createDb(c.env.DB);
  const productId = c.req.query("productId");
  const conditions = [eq(reviews.isApproved, true)];
  if (productId) conditions.push(eq(reviews.productId, parseInt(productId)));
  const result = await db.select().from(reviews).where(and(...conditions)).orderBy(desc(reviews.createdAt)).all();
  return c.json(result);
});

app.post("/api/reviews", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.name || !data.review || !data.rating) return c.json({ error: "Name, rating and review required" }, 400);
  const result = await db.insert(reviews).values({
    name: data.name,
    email: data.email || null,
    rating: parseInt(data.rating),
    review: data.review,
    productId: data.productId ? parseInt(data.productId) : null,
    isApproved: false,
  }).returning().get();
  return c.json(result, 201);
});

// ── Staff Trainings (MIS) ──
app.get("/api/trainings", async (c) => {
  const db = createDb(c.env.DB);
  const year = c.req.query("year");
  const branch = c.req.query("branch");
  const program = c.req.query("program");
  const name = c.req.query("name");
  const conditions = [];
  if (year) conditions.push(eq(trainings.year, year as string));
  if (branch) conditions.push(eq(trainings.branch, branch as string));
  if (program) conditions.push(like(trainings.program, `%${program}%`));
  if (name) conditions.push(like(trainings.name, `%${name}%`));
  const result = await db
    .select()
    .from(trainings)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(trainings.date)
    .all();
  return c.json(result);
});

app.get("/api/trainings/filters", async (c) => {
  const db = createDb(c.env.DB);
  const years = await db.select({ year: trainings.year }).from(trainings).groupBy(trainings.year).all();
  const branches = await db.select({ branch: trainings.branch }).from(trainings).where(sql`${trainings.branch} IS NOT NULL`).groupBy(trainings.branch).all();
  const programs = await db.select({ program: trainings.program }).from(trainings).where(sql`${trainings.program} IS NOT NULL`).groupBy(trainings.program).all();
  return c.json({
    years: years.map(r => r.year),
    branches: branches.map(r => r.branch).filter(Boolean),
    programs: programs.map(r => r.program).filter(Boolean),
  });
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
  const result = await db
    .select({
      id: rates.id,
      categoryId: rates.categoryId,
      categorySlug: rateCategories.slug,
      categoryName: rateCategories.name,
      productName: rates.productName,
      tenure: rates.tenure,
      rateType: rates.rateType,
      minRate: rates.minRate,
      maxRate: rates.maxRate,
      singleRate: rates.singleRate,
      effectiveDate: rates.effectiveDate,
      notes: rates.notes,
      status: rates.status,
    })
    .from(rates)
    .leftJoin(rateCategories, eq(rates.categoryId, rateCategories.id))
    .where(and(...conditions))
    .all();
  return c.json(result);
});

app.get("/api/rates/base-rate-spread-rate", async (c) => {
  const db = createDb(c.env.DB);
  const cat = await db.select().from(rateCategories).where(eq(rateCategories.slug, "base-rate-spread-rate")).get();
  if (!cat) return c.json([]);
  const result = await db
    .select({
      id: rates.id,
      productName: rates.productName,
      minRate: rates.minRate,
      maxRate: rates.maxRate,
      notes: rates.notes,
      effectiveDate: rates.effectiveDate,
    })
    .from(rates)
    .where(and(eq(rates.status, "active"), eq(rates.categoryId, cat.id)))
    .orderBy(rates.id)
    .all();
  return c.json(result);
});

app.get("/api/auctions", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(auctionNotices).where(eq(auctionNotices.status, "published")).all();
  return c.json(result);
});

app.get("/api/merchants", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(merchantOffers).where(eq(merchantOffers.isActive, true)).orderBy(merchantOffers.sortOrder).all();
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
    if (err instanceof SyntaxError) return c.json({ error: "Invalid JSON body" }, 400);
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
    if (err instanceof SyntaxError) return c.json({ error: "Invalid JSON body" }, 400);
    return c.json({ error: "Seed failed", details: String(err) }, 500);
  }
});

// Protect all /api/cms/* routes except auth (defined above)
app.use("/api/cms/*", requireAuth);

// ── CMS: Users & Roles ──

const allResources = ["pages", "products", "services", "team", "branches", "rates", "news", "events", "notices", "reports", "gallery", "downloads", "faq", "careers", "applications", "media", "users", "roles", "settings", "enquiries", "calendar", "auctions", "merchants", "navigation", "navigation-items", "seo", "redirects"];

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
  const hasColumn = (col: string) => col in table;
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
    const values: Record<string, any> = { ...data };
    if (hasColumn("createdBy")) values.createdBy = 1;
    const result = await db.insert(table).values(values).returning().get();
    return c.json(result, 201);
  });
  // Update
  app.put(`/api/cms/${basePath}/:id`, async (c) => {
    const db = createDb(c.env.DB);
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const values: Record<string, any> = { ...data };
    if (hasColumn("updatedAt")) values.updatedAt = new Date().toISOString();
    await db.update(table).set(values).where(eq(table.id, id)).run();
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
crud(reviews, "reviews");
crud(appointments, "appointments");
crud(trainings, "trainings");

// ── CMS: Navigation (custom CRUD with tree structure) ──

// List all navigation menus
app.get("/api/cms/navigation", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(navigation).orderBy(navigation.id).all();
  return c.json(result);
});

// Get navigation with all items (tree)
app.get("/api/cms/navigation/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const menu = await db.select().from(navigation).where(eq(navigation.id, id)).get();
  if (!menu) return c.json({ error: "Not found" }, 404);
  const items = await db.select().from(navigationItems).where(eq(navigationItems.navigationId, id)).orderBy(navigationItems.sortOrder).all();
  return c.json({ ...menu, items: buildNavTree(items, null), flatItems: items });
});

// Create navigation menu
app.post("/api/cms/navigation", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.name || !data.slug) return c.json({ error: "Name and slug required" }, 400);
  const result = await db.insert(navigation).values({
    name: data.name,
    slug: data.slug,
    locale: data.locale || "en",
  }).returning().get();
  return c.json(result, 201);
});

// Update navigation menu
app.put("/api/cms/navigation/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;
  await db.update(navigation).set({ name: data.name, slug: data.slug, locale: data.locale }).where(eq(navigation.id, id)).run();
  const updated = await db.select().from(navigation).where(eq(navigation.id, id)).get();
  return c.json(updated);
});

// Delete navigation menu (cascades items via FK)
app.delete("/api/cms/navigation/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(navigationItems).where(eq(navigationItems.navigationId, id)).run();
  await db.delete(navigation).where(eq(navigation.id, id)).run();
  return c.json({ success: true });
});

// ── CMS: Navigation Items ──

// List items for a navigation
app.get("/api/cms/nav-items", async (c) => {
  const db = createDb(c.env.DB);
  const navigationId = parseInt(c.req.query("navigationId") || "0");
  if (!navigationId) return c.json([]);
  const result = await db.select().from(navigationItems).where(eq(navigationItems.navigationId, navigationId)).orderBy(navigationItems.sortOrder).all();
  return c.json(result);
});

// Create nav item
app.post("/api/cms/nav-items", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.navigationId || !data.label) return c.json({ error: "navigationId and label required" }, 400);
  const result = await db.insert(navigationItems).values({
    navigationId: data.navigationId,
    parentId: data.parentId || null,
    label: data.label,
    labelNp: data.labelNp || null,
    href: data.href || null,
    imageUrl: data.imageUrl || null,
    imageAlt: data.imageAlt || null,
    description: data.description || null,
    descriptionNp: data.descriptionNp || null,
    sortOrder: data.sortOrder || 0,
    isOpenInNewTab: data.isOpenInNewTab || false,
    isActive: data.isActive !== false,
  }).returning().get();
  return c.json(result, 201);
});

// Update nav item
app.put("/api/cms/nav-items/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;
  const values: Record<string, any> = {};
  if (data.parentId !== undefined) values.parentId = data.parentId;
  if (data.label !== undefined) values.label = data.label;
  if (data.labelNp !== undefined) values.labelNp = data.labelNp;
  if (data.href !== undefined) values.href = data.href;
  if (data.imageUrl !== undefined) values.imageUrl = data.imageUrl;
  if (data.imageAlt !== undefined) values.imageAlt = data.imageAlt;
  if (data.description !== undefined) values.description = data.description;
  if (data.descriptionNp !== undefined) values.descriptionNp = data.descriptionNp;
  if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;
  if (data.isOpenInNewTab !== undefined) values.isOpenInNewTab = data.isOpenInNewTab;
  if (data.isActive !== undefined) values.isActive = data.isActive;
  await db.update(navigationItems).set(values).where(eq(navigationItems.id, id)).run();
  const updated = await db.select().from(navigationItems).where(eq(navigationItems.id, id)).get();
  return c.json(updated);
});

// Delete nav item
app.delete("/api/cms/nav-items/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  // Delete children first
  const item = await db.select().from(navigationItems).where(eq(navigationItems.id, id)).get();
  if (item) {
    await db.delete(navigationItems).where(eq(navigationItems.parentId, id)).run();
    await db.delete(navigationItems).where(eq(navigationItems.id, id)).run();
  }
  return c.json({ success: true });
});

// Batch reorder nav items
app.put("/api/cms/nav-items/reorder", async (c) => {
  const db = createDb(c.env.DB);
  const { items } = await c.req.json() as { items: { id: number; sortOrder: number; parentId?: number | null }[] };
  if (!Array.isArray(items)) return c.json({ error: "items array required" }, 400);
  for (const item of items) {
    const updateData: Record<string, any> = { sortOrder: item.sortOrder };
    if (item.parentId !== undefined) updateData.parentId = item.parentId;
    await db.update(navigationItems).set(updateData).where(eq(navigationItems.id, item.id)).run();
  }
  return c.json({ success: true });
});

// ── CMS: SEO ──

// Get all SEO settings as a map
app.get("/api/cms/seo/settings", async (c) => {
  const db = createDb(c.env.DB);
  const rows = await db.select().from(seoSettings).all();
  const map: Record<string, any> = {};
  for (const row of rows) map[row.key] = row.value;
  return c.json(map);
});

// Bulk upsert SEO settings
app.put("/api/cms/seo/settings", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  for (const [key, value] of Object.entries(data)) {
    const existing = await db.select().from(seoSettings).where(eq(seoSettings.key, key)).get();
    if (existing) {
      await db.update(seoSettings).set({ value, updatedAt: new Date().toISOString() }).where(eq(seoSettings.id, existing.id)).run();
    } else {
      await db.insert(seoSettings).values({ key, value }).run();
    }
  }
  return c.json({ success: true });
});

// Get all SEO analyses (latest per resource), optionally filterable by type
app.get("/api/cms/seo/analyses", async (c) => {
  const db = createDb(c.env.DB);
  const type = c.req.query("type");
  const conditions = type ? [eq(seoAnalysis.resourceType, type as string)] : [];
  const result = await db.select().from(seoAnalysis).where(conditions.length ? and(...conditions) : undefined).all();
  return c.json(result);
});

// Run/refresh SEO analysis for a given resource, then store it
app.post("/api/cms/seo/analyze", async (c) => {
  const db = createDb(c.env.DB);
  const body = await c.req.json() as {
    resourceType: string;
    resourceId: number;
    title: string;
    description?: string;
    content?: string;
    focusKeyword?: string;
    slug?: string;
    headings?: string[];
    internalLinks?: number;
    externalLinks?: number;
    images?: { alt?: string }[];
  };
  if (!body.resourceType || !body.resourceId) return c.json({ error: "resourceType and resourceId required" }, 400);

  const result = analyzeSeo({
    title: body.title,
    description: body.description,
    content: body.content,
    focusKeyword: body.focusKeyword,
    slug: body.slug,
    headings: body.headings,
    internalLinks: body.internalLinks,
    externalLinks: body.externalLinks,
    images: body.images,
  });

  const existing = await db.select().from(seoAnalysis)
    .where(and(eq(seoAnalysis.resourceType, body.resourceType), eq(seoAnalysis.resourceId, body.resourceId)))
    .get();

  const payload = {
    score: result.score,
    focusKeyword: body.focusKeyword || null,
    issues: result.issues,
    data: result.data,
    analyzedAt: new Date().toISOString(),
  };

  if (existing) {
    await db.update(seoAnalysis).set(payload).where(eq(seoAnalysis.id, existing.id)).run();
  } else {
    await db.insert(seoAnalysis).values({ resourceType: body.resourceType, resourceId: body.resourceId, ...payload }).run();
  }
  return c.json(payload);
});

// Get single analysis for a resource
app.get("/api/cms/seo/analyses/:type/:id", async (c) => {
  const db = createDb(c.env.DB);
  const type = c.req.param("type");
  const id = parseInt(c.req.param("id"));
  const result = await db.select().from(seoAnalysis)
    .where(and(eq(seoAnalysis.resourceType, type), eq(seoAnalysis.resourceId, id)))
    .get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

// Delete an analysis
app.delete("/api/cms/seo/analyses/:type/:id", async (c) => {
  const db = createDb(c.env.DB);
  const type = c.req.param("type");
  const id = parseInt(c.req.param("id"));
  await db.delete(seoAnalysis).where(and(eq(seoAnalysis.resourceType, type), eq(seoAnalysis.resourceId, id))).run();
  return c.json({ success: true });
});

// Rank Tracker CRUD
app.get("/api/cms/seo/rank-tracker", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(rankTracker).orderBy(rankTracker.id).all();
  return c.json(result);
});

app.post("/api/cms/seo/rank-tracker", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.keyword) return c.json({ error: "keyword required" }, 400);
  const result = await db.insert(rankTracker).values({
    keyword: data.keyword,
    url: data.url || null,
    position: data.position != null ? parseInt(data.position) : null,
    previousPosition: null,
    searchEngine: data.searchEngine || "google",
    location: data.location || null,
    trend: "new",
    history: data.position != null ? [{ date: new Date().toISOString(), position: parseInt(data.position) }] : [],
  }).returning().get();
  return c.json(result, 201);
});

app.put("/api/cms/seo/rank-tracker/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;
  const existing = await db.select().from(rankTracker).where(eq(rankTracker.id, id)).get();
  if (!existing) return c.json({ error: "Not found" }, 404);

  const history = Array.isArray(existing.history) ? [...existing.history] : [];
  const previousPosition = existing.position;
  let position = existing.position;
  let trend = existing.trend;

  if (data.position != null) {
    position = parseInt(data.position);
    history.push({ date: new Date().toISOString(), position });
    if (previousPosition != null) {
      trend = position < previousPosition ? "up" : position > previousPosition ? "down" : "same";
    }
  }

  await db.update(rankTracker).set({
    keyword: data.keyword ?? existing.keyword,
    url: data.url !== undefined ? data.url : existing.url,
    position,
    previousPosition,
    searchEngine: data.searchEngine ?? existing.searchEngine,
    location: data.location !== undefined ? data.location : existing.location,
    trend,
    history,
    lastChecked: new Date().toISOString(),
  }).where(eq(rankTracker.id, id)).run();

  const updated = await db.select().from(rankTracker).where(eq(rankTracker.id, id)).get();
  return c.json(updated);
});

app.delete("/api/cms/seo/rank-tracker/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(rankTracker).where(eq(rankTracker.id, id)).run();
  return c.json({ success: true });
});

// Redirects CRUD
app.get("/api/cms/seo/redirects", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(seoRedirects).orderBy(seoRedirects.id).all();
  return c.json(result);
});

app.post("/api/cms/seo/redirects", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.source || !data.target) return c.json({ error: "source and target required" }, 400);
  const result = await db.insert(seoRedirects).values({
    source: data.source,
    target: data.target,
    type: data.type || 301,
    isActive: data.isActive !== false,
  }).returning().get();
  return c.json(result, 201);
});

app.put("/api/cms/seo/redirects/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const data = await c.req.json() as Record<string, any>;
  const values: Record<string, any> = {};
  if (data.source !== undefined) values.source = data.source;
  if (data.target !== undefined) values.target = data.target;
  if (data.type !== undefined) values.type = data.type;
  if (data.isActive !== undefined) values.isActive = data.isActive;
  await db.update(seoRedirects).set(values).where(eq(seoRedirects.id, id)).run();
  const updated = await db.select().from(seoRedirects).where(eq(seoRedirects.id, id)).get();
  return c.json(updated);
});

app.delete("/api/cms/seo/redirects/:id", async (c) => {
  const db = createDb(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(seoRedirects).where(eq(seoRedirects.id, id)).run();
  return c.json({ success: true });
});

// Schema markup CRUD
app.get("/api/cms/seo/schema", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(schemaMarkup).all();
  return c.json(result);
});

app.post("/api/cms/seo/schema", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.resourceType || !data.resourceId) return c.json({ error: "resourceType and resourceId required" }, 400);
  const existing = await db.select().from(schemaMarkup)
    .where(and(eq(schemaMarkup.resourceType, data.resourceType), eq(schemaMarkup.resourceId, data.resourceId)))
    .get();
  if (existing) {
    await db.update(schemaMarkup).set({
      schemaType: data.schemaType || "auto",
      jsonLd: data.jsonLd || null,
      isActive: data.isActive !== false,
      updatedAt: new Date().toISOString(),
    }).where(eq(schemaMarkup.id, existing.id)).run();
    return c.json({ ...existing, schemaType: data.schemaType, jsonLd: data.jsonLd });
  }
  const result = await db.insert(schemaMarkup).values({
    resourceType: data.resourceType,
    resourceId: data.resourceId,
    schemaType: data.schemaType || "auto",
    jsonLd: data.jsonLd || null,
    isActive: data.isActive !== false,
  }).returning().get();
  return c.json(result, 201);
});

app.delete("/api/cms/seo/schema/:type/:id", async (c) => {
  const db = createDb(c.env.DB);
  const type = c.req.param("type");
  const id = parseInt(c.req.param("id"));
  await db.delete(schemaMarkup).where(and(eq(schemaMarkup.resourceType, type), eq(schemaMarkup.resourceId, id))).run();
  return c.json({ success: true });
});

// ── Public SEO ──

// Lightweight privacy-first page view analytics (no cookies, IP only for geo)
app.post("/api/analytics/view", async (c) => {
  const db = createDb(c.env.DB);
  const { path, referrer } = await c.req.json().catch(() => ({ path: "", referrer: "" }));
  if (!path) return c.json({ ok: false });
  await db.insert(analyticsEvents).values({
    eventType: "page_view",
    path: String(path).slice(0, 255),
    referrer: referrer ? String(referrer).slice(0, 255) : null,
  }).run();
  return c.json({ ok: true });
});

app.post("/api/analytics/event", async (c) => {
  const db = createDb(c.env.DB);
  const { event, path, label } = await c.req.json().catch(() => ({}));
  if (!event) return c.json({ ok: false });
  await db.insert(analyticsEvents).values({
    eventType: String(event).slice(0, 50),
    path: path ? String(path).slice(0, 255) : null,
    referrer: label ? String(label).slice(0, 255) : null,
  }).run();
  return c.json({ ok: true });
});

// CMS: analytics dashboard stats
app.get("/api/cms/analytics", async (c) => {
  const db = createDb(c.env.DB);
  const views = await db.select().from(analyticsEvents).where(eq(analyticsEvents.eventType, "page_view")).all();
  const events = await db.select().from(analyticsEvents).all();
  const byPath: Record<string, number> = {};
  for (const v of views) {
    const p = v.path || "(none)";
    byPath[p] = (byPath[p] || 0) + 1;
  }
  const topPaths = Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 20);
  const byEvent: Record<string, number> = {};
  for (const e of events) {
    byEvent[e.eventType] = (byEvent[e.eventType] || 0) + 1;
  }
  return c.json({
    totalViews: views.length,
    totalEvents: events.length,
    topPaths,
    byEvent,
  });
});

// Public: get SEO settings (safe subset for meta/schema/sitemap generation)
app.get("/api/seo/settings", async (c) => {
  const db = createDb(c.env.DB);
  const rows = await db.select().from(seoSettings).all();
  const map: Record<string, any> = {};
  for (const row of rows) map[row.key] = row.value;
  return c.json(map);
});

// Public: get SEO meta + schema for a resource
app.get("/api/seo/:resourceType/:resourceId", async (c) => {
  const db = createDb(c.env.DB);
  const type = c.req.param("resourceType");
  const id = parseInt(c.req.param("resourceId"));
  const analysis = await db.select().from(seoAnalysis)
    .where(and(eq(seoAnalysis.resourceType, type), eq(seoAnalysis.resourceId, id)))
    .get();
  const schema = await db.select().from(schemaMarkup)
    .where(and(eq(schemaMarkup.resourceType, type), eq(schemaMarkup.resourceId, id), eq(schemaMarkup.isActive, true)))
    .get();
  return c.json({ analysis, schema });
});

// Public: active redirects for middleware
app.get("/api/seo/redirects", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(seoRedirects).where(eq(seoRedirects.isActive, true)).all();
  return c.json(result);
});

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

// ── Public Navigation ──
app.get("/api/navigation/:slug", async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param("slug");
  const locale = c.req.query("locale") || c.req.query("lang") || "en";

  // First check exact slug match
  let menu = await db.select().from(navigation).where(and(eq(navigation.slug, slug), eq(navigation.locale, locale))).get();
  if (!menu) {
    // Fallback to any menu with this slug
    menu = await db.select().from(navigation).where(eq(navigation.slug, slug)).get();
    if (!menu) return c.json([]);
  }

  const items = await db.select().from(navigationItems).where(and(eq(navigationItems.navigationId, menu.id), eq(navigationItems.isActive, true))).orderBy(navigationItems.sortOrder).all();
  return c.json(buildNavTree(items, null, locale));
});

function buildNavTree(items: any[], parentId: number | null, locale = "en"): any[] {
  return items
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      label: (locale === "np" && item.labelNp) ? item.labelNp : item.label,
      description: (locale === "np" && item.descriptionNp) ? item.descriptionNp : item.description,
      labelEn: item.label,
      labelNp: item.labelNp,
      descriptionEn: item.description,
      descriptionNp: item.descriptionNp,
      children: buildNavTree(items, item.id, locale),
    }));
}

// ── Email-enabled form submissions ──

// ── Newsletter Subscription (double opt-in) ──
const ALLOWED_PREFS = ["notices", "news", "events", "rates", "promotions"];
app.post("/api/newsletter", async (c) => {
  const db = createDb(c.env.DB);
  const { email, language, preference, preferences } = await c.req.json().catch(() => ({})) as { email?: string; language?: string; preference?: string; preferences?: string[] };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "Valid email required" }, 400);
  }
  // Normalize preferences
  let prefs: string[] = Array.isArray(preferences) ? preferences : preference ? [preference] : ["newsletter"];
  prefs = prefs.filter((p) => ALLOWED_PREFS.includes(p) || p === "newsletter");
  if (prefs.length === 0) prefs = ["newsletter"];

  const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).get();
  if (existing) {
    if (existing.isActive) {
      // Merge new preferences into existing
      const merged = Array.from(new Set([...(existing.preferences || []), ...prefs]));
      await db.update(newsletterSubscribers).set({ preferences: merged, language: language || existing.language || "en" })
        .where(eq(newsletterSubscribers.id, existing.id)).run();
      return c.json({ message: "Preferences updated" }, 200);
    }
    await db.update(newsletterSubscribers).set({ isActive: true, subscribedAt: new Date().toISOString(), language: language || existing.language || "en", preferences: prefs })
      .where(eq(newsletterSubscribers.id, existing.id)).run();
    return c.json({ message: "Re-subscribed" }, 200);
  }
  await db.insert(newsletterSubscribers).values({
    email,
    language: language || "en",
    isActive: true,
    preferences: prefs,
  }).run();

  try {
    await c.env.EMAIL_QUEUE.send([{
      to: email,
      subject: "Welcome to Reliance Finance Newsletter",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Welcome to Reliance Finance!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll receive updates on interest rates, notices, and financial news.</p>
          <p>To unsubscribe anytime, reply with "unsubscribe".</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Reliance Finance Limited</p>
        </div>
      `,
    }]);
  } catch (e) { console.error("Newsletter email error:", e); }

  return c.json({ message: "Subscribed", preferences: prefs }, 201);
});

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

app.post("/api/appointments", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.name || !data.email || !data.phone) return c.json({ error: "Name, email and phone required" }, 400);
  const result = await db.insert(appointments).values({
    name: data.name, email: data.email, phone: data.phone,
    meetingType: data.meetingType || "in-person",
    branch: data.branch || null, service: data.service || null, reason: data.reason || null,
    preferredDate: data.preferredDate || null, preferredTime: data.preferredTime || null,
    status: "pending",
  }).returning().get();
  return c.json(result, 201);
});

app.post("/api/loan-enquiry", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  const result = await db.insert(loanEnquiries).values({
    name: data.name, address: data.address,
    province: data.province || null, district: data.district || null, localBody: data.localBody || null,
    phone: data.phone,
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
    province: formData.get("province") as string || null,
    district: formData.get("district") as string || null,
    localBody: formData.get("localBody") as string || null,
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
    province: data.province || null,
    district: data.district || null,
    localBody: data.localBody || null,
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

// ── Account Opening & Loan Applications ──

function generateReference(prefix: string) {
  const ts = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `${prefix}-${ts}${rand}`;
}

app.post("/api/account-applications", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.fullName || !data.email || !data.phone || !data.accountType) {
    return c.json({ error: "fullName, email, phone and accountType required" }, 400);
  }
  const referenceNo = generateReference("ACC");
  const result = await db.insert(accountApplications).values({
    referenceNo,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth || null,
    citizenshipNo: data.citizenshipNo || null,
    accountType: data.accountType,
    province: data.province || null,
    district: data.district || null,
    localBody: data.localBody || null,
    address: data.address || null,
    preferredBranch: data.preferredBranch || null,
    occupation: data.occupation || null,
    initialDeposit: data.initialDeposit ? parseFloat(data.initialDeposit) : null,
    documents: data.documents || null,
  }).returning().get();

  try {
    await c.env.EMAIL_QUEUE.send([
      { to: data.email, subject: "Account Application Received - Reliance Finance", html: `<p>Dear ${data.fullName},<br/>Your account application has been received. Your reference number is <strong>${referenceNo}</strong>. Our team will contact you to complete the process.</p>` },
      { to: c.env.ADMIN_EMAIL, subject: `New Account Application: ${data.accountType}`, html: `<p>New account application from ${data.fullName} (${data.email}, ${data.phone}). Reference: ${referenceNo}</p>` },
    ]);
  } catch (e) { console.error("Email queue error:", e); }

  return c.json({ ...result, referenceNo }, 201);
});

app.post("/api/loan-applications", async (c) => {
  const db = createDb(c.env.DB);
  const data = await c.req.json() as Record<string, any>;
  if (!data.fullName || !data.email || !data.phone || !data.loanType) {
    return c.json({ error: "fullName, email, phone and loanType required" }, 400);
  }
  const referenceNo = generateReference("LON");
  const timeline = [{ status: "submitted", date: new Date().toISOString(), note: "Application submitted" }];
  const result = await db.insert(loanApplications).values({
    referenceNo,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    loanType: data.loanType,
    requestedAmount: data.requestedAmount ? parseFloat(data.requestedAmount) : null,
    tenureMonths: data.tenureMonths ? parseInt(data.tenureMonths) : null,
    occupation: data.occupation || null,
    monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) : null,
    preferredBranch: data.preferredBranch || null,
    timeline,
  }).returning().get();

  try {
    await c.env.EMAIL_QUEUE.send([
      { to: data.email, subject: "Loan Application Received - Reliance Finance", html: `<p>Dear ${data.fullName},<br/>Your ${data.loanType} loan application has been received. Your reference number is <strong>${referenceNo}</strong>. Track your status anytime.</p>` },
      { to: c.env.ADMIN_EMAIL, subject: `New Loan Application: ${data.loanType}`, html: `<p>New loan application from ${data.fullName} (${data.email}, ${data.phone}). Reference: ${referenceNo}. Amount: ${data.requestedAmount || "N/A"}</p>` },
    ]);
  } catch (e) { console.error("Email queue error:", e); }

  return c.json({ ...result, referenceNo }, 201);
});

// Public status lookup by reference number
app.get("/api/applications/status", async (c) => {
  const db = createDb(c.env.DB);
  const ref = c.req.query("ref");
  const type = c.req.query("type") || "account";
  if (!ref) return c.json({ error: "ref required" }, 400);
  if (type === "loan") {
    const result = await db.select().from(loanApplications).where(eq(loanApplications.referenceNo, String(ref).toUpperCase())).get();
    if (!result) return c.json({ error: "Not found" }, 404);
    return c.json({ referenceNo: result.referenceNo, status: result.status, timeline: result.timeline || [], createdAt: result.createdAt, loanType: result.loanType });
  }
  const result = await db.select().from(accountApplications).where(eq(accountApplications.referenceNo, String(ref).toUpperCase())).get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ referenceNo: result.referenceNo, status: result.status, createdAt: result.createdAt, accountType: result.accountType });
});

// CMS: list applications
app.get("/api/cms/applications/accounts", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await db.select().from(accountApplications).orderBy(desc(accountApplications.createdAt)).all());
});

app.get("/api/cms/applications/loans", async (c) => {
  const db = createDb(c.env.DB);
  return c.json(await db.select().from(loanApplications).orderBy(desc(loanApplications.createdAt)).all());
});

// CMS: update application status (adds to timeline)
app.put("/api/cms/applications/status", async (c) => {
  const db = createDb(c.env.DB);
  const { type, id, status, note } = await c.req.json() as { type: string; id: number; status: string; note?: string };
  if (!type || !id || !status) return c.json({ error: "type, id, status required" }, 400);
  const now = new Date().toISOString();
  let customer: { email: string; fullName: string; referenceNo: string; loanType?: string; accountType?: string } | null = null;
  if (type === "loan") {
    const existing = await db.select().from(loanApplications).where(eq(loanApplications.id, id)).get();
    if (!existing) return c.json({ error: "Not found" }, 404);
    const timeline = Array.isArray(existing.timeline) ? [...existing.timeline] : [];
    timeline.push({ status, date: now, note: note || undefined });
    await db.update(loanApplications).set({ status, timeline, updatedAt: now }).where(eq(loanApplications.id, id)).run();
    customer = { email: existing.email, fullName: existing.fullName, referenceNo: existing.referenceNo, loanType: existing.loanType };
  } else {
    const existing = await db.select().from(accountApplications).where(eq(accountApplications.id, id)).get();
    if (!existing) return c.json({ error: "Not found" }, 404);
    await db.update(accountApplications).set({ status, updatedAt: now }).where(eq(accountApplications.id, id)).run();
    customer = { email: existing.email, fullName: existing.fullName, referenceNo: existing.referenceNo, accountType: existing.accountType };
  }

  // Notify the customer of the status change
  if (customer) {
    try {
      await c.env.EMAIL_QUEUE.send([{
        to: customer.email,
        subject: `Your ${type === "loan" ? "Loan" : "Account"} Application Status - Reliance Finance`,
        html: applicationStatusEmail(customer.fullName, customer.referenceNo, type, status, note),
      }]);
    } catch (e) { console.error("Status email error:", e); }
  }

  return c.json({ success: true });
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
      case "0 9 * * 1":
        // Weekly email digest: notify subscribers of new notices/news by preference
        try {
          await sendDigestEmails(db, env);
        } catch (err) {
          console.error("Digest email failed:", err);
        }
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

// ── Weekly Email Digest ──
async function sendDigestEmails(db: any, env: any) {
  // Get last-sent timestamp from site settings (fallback: 7 days ago)
  const setting = await db.select().from(siteSettings).where(eq(siteSettings.key, "last_digest_at")).get();
  const sinceStr = (setting?.value as string) || new Date(Date.now() - 7 * 86400000).toISOString();
  const since = new Date(sinceStr);
  const now = new Date().toISOString();

  // Recent notices & news since last digest
  const [recentNotices, recentNews] = await Promise.all([
    db.select({ id: notices.id, title: notices.title, titleNp: notices.titleNp, publishedDate: notices.publishedDate })
      .from(notices).where(and(eq(notices.status, "published"), sql`${notices.publishedDate} >= ${sinceStr}`)).limit(10).all(),
    db.select({ id: news.id, title: news.title, titleNp: news.titleNp, publishedAt: news.publishedAt })
      .from(news).where(and(eq(news.status, "published"), sql`${news.publishedAt} >= ${sinceStr}`)).limit(10).all(),
  ]);

  const items: { title: string; type: string }[] = [
    ...recentNotices.map((n: any) => ({ title: n.titleNp || n.title, type: "Notice" })),
    ...recentNews.map((n: any) => ({ title: n.titleNp || n.title, type: "News" })),
  ];

  // No new content -> just update timestamp and return
  if (items.length === 0) {
    if (setting) {
      await db.update(siteSettings).set({ value: now, updatedAt: now }).where(eq(siteSettings.id, setting.id)).run();
    } else {
      await db.insert(siteSettings).values({ key: "last_digest_at", value: now }).run();
    }
    return;
  }

  // Get active subscribers (email via admin only; no queue bulk here, send individually)
  const subscribers = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true)).all();

  const digestHtml = (name: string, lang: string) => `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Weekly Update - Reliance Finance</h2>
      <p>Dear ${name || "Subscriber"},</p>
      <p>Here's what's new at Reliance Finance this week:</p>
      <ul>
        ${items.slice(0, 8).map((i) => `<li><strong>${i.type}:</strong> ${i.title}</li>`).join("")}
      </ul>
      <p>${lang === "np" ? "हाम्रो वेबसाइटमा थप जान्नुहोस्।" : "Learn more on our website."}</p>
      <hr />
      <p style="color: #666; font-size: 12px;">Reliance Finance Limited</p>
    </div>
  `;

  let sent = 0;
  for (const sub of subscribers) {
    const prefs: string[] = Array.isArray(sub.preferences) ? sub.preferences : ["newsletter"];
    // Only send if they subscribed to notices or news (or general newsletter)
    const interested = prefs.some((p) => p === "newsletter" || p === "notices" || p === "news");
    if (!interested) continue;
    try {
      await env.EMAIL_QUEUE.send([{
        to: sub.email,
        subject: "Weekly Update - Reliance Finance",
        html: digestHtml(sub.email, sub.language || "en"),
      }]);
      sent++;
    } catch (e) {
      console.error("Digest send error:", e);
    }
  }

  // Update last-sent timestamp
  if (setting) {
    await db.update(siteSettings).set({ value: now, updatedAt: now }).where(eq(siteSettings.id, setting.id)).run();
  } else {
    await db.insert(siteSettings).values({ key: "last_digest_at", value: now }).run();
  }
  console.log(`Digest sent to ${sent} subscribers`);
}

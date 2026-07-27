import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq, and, desc } from "drizzle-orm";
import { createDb } from "./db";
import { pages, products, services, news } from "./db/schema";

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

app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Public API — Pages
app.get("/api/pages", async (c) => {
  const db = createDb(c.env.DB);
  const result = await db
    .select()
    .from(pages)
    .where(and(eq(pages.status, "published"), eq(pages.language, "en")));
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

// Homepage
app.get("/api/homepage", async (c) => {
  const db = createDb(c.env.DB);
  const [productsResult, servicesResult, featuredNews] = await Promise.all([
    db.select().from(products).where(eq(products.status, "published")).limit(6).all(),
    db.select().from(services).where(eq(services.status, "published")).all(),
    db
      .select()
      .from(news)
      .where(eq(news.isFeatured, true))
      .orderBy(desc(news.publishedAt))
      .limit(4)
      .all(),
  ]);
  return c.json({ products: productsResult, services: servicesResult, featuredNews });
});

// CMS Auth placeholder
app.post("/api/cms/auth/login", (c) => {
  return c.json({ message: "CMS auth not yet implemented" }, 501);
});

export default app;

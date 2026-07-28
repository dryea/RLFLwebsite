import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq, and, desc } from "drizzle-orm";
import { createDb } from "./db";
import { pages, products, services, news, users } from "./db/schema";

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

// Health
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

// CMS Auth — Login
app.post("/api/cms/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    const db = createDb(c.env.DB);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    if (user.passwordHash !== password) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    return c.json({
      token: "cms-token-placeholder",
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return c.json({ error: "Internal server error", details: String(err) }, 500);
  }
});

// CMS Auth — Verify
app.get("/api/cms/auth/me", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.json({ error: "Unauthorized" }, 401);
  return c.json({ id: "1", email: "admin@rfil.com", name: "Admin", role: "admin" });
});

export default app;

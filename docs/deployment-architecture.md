# RFIL — Deployment & Infrastructure Architecture

## 1. Architecture Overview

```
                                Cloudflare
                          ┌──────────────────────────────┐
                          │                              │
  ┌──────────┐            │   ┌────────────────────┐     │
  │  User     │──DNS──────┼──→│  Cloudflare DNS     │     │
  │  Browser  │           │   │  (rfil.com.np)      │     │
  └──────────┘            │   └────────┬───────────┘     │
       │                  │            │                 │
       │                  │            ▼                 │
       │                  │   ┌────────────────────┐     │
       ├────HTML/JS───────┼──→│  Cloudflare Pages   │     │
       │                  │   │  (Next.js SSR/ISR)  │     │
       │                  │   └────────┬───────────┘     │
       │                  │            │                 │
       │                  │            ▼                 │
       │                  │   ┌────────────────────┐     │
       ├────API call──────┼──→│  Cloudflare Workers │     │
       │                  │   │  (Hono REST API)   │     │
       │                  │   └──┬──────┬──────┬───┘     │
       │                  │      │      │      │         │
       │                  │      ▼      ▼      ▼         │
       │                  │  ┌────┐ ┌────┐ ┌──────┐     │
       │                  │  │ D1 │ │ R2 │ │ Email│     │
       │                  │  │ DB │ │ Stor│ │Workr │     │
       │                  │  └────┘ └────┘ └──────┘     │
       │                  │                              │
       │                  │  ┌────────────────────┐     │
       └─────Assets───────┼──│  Cloudflare Images  │     │
                          │  │  (optimization)     │     │
                          │  └────────────────────┘     │
                          │                              │
                          │  ┌────────────────────┐     │
                          │  │  Cloudflare Queues  │     │
                          │  │  (async jobs)       │     │
                          │  └────────────────────┘     │
                          │                              │
                          │  ┌────────────────────┐     │
                          │  │  Cron Triggers      │     │
                          │  │  (scheduled tasks)  │     │
                          │  └────────────────────┘     │
                          └──────────────────────────────┘

  ┌─────────────────────────────────────────────┐
  │  GitHub (Source + CI/CD)                     │
  │                                              │
  │  Push → GitHub Actions → Build → Deploy      │
  │    ├── lint + typecheck + test               │
  │    ├── Run Drizzle migrations                │
  │    ├── Build Next.js (static + server)       │
  │    ├── Deploy to Cloudflare Pages            │
  │    └── Deploy Workers to Cloudflare          │
  └─────────────────────────────────────────────┘
```

## 2. Cloudflare Services Breakdown

| Service | Purpose | Plan |
|---------|---------|------|
| **Pages** | Host Next.js (SSR + ISR + static assets) | Pro ($20/mo) |
| **Workers** | Hono API, auth, email sending | Paid plan |
| **D1** | Relational database for all content | Paid (5GB+ storage) |
| **R2** | File storage (PDFs, docs, uploads) | Paid (10GB+) |
| **Images** | Auto-optimization, responsive images | Paid |
| **Queues** | Async jobs: email sending, image processing | Included |
| **Cron Triggers** | Scheduled publishing, calendar sync | Included |
| **Email Workers** | Sending transactional emails | Included |
| **Cache** | KV-based caching for API responses | Included |
| **WAF** | Security rules, rate limiting | Included |

## 3. wrangler.jsonc Configuration

```jsonc
{
  "name": "rfil-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-07-01",
  "compatibility_flags": ["nodejs_compat"],
  
  "pages_build_output_dir": ".vercel/output/static",
  
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "rfil-db",
      "database_id": "xxx"
    }
  ],
  
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "rfil-media"
    },
    {
      "binding": "R2_DOCUMENTS",
      "bucket_name": "rfil-documents"
    }
  ],
  
  "queues": {
    "producers": [
      { "binding": "EMAIL_QUEUE", "queue": "rfil-email-queue" },
      { "binding": "IMAGE_QUEUE", "queue": "rfil-image-queue" }
    ]
  },
  
  "triggers": {
    "crons": [
      "0 0 * * *",   // Daily: publish scheduled content
      "0 6 * * 1",   // Weekly: cleanup temp files
      "0 0 1 * *"    // Monthly: archive old data
    ]
  },
  
  "vars": {
    "SITE_URL": "https://reliancenepal.com.np",
    "SITE_NAME": "Reliance Finance Limited",
    "ADMIN_EMAIL": "info@reliancenepal.com.np",
    "FROM_EMAIL": "noreply@reliancenepal.com.np",
    "GOOGLE_ANALYTICS_ID": "G-XXXXXXXX"
  },
  
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  }
}
```

## 4. GitHub Actions CI/CD Pipeline

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx turbo lint typecheck
      - run: npx drizzle-kit check       # Verify DB schema

  migrate-db:
    needs: quality
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx wrangler d1 migrations apply rfil-db --remote
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

  deploy-api:
    needs: migrate-db
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx wrangler deploy --env production
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

  deploy-pages:
    needs: deploy-api
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npx wrangler pages deploy .vercel/output/static --project-name=rfil-website --branch=main
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 5. D1 Migration Strategy

```bash
# Initialize
npx drizzle-kit generate    # Generate SQL migration files
npx wrangler d1 migrations create rfil-db --local
npx wrangler d1 migrations apply rfil-db --local

# Production
npx wrangler d1 migrations apply rfil-db --remote

# Seeding (initial content)
npx wrangler d1 execute rfil-db --remote --file=./seed.sql

# Backup
npx wrangler d1 backup create rfil-db
npx wrangler d1 backup list rfil-db
npx wrangler d1 backup download rfil-db --backup-id=xxx
```

## 6. Caching Strategy

```
┌──────────────┐
│  Cloudflare   │  Edge cache: HTML pages (ISR), static assets
│  Cache        │  TTL: 1h for pages, 1y for assets
└──────┬───────┘
       │
┌──────▼───────┐
│  Workers KV   │  API response cache: rate tables (5min)
│  (cache)      │  Branch list (15min), Products (1h)
└──────┬───────┘
       │
┌──────▼───────┐
│  D1 (source   │  Always source of truth
│  of truth)    │
└──────────────┘

Cache invalidation:
- On CMS publish → purge key in KV cache
- On rate update → purge rates cache immediately
- On media upload → purge media list cache
```

## 7. Monitoring & Observability

- **Tail Workers** — Log all API requests to R2 (JSON logs)
- **Workers Analytics** — Request count, latency, error rate
- **D1 Analytics** — Query performance, storage usage
- **R2 Metrics** — Storage, bandwidth, requests
- **GA4** — User behavior analytics
- **Uptime Monitoring** — Cloudflare Health Checks (5min interval)

## 8. Security

- **WAF**: Block SQL injection, XSS, DDoS
- **Rate Limiting**: 100 req/min per IP on public API
- **CORS**: Only allow origin `https://reliancenepal.com.np`
- **Auth**: JWT with 2h expiry, refresh token with 7d expiry
- **File Uploads**: Validate MIME type, scan size limits (10MB max)
- **CSRF**: Token-based protection on all CMS forms
- **HTTPS**: Enforced via Cloudflare SSL/TLS (Full strict)
- **Headers**: Strict-Transport-Security, X-Frame-Options, etc.

## 9. Email Flow

```
Loan Enquiry Form
  → POST /api/loan-enquiry
  → Hono Worker validates + stores in D1
  → Enqueue email job to EMAIL_QUEUE
  → Email Worker processes queue:
    → Send confirmation to customer (template)
    → Send notification to branch manager (template)
    → Send notification to admin

Contact Form
  → POST /api/contact
  → Hono Worker validates + stores in D1
  → Enqueue email job
  → Email Worker:
    → Send auto-reply to sender
    → Forward to info@reliancenepal.com.np

Newsletter Subscribe
  → POST /api/newsletter/subscribe
  → Store in D1
  → Send welcome email

Job Application
  → POST /api/careers/apply (multipart)
  → Store CV in R2
  → Save application in D1
  → Send confirmation to applicant
  → Send notification to HR
```

## 10. Cron Jobs

| Schedule | Task | Description |
|----------|------|-------------|
| `0 0 * * *` | Publish scheduled content | Check pages/products/news with scheduled_at <= now, set status to published |
| `0 1 * * *` | Send newsletter digest | Collect latest news/rates, send to active subscribers |
| `0 2 * * *` | Cleanup expired tokens | Delete expired refresh tokens |
| `0 3 * * 0` | Generate sitemap | Rebuild XML sitemap and submit to search engines |
| `0 4 * * 1` | Backup D1 | Export D1 database to R2 backup bucket |
| `0 5 * * *` | Update calendar | Sync Nepali calendar data for current month |
| `0 6 * * 1` | Cleanup temp files | Remove temporary uploads older than 24h |

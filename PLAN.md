# Reliance Finance Limited (RFIL) — Website Development Plan

**Project**: Full-fledged dynamic website with Custom CMS  
**Client**: Reliance Finance Limited  
**Stack**: Cloudflare (Next.js + Hono Workers + D1 + R2 + Images)  
**Timeline**: 6+ months | **Team**: 8+ members

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Site Architecture — 60+ Pages](#3-site-architecture--60-pages)
4. [Database Schema — 26 Tables](#4-database-schema--26-tables)
5. [REST API — 150+ Endpoints](#5-rest-api--150-endpoints)
6. [Frontend Architecture — Next.js](#6-frontend-architecture--nextjs)
7. [Custom CMS Design](#7-custom-cms-design)
8. [Interactive Features](#8-interactive-features)
9. [Design System](#9-design-system)
10. [Deployment & Infrastructure](#10-deployment--infrastructure)
11. [Implementation Phases](#11-implementation-phases)
12. [Content Migration Inventory](#12-content-migration-inventory)

---

## 1. Project Overview

### 1.1 Goals
- Replace existing Laravel + Bootstrap 5 static site with a modern Cloudflare-native stack
- Full dynamic CMS for non-technical staff (5–10 users) to manage all content
- Bilingual (English + Nepali) with full content parity
- WCAG 2.1 AA accessibility compliance
- Advanced SEO with structured data, OG tags, XML sitemaps

### 1.2 Key Metrics
- **60+ public URL routes**
- **26 product detail pages** (14 Savings, 3 Fixed Deposits, 9 Loans)
- **14 service detail pages**
- **12+ governance/team pages**
- **7 notice types** + **5 report types**
- **~150 API endpoints** (public + CMS)
- **26 database tables**

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 (App Router) | SSR/ISR/SSG with optimal SEO |
| **Styling** | Tailwind CSS | Utility-first, consistent design system |
| **Backend API** | Hono on Cloudflare Workers | Lightweight, fast REST API |
| **Database** | Cloudflare D1 | SQLite-compatible, global replication |
| **ORM** | Drizzle ORM | Type-safe, D1-native |
| **File Storage** | Cloudflare R2 | S3-compatible, zero egress fees |
| **Image Optimization** | Cloudflare Images | Auto-resize, responsive variants |
| **Authentication** | Auth.js (NextAuth) | CMS admin login |
| **API Auth** | JWT (via Workers) | Secure API access |
| **Email** | Cloudflare Email Workers | Transactional emails |
| **Search** | D1 FTS5 + Workers | Full-text site search |
| **CI/CD** | GitHub Actions → Cloudflare | Auto-deploy on push |
| **Analytics** | Google Analytics 4 | Visitor tracking |
| **Maps** | Leaflet.js (OpenStreetMap) | Branch locator |
| **Charts** | Recharts / Chart.js | EMI amortization, dashboard stats |
| **Calendar** | Nepali date library (custom) | Nepali calendar & datepicker |

### 2.1 Why This Stack

| Factor | Decision |
|--------|----------|
| **Hosting** | Cloudflare — already using Cloudflare DNS, no infra to manage, global CDN |
| **Database** | D1 — serverless SQLite, zero maintenance, integrated with Workers |
| **ORM** | Drizzle — lightest footprint for Workers, excellent D1 support |
| **Frontend** | Next.js — best SEO, ISR for content pages, App Router for i18n |
| **CSS** | Tailwind — rapid development, consistent design tokens |
| **CMS** | Custom — full control, no licensing, tailored to RFIL's 20+ content types |

---

## 3. Site Architecture — 60+ Pages

### 3.1 URL Structure

```
/                                   # Homepage (hero carousel, featured products, news)
/[lang]/                            # Language-prefixed routes (en/np)

# ── About ──
/[lang]/about/introduction
/[lang]/about/mission-goals
/[lang]/about/strategic-framework
/[lang]/about/milestones
/[lang]/about/capital-structure
/[lang]/about/privacy-policy

# ── Governance ──
/[lang]/team/board-of-directors
/[lang]/team/management-team
/[lang]/team/head-of-department
/[lang]/team/branch-manager
/[lang]/team/committee-of-directors
/[lang]/grievance-handling-officer
/[lang]/compliance-officer
/[lang]/company-secretary
/[lang]/csr
/[lang]/sustainable-banking
/[lang]/environmental-financial-activities

# ── Products ──
/[lang]/products/savings                          # landing page
/[lang]/products/savings/normal-saving-account
/[lang]/products/savings/investor-saving-account
/[lang]/products/savings/special-saving-account
/[lang]/products/savings/student-saving-account
/[lang]/products/savings/shareholder-saving-account
/[lang]/products/savings/pwd-saving-account
/[lang]/products/savings/dhaulagiri-saving-account
/[lang]/products/savings/kanchanjunga-saving-account
/[lang]/products/savings/everest-saving-account
/[lang]/products/savings/super-saving-account
/[lang]/products/savings/gold-saving-account
/[lang]/products/savings/diamond-saving-account
/[lang]/products/savings/sarathi-saving-account

/[lang]/products/fixed-deposits                    # landing page
/[lang]/products/fixed-deposits/individual-fixed-deposit
/[lang]/products/fixed-deposits/corporate-fixed-deposit

/[lang]/products/loans                             # landing page
/[lang]/products/loans/agricultural-loan
/[lang]/products/loans/auto-loan
/[lang]/products/loans/hire-purchase-loan
/[lang]/products/loans/education-loan
/[lang]/products/loans/share-loan
/[lang]/products/loans/home-loan
/[lang]/products/loans/fd-loan
/[lang]/products/loans/personal-loan
/[lang]/products/loans/business-loan

# ── Services ──
/[lang]/services                                   # landing page
/[lang]/services/mobile-banking
/[lang]/services/qr-teller
/[lang]/services/connect-rtgs
/[lang]/services/corporatepay
/[lang]/services/c-asba
/[lang]/services/debit-card
/[lang]/services/abbs
/[lang]/services/remittance
/[lang]/services/sms-banking
/[lang]/services/connect-ips
/[lang]/services/interbank-ips
/[lang]/services/ecc
/[lang]/services/disabled-friendly-branch
/[lang]/services/24-7-account-block

# ── Rates ──
/[lang]/rates/interest-rates
/[lang]/rates/base-rate-spread-rate
/[lang]/rates/standard-tariff-charges
/[lang]/rates/forex-rates

# ── Publications ──
/[lang]/publications/news
/[lang]/publications/news/[slug]
/[lang]/publications/events
/[lang]/publications/notices/agm-notice
/[lang]/publications/notices/dividend-declaration
/[lang]/publications/notices/unclaimed-dividend
/[lang]/publications/notices/right-to-information
/[lang]/publications/notices/subsidy-loan-list
/[lang]/publications/notices/tender-notice
/[lang]/publications/notices/general-notice
/[lang]/publications/reports/annual-report
/[lang]/publications/reports/quarterly-reports
/[lang]/publications/reports/agm-minute
/[lang]/publications/reports/basel-ii-disclosure
/[lang]/publications/reports/sebon-report
/[lang]/publications/training-list

# ── Corporate ──
/[lang]/branches
/[lang]/contact
/[lang]/faq
/[lang]/careers
/[lang]/careers/apply/[slug]
/[lang]/downloads
/[lang]/gallery
/[lang]/gallery/[album-slug]
/[lang]/banking-hours
/[lang]/auction-notice
/[lang]/merchant-offers
/[lang]/privacy-policy

# ── Interactive Tools ──
/[lang]/emi-calculator
/[lang]/loan-enquiry
/[lang]/calendar
/[lang]/search

# ── CMS (Admin) ──
/cms/login
/cms/dashboard
/cms/{resource}              # List view for each content type
/cms/{resource}/[id]         # Edit view
/cms/media                   # Media library
/cms/enquiries               # Contact & loan enquiries
/cms/users                   # User management
/cms/roles                   # Role & permission management
/cms/settings                # Site settings
```

### 3.2 Rendering Strategy

| Page Type | Rendering | Revalidation | Rationale |
|-----------|-----------|-------------|-----------|
| Homepage | ISR | 60s | Dynamic content (news), needs freshness |
| About / Governance | ISR | 300s | Rarely changes |
| Product pages | ISR | 300s | Stable content |
| Service pages | ISR | 300s | Stable content |
| Rate tables | SSR | — | Changes frequently (monthly) |
| News / Events | ISR | 60s | New content regularly |
| Notices | SSR | — | Time-sensitive |
| Reports | ISR | 3600s | Annual/quarterly |
| Gallery | ISR | 300s | Infrequent updates |
| Downloads | ISR | 3600s | Static files |
| FAQ | ISR | 3600s | Rarely changes |
| Careers | SSR | — | Job postings change often |
| EMI Calculator | Client | — | Interactive JS app |
| Branch Map | Client | — | Interactive map |
| Calendar | Client+SSR | — | Navigation is interactive |
| Search | SSR | — | Query-dependent |
| CMS | Client SPA | — | Dashboard experience |

---

## 4. Database Schema — 26 Tables

### 4.1 Entity Relationship Summary

```
users ──→ roles
users ──→ pages ──→ page_versions
pages ──→ pages (self-referential parent)
media_folders ──→ media
media_folders ──→ media_folders (self-referential)

product_categories ──→ products
rate_categories ──→ rates ──→ rate_versions
team_categories ──→ team_members

news_categories ──→ news
notice_categories ──→ notices
report_categories ──→ reports
faq_categories ──→ faqs
download_categories ──→ downloads

albums ──→ gallery_images
job_listings ──→ job_applications
```

### 4.2 Table List

| # | Table | Key Columns | Purpose |
|---|-------|------------|---------|
| 1 | `users` | name, email, password_hash, role_id | CMS admin users |
| 2 | `roles` | name, permissions (JSON) | RBAC with per-feature permissions |
| 3 | `pages` | slug, title, content, language, parent_id, status, scheduled_at | Static pages (about, governance, etc.) |
| 4 | `page_versions` | page_id, content (snapshot), version_number | Content versioning with restore |
| 5 | `media` | filename, url, thumb_url, variants (JSON), mime_type, size | Media library (images, PDFs) |
| 6 | `media_folders` | name, parent_id | Hierarchical media organization |
| 7 | `product_categories` | slug, name, type (savings/fixed/loan) | Product category taxonomy |
| 8 | `products` | category_id, slug, title, features (JSON), eligibility (JSON), documents_required (JSON) | Individual product detail pages |
| 9 | `services` | slug, title, content, features (JSON), how_to_use (JSON) | Banking service pages |
| 10 | `rate_categories` | slug, name, type | Rate table grouping |
| 11 | `rates` | category_id, product_name, tenure, min_rate, max_rate, effective_date | Current & historical rates |
| 12 | `rate_versions` | rate_id, snapshot (JSON), version | Rate change history |
| 13 | `team_categories` | slug, name | Team grouping (BOD, Management, etc.) |
| 14 | `team_members` | category_id, name, designation, photo, bio | Staff directory |
| 15 | `branches` | name, address, latitude, longitude, region, services (JSON) | Branch locations with map coords |
| 16 | `news_categories` | slug, name | News categorization |
| 17 | `news` | category_id, title, slug, content, image, language, published_at | News articles |
| 18 | `events` | title, slug, description, event_date, venue, image | Company events |
| 19 | `notice_categories` | slug, name | Notice type (AGM, Tender, etc.) |
| 20 | `notices` | category_id, title, file_url, published_date | Notice documents |
| 21 | `report_categories` | slug, name | Report type (Annual, Quarterly, etc.) |
| 22 | `reports` | category_id, title, fiscal_year, file_url | Financial reports |
| 23 | `albums` | slug, title, cover_image | Gallery albums |
| 24 | `gallery_images` | album_id, image_url, thumb_url, caption | Gallery images |
| 25 | `download_categories` | slug, name | Download grouping |
| 26 | `downloads` | category_id, title, file_url | Downloadable forms/PDFs |
| 27 | `faq_categories` | slug, name | FAQ categorization |
| 28 | `faqs` | category_id, question, answer | FAQ entries |
| 29 | `job_listings` | title, department, type, description, requirements (JSON), deadline | Career openings |
| 30 | `job_applications` | job_id, name, email, phone, cv_url, status | Job applications with CV upload |
| 31 | `contact_submissions` | name, email, phone, subject, message | Contact form submissions |
| 32 | `loan_enquiries` | name, address, phone, email, customer_profile, loan_type, proposed_amount, preferred_branch | Loan enquiry form submissions |
| 33 | `newsletter_subscribers` | email, language, is_active | Newsletter subscriptions |
| 34 | `calendar_events` | bs_year, bs_month, bs_day, ad_date, tithi, festival, is_holiday | Nepali calendar data |
| 35 | `auction_notices` | title, property_type, location, auction_date, minimum_price | Property auction listings |
| 36 | `merchant_offers` | merchant_name, logo, description, offer_details, valid_until | Partner offers |
| 37 | `site_settings` | key, value (JSON) | Site-wide configuration |

---

## 5. REST API — 150+ Endpoints

### 5.1 Public API (~50 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/pages` | List published pages |
| `GET` | `/api/pages/:slug` | Get page by slug |
| `GET` | `/api/pages/tree` | Hierarchical nav tree |
| `GET` | `/api/products/categories` | Product categories |
| `GET` | `/api/products` | All products (filter by `?category=`) |
| `GET` | `/api/products/:slug` | Product detail |
| `GET` | `/api/products/types/:type` | Products by type |
| `GET` | `/api/services` | All services |
| `GET` | `/api/services/:slug` | Service detail |
| `GET` | `/api/rates` | All rate categories |
| `GET` | `/api/rates/:categorySlug` | Rates for category |
| `GET` | `/api/rates/:categorySlug/latest` | Current active rates |
| `GET` | `/api/branches` | All branches |
| `GET` | `/api/branches/:id` | Single branch |
| `GET` | `/api/branches/region/:region` | Filter by region |
| `GET` | `/api/team/categories` | Team categories |
| `GET` | `/api/team/:categorySlug` | Team members |
| `GET` | `/api/news` | Paginated news |
| `GET` | `/api/news/featured` | Featured news |
| `GET` | `/api/news/:slug` | News article |
| `GET` | `/api/news/categories` | News categories |
| `GET` | `/api/events` | Upcoming/past events |
| `GET` | `/api/events/:slug` | Event detail |
| `GET` | `/api/notices` | All notices |
| `GET` | `/api/notices/categories` | Notice categories |
| `GET` | `/api/notices/:slug` | Notice detail |
| `GET` | `/api/reports` | All reports |
| `GET` | `/api/reports/categories` | Report categories |
| `GET` | `/api/reports/:slug` | Report detail |
| `GET` | `/api/gallery/albums` | Gallery albums |
| `GET` | `/api/gallery/albums/:slug` | Album with images |
| `GET` | `/api/downloads` | All downloads |
| `GET` | `/api/downloads/categories` | Download categories |
| `GET` | `/api/faq` | All FAQs |
| `GET` | `/api/faq/categories` | FAQ categories |
| `GET` | `/api/careers` | Open job listings |
| `GET` | `/api/careers/:slug` | Job detail |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/loan-enquiry` | Submit loan enquiry |
| `POST` | `/api/careers/apply` | Submit job application |
| `POST` | `/api/newsletter/subscribe` | Subscribe to newsletter |
| `POST` | `/api/newsletter/unsubscribe` | Unsubscribe |
| `GET` | `/api/calendar/current` | Current Nepali date |
| `GET` | `/api/calendar/month/:year/:month` | Month calendar data |
| `GET` | `/api/calendar/holidays/:year` | Year holidays |
| `GET` | `/api/auctions` | Active auctions |
| `GET` | `/api/auctions/:slug` | Auction detail |
| `GET` | `/api/merchants` | Merchant offers |
| `GET` | `/api/search?q=` | Full-text search |
| `GET` | `/api/homepage` | Homepage data (optimized) |
| `GET` | `/api/sitemap` | XML sitemap data |

### 5.2 CMS API (~100 endpoints)

**Auth**: `POST /api/cms/auth/login`, `POST /api/cms/auth/logout`, `GET /api/cms/auth/me`

**CRUD for every content type** (pages, products, services, rates, branches, team, news, events, notices, reports, gallery, downloads, faq, careers, calendar, auctions, merchants):

```
GET    /api/cms/{resource}          # List (paginated, filterable)
POST   /api/cms/{resource}          # Create
GET    /api/cms/{resource}/:id      # Read
PUT    /api/cms/{resource}/:id      # Update
DELETE /api/cms/{resource}/:id      # Delete
```

**Special endpoints**:
- `POST /api/cms/pages/:id/publish` — Publish/schedule
- `POST /api/cms/pages/:id/restore/:versionId` — Restore version
- `POST /api/cms/rates/:id/supersede` — Version rates
- `POST /api/cms/media/upload` — Upload files to R2
- `POST /api/cms/gallery/albums/:id/images` — Bulk image upload
- `PUT /api/cms/careers/applications/:id/status` — Update application status
- `GET /api/cms/enquiries/contact` — View contact submissions
- `GET /api/cms/enquiries/loans` — View loan enquiries

---

## 6. Frontend Architecture — Next.js

### 6.1 Project Structure

```
rfil-website/
├── apps/
│   ├── web/                    # Next.js public site
│   │   └── src/
│   │       ├── app/
│   │       │   └── [lang]/     # i18n routes
│   │       ├── components/
│   │       │   ├── layout/     # Header, Footer, Navigation, Breadcrumb
│   │       │   ├── ui/         # Button, Card, Accordion, Table, Modal, etc.
│   │       │   ├── sections/   # Per-page section components
│   │       │   ├── cms/        # Admin panel components
│   │       │   └── shared/     # AccessibilityToolbar, LanguageSwitcher, SEO
│   │       ├── lib/            # API client, auth, i18n, utilities
│   │       ├── hooks/          # Custom React hooks
│   │       └── styles/         # Global CSS, accessibility overrides
│   │
│   └── api/                    # Hono Workers API
│       └── src/
│           ├── db/             # Drizzle schema + D1 client
│           ├── routes/
│           │   ├── public/     # Public API route files
│           │   └── cms/        # CMS API route files
│           ├── middleware/     # Auth, RBAC, validation, CORS
│           └── utils/          # R2 helpers, email, cache, slug
│
├── packages/shared/            # Shared types, Zod validators, constants
├── drizzle.config.ts
├── turbo.json                  # Turborepo config
└── package.json
```

### 6.2 Key Components

**Layout Components**: Header (TopBar + MainNav + MobileMenu), Footer (4 columns + social + app promo), Breadcrumb, PageLayout

**Section Components**: HeroCarousel, ProductGrid, ServiceGrid, TeamGrid, BranchList, BranchMap (Leaflet), RateTable, NewsGrid, EventList, NoticeList, ReportList, GalleryGrid (with lightbox), DownloadList, FAQAccordion, CareerList, ContactForm, LoanEnquiryForm, EMICalculator, NepaliCalendar, SearchResults, MerchantOffers

**UI Primitives**: Button, Card, Badge, Input, Select, Modal, Accordion, Tabs, Table, Pagination, Skeleton, Toast, LoadingSpinner

**CMS Components**: DataTable, TipTapEditor, MediaPicker, ImageUploader, SlugInput, StatusBadge, VersionHistory, SchedulePicker, RoleGuard

**Shared Components**: AccessibilityToolbar (floating), LanguageSwitcher, SearchOverlay, SEOHead, StructuredData, CookieConsent, Preloader

---

## 7. Custom CMS Design

### 7.1 Admin Panel Structure

```
/cms/login                  — Login page (Auth.js)
/cms/dashboard              — Stats, recent activity, enquiry chart
/cms/pages                  — Manage all CMS pages with TipTap editor
/cms/products               — Product CRUD with template fields
/cms/services               — Service CRUD with template fields
/cms/rates                  — Rate tables with version history
/cms/branches               — Branch CRUD with map coordinates
/cms/team                   — Team member CRUD per category
/cms/news                   — News articles with categories
/cms/events                 — Event management
/cms/notices                — Notice management (per type)
/cms/reports                — Report uploads (per category)
/cms/gallery                — Albums with bulk image upload
/cms/downloads              — Downloadable files per category
/cms/faq                    — FAQ entries per category
/cms/careers                — Job listings + applications
/cms/calendar               — Calendar event management
/cms/auctions               — Auction notice management
/cms/merchants              — Merchant/offer management
/cms/media                  — Media library with folders
/cms/enquiries              — Contact + loan submission viewer
/cms/users                  — User management (admin only)
/cms/roles                  — Role & permission editor
/cms/settings               — Site-wide settings
```

### 7.2 Permissions Model

Each content type has 6 permission actions: `create`, `read`, `update`, `delete`, `publish`, `schedule`

**Built-in Roles**:
| Role | Capabilities |
|------|-------------|
| **Super Admin** | Full access to everything |
| **Admin** | All CRUD + publish + user management |
| **Editor** | CRUD + publish on content, no user/role mgmt |
| **Author** | Create + edit own content, cannot publish |
| **Reviewer** | Read + approve/reject for publish |
| **Publisher** | Read + publish/schedule (no edit) |

Custom roles are fully configurable via the CMS Roles UI.

### 7.3 Content Workflow

```
[DRAFT] ──autosave──→ [DRAFT]
   │                        │
   │ Save Draft             │ Submit for Review
   ▼                        ▼
[DRAFT] ──────────────→ [IN REVIEW]
                           │    │
                     Approve │    │ Reject
                           ▼    ▼
                     [PUBLISHED] [DRAFT]
                        │
                   Schedule?
                        │
                        ▼
                   [SCHEDULED] ──cron──→ [PUBLISHED]
```

- **Autosave**: Every 30s to IndexedDB + server
- **Versioning**: Every explicit save creates a version entry
- **Scheduling**: Cloudflare Cron Triggers publish at specified datetime

### 7.4 TipTap Editor Configuration

**Core extensions**: Document, Paragraph, Text, Heading (h1-h6), Bold, Italic, Underline, Strike, BulletList, OrderedList, TaskList, Link, Image, Table, Blockquote, CodeBlock, TextAlign, Color, Highlight

**Custom embed blocks**: NepaliDatePicker, RateTable, ProductGrid, NoticeList, FileDownload, CTA Button, Accordion, Tabs, Animated Counter

### 7.5 Media Library

- Grid/list view with search
- Hierarchical folders (banners, products, team, gallery, documents)
- Drag-and-drop upload → R2 storage
- Auto-optimization via Cloudflare Images (sm/md/lg/original variants)
- Click to view metadata, copy URL, replace, delete

---

## 8. Interactive Features

### 8.1 EMI Calculator
- Inputs: Loan amount (slider), Interest rate, Tenure (months/years)
- Outputs: Monthly EMI, Total Interest, Total Payment
- Amortization schedule table (collapsible)
- Chart visualization (Recharts — pie chart for principal vs interest, line chart for balance over time)

### 8.2 Branch Locator
- Leaflet.js map with OpenStreetMap tiles
- Markers for all branches with custom icons
- Filter by region: Head Office, Inside Valley, Outside Valley
- Click marker → info popup with address, phone, map link
- Branch list sidebar synchronized with map

### 8.3 Loan Enquiry Form
- Fields: Name, Address, Phone, Email, Nationality, Customer Profile, Loan Type (dynamic dropdown from DB), Proposed Amount, Preferred Branch (dynamic dropdown), Remarks, Consent checkbox
- File upload support (documents)
- Server-side validation (Zod)
- Auto-email confirmation to customer + notification to branch manager

### 8.4 Contact Form
- Fields: Name, Email, Phone, Subject, Message
- Honeypot anti-spam
- Auto-reply email to sender
- Forward to info@reliancenepal.com.np

### 8.5 Nepali Calendar
- Full B.S. (Bikram Sambat) calendar page
- Month/year navigation
- Holiday marking (red)
- Event/festival display
- Date conversion: B.S. ↔ A.D.
- Floating calendar button on all pages

### 8.6 Site Search
- FTS5 full-text search on D1
- Searches across: pages, products, services, news, notices, events, FAQ
- Results grouped by content type
- Highlighted matches
- Keyboard shortcut (Ctrl+K / Cmd+K)

### 8.7 Accessibility Toolbar (Floating Widget)
- High contrast mode toggle
- Font size increase/decrease/reset
- Reading guide (horizontal line following cursor)
- Reading mask (highlighted reading area)
- Keyboard navigation mode
- Hide images toggle
- Pause animations toggle
- Link highlighting
- Focus indicator
- Preferences saved to localStorage

---

## 9. Design System

### 9.1 Brand Identity
- Full brand guidelines exist (colors, fonts, logos)
- Existing logo, favicon, and brand assets to be reused

### 9.2 Design Tokens (Tailwind)

```js
// tailwind.config.ts
module.exports = {
  theme: {
    colors: {
      primary: { /* From brand guidelines */ },
      secondary: { /* From brand guidelines */ },
      accent: { /* From brand guidelines */ },
      neutral: { /* Grays */ },
      // ...
    },
    fontFamily: {
      heading: ['Rubik', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
      nepali: ['...'], // Nepali font if needed
    },
    // ...
  }
}
```

### 9.3 Responsive Breakpoints
- **Mobile-first** approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Mobile menu: off-canvas overlay with scrollable content

### 9.4 Accessibility (WCAG 2.1 AA)
- Proper heading hierarchy (h1 → h6)
- ARIA labels on all interactive elements
- Keyboard navigable menus
- Focus visible indicators
- Color contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Alt text on all images
- Form validation with clear error messages
- Screen reader announcements for dynamic content

### 9.5 SEO
- Structured data (JSON-LD): Organization, WebSite, WebPage, BreadcrumbList, NewsArticle, Product, FAQPage
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter Card tags
- Canonical URLs
- Hreflang tags for bilingual content
- XML sitemap (auto-generated, submitted via cron)
- robots.txt

---

## 10. Deployment & Infrastructure

### 10.1 Architecture Diagram

```
User Browser
     │
     ▼
Cloudflare DNS ──→ Cloudflare Pages (Next.js SSR/ISR)
                           │
                           ▼
                  Cloudflare Workers (Hono REST API)
                      │     │     │
                      ▼     ▼     ▼
                     D1    R2   Email Workers
                           │
                           ▼
                  Cloudflare Images
```

### 10.2 Cloudflare Services

| Service | Plan | Estimated Cost |
|---------|------|---------------|
| Pages | Pro | $20/mo |
| Workers | Paid (bundled) | ~$10/mo |
| D1 | Paid (5GB) | ~$5/mo |
| R2 | Paid (10GB) | ~$2/mo |
| Images | Basic | ~$5/mo |
| **Total** | | **~$42/mo** |

### 10.3 CI/CD Pipeline (GitHub Actions)

1. **Quality**: lint + typecheck + test
2. **DB Migration**: `npx drizzle-kit migrate` on D1
3. **Deploy API**: `npx wrangler deploy`
4. **Deploy Frontend**: `npx wrangler pages deploy`

### 10.4 D1 Migration Strategy

```bash
npx drizzle-kit generate        # Generate SQL migration
npx wrangler d1 migrations apply rfil-db --remote   # Apply
```

### 10.5 Caching
- Edge cache: HTML pages (ISR), static assets (1y)
- Workers KV cache: API responses (rates 5min, branches 15min, products 1h)
- Cache invalidation on CMS publish/update

### 10.6 Security
- WAF: SQL injection, XSS, DDoS protection
- Rate limiting: 100 req/min per IP on public API
- CORS: restrict to site domain
- JWT auth: 2h access token + 7d refresh token
- File upload validation (MIME, size ≤ 10MB)
- HSTS, X-Frame-Options, X-Content-Type-Options headers

### 10.7 Email Flow

```
Contact Form / Loan Enquiry / Job Application
  → Hono Worker validates + stores in D1
  → Enqueue to Cloudflare Queue
  → Email Worker processes:
    → Confirmation to submitter
    → Notification to internal team
```

### 10.8 Cron Jobs

| Schedule | Task |
|----------|------|
| Daily midnight | Publish scheduled content |
| Daily 1am | Send newsletter digest |
| Daily 2am | Cleanup expired tokens |
| Weekly Sunday | Regenerate sitemap |
| Weekly Monday | Backup D1 to R2 |
| Weekly Monday | Cleanup temp files |

---

## 11. Implementation Phases

### Phase 1: Foundation (Month 1)

**Goal**: Project scaffold, database, API skeleton, deployment pipeline

- [ ] Initialize monorepo (Turborepo)
- [ ] Set up Next.js app with App Router + Tailwind
- [ ] Set up Hono Workers app with D1 + Drizzle
- [ ] Write all Drizzle schema definitions
- [ ] Generate and apply initial D1 migrations
- [ ] Set up Cloudflare Pages + Workers deployment
- [ ] Configure GitHub Actions CI/CD pipeline
- [ ] Set up NextAuth.js for CMS login
- [ ] Create shared package with types + Zod validators
- [ ] Build header (TopBar + MainNav + MobileMenu) with all nav items
- [ ] Build footer with all link columns
- [ ] Build breadcrumb component
- [ ] Implement i18n routing (/en/, /np/)
- [ ] Set up LanguageSwitcher component
- [ ] Deploy and verify end-to-end

**Deliverable**: Running site with navigation, i18n, database, CI/CD

### Phase 2: CMS Core (Month 2)

**Goal**: Working CMS with page management, media library, auth

- [ ] Build CMS layout (sidebar + header + content area)
- [ ] Build DataTable component (sortable, filterable, paginated)
- [ ] Build dashboard page with stats
- [ ] Build page editor with TipTap WYSIWYG
- [ ] Implement language tabs (EN/NP content pairs)
- [ ] Implement content versioning + restore
- [ ] Implement content scheduling
- [ ] Build media library with folders
- [ ] Build image uploader (drag-drop → R2 → Cloudflare Images)
- [ ] Implement roles & permissions system
- [ ] Build user management pages
- [ ] Build settings page
- [ ] Implement autosave (30s interval)
- [ ] Build SEO meta fields component

**Deliverable**: Working CMS — admin can login, create/edit/publish pages, upload media, manage users

### Phase 3: Content Templates (Month 3)

**Goal**: All product, service, team, branch templates with CMS

- [ ] Build product category manager
- [ ] Build product editor (template with features, eligibility, documents arrays)
- [ ] Build service editor (template with features, how_to_use)
- [ ] Build team member editor
- [ ] Build branch editor (with map coordinates)
- [ ] Create all product category landing pages
- [ ] Create all product detail pages (26) — CMS managed
- [ ] Create all service detail pages (14) — CMS managed
- [ ] Create team listing pages (BOD, Management, HOD, Branch Managers)
- [ ] Create branch listing page with Leaflet map
- [ ] Build custom TipTap embed blocks (RateTable, ProductGrid, etc.)

**Deliverable**: All product, service, team, and branch content is manageable via CMS

### Phase 4: Interactive Features (Month 4)

**Goal**: EMI Calculator, Branch Map, Loan Enquiry, Search, Calendar

- [ ] Build advanced EMI Calculator with amortization table & charts
- [ ] Build Loan Enquiry form with file upload
- [ ] Build Contact form with auto-reply email
- [ ] Build Careers page with job listings + application form
- [ ] Build FAQ accordion component
- [ ] Build Gallery with albums + lightbox
- [ ] Build Downloads page (categorized)
- [ ] Build Nepali Calendar page
- [ ] Build Nepali Datepicker component
- [ ] Build Site Search (FTS5 + search UI)
- [ ] Build floating calendar button
- [ ] Integrate Cloudflare Email Workers for notifications

**Deliverable**: All interactive tools functional

### Phase 5: Governance & Publications (Month 5)

**Goal**: All remaining content types and pages

- [ ] Build News editor + listing + detail pages
- [ ] Build Events editor + listing page
- [ ] Build Notices editor (7 types) + listing page
- [ ] Build Reports editor (5 types) + listing page
- [ ] Build Auction Notice editor + page
- [ ] Build Merchant & Offers editor + page
- [ ] Build Grievance system (4 pages)
- [ ] Build all About sub-pages (Introduction, Mission, etc.)
- [ ] Build all Governance pages
- [ ] Build Banking Hours page
- [ ] Build Privacy Policy page
- [ ] Build enquiry management in CMS
- [ ] Build job application management in CMS

**Deliverable**: All 60+ pages filled with content, fully manageable via CMS

### Phase 6: Polish & Launch (Month 6)

**Goal**: Accessibility, SEO, performance, training, go-live

- [ ] Build Accessibility Toolbar (floating widget)
- [ ] WCAG 2.1 AA audit + remediation
- [ ] Implement structured data (JSON-LD) on all pages
- [ ] Generate XML sitemap + submit to search engines
- [ ] Implement Open Graph + Twitter Card tags
- [ ] Implement hreflang tags
- [ ] Build Cookie Consent banner
- [ ] Build PWA manifest + service worker
- [ ] Performance optimization (Lighthouse ≥ 90)
- [ ] Load testing (simulate traffic)
- [ ] Security audit
- [ ] CMS training for content team (5-10 users)
- [ ] Documentation (user manual for CMS)
- [ ] DNS cutover to Cloudflare
- [ ] Final UAT + go-live

**Deliverable**: Production-ready site

---

## 12. Content Migration Inventory

### 12.1 Existing Content to Migrate

| Section | Pages | Type | Priority |
|---------|-------|------|----------|
| Homepage | 1 | Structured | P1 |
| About | 6 | WYSIWYG | P3 |
| Governance | 11 + sub-pages | Structured + WYSIWYG | P3 |
| Products — Savings | 1 landing + 14 detail | Templated | P1 |
| Products — Fixed | 1 landing + 2 detail | Templated | P1 |
| Products — Loans | 1 landing + 9 detail | Templated | P1 |
| Services | 1 landing + 14 detail | Templated | P2 |
| Rates | 4 pages | Structured tables | P1 |
| News | Dynamic (N articles) | WYSIWYG | P4 |
| Events | Dynamic | WYSIWYG | P4 |
| Notices | 7 types | File + metadata | P3 |
| Reports | 5 types | File + metadata | P3 |
| Gallery | Albums + images | Media | P4 |
| Downloads | Categorized | File | P4 |
| FAQ | 1 page | Q&A | P2 |
| Careers | Dynamic | Structured | P4 |
| Branches | N branches | Structured | P1 |
| Contact | 1 | Static | P1 |

### 12.2 Migration Order

1. **P1**: Homepage, Products (all 26), Rates (all 4), Branches, Contact
2. **P2**: Services (all 14), FAQ, Header/Footer content
3. **P3**: About, Governance, Notices, Reports
4. **P4**: News, Events, Gallery, Downloads, Careers
5. **P5**: Calendar data, Auctions, Merchants
6. **P6**: Final review and QA

---

## Appendix: Key Technical Decisions

### Why Hono over plain Workers?
- Built-in routing, middleware, validation
- First-class Zod integration
- Type-safe RPC option for future
- Lighter than Express/Fastify for Workers

### Why Drizzle over Prisma on D1?
- Drizzle has native D1 support (Prisma's is beta)
- Smaller bundle size (critical for Workers — 128KB limit)
- SQL-like syntax, easier to optimize queries
- Better migration tooling for D1

### Why TipTap over Quill/TinyMCE?
- Framework-agnostic but React-native wrapper exists
- Highly extensible (custom embed blocks for rates, products)
- JSON output format (not HTML) — easier to version and transform
- Active maintenance, MIT license

### Why Leaflet over Google Maps?
- No API key required (free forever)
- Works offline
- Lighter bundle
- Sufficient for branch location display

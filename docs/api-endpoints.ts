// ============================================================
// RFIL - Hono Workers REST API Endpoints
// ============================================================
// All routes prefixed with /api/
// CMS routes prefixed with /api/cms/ (require JWT auth)

// ===================== PUBLIC API =====================

// ----- PAGES -----
GET    /api/pages                      // List published pages (filter by language)
GET    /api/pages/:slug                // Get single page content
GET    /api/pages/tree                 // Get hierarchical page tree for nav

// ----- PRODUCTS -----
GET    /api/products/categories        // Product categories (savings/fixed/loan)
GET    /api/products                   // All products (filter by ?category=slug)
GET    /api/products/:slug             // Single product detail
GET    /api/products/types/:type       // Products by type (savings/fixed/loan)

// ----- SERVICES -----
GET    /api/services                   // All services
GET    /api/services/:slug             // Single service detail

// ----- RATES -----
GET    /api/rates                      // All rate categories
GET    /api/rates/:categorySlug        // Rates for category (e.g. /api/rates/savings)
GET    /api/rates/:categorySlug/latest // Current active rates only

// ----- BRANCHES -----
GET    /api/branches                   // All branches
GET    /api/branches/:id               // Single branch
GET    /api/branches/region/:region    // Filter by region (head-office/inside-valley/outside-valley)

// ----- TEAM -----
GET    /api/team/categories            // Team categories (bod/management/hod/etc.)
GET    /api/team/:categorySlug         // Members in category

// ----- NEWS -----
GET    /api/news                       // Paginated news list (?page=&limit=&category=)
GET    /api/news/featured              // Featured news for homepage
GET    /api/news/:slug                 // Single news article
GET    /api/news/categories            // News categories

// ----- EVENTS -----
GET    /api/events                     // Upcoming/past events (?status=upcoming|past)
GET    /api/events/:slug               // Single event

// ----- NOTICES -----
GET    /api/notices                    // All notices (?category=)
GET    /api/notices/categories         // Notice categories
GET    /api/notices/:slug              // Single notice

// ----- REPORTS -----
GET    /api/reports                    // All reports (?category=)
GET    /api/reports/categories         // Report categories
GET    /api/reports/:slug              // Single report

// ----- GALLERY -----
GET    /api/gallery/albums             // All albums
GET    /api/gallery/albums/:slug       // Single album with images
GET    /api/gallery/images/:id         // Single image detail

// ----- DOWNLOADS -----
GET    /api/downloads                  // All downloads (?category=)
GET    /api/downloads/categories       // Download categories

// ----- FAQ -----
GET    /api/faq                        // All FAQs (?category=)
GET    /api/faq/categories             // FAQ categories

// ----- CAREERS -----
GET    /api/careers                    // Open job listings
GET    /api/careers/:slug              // Single job detail

// ----- FORMS / SUBMISSIONS -----
POST   /api/contact                    // Submit contact form
POST   /api/loan-enquiry               // Submit loan enquiry
POST   /api/careers/apply              // Submit job application (multipart: CV upload)
POST   /api/newsletter/subscribe       // Subscribe to newsletter
POST   /api/newsletter/unsubscribe     // Unsubscribe

// ----- CALENDAR -----
GET    /api/calendar/current           // Current Nepali date info
GET    /api/calendar/month/:year/:month // Get month data
GET    /api/calendar/today             // Today's events/holidays
GET    /api/calendar/holidays/:year    // All holidays for a year

// ----- AUCTION NOTICES -----
GET    /api/auctions                   // Active auction notices
GET    /api/auctions/:slug             // Single auction detail

// ----- MERCHANT OFFERS -----
GET    /api/merchants                  // Active merchant offers

// ----- SEARCH -----
GET    /api/search?q=keyword           // Full-text search across all content
                                       // Searches: pages, products, services, news,
                                       //  notices, events, faq

// ----- HOMEPAGE -----
GET    /api/homepage                   // All homepage data (hero sliders, featured products,
                                       //  news, quick links — single optimized response)

// ----- SITEMAP -----
GET    /api/sitemap                    // Dynamic XML sitemap data
GET    /api/sitemap/news               // News sitemap
GET    /api/sitemap/products           // Products sitemap

// ===================== CMS API (JWT required) =====================

// ----- AUTH -----
POST   /api/cms/auth/login             // Login -> returns JWT + user info
POST   /api/cms/auth/logout            // Invalidate session
GET    /api/cms/auth/me                // Current user profile + permissions
POST   /api/cms/auth/change-password   // Change own password

// ----- DASHBOARD -----
GET    /api/cms/dashboard/stats        // Content counts, recent submissions, etc.
GET    /api/cms/dashboard/recent-activity // Recent edits/submissions

// ----- USERS (admin only) -----
GET    /api/cms/users                  // List users
POST   /api/cms/users                 // Create user
PUT    /api/cms/users/:id             // Update user
DELETE /api/cms/users/:id             // Delete user
GET    /api/cms/roles                 // List roles with permissions
PUT    /api/cms/roles/:id             // Update role permissions

// ----- PAGES (CMS) -----
GET    /api/cms/pages                  // All pages incl. drafts (?status=&language=)
POST   /api/cms/pages                 // Create page
GET    /api/cms/pages/:id             // Get page with all versions
PUT    /api/cms/pages/:id             // Update page
DELETE /api/cms/pages/:id             // Delete page
POST   /api/cms/pages/:id/publish     // Publish / schedule
POST   /api/cms/pages/:id/draft       // Revert to draft
GET    /api/cms/pages/:id/versions    // Version history
POST   /api/cms/pages/:id/restore/:versionId // Restore version

// ----- PRODUCTS (CMS) -----
GET    /api/cms/products               // List all
POST   /api/cms/products              // Create
PUT    /api/cms/products/:id          // Update
DELETE /api/cms/products/:id          // Delete
POST   /api/cms/products/reorder      // Reorder via drag & drop

// ----- SERVICES (CMS) -----
GET    /api/cms/services               // List
POST   /api/cms/services              // Create
PUT    /api/cms/services/:id          // Update
DELETE /api/cms/services/:id          // Delete

// ----- RATES (CMS) -----
GET    /api/cms/rates                  // List all rates
POST   /api/cms/rates                 // Create new rate
PUT    /api/cms/rates/:id             // Update rate
DELETE /api/cms/rates/:id             // Delete rate
POST   /api/cms/rates/:id/supersede   // Mark as superseded + create new version
GET    /api/cms/rates/:id/versions    // View version history

// ----- TEAM (CMS) -----
GET    /api/cms/team/members           // List all
POST   /api/cms/team/members          // Create
PUT    /api/cms/team/members/:id      // Update
DELETE /api/cms/team/members/:id      // Delete

// ----- BRANCHES (CMS) -----
GET    /api/cms/branches               // List
POST   /api/cms/branches              // Create
PUT    /api/cms/branches/:id          // Update
DELETE /api/cms/branches/:id          // Delete

// ----- NEWS (CMS) -----
GET    /api/cms/news                   // List
POST   /api/cms/news                  // Create
PUT    /api/cms/news/:id              // Update
DELETE /api/cms/news/:id              // Delete

// ----- EVENTS (CMS) -----
GET    /api/cms/events                 // List
POST   /api/cms/events                // Create
PUT    /api/cms/events/:id            // Update
DELETE /api/cms/events/:id            // Delete

// ----- NOTICES (CMS) -----
GET    /api/cms/notices                // List
POST   /api/cms/notices               // Create
PUT    /api/cms/notices/:id           // Update
DELETE /api/cms/notices/:id           // Delete

// ----- REPORTS (CMS) -----
GET    /api/cms/reports                // List
POST   /api/cms/reports               // Create (file upload)
PUT    /api/cms/reports/:id           // Update
DELETE /api/cms/reports/:id           // Delete

// ----- GALLERY (CMS) -----
GET    /api/cms/gallery/albums         // List albums
POST   /api/cms/gallery/albums        // Create album
PUT    /api/cms/gallery/albums/:id    // Update album
DELETE /api/cms/gallery/albums/:id    // Delete album
POST   /api/cms/gallery/albums/:id/images  // Upload images to album
DELETE /api/cms/gallery/images/:id    // Delete image
POST   /api/cms/gallery/images/reorder     // Reorder images

// ----- DOWNLOADS (CMS) -----
GET    /api/cms/downloads              // List
POST   /api/cms/downloads             // Create
PUT    /api/cms/downloads/:id         // Update
DELETE /api/cms/downloads/:id         // Delete

// ----- FAQ (CMS) -----
GET    /api/cms/faq                    // List
POST   /api/cms/faq                   // Create
PUT    /api/cms/faq/:id              // Update
DELETE /api/cms/faq/:id              // Delete

// ----- CAREERS (CMS) -----
GET    /api/cms/careers                // Job listings
POST   /api/cms/careers               // Create listing
PUT    /api/cms/careers/:id           // Update
DELETE /api/cms/careers/:id           // Delete
GET    /api/cms/careers/:id/applications // View applications for a job
PUT    /api/cms/careers/applications/:id/status // Update application status

// ----- CALENDAR (CMS) -----
POST   /api/cms/calendar/events       // Add calendar event/holiday
PUT    /api/cms/calendar/events/:id   // Update
DELETE /api/cms/calendar/events/:id   // Delete
POST   /api/cms/calendar/import       // Import calendar data (CSV/JSON)

// ----- AUCTIONS (CMS) -----
GET    /api/cms/auctions               // List
POST   /api/cms/auctions              // Create
PUT    /api/cms/auctions/:id          // Update
DELETE /api/cms/auctions/:id          // Delete

// ----- MERCHANTS (CMS) -----
GET    /api/cms/merchants              // List
POST   /api/cms/merchants             // Create
PUT    /api/cms/merchants/:id         // Update
DELETE /api/cms/merchants/:id         // Delete

// ----- MEDIA (CMS) -----
GET    /api/cms/media                  // List media (?folder=&page=&limit=)
POST   /api/cms/media/upload          // Upload file(s) — multipart
PUT    /api/cms/media/:id             // Update metadata (alt, caption)
DELETE /api/cms/media/:id             // Delete from R2 + DB
POST   /api/cms/media/folder          // Create folder
GET    /api/cms/media/folders          // Folder tree

// ----- SETTINGS (CMS) -----
GET    /api/cms/settings               // All settings
PUT    /api/cms/settings/:key         // Update a setting
POST   /api/cms/settings/logo         // Upload logo
POST   /api/cms/settings/hero-slides  // Update hero carousel slides

// ----- ENQUIRIES (CMS) -----
GET    /api/cms/enquiries/contact      // Contact form submissions
GET    /api/cms/enquiries/loans        // Loan enquiries
GET    /api/cms/enquiries/newsletter   // Newsletter subscribers
PUT    /api/cms/enquiries/contact/:id/read // Mark as read
PUT    /api/cms/enquiries/loans/:id/status // Update loan enquiry status
DELETE /api/cms/enquiries/contact/:id  // Delete
DELETE /api/cms/enquiries/loans/:id    // Delete

// ----- ANALYTICS -----
GET    /api/cms/analytics/page-views   // Basic page view stats (from D1 or GA4 API)
GET    /api/cms/analytics/enquiries    // Enquiry trends over time

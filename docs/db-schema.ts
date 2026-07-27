// ============================================================
// RFIL - D1 Database Schema (Drizzle ORM)
// ============================================================

// ---------- AUTH & USERS ----------
export const users = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  roleId: int('role_id').references(() => roles.id),
  avatar: text('avatar'),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  lastLoginAt: text('last_login_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const roles = sqliteTable('roles', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // admin, editor, author, reviewer, publisher
  description: text('description'),
  permissions: text('permissions', { mode: 'json' }).notNull(),
  // permissions shape: { pages: ['create','read','update','delete','publish'],
  //                       products: [...], services: [...], news: [...], etc. }
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- CMS: PAGES ----------
export const pages = sqliteTable('pages', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  content: text('content'), // JSON from TipTap editor
  bannerImage: text('banner_image'),
  language: text('language').notNull().default('en'), // en | np
  parentId: int('parent_id').references((): any => pages.id),
  template: text('template').default('default'), // default, full-width, landing
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  metaKeywords: text('meta_keywords'),
  ogImage: text('og_image'),
  status: text('status').notNull().default('draft'), // draft | published | archived
  publishedAt: text('published_at'),
  scheduledAt: text('scheduled_at'),
  sortOrder: int('sort_order').default(0),
  createdBy: int('created_by').references(() => users.id),
  updatedBy: int('updated_by').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const pageVersions = sqliteTable('page_versions', {
  id: int('id').primaryKey({ autoIncrement: true }),
  pageId: int('page_id').notNull().references(() => pages.id),
  content: text('content', { mode: 'json' }).notNull(), // full snapshot
  versionNumber: int('version_number').notNull(),
  createdBy: int('created_by').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- CMS: MEDIA LIBRARY ----------
export const media = sqliteTable('media', {
  id: int('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: int('size').notNull(),
  width: int('width'),
  height: int('height'),
  altText: text('alt_text'),
  caption: text('caption'),
  url: text('url').notNull(),          // R2 public URL
  thumbUrl: text('thumb_url'),          // R2 thumbnail
  variants: text('variants', { mode: 'json' }), // { sm: url, md: url, lg: url }
  folderId: int('folder_id').references(() => mediaFolders.id),
  uploadedBy: int('uploaded_by').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const mediaFolders = sqliteTable('media_folders', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  parentId: int('parent_id').references((): any => mediaFolders.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- PRODUCTS (Savings / Fixed / Loans) ----------
export const productCategories = sqliteTable('product_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  description: text('description'),
  icon: text('icon'),
  type: text('type').notNull(), // 'savings' | 'fixed' | 'loan'
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const products = sqliteTable('products', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => productCategories.id),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  summary: text('summary'),
  content: text('content'),           // WYSIWYG body
  icon: text('icon'),
  bannerImage: text('banner_image'),
  features: text('features', { mode: 'json' }),       // string[]
  eligibility: text('eligibility', { mode: 'json' }), // string[]
  documentsRequired: text('documents_required', { mode: 'json' }), // string[]
  interestRateInfo: text('interest_rate_info'),       // free text about rate
  minAmount: real('min_amount'),
  maxAmount: real('max_amount'),
  maxTenure: text('max_tenure'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  status: text('status').default('draft'),
  sortOrder: int('sort_order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- SERVICES ----------
export const services = sqliteTable('services', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  summary: text('summary'),
  content: text('content'),
  icon: text('icon'),
  bannerImage: text('banner_image'),
  features: text('features', { mode: 'json' }),
  howToUse: text('how_to_use', { mode: 'json' }),   // step-by-step
  charges: text('charges'),
  isExternal: int('is_external', { mode: 'boolean' }).default(false),
  externalUrl: text('external_url'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  status: text('status').default('draft'),
  sortOrder: int('sort_order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- RATES ----------
export const rateCategories = sqliteTable('rate_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  type: text('type').notNull(), // 'savings' | 'fixed' | 'loan' | 'service' | 'tariff' | 'forex'
  sortOrder: int('sort_order').default(0),
});

export const rates = sqliteTable('rates', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => rateCategories.id),
  productName: text('product_name').notNull(),
  tenure: text('tenure'),              // e.g. "3 months", "1 year"
  rateType: text('rate_type'),         // 'fixed' | 'floating' | 'minimum' | 'maximum'
  minRate: real('min_rate'),
  maxRate: real('max_rate'),
  singleRate: real('single_rate'),
  effectiveDate: text('effective_date').notNull(),
  notes: text('notes'),
  status: text('status').default('active'), // active | superseded
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const rateVersions = sqliteTable('rate_versions', {
  id: int('id').primaryKey({ autoIncrement: true }),
  rateId: int('rate_id').references(() => rates.id),
  snapshot: text('snapshot', { mode: 'json' }).notNull(),
  version: int('version').notNull(),
  createdBy: int('created_by').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- TEAM / GOVERNANCE ----------
export const teamCategories = sqliteTable('team_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  description: text('description'),
  sortOrder: int('sort_order').default(0),
});

export const teamMembers = sqliteTable('team_members', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => teamCategories.id),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  designation: text('designation').notNull(),
  designationNp: text('designation_np'),
  photo: text('photo'),
  bio: text('bio'),
  email: text('email'),
  phone: text('phone'),
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- BRANCHES ----------
export const branches = sqliteTable('branches', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  address: text('address').notNull(),
  addressNp: text('address_np'),
  phone: text('phone'),
  email: text('email'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  region: text('region'), // 'head-office' | 'inside-valley' | 'outside-valley' | 'contact-office'
  services: text('services', { mode: 'json' }),    // list of service slugs
  bankingHours: text('banking_hours'),
  bankingHoursNp: text('banking_hours_np'),
  managerName: text('manager_name'),
  image: text('image'),
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- NEWS & EVENTS ----------
export const newsCategories = sqliteTable('news_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
});

export const news = sqliteTable('news', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').references(() => newsCategories.id),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  summary: text('summary'),
  content: text('content'),
  image: text('image'),
  language: text('language').default('en'),
  isFeatured: int('is_featured', { mode: 'boolean' }).default(false),
  status: text('status').default('draft'),
  publishedAt: text('published_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable('events', {
  id: int('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  eventDate: text('event_date').notNull(),
  venue: text('venue'),
  venueNp: text('venue_np'),
  image: text('image'),
  status: text('status').default('draft'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- NOTICES ----------
export const noticeCategories = sqliteTable('notice_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),       // AGM Notice, Dividend, Tender, General, etc.
  nameNp: text('name_np'),
});

export const notices = sqliteTable('notices', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => noticeCategories.id),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  fileUrl: text('file_url'),           // PDF in R2
  fileSize: int('file_size'),
  publishedDate: text('published_date'),
  status: text('status').default('draft'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- REPORTS ----------
export const reportCategories = sqliteTable('report_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),       // Annual Report, Quarterly, AGM Minute, Basel II, SEBON
  nameNp: text('name_np'),
});

export const reports = sqliteTable('reports', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => reportCategories.id),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  fiscalYear: text('fiscal_year'),    // e.g. "2081/82"
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileSize: int('file_size'),
  coverImage: text('cover_image'),
  status: text('status').default('draft'),
  publishedAt: text('published_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- GALLERY ----------
export const albums = sqliteTable('albums', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  description: text('description'),
  coverImage: text('cover_image'),
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const galleryImages = sqliteTable('gallery_images', {
  id: int('id').primaryKey({ autoIncrement: true }),
  albumId: int('album_id').notNull().references(() => albums.id),
  imageUrl: text('image_url').notNull(),
  thumbUrl: text('thumb_url'),
  caption: text('caption'),
  captionNp: text('caption_np'),
  sortOrder: int('sort_order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- DOWNLOADS ----------
export const downloadCategories = sqliteTable('download_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  sortOrder: int('sort_order').default(0),
});

export const downloads = sqliteTable('downloads', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').notNull().references(() => downloadCategories.id),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileSize: int('file_size'),
  icon: text('icon'),
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- FAQ ----------
export const faqCategories = sqliteTable('faq_categories', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameNp: text('name_np'),
  sortOrder: int('sort_order').default(0),
});

export const faqs = sqliteTable('faqs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  categoryId: int('category_id').references(() => faqCategories.id),
  question: text('question').notNull(),
  questionNp: text('question_np'),
  answer: text('answer').notNull(),
  answerNp: text('answer_np'),
  sortOrder: int('sort_order').default(0),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- CAREERS ----------
export const jobListings = sqliteTable('job_listings', {
  id: int('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  department: text('department'),
  location: text('location'),
  type: text('type'),                  // full-time | part-time | contract
  description: text('description'),
  requirements: text('requirements', { mode: 'json' }), // string[]
  minExperience: text('min_experience'),
  deadline: text('deadline'),
  status: text('status').default('open'), // open | closed | draft
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const jobApplications = sqliteTable('job_applications', {
  id: int('id').primaryKey({ autoIncrement: true }),
  jobId: int('job_id').notNull().references(() => jobListings.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address'),
  cvUrl: text('cv_url').notNull(),      // R2 file URL
  coverLetter: text('cover_letter'),
  status: text('status').default('new'), // new | reviewed | shortlisted | rejected | hired
  appliedAt: text('applied_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- ENQUIRIES & CONTACT ----------
export const contactSubmissions = sqliteTable('contact_submissions', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  isRead: int('is_read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const loanEnquiries = sqliteTable('loan_enquiries', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  nationality: text('nationality').notNull(),
  customerProfile: text('customer_profile'), // individual | corporate | joint
  loanType: text('loan_type').notNull(),
  proposedAmount: real('proposed_amount'),
  preferredBranch: text('preferred_branch'),
  remarks: text('remarks'),
  consent: int('consent', { mode: 'boolean' }).default(false),
  status: text('status').default('new'), // new | contacted | processed | closed
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  language: text('language').default('en'),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  subscribedAt: text('subscribed_at').default(sql`CURRENT_TIMESTAMP`),
  unsubscribedAt: text('unsubscribed_at'),
});

// ---------- NEPALI CALENDAR ----------
export const calendarEvents = sqliteTable('calendar_events', {
  id: int('id').primaryKey({ autoIncrement: true }),
  bsYear: int('bs_year').notNull(),
  bsMonth: int('bs_month').notNull(),
  bsDay: int('bs_day').notNull(),
  adDate: text('ad_date').notNull(),
  dayOfWeek: int('day_of_week'), // 0=Sun ... 6=Sat
  tithi: text('tithi'),
  festival: text('festival'),
  festivalNp: text('festival_np'),
  isHoliday: int('is_holiday', { mode: 'boolean' }).default(false),
  event: text('event'),
  eventNp: text('event_np'),
});

// ---------- AUCTION NOTICE ----------
export const auctionNotices = sqliteTable('auction_notices', {
  id: int('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  titleNp: text('title_np'),
  slug: text('slug').notNull().unique(),
  propertyType: text('property_type'), // land | building | vehicle | other
  location: text('location'),
  auctionDate: text('auction_date'),
  minimumPrice: real('minimum_price'),
  description: text('description'),
  documents: text('documents', { mode: 'json' }),
  fileUrl: text('file_url'),
  status: text('status').default('draft'),
  publishedAt: text('published_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- MERCHANT & OFFERS ----------
export const merchantOffers = sqliteTable('merchant_offers', {
  id: int('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  merchantName: text('merchant_name').notNull(),
  logo: text('logo'),
  description: text('description'),
  offerDetails: text('offer_details'),
  discountPercent: text('discount_percent'),
  validUntil: text('valid_until'),
  website: text('website'),
  phone: text('phone'),
  address: text('address'),
  isActive: int('is_active', { mode: 'boolean' }).default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// ---------- SITE SETTINGS ----------
export const siteSettings = sqliteTable('site_settings', {
  id: int('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value', { mode: 'json' }).notNull(),
  description: text('description'),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Expected settings keys:
// site_name, site_description, logo_url, favicon_url,
// contact_phone, contact_email, contact_address,
// social_media: { facebook, twitter, youtube, linkedin, instagram },
// google_analytics_id, google_maps_api_key,
// home_hero_slides: [{ image, title, subtitle, cta_text, cta_link }],
// footer_columns, banking_hours, etc.

// ---------- SEARCH INDEX (FTS5) ----------
// D1 supports FTS5 for full-text search
// We create a virtual table and maintain it via triggers
// CREATE VIRTUAL TABLE search_idx USING fts5(
//   content, title, slug, language,
//   content='pages', content_rowid='id'
// );

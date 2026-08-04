import { sqliteTable, text, int, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ── Users & Auth ──

export const roles = sqliteTable("roles", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  permissions: text("permissions", { mode: "json" }).notNull().$type<Record<string, string[]>>(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  roleId: int("role_id").references(() => roles.id),
  avatar: text("avatar"),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── CMS: Pages ──

export const pages = sqliteTable("pages", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  content: text("content"),
  contentNp: text("content_np"),
  bannerImage: text("banner_image"),
  language: text("language").notNull().default("en"),
  parentId: int("parent_id").references((): any => pages.id),
  template: text("template").default("default"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  ogImage: text("og_image"),
  status: text("status").notNull().default("draft"),
  publishedAt: text("published_at"),
  scheduledAt: text("scheduled_at"),
  sortOrder: int("sort_order").default(0),
  createdBy: int("created_by").references(() => users.id),
  updatedBy: int("updated_by").references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const pageVersions = sqliteTable("page_versions", {
  id: int("id").primaryKey({ autoIncrement: true }),
  pageId: int("page_id").notNull().references(() => pages.id),
  content: text("content", { mode: "json" }).notNull(),
  versionNumber: int("version_number").notNull(),
  createdBy: int("created_by").references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Media ──

export const mediaFolders = sqliteTable("media_folders", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  parentId: int("parent_id").references((): any => mediaFolders.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const media = sqliteTable("media", {
  id: int("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: int("size").notNull(),
  width: int("width"),
  height: int("height"),
  altText: text("alt_text"),
  caption: text("caption"),
  url: text("url").notNull(),
  thumbUrl: text("thumb_url"),
  variants: text("variants", { mode: "json" }).$type<Record<string, string>>(),
  folderId: int("folder_id").references(() => mediaFolders.id),
  uploadedBy: int("uploaded_by").references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Products ──

export const productCategories = sqliteTable("product_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  description: text("description"),
  icon: text("icon"),
  type: text("type").notNull().$type<"savings" | "fixed" | "loan">(),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const products = sqliteTable("products", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => productCategories.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  summary: text("summary"),
  content: text("content"),
  icon: text("icon"),
  bannerImage: text("banner_image"),
  features: text("features", { mode: "json" }).$type<string[]>(),
  eligibility: text("eligibility", { mode: "json" }).$type<string[]>(),
  documentsRequired: text("documents_required", { mode: "json" }).$type<string[]>(),
  interestRateInfo: text("interest_rate_info"),
  minAmount: real("min_amount"),
  maxAmount: real("max_amount"),
  maxTenure: text("max_tenure"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").default("draft"),
  audience: text("audience").$type<"personal" | "business" | "digital">().default("personal"),
  isFeatured: int("is_featured", { mode: "boolean" }).default(false),
  isPopular: int("is_popular", { mode: "boolean" }).default(false),
  details: text("details", { mode: "json" }).$type<Record<string, any>>(),
  sortOrder: int("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Services ──

export const services = sqliteTable("services", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  summary: text("summary"),
  content: text("content"),
  icon: text("icon"),
  bannerImage: text("banner_image"),
  features: text("features", { mode: "json" }).$type<string[]>(),
  howToUse: text("how_to_use", { mode: "json" }).$type<string[]>(),
  charges: text("charges"),
  isExternal: int("is_external", { mode: "boolean" }).default(false),
  externalUrl: text("external_url"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").default("draft"),
  sortOrder: int("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Rates ──

export const rateCategories = sqliteTable("rate_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  type: text("type").notNull().$type<"savings" | "fixed" | "loan" | "service" | "tariff" | "forex">(),
  sortOrder: int("sort_order").default(0),
});

export const rates = sqliteTable("rates", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => rateCategories.id),
  productName: text("product_name").notNull(),
  tenure: text("tenure"),
  rateType: text("rate_type").$type<"fixed" | "floating" | "minimum" | "maximum">(),
  minRate: real("min_rate"),
  maxRate: real("max_rate"),
  singleRate: real("single_rate"),
  effectiveDate: text("effective_date").notNull(),
  notes: text("notes"),
  status: text("status").default("active"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const rateVersions = sqliteTable("rate_versions", {
  id: int("id").primaryKey({ autoIncrement: true }),
  rateId: int("rate_id").references(() => rates.id),
  snapshot: text("snapshot", { mode: "json" }).notNull(),
  version: int("version").notNull(),
  createdBy: int("created_by").references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Team ──

export const teamCategories = sqliteTable("team_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  description: text("description"),
  sortOrder: int("sort_order").default(0),
});

export const teamMembers = sqliteTable("team_members", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => teamCategories.id),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  designation: text("designation").notNull(),
  designationNp: text("designation_np"),
  photo: text("photo"),
  bio: text("bio"),
  email: text("email"),
  phone: text("phone"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Branches ──

export const branches = sqliteTable("branches", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  address: text("address").notNull(),
  addressNp: text("address_np"),
  province: text("province"),
  district: text("district"),
  localBody: text("local_body"),
  phone: text("phone"),
  email: text("email"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  region: text("region").$type<"head-office" | "inside-valley" | "outside-valley">(),
  services: text("services", { mode: "json" }).$type<string[]>(),
  bankingHours: text("banking_hours"),
  bankingHoursNp: text("banking_hours_np"),
  managerName: text("manager_name"),
  image: text("image"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── News & Events ──

export const newsCategories = sqliteTable("news_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
});

export const news = sqliteTable("news", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").references(() => newsCategories.id),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  summary: text("summary"),
  content: text("content"),
  image: text("image"),
  language: text("language").default("en"),
  isFeatured: int("is_featured", { mode: "boolean" }).default(false),
  status: text("status").default("draft"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable("events", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  eventDate: text("event_date").notNull(),
  venue: text("venue"),
  venueNp: text("venue_np"),
  image: text("image"),
  status: text("status").default("draft"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Notices ──

export const noticeCategories = sqliteTable("notice_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
});

export const notices = sqliteTable("notices", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => noticeCategories.id),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fileUrl: text("file_url"),
  fileSize: int("file_size"),
  publishedDate: text("published_date"),
  status: text("status").default("draft"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Reports ──

export const reportCategories = sqliteTable("report_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
});

export const reports = sqliteTable("reports", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => reportCategories.id),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  fiscalYear: text("fiscal_year"),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileSize: int("file_size"),
  coverImage: text("cover_image"),
  status: text("status").default("draft"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Gallery ──

export const albums = sqliteTable("albums", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  description: text("description"),
  coverImage: text("cover_image"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: int("id").primaryKey({ autoIncrement: true }),
  albumId: int("album_id").notNull().references(() => albums.id),
  imageUrl: text("image_url").notNull(),
  thumbUrl: text("thumb_url"),
  caption: text("caption"),
  captionNp: text("caption_np"),
  sortOrder: int("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Downloads ──

export const downloadCategories = sqliteTable("download_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  sortOrder: int("sort_order").default(0),
});

export const downloads = sqliteTable("downloads", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").notNull().references(() => downloadCategories.id),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileSize: int("file_size"),
  icon: text("icon"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── FAQ ──

export const faqCategories = sqliteTable("faq_categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameNp: text("name_np"),
  sortOrder: int("sort_order").default(0),
});

export const faqs = sqliteTable("faqs", {
  id: int("id").primaryKey({ autoIncrement: true }),
  categoryId: int("category_id").references(() => faqCategories.id),
  question: text("question").notNull(),
  questionNp: text("question_np"),
  answer: text("answer").notNull(),
  answerNp: text("answer_np"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Careers ──

export const jobListings = sqliteTable("job_listings", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  department: text("department"),
  location: text("location"),
  type: text("type").$type<"full-time" | "part-time" | "contract">(),
  description: text("description"),
  requirements: text("requirements", { mode: "json" }).$type<string[]>(),
  minExperience: text("min_experience"),
  deadline: text("deadline"),
  status: text("status").default("open"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const jobApplications = sqliteTable("job_applications", {
  id: int("id").primaryKey({ autoIncrement: true }),
  jobId: int("job_id").notNull().references(() => jobListings.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  province: text("province"),
  district: text("district"),
  localBody: text("local_body"),
  cvUrl: text("cv_url").notNull(),
  coverLetter: text("cover_letter"),
  status: text("status").default("new"),
  appliedAt: text("applied_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Enquiries & Subscriptions ──

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: int("is_read", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const loanEnquiries = sqliteTable("loan_enquiries", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  province: text("province"),
  district: text("district"),
  localBody: text("local_body"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  nationality: text("nationality").notNull(),
  customerProfile: text("customer_profile"),
  loanType: text("loan_type").notNull(),
  proposedAmount: real("proposed_amount"),
  preferredBranch: text("preferred_branch"),
  remarks: text("remarks"),
  consent: int("consent", { mode: "boolean" }).default(false),
  status: text("status").default("new"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  language: text("language").default("en"),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  subscribedAt: text("subscribed_at").default(sql`CURRENT_TIMESTAMP`),
  unsubscribedAt: text("unsubscribed_at"),
});

// ── Nepali Calendar ──

export const calendarEvents = sqliteTable("calendar_events", {
  id: int("id").primaryKey({ autoIncrement: true }),
  bsYear: int("bs_year").notNull(),
  bsMonth: int("bs_month").notNull(),
  bsDay: int("bs_day").notNull(),
  adDate: text("ad_date").notNull(),
  dayOfWeek: int("day_of_week"),
  tithi: text("tithi"),
  festival: text("festival"),
  festivalNp: text("festival_np"),
  isHoliday: int("is_holiday", { mode: "boolean" }).default(false),
  event: text("event"),
  eventNp: text("event_np"),
});

// ── Auction Notices ──

export const auctionNotices = sqliteTable("auction_notices", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  slug: text("slug").notNull().unique(),
  propertyType: text("property_type").$type<"land" | "building" | "vehicle" | "other">(),
  location: text("location"),
  auctionDate: text("auction_date"),
  minimumPrice: real("minimum_price"),
  description: text("description"),
  documents: text("documents", { mode: "json" }).$type<string[]>(),
  fileUrl: text("file_url"),
  status: text("status").default("draft"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Merchant Offers ──

export const merchantOffers = sqliteTable("merchant_offers", {
  id: int("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  merchantName: text("merchant_name").notNull(),
  logo: text("logo"),
  description: text("description"),
  offerDetails: text("offer_details"),
  discountPercent: text("discount_percent"),
  validUntil: text("valid_until"),
  website: text("website"),
  phone: text("phone"),
  address: text("address"),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  sortOrder: int("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Site Settings ──

export const siteSettings = sqliteTable("site_settings", {
  id: int("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value", { mode: "json" }).notNull(),
  description: text("description"),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Homepage: Hero Slides ──
export const heroSlides = sqliteTable("hero_slides", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  description: text("description").notNull(),
  descriptionNp: text("description_np"),
  imageUrl: text("image_url").notNull(),
  ctaPrimaryText: text("cta_primary_text"),
  ctaPrimaryLink: text("cta_primary_link"),
  ctaSecondaryText: text("cta_secondary_text"),
  ctaSecondaryLink: text("cta_secondary_link"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Homepage: Core Offerings Cards ──
export const offeringCards = sqliteTable("offering_cards", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  summary: text("summary").notNull(),
  summaryNp: text("summary_np"),
  icon: text("icon").notNull(),
  badge: text("badge"),
  badgeNp: text("badge_np"),
  linkText: text("link_text").notNull(),
  linkUrl: text("link_url").notNull(),
  widgetType: text("widget_type").$type<"savings" | "loan" | "digital" | "branch" | "none">().default("none"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Homepage: Offering Sub-links ──
export const offeringLinks = sqliteTable("offering_links", {
  id: int("id").primaryKey({ autoIncrement: true }),
  cardId: int("card_id").notNull().references(() => offeringCards.id),
  label: text("label").notNull(),
  labelNp: text("label_np"),
  url: text("url").notNull(),
  icon: text("icon").default("chevron-right"),
  sortOrder: int("sort_order").default(0),
});

// ── Homepage: Site Statistics ──
export const siteStats = sqliteTable("site_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  labelNp: text("label_np"),
  value: text("value").notNull(),
  suffix: text("suffix").default("+"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
});

// ── Homepage: App Banner Settings ──
export const appBanner = sqliteTable("app_banner", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  description: text("description").notNull(),
  descriptionNp: text("description_np"),
  imageUrl: text("image_url"),
  androidUrl: text("android_url"),
  iosUrl: text("ios_url"),
  badgeText: text("badge_text").default("Go Digital"),
  badgeTextNp: text("badge_text_np"),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Homepage: CSR Activities ──
export const csrActivities = sqliteTable("csr_activities", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleNp: text("title_np"),
  summary: text("summary").notNull(),
  summaryNp: text("summary_np"),
  imageUrl: text("image_url"),
  date: text("date"),
  linkUrl: text("link_url"),
  sortOrder: int("sort_order").default(0),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Reviews & Testimonials ──
export const reviews = sqliteTable("reviews", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  rating: int("rating").notNull().default(5),
  review: text("review").notNull(),
  productId: int("product_id").references(() => products.id),
  isApproved: int("is_approved", { mode: "boolean" }).default(false),
  isFeatured: int("is_featured", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Appointments ──
export const appointments = sqliteTable("appointments", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  meetingType: text("meeting_type").$type<"in-person" | "by-phone">().default("in-person"),
  branch: text("branch"),
  service: text("service"),
  reason: text("reason"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  status: text("status").default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ── Staff Trainings (MIS) ──
export const trainings = sqliteTable("trainings", {
  id: int("id").primaryKey({ autoIncrement: true }),
  year: text("year").notNull(),
  date: text("date").notNull(),
  name: text("name"),
  position: text("position"),
  branch: text("branch"),
  program: text("program").notNull(),
  organizer: text("organizer"),
  resourcePerson: text("resource_person"),
  duration: text("duration"),
});

// ── Navigation ──

export const navigation = sqliteTable("navigation", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  locale: text("locale").notNull().default("en"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const navigationItems = sqliteTable("navigation_items", {
  id: int("id").primaryKey({ autoIncrement: true }),
  navigationId: int("navigation_id").notNull().references(() => navigation.id, { onDelete: "cascade" }),
  parentId: int("parent_id").references((): any => navigationItems.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  href: text("href"),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  description: text("description"),
  sortOrder: int("sort_order").default(0),
  isOpenInNewTab: int("is_open_in_new_tab", { mode: "boolean" }).default(false),
  isActive: int("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

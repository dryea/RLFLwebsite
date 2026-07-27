// ── Enums ──

export type PageStatus = "draft" | "published" | "archived";
export type ProductType = "savings" | "fixed" | "loan";
export type RateType = "savings" | "fixed" | "loan" | "service" | "tariff" | "forex";
export type RateValueType = "fixed" | "floating" | "minimum" | "maximum";
export type BranchRegion = "head-office" | "inside-valley" | "outside-valley";
export type JobType = "full-time" | "part-time" | "contract";
export type JobStatus = "open" | "closed" | "draft";
export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected" | "hired";
export type EnquiryStatus = "new" | "contacted" | "processed" | "closed";
export type PropertyType = "land" | "building" | "vehicle" | "other";
export type Language = "en" | "np";

// ── CMS: Page ──

export interface PageData {
  slug: string;
  title: string;
  content?: string;
  bannerImage?: string;
  language: Language;
  parentId?: number;
  template: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  status: PageStatus;
  publishedAt?: string;
  scheduledAt?: string;
  sortOrder: number;
}

// ── Products ──

export interface ProductData {
  categoryId: number;
  slug: string;
  title: string;
  titleNp?: string;
  summary?: string;
  content?: string;
  icon?: string;
  bannerImage?: string;
  features?: string[];
  eligibility?: string[];
  documentsRequired?: string[];
  interestRateInfo?: string;
  minAmount?: number;
  maxAmount?: number;
  maxTenure?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: PageStatus;
  sortOrder: number;
}

// ── Services ──

export interface ServiceData {
  slug: string;
  title: string;
  titleNp?: string;
  summary?: string;
  content?: string;
  icon?: string;
  bannerImage?: string;
  features?: string[];
  howToUse?: string[];
  charges?: string;
  isExternal: boolean;
  externalUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: PageStatus;
  sortOrder: number;
}

// ── Rates ──

export interface RateData {
  categoryId: number;
  productName: string;
  tenure?: string;
  rateType?: RateValueType;
  minRate?: number;
  maxRate?: number;
  singleRate?: number;
  effectiveDate: string;
  notes?: string;
}

// ── Team ──

export interface TeamMemberData {
  categoryId: number;
  name: string;
  nameNp?: string;
  designation: string;
  designationNp?: string;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  sortOrder: number;
  isActive: boolean;
}

// ── Branch ──

export interface BranchData {
  name: string;
  nameNp?: string;
  address: string;
  addressNp?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  region?: BranchRegion;
  services?: string[];
  bankingHours?: string;
  bankingHoursNp?: string;
  managerName?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

// ── News ──

export interface NewsData {
  categoryId?: number;
  title: string;
  titleNp?: string;
  slug: string;
  summary?: string;
  content?: string;
  image?: string;
  language: Language;
  isFeatured: boolean;
  status: PageStatus;
  publishedAt?: string;
}

// ── Enquiry Forms ──

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LoanEnquiryData {
  name: string;
  address: string;
  phone: string;
  email: string;
  nationality: string;
  customerProfile?: string;
  loanType: string;
  proposedAmount?: number;
  preferredBranch?: string;
  remarks?: string;
  consent: boolean;
}

// ── Career ──

export interface JobApplicationData {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  cvFile: File;
  coverLetter?: string;
}

// ── Newsletter ──

export interface NewsletterData {
  email: string;
  language?: Language;
}

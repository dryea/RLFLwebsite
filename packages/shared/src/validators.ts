import { z } from "zod";

// ── Contact Form ──

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ── Loan Enquiry ──

export const loanEnquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(7, "Valid phone is required"),
  email: z.string().email("Valid email is required"),
  nationality: z.string().min(2, "Nationality is required"),
  customerProfile: z.string().optional(),
  loanType: z.string().min(1, "Loan type is required"),
  proposedAmount: z.number().positive().optional(),
  preferredBranch: z.string().optional(),
  remarks: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

// ── Newsletter ──

export const newsletterSchema = z.object({
  email: z.string().email("Valid email is required"),
  language: z.enum(["en", "np"]).default("en"),
});

// ── Job Application ──

export const jobApplicationSchema = z.object({
  jobId: z.number().positive(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone is required"),
  address: z.string().optional(),
  coverLetter: z.string().optional(),
});

// ── CMS: Page ──

export const cmsPageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  bannerImage: z.string().optional(),
  language: z.enum(["en", "np"]).default("en"),
  parentId: z.number().optional(),
  template: z.string().default("default"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  ogImage: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  scheduledAt: z.string().optional(),
  sortOrder: z.number().default(0),
});

// ── CMS: Product ──

export const cmsProductSchema = z.object({
  categoryId: z.number().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  titleNp: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  bannerImage: z.string().optional(),
  features: z.array(z.string()).optional(),
  eligibility: z.array(z.string()).optional(),
  documentsRequired: z.array(z.string()).optional(),
  interestRateInfo: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  maxTenure: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  sortOrder: z.number().default(0),
});

// ── CMS: Login ──

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type LoanEnquiryInput = z.infer<typeof loanEnquirySchema>;
export type CmsPageInput = z.infer<typeof cmsPageSchema>;
export type CmsProductInput = z.infer<typeof cmsProductSchema>;

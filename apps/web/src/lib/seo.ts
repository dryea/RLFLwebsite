import { serverFetchAPI, serverFetchAPIRevalidate } from "@/lib/server-api";

export interface SeoGlobalSettings {
  siteTitle?: string;
  tagline?: string;
  siteUrl?: string;
  defaultTitleTemplate?: string;
  defaultDescription?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  sitemapEnabled?: boolean;
  sitemapIncludeProducts?: boolean;
  sitemapIncludeServices?: boolean;
  sitemapIncludeNews?: boolean;
  schemaOrgType?: string;
  schemaOrgName?: string;
  schemaOrgLogo?: string;
  schemaOrgAddress?: string;
  schemaOrgPhone?: string;
  schemaOrgEmail?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialLinkedIn?: string;
  socialInstagram?: string;
  socialYouTube?: string;
  ogImage?: string;
  twitterCardType?: string;
}

export async function getSeoSettings(): Promise<SeoGlobalSettings> {
  try {
    return (await serverFetchAPIRevalidate("/api/seo/settings")) as SeoGlobalSettings;
  } catch {
    return {};
  }
}

export async function getSeoRedirects(): Promise<{ source: string; target: string; type: number }[]> {
  try {
    const data = await serverFetchAPI("/api/seo/redirects");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export interface ResourceSchema {
  schemaType: string;
  jsonLd?: string;
  isActive?: boolean;
}

export async function getResourceSchema(resourceType: string, resourceId: number): Promise<ResourceSchema | null> {
  try {
    const data = await serverFetchAPI(`/api/seo/${resourceType}/${resourceId}`);
    const schema = data?.schema;
    if (!schema || schema.isActive === false) return null;
    return {
      schemaType: schema.schemaType || "auto",
      jsonLd: schema.jsonLd || undefined,
      isActive: schema.isActive,
    };
  } catch {
    return null;
  }
}

export function buildProductSchema(
  product: any,
  settings: SeoGlobalSettings
): Record<string, unknown> {
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.titleNp || "",
    description: product.summary || product.interestRateInfo || "",
    ...(product.bannerImage ? { image: product.bannerImage } : {}),
    url: `${siteUrl}/en/products/${product.slug}`,
    brand: { "@type": "Brand", name: settings.schemaOrgName || "Reliance Finance Limited" },
    offers: {
      "@type": "Offer",
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: settings.schemaOrgName || "Reliance Finance Limited" },
    },
  };
  return schema;
}

export function buildArticleSchema(article: any, settings: SeoGlobalSettings): Record<string, unknown> {
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title || "",
    ...(article.image ? { image: article.image } : {}),
    datePublished: article.publishedAt || article.createdAt || "",
    dateModified: article.updatedAt || article.publishedAt || "",
    url: `${siteUrl}/en/news/${article.slug}`,
    author: { "@type": "Organization", name: settings.schemaOrgName || "Reliance Finance Limited" },
    publisher: {
      "@type": "Organization",
      name: settings.schemaOrgName || "Reliance Finance Limited",
      ...(settings.schemaOrgLogo ? { logo: { "@type": "ImageObject", url: settings.schemaOrgLogo } } : {}),
    },
  };
}

export function buildServiceSchema(service: any, settings: SeoGlobalSettings): Record<string, unknown> {
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title || "",
    description: service.summary || "",
    url: `${siteUrl}/en/services/${service.slug}`,
    provider: { "@type": "Organization", name: settings.schemaOrgName || "Reliance Finance Limited" },
  };
}

export function buildFaqSchema(faqs: any[]): Record<string, unknown> | null {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

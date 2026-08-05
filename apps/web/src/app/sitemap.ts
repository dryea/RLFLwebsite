import { MetadataRoute } from "next";
import { serverFetchAPIRevalidate } from "@/lib/server-api";
import { getSeoSettings } from "@/lib/seo";

const BUILD_DATE = new Date("2026-08-05");

const staticRoutes = [
  "", "about", "services", "branches", "contact", "emi-calculator",
  "faq", "gallery", "careers", "downloads", "banking-hours",
  "search", "rates", "governance", "notices", "privacy-policy",
  "loan-enquiry", "calendar", "products", "publications", "testimonials",
  "open-account", "application-status", "regulator-hub", "our-network",
  "partner", "merchant-offers", "committee-of-directors", "csr",
  "sustainable-banking", "compliance-officer", "company-secretary",
  "grievance-handling-officer", "information-officer",
  "beware-of-digital-fraud", "write-to-us", "auction-notice",
];

const categorySlugById: Record<number, string> = { 1: "savings", 2: "fixed-deposits", 3: "loans" };

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of ["en", "np"]) {
    for (const route of staticRoutes) {
      urls.push({
        url: `${siteUrl}/${lang}/${route}`,
        lastModified: BUILD_DATE,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  try {
    if (settings.sitemapIncludeProducts !== false) {
      const products = await serverFetchAPIRevalidate("/api/products");
      if (Array.isArray(products)) {
        for (const p of products) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/products/${categorySlugById[Number(p.categoryId)] || "savings"}/${p.slug}`,
              lastModified: p.updatedAt || BUILD_DATE,
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        }
      }
    }

    if (settings.sitemapIncludeServices !== false) {
      const services = await serverFetchAPIRevalidate("/api/services");
      if (Array.isArray(services)) {
        for (const s of services) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/services/${s.slug}`,
              lastModified: BUILD_DATE,
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        }
      }
    }

    if (settings.sitemapIncludeNews !== false) {
      const news = await serverFetchAPIRevalidate("/api/news");
      if (Array.isArray(news)) {
        for (const n of news) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/news/${n.slug}`,
              lastModified: n.publishedAt || BUILD_DATE,
              changeFrequency: "monthly",
              priority: 0.6,
            });
          }
        }
      }
    }
  } catch {
    // fall back to static-only sitemap
  }

  return urls;
}

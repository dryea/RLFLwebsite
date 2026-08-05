import { MetadataRoute } from "next";
import { serverFetchAPI } from "@/lib/server-api";
import { getSeoSettings } from "@/lib/seo";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of ["en", "np"]) {
    for (const route of staticRoutes) {
      urls.push({
        url: `${siteUrl}/${lang}/${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  try {
    if (settings.sitemapIncludeProducts !== false) {
      const products = await serverFetchAPI("/api/products");
      if (Array.isArray(products)) {
        for (const p of products) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/products/${p.slug}`,
              lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        }
      }
    }

    if (settings.sitemapIncludeServices !== false) {
      const services = await serverFetchAPI("/api/services");
      if (Array.isArray(services)) {
        for (const s of services) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/services/${s.slug}`,
              lastModified: new Date(),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        }
      }
    }

    if (settings.sitemapIncludeNews !== false) {
      const news = await serverFetchAPI("/api/news");
      if (Array.isArray(news)) {
        for (const n of news) {
          for (const lang of ["en", "np"]) {
            urls.push({
              url: `${siteUrl}/${lang}/news/${n.slug}`,
              lastModified: n.publishedAt ? new Date(n.publishedAt) : new Date(),
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

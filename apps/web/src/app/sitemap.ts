import { MetadataRoute } from "next";

const staticRoutes = [
  "", "about", "services", "branches", "contact", "emi-calculator",
  "faq", "gallery", "careers", "downloads", "banking-hours",
  "search", "rates", "governance", "notices", "privacy-policy",
  "loan-enquiry", "calendar",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  for (const lang of ["en", "np"]) {
    for (const route of staticRoutes) {
      urls.push({
        url: `https://reliancenepal.com.np/${lang}/${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }
  return urls;
}

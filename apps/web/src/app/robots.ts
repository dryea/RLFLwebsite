import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings();
  const allow = settings.robotsIndex !== false;
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";

  return {
    rules: {
      userAgent: "*",
      allow: allow ? "/" : undefined,
      disallow: allow ? ["/cms/", "/api/"] : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import type { Metadata } from "next";
import { serverFetchAPIRevalidate } from "@/lib/server-api";
import { getSeoSettings } from "@/lib/seo";
import ServiceDetailClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const services = (await serverFetchAPIRevalidate("/api/services").catch(() => [])) as any[];
  const s = services.find((x) => x.slug === slug);

  if (!s) return {};
  const title = s.title;
  const description = s.summary || `${title} — banking services from Reliance Finance Limited.`;
  const url = `${siteUrl}/${lang}/services/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
  };
}

export default function Page() {
  return <ServiceDetailClient />;
}

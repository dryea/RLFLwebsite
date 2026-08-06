import type { Metadata } from "next";
import { serverFetchAPIRevalidate } from "@/lib/server-api";
import { getSeoSettings } from "@/lib/seo";
import ProductDetailClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const products = (await serverFetchAPIRevalidate("/api/products").catch(() => [])) as any[];
  const p = products.find((x) => x.slug === slug);

  if (!p) return {};
  const title = lang === "np" && p.titleNp ? p.titleNp : p.title;
  const description =
    p.summary ||
    `${title} — rates, eligibility, features and required documents at Reliance Finance Limited.`;
  const url = `${siteUrl}/${lang}/products/${category}/${slug}`;

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
  return <ProductDetailClient />;
}

import type { Metadata } from "next";
import { serverFetchAPIRevalidate } from "@/lib/server-api";
import { getSeoSettings } from "@/lib/seo";
import NewsDetailClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const news = (await serverFetchAPIRevalidate("/api/news").catch(() => [])) as any[];
  const article = news.find((x) => x.slug === slug);

  if (!article) return {};
  const title = article.title;
  const description = article.summary || `${title} — news from Reliance Finance Limited.`;
  const url = `${siteUrl}/${lang}/news/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      ...(article.coverImage ? { images: [{ url: article.coverImage }] } : {}),
    },
  };
}

export default function Page() {
  return <NewsDetailClient />;
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getNews } from "@/lib/public-api";
import JsonLdScript from "@/components/shared/JsonLdScript";

export default function NewsDetailClient() {
  const lang = useLang();
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((news: any[]) => {
        const found = news.find((n: any) => n.slug === slug);
        setArticle(found || null);
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-transparent" />
      </section>
    );
  }

  if (!article) {
    return (
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20 text-white">
        <div className="container-page text-center">
          <h1 className="mb-2 text-3xl font-bold">
            {lang === "en" ? "Article Not Found" : "लेख फेला परेन"}
          </h1>
          <p className="mb-6 text-primary-100">
            {lang === "en" ? "The news article you're looking for doesn't exist." : "तपाईंले खोज्नुभएको समाचार लेख अवस्थित छैन।"}
          </p>
          <Link href="/news" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            {lang === "en" ? "View All News" : "सबै समाचार हेर्नुहोस्"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.summary || article.title,
          image: article.coverImage || undefined,
          datePublished: article.publishedAt || undefined,
          dateModified: article.updatedAt || article.publishedAt || undefined,
          author: {
            "@type": "Organization",
            name: "Reliance Finance Limited",
            url: `${typeof window !== "undefined" ? window.location.origin : ""}/en/about`,
          },
          publisher: {
            "@type": "Organization",
            name: "Reliance Finance Limited",
            logo: {
              "@type": "ImageObject",
              url: `${typeof window !== "undefined" ? window.location.origin : ""}/logo.svg`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": typeof window !== "undefined" ? window.location.href : "",
          },
        }}
      />
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <Link href="/news" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to News" : "समाचारमा फर्कनुहोस्"}
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-primary-200">
            {article.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt)}
              </span>
            )}
            {article.category && (
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs">
                {article.category}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            {article.coverImage && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img src={article.coverImage} alt={`${article.title} — Reliance Finance Limited`} width={1200} height={675} className="h-auto w-full object-cover" loading="lazy" />
              </div>
            )}

            {article.summary && (
              <p className="mb-6 text-lg font-medium leading-relaxed text-gray-700">
                {article.summary}
              </p>
            )}

            {article.content && (
              <div className="prose prose-gray max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
            )}

            {!article.content && !article.summary && (
              <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-400">
                <p>
                  {lang === "en" ? "Full content coming soon." : "पूर्ण सामग्री चाँडै आउँदैछ।"}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Link href="/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline">
                <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to News" : "समाचारमा फर्कनुहोस्"}
              </Link>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined") {
                    navigator.share?.({ title: article.title, url: window.location.href })
                      .catch(() => navigator.clipboard.writeText(window.location.href));
                  }
                }}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-700"
              >
                <Share2 className="h-4 w-4" /> {lang === "en" ? "Share" : "सेयर गर्नुहोस्"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

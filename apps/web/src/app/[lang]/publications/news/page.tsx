"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Newspaper, ArrowRight } from "lucide-react";
import { getNews } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function NewsListPage() {
  const lang = useLang();
  const [news, setNews] = useState<any[]>([]);
  useEffect(() => { getNews().then(setNews).catch(() => {}); }, []);

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? "News" : "समाचार"}</h1>
          <p className="mt-2 text-primary-100">{lang === "en" ? "Latest news and updates" : "ताजा समाचार र अपडेटहरू"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {news.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Newspaper className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{lang === "en" ? "No news yet" : "अहिलेसम्म कुनै समाचार छैन"}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((article: any) => (
                <Link
                  key={article.slug || article.id}
                  href={`/${lang}/news/${article.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border p-5 transition-shadow hover:shadow-md sm:flex-row"
                >
                  {article.coverImage && (
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-40">
                      <img src={article.coverImage} alt={`${article.title} — Reliance Finance Limited news`} width={160} height={96} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-900 group-hover:text-primary-700">{article.title}</h2>
                      {article.summary && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{article.summary}</p>}
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      {article.publishedAt && (
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(article.publishedAt)}</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary-700 group-hover:underline">
                        {lang === "en" ? "Read more" : "थप पढ्नुहोस्"} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

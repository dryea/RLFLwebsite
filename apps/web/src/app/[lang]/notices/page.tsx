"use client";

import { useEffect, useState } from "react";
import { Megaphone, FileText, Download, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getNotices } from "@/lib/public-api";

export default function NoticesPage() {
  const lang = useLang();
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    getNotices()
      .then(setNotices)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(notices.map((n: any) => n.category).filter(Boolean)));
  const filtered =
    categoryFilter === "all"
      ? notices
      : notices.filter((n: any) => n.category === categoryFilter);

  const formatDate = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">
            {lang === "en" ? "Notices" : "सूचनाहरू"}
          </h1>
          <p className="mt-2 text-primary-100">
            {lang === "en" ? "Official notices and announcements" : "आधिकारिक सूचना र घोषणाहरू"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-transparent" />
            </div>
          ) : notices.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Megaphone className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">
                {lang === "en" ? "No notices yet" : "अहिलेसम्म कुनै सूचना छैन"}
              </p>
              <p className="mt-1 text-sm">
                {lang === "en" ? "Notices will be posted here when available." : "उपलब्ध हुँदा सूचनाहरू यहाँ पोस्ट गरिनेछ।"}
              </p>
            </div>
          ) : (
            <>
              {categories.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      categoryFilter === "all"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang === "en" ? "All" : "सबै"}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        categoryFilter === cat
                          ? "bg-primary-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                {filtered.map((notice: any, i: number) => (
                  <div key={notice.id || i} className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                          {notice.category && (
                            <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                              {notice.category}
                            </span>
                          )}
                        </div>
                        {notice.description && (
                          <p className="mt-2 text-sm text-gray-600">{notice.description}</p>
                        )}
                        {notice.content && !notice.description && (
                          <div className="mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: notice.content }} />
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                          {notice.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Megaphone className="h-3 w-3" />
                              {formatDate(notice.publishedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex shrink-0 gap-2">
                        {notice.fileUrl && (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50"
                          >
                            <Download className="h-3.5 w-3.5" />
                            {lang === "en" ? "Download" : "डाउनलोड"}
                          </a>
                        )}
                        {notice.externalUrl && (
                          <a
                            href={notice.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {lang === "en" ? "View" : "हेर्नुहोस्"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-400">
                  <p className="text-sm">
                    {lang === "en"
                      ? "No notices in this category."
                      : "यस श्रेणीमा कुनै सूचना छैन।"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

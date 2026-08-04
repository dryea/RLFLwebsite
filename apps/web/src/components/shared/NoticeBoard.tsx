"use client";

import { useState } from "react";
import { Megaphone, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Notice {
  id: number;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  fileUrl?: string;
  externalUrl?: string;
  publishedAt?: string;
}

export default function NoticeBoard({
  notices,
  lang,
}: {
  notices: Notice[];
  lang: string;
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const categories = Array.from(
    new Set(notices.map((n) => n.category).filter(Boolean)),
  );
  const filtered =
    categoryFilter === "all"
      ? notices
      : notices.filter((n) => n.category === categoryFilter);

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
              onClick={() => setCategoryFilter(cat!)}
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
        {filtered.map((notice, i) => (
          <motion.div
            key={notice.id || i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {notice.title}
                  </h3>
                  {notice.category && (
                    <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                      {notice.category}
                    </span>
                  )}
                </div>
                {notice.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {notice.description}
                  </p>
                )}
                {notice.content && !notice.description && (
                  <div
                    className="mt-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                  />
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
          </motion.div>
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
  );
}

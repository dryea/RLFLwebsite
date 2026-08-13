"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const lang = useLang();
  const isNp = lang === "np";

  // Generate Schema.org JSON-LD BreadcrumbList for SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isNp ? "गृहपृष्ठ" : "Home",
        item: `https://reliancenepal.com.np/${lang}`,
      },
      ...items.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `https://reliancenepal.com.np${crumb.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-sm"
      >
        <div className="container-page flex items-center gap-1.5 py-2.5 text-xs text-text-secondary">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-primary-600"
          >
            <Home className="h-3.5 w-3.5 text-primary-500" />
            <span className="sr-only">{isNp ? "गृहपृष्ठ" : "Home"}</span>
          </Link>
          {items.map((item, i) => (
            <span key={item.href || i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-slate-400" />
              {item.href && i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="font-medium text-slate-600 transition-colors hover:text-primary-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-primary-900">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
}

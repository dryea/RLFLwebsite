"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const lang = useLang();

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-100">
      <div className="container-page flex items-center gap-1.5 py-3 text-sm text-gray-600">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors hover:text-primary-700"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">{lang === "en" ? "Home" : "गृहपृष्ठ"}</span>
        </Link>
        {items.map((item, i) => (
          <span key={item.href || i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

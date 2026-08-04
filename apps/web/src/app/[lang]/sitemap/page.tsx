"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { LayoutGrid } from "lucide-react";
import { mainNav } from "@/lib/navigation";

export default function SitemapPage() {
  const lang = useLang();
  const isNp = lang === "np";

  function flattenNav(items: typeof mainNav): { label: string; href: string }[] {
    const result: { label: string; href: string }[] = [];
    for (const item of items) {
      if (item.href) {
        result.push({ label: isNp && item.labelNp ? item.labelNp : item.label, href: item.href });
      }
      if (item.children) {
        result.push(...flattenNav(item.children));
      }
    }
    return result;
  }

  const allLinks = flattenNav(mainNav);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <LayoutGrid className="h-7 w-7" /> {isNp ? "साइटम्याप" : "Sitemap"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "सबै पृष्ठहरूको सूची" : "A complete list of all pages"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          <div className="columns-2 gap-6 sm:columns-3 md:columns-4">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mb-2 block rounded-lg border bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700 hover:shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

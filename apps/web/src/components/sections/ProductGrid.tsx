"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ImageIcon, Flame, Star, X, Eye, Scale } from "lucide-react";
import { getProductsByType } from "@/lib/public-api";

export default function ProductGrid({
  type,
  lang,
  basePath,
  showEmi,
}: {
  type: "savings" | "fixed" | "loan";
  lang: string;
  basePath: string;
  showEmi?: boolean;
}) {
  const isNp = lang === "np";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState<any>(null);

  useEffect(() => {
    getProductsByType(type)
      .then((all: any[]) => setProducts(all))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [type]);

  // Filter by category type when given multiple types
  const isLoan = type === "loan";

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Link
          href={`/${lang}/products/compare`}
          className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50"
        >
          <Scale className="h-4 w-4" /> {isNp ? "उत्पादन तुलना" : "Compare Products"}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p: any) => (
          <div key={p.id} className="group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {p.isPopular && (
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                <Flame className="h-3 w-3" /> {isNp ? "लोकप्रिय" : "Most Popular"}
              </span>
            )}
            {p.isFeatured && !p.isPopular && (
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                <Star className="h-3 w-3" /> {isNp ? "विशेष" : "Featured"}
              </span>
            )}

            <Link href={`/${lang}${basePath}/${p.slug}`} className="block overflow-hidden bg-gray-50">
              {p.bannerImage ? (
                <img
                  src={p.bannerImage}
                  alt={isNp && p.titleNp ? `${p.titleNp} — Reliance Finance Limited` : `${p.title} — Reliance Finance Limited`}
                  width={600}
                  height={250}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
                  <ImageIcon className="h-10 w-10 text-primary-200" />
                </div>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                <Link href={`/${lang}${basePath}/${p.slug}`} className="hover:text-primary-700">
                  {isNp && p.titleNp ? p.titleNp : p.title}
                </Link>
              </h3>
              <p className="mb-3 text-sm font-semibold text-primary-700">{p.interestRateInfo || (p.details?.interestStructure) || ""}</p>
              {Array.isArray(p.features) && p.features.length > 0 && (
                <ul className="mb-5 space-y-1.5">
                  {p.features.slice(0, 4).map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      {f.replace(/^(Interest Rate|Minimum Balance|Rate of Interest)[^:]*:\s*/i, "")}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex gap-2 pt-2">
                <button onClick={() => setQuickView(p)} className="btn btn-outline flex-1 items-center justify-center py-2 text-xs">
                  <Eye className="mr-1 inline h-3.5 w-3.5" /> {isNp ? "द्रुत हेर्ने" : "Quick View"}
                </button>
                {showEmi ? (
                  <Link href={`/${lang}/emi-calculator`} className="btn btn-primary flex-1 py-2 text-xs">
                    {isNp ? "EMI गणना गर्नुहोस्" : "Calculate EMI"} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ) : (
                  <Link href={`/${lang}${basePath}/${p.slug}`} className="btn btn-primary flex-1 py-2 text-xs">
                    {isNp ? "विवरण" : "Details"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setQuickView(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {quickView.bannerImage ? (
                <img src={quickView.bannerImage} alt={quickView.title} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-primary-50"><ImageIcon className="h-10 w-10 text-primary-200" /></div>
              )}
              <button onClick={() => setQuickView(null)} className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-600 shadow hover:bg-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{isNp && quickView.titleNp ? quickView.titleNp : quickView.title}</h3>
              {quickView.interestRateInfo && <p className="mt-1 text-sm font-semibold text-primary-700">{quickView.interestRateInfo}</p>}
              {quickView.summary && <p className="mt-3 text-sm leading-relaxed text-gray-600">{quickView.summary}</p>}
              {Array.isArray(quickView.features) && quickView.features.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {quickView.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex gap-3">
                <Link href={`/${lang}${basePath}/${quickView.slug}`} className="btn btn-primary flex-1 text-center">
                  {isNp ? "पूर्ण विवरण हेर्नुहोस्" : "View Full Details"}
                </Link>
                {showEmi && (
                  <Link href={`/${lang}/emi-calculator`} className="btn btn-outline flex-1 text-center">
                    {isNp ? "EMI गणना" : "Calculate EMI"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

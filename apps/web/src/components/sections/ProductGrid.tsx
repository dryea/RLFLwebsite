"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ImageIcon, Flame, Star, X, Eye, Scale, CheckCircle2, UserPlus } from "lucide-react";
import { getProductsByType } from "@/lib/public-api";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { localize } from "@/lib/localize";

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

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Link
          href={localize("/products/compare", lang)}
          className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-4 py-2 text-xs font-bold text-primary-700 shadow-sm transition-all hover:bg-primary-50 hover:shadow-md"
        >
          <Scale className="h-4 w-4" /> {isNp ? "उत्पादन तुलना गर्नुहोस्" : "Compare Products"}
        </Link>
      </div>

      <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p: any) => (
          <StaggerItem key={p.id} className="h-full">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary-950/10 hover:border-primary-300">
              {p.isPopular && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-secondary-500 px-3 py-1 text-[10px] font-extrabold text-slate-950 shadow-md">
                  <Flame className="h-3 w-3" /> {isNp ? "लोकप्रिय" : "Most Popular"}
                </span>
              )}
              {p.isFeatured && !p.isPopular && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-[10px] font-extrabold text-white shadow-md">
                  <Star className="h-3 w-3" /> {isNp ? "विशेष" : "Featured"}
                </span>
              )}

              <Link href={localize(`${basePath}/${p.slug}`, lang)} className="block overflow-hidden bg-slate-100">
                {p.bannerImage ? (
                  <OptimizedImage
                    src={p.bannerImage}
                    alt={isNp && p.titleNp ? `${p.titleNp} — Reliance Finance Limited` : `${p.title} — Reliance Finance Limited`}
                    width={600}
                    height={250}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950">
                    <ImageIcon className="h-10 w-10 text-slate-400" />
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 font-heading text-lg font-bold text-primary-950">
                  <Link href={localize(`${basePath}/${p.slug}`, lang)} className="hover:text-primary-600 transition-colors">
                    {isNp && p.titleNp ? p.titleNp : p.title}
                  </Link>
                </h3>
                <p className="mb-3 text-xs font-extrabold text-secondary-600">
                  {p.interestRateInfo || (p.details?.interestStructure) || ""}
                </p>
                {Array.isArray(p.features) && p.features.length > 0 && (
                  <ul className="mb-6 space-y-2 text-xs text-slate-600">
                    {p.features.slice(0, 3).map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{f.replace(/^(Interest Rate|Minimum Balance|Rate of Interest)[^:]*:\s*/i, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex gap-2 pt-2">
                  <button
                    onClick={() => setQuickView(p)}
                    className="btn btn-outline flex-1 items-center justify-center py-2 text-xs"
                  >
                    <Eye className="mr-1 inline h-3.5 w-3.5" /> {isNp ? "द्रुत हेर्ने" : "Quick View"}
                  </button>
                  {type === "loan" ? (
                    <Link
                      href={localize("/loan-enquiry", lang)}
                      className="btn btn-secondary flex-1 py-2 text-xs shadow-sm"
                    >
                      <UserPlus className="mr-1 inline h-3.5 w-3.5" /> {isNp ? "आवेदन दिनुहोस्" : "Apply Now"}
                    </Link>
                  ) : (
                    <Link
                      href={localize("/open-account", lang)}
                      className="btn btn-secondary flex-1 py-2 text-xs shadow-sm"
                    >
                      <UserPlus className="mr-1 inline h-3.5 w-3.5" /> {isNp ? "खाता खोल्नुहोस्" : "Apply Now"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setQuickView(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {quickView.bannerImage ? (
                <img src={quickView.bannerImage} alt={quickView.title} className="h-48 w-full object-cover" />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-primary-900"><ImageIcon className="h-10 w-10 text-slate-400" /></div>
              )}
              <button onClick={() => setQuickView(null)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-600 shadow hover:bg-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-primary-950">{isNp && quickView.titleNp ? quickView.titleNp : quickView.title}</h3>
              {quickView.interestRateInfo && <p className="mt-1 text-xs font-bold text-secondary-600">{quickView.interestRateInfo}</p>}
              {quickView.summary && <p className="mt-3 text-xs leading-relaxed text-slate-600">{quickView.summary}</p>}
              {Array.isArray(quickView.features) && quickView.features.length > 0 && (
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  {quickView.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex gap-3">
                <Link href={localize(`${basePath}/${quickView.slug}`, lang)} className="btn btn-primary flex-1 text-center text-xs">
                  {isNp ? "पूर्ण विवरण हेर्नुहोस्" : "View Full Details"}
                </Link>
                <Link href={localize("/open-account", lang)} className="btn btn-secondary flex-1 text-center text-xs">
                  {isNp ? "आवेदन दिनुहोस्" : "Apply Now"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

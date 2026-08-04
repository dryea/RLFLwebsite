"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scale, Check, X } from "lucide-react";
import { getProducts } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function ProductComparePage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    getProducts().then((all: any[]) => setProducts(all)).catch(() => {});
  }, []);

  const compare = products.filter((p) => selected.includes(p.slug));

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) { alert(isNp ? "अधिकतम ३ उत्पादन तुलना गर्न सकिन्छ" : "Compare up to 3 products"); return prev; }
      return [...prev, slug];
    });
  }

  const rateOf = (p: any) => p.interestRateInfo || (p.details?.interestStructure) || `${p.minRate || p.singleRate || ""}%`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "उत्पादन तुलना" : "Product Compare"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "तपाईंको आवश्यकता अनुसार उत्पादनहरू तुलना गर्नुहोस्" : "Compare products side by side to find the best fit"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Selector */}
          <div className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
              <Scale className="h-4 w-4 text-primary-700" />
              {isNp ? "तुलना गर्न उत्पादन चयन गर्नुहोस् (अधिकतम ३)" : "Select products to compare (max 3)"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => toggle(p.slug)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selected.includes(p.slug) ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {isNp && p.titleNp ? p.titleNp : p.title}
                </button>
              ))}
            </div>
          </div>

          {compare.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-16 text-center text-gray-500">
              <Scale className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{isNp ? "तुलना गर्न उत्पादन छान्नुहोस्" : "Select products to compare"}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="w-40 px-4 py-3 font-medium text-gray-600">{isNp ? "विशेषता" : "Feature"}</th>
                      {compare.map((p) => (
                        <th key={p.slug} className="min-w-[160px] px-4 py-3 text-center">
                          {p.bannerImage && <img src={p.bannerImage} alt={p.title} className="mx-auto mb-2 h-16 w-24 rounded object-cover" />}
                          <span className="font-semibold text-gray-900">{isNp && p.titleNp ? p.titleNp : p.title}</span>
                          <Link href={`/${lang}/products/${p.categorySlug || "savings"}/${p.slug}`} className="mt-1 block text-xs text-primary-700 hover:underline">
                            {isNp ? "विवरण" : "Details"} →
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <Row label={isNp ? "ब्याज दर" : "Interest Rate"} values={compare.map(rateOf)} />
                    <Row label={isNp ? "न्यूनतम रकम" : "Min Amount"} values={compare.map((p) => p.minAmount != null ? `Rs. ${Number(p.minAmount).toLocaleString()}` : "—")} />
                    <Row label={isNp ? "अधिकतम अवधि" : "Max Tenure"} values={compare.map((p) => p.maxTenure || p.details?.maxTenureYears ? `${p.details?.maxTenureYears || p.maxTenure} ${isNp ? "वर्ष" : "yrs"}` : "—")} />
                    {compare[0]?.details && Object.keys(compare[0].details).filter(k => k !== "interestStructure" && k !== "maxTenureYears").map((key) => (
                      <Row
                        key={key}
                        label={key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                        values={compare.map((p) => p.details?.[key] || "—")}
                      />
                    ))}
                    <Row
                      label={isNp ? "विशेषताहरू" : "Features"}
                      values={compare.map((p) => (p.features || []).slice(0, 5).map((f: string) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                          <span className="text-xs text-gray-600">{f}</span>
                        </li>
                      )))}
                      list
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, values, list }: { label: string; values: any[]; list?: boolean }) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-4 py-3 text-center">
          {list ? (
            <ul className="mx-auto inline-block text-left">{v}</ul>
          ) : (
            <span className="text-gray-600">{v}</span>
          )}
        </td>
      ))}
    </tr>
  );
}

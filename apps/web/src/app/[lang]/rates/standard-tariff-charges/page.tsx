"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { fetchAPI } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function TariffChargesPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI("/api/rates").then((all) => {
      setItems(all.filter((r: any) => r.categorySlug === "tariff"));
    }).catch(() => {});
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "मापदण्ड शुल्क" : "Standard Tariff & Charges"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "सेवा शुल्क र शुल्कहरू" : "Service charges and fees"}</p>
          <div className="mt-4">
            <Link href={`/${lang}/rates`} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
              <ArrowRight className="h-4 w-4 rotate-180" /> {isNp ? "ब्याज दरहरू" : "Interest Rates"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {items.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{isNp ? "शुल्क विवरण उपलब्ध छैन" : "Tariff details not available yet"}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary-50 text-gray-800">
                  <tr>
                    <th className="px-5 py-3 font-semibold">{isNp ? "विवरण" : "Description"}</th>
                    <th className="px-5 py-3 font-semibold">{isNp ? "शुल्क" : "Charge"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((r: any, i: number) => (
                    <tr key={r.id || i} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{r.productName}</td>
                      <td className="px-5 py-3 font-semibold text-primary-700">{r.notes || `${r.singleRate ?? ""}${r.minRate ? r.minRate + "%" : ""}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${lang}/rates/base-rate-spread-rate`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
              <ArrowRight className="h-4 w-4" /> {isNp ? "आधार दर हेर्नुहोस्" : "View Base Rate"}
            </Link>
            <Link href={`/${lang}/rates`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
              <ArrowRight className="h-4 w-4 rotate-180" /> {isNp ? "ब्याज दरहरू" : "Interest Rates"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

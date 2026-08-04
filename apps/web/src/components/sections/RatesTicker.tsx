"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRates } from "@/lib/public-api";

export default function RatesTicker({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [rates, setRates] = useState<any[]>([]);

  useEffect(() => {
    getRates()
      .then((all: any[]) => setRates(all.filter((r) => (r.categorySlug || r.category) !== "base-rate-spread-rate")))
      .catch(() => {});
  }, []);

  // Build ticker items: top savings/fixed/loan rates + forex
  const items: string[] = [];
  const savings = rates.filter((r) => (r.categorySlug || r.category) === "savings");
  const fixed = rates.filter((r) => (r.categorySlug || r.category) === "fixed");
  const loans = rates.filter((r) => (r.categorySlug || r.category) === "loan");
  const forex = rates.filter((r) => (r.categorySlug || r.category) === "forex");

  const fmt = (r: any) => (r.singleRate != null ? `${r.singleRate}%` : r.minRate != null ? `${r.minRate}%` : r.notes || "");
  savings.slice(0, 3).forEach((r) => items.push(`${r.productName}: ${fmt(r)}`));
  fixed.slice(0, 3).forEach((r) => items.push(`${r.productName}: ${fmt(r)}`));
  loans.slice(0, 4).forEach((r) => items.push(`${r.productName}: ${r.notes || fmt(r)}`));
  forex.slice(0, 4).forEach((r) => items.push(`${r.productName}: ${fmt(r)}`));

  if (items.length === 0) return null;

  return (
    <div className="relative z-10 border-b bg-primary-950 text-white">
      <div className="container-page flex items-center overflow-hidden py-2">
        <Link
          href={`/${lang}/rates`}
          className="mr-4 shrink-0 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-primary-950"
        >
          {isNp ? "ब्याज दर" : "RATES"}
        </Link>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs">
            {[...items, ...items].map((item, i) => (
              <span key={i} className="text-primary-100">{item}</span>
            ))}
          </div>
        </div>
        <Link href={`/${lang}/rates`} className="ml-4 shrink-0 text-xs font-medium text-amber-400 hover:text-amber-300">
          {isNp ? "सबै दरहरू →" : "All Rates →"}
        </Link>
      </div>
    </div>
  );
}

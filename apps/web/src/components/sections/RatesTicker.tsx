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
  // Gold/Silver (fallback from rates API if category present)
  const goldSilver = rates.filter((r) => (r.categorySlug || "").includes("gold") || (r.productName || "").toLowerCase().includes("gold"));
  goldSilver.slice(0, 2).forEach((r) => items.push(`${r.productName}: ${r.notes || fmt(r)}`));

  if (items.length === 0) {
    items.push(isNp ? "सुन (तोला): रु. १४८,५००" : "Gold (Tola): Rs. 148,500");
    items.push(isNp ? "चाँदी (तोला): रु. १,८६५" : "Silver (Tola): Rs. 1,865");
    items.push(isNp ? "मुद्दती: ६.२५% सम्म" : "Fixed Deposit: up to 6.25%");
    items.push(isNp ? "गृह ऋण: ९.५% देखि" : "Home Loan: from 9.5%");
  }

  return (
    <div className="relative z-10 border-b bg-primary-950 text-white">
      <div className="container-page flex items-center overflow-hidden py-2">
        <div className="mr-4 flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-primary-950">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-950 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-950" />
          </span>
          {isNp ? "दरहरू" : "RATES"}
        </div>
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

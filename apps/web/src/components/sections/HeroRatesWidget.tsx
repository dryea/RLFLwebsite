"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { API } from "@/lib/api";

interface Rate {
  id: number;
  categorySlug?: string;
  productName: string;
  minRate?: number;
  maxRate?: number;
  singleRate?: number;
  notes?: string;
}

export default function HeroRatesWidget({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    fetch(`${API}/api/rates`)
      .then((r) => r.json())
      .then((data: Rate[]) => setRates(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Representative rates: savings (normal), FD (best/max), home loan (from base + premium)
  const savings = rates.filter((r) => (r.categorySlug || "").includes("savings"));
  const fds = rates.filter((r) => (r.categorySlug || "").includes("fixed") || (r.categorySlug || "").includes("fd"));
  const loans = rates.filter((r) => (r.categorySlug || "").includes("loan"));
  const baseRates = rates.filter((r) => (r.categorySlug || "").includes("base-rate"));

  const savingsRate = savings.find((r) => (r.productName || "").toLowerCase().includes("normal"))
    || savings[0];
  const fdMax = fds.reduce<number | null>((max, r) => {
    const v = r.maxRate ?? r.singleRate;
    return v != null && (max == null || v > max) ? v : max;
  }, null);
  const homeLoan = loans.find((r) => (r.productName || "").toLowerCase().includes("home"));
  // Latest base rate (first row is most recent in the table) — used for "from X%" on home loan
  const baseAvg = baseRates[0]?.minRate != null ? baseRates[0].minRate : null;
  const homeFrom = homeLoan?.minRate != null
    ? homeLoan.minRate
    : baseAvg != null
    ? Math.round((baseAvg + 0.5) * 100) / 100
    : null;

  const items = [
    {
      label: isNp ? "बचत" : "Savings",
      value: savingsRate?.singleRate != null ? `${savingsRate.singleRate}%` : "2.75%",
      href: "/rates",
    },
    {
      label: isNp ? "मुद्दती" : "Fixed Deposit",
      value: fdMax != null ? `up to ${fdMax}%` : "up to 6.25%",
      href: "/rates",
    },
    {
      label: isNp ? "गृह ऋण" : "Home Loan",
      value: homeFrom != null ? `from ${homeFrom}%` : "from 9.5%",
      href: "/rates",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <TrendingUp className="h-3.5 w-3.5 text-primary-600" />
          {isNp ? "दरहरू" : "Rates"}
        </span>
        <Link
          href={`/${lang}/rates`}
          className="flex items-center gap-0.5 text-[11px] font-medium text-primary-600 hover:text-primary-700"
        >
          {isNp ? "सबै" : "All"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-bold text-primary-700">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

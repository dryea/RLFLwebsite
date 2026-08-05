"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";

interface Rate {
  id: number;
  categorySlug?: string;
  productName: string;
  minRate?: number;
  maxRate?: number;
  singleRate?: number;
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

  // Pick a few representative rates: savings, FD, home loan
  const savings = rates.filter((r) => (r.categorySlug || "").includes("savings"));
  const fds = rates.filter((r) => (r.categorySlug || "").includes("fixed") || (r.categorySlug || "").includes("fd"));
  const loans = rates.filter((r) => (r.categorySlug || "").includes("loan"));

  const items = [
    {
      label: isNp ? "बचत" : "Savings",
      value: savings[0]?.singleRate != null ? `${savings[0].singleRate}%` : "2.75%",
      href: "/rates",
    },
    {
      label: isNp ? "मुद्दती" : "Fixed Deposit",
      value: fds[0]?.maxRate != null ? `up to ${fds[0].maxRate}%` : "up to 6.25%",
      href: "/rates",
    },
    {
      label: isNp ? "गृह ऋण" : "Home Loan",
      value: loans[0]?.maxRate != null ? `from ${loans[0].minRate ?? ""}%` : "from 9.5%",
      href: "/rates",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80">
          <TrendingUp className="h-3.5 w-3.5 text-secondary-400" />
          {isNp ? "हालका दरहरू" : "Live Rates"}
        </span>
        <Link href="/rates" className="flex items-center gap-0.5 text-[11px] font-medium text-secondary-300 hover:text-secondary-200">
          {isNp ? "सबै" : "All"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-sm text-white/70">{item.label}</span>
            <span className="text-sm font-bold text-secondary-300">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

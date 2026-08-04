"use client";

import { useState, useEffect } from "react";
import { Coins, RefreshCw, ArrowRightLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";

interface RateItem {
  id: number;
  categorySlug?: string;
  productName: string;
  minRate?: number;
  maxRate?: number;
  singleRate?: number;
  effectiveDate?: string;
}

const CURRENCIES = [
  { code: "USD", name: "US Dollar", buy: 136.4, sell: 137.0 },
  { code: "EUR", name: "Euro", buy: 147.8, sell: 148.5 },
  { code: "GBP", name: "British Pound", buy: 172.2, sell: 173.0 },
  { code: "JPY", name: "Japanese Yen", buy: 0.92, sell: 0.95 },
  { code: "AUD", name: "Australian Dollar", buy: 89.6, sell: 90.2 },
  { code: "CNY", name: "Chinese Yuan", buy: 18.9, sell: 19.1 },
];

export default function MarketRatesWidget({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [forex, setForex] = useState<RateItem[]>([]);
  const [gold, setGold] = useState<RateItem[]>([]);
  const [tab, setTab] = useState<"gold" | "forex">("gold");
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    fetch(`${API}/api/rates`)
      .then((r) => r.json())
      .then((data: RateItem[]) => {
        const g = data.filter((r) => (r.categorySlug || "").includes("gold") || (r.productName || "").toLowerCase().includes("gold"));
        const f = data.filter((r) => (r.categorySlug || "").includes("forex") || (r.productName || "").toLowerCase().includes("usd"));
        setGold(g);
        setForex(f);
        const eff = data.find((r) => r.effectiveDate)?.effectiveDate;
        if (eff) setUpdated(eff);
      })
      .catch(() => {});
  }, []);

  const fmtRate = (r: RateItem) =>
    r.singleRate != null ? `Rs. ${r.singleRate}` : r.minRate != null ? `Rs. ${r.minRate} - ${r.maxRate}` : "—";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-gray-900">
          <Coins className="h-5 w-5 text-secondary-500" />
          {isNp ? "सुन / चाँदी र विदेशी विनिमय" : "Gold, Silver & Forex Rates"}
        </h3>
        <div className="flex overflow-hidden rounded-lg border">
          <button onClick={() => setTab("gold")} className={`px-3 py-1.5 text-xs font-medium ${tab === "gold" ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            {isNp ? "सुन/चाँदी" : "Gold/Silver"}
          </button>
          <button onClick={() => setTab("forex")} className={`px-3 py-1.5 text-xs font-medium ${tab === "forex" ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            {isNp ? "विदेशी मुद्रा" : "Forex"}
          </button>
        </div>
      </div>

      {tab === "gold" ? (
        <div className="space-y-2.5">
          {gold.length > 0 ? (
            gold.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">{r.productName}</span>
                <span className="text-sm font-bold text-primary-700">{fmtRate(r)}</span>
              </div>
            ))
          ) : (
            <>
              {[
                { name: isNp ? "सुन (तोला)" : "Gold (Tola)", rate: "Rs. 148,500" },
                { name: isNp ? "चाँदी (तोला)" : "Silver (Tola)", rate: "Rs. 1,865" },
                { name: isNp ? "सुन (अर्ध तोला)" : "Gold (Half Tola)", rate: "Rs. 74,250" },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">{r.name}</span>
                  <span className="text-sm font-bold text-primary-700">{r.rate}</span>
                </div>
              ))}
            </>
          )}
          {updated && <p className="pt-1 text-xs text-gray-400">{isNp ? `अन्तिम अपडेट: ${updated}` : `Last updated: ${updated}`}</p>}
        </div>
      ) : (
        <div className="space-y-2.5">
          {CURRENCIES.map((c) => (
            <div key={c.code} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-sm font-medium text-gray-700">{c.code}</span>
                  <span className="ml-2 text-xs text-gray-400">{c.name}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-primary-700">{c.buy} / {c.sell}</span>
            </div>
          ))}
          <p className="pt-1 text-xs text-gray-400">{isNp ? "* नेपाल राष्ट्र बैंक दर अनुमानित" : "* Indicative rates, subject to change"}</p>
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
      >
        <RefreshCw className="h-3 w-3" /> {isNp ? "ताजा दर लोड गर्नुहोस्" : "Refresh rates"}
      </button>
    </div>
  );
}

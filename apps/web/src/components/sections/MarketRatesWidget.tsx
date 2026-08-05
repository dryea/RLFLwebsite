"use client";

import { useState, useEffect, useCallback } from "react";
import { Coins, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function MarketRatesWidget({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [forex, setForex] = useState<RateItem[]>([]);
  const [gold, setGold] = useState<RateItem[]>([]);
  const [tab, setTab] = useState<"gold" | "forex">("gold");
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/rates`);
      const data: RateItem[] = await res.json();
      const g = data.filter((r) => (r.categorySlug || "").includes("gold") || (r.productName || "").toLowerCase().includes("gold"));
      const f = data.filter((r) => (r.categorySlug || "").includes("forex") || (r.productName || "").toLowerCase().includes("usd"));
      setGold(g);
      setForex(f);
      const eff = data.find((r) => r.effectiveDate)?.effectiveDate;
      if (eff) setUpdated(eff);
    } catch {
      // Leave previous data intact on network failure
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates, refreshKey]);

  const fmtRate = (r: RateItem) =>
    r.singleRate != null ? `Rs. ${r.singleRate}` : r.minRate != null ? `Rs. ${r.minRate}–${r.maxRate}` : "—";

  const goldEmpty = !loading && gold.length === 0;
  const forexEmpty = !loading && forex.length === 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-gray-900">
          <Coins className="h-5 w-5 text-secondary-500" />
          {isNp ? "सुन / चाँदी र विदेशी विनिमय" : "Gold & Forex Rates"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border border-gray-200">
            <button
              onClick={() => setTab("gold")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                tab === "gold" ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {isNp ? "सुन/चाँदी" : "Gold/Silver"}
            </button>
            <button
              onClick={() => setTab("forex")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                tab === "forex" ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {isNp ? "विदेशी मुद्रा" : "Forex"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : tab === "gold" ? (
            goldEmpty ? (
              <p className="py-4 text-center text-sm text-gray-400">
                {isNp ? "दरहरू अहिले उपलब्ध छैनन्।" : "Gold rates not available at this time."}
              </p>
            ) : (
              <div className="space-y-2">
                {gold.slice(0, 5).map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">{r.productName}</span>
                    <span className="text-sm font-bold text-primary-700">{fmtRate(r)}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            forexEmpty ? (
              <p className="py-4 text-center text-sm text-gray-400">
                {isNp ? "विदेशी मुद्रा दरहरू अहिले उपलब्ध छैनन्।" : "Forex rates not available at this time."}
              </p>
            ) : (
              <div className="space-y-2">
                {forex.slice(0, 6).map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">{r.productName}</span>
                    <span className="text-sm font-bold text-primary-700">{fmtRate(r)}</span>
                  </div>
                ))}
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        {updated && (
          <p className="text-xs text-gray-400">
            {isNp ? `अन्तिम अपडेट: ${updated}` : `Updated: ${updated}`}
          </p>
        )}
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          <RefreshCw className="h-3 w-3" />
          {isNp ? "रिफ्रेश" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

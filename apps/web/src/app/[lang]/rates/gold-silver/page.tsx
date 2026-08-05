"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, Calendar } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

// Gold/Silver rates as of today (Nepal standard: 1 tola = 11.664 g)
const initialRates = {
  fineGold: { tola: "158500", gram: "13592" },
  tejabiGold: { tola: "157700", gram: "13523" },
  silver: { tola: "1965", gram: "168.5" },
};

export default function GoldSilverPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [unit, setUnit] = useState<"tola" | "gram">("tola");
  const today = new Date().toLocaleDateString(isNp ? "ne-NP" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  const rows = [
    { key: "fineGold", label: isNp ? "छेकापाल गोल्ड" : "Fine Gold" },
    { key: "tejabiGold", label: isNp ? "तेजाबी गोल्ड" : "Tejabi Gold" },
    { key: "silver", label: isNp ? "चाँदी" : "Silver" },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Sparkles className="h-7 w-7" /> {isNp ? "सुन / चाँदीको दर" : "Gold & Silver Rates"}
          </h1>
          <p className="mt-2 text-amber-100">
            <Calendar className="mr-1 inline h-4 w-4" /> {isNp ? "मिति" : "As of"}: {today}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Unit toggle */}
          <div className="mb-6 flex justify-end">
            <div className="flex overflow-hidden rounded-lg border">
              {(["tola", "gram"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-5 py-2 text-sm font-medium transition-colors ${unit === u ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-amber-50"}`}
                >
                  {u === "tola" ? (isNp ? "तोला" : "Tola") : (isNp ? "ग्राम" : "Gram")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {rows.map((r) => (
              <div key={r.key} className={`rounded-2xl border p-6 text-center shadow-sm ${r.key === "fineGold" ? "border-amber-200 bg-gradient-to-b from-amber-50 to-white" : "bg-white"}`}>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Sparkles className={`h-6 w-6 ${r.key === "silver" ? "text-gray-500" : "text-amber-600"}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{r.label}</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  Nrs. {unit === "tola" ? initialRates[r.key as keyof typeof initialRates].tola : initialRates[r.key as keyof typeof initialRates].gram}
                </p>
                <p className="mt-1 text-xs text-gray-400">{unit === "tola" ? (isNp ? "प्रति तोला" : "per tola") : (isNp ? "प्रति ग्राम" : "per gram")}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            {isNp ? "* दरहरू बजार अवस्था अनुसार परिवर्तन हुन सक्छन्।" : "* Rates are indicative and subject to market conditions."}
          </p>
        </div>
      </section>
    </>
  );
}

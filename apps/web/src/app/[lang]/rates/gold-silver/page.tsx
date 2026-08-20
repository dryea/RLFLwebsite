"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, ArrowRight, Wallet, Coins } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Heading, Text, GradientText } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

const INITIAL_RATES = {
  fineGold: { tola: 158500, gram: 13592 },
  tejabiGold: { tola: 157700, gram: 13523 },
  silver: { tola: 1965, gram: 168.5 },
};

export default function GoldSilverPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [unit, setUnit] = useState<"tola" | "gram">("tola");
  const [goldWeightTola, setGoldWeightTola] = useState(5);
  const today = new Date().toLocaleDateString(isNp ? "ne-NP" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  const rows = [
    { key: "fineGold", label: isNp ? "छापावाला सुन (Fine Gold 9999)" : "Fine Gold (9999)", color: "border-amber-200 bg-amber-50/50" },
    { key: "tejabiGold", label: isNp ? "तेजाबी सुन (Tejabi Gold)" : "Tejabi Gold", color: "border-amber-100 bg-white" },
    { key: "silver", label: isNp ? "चाँदी (Pure Silver)" : "Pure Silver", color: "border-slate-200 bg-slate-50/50" },
  ];

  // Max loan against gold = 70% LTV under NRB guidelines
  const goldValuation = useMemo(() => goldWeightTola * INITIAL_RATES.fineGold.tola, [goldWeightTola]);
  const maxGoldLoan = useMemo(() => Math.round(goldValuation * 0.7), [goldValuation]);
  const estInterestEmi = useMemo(() => Math.round((maxGoldLoan * 0.105) / 12), [maxGoldLoan]);

  return (
    <PageWrapper
      title={isNp ? "सुन र चाँदीको दैनिक बजार दर" : "Daily Gold & Silver Rates"}
      description={isNp ? "नेपाल सुनचाँदी व्यवसायी महासंघ र नेपाल राष्ट्र बैंक अनुसार दैनिक अद्यावधिक दरहरू तथा सुन धितो कर्जा क्याल्कुलेटर।" : "Official daily gold and silver market prices and instant Gold Loan (Loan Against Gold) eligibility estimator."}
      breadcrumbs={[
        { label: isNp ? "दरहरू" : "Rates", href: `/${lang}/rates` },
        { label: isNp ? "सुन / चाँदी" : "Gold & Silver" },
      ]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          {/* Daily Price Cards */}
          <div className="mb-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                  <Calendar className="h-3.5 w-3.5 text-amber-600" />
                  {isNp ? "अद्यावधिक मिति" : "Official Federation Rate Date"}: {today}
                </span>
                <Heading as="h2" className="mt-1 font-heading text-2xl font-extrabold text-slate-900">
                  {isNp ? "नेपाल बजार दरहरू" : "Official Nepal Bullion Board Rates"}
                </Heading>
              </div>

              <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                {(["tola", "gram"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                      unit === u ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {u === "tola" ? (isNp ? "प्रति तोला (11.66g)" : "Per Tola (11.66g)") : (isNp ? "प्रति ग्राम" : "Per Gram")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {rows.map((r) => {
                const val = unit === "tola" ? INITIAL_RATES[r.key as keyof typeof INITIAL_RATES].tola : INITIAL_RATES[r.key as keyof typeof INITIAL_RATES].gram;
                return (
                  <div key={r.key} className={`rounded-3xl border p-6 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 ${r.color}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Nepal Federation</span>
                    </div>

                    <h3 className="font-heading text-sm font-bold text-slate-800">{r.label}</h3>
                    <p className="mt-2 font-heading text-3xl font-extrabold text-slate-900">
                      Rs. {val.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{unit === "tola" ? (isNp ? "प्रति १ तोला" : "per 1 tola") : (isNp ? "प्रति १ ग्राम" : "per 1 gram")}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Gold Loan Financing Estimator */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800">
                  <Coins className="h-3.5 w-3.5 text-amber-600" />
                  {isNp ? "सुन धितो कर्जा (Gold Loan)" : "Gold Loan Eligibility Estimator"}
                </span>

                <Heading as="h3" className="mt-3 font-heading text-xl font-extrabold text-slate-900">
                  {isNp ? "आफ्नो सुन धितो राखी " : "Instant Borrowing Against "}
                  <GradientText>{isNp ? "तुरुन्त कर्जा प्राप्त गर्नुहोस्" : "Your Gold Jewelry"}</GradientText>
                </Heading>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {isNp
                    ? "नेपाल राष्ट्र बैंकको ७०% LTV मार्गदर्शन अनुसार रिलायन्स फाइनान्सले १ घण्टामै सुन धितो कर्जा प्रवाह गर्दछ।"
                    : "Under NRB guidelines (up to 70% Loan-to-Value), receive instant disbursement within 1 hour against fine gold collateral."}
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{isNp ? "तपाईंको सुनको परिमाण (तोला)" : "Gold Weight Collateral (Tola)"}</span>
                      <span className="font-mono text-amber-700 font-extrabold">{goldWeightTola} Tola ({Math.round(goldWeightTola * 11.664)} grams)</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={goldWeightTola}
                      onChange={(e) => setGoldWeightTola(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{isNp ? "अनुमानित धितो मूल्याङ्कन" : "Total Gold Valuation"}</span>
                    <span className="font-mono text-xs font-bold text-amber-400">Rs. {goldValuation.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400">{isNp ? "अधिकतम कर्जा रकम (70% LTV)" : "Max Loan Eligibility (70% LTV)"}</p>
                    <p className="mt-1 font-heading text-3xl font-extrabold text-secondary-400">
                      Rs. {maxGoldLoan.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] text-slate-400">{isNp ? "अनुमानित मासिक ब्याज (10.5% p.a.)" : "Est. Monthly Interest (10.5% p.a.)"}</p>
                    <p className="mt-1 font-mono text-lg font-bold text-white">Rs. {estInterestEmi.toLocaleString("en-IN")}</p>
                  </div>

                  <Button href="/en/loan-enquiry" variant="accent" fullWidth size="lg" className="mt-6 gap-2">
                    {isNp ? "सुन कर्जा आवेदन दिनुहोस्" : "Apply For Gold Loan"} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

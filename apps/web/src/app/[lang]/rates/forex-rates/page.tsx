"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Coins, RefreshCw, ArrowLeftRight, Landmark, ShieldCheck } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Heading, Text, GradientText } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

const FOREX_RATES = [
  { code: "USD", name: "US Dollar", nameNp: "अमेरिकी डलर", unit: 1, buy: 134.85, sell: 135.45, flag: "🇺🇸" },
  { code: "EUR", name: "Euro", nameNp: "युरो", unit: 1, buy: 146.20, sell: 146.90, flag: "🇪🇺" },
  { code: "GBP", name: "UK Pound Sterling", nameNp: "ब्रिटिश पाउण्ड", unit: 1, buy: 172.50, sell: 173.30, flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", nameNp: "अस्ट्रेलियन डलर", unit: 1, buy: 88.40, sell: 88.95, flag: "🇦🇺" },
  { code: "QAR", name: "Qatari Riyal", nameNp: "कतारी रियाल", unit: 1, buy: 36.95, sell: 37.15, flag: "🇶🇦" },
  { code: "AED", name: "UAE Dirham", nameNp: "युएई दिराम", unit: 1, buy: 36.72, sell: 36.90, flag: "🇦🇪" },
  { code: "MYR", name: "Malaysian Ringgit", nameNp: "मलेशियन रिङ्गिट", unit: 1, buy: 30.80, sell: 31.00, flag: "🇲🇾" },
  { code: "CAD", name: "Canadian Dollar", nameNp: "क्यानेडियन डलर", unit: 1, buy: 98.10, sell: 98.65, flag: "🇨🇦" },
  { code: "JPY", name: "Japanese Yen", nameNp: "जापानी येन", unit: 10, buy: 8.95, sell: 9.02, flag: "🇯🇵" },
  { code: "INR", name: "Indian Rupee", nameNp: "भारतीय रुपैयाँ", unit: 100, buy: 160.00, sell: 160.15, flag: "🇮🇳" },
];

export default function ForexRatesPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState(500);
  const [direction, setDirection] = useState<"to_npr" | "from_npr">("to_npr");

  const curr = useMemo(() => FOREX_RATES.find((c) => c.code === selectedCurrency) || FOREX_RATES[0], [selectedCurrency]);

  const convertedValue = useMemo(() => {
    if (!curr) return 0;
    if (direction === "to_npr") {
      return (amount / curr.unit) * curr.buy;
    } else {
      return (amount / curr.sell) * curr.unit;
    }
  }, [amount, curr, direction]);

  return (
    <PageWrapper
      title={isNp ? "विदेशी विनिमय तथा रेमिट्यान्स दरहरू" : "Foreign Exchange & Remittance Rates"}
      description={isNp ? "नेपाल राष्ट्र बैंकको निर्देशन अनुसार दैनिक अद्यावधिक विदेशी मुद्रा विनिमय दरहरू र रेमिट्यान्स क्याल्कुलेटर।" : "Official daily foreign exchange buying/selling rates and instant international remittance calculator."}
      breadcrumbs={[
        { label: isNp ? "दरहरू" : "Rates", href: `/${lang}/rates` },
        { label: isNp ? "विदेशी विनिमय" : "Forex Rates" },
      ]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Rates Table */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-slate-900">{isNp ? "दैनिक मुद्रा विनिमय दरहरू" : "Daily Treasury Forex Board Rates"}</h2>
                    <p className="text-xs text-slate-500">{isNp ? "नेपाल राष्ट्र बैंक रिफरेन्स दर अनुसार" : "Under NRB Treasury Circular Guidelines"}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                    <RefreshCw className="h-3 w-3 animate-spin" /> Live Daily Board
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                        <th className="py-3 px-3 font-extrabold uppercase">{isNp ? "मुद्रा" : "Currency"}</th>
                        <th className="py-3 px-3 font-extrabold uppercase text-center">{isNp ? "इकाइ" : "Unit"}</th>
                        <th className="py-3 px-3 font-extrabold uppercase text-right text-emerald-700">{isNp ? "खरिद दर (Buy)" : "Buying (NPR)"}</th>
                        <th className="py-3 px-3 font-extrabold uppercase text-right text-primary-700">{isNp ? "बिक्री दर (Sell)" : "Selling (NPR)"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {FOREX_RATES.map((r) => (
                        <tr key={r.code} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{r.flag}</span>
                              <div>
                                <p className="font-bold text-slate-900">{r.code}</p>
                                <p className="text-[10px] text-slate-500">{isNp ? r.nameNp : r.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-600">{r.unit}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">Rs. {r.buy.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-primary-700">Rs. {r.sell.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Interactive Remittance & Currency Converter */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-6 text-white shadow-2xl md:p-8">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-secondary-400/30 bg-secondary-500/10 px-3 py-1 text-xs font-bold text-secondary-400">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  {isNp ? "रेमिट्यान्स क्याल्कुलेटर" : "Instant Remittance Converter"}
                </div>

                <h3 className="font-heading text-xl font-extrabold text-white">
                  {isNp ? "विदेशी रकम " : "Convert "}
                  <GradientText>{isNp ? "रुपैयाँमा रूपान्तरण" : "Currency to NPR"}</GradientText>
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-300">{isNp ? "मुद्रा चयन गर्नुहोस्" : "Select Foreign Currency"}</label>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white outline-none focus:border-secondary-400"
                    >
                      {FOREX_RATES.map((r) => (
                        <option key={r.code} value={r.code} className="bg-slate-900 text-white">
                          {r.flag} {r.code} - {isNp ? r.nameNp : r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="mb-1.5 flex justify-between text-xs font-bold text-slate-300">
                      <span>{isNp ? "रकमप्रविष्ट गर्नुहोस्" : "Amount"}</span>
                      <span className="font-mono text-secondary-400">{amount} {curr.code}</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-mono font-bold text-white outline-none focus:border-secondary-400"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">
                      {direction === "to_npr" ? (isNp ? "तपाईंले प्राप्त गर्ने कुल रकम" : "Estimated Amount Received in Nepal") : "Foreign Amount Required"}
                    </p>
                    <p className="mt-1 font-heading text-3xl font-extrabold text-secondary-400">
                      Rs. {Math.round(convertedValue).toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      1 {curr.code} = {curr.buy} NPR (Buying Rate)
                    </p>
                  </div>

                  <Button href="/en/open-account" variant="accent" fullWidth size="lg" className="gap-2">
                    {isNp ? "रेमिट्यान्स बचत खाता खोल्नुहोस्" : "Open Remittance Savings Account"} <ArrowRight className="h-4 w-4" />
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

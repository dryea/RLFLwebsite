"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Percent, Download, ArrowRight, FileText } from "lucide-react";
import { getRates } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import MarketRatesWidget from "@/components/sections/MarketRatesWidget";
import ABButton from "@/components/shared/ABButton";

export default function RatesClient() {
  const lang = useLang();
  const isNp = lang === "np";
  const [rates, setRates] = useState<any[]>([]);

  useEffect(() => {
    getRates().then((all) => {
      // Only current categories, exclude base-rate (separate page)
      setRates(all.filter((r: any) => (r.categorySlug || r.category) !== "base-rate-spread-rate"));
    }).catch(() => {});
  }, []);

  const catOf = (r: any) => r.categorySlug || r.category;
  const savings = rates.filter((r: any) => catOf(r) === "savings");
  const fixed = rates.filter((r: any) => catOf(r) === "fixed");
  const loans = rates.filter((r: any) => catOf(r) === "loan");

  const rateValue = (r: any) => {
    if (r.singleRate != null) return `${r.singleRate}%`;
    if (r.rate != null) return `${r.rate}%`;
    if (r.notes && r.notes.includes("+") && catOf(r) === "loan") return r.notes;
    return r.value || r.notes || "-";
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "ब्याज दरहरू" : "Interest Rates"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "हालको ब्याज दर र सेवा शुल्कहरू" : "Current interest rates and service charges"}</p>
          <p className="mt-3 inline-block rounded bg-white/10 px-3 py-1 text-sm">
            {isNp ? "प्रभावकारी मिति" : "Effective From"}: 2083-04-01
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page space-y-14">
          <div className="mx-auto max-w-3xl">
            <MarketRatesWidget lang={lang} />
          </div>
          {/* A/B tested CTA */}
          <div className="flex justify-center">
            <ABButton
              name="rates_cta"
              variants={[
                { label: isNp ? "दर डाउनलोड गर्नुहोस्" : "Download Rates PDF", href: "https://reliancenepal.com.np/uploads/document/aa72ec286ce3a90b8e335685a3f214490e82b3b5.jpg" },
                { label: isNp ? "आधार दर हेर्नुहोस्" : "View Base / Spread Rate", href: `/${lang}/rates/base-rate-spread-rate`, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-secondary-500 px-6 py-3 font-semibold text-gray-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-secondary-400" },
              ]}
            />
          </div>
          {/* Download link */}
          <div className="flex flex-wrap gap-4">
            <a href="https://reliancenepal.com.np/uploads/document/aa72ec286ce3a90b8e335685a3f214490e82b3b5.jpg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
              <Download className="h-4 w-4" /> {isNp ? "ब्याज दर डाउनलोड गर्नुहोस्" : "Download Interest Rates"}
            </a>
            <Link href={`/${lang}/rates/base-rate-spread-rate`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50">
              {isNp ? "आधार दर / स्प्रेड दर हेर्नुहोस्" : "View Base Rate / Spread Rate"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Savings */}
          {savings.length > 0 && (
            <div>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Percent className="h-6 w-6 text-primary-700" />
                {isNp ? "बचत खाता ब्याज दर" : "Savings Account Interest Rates"}
              </h2>
              <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-50 text-gray-800">
                    <tr>
                      <th className="px-5 py-3 font-semibold">S.No</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "खाता प्रकार" : "Account Type"}</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "न्यूनतम ब्यालेन्स" : "Minimum Balance"}</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "ब्याज दर" : "Interest Rate"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {savings.map((r: any, i: number) => (
                      <tr key={r.id || i} className="transition-colors hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{r.productName}</td>
                        <td className="px-5 py-3 text-gray-600">
                          {r.notes && r.notes.includes("Minimum Balance") ? r.notes.replace("Minimum Balance: ", "Rs ") : "—"}
                        </td>
                        <td className="px-5 py-3 font-semibold text-primary-700">{rateValue(r)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-400">{isNp ? "प्रभावकारी मिति" : "Effective From"}: 2083-04-01</p>
            </div>
          )}

          {/* Fixed Deposits */}
          {fixed.length > 0 && (
            <div>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <FileText className="h-6 w-6 text-primary-700" />
                {isNp ? "मुद्दती निक्षेप ब्याज दर" : "Fixed Deposit Interest Rates"}
              </h2>
              <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-50 text-gray-800">
                    <tr>
                      <th className="px-5 py-3 font-semibold">{isNp ? "उत्पादन" : "Product"}</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "अवधि" : "Period"}</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "ब्याज दर" : "Interest Rate"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {fixed.map((r: any, i: number) => (
                      <tr key={r.id || i} className="transition-colors hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-900">{r.productName}</td>
                        <td className="px-5 py-3 text-gray-600">{r.tenure || "—"}</td>
                        <td className="px-5 py-3 font-semibold text-primary-700">{rateValue(r)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-400">{isNp ? "प्रभावकारी मिति" : "Effective From"}: 2083-04-01</p>
            </div>
          )}

          {/* Loans */}
          {loans.length > 0 && (
            <div>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <ArrowRight className="h-6 w-6 text-primary-700" />
                {isNp ? "ऋण ब्याज दरहरू" : "Loan Interest Rates"}
              </h2>
              <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-50 text-gray-800">
                    <tr>
                      <th className="px-5 py-3 font-semibold">S.No</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "क्रेडिट सुविधा" : "Credit Facility"}</th>
                      <th className="px-5 py-3 font-semibold">{isNp ? "प्रिमियम दर" : "Premium Rate"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loans.map((r: any, i: number) => (
                      <tr key={r.id || i} className="transition-colors hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{r.productName}</td>
                        <td className="px-5 py-3 font-semibold text-primary-700">{r.notes || rateValue(r)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/${lang}/emi-calculator`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                  <Percent className="h-4 w-4" /> {isNp ? "EMI गणना गर्नुहोस्" : "Calculate EMI"}
                </Link>
                <Link href={`/${lang}/rates/base-rate-spread-rate`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                  <ArrowRight className="h-4 w-4" /> {isNp ? "आधार दर हेर्नुहोस्" : "View Base Rate"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t bg-gray-50 py-8">
        <div className="container-page text-center text-sm text-gray-500">
          <p>{isNp ? "दरहरू नेपाल राष्ट्र बैंकको निर्देशन अनुसार परिवर्तन हुन सक्छन्।" : "Rates are subject to change as per Nepal Rastra Bank directives."}</p>
        </div>
      </section>
    </>
  );
}

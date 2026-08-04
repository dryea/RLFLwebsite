"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, Percent } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchAPI } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function BaseRateSpreadRatePage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI("/api/rates/base-rate-spread-rate").then(setData).catch(() => {});
  }, []);

  // Chart data: latest 24 months reversed to chronological
  const chartData = data.slice(0, 24).reverse().map((r) => ({
    month: r.productName,
    spread: r.minRate,
    base: r.maxRate,
  }));

  const latest = data[0];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "आधार दर र स्प्रेड दर" : "Base Rate & Spread Rate"}</h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "नेपाल राष्ट्र बैंक निर्देशन अनुसार मासिक आधार दर" : "Monthly base rate and spread rate as per NRB directives"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={`/${lang}/rates`} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              <ArrowRight className="h-4 w-4 rotate-180" /> {isNp ? "ब्याज दरहरू" : "Interest Rates"}
            </Link>
            <Link href={`/${lang}/emi-calculator`} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              <Percent className="h-4 w-4" /> {isNp ? "EMI क्याल्कुलेटर" : "EMI Calculator"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {/* Latest summary cards */}
          {latest && (
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">{isNp ? "हालको मिति" : "Latest Period"}</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{latest.productName}</p>
              </div>
              <div className="rounded-xl border bg-primary-50 p-6 text-center shadow-sm">
                <p className="text-sm text-primary-700">{isNp ? "स्प्रेड दर" : "Spread Rate"}</p>
                <p className="mt-1 text-2xl font-bold text-primary-700">{latest.minRate}%</p>
              </div>
              <div className="rounded-xl border bg-secondary-50 p-6 text-center shadow-sm">
                <p className="text-sm text-secondary-700">{isNp ? "आधार दर" : "Base Rate"}</p>
                <p className="mt-1 text-2xl font-bold text-secondary-700">{latest.maxRate}%</p>
              </div>
            </div>
          )}

          {/* Line Chart */}
          {chartData.length > 0 && (
            <div className="mb-12 rounded-xl border bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
                <TrendingUp className="h-5 w-5 text-primary-700" />
                {isNp ? "पछिल्लो २४ महिनाको प्रवृत्ति" : "Last 24 Months Trend"}
              </h2>
              <div className="h-64 w-full overflow-x-auto sm:h-80">
                <div className="h-full min-w-[560px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} interval="preserveStartEnd" angle={-35} height={50} textAnchor="end" />
                      <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} width={45} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="base" name={isNp ? "आधार दर (%)" : "Base Rate (%)"} stroke="#2563eb" strokeWidth={2} dot={{ r: 2.5 }} />
                      <Line type="monotone" dataKey="spread" name={isNp ? "स्प्रेड दर (%)" : "Spread Rate (%)"} stroke="#f59e0b" strokeWidth={2} dot={{ r: 2.5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Full Table */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              {isNp ? "आधार दर / स्प्रेड दर इतिहास" : "Base Rate / Spread Rate History"}
            </h2>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="max-h-[600px] overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-primary-50 text-gray-800">
                    <tr>
                      <th className="whitespace-nowrap px-5 py-3 font-semibold">{isNp ? "मिति" : "Date"}</th>
                      <th className="whitespace-nowrap px-5 py-3 font-semibold">{isNp ? "स्प्रेड दर (%)" : "Spread Rate (%)"}</th>
                      <th className="whitespace-nowrap px-5 py-3 font-semibold">{isNp ? "आधार दर (%)" : "Base Rate (%)"}</th>
                      <th className="whitespace-nowrap px-5 py-3 font-semibold">{isNp ? "लागू हुने आधार दर" : "Base Rate Applicable"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((r: any, i: number) => (
                      <tr key={r.id || i} className="transition-colors hover:bg-gray-50">
                        <td className="px-5 py-2.5 font-medium text-gray-900">{r.productName}</td>
                        <td className="px-5 py-2.5 text-gray-600">{r.minRate}%</td>
                        <td className="px-5 py-2.5 font-semibold text-primary-700">{r.maxRate}%</td>
                        <td className="px-5 py-2.5 text-gray-600">{r.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${lang}/rates`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
              <ArrowRight className="h-4 w-4 rotate-180" /> {isNp ? "ब्याज दरहरू हेर्नुहोस्" : "View Interest Rates"}
            </Link>
            <Link href={`/${lang}/rates/standard-tariff-charges`} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
              <ArrowRight className="h-4 w-4" /> {isNp ? "सेवा शुल्क हेर्नुहोस्" : "View Tariff Charges"}
            </Link>
            <Link href={`/${lang}/emi-calculator`} className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
              <Percent className="h-4 w-4" /> {isNp ? "EMI गणना गर्नुहोस्" : "Calculate EMI"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

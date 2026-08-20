"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, Percent, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchAPI } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Heading, Text, GradientText } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

const FALLBACK_HISTORICAL_RATES = [
  { id: 1, productName: "Poush 2081 (Jan 2025)", minRate: "3.85", maxRate: "10.15", notes: "Applicable Base Rate: 10.15%" },
  { id: 2, productName: "Mangsir 2081 (Dec 2024)", minRate: "3.90", maxRate: "10.25", notes: "Applicable Base Rate: 10.25%" },
  { id: 3, productName: "Kartik 2081 (Nov 2024)", minRate: "3.95", maxRate: "10.35", notes: "Applicable Base Rate: 10.35%" },
  { id: 4, productName: "Ashwin 2081 (Oct 2024)", minRate: "4.05", maxRate: "10.45", notes: "Applicable Base Rate: 10.45%" },
  { id: 5, productName: "Bhadra 2081 (Sep 2024)", minRate: "4.10", maxRate: "10.60", notes: "Applicable Base Rate: 10.60%" },
  { id: 6, productName: "Shrawan 2081 (Aug 2024)", minRate: "4.15", maxRate: "10.75", notes: "Applicable Base Rate: 10.75%" },
  { id: 7, productName: "Ashadh 2081 (Jul 2024)", minRate: "4.20", maxRate: "10.90", notes: "Applicable Base Rate: 10.90%" },
  { id: 8, productName: "Jestha 2081 (Jun 2024)", minRate: "4.25", maxRate: "11.05", notes: "Applicable Base Rate: 11.05%" },
  { id: 9, productName: "Baisakh 2081 (May 2024)", minRate: "4.30", maxRate: "11.20", notes: "Applicable Base Rate: 11.20%" },
  { id: 10, productName: "Chaitra 2080 (Apr 2024)", minRate: "4.35", maxRate: "11.35", notes: "Applicable Base Rate: 11.35%" },
  { id: 11, productName: "Falgun 2080 (Mar 2024)", minRate: "4.40", maxRate: "11.50", notes: "Applicable Base Rate: 11.50%" },
  { id: 12, productName: "Magh 2080 (Feb 2024)", minRate: "4.45", maxRate: "11.65", notes: "Applicable Base Rate: 11.65%" },
];

export default function BaseRateSpreadRatePage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [data, setData] = useState<any[]>(FALLBACK_HISTORICAL_RATES);

  useEffect(() => {
    fetchAPI("/api/rates/base-rate-spread-rate")
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setData(res);
        }
      })
      .catch(() => {});
  }, []);

  const chartData = data.slice(0, 12).reverse().map((r) => ({
    month: r.productName,
    spread: parseFloat(r.minRate),
    base: parseFloat(r.maxRate),
  }));

  const latest = data[0];

  return (
    <PageWrapper
      title={isNp ? "नेपाल राष्ट्र बैंक आधार दर र स्प्रेड दर" : "NRB Base Rate & Spread Rate Matrix"}
      description={isNp ? "नेपाल राष्ट्र बैंक निर्देशन अनुसार मासिक प्रकाशित आधार दर, ब्याज स्प्रेड दर र ऐतिहासिक प्रवृत्ति।" : "Monthly historical disclosure of Reliance Finance's Base Rate (10.15%) and Interest Rate Spread under NRB directives."}
      breadcrumbs={[
        { label: isNp ? "दरहरू" : "Rates", href: `/${lang}/rates` },
        { label: isNp ? "आधार दर" : "Base Rate" },
      ]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          {/* Latest Metric Cards */}
          {latest && (
            <div className="mb-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-lg shadow-slate-900/5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{isNp ? "प्रकाशन मिति" : "Current Reporting Period"}</span>
                <p className="mt-2 font-heading text-lg font-extrabold text-slate-900">{latest.productName}</p>
                <span className="mt-1 inline-block rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-semibold text-slate-600">NRB Class 'C' Mandated</span>
              </div>

              <div className="rounded-3xl border border-primary-200 bg-primary-50/80 p-6 text-center shadow-lg shadow-primary-900/5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{isNp ? "हालको आधार दर (Base Rate)" : "Current Base Rate"}</span>
                <p className="mt-2 font-heading text-4xl font-black text-primary-700">{latest.maxRate}%</p>
                <p className="mt-1 text-[11px] font-semibold text-primary-800">Minimum Interest Floor</p>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-6 text-center shadow-lg shadow-amber-900/5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">{isNp ? "ब्याज स्प्रेड दर (Spread Rate)" : "Interest Rate Spread"}</span>
                <p className="mt-2 font-heading text-4xl font-black text-amber-700">{latest.minRate}%</p>
                <p className="mt-1 text-[11px] font-semibold text-amber-900">NRB Cap: Max 4.60%</p>
              </div>
            </div>
          )}

          {/* Line Chart */}
          {chartData.length > 0 && (
            <div className="mb-12 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {isNp ? "ऐतिहासिक विश्लेषण" : "Historical Rate Movement"}
                  </span>
                  <Heading as="h2" className="mt-1 font-heading text-xl font-extrabold text-slate-900">
                    {isNp ? "पछिल्लो १२ महिनाको आधार दर प्रवृत्ति" : "12-Month Base Rate & Spread Trend"}
                  </Heading>
                </div>
              </div>

              <div className="h-72 w-full sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis domain={[3, 13]} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: "10px" }} />
                    <Line type="monotone" dataKey="base" name={isNp ? "आधार दर (%)" : "Base Rate (%)"} stroke="#0F4C81" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="spread" name={isNp ? "स्प्रेड दर (%)" : "Spread Rate (%)"} stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Full Historical Table */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <h3 className="mb-6 font-heading text-lg font-bold text-slate-900">
              {isNp ? "सार्वजनिक आधार दर र स्प्रेड विवरण तालिका" : "Official Historical Base Rate Disclosure Table"}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="py-3 px-4 font-extrabold uppercase">{isNp ? "अवधि / महिना" : "Period / Month"}</th>
                    <th className="py-3 px-4 font-extrabold uppercase text-center">{isNp ? "स्प्रेड दर (%)" : "Spread Rate (%)"}</th>
                    <th className="py-3 px-4 font-extrabold uppercase text-center text-primary-700">{isNp ? "आधार दर (%)" : "Base Rate (%)"}</th>
                    <th className="py-3 px-4 font-extrabold uppercase text-slate-500">{isNp ? "कैफियत" : "NRB Directive Notes"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {data.map((r, i) => (
                    <tr key={r.id || i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{r.productName}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-amber-700">{r.minRate}%</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-primary-700">{r.maxRate}%</td>
                      <td className="py-3 px-4 text-slate-500">{r.notes || "Applicable Base Rate"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/en/calculators" variant="accent" className="gap-2">
                <Percent className="h-4 w-4" /> {isNp ? "EMI क्याल्कुलेटर प्रयोग गर्नुहोस्" : "Calculate Loan EMI"}
              </Button>
              <Button href="/en/rates" variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" /> {isNp ? "सबै ब्याज दरहरू" : "View All Interest Rates"}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

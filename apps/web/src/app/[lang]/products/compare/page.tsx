"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Scale, Check, FileText, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/Toast";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const DEFAULT_COMPARISON_PRODUCTS = [
  {
    slug: "fixed-deposit",
    title: "Fixed Deposit High Yield",
    titleNp: "मुद्दती निक्षेप योजना",
    interestRateInfo: "6.25% p.a.",
    minAmount: 25000,
    maxTenure: "5 years",
    features: ["Quarterly compounding", "Loan against FD up to 90%", "Free email statements"],
    eligibility: ["Nepalese Citizen / Institutional", "Valid ID & PAN"],
    documentsRequired: ["Citizenship Copy", "Passport Photo"],
  },
  {
    slug: "normal-savings",
    title: "Reliance Normal Savings",
    titleNp: "सामान्य बचत खाता",
    interestRateInfo: "3.50% p.a.",
    minAmount: 500,
    maxTenure: "Flexible",
    features: ["Free RFL Smart App Mobile Banking", "Visa Debit Card", "connectIPS Interbank Deposit"],
    eligibility: ["Individual 18+"],
    documentsRequired: ["Citizenship Copy", "2 Photos"],
  },
  {
    slug: "remittance-savings",
    title: "Remittance Special Savings",
    titleNp: "रेमिट्यान्स विशेष बचत खाता",
    interestRateInfo: "5.75% p.a.",
    minAmount: 1000,
    maxTenure: "Flexible",
    features: ["Bonus +1% Yield on Remittance Deposits", "Priority counter at branches", "Free Demat Account"],
    eligibility: ["Foreign employment workers & beneficiaries"],
    documentsRequired: ["Passport Copy", "Remittance Receipt"],
  },
];

export default function ProductComparePage() {
  const lang = useLang();
  const isNp = lang === "np";
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>(DEFAULT_COMPARISON_PRODUCTS);
  const [selected, setSelected] = useState<string[]>(["fixed-deposit", "normal-savings", "remittance-savings"]);

  useEffect(() => {
    getProducts()
      .then((all: any[]) => {
        if (Array.isArray(all) && all.length > 0) setProducts(all);
      })
      .catch(() => {});
  }, []);

  const compare = products.filter((p) => selected.includes(p.slug));

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) {
        toast("info", isNp ? "अधिकतम ३ वटा योजना तुलना गर्न सकिन्छ" : "Compare up to 3 products maximum");
        return prev;
      }
      return [...prev, slug];
    });
  }

  const rateOf = (p: any) => p.interestRateInfo || (p.details?.interestStructure) || `${p.minRate || p.singleRate || ""}%`;

  return (
    <PageWrapper
      title={isNp ? "उत्पादन तुलना प्रणाली" : "Interactive Product Comparison Engine"}
      description={isNp ? "तपाईंको वित्तीय आवश्यकता अनुसार बचत र मुद्दती योजनाहरूको तुलना गर्नुहोस्।" : "Side-by-side comparison of interest rates, minimum balances, eligibility, and features across RFIL banking products."}
      breadcrumbs={[{ label: isNp ? "उत्पादन तुलना" : "Product Comparison" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          {/* Selector Bar */}
          <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-slate-900">
              <Scale className="h-4 w-4 text-primary-600" />
              {isNp ? "तुलना गर्न योजनाहरू चयन गर्नुहोस् (अधिकतम ३)" : "Select up to 3 products to compare:"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => {
                const isChecked = selected.includes(p.slug);
                return (
                  <button
                    key={p.slug}
                    onClick={() => toggle(p.slug)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      isChecked
                        ? "bg-primary-600 text-white shadow-brand shadow-primary-900/20"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isNp && p.titleNp ? p.titleNp : p.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Matrix Table */}
          {compare.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center text-slate-400">
              <Scale className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              <p className="font-heading text-base font-bold text-slate-700">{isNp ? "तुलना गर्न योजना छान्नुहोस्" : "Select at least 1 product to compare"}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-900 text-white">
                      <th className="w-48 px-6 py-4 font-heading text-sm font-bold text-slate-200">{isNp ? "विशेषता" : "Product Feature"}</th>
                      {compare.map((p) => (
                        <th key={p.slug} className="min-w-[220px] px-6 py-4 text-center">
                          <span className="font-heading text-sm font-bold text-secondary-400">{isNp && p.titleNp ? p.titleNp : p.title}</span>
                          <div className="mt-2">
                            <Button href={`/${lang}/open-account?product=${p.slug}`} variant="accent" size="sm" className="gap-1 text-[11px] font-bold">
                              {isNp ? "खाता खोल्नुहोस्" : "Apply Online"} <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <Row label={isNp ? "वार्षिक ब्याज दर" : "Annual Interest Rate"} values={compare.map(rateOf)} highlight />
                    <Row label={isNp ? "न्यूनतम मौज्दात" : "Minimum Balance Required"} values={compare.map((p) => (p.minAmount != null ? `Rs. ${Number(p.minAmount).toLocaleString()}` : "—"))} />
                    <Row label={isNp ? "अधिकतम अवधि" : "Maximum Tenure"} values={compare.map((p) => p.maxTenure || "Flexible")} />
                    <Row
                      label={isNp ? "मुख्य सुविधाहरू" : "Key Benefits"}
                      values={compare.map((p) =>
                        (p.features || []).map((f: string) => (
                          <li key={f} className="flex items-start gap-1.5 py-0.5">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <span className="text-slate-700">{f}</span>
                          </li>
                        ))
                      )}
                      list
                    />
                    <Row
                      label={isNp ? "पात्रता मापदण्ड" : "Eligibility"}
                      values={compare.map((p) =>
                        (p.eligibility || []).map((f: string) => (
                          <li key={f} className="flex items-start gap-1.5 py-0.5">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-600" />
                            <span className="text-slate-700">{f}</span>
                          </li>
                        ))
                      )}
                      list
                    />
                    <Row
                      label={isNp ? "आवश्यक कागजात" : "Required KYC Documents"}
                      values={compare.map((p) =>
                        (p.documentsRequired || []).map((f: string) => (
                          <li key={f} className="flex items-start gap-1.5 py-0.5">
                            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                            <span className="text-slate-700">{f}</span>
                          </li>
                        ))
                      )}
                      list
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </PageWrapper>
  );
}

function Row({ label, values, list, highlight }: { label: string; values: any[]; list?: boolean; highlight?: boolean }) {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="px-6 py-4 font-bold text-slate-800">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`px-6 py-4 text-center ${highlight ? "font-mono text-sm font-extrabold text-primary-700" : ""}`}>
          {list ? <ul className="mx-auto inline-block text-left">{v}</ul> : <span>{v}</span>}
        </td>
      ))}
    </tr>
  );
}

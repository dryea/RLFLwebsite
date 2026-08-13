"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Wallet, Landmark, ShieldCheck } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import CountUp from "@/components/motion/CountUp";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Heading, GradientText } from "@/components/ui/Typography";
import Text from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

const LOAN_RATES: Record<string, { labelEn: string; labelNp: string; rate: number }> = {
  home: { labelEn: "Home Loan", labelNp: "गृह कर्जा", rate: 9.5 },
  auto: { labelEn: "Auto Loan", labelNp: "अटो कर्जा", rate: 10.0 },
  business: { labelEn: "SME / Business Loan", labelNp: "व्यवसाय कर्जा", rate: 11.0 },
  personal: { labelEn: "Personal Loan", labelNp: "व्यक्तिगत कर्जा", rate: 13.0 },
  education: { labelEn: "Education Loan", labelNp: "शिक्षा कर्जा", rate: 10.0 },
  agriculture: { labelEn: "Agricultural Loan", labelNp: "कृषि कर्जा", rate: 9.0 },
};

export default function LoanEligibilityPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [salary, setSalary] = useState(75000);
  const [otherEmi, setOtherEmi] = useState(10000);
  const [tenureYears, setTenureYears] = useState(10);
  const [loanType, setLoanType] = useState("home");
  const [hasRun, setHasRun] = useState(true);

  const result = useMemo(() => {
    const rate = LOAN_RATES[loanType]?.rate || 10;
    const tenure = tenureYears * 12;
    const maxEmi = salary * 0.5 - otherEmi;
    if (maxEmi <= 0 || tenure <= 0) return { eligible: false, maxAmount: 0, emi: 0, rate, tenure, dti: Math.round((otherEmi / salary) * 100) };
    const i = rate / 1200;
    const maxAmount = (maxEmi * (Math.pow(1 + i, tenure) - 1)) / (i * Math.pow(1 + i, tenure));
    const dti = Math.round(((otherEmi + maxEmi) / salary) * 100);
    return { eligible: maxAmount > 0, maxAmount, emi: maxEmi, rate, tenure, dti };
  }, [salary, otherEmi, tenureYears, loanType]);

  const fmt = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-IN");

  return (
    <PageWrapper
      title={isNp ? "ऋण योग्यता जाँच" : "Instant Loan Eligibility Calculator"}
      description={isNp ? "तपाईंको आम्दानीको आधारमा अधिकतम ऋण योग्यता तुरुन्तै पत्ता लगाउनुहोस्।" : "Determine your maximum borrowing limit and monthly repayment capacity based on NRB Class 'C' guidelines."}
      breadcrumbs={[{ label: isNp ? "ऋण योग्यता" : "Loan Eligibility" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isNp ? "नेपाल राष्ट्र बैंक मार्गदर्शन" : "NRB Regulatory Compliant"}
            </span>
            <Heading level={2} className="mt-3 font-heading font-extrabold text-slate-900">
              {isNp ? "ऋण योग्यता " : "Calculate Your "}
              <GradientText>{isNp ? "क्षमता हेर्नुहोस्" : "Borrowing Limit"}</GradientText>
            </Heading>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Input Form Controls */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 md:p-8 lg:col-span-7">
                <h3 className="mb-6 font-heading text-lg font-bold text-slate-900">
                  {isNp ? "१. विवरण प्रविष्ट गर्नुहोस्" : "1. Financial Inputs"}
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{isNp ? "मासिक आम्दानी / तलब (रु.)" : "Monthly Net Income (Rs.)"}</span>
                      <span className="font-mono text-primary-700">{fmt(salary)}</span>
                    </div>
                    <input
                      type="range"
                      min={15000}
                      max={1000000}
                      step={5000}
                      value={salary}
                      onChange={(e) => {
                        setSalary(Number(e.target.value));
                        setHasRun(true);
                      }}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{isNp ? "अन्य हालका मासिक ईएमआई (रु.)" : "Existing Monthly EMIs (Rs.)"}</span>
                      <span className="font-mono text-slate-700">{fmt(otherEmi)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={300000}
                      step={5000}
                      value={otherEmi}
                      onChange={(e) => setOtherEmi(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{isNp ? "ऋण अवधि" : "Loan Tenure"}</span>
                      <span className="font-mono text-primary-700">{tenureYears} {isNp ? "Years" : "Years"}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-xs font-bold text-slate-700">{isNp ? "ऋणको प्रकार चयन गर्नुहोस्" : "Select Loan Product"}</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {Object.entries(LOAN_RATES).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setLoanType(key)}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                            loanType === key
                              ? "border-primary-600 bg-primary-50/80 text-primary-700 shadow-sm"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {isNp ? val.labelNp : val.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Result Output */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hasRun ? "result" : "empty"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex h-full flex-col justify-between rounded-3xl border p-6 shadow-xl md:p-8 ${
                      result.eligible
                        ? "border-slate-800 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white"
                        : "border-rose-200 bg-rose-50 text-slate-900"
                    }`}
                  >
                    {result.eligible ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" /> Eligible
                          </span>
                          <span className="text-xs text-slate-400">Rate: {result.rate}% p.a.</span>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-400">{isNp ? "अधिकतम अनुमानित ऋण रकम" : "Est. Maximum Loan Amount"}</p>
                          <p className="mt-1 font-heading text-3xl font-extrabold text-secondary-400">
                            <CountUp target={Math.round(result.maxAmount)} prefix="Rs. " />
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-slate-400">{isNp ? "मासिक ईएमआई सीमा" : "Max Monthly EMI"}</p>
                            <p className="mt-1 font-mono text-base font-bold text-white"><CountUp target={Math.round(result.emi)} prefix="Rs. " /></p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-slate-400">{isNp ? "आम्दानी-ऋण अनुपात" : "Debt-to-Income (DTI)"}</p>
                            <p className="mt-1 font-mono text-base font-bold text-emerald-400">{result.dti}%</p>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {isNp
                            ? "*यो अनुमानित योग्यता हो। अन्तिम स्वीकृति धितो र कागजात सत्यापनमा आधारित हुनेछ।"
                            : "*Subject to property evaluation, credit bureau score (CIB), and official documentation verification."}
                        </p>

                        <Button href="/en/loan-enquiry" variant="accent" fullWidth size="lg" className="gap-2">
                          {isNp ? "ऋण आवेदन पठाउनुहोस्" : "Apply For Loan Online"} <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                        <p className="text-xl font-bold text-rose-700">{isNp ? "योग्यता मापदण्ड नपुगेको" : "Ineligible for Requested Amount"}</p>
                        <p className="mt-2 text-xs text-rose-600 leading-relaxed">
                          {isNp
                            ? "तपाईंको हालको ईएमआई भुक्तानी आम्दानीको ५०% भन्दा बढी छ। अवधि बढाउने वा सावाँ घटाउने प्रयास गर्नुहोस्।"
                            : "Your current debt ratio exceeds NRB guidelines (50% DTI limit). Consider extending tenure or reducing existing obligations."}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

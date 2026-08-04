"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Wallet, Landmark } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import CountUp from "@/components/motion/CountUp";

const LOAN_RATES: Record<string, { labelEn: string; labelNp: string; rate: number }> = {
  home: { labelEn: "Home Loan", labelNp: "गृह ऋण", rate: 9.5 },
  auto: { labelEn: "Auto Loan", labelNp: "अटो ऋण", rate: 10.0 },
  personal: { labelEn: "Personal Loan", labelNp: "व्यक्तिगत ऋण", rate: 13.0 },
  business: { labelEn: "Business Loan", labelNp: "व्यवसाय ऋण", rate: 11.0 },
  education: { labelEn: "Education Loan", labelNp: "शिक्षा ऋण", rate: 10.0 },
  agriculture: { labelEn: "Agricultural Loan", labelNp: "कृषि ऋण", rate: 9.0 },
};

export default function LoanEligibilityPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [salary, setSalary] = useState(50000);
  const [otherEmi, setOtherEmi] = useState(0);
  const [tenureYears, setTenureYears] = useState(5);
  const [loanType, setLoanType] = useState("home");
  const [hasRun, setHasRun] = useState(false);

  const result = useMemo(() => {
    const rate = LOAN_RATES[loanType]?.rate || 10;
    const tenure = tenureYears * 12;
    const maxEmi = salary * 0.5 - otherEmi;
    if (maxEmi <= 0 || tenure <= 0) return { eligible: false, maxAmount: 0, emi: 0, rate, tenure };
    const i = rate / 1200;
    const maxAmount = maxEmi * (Math.pow(1 + i, tenure) - 1) / (i * Math.pow(1 + i, tenure));
    return { eligible: maxAmount > 0, maxAmount, emi: maxEmi, rate, tenure };
  }, [salary, otherEmi, tenureYears, loanType]);

  const fmt = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-IN");

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Wallet className="h-7 w-7" /> {isNp ? "ऋण योग्यता जाँच" : "Check Loan Eligibility"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "आफ्नो ऋण योग्यता तुरुन्तै जाँच गर्नुहोस्" : "Find out instantly how much you can borrow"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-5 font-heading text-lg font-bold text-gray-900">
                  {isNp ? "आफ्नो विवरण प्रविष्ट गर्नुहोस्" : "Enter Your Details"}
                </h2>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <label className="font-medium text-gray-700">{isNp ? "मासिक तलब" : "Monthly Salary"}</label>
                      <span className="font-bold text-primary-700">{fmt(salary)}</span>
                    </div>
                    <input type="range" min={10000} max={1000000} step={5000} value={salary} onChange={(e) => { setSalary(Number(e.target.value)); setHasRun(true); }} className="w-full accent-[#702B86]" />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <label className="font-medium text-gray-700">{isNp ? "अन्य मासिक ईएमआई" : "Other Monthly EMIs"}</label>
                      <span className="font-bold text-gray-700">{fmt(otherEmi)}</span>
                    </div>
                    <input type="range" min={0} max={200000} step={5000} value={otherEmi} onChange={(e) => setOtherEmi(Number(e.target.value))} className="w-full accent-[#702B86]" />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <label className="font-medium text-gray-700">{isNp ? "अवधि" : "Tenure"}</label>
                      <span className="font-bold text-primary-700">{tenureYears} {isNp ? "वर्ष" : "years"}</span>
                    </div>
                    <input type="range" min={1} max={25} step={1} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-[#702B86]" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">{isNp ? "ऋण प्रकार" : "Loan Type"}</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {Object.entries(LOAN_RATES).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setLoanType(key)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                            loanType === key ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600 hover:border-primary-300"
                          }`}
                        >
                          {isNp ? val.labelNp : val.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={hasRun ? "result" : "empty"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-6 shadow-sm md:p-8 ${result.eligible ? "border-green-200 bg-gradient-to-br from-green-50 to-white" : "border-gray-200 bg-white"}`}
                >
                  {!hasRun ? (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center text-gray-400">
                      <Landmark className="mb-3 h-12 w-12" />
                      <p className="text-sm">{isNp ? "स्लाइडरहरू समायोजन गर्नुहोस् र आफ्नो योग्यता हेर्नुहोस्" : "Adjust the sliders to see your eligibility"}</p>
                    </div>
                  ) : result.eligible ? (
                    <div className="space-y-4">
                      <p className="flex items-center gap-2 text-lg font-bold text-green-700">
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                          <CheckCircle2 className="h-6 w-6" />
                        </motion.span>
                        {isNp ? "तपाईं योग्य हुनुहुन्छ!" : "You're eligible!"}
                      </p>

                      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-gray-400">{isNp ? "अधिकतम ऋण रकम" : "Maximum Loan Amount"}</p>
                        <p className="mt-1 font-heading text-3xl font-extrabold text-primary-700">
                          <CountUp target={Math.round(result.maxAmount)} prefix="Rs. " />
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                          <p className="text-xs text-gray-400">{isNp ? "अनुमानित ईएमआई" : "Est. Monthly EMI"}</p>
                          <p className="mt-1 font-heading text-lg font-bold text-gray-900"><CountUp target={Math.round(result.emi)} prefix="Rs. " /></p>
                        </div>
                        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                          <p className="text-xs text-gray-400">{isNp ? "ब्याज दर" : "Interest Rate"}</p>
                          <p className="mt-1 font-heading text-lg font-bold text-gray-900">{result.rate}%</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400">{isNp ? "यो कागजात सत्यापनमा निर्भर गर्दछ।" : "Subject to document verification and credit assessment."}</p>

                      <Link href={`/${lang}/loan-enquiry`} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                        {isNp ? "अहिले आवेदन गर्नुहोस्" : "Apply Now"} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                      <p className="text-lg font-bold text-red-600">{isNp ? "योग्य छैन" : "Not eligible"}</p>
                      <p className="mt-2 text-sm text-gray-500">{isNp ? "अन्य ऋणहरूको बोझ घटाउने वा आम्दानी बढाउने विचार गर्नुहोस्।" : "Try reducing other EMIs or increasing income."}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

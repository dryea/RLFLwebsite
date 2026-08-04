"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function LoanEligibilityPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [form, setForm] = useState({ monthlySalary: "50000", otherEmi: "0", interestRate: "10.5", tenureMonths: "60", loanType: "home" });
  const [result, setResult] = useState<{ eligible: boolean; maxAmount: number; emi: number } | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const salary = parseFloat(form.monthlySalary) || 0;
    const otherEmi = parseFloat(form.otherEmi) || 0;
    const rate = parseFloat(form.interestRate) || 0;
    const tenure = parseFloat(form.tenureMonths) || 0;

    // Common rule: max EMI capacity ≈ 50% of monthly salary (less existing EMIs)
    const maxEmi = salary * 0.5 - otherEmi;
    if (maxEmi <= 0 || tenure <= 0) {
      setResult({ eligible: false, maxAmount: 0, emi: 0 });
      return;
    }
    const i = rate / 1200;
    // EMI = P * i * (1+i)^n / ((1+i)^n - 1)  =>  solve for P
    const maxAmount = maxEmi * (Math.pow(1 + i, tenure) - 1) / (i * Math.pow(1 + i, tenure));
    setResult({ eligible: maxAmount > 0, maxAmount, emi: maxEmi });
  }

  const inputCls = "w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "ऋण योग्यता जाँच" : "Check Loan Eligibility"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "आफ्नो ऋण योग्यता जाँच गर्नुहोस्" : "Find out how much you can borrow"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page max-w-2xl">
          <form onSubmit={check} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "मासिक तलब (रु.)" : "Monthly Salary (Rs.)"}</label>
                <input type="number" value={form.monthlySalary} onChange={(e) => setForm({ ...form, monthlySalary: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "अन्य मासिक ईएमआई (रु.)" : "Other Monthly EMIs (Rs.)"}</label>
                <input type="number" value={form.otherEmi} onChange={(e) => setForm({ ...form, otherEmi: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"}</label>
                <input type="number" step="0.01" value={form.interestRate} onChange={(e) => setForm({ ...form, interestRate: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "अवधि (महिना)" : "Tenure (months)"}</label>
                <input type="number" value={form.tenureMonths} onChange={(e) => setForm({ ...form, tenureMonths: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ऋण प्रकार" : "Loan Type"}</label>
                <select value={form.loanType} onChange={(e) => setForm({ ...form, loanType: e.target.value })} className={inputCls}>
                  <option value="home">{isNp ? "गृह ऋण" : "Home Loan"}</option>
                  <option value="auto">{isNp ? "अटो ऋण" : "Auto Loan"}</option>
                  <option value="personal">{isNp ? "व्यक्तिगत ऋण" : "Personal Loan"}</option>
                  <option value="business">{isNp ? "व्यवसाय ऋण" : "Business Loan"}</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800">
              {isNp ? "योग्यता जाँच गर्नुहोस्" : "Check Eligibility"}
            </button>
          </form>

          {result && (
            <div className={`mt-6 rounded-2xl border p-6 shadow-sm ${result.eligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
              {result.eligible ? (
                <>
                  <p className="flex items-center gap-2 text-lg font-bold text-green-700">
                    <CheckCircle2 className="h-6 w-6" /> {isNp ? "बधाई छ! तपाईं योग्य हुनुहुन्छ" : "Congratulations! You are eligible"}
                  </p>
                  <p className="mt-3 text-sm text-gray-700">
                    {isNp ? "तपाईंको अधिकतम ऋण रकम" : "Your maximum loan eligibility amount is"}{" "}
                    <span className="font-bold text-green-700">Rs. {result.maxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    {isNp ? "तपाईंको अनुमानित ईएमआई" : "Your estimated EMI is"}{" "}
                    <span className="font-bold">Rs. {result.emi.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{isNp ? "यो रकम कागजात सत्यापनमा निर्भर गर्दछ।" : "This is subject to document verification."}</p>
                  <Link href={`/${lang}/loan-enquiry`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
                    {isNp ? "अहिले आवेदन गर्नुहोस्" : "Apply Now"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-lg font-bold text-red-700">
                    <XCircle className="h-6 w-6" /> {isNp ? "माफ गर्नुहोस्" : "Sorry!"}
                  </p>
                  <p className="mt-3 text-sm text-gray-700">{isNp ? "तपाईंको ऋण योग्यता पूरा भएन। थप जानकारीको लागि सम्पर्क गर्नुहोस्।" : "Your loan eligibility did not qualify. Contact us for more information."}</p>
                  <Link href={`/${lang}/contact`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
                    {isNp ? "सम्पर्क गर्नुहोस्" : "Contact Us"}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localize } from "@/lib/localize";

const EMIPieChart = dynamic(() => import("@/components/sections/EMIPieChart"), { ssr: false });

function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    principal *
    monthlyRate *
    (Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));
  return {
    emi: Math.round(emi),
    totalPayment: Math.round(emi * tenureMonths),
    totalInterest: Math.round(emi * tenureMonths - principal),
  };
}

export default function EMISection({ lang = "en" }: { lang?: string }) {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);
  const isNp = lang === "np";

  const result = calculateEMI(principal, rate, tenure);

  return (
    <div>
      {/* Section header — compact left-aligned variant */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-secondary-600">
            {isNp ? "वित्तीय योजनाकार" : "Financial Planner"}
          </span>
          <h2 className="text-3xl font-bold text-primary-800 md:text-4xl">
            {isNp ? "द्रुत ऋण EMI अनुमानक" : "Quick Loan EMI Estimator"}
          </h2>
        </div>
        <p className="max-w-md text-sm text-gray-500">
          {isNp
            ? "स्लाइडरहरू समायोजन गरेर आफ्नो मासिक किस्ताको अनुमान लिनुहोस्।"
            : "Adjust the sliders to estimate your monthly installments instantly."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="emi-principal" className="mb-1 flex justify-between text-sm font-semibold text-gray-700">
                <span>{isNp ? "ऋण रकम" : "Loan Amount"}</span>
                <span className="text-primary-700">NPR {principal.toLocaleString()}</span>
              </label>
              <input
                id="emi-principal"
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="emi-slider"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>NPR 1L</span><span>NPR 1Cr</span>
              </div>
            </div>

            <div>
              <label htmlFor="emi-rate" className="mb-1 flex justify-between text-sm font-semibold text-gray-700">
                <span>{isNp ? "ब्याज दर" : "Interest Rate"}</span>
                <span className="text-primary-700">{rate}%</span>
              </label>
              <input
                id="emi-rate"
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="emi-slider"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>1%</span><span>30%</span>
              </div>
            </div>

            <div>
              <label htmlFor="emi-tenure" className="mb-1 flex justify-between text-sm font-semibold text-gray-700">
                <span>{isNp ? "अवधि" : "Tenure"}</span>
                <span className="text-primary-700">{Math.floor(tenure / 12)}y {tenure % 12}m</span>
              </label>
              <input
                id="emi-tenure"
                type="range"
                min={6}
                max={360}
                step={6}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="emi-slider"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>{isNp ? "६ महिना" : "6 months"}</span><span>{isNp ? "३० वर्ष" : "30 years"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-primary-50 p-3 text-center">
              <p className="text-xs text-gray-500">{isNp ? "मासिक EMI" : "Monthly EMI"}</p>
              <p className="text-lg font-bold text-primary-700">NPR {result.emi.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-center">
              <p className="text-xs text-gray-500">{isNp ? "जम्मा ब्याज" : "Total Interest"}</p>
              <p className="text-lg font-bold text-amber-700">NPR {result.totalInterest.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-center">
              <p className="text-xs text-gray-500">{isNp ? "जम्मा भुक्तानी" : "Total Payment"}</p>
              <p className="text-lg font-bold text-green-700">NPR {result.totalPayment.toLocaleString()}</p>
            </div>
          </div>

          <EMIPieChart principal={principal} interest={result.totalInterest} />

          <Link
            href={localize("/emi-calculator", lang)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-md"
          >
            {isNp ? "पूर्ण EMI क्याल्कुलेटर" : "Full EMI Calculator"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

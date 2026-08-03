"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const EMIPieChart = dynamic(() => import("@/components/sections/EMIPieChart"), { ssr: false });
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return { emi: Math.round(emi), totalPayment: Math.round(emi * tenureMonths), totalInterest: Math.round(emi * tenureMonths - principal) };
}

export default function EMISection() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);

  const result = calculateEMI(principal, rate, tenure);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <label htmlFor="emi-principal" className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              <span>Loan Amount</span>
              <span className="font-semibold text-primary-700">Rs. {principal.toLocaleString()}</span>
            </label>
            <input
              id="emi-principal"
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="emi-slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Rs. 1L</span>
              <span>Rs. 1Cr</span>
            </div>
          </div>
          <div>
            <label htmlFor="emi-rate" className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              <span>Interest Rate</span>
              <span className="font-semibold text-primary-700">{rate}%</span>
            </label>
            <input
              id="emi-rate"
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="emi-slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>
          <div>
            <label htmlFor="emi-tenure" className="mb-1 flex justify-between text-sm font-medium text-gray-700">
              <span>Tenure</span>
              <span className="font-semibold text-primary-700">{tenure} months ({Math.floor(tenure / 12)}y {tenure % 12}m)</span>
            </label>
            <input
              id="emi-tenure"
              type="range"
              min={6}
              max={360}
              step={6}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="emi-slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>6 months</span>
              <span>30 years</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-primary-50 p-3 text-center">
            <p className="text-xs text-gray-500">Monthly EMI</p>
            <p className="text-xl font-bold text-primary-700">Rs. {result.emi.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-center">
            <p className="text-xs text-gray-500">Total Interest</p>
            <p className="text-xl font-bold text-amber-700">Rs. {result.totalInterest.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-green-50 p-3 text-center">
            <p className="text-xs text-gray-500">Total Payment</p>
            <p className="text-xl font-bold text-green-700">Rs. {result.totalPayment.toLocaleString()}</p>
          </div>
        </div>

        <EMIPieChart principal={principal} interest={result.totalInterest} />

        <Link
          href="/emi-calculator"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600"
        >
          Full EMI Calculator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <style jsx>{`
        .emi-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          outline: none;
        }
        .emi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #702B86;
          border: 3px solid #F2A900;
          cursor: pointer;
        }
        .emi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #702B86;
          border: 3px solid #F2A900;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

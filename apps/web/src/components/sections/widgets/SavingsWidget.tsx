"use client";
import { useState } from "react";

export default function SavingsWidget() {
  const [product, setProduct] = useState("normal");
  const rates: Record<string, string> = {
    normal: "4.25% p.a. | Min: NPR 100",
    everest: "5.50% p.a. | Min: NPR 20,000",
    student: "4.75% p.a. | Min: NPR 500",
    gold: "5.75% p.a. | Min: NPR 50,000",
    "individual-fd": "Up to 6.25% p.a. | Min: NPR 10,000",
  };

  return (
    <div className="mt-auto mb-5 rounded-xl bg-gray-50 p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">Yield & Min Balance</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <label htmlFor={`yield-select-${product}`} className="sr-only">Select product for yield rate</label>
      <select
        id={`yield-select-${product}`}
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs mb-2 focus:border-primary-500 focus:outline-none"
      >
        <option value="normal">Normal Saving</option>
        <option value="everest">Everest Saving</option>
        <option value="student">Student Saving</option>
        <option value="gold">Gold Saving</option>
        <option value="individual-fd">Individual Fixed Deposit</option>
      </select>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-600 text-center">
        {rates[product]}
      </div>
    </div>
  );
}

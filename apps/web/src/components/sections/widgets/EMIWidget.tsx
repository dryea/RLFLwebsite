"use client";
import { useState } from "react";

export default function EMIWidget() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const mr = rate / 12 / 100;
  const payments = 60;
  const emi = mr > 0
    ? Math.round(amount * mr * Math.pow(1 + mr, payments) / (Math.pow(1 + mr, payments) - 1))
    : Math.round(amount / payments);

  return (
    <div className="mt-auto mb-5 rounded-xl bg-gray-50 p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">Quick EMI (5 Yrs)</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="flex gap-1.5 mb-2">
        <label htmlFor="quick-emi-amount" className="sr-only">Loan amount</label>
        <input
          id="quick-emi-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex-[1.2] rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs focus:border-primary-500 focus:outline-none"
          min={50000}
          step={50000}
        />
        <label htmlFor="quick-emi-rate" className="sr-only">Interest rate</label>
        <select
          id="quick-emi-rate"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="flex-[0.8] rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs focus:border-primary-500 focus:outline-none"
        >
          <option value={9.5}>Home (9.5%)</option>
          <option value={10.0}>Auto (10.0%)</option>
          <option value={11.0}>Business (11%)</option>
        </select>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-600 text-center">
        Est. Monthly: NPR {emi.toLocaleString()}
      </div>
    </div>
  );
}

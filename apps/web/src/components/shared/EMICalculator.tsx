"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) };
}

function generateAmortization(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const schedule = [];
  let balance = principal;
  for (let i = 1; i <= tenureMonths; i++) {
    const interest = balance * monthlyRate;
    const princ = emi - interest;
    balance -= princ;
    schedule.push({ month: i, emi: Math.round(emi), principal: Math.round(princ), interest: Math.round(interest), balance: Math.round(Math.max(0, balance)) });
  }
  return schedule;
}

export default function EMICalculator({ lang = "en" }: { lang?: string }) {
  const isNp = lang === "np";
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = calculateEMI(principal, rate, tenure);
  const schedule = generateAmortization(principal, rate, tenure);
  const pieData = [
    { name: isNp ? "मूलधन" : "Principal", value: principal },
    { name: isNp ? "ब्याज" : "Interest", value: result.totalInterest },
  ];
  const COLORS = ["#2563eb", "#f59e0b"];

  return (
    <section className="py-10">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">{isNp ? "ऋण विवरण" : "Loan Details"}</h2>
            <div className="space-y-5">
              <div>
                <label className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                  <span>{isNp ? "ऋण रकम" : "Loan Amount"}</span>
                  <span className="text-primary-700">Rs. {principal.toLocaleString()}</span>
                </label>
                <input type="range" min="100000" max="10000000" step="50000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-primary-700" />
                <div className="flex justify-between text-xs text-gray-400"><span>Rs. 1L</span><span>Rs. 1Cr</span></div>
              </div>
              <div>
                <label className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                  <span>{isNp ? "ब्याज दर" : "Interest Rate"}</span>
                  <span className="text-primary-700">{rate}%</span>
                </label>
                <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-primary-700" />
                <div className="flex justify-between text-xs text-gray-400"><span>1%</span><span>30%</span></div>
              </div>
              <div>
                <label className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                  <span>{isNp ? "अवधि" : "Tenure"}</span>
                  <span className="text-primary-700">{tenure} {isNp ? "महिना" : "months"} ({Math.floor(tenure / 12)}{isNp ? "व" : "y"} {tenure % 12}{isNp ? "म" : "m"})</span>
                </label>
                <input type="range" min="6" max="360" step="6" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-primary-700" />
                <div className="flex justify-between text-xs text-gray-400"><span>6 {isNp ? "महिना" : "months"}</span><span>{isNp ? "३० वर्ष" : "30 years"}</span></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">{isNp ? "भुक्तानी सारांश" : "Payment Summary"}</h2>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-primary-50 p-4 text-center">
                <p className="text-xs text-gray-500">{isNp ? "मासिक EMI" : "Monthly EMI"}</p>
                <p className="text-2xl font-bold text-primary-700">Rs. {result.emi.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 text-center">
                <p className="text-xs text-gray-500">{isNp ? "कुल ब्याज" : "Total Interest"}</p>
                <p className="text-2xl font-bold text-amber-700">Rs. {result.totalInterest.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-xs text-gray-500">{isNp ? "कुल भुक्तानी" : "Total Payment"}</p>
                <p className="text-2xl font-bold text-green-700">Rs. {result.totalPayment.toLocaleString()}</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <button onClick={() => setShowSchedule(!showSchedule)} className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              {showSchedule ? (isNp ? "लुकाउनुहोस्" : "Hide") : (isNp ? "देखाउनुहोस्" : "Show")} {isNp ? "ऋण तालिका" : "Amortization Schedule"}
            </button>
          </div>
        </div>

        {showSchedule && (
          <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-600">{isNp ? "महिना" : "Month"}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">EMI</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{isNp ? "मूलधन" : "Principal"}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{isNp ? "ब्याज" : "Interest"}</th>
                    <th className="px-4 py-3 font-medium text-gray-600">{isNp ? "ब्यालेन्स" : "Balance"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {schedule.map((row) => (
                    <tr key={row.month} className="transition-colors hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">{row.month}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">Rs. {row.emi.toLocaleString()}</td>
                      <td className="px-4 py-2 text-gray-700">Rs. {row.principal.toLocaleString()}</td>
                      <td className="px-4 py-2 text-gray-700">Rs. {row.interest.toLocaleString()}</td>
                      <td className="px-4 py-2 text-gray-700">Rs. {row.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Calculator, TrendingUp, PiggyBank, RefreshCcw, Wallet } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

type CalcType = "emi" | "simple" | "compound" | "deposit" | "rd";

export default function CalculatorHubPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [active, setActive] = useState<CalcType>("emi");

  const tabs: { id: CalcType; label: string; np: string; icon: any }[] = [
    { id: "emi", label: "EMI", np: "ईएमआई", icon: Wallet },
    { id: "simple", label: "Simple Interest", np: "साधारण ब्याज", icon: TrendingUp },
    { id: "compound", label: "Compound Interest", np: "चक्रवृद्धि ब्याज", icon: TrendingUp },
    { id: "deposit", label: "Deposit Interest", np: "निक्षेप ब्याज", icon: PiggyBank },
    { id: "rd", label: "Recurring Deposit", np: "आवर्ती निक्षेप", icon: RefreshCcw },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Calculator className="h-7 w-7" /> {isNp ? "क्याल्कुलेटरहरू" : "Calculators"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "सजिलो र सटीक वित्तीय योजना" : "Easy, accurate financial planning"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === t.id ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <t.icon className="h-4 w-4" /> {isNp ? t.np : t.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            {active === "emi" && <EmiCalculator lang={lang} isNp={isNp} />}
            {active === "simple" && <SimpleInterest lang={lang} isNp={isNp} />}
            {active === "compound" && <CompoundInterest lang={lang} isNp={isNp} />}
            {active === "deposit" && <DepositInterest lang={lang} isNp={isNp} />}
            {active === "rd" && <RecurringDeposit lang={lang} isNp={isNp} />}
          </div>
        </div>
      </section>
    </>
  );
}

function NumberInput({ label, value, onChange, suffix, placeholder }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center rounded-lg border focus-within:border-primary-500">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg px-4 py-2 text-sm outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-gray-400">{suffix}</span>}
      </div>
    </div>
  );
}

function Result({ rows }: { rows: { label: string; value: string; highlight?: boolean }[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border">
      {rows.map((r, i) => (
        <div key={i} className={`flex items-center justify-between px-5 py-3 text-sm ${i % 2 ? "bg-gray-50" : "bg-white"} ${r.highlight ? "bg-primary-50 font-bold text-primary-700" : "text-gray-700"}`}>
          <span>{r.label}</span>
          <span className="font-semibold">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function EmiCalculator({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("1000000");
  const [r, setR] = useState("10.5");
  const [t, setT] = useState("60");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0;
  const monthlyRate = R / 1200;
  const emi = monthlyRate > 0 && T > 0
    ? (P * monthlyRate * Math.pow(1 + monthlyRate, T)) / (Math.pow(1 + monthlyRate, T) - 1)
    : P > 0 ? P / T : 0;
  const total = emi * T;
  const interest = total - P;

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-gray-900">{isNp ? "ईएमआई क्याल्कुलेटर" : "EMI Calculator"}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberInput label={isNp ? "ऋण रकम (रु.)" : "Loan Amount (Rs.)"} value={p} onChange={setP} />
        <NumberInput label={isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"} value={r} onChange={setR} />
        <NumberInput label={isNp ? "अवधि (महिना)" : "Tenure (months)"} value={t} onChange={setT} />
      </div>
      <Result rows={[
        { label: isNp ? "मासिक ईएमआई" : "Monthly EMI", value: `Rs. ${emi.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, highlight: true },
        { label: isNp ? "कुल ब्याज" : "Total Interest", value: `Rs. ${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        { label: isNp ? "कुल रकम" : "Total Payable", value: `Rs. ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
      ]} />
    </div>
  );
}

function SimpleInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("100000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("3");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0;
  const interest = (P * R * T) / 100;

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-gray-900">{isNp ? "साधारण ब्याज क्याल्कुलेटर" : "Simple Interest Calculator"}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberInput label={isNp ? "मूलधन (रु.)" : "Principal (Rs.)"} value={p} onChange={setP} />
        <NumberInput label={isNp ? "दर (% वार्षिक)" : "Rate (% p.a.)"} value={r} onChange={setR} />
        <NumberInput label={isNp ? "अवधि (वर्ष)" : "Time (years)"} value={t} onChange={setT} />
      </div>
      <Result rows={[
        { label: isNp ? "ब्याज" : "Interest", value: `Rs. ${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, highlight: true },
        { label: isNp ? "कुल रकम" : "Total Amount", value: `Rs. ${(P + interest).toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
      ]} />
    </div>
  );
}

function CompoundInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("100000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("3");
  const [freq, setFreq] = useState("12");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0, F = parseFloat(freq) || 1;
  const amount = P * Math.pow(1 + R / 100 / F, F * T);
  const interest = amount - P;

  const freqs = [
    { v: "1", label: isNp ? "वार्षिक" : "Yearly" },
    { v: "2", label: isNp ? "अर्धवार्षिक" : "Semi-annual" },
    { v: "4", label: isNp ? "त्रैमासिक" : "Quarterly" },
    { v: "12", label: isNp ? "मासिक" : "Monthly" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-gray-900">{isNp ? "चक्रवृद्धि ब्याज क्याल्कुलेटर" : "Compound Interest Calculator"}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberInput label={isNp ? "मूलधन (रु.)" : "Principal (Rs.)"} value={p} onChange={setP} />
        <NumberInput label={isNp ? "दर (% वार्षिक)" : "Rate (% p.a.)"} value={r} onChange={setR} />
        <NumberInput label={isNp ? "अवधि (वर्ष)" : "Time (years)"} value={t} onChange={setT} />
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "चक्रवृद्धि अवधि" : "Compounding"}</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500">
            {freqs.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </div>
      </div>
      <Result rows={[
        { label: isNp ? "कुल रकम" : "Maturity Amount", value: `Rs. ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, highlight: true },
        { label: isNp ? "चक्रवृद्धि ब्याज" : "Compound Interest", value: `Rs. ${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
      ]} />
    </div>
  );
}

function DepositInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("500000");
  const [r, setR] = useState("7.25");
  const [t, setT] = useState("2");
  const [tax, setTax] = useState("5");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0, taxRate = parseFloat(tax) || 0;
  const interest = (P * R * T) / 100;
  const taxAmount = (interest * taxRate) / 100;
  const net = interest - taxAmount;

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-gray-900">{isNp ? "निक्षेप ब्याज क्याल्कुलेटर" : "Deposit Interest Calculator"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label={isNp ? "निक्षेप रकम (रु.)" : "Deposit Amount (Rs.)"} value={p} onChange={setP} />
        <NumberInput label={isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"} value={r} onChange={setR} />
        <NumberInput label={isNp ? "अवधि (वर्ष)" : "Tenure (years)"} value={t} onChange={setT} />
        <NumberInput label={isNp ? "कर (%)" : "Tax (%)"} value={tax} onChange={setTax} />
      </div>
      <Result rows={[
        { label: isNp ? "कुल ब्याज" : "Interest Earned", value: `Rs. ${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, highlight: true },
        { label: isNp ? "कर रकम" : "Tax Amount", value: `Rs. ${taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        { label: isNp ? "करपछि ब्याज" : "Net Interest (after tax)", value: `Rs. ${net.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        { label: isNp ? "कुल प्राप्त रकम" : "Total Receivable", value: `Rs. ${(P + net).toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
      ]} />
    </div>
  );
}

function RecurringDeposit({ isNp }: { lang: string; isNp: boolean }) {
  const [m, setM] = useState("5000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("12");

  const M = parseFloat(m) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0;
  const i = R / 1200;
  // RD maturity = M * ((1+i)^n - 1)/i * (1+i)
  const amount = i > 0 ? M * ((Math.pow(1 + i, T) - 1) / i) * (1 + i) : M * T;
  const principal = M * T;
  const interest = amount - principal;

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-gray-900">{isNp ? "आवर्ती निक्षेप क्याल्कुलेटर" : "Recurring Deposit Calculator"}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberInput label={isNp ? "मासिक रकम (रु.)" : "Monthly Amount (Rs.)"} value={m} onChange={setM} />
        <NumberInput label={isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"} value={r} onChange={setR} />
        <NumberInput label={isNp ? "अवधि (महिना)" : "Tenure (months)"} value={t} onChange={setT} />
      </div>
      <Result rows={[
        { label: isNp ? "कुल निक्षेप" : "Total Deposited", value: `Rs. ${principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        { label: isNp ? "कुल ब्याज" : "Total Interest", value: `Rs. ${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
        { label: isNp ? "परिपक्वता रकम" : "Maturity Amount", value: `Rs. ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, highlight: true },
      ]} />
    </div>
  );
}

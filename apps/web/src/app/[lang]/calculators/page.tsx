"use client";

import { useState } from "react";
import { Calculator, TrendingUp, PiggyBank, RefreshCcw, Wallet, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Grid from "@/components/ui/Grid";
import { Heading, Text, GradientText } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

type CalcType = "emi" | "deposit" | "rd" | "compound" | "simple";

export default function CalculatorHubPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [active, setActive] = useState<CalcType>("emi");

  const tabs: { id: CalcType; label: string; np: string; icon: any }[] = [
    { id: "emi", label: "EMI Calculator", np: "ईएमआई क्याल्कुलेटर", icon: Wallet },
    { id: "deposit", label: "Fixed Deposit Interest", np: "मुद्दती निक्षेप ब्याज", icon: PiggyBank },
    { id: "rd", label: "Recurring Deposit", np: "आवर्ती निक्षेप", icon: RefreshCcw },
    { id: "compound", label: "Compound Interest", np: "चक्रवृद्धि ब्याज", icon: TrendingUp },
    { id: "simple", label: "Simple Interest", np: "साधारण ब्याज", icon: TrendingUp },
  ];

  return (
    <PageWrapper
      title={isNp ? "वित्तीय क्याल्कुलेटरहरू" : "Financial Calculators & Decision Tools"}
      description={isNp ? "सजिलो, पारदर्शी र सटीक निक्षेप र ऋण योजना tool हरू" : "Plan your savings, fixed deposits, and loans with precision using RFIL's financial planning suite."}
      breadcrumbs={[{ label: isNp ? "क्याल्कुलेटरहरू" : "Calculators" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          {/* Header & Tabs */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
              <Calculator className="h-3.5 w-3.5" />
              {isNp ? "स्मार्ट वित्तीय उपकरण" : "Smart Financial Tools"}
            </span>
            <Heading level={2} className="mt-3 font-heading font-extrabold text-slate-900">
              {isNp ? "तपाईंको " : "Calculate Your "}
              <GradientText>{isNp ? "वित्तीय भविष्य योजना" : "Financial Growth"}</GradientText>
            </Heading>
            <Text className="mx-auto mt-2 max-w-2xl text-slate-600">
              {isNp
                ? "मासिक किस्ता, मुद्दती प्रतिफल र बचत वृद्धि सजिलै गणना गर्नुहोस्।"
                : "Estimate monthly instalments, compound interest, fixed deposit maturity, and tax deductions in seconds."}
            </Text>

            {/* Glassmorphic Tab Bar */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-md">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-primary-600 text-white shadow-brand shadow-primary-900/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-secondary-400" : "text-slate-400"}`} />
                    {isNp ? t.np : t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculator Card Container */}
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10">
            {active === "emi" && <EmiCalculator lang={lang} isNp={isNp} />}
            {active === "deposit" && <DepositInterest lang={lang} isNp={isNp} />}
            {active === "rd" && <RecurringDeposit lang={lang} isNp={isNp} />}
            {active === "compound" && <CompoundInterest lang={lang} isNp={isNp} />}
            {active === "simple" && <SimpleInterest lang={lang} isNp={isNp} />}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

function NumberSliderInput({ label, value, min, max, step, onChange, prefix, suffix, helpText }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
        <span>{label}</span>
        <span className="font-mono text-sm text-primary-700">
          {prefix} {parseFloat(value).toLocaleString()} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600 focus:outline-none"
      />
      <div className="flex justify-between text-[10px] font-medium text-slate-400">
        <span>{prefix} {min.toLocaleString()}</span>
        <span>{prefix} {max.toLocaleString()}</span>
      </div>
      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
}

function ResultCard({ rows, ctaText, ctaHref }: { rows: { label: string; value: string; highlight?: boolean }[]; ctaText?: string; ctaHref?: string }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-6 text-white shadow-lg">
      <div>
        <span className="inline-block rounded-full bg-secondary-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary-400">
          Calculation Summary
        </span>

        <div className="mt-6 space-y-4">
          {rows.map((r, i) => (
            <div key={i} className={`flex items-center justify-between border-b border-white/10 pb-3 ${r.highlight ? "text-secondary-400" : "text-slate-300"}`}>
              <span className="text-xs font-medium">{r.label}</span>
              <span className={`font-mono text-sm ${r.highlight ? "text-lg font-bold text-secondary-400" : "font-semibold text-white"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {ctaText && ctaHref && (
        <div className="mt-8">
          <Button href={ctaHref} variant="accent" fullWidth size="md" className="gap-2">
            {ctaText} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function EmiCalculator({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("1500000");
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
    <div className="grid gap-8 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <h3 className="font-heading text-lg font-bold text-slate-900">{isNp ? "ऋण विवरण प्रविष्ट गर्नुहोस्" : "Enter Loan Details"}</h3>
        <NumberSliderInput
          label={isNp ? "ऋण रकम (रु.)" : "Loan Amount (Rs.)"}
          value={p}
          min={100000}
          max={10000000}
          step={50000}
          onChange={setP}
          prefix="Rs."
        />
        <NumberSliderInput
          label={isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"}
          value={r}
          min={6}
          max={18}
          step={0.25}
          onChange={setR}
          suffix="%"
        />
        <NumberSliderInput
          label={isNp ? "अवधि (महिना)" : "Tenure (months)"}
          value={t}
          min={12}
          max={360}
          step={6}
          onChange={setT}
          suffix="months"
        />
      </div>
      <div className="md:col-span-5">
        <ResultCard
          rows={[
            { label: isNp ? "मासिक ईएमआई" : "Monthly EMI", value: `Rs. ${Math.round(emi).toLocaleString()}`, highlight: true },
            { label: isNp ? "सावाँ रकम" : "Principal Amount", value: `Rs. ${P.toLocaleString()}` },
            { label: isNp ? "कुल ब्याज" : "Total Interest Payable", value: `Rs. ${Math.round(interest).toLocaleString()}` },
            { label: isNp ? "कुल भुक्तानी" : "Total Amount Payable", value: `Rs. ${Math.round(total).toLocaleString()}` },
          ]}
          ctaText={isNp ? "ऋणको लागि आवेदन दिनुहोस्" : "Apply For Loan Online"}
          ctaHref="/en/loan-enquiry"
        />
      </div>
    </div>
  );
}

function DepositInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("500000");
  const [r, setR] = useState("6.25");
  const [t, setT] = useState("2");
  const [tax, setTax] = useState("5");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0, taxRate = parseFloat(tax) || 0;
  const interest = (P * R * T) / 100;
  const taxAmount = (interest * taxRate) / 100;
  const net = interest - taxAmount;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <h3 className="font-heading text-lg font-bold text-slate-900">{isNp ? "निक्षेप विवरण" : "Deposit Parameters"}</h3>
        <NumberSliderInput
          label={isNp ? "मुद्दती रकम (रु.)" : "Fixed Deposit Amount (Rs.)"}
          value={p}
          min={25000}
          max={5000000}
          step={25000}
          onChange={setP}
          prefix="Rs."
        />
        <NumberSliderInput
          label={isNp ? "ब्याज दर (% वार्षिक)" : "Interest Rate (% p.a.)"}
          value={r}
          min={3.5}
          max={10}
          step={0.25}
          onChange={setR}
          suffix="%"
        />
        <NumberSliderInput
          label={isNp ? "अवधि (वर्ष)" : "Tenure (years)"}
          value={t}
          min={0.5}
          max={10}
          step={0.5}
          onChange={setT}
          suffix="years"
        />
      </div>
      <div className="md:col-span-5">
        <ResultCard
          rows={[
            { label: isNp ? "परिपक्वता रकम" : "Maturity Total (after tax)", value: `Rs. ${Math.round(P + net).toLocaleString()}`, highlight: true },
            { label: isNp ? "मूल रकम" : "Principal Amount", value: `Rs. ${P.toLocaleString()}` },
            { label: isNp ? "कुल आर्जित ब्याज" : "Gross Interest Earned", value: `Rs. ${Math.round(interest).toLocaleString()}` },
            { label: isNp ? "नेपाल सरकार कर (५%)" : "Tax Deducted (5%)", value: `Rs. ${Math.round(taxAmount).toLocaleString()}` },
          ]}
          ctaText={isNp ? "मुद्दती खाता खोल्नुहोस्" : "Open Fixed Deposit Online"}
          ctaHref="/en/open-account"
        />
      </div>
    </div>
  );
}

function RecurringDeposit({ isNp }: { lang: string; isNp: boolean }) {
  const [m, setM] = useState("10000");
  const [r, setR] = useState("7.0");
  const [t, setT] = useState("24");

  const M = parseFloat(m) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0;
  const i = R / 1200;
  const amount = i > 0 ? M * ((Math.pow(1 + i, T) - 1) / i) * (1 + i) : M * T;
  const principal = M * T;
  const interest = amount - principal;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <h3 className="font-heading text-lg font-bold text-slate-900">{isNp ? "आवर्ती बचत विवरण" : "Recurring Savings Plan"}</h3>
        <NumberSliderInput
          label={isNp ? "मासिक बचत रकम (रु.)" : "Monthly Savings (Rs.)"}
          value={m}
          min={1000}
          max={100000}
          step={1000}
          onChange={setM}
          prefix="Rs."
        />
        <NumberSliderInput
          label={isNp ? "वार्षिक ब्याज दर (%)" : "Annual Rate (%)"}
          value={r}
          min={4}
          max={12}
          step={0.25}
          onChange={setR}
          suffix="%"
        />
        <NumberSliderInput
          label={isNp ? "अवधि (महिना)" : "Tenure (months)"}
          value={t}
          min={6}
          max={60}
          step={6}
          onChange={setT}
          suffix="months"
        />
      </div>
      <div className="md:col-span-5">
        <ResultCard
          rows={[
            { label: isNp ? "परिपक्वता रकम" : "Maturity Total", value: `Rs. ${Math.round(amount).toLocaleString()}`, highlight: true },
            { label: isNp ? "कुल जम्मा रकम" : "Total Principal Deposited", value: `Rs. ${principal.toLocaleString()}` },
            { label: isNp ? "आर्जित चक्रवृद्धि ब्याज" : "Interest Accumulated", value: `Rs. ${Math.round(interest).toLocaleString()}` },
          ]}
          ctaText={isNp ? "बचत खाता सुरु गर्नुहोस्" : "Start Recurring Account"}
          ctaHref="/en/open-account"
        />
      </div>
    </div>
  );
}

function CompoundInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("200000");
  const [r, setR] = useState("8.0");
  const [t, setT] = useState("3");
  const [freq, setFreq] = useState("4");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0, F = parseFloat(freq) || 1;
  const amount = P * Math.pow(1 + R / 100 / F, F * T);
  const interest = amount - P;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <h3 className="font-heading text-lg font-bold text-slate-900">{isNp ? "चक्रवृद्धि गणना" : "Compound Growth"}</h3>
        <NumberSliderInput
          label={isNp ? "सावाँ (रु.)" : "Principal (Rs.)"}
          value={p}
          min={10000}
          max={2000000}
          step={10000}
          onChange={setP}
          prefix="Rs."
        />
        <NumberSliderInput
          label={isNp ? "ब्याज दर (%)" : "Interest Rate (%)"}
          value={r}
          min={3}
          max={15}
          step={0.25}
          onChange={setR}
          suffix="%"
        />
        <NumberSliderInput
          label={isNp ? "अवधि (वर्ष)" : "Tenure (years)"}
          value={t}
          min={1}
          max={15}
          step={1}
          onChange={setT}
          suffix="years"
        />
      </div>
      <div className="md:col-span-5">
        <ResultCard
          rows={[
            { label: isNp ? "परिपक्वता रकम" : "Maturity Total", value: `Rs. ${Math.round(amount).toLocaleString()}`, highlight: true },
            { label: isNp ? "मूल सावाँ" : "Initial Principal", value: `Rs. ${P.toLocaleString()}` },
            { label: isNp ? "कुल चक्रवृद्धि ब्याज" : "Compound Interest", value: `Rs. ${Math.round(interest).toLocaleString()}` },
          ]}
          ctaText={isNp ? "हाम्रो ब्याज दर हेर्नुहोस्" : "Explore Deposit Rates"}
          ctaHref="/en/rates"
        />
      </div>
    </div>
  );
}

function SimpleInterest({ isNp }: { lang: string; isNp: boolean }) {
  const [p, setP] = useState("100000");
  const [r, setR] = useState("7.5");
  const [t, setT] = useState("2");

  const P = parseFloat(p) || 0, R = parseFloat(r) || 0, T = parseFloat(t) || 0;
  const interest = (P * R * T) / 100;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <h3 className="font-heading text-lg font-bold text-slate-900">{isNp ? "साधारण ब्याज गणना" : "Simple Interest Calculation"}</h3>
        <NumberSliderInput
          label={isNp ? "सावाँ (रु.)" : "Principal (Rs.)"}
          value={p}
          min={5000}
          max={1000000}
          step={5000}
          onChange={setP}
          prefix="Rs."
        />
        <NumberSliderInput
          label={isNp ? "दर (%)" : "Rate (%)"}
          value={r}
          min={2}
          max={15}
          step={0.25}
          onChange={setR}
          suffix="%"
        />
        <NumberSliderInput
          label={isNp ? "अवधि (वर्ष)" : "Tenure (years)"}
          value={t}
          min={1}
          max={10}
          step={1}
          onChange={setT}
          suffix="years"
        />
      </div>
      <div className="md:col-span-5">
        <ResultCard
          rows={[
            { label: isNp ? "कुल रकम" : "Total Receivable", value: `Rs. ${Math.round(P + interest).toLocaleString()}`, highlight: true },
            { label: isNp ? "सावाँ रकम" : "Principal", value: `Rs. ${P.toLocaleString()}` },
            { label: isNp ? "आर्जित ब्याज" : "Interest Earned", value: `Rs. ${Math.round(interest).toLocaleString()}` },
          ]}
          ctaText={isNp ? "बचत खाता खोल्नुहोस्" : "Open Savings Account"}
          ctaHref="/en/open-account"
        />
      </div>
    </div>
  );
}

"use client";
import { useState, useMemo } from "react";
import { IndianRupee, Percent, CalendarDays, Calculator, HandCoins, ArrowRight } from "lucide-react";
import Link from "next/link";

const RATES: Record<string, Record<number, number>> = {
  individual: { 3: 3.50, 6: 3.50, 12: 4.00, 24: 4.25, 36: 4.25, 60: 6.25 },
  corporate: { 3: 3.00, 6: 3.00, 12: 3.00, 24: 3.25, 36: 3.25, 60: 5.25 },
  remittance: { 3: 4.50, 6: 4.50, 12: 5.00, 24: 5.25, 36: 5.25, 60: 7.25 },
};

const TENURE_OPTIONS = [
  { months: 3, en: "3 Months", np: "३ महिना" },
  { months: 6, en: "6 Months", np: "६ महिना" },
  { months: 12, en: "1 Year", np: "१ वर्ष" },
  { months: 24, en: "2 Years", np: "२ वर्ष" },
  { months: 36, en: "3 Years", np: "३ वर्ष" },
  { months: 60, en: "5 Years", np: "५ वर्ष" },
];

const CUSTOMER_TYPES = [
  { id: "individual", en: "Individual", np: "व्यक्तिगत" },
  { id: "corporate", en: "Corporate", np: "संस्थागत" },
  { id: "remittance", en: "Remittance", np: "रेमिट्यान्स" },
];

function calculateFD(principal: number, rate: number, tenureMonths: number) {
  const years = tenureMonths / 12;
  const quarterlyRate = rate / 4 / 100;
  const compoundingPeriods = 4 * years;
  const maturityAmount = principal * Math.pow(1 + quarterlyRate, compoundingPeriods);
  const totalInterest = maturityAmount - principal;
  return { maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest) };
}

export default function FDMaturityCalculator({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState(500000);
  const [customerType, setCustomerType] = useState("individual");
  const [tenureMonths, setTenureMonths] = useState(12);

  const rate = RATES[customerType]?.[tenureMonths] ?? 6.0;

  const result = useMemo(() => calculateFD(principal, rate, tenureMonths), [principal, rate, tenureMonths]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-primary-500" />
                {lang === "en" ? "Deposit Amount" : "निक्षेप रकम"}
              </span>
              <span className="text-lg font-bold text-primary-700">NPR {principal.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min={10000}
              max={10000000}
              step={10000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="fd-slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>NPR 10K</span>
              <span>NPR 1Cr</span>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <Calculator className="h-4 w-4 text-primary-500" />
              {lang === "en" ? "Customer Type" : "ग्राहक प्रकार"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CUSTOMER_TYPES.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => setCustomerType(ct.id)}
                  className={`rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-all ${
                    customerType === ct.id
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {lang === "en" ? ct.en : ct.np}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                {lang === "en" ? "Tenure" : "अवधि"}
              </span>
              <span className="font-semibold text-primary-700">
                {TENURE_OPTIONS.find((t) => t.months === tenureMonths)?.en
                  ? lang === "en"
                    ? TENURE_OPTIONS.find((t) => t.months === tenureMonths)?.en
                    : TENURE_OPTIONS.find((t) => t.months === tenureMonths)?.np
                  : `${tenureMonths} months`}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={TENURE_OPTIONS.findIndex((t) => t.months === tenureMonths)}
              onChange={(e) => setTenureMonths(TENURE_OPTIONS[Number(e.target.value)].months)}
              className="fd-slider w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              {TENURE_OPTIONS.map((t, i) => (
                <button
                  key={t.months}
                  onClick={() => setTenureMonths(t.months)}
                  className={`px-1 py-0.5 text-[0.65rem] font-semibold transition-colors ${
                    tenureMonths === t.months ? "text-primary-700" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {lang === "en" ? t.en.replace(/\s/g, "\u00A0") : t.np}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h3 className="mb-6 font-heading text-lg font-bold text-gray-900">
          {lang === "en" ? "Your FD Summary" : "तपाईंको FD सारांश"}
        </h3>

        <div className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-700">
          <Percent className="mr-1 inline h-3.5 w-3.5" />
          {rate}% {lang === "en" ? "p.a." : "प्रति वर्ष"}
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-primary-50 p-4 text-center">
            <p className="mb-1 text-xs font-medium text-gray-500">
              {lang === "en" ? "Deposit" : "निक्षेप"}
            </p>
            <p className="text-lg font-bold text-primary-700">NPR {principal.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4 text-center">
            <p className="mb-1 text-xs font-medium text-gray-500">
              {lang === "en" ? "Interest Earned" : "ब्याज आम्दानी"}
            </p>
            <p className="text-lg font-bold text-amber-700">NPR {result.totalInterest.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="mb-1 text-xs font-medium text-gray-500">
              {lang === "en" ? "Maturity Amount" : "परिपक्वता रकम"}
            </p>
            <p className="text-lg font-bold text-green-700">NPR {result.maturityAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <HandCoins className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-900">
                {lang === "en" ? "How it works" : "यसले कसरी काम गर्छ"}
              </p>
              <p className="text-xs leading-relaxed text-gray-500">
                {lang === "en"
                  ? "Interest is compounded quarterly. The displayed rate is based on the selected customer type and tenure. Actual rates may vary at the time of deposit booking."
                  : "ब्याज त्रैमासिक रूपमा संयोजित हुन्छ। प्रदर्शित दर चयन गरिएको ग्राहक प्रकार र अवधिमा आधारित छ। वास्तविक दर निक्षेप बुकिङको समयमा फरक हुन सक्छ।"}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/loan-enquiry"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
        >
          {lang === "en" ? "Open a Fixed Deposit" : "मुद्दती निक्षेप खोल्नुहोस्"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <style jsx>{`
        .fd-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          outline: none;
        }
        .fd-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #702B86;
          border: 3px solid #F2A900;
          cursor: pointer;
        }
        .fd-slider::-moz-range-thumb {
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

"use client";

import Link from "next/link";
import { ShieldCheck, Users, Landmark, Award, CheckCircle2, Zap } from "lucide-react";
import CountUp from "@/components/motion/CountUp";

interface TrustBarProps {
  lang: string;
}

export default function TrustBar({ lang }: TrustBarProps) {
  const isNp = lang === "np";

  const stats = [
    {
      icon: Landmark,
      value: "21+",
      label: isNp ? "सक्रिय शाखाहरू" : "Nationwide Branches",
      sublabel: isNp ? "नेपालभर उपस्थिति" : "Presence across Nepal",
    },
    {
      icon: Users,
      value: "100000+",
      label: isNp ? "सन्तुष्ट ग्राहकहरू" : "Valued Customers",
      sublabel: isNp ? "विश्वासका साथ" : "Serving with Trust",
    },
    {
      icon: Award,
      value: "17+",
      label: isNp ? "वर्षको विरासत" : "Years of Legacy",
      sublabel: isNp ? "वि.सं. २०६६ देखि" : "Est. B.S. 2066",
    },
    {
      icon: ShieldCheck,
      value: "NRB",
      label: isNp ? "इजाजतपत्र प्राप्त" : "Class 'C' License",
      sublabel: isNp ? "नेपाल राष्ट्र बैंकद्वारा नियन्त्रित" : "Regulated by NRB",
    },
  ];

  return (
    <section className="relative z-20 -mt-12 pb-6">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/60 shadow-brand backdrop-blur-md md:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            const numeric = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
            const isNumeric = !isNaN(numeric) && s.value !== "NRB";

            return (
              <div
                key={s.label}
                className="group flex items-center gap-3.5 bg-white p-5 transition-colors hover:bg-slate-50/80"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 border border-primary-100 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading text-xl font-extrabold text-primary-950 md:text-2xl">
                    {isNumeric ? <CountUp target={numeric} suffix="+" /> : s.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{s.label}</div>
                  <div className="text-[11px] font-medium text-slate-400 line-clamp-1">{s.sublabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

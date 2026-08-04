"use client";

import Link from "next/link";
import { ShieldCheck, Users, Landmark, Award } from "lucide-react";
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
      label: isNp ? "सक्रिय शाखाहरू" : "Active Branches",
    },
    {
      icon: Users,
      value: "100000+",
      label: isNp ? "सन्तुष्ट ग्राहक" : "Happy Customers",
    },
    {
      icon: Award,
      value: "17+",
      label: isNp ? "वर्षको विरासत" : "Years of Legacy",
    },
    {
      icon: ShieldCheck,
      value: "NRB",
      label: isNp ? "इजाजतपत्र प्राप्त" : "Licensed by NRB",
    },
  ];

  return (
    <section className="relative z-10 -mt-10 pb-4">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-brand md:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            const numeric = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
            const isNumeric = !isNaN(numeric) && s.value !== "NRB";
            return (
              <div key={s.label} className="flex items-center gap-3 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-heading text-xl font-extrabold text-gray-900">
                    {isNumeric ? <CountUp target={numeric} suffix="+" /> : s.value}
                  </div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

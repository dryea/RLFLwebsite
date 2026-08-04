"use client";

import Link from "next/link";
import { Calculator, Scale, MapPin, FileText, UserPlus, PhoneCall } from "lucide-react";

interface HeroQuickActionsProps {
  lang: string;
}

export default function HeroQuickActions({ lang }: HeroQuickActionsProps) {
  const isNp = lang === "np";

  const actions = [
    {
      icon: UserPlus,
      label: isNp ? "खाता खोल्नुहोस्" : "Open Account",
      href: "/products/savings",
      desc: isNp ? "बचत वा मुद्दती" : "Savings or FD",
      highlight: true,
    },
    {
      icon: Calculator,
      label: isNp ? "EMI क्याल्कुलेटर" : "EMI Calculator",
      href: "/emi-calculator",
      desc: isNp ? "किस्ता अनुमान" : "Estimate instalments",
    },
    {
      icon: Scale,
      label: isNp ? "उत्पादन तुलना" : "Compare",
      href: "/products/compare",
      desc: isNp ? "खाताहरू तुलना" : "Compare products",
    },
    {
      icon: MapPin,
      label: isNp ? "शाखा खोज्नुहोस्" : "Find Branch",
      href: "/branches",
      desc: isNp ? "नजिकको शाखा" : "Nearest branch",
    },
    {
      icon: PhoneCall,
      label: isNp ? "ऋण सोधपुछ" : "Loan Enquiry",
      href: "/loan-enquiry",
      desc: isNp ? "तुरुन्त आवेदन" : "Instant application",
    },
  ];

  return (
    <div className="container-page">
      <div className="flex flex-wrap gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.href}
              href={a.href}
              className={`group flex items-center gap-3 rounded-xl px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
                a.highlight
                  ? "bg-secondary-500 text-gray-900 shadow-lg hover:bg-secondary-400"
                  : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-left">
                <span className="block text-sm font-semibold leading-tight">{a.label}</span>
                <span className={`block text-[11px] ${a.highlight ? "text-gray-700" : "text-white/70"}`}>{a.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

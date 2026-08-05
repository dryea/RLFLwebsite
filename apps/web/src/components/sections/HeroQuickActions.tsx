"use client";

import Link from "next/link";
import { Calculator, TrendingUp, MapPin, UserPlus, PhoneCall } from "lucide-react";
import { localize } from "@/lib/localize";

interface HeroQuickActionsProps {
  lang: string;
}

export default function HeroQuickActions({ lang }: HeroQuickActionsProps) {
  const isNp = lang === "np";

  const actions = [
    {
      icon: UserPlus,
      label: isNp ? "खाता खोल्नुहोस्" : "Open Account",
      href: localize("/open-account", lang),
      desc: isNp ? "बचत वा मुद्दती" : "Savings or FD",
      highlight: true,
    },
    {
      icon: Calculator,
      label: isNp ? "EMI क्याल्कुलेटर" : "EMI Calculator",
      href: localize("/emi-calculator", lang),
      desc: isNp ? "किस्ता अनुमान" : "Estimate your EMI",
    },
    {
      icon: TrendingUp,
      label: isNp ? "ब्याज दरहरू" : "Interest Rates",
      href: localize("/rates", lang),
      desc: isNp ? "नवीनतम दरहरू" : "Live rate updates",
    },
    {
      icon: MapPin,
      label: isNp ? "शाखा खोज्नुहोस्" : "Find Branch",
      href: localize("/branches", lang),
      desc: isNp ? "नजिकको शाखा" : "Nearest location",
    },
    {
      icon: PhoneCall,
      label: isNp ? "ऋण सोधपुछ" : "Loan Enquiry",
      href: localize("/loan-enquiry", lang),
      desc: isNp ? "तुरुन्त आवेदन" : "Apply instantly",
    },
  ];

  return (
    <>
      {/* Horizontal scroll on mobile, centered flex on desktop */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-visible">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.href}
              href={a.href}
              className={`group flex flex-shrink-0 items-center gap-3 rounded-2xl px-5 py-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                a.highlight
                  ? "bg-secondary-500 text-gray-900 shadow-md hover:bg-secondary-400"
                  : "border border-white/25 bg-white/12 text-white hover:bg-white/22"
              }`}
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                  a.highlight ? "bg-gray-900/15" : "bg-white/15"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight">{a.label}</span>
                <span
                  className={`block text-[11px] leading-tight ${
                    a.highlight ? "text-gray-700" : "text-white/65"
                  }`}
                >
                  {a.desc}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, MapPin, UserPlus, PhoneCall, ArrowRight } from "lucide-react";
import { localize } from "@/lib/localize";

interface QuickAction {
  id: number;
  label: string;
  labelNp?: string;
  description?: string;
  descriptionNp?: string;
  href: string;
  icon?: string;
  isHighlight?: boolean;
}

interface HeroQuickActionsProps {
  lang: string;
  actions?: QuickAction[];
}

const iconMap: Record<string, React.ElementType> = {
  "user-plus": UserPlus,
  calculator: Calculator,
  "trending-up": TrendingUp,
  "map-pin": MapPin,
  "phone-call": PhoneCall,
  arrow: ArrowRight,
};

const defaultActions = [
  { id: 1, label: "Open Account", labelNp: "खाता खोल्नुहोस्", href: "/open-account", description: "Savings or FD", descriptionNp: "बचत वा मुद्दती", icon: "user-plus", isHighlight: true },
  { id: 2, label: "EMI Calculator", labelNp: "EMI क्याल्कुलेटर", href: "/emi-calculator", description: "Estimate your EMI", descriptionNp: "किस्ता अनुमान", icon: "calculator" },
  { id: 3, label: "Interest Rates", labelNp: "ब्याज दरहरू", href: "/rates", description: "Live rate updates", descriptionNp: "नवीनतम दरहरू", icon: "trending-up" },
  { id: 4, label: "Find Branch", labelNp: "शाखा खोज्नुहोस्", href: "/branches", description: "Nearest location", descriptionNp: "नजिकको शाखा", icon: "map-pin" },
  { id: 5, label: "Loan Enquiry", labelNp: "ऋण सोधपुछ", href: "/loan-enquiry", description: "Apply instantly", descriptionNp: "तुरुन्त आवेदन", icon: "phone-call" },
];

export default function HeroQuickActions({ lang, actions }: HeroQuickActionsProps) {
  const isNp = lang === "np";
  const list = actions && actions.length > 0 ? actions : defaultActions;

  return (
    <>
      {/* Staggered entrance for quick actions */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-visible">
        {list.map((a, i) => {
          const Icon = a.icon ? iconMap[a.icon] || UserPlus : UserPlus;
          const label = isNp && a.labelNp ? a.labelNp : a.label;
          const desc = isNp && a.descriptionNp ? a.descriptionNp : a.description;
          const href = localize(a.href || "#", lang);
          return (
            <motion.div
              key={a.id ?? i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-shrink-0"
            >
              <Link
                href={href}
                className={`group flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  a.isHighlight
                    ? "bg-secondary-500 text-gray-900 hover:bg-secondary-400"
                    : "border border-gray-200 bg-white text-gray-800 hover:border-primary-200 hover:bg-primary-50/50"
                }`}
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    a.isHighlight ? "bg-gray-900/15" : "bg-primary-100 text-primary-700"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold leading-tight">{label}</span>
                  <span className={`block text-[11px] leading-tight ${a.isHighlight ? "text-gray-700" : "text-gray-500"}`}>
                    {desc}
                  </span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

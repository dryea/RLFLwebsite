"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Wallet, HandCoins, Smartphone, Handshake } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";
import SavingsWidget from "./widgets/SavingsWidget";
import EMIWidget from "./widgets/EMIWidget";
import DigitalTabsWidget from "./widgets/DigitalTabsWidget";
import BranchWidget from "./widgets/BranchWidget";

interface OfferingLink {
  label: string;
  labelNp?: string;
  url: string;
}

interface OfferingCard {
  id: number;
  title: string;
  titleNp?: string;
  summary: string;
  summaryNp?: string;
  icon: string;
  badge?: string;
  badgeNp?: string;
  linkText: string;
  linkUrl: string;
  widgetType: string;
  links: OfferingLink[];
}

const iconMap: Record<string, React.ElementType> = {
  Wallet, HandCoins, Smartphone, Handshake,
};

const defaultCards: OfferingCard[] = [
  {
    id: 1, title: "Deposits & Savings", titleNp: "निक्षेप र बचत",
    summary: "Maximize interest gains with our range of savings accounts and secure high-yield fixed deposit schemes.",
    summaryNp: "सबैको लागि तयार पारिएको बचत खाता र उच्च ब्याजदरको मुद्दती निक्षेप योजनाहरू।",
    icon: "Wallet", badge: "14+ Options", badgeNp: "१४+ विकल्प",
    linkText: "Compare Accounts", linkUrl: "/products/savings",
    widgetType: "savings",
    links: [
      { label: "Savings Accounts", url: "/products/savings" },
      { label: "Fixed Deposits", url: "/products/fixed-deposits" },
    ],
  },
  {
    id: 2, title: "Loan Schemes", titleNp: "ऋण योजनाहरू",
    summary: "Fuel personal milestones with low-interest Home, Auto, Business, and Agricultural credit lines.",
    summaryNp: "कम ब्याजदरको घर, सवारी, व्यवसाय र कृषि ऋण।",
    icon: "HandCoins", badge: "9 Credit Lines", badgeNp: "९ ऋण प्रकार",
    linkText: "Explore Credit Options", linkUrl: "/products/loans",
    widgetType: "loan",
    links: [
      { label: "Home & Land Loans", url: "/products/loans/home-loan" },
      { label: "Business & SME Credits", url: "/products/loans/business-loan" },
    ],
  },
  {
    id: 3, title: "Digital Channels", titleNp: "डिजिटल च्यानलहरू",
    summary: "Manage accounts securely with mobile wallets, Fonepay QR scanning, and online remittance portals.",
    summaryNp: "मोबाइल वालेट, फोनपे QR स्क्यानिङ र अनलाइन रेमिट्यान्स सेवाहरू।",
    icon: "Smartphone", badge: "24/7 Access", badgeNp: "२४/७ पहुँच",
    linkText: "Explore Services", linkUrl: "/services",
    widgetType: "digital",
    links: [
      { label: "Smart Mobile Banking", url: "/services/mobile-banking" },
      { label: "connectIPS Transfers", url: "/services/connect-ips" },
    ],
  },
  {
    id: 4, title: "Offers & Network", titleNp: "अफर र नेटवर्क",
    summary: "Find branches nationwide and enjoy merchant partner discounts exclusively for RFL card holders.",
    summaryNp: "देशभरका शाखाहरू र RFL कार्डधारकहरूको लागि विशेष छुटहरू।",
    icon: "Handshake", badge: "21 Branches", badgeNp: "२१ शाखाहरू",
    linkText: "Locate Branches", linkUrl: "/branches",
    widgetType: "branch",
    links: [
      { label: "Merchant Discounts", url: "/merchant-offers" },
      { label: "Our Network", url: "/our-network" },
    ],
  },
];

export default function OfferingsGrid({ offerings, lang }: { offerings: OfferingCard[]; lang: string }) {
  const cards = offerings.length >= 4 ? offerings : defaultCards;
  const isNp = lang === "np";

  return (
    <div>
      {/* Section header — left aligned, distinct from centered pattern */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-secondary-600">
            {isNp ? "हाम्रा सेवाहरू" : "What We Offer"}
          </span>
          <h2 className="text-3xl font-bold text-primary-800 md:text-4xl">
            {isNp ? "हाम्रा मुख्य सेवाहरू" : "Our Core Offerings"}
          </h2>
        </div>
        <span className="hidden rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600 sm:block">
          {isNp ? `${cards.length} उत्पाद श्रेणीहरू` : `${cards.length} Product Categories`}
        </span>
      </div>

      <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = iconMap[card.icon] || Wallet;
          return (
            <StaggerItem key={card.id} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl">
                {/* Hover gradient fill */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(145deg, #faf5fc, #ffffff)" }} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 transition-all duration-300 group-hover:bg-primary-500">
                    <Icon className="h-7 w-7 text-primary-500 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="mb-3 flex items-center justify-between font-heading text-lg font-bold text-primary-700">
                    {isNp && card.titleNp ? card.titleNp : card.title}
                    {card.badge && (
                      <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-[0.7rem] font-bold text-gray-600">
                        {isNp && card.badgeNp ? card.badgeNp : card.badge}
                      </span>
                    )}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {isNp && card.summaryNp ? card.summaryNp : card.summary}
                  </p>

                  <ul className="mb-4 flex flex-col gap-2">
                    {card.links.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.url}
                          className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {link.label}
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Widgets */}
                  {card.widgetType === "savings" && <SavingsWidget />}
                  {card.widgetType === "loan" && <EMIWidget />}
                  {card.widgetType === "digital" && <DigitalTabsWidget />}
                  {card.widgetType === "branch" && <BranchWidget />}

                  <Link
                    href={card.linkUrl}
                    className="btn btn-primary mt-auto w-full text-center"
                  >
                    {card.linkText}
                  </Link>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </div>
  );
}

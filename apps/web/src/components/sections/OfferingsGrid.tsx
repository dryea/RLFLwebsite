"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Wallet, HandCoins, Smartphone, Handshake } from "lucide-react";

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

function SavingsWidget() {
  const [product, setProduct] = useState("normal");
  const rates: Record<string, string> = {
    normal: "4.25% p.a. | Min Bal: NPR 100",
    everest: "5.50% p.a. | Min Bal: NPR 20,000",
    student: "4.75% p.a. | Min Bal: NPR 500",
    gold: "5.75% p.a. | Min Bal: NPR 50,000",
    "individual-fd": "Up to 6.25% p.a. | Min: NPR 10,000",
  };

  return (
    <div className="service-mini-widget rounded-lg bg-gray-50 p-3 mb-5 border border-gray-100">
      <div className="widget-title flex items-center justify-between mb-2">
        <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-gray-400">Yield & Min Balance</span>
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-green-500 animate-pulse" />
      </div>
      <select
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="widget-control-select w-full rounded border border-gray-200 px-2 py-1.5 text-xs bg-white mb-2 focus:border-primary-500 focus:outline-none"
      >
        <option value="normal">Normal Saving</option>
        <option value="everest">Everest Saving</option>
        <option value="student">Student Saving</option>
        <option value="gold">Gold Saving</option>
        <option value="individual-fd">Individual Fixed Deposit</option>
      </select>
      <div className="widget-result-panel rounded border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-500 text-center">
        {rates[product]}
      </div>
    </div>
  );
}

function EMIWidget() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const mr = rate / 12 / 100;
  const payments = 60;
  const emi = mr > 0 ? Math.round(amount * mr * Math.pow(1 + mr, payments) / (Math.pow(1 + mr, payments) - 1)) : Math.round(amount / payments);

  return (
    <div className="service-mini-widget rounded-lg bg-gray-50 p-3 mb-5 border border-gray-100">
      <div className="widget-title flex items-center justify-between mb-2">
        <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-gray-400">EMI Estimator (5 Yrs)</span>
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="flex gap-1 mb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="widget-control-input flex-[1.2] rounded border border-gray-200 px-2 py-1.5 text-xs bg-white focus:border-primary-500 focus:outline-none"
          min={50000}
          step={50000}
        />
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="widget-control-select flex-[0.8] rounded border border-gray-200 px-2 py-1.5 text-xs bg-white focus:border-primary-500 focus:outline-none"
        >
          <option value={9.5}>Home (9.5%)</option>
          <option value={10.0}>Auto (10.0%)</option>
          <option value={11.0}>Business (11.0%)</option>
        </select>
      </div>
      <div className="widget-result-panel rounded border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-500 text-center">
        Est. Monthly: NPR {emi.toLocaleString()}
      </div>
    </div>
  );
}

function DigitalTabsWidget() {
  const [tab, setTab] = useState("mobile");
  const features: Record<string, string> = {
    mobile: "✓ Fonepay QR ✓ Bills ✓ Real-time Pay",
    ips: "✓ Direct Bank Trf ✓ Govt Taxes ✓ High Limit",
    qr: "✓ Cashless Teller ✓ Scan-to-Pay ✓ Free Setup",
  };

  return (
    <div className="service-mini-widget rounded-lg bg-gray-50 p-3 mb-5 border border-gray-100">
      <div className="widget-title flex items-center justify-between mb-2">
        <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-gray-400">Feature Benefits</span>
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="widget-tabs flex gap-1 mb-2">
        <button onClick={() => setTab("mobile")} className={`widget-tab-btn flex-1 rounded border px-1 py-1 text-[0.7rem] font-bold transition-colors ${tab === "mobile" ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}>Mobile</button>
        <button onClick={() => setTab("ips")} className={`widget-tab-btn flex-1 rounded border px-1 py-1 text-[0.7rem] font-bold transition-colors ${tab === "ips" ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}>connectIPS</button>
        <button onClick={() => setTab("qr")} className={`widget-tab-btn flex-1 rounded border px-1 py-1 text-[0.7rem] font-bold transition-colors ${tab === "qr" ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}>QR Pay</button>
      </div>
      <div className="widget-result-panel rounded border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-500 text-center">
        {features[tab]}
      </div>
    </div>
  );
}

function BranchWidget() {
  const [branch, setBranch] = useState("kamaladi");
  const contacts: Record<string, string> = {
    kamaladi: "Tel: +977-01-5361104 / 5323117",
    butwal: "Tel: +977-071-550992 / 550993",
    pokhara: "Tel: +977-061-538188 / 538189",
    kohalpur: "Tel: +977-081-542131 / 542132",
  };

  return (
    <div className="service-mini-widget rounded-lg bg-gray-50 p-3 mb-5 border border-gray-100">
      <div className="widget-title flex items-center justify-between mb-2">
        <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-gray-400">Quick Hub Directory</span>
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-green-500 animate-pulse" />
      </div>
      <select
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="widget-control-select w-full rounded border border-gray-200 px-2 py-1.5 text-xs bg-white mb-2 focus:border-primary-500 focus:outline-none"
      >
        <option value="kamaladi">Kamaladi H.O. (Kathmandu)</option>
        <option value="butwal">Butwal Branch (Lumbini)</option>
        <option value="pokhara">Pokhara Branch (Gandaki)</option>
        <option value="kohalpur">Kohalpur Branch (Banke)</option>
      </select>
      <div className="widget-result-panel rounded border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-500 text-center">
        {contacts[branch]}
      </div>
    </div>
  );
}

const defaultCards: OfferingCard[] = [
  {
    id: 1, title: "Deposits & Savings", titleNp: "निक्षेप र बचत",
    summary: "Maximize interest gains with our range of savings accounts and secure high-yield fixed deposit schemes tailored for everyone.",
    summaryNp: "सबैको लागि तयार पारिएको बचत खाता र उच्च ब्याजदरको मुद्दती निक्षेप योजनाहरू",
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
    summary: "Fuel personal milestones or corporate expansions with low-interest Home, Auto, Business, and Agricultural credit lines.",
    summaryNp: "व्यक्तिगत लक्ष्य र व्यावसायिक विस्तारको लागि कम ब्याजदरको घर, सवारी, व्यवसाय र कृषि ऋण",
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
    summary: "Manage accounts securely with modern mobile wallets, Fonepay QR scanning, and online inward remittance settlement portals.",
    summaryNp: "आधुनिक मोबाइल वालेट, फोनपे QR स्क्यानिङ र अनलाइन रेमिट्यान्स सेवाहरू",
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
    summary: "Find branches nationwide and enjoy merchant partner outlets offering exclusive discounts for RFL card holders.",
    summaryNp: "देशभरका शाखाहरू र RFL कार्डधारकहरूको लागि विशेष छुटहरू",
    icon: "Handshake", badge: "21 Branches", badgeNp: "२१ शाखाहरू",
    linkText: "Locate Branches", linkUrl: "/branches",
    widgetType: "branch",
    links: [
      { label: "Merchant Discounts", url: "/branches" },
      { label: "Clearing & Tieups", url: "/branches" },
    ],
  },
];

export default function OfferingsGrid({ offerings, lang }: { offerings: OfferingCard[]; lang: string }) {
  const cards = offerings.length >= 4 ? offerings : defaultCards;

  return (
    <div className="service-grid grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.icon] || Wallet;
        return (
          <div
            key={card.id}
            className="service-card group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg"
          >
            <div className="service-card-icon-wrapper mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-primary-50 transition-all duration-300 group-hover:bg-secondary-500">
              <Icon className="h-7 w-7 text-primary-500 transition-all duration-300 group-hover:text-white" />
            </div>

            <h3 className="mb-3 font-heading text-xl font-extrabold text-primary-500 flex items-center justify-between">
              {lang === "np" && card.titleNp ? card.titleNp : card.title}
              {card.badge && (
                <span className="service-card-counter ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[0.75rem] font-bold text-gray-500">
                  {lang === "np" && card.badgeNp ? card.badgeNp : card.badge}
                </span>
              )}
            </h3>

            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              {lang === "np" && card.summaryNp ? card.summaryNp : card.summary}
            </p>

            <ul className="service-links-list mb-5 flex flex-col gap-2">
              {card.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.url} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500 hover:border-primary-500/20">
                    {link.label}
                    <ChevronRight className="h-3 w-3 text-secondary-500 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>

            {card.widgetType === "savings" && <SavingsWidget />}
            {card.widgetType === "loan" && <EMIWidget />}
            {card.widgetType === "digital" && <DigitalTabsWidget />}
            {card.widgetType === "branch" && <BranchWidget />}

            <Link href={card.linkUrl} className="btn btn-primary service-card-cta mt-auto w-full text-center font-bold">
              {card.linkText}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

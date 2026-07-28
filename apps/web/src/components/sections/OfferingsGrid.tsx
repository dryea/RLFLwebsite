"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Book, Images, Calculator, HelpCircle,
  ChevronRight, TrendingUp, IndianRupee, Smartphone, MapPin,
} from "lucide-react";

interface OfferingLink {
  label: string;
  labelNp?: string;
  href: string;
}

interface Offering {
  id: number;
  title: string;
  titleNp?: string;
  description: string;
  descriptionNp?: string;
  icon: string;
  links: OfferingLink[];
  badge: string;
  badgeNp?: string;
  ctaText?: string;
  ctaTextNp?: string;
  ctaLink?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Book, Images, Calculator, HelpCircle,
};

function SavingsWidget() {
  const [amount, setAmount] = useState(100000);
  const rate = 8.5;
  const interest = Math.round(amount * rate / 100);
  return (
    <div className="mt-3 rounded-lg bg-purple-50/50 p-3">
      <div className="mb-1 flex items-center gap-1 text-xs font-medium text-primary-700">
        <TrendingUp className="h-3 w-3" />
        <span>Savings Yield @ {rate}% p.a.</span>
      </div>
      <div className="flex items-center gap-2">
        <IndianRupee className="h-4 w-4 text-primary-500" />
        <input
          type="range"
          min={10000}
          max={10000000}
          step={10000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-secondary-500"
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>Rs. 10K</span>
        <span>Rs. 1Cr</span>
      </div>
      <div className="mt-2 rounded bg-white px-2 py-1.5 text-center text-sm font-semibold text-primary-700">
        Annual Interest: Rs. {interest.toLocaleString()}
      </div>
    </div>
  );
}

function EMIWidget() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);
  const mr = rate / 12 / 100;
  const emi = Math.round(amount * mr * Math.pow(1 + mr, tenure) / (Math.pow(1 + mr, tenure) - 1));
  return (
    <div className="mt-3 rounded-lg bg-purple-50/50 p-3">
      <div className="mb-1 flex items-center gap-1 text-xs font-medium text-primary-700">
        <IndianRupee className="h-3 w-3" />
        <span>Quick EMI</span>
      </div>
      <div className="mb-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Loan</span>
          <span className="font-medium text-primary-700">Rs. {(amount / 100000).toFixed(1)}L</span>
        </div>
        <input type="range" min={100000} max={10000000} step={50000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-secondary-500" />
      </div>
      <div className="mb-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Rate</span>
          <span className="font-medium text-primary-700">{rate}%</span>
        </div>
        <input type="range" min={5} max={25} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-secondary-500" />
      </div>
      <div className="mb-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Tenure</span>
          <span className="font-medium text-primary-700">{tenure}m</span>
        </div>
        <input type="range" min={6} max={360} step={6} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-secondary-500" />
      </div>
      <div className="mt-2 rounded bg-white px-2 py-1.5 text-center text-sm font-semibold text-primary-700">
        EMI: Rs. {emi.toLocaleString()}/mo
      </div>
    </div>
  );
}

function DigitalTabsWidget({ lang }: { lang: string }) {
  const [tab, setTab] = useState<"news" | "events">("news");
  const items = {
    news: [
      { title: "Reliance Finance announces Q3 results", date: "2025-03-15" },
      { title: "New branch opening in Pokhara", date: "2025-02-28" },
      { title: "Digital banking service expansion", date: "2025-02-10" },
    ],
    events: [
      { title: "Annual General Meeting 2025", date: "2025-04-20" },
      { title: "Financial Literacy Workshop", date: "2025-03-25" },
      { title: "CSR Health Camp in Bardiya", date: "2025-03-05" },
    ],
  };
  return (
    <div className="mt-3 rounded-lg bg-purple-50/50 p-3">
      <div className="mb-2 flex gap-1">
        <button
          onClick={() => setTab("news")}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors ${tab === "news" ? "bg-primary-500 text-white" : "bg-white text-gray-600 hover:bg-primary-100"}`}
        >
          {lang === "en" ? "News" : "समाचार"}
        </button>
        <button
          onClick={() => setTab("events")}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors ${tab === "events" ? "bg-primary-500 text-white" : "bg-white text-gray-600 hover:bg-primary-100"}`}
        >
          {lang === "en" ? "Events" : "कार्यक्रम"}
        </button>
      </div>
      <ul className="space-y-1.5">
        {items[tab].map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
            <span>
              <span className="font-medium text-gray-800">{item.title}</span>
              <span className="ml-2 text-gray-400">{item.date}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BranchWidget({ lang }: { lang: string }) {
  const [province, setProvince] = useState("3");
  const branches: Record<string, { name: string; address: string }[]> = {
    "1": [{ name: "Biratnagar", address: "Morang" }, { name: "Damak", address: "Jhapa" }],
    "2": [{ name: "Janakpur", address: "Dhanusha" }, { name: "Birgunj", address: "Parsa" }],
    "3": [{ name: "Kamaladi", address: "Kathmandu (HO)" }, { name: "Baneshwor", address: "Kathmandu" }, { name: "Lalitpur", address: "Lalitpur" }, { name: "Bharatpur", address: "Chitwan" }],
    "4": [{ name: "Pokhara", address: "Kaski" }],
    "5": [{ name: "Butwal", address: "Rupandehi" }, { name: "Nepalgunj", address: "Banke" }],
    "6": [{ name: "Surkhet", address: "Surkhet" }],
    "7": [{ name: "Dhangadhi", address: "Kailali" }, { name: "Mahendranagar", address: "Kanchanpur" }],
  };
  const selected = branches[province] || [];
  return (
    <div className="mt-3 rounded-lg bg-purple-50/50 p-3">
      <div className="mb-1 flex items-center gap-1 text-xs font-medium text-primary-700">
        <MapPin className="h-3 w-3" />
        <span>{lang === "en" ? "Find a Branch" : "शाखा खोज्नुहोस्"}</span>
      </div>
      <select
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="mb-2 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:border-secondary-500 focus:outline-none"
      >
        <option value="1">Province 1</option>
        <option value="2">Province 2</option>
        <option value="3">Bagmati</option>
        <option value="4">Gandaki</option>
        <option value="5">Lumbini</option>
        <option value="6">Karnali</option>
        <option value="7">Sudurpashchim</option>
      </select>
      <ul className="space-y-1">
        {selected.map((b, i) => (
          <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {b.name}
            <span className="text-gray-400">({b.address})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OfferingsGrid({ offerings, lang }: { offerings: Offering[]; lang: string }) {
  const defaultOfferings: Offering[] = [
    {
      id: 1, title: "Report", titleNp: "प्रतिवेदन",
      description: "View our Annual, Quarterly and other Reports",
      descriptionNp: "हाम्रो वार्षिक, त्रैमासिक र अन्य प्रतिवेदनहरू हेर्नुहोस्",
      icon: "Book", badge: "01", badgeNp: "१",
      links: [
        { label: "Annual Report", href: "/publications/reports/annual-report" },
        { label: "Quarterly Report", href: "/publications/reports/quarterly-reports" },
        { label: "Basel II Disclosure", href: "/publications/reports/basel-ii-disclosure" },
      ],
      ctaText: "Explore Reports", ctaLink: "/publications",
    },
    {
      id: 2, title: "Media", titleNp: "मिडिया",
      description: "Connect with us for Latest News, Events and Gallery",
      descriptionNp: "पछिल्लो समाचार, कार्यक्रम र ग्यालरीको लागि हामीसँग जोडिनुहोस्",
      icon: "Images", badge: "02", badgeNp: "२",
      links: [
        { label: "News", href: "/publications/news" },
        { label: "Events", href: "/publications/events" },
        { label: "Gallery", href: "/gallery" },
      ],
      ctaText: "View Media", ctaLink: "/publications",
    },
    {
      id: 3, title: "Rates", titleNp: "दरहरू",
      description: "Find out Interest and Other Rates and EMI Calculator",
      descriptionNp: "ब्याज र अन्य दरहरू र EMI क्याल्कुलेटर पत्ता लगाउनुहोस्",
      icon: "Calculator", badge: "03", badgeNp: "३",
      links: [
        { label: "Interest Rates", href: "/rates/interest-rates" },
        { label: "Base Rate / Spread Rate", href: "/rates/base-rate-spread-rate" },
      ],
      ctaText: "View Rates", ctaLink: "/rates",
    },
    {
      id: 4, title: "EMI Calculator", titleNp: "EMI क्याल्कुलेटर",
      description: "Calculate your EMI easily",
      descriptionNp: "सजिलै आफ्नो EMI गणना गर्नुहोस्",
      icon: "HelpCircle", badge: "04", badgeNp: "४",
      links: [
        { label: "Calculate EMI", href: "/emi-calculator" },
      ],
      ctaText: "Calculate Now", ctaLink: "/emi-calculator",
    },
  ];

  const data = offerings.length ? offerings : defaultOfferings;

  const widgetMap: Record<number, React.ReactNode> = {
    1: <SavingsWidget />,
    2: <DigitalTabsWidget lang={lang} />,
    3: <BranchWidget lang={lang} />,
    4: <EMIWidget />,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.map((offering) => {
        const Icon = iconMap[offering.icon] || HelpCircle;
        return (
          <div
            key={offering.id}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-t-primary-500"
            style={{ borderTop: "3px solid transparent" }}
            onMouseEnter={(e) => e.currentTarget.style.borderTop = "3px solid #702B86"}
            onMouseLeave={(e) => e.currentTarget.style.borderTop = "3px solid transparent"}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-secondary-500 group-hover:text-white">
                <Icon className="h-7 w-7" />
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                {lang === "np" && offering.badgeNp ? offering.badgeNp : offering.badge}
              </span>
            </div>

            <h3 className="mb-1 font-heading text-lg font-bold text-gray-900">
              {lang === "np" && offering.titleNp ? offering.titleNp : offering.title}
            </h3>
            <p className="mb-3 text-sm text-gray-500">
              {lang === "np" && offering.descriptionNp ? offering.descriptionNp : offering.description}
            </p>

            <ul className="mb-3 space-y-1.5">
              {offering.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 transition-colors hover:text-secondary-600">
                    <ChevronRight className="h-3 w-3" />
                    {lang === "np" && link.labelNp ? link.labelNp : link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {widgetMap[offering.id]}

            {offering.ctaText && (
              <div className="mt-4">
                <Link
                  href={offering.ctaLink || "#"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:-translate-y-0.5"
                >
                  {lang === "np" && offering.ctaTextNp ? offering.ctaTextNp : offering.ctaText}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

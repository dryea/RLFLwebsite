"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Inbox,
  Apple,
  UserPlus,
  MessageSquare,
  Calculator,
  Percent,
  ChevronRight,
  ShieldCheck,
  Award,
  Landmark,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import {
  footerColumns,
  footerAboutLinks,
  footerServices,
  footerContact,
  socialLinks,
} from "@/lib/navigation";
import { localize } from "@/lib/localize";
import NewsletterForm from "@/components/shared/NewsletterForm";

const socialIconPaths: Record<string, string> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15V9l6 3-6 3z",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm-5 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm5-9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  viber: "M15.9 2.4C11.7 1.6 7.9 2.1 4.9 4.5c-1.9 1.5-3 3.6-3.3 6.1-.3 2.4.3 4.8 1.6 6.7v.2l-.5 3.6c0 .2.1.3.3.3.1 0 .2-.1.3-.1l2.9-1.7h.1c1.6.6 3.3.9 4.9.9 1.3 0 2.6-.2 3.9-.5 2.8-.8 5.2-2.4 6.9-4.6 1.8-2.3 2.6-5.2 2.1-8-.4-2.8-1.8-4.9-4.2-6.3-.7-.4-1.5-.7-2.5-.9z",
};

export default function Footer() {
  const lang = useLang();
  const c = footerContact;
  const isNp = lang === "np";
  const [selectedBranch, setSelectedBranch] = useState("kamaladi");

  const branchContacts: Record<string, string> = {
    kamaladi: "+977-01-5361104 (Head Office)",
    butwal: "+977-071-550992 (Lumbini)",
    pokhara: "+977-061-538188 (Gandaki)",
    kohalpur: "+977-081-542131 (Banke)",
  };

  return (
    <footer className="relative z-10 overflow-hidden">
      {/* Pre-footer Interactive Tools & Banking CTA Strip */}
      <div className="border-t border-primary-800 bg-gradient-to-r from-primary-950 via-primary-900 to-[#071829] text-white">
        <div className="container-page py-8">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Tool 1: Branch Quick Locator */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-500 text-slate-950 font-bold shadow">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "शाखा खोज्नुहोस्" : "Quick Branch Locator"}
                </p>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/20 bg-slate-900 px-2.5 py-1 text-xs text-white outline-none focus:border-secondary-400"
                >
                  <option value="kamaladi">Kamaladi H.O. (Kathmandu)</option>
                  <option value="butwal">Butwal (Lumbini)</option>
                  <option value="pokhara">Pokhara (Gandaki)</option>
                  <option value="kohalpur">Kohalpur (Banke)</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-300 font-medium">{branchContacts[selectedBranch]}</p>
              </div>
            </div>

            {/* Tool 2: Rate Quick Check */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-500 text-slate-950 font-bold shadow">
                <Percent className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "नवीनतम दरहरू" : "Interest Rate Highlights"}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-200">
                  <span>Individual FD: <strong>Up to 6.25%</strong></span>
                  <span>Saving: <strong>Up to 5.75%</strong></span>
                </div>
                <Link
                  href={localize("/rates", lang)}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-secondary-400 hover:text-white transition-colors"
                >
                  View All Interest Schedules <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Tool 3: Instant Support & Online Application */}
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15 shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "तत्काल सहायता" : "Instant Banking Access"}
                </p>
                <p className="mt-1 text-xs text-slate-200">Toll-Free: <strong>1810-5000-417</strong></p>
              </div>
              <Link
                href={localize("/open-account", lang)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-secondary-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow transition-all hover:bg-secondary-400 hover:scale-105"
              >
                <UserPlus className="h-4 w-4" />
                {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-gradient-to-b from-[#071829] via-[#05111f] to-[#020912] text-slate-400">
        <div className="container-page py-12">
          {/* Logo & NRB Class-C Disclosure */}
          <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <img src="/assets/logo.png" alt="Reliance Finance Limited" className="mb-3 h-10 brightness-0 invert" />
              <p className="max-w-md text-xs leading-relaxed text-slate-400">
                {isNp
                  ? "नेपाल राष्ट्र बैंकद्वारा नियन्त्रित 'ग' वर्गको इजाजतपत्र प्राप्त वित्तीय संस्था। वि.सं. २०६६ देखि सेवामा निरन्तर।"
                  : "A licensed Class C financial institution regulated by Nepal Rastra Bank. Incorporated in B.S. 2066 to provide trusted retail & commercial banking."}
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition-all hover:bg-primary-600 hover:text-white hover:-translate-y-0.5"
                  aria-label={s.name}
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
                    <path d={socialIconPaths[s.icon] || ""} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "कम्पनी र सुशासन" : "About & Governance"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href={localize("/about/introduction", lang)} className="hover:text-secondary-400 transition-colors">Introduction</Link></li>
                <li><Link href={localize("/about/mission-goals", lang)} className="hover:text-secondary-400 transition-colors">Mission & Goals</Link></li>
                <li><Link href={localize("/team/board-of-directors", lang)} className="hover:text-secondary-400 transition-colors">Board of Directors</Link></li>
                <li><Link href={localize("/team/management-team", lang)} className="hover:text-secondary-400 transition-colors">Management Team</Link></li>
                <li><Link href={localize("/csr", lang)} className="hover:text-secondary-400 transition-colors">CSR Initiatives</Link></li>
                <li><Link href={localize("/faq", lang)} className="hover:text-secondary-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "उत्पादनहरू" : "Products & Loans"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href={localize("/products/savings", lang)} className="hover:text-secondary-400 transition-colors">Savings Accounts</Link></li>
                <li><Link href={localize("/products/fixed-deposits", lang)} className="hover:text-secondary-400 transition-colors">Fixed Deposits</Link></li>
                <li><Link href={localize("/products/loans/home-loan", lang)} className="hover:text-secondary-400 transition-colors">Home Loans</Link></li>
                <li><Link href={localize("/products/loans/auto-loan", lang)} className="hover:text-secondary-400 transition-colors">Auto Loans</Link></li>
                <li><Link href={localize("/products/loans/business-loan", lang)} className="hover:text-secondary-400 transition-colors">SME & Business Loans</Link></li>
                <li><Link href={localize("/emi-calculator", lang)} className="hover:text-secondary-400 transition-colors">EMI Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "दर र प्रतिवेदन" : "Rates & Reports"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href={localize("/rates", lang)} className="hover:text-secondary-400 transition-colors">Interest Rates</Link></li>
                <li><Link href={localize("/rates/base-rate-spread-rate", lang)} className="hover:text-secondary-400 transition-colors">Base / Spread Rate</Link></li>
                <li><Link href={localize("/rates/forex-rates", lang)} className="hover:text-secondary-400 transition-colors">Forex Exchange</Link></li>
                <li><Link href={localize("/rates/gold-silver", lang)} className="hover:text-secondary-400 transition-colors">Gold & Silver Rates</Link></li>
                <li><Link href={localize("/publications/reports/annual-report", lang)} className="hover:text-secondary-400 transition-colors">Annual Reports</Link></li>
                <li><Link href={localize("/publications/notices/general-notice", lang)} className="hover:text-secondary-400 transition-colors">Notices & Auctions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "डिजिटल सेवाहरू" : "Digital Services"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href={localize("/services/mobile-banking", lang)} className="hover:text-secondary-400 transition-colors">Smart Mobile Banking</Link></li>
                <li><Link href={localize("/services/connect-ips", lang)} className="hover:text-secondary-400 transition-colors">connectIPS Payments</Link></li>
                <li><Link href={localize("/services/corporatepay", lang)} className="hover:text-secondary-400 transition-colors">CORPORATEPAY</Link></li>
                <li><Link href={localize("/services/debit-card", lang)} className="hover:text-secondary-400 transition-colors">Debit Card Services</Link></li>
                <li><Link href={localize("/services/remittance", lang)} className="hover:text-secondary-400 transition-colors">Remittance Services</Link></li>
                <li><Link href={localize("/services/qr-teller", lang)} className="hover:text-secondary-400 transition-colors">QR Teller Counter</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Details & Newsletter Grid */}
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "सम्पर्क ठेगाना" : "Central Contact"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <span>{isNp ? c.address.np : c.address.en}</span>
                </li>
                <li>
                  <a href={`tel:${c.phone}`} className="flex items-center gap-2 transition-colors hover:text-white">
                    <Phone className="h-4 w-4 text-primary-400" />{c.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-primary-400" />
                  <span>PO Box: {c.poBox}</span>
                </li>
                <li>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                    <Mail className="h-4 w-4 text-primary-400" />{c.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "गुनासो र अनुपालन" : "Compliance & Officers"}
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href={localize("/grievance-handling-officer", lang)} className="hover:text-secondary-400 transition-colors">Grievance Handling Officer</Link></li>
                <li><Link href={localize("/compliance-officer", lang)} className="hover:text-secondary-400 transition-colors">Compliance Officer</Link></li>
                <li><Link href={localize("/write-to-us", lang)} className="hover:text-secondary-400 transition-colors">Write to Us / Feedback</Link></li>
                <li><Link href={localize("/beware-of-digital-fraud", lang)} className="hover:text-secondary-400 transition-colors">Beware of Digital Fraud</Link></li>
              </ul>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                {isNp ? "मोबाइल एप डाउनलोड" : "Download Mobile Banking"}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-slate-400">
                {isNp
                  ? "स्मार्ट मोबाइल बैंकिङ, QR भुक्तानी र फण्ड ट्रान्सफरको लागि RFL Smart एप।"
                  : "Enjoy 24/7 mobile banking, instant QR scanning, and bill payments."}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.f1soft.reliancefinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-xs text-white transition-all hover:bg-primary-600 hover:-translate-y-0.5 border border-white/15"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 12.88l-4.463-4.462-2.073 2.074 3.416 3.416-3.416 3.416 2.073 2.074 4.463-4.462a.586.586 0 0 0 0-.826zM5.578 6.443a.61.61 0 0 0-.61.61v9.895a.61.61 0 0 0 .61.61.63.63 0 0 0 .433-.18l4.734-4.734-4.734-4.734a.613.613 0 0 0-.433-.18z" />
                  </svg>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-slate-400">Get it on</span>
                    <strong className="block text-sm">Google Play</strong>
                  </span>
                </a>
                <a
                  href="https://apps.apple.com/np/app/reliance-finance-smart/id1554035637"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-xs text-white transition-all hover:bg-primary-600 hover:-translate-y-0.5 border border-white/15"
                >
                  <Apple className="h-5 w-5 shrink-0" />
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-slate-400">Download on the</span>
                    <strong className="block text-sm">App Store</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure & Copyright Bar */}
        <div className="border-t border-white/10 bg-black/50">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-xs text-slate-500 md:flex-row">
            <div>
              <span>© {new Date().getFullYear()} Reliance Finance Limited. All rights reserved.</span>
            </div>
            <div className="flex gap-5 text-slate-400">
              <Link href={localize("/about/privacy-policy", lang)} className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href={localize("/faq", lang)} className="hover:text-white transition-colors">FAQ</Link>
              <Link href={localize("/sitemap", lang)} className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Inbox,
  UserPlus,
  MessageSquare,
  Calculator,
  Percent,
  ChevronRight,
  ShieldCheck,
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

// Official brand glyphs (Simple Icons, 24x24, fill-based)
const socialIconPaths: Record<string, string> = {
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  twitter: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  viber: "M7.036 1.351c-.751-.03-.858-.047-1.133.016-1.858.413-3.4 2.256-3.413 4.353-.011.662-.011 3.606.004 4.244.041 1.552 1.112 3.071 2.559 3.623 1.646.63 3.059.251 4.026-.958.371-.464.439-.823.439-1.799 0-1.088.013-2.57.032-3.358.011-.482.188-.784.491-.938.296-.151.606-.129 1.106-.019.84.184 2.036.788 2.833 1.433.56.454 1.469 1.426 2.098 2.354 1.483 2.186 1.647 4.092 1.055 5.019-.681 1.064-2.754 1.847-4.558 1.719-.294-.021-.411-.018-.607.03-.268.068-.477.174-.971.633-.501.466-.724.617-1.07.727-.742.234-1.502.169-2.078-.178-.771-.464-1.386-1.284-1.731-2.31-.194-.578-.157-.748-.151-1.465.006-.829-.008-1.813.036-2.595.03-.541.048-.887-.05-1.225-.178-.613-.706-1.276-1.294-1.627-.35-.209-1.604-1.004-2.127-1.348-.593-.39-1.186-.719-1.743-.968-.531-.238-.876-.311-1.437-.288zm11.524 1.198c-1.947.191-3.004 2.589-2.213 5.012.536 1.642 2.183 3.012 3.825 3.18.966.099 1.826-.331 2.143-1.071.347-.812-.028-1.813-.894-2.383-.938-.617-1.82-1.07-2.473-1.718-.616-.611-1.011-1.361-1.116-2.12-.102-.735.001-1.377.148-1.857-.165.279-.342.626-.42.957zM14.064 3.63c-.021-.354-.267-.642-.546-.693-.271-.049-.536.078-.647.318-.118.255-.103.484.032.704.142.231.421.405.644.405.244.001.516-.194.517-.734zm1.583.572c.083.11.083.633.083.745 0 .208-.06.418-.164.581-.474.735-1.302 1.129-2.239 1.065-.694-.047-1.386-.356-1.791-.879-.303-.392-.31-.72-.25-1.166.053-.389.339-.72.732-.847.513-.165 1.006-.11 1.466.175.264.163.461.287.692.374.548.206 1.04.215 1.471-.048z",
};

// Official app-store badge glyphs (24x24, fill-based)
const storeIconPaths = {
  googlePlay: "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11.04 10.974c.298.036.612-.016.946-.177l13.324-7.549-3.23-3.248z",
  apple: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702",
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
    <footer>
      {/* Pre-footer Interactive Tools & CTA Strip */}
      <div className="border-t border-primary-700 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 text-white">
        <div className="container-page py-8">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {/* Tool 1: Branch Quick Finder */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-500 text-gray-900">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "शाखा खोज्नुहोस्" : "Quick Branch Locator"}
                </p>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/20 bg-gray-900 px-2 py-1 text-xs text-white outline-none"
                >
                  <option value="kamaladi">Kamaladi H.O. (Kathmandu)</option>
                  <option value="butwal">Butwal (Lumbini)</option>
                  <option value="pokhara">Pokhara (Gandaki)</option>
                  <option value="kohalpur">Kohalpur (Banke)</option>
                </select>
                <p className="mt-1 text-[11px] text-white/70">{branchContacts[selectedBranch]}</p>
              </div>
            </div>

            {/* Tool 2: Rate Quick Check */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-500 text-gray-900">
                <Percent className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "नवीनतम दरहरू" : "Interest Rate Highlights"}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-white/90">
                  <span>Individual FD: <strong>Up to 6.25%</strong></span>
                  <span>Saving: <strong>Up to 5.75%</strong></span>
                </div>
                <Link
                  href={localize("/rates", lang)}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-secondary-400 hover:text-white"
                >
                  View All Interest Schedules <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Tool 3: Instant Support & Application */}
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">
                  {isNp ? "तत्काल सहायता" : "Instant Banking Access"}
                </p>
                <p className="mt-1 text-xs text-white/80">Toll-Free: <strong>1810-5000-417</strong></p>
              </div>
              <Link
                href={localize("/open-account", lang)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-secondary-500 px-3.5 py-2 text-xs font-bold text-gray-900 shadow transition-transform hover:scale-105"
              >
                <UserPlus className="h-3.5 w-3.5" />
                {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-gradient-to-b from-[#0a0f1d] via-[#060914] to-[#03040a] text-gray-400">
        <div className="container-page py-12">
          {/* Logo & NRB Badge Header */}
          <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <img src="/assets/logo.png" alt="Reliance Finance Limited" className="mb-3 h-10 brightness-0 invert" />
              <p className="max-w-md text-sm leading-relaxed text-gray-400">
                {isNp
                  ? "नेपाल राष्ट्र बैंकद्वारा नियन्त्रित 'ग' वर्गको इजाजतपत्र प्राप्त वित्तीय संस्था। वि.सं. २०६६ देखि सेवामा निरन्तर।"
                  : "A licensed Class C financial institution regulated by Nepal Rastra Bank. Incorporated in B.S. 2066 to provide trusted retail & commercial banking."}
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gray-300 transition-all hover:bg-primary-600 hover:text-white hover:-translate-y-0.5"
                  aria-label={s.name}
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
                    <path d={socialIconPaths[s.icon] || ""} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Structured Link Columns */}
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "कम्पनी र सुशासन" : "About & Governance"}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href={localize("/about/introduction", lang)} className="hover:text-secondary-400 transition-colors">{isNp ? "हामी को हौं" : "Who We Are"}</Link></li>
                <li><Link href={localize("/team/board-of-directors", lang)} className="hover:text-secondary-400 transition-colors">Board of Directors</Link></li>
                <li><Link href={localize("/team/management-team", lang)} className="hover:text-secondary-400 transition-colors">Management Team</Link></li>
                <li><Link href={localize("/team/head-of-department", lang)} className="hover:text-secondary-400 transition-colors">Department Heads</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "उत्पादनहरू" : "Products & Loans"}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href={localize("/products/savings", lang)} className="hover:text-secondary-400 transition-colors">Savings Accounts</Link></li>
                <li><Link href={localize("/products/fixed-deposits", lang)} className="hover:text-secondary-400 transition-colors">Fixed Deposits</Link></li>
                <li><Link href={localize("/products/loans/home-loan", lang)} className="hover:text-secondary-400 transition-colors">Home Loans</Link></li>
                <li><Link href={localize("/products/loans/auto-loan", lang)} className="hover:text-secondary-400 transition-colors">Auto Loans</Link></li>
                <li><Link href={localize("/products/loans/business-loan", lang)} className="hover:text-secondary-400 transition-colors">Business Loans</Link></li>
                <li><Link href={localize("/emi-calculator", lang)} className="hover:text-secondary-400 transition-colors">EMI Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "दर र प्रतिवेदन" : "Rates & Reports"}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href={localize("/rates", lang)} className="hover:text-secondary-400 transition-colors">Interest Rates</Link></li>
                <li><Link href={localize("/rates/base-rate-spread-rate", lang)} className="hover:text-secondary-400 transition-colors">Base / Spread Rate</Link></li>
                <li><Link href={localize("/rates/forex-rates", lang)} className="hover:text-secondary-400 transition-colors">Forex Exchange</Link></li>
                <li><Link href={localize("/rates/gold-silver", lang)} className="hover:text-secondary-400 transition-colors">Gold & Silver Rates</Link></li>
                <li><Link href={localize("/publications/reports/annual-report", lang)} className="hover:text-secondary-400 transition-colors">Annual Reports</Link></li>
                <li><Link href={localize("/publications/notices/general-notice", lang)} className="hover:text-secondary-400 transition-colors">Notices & Auctions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "डिजिटल सेवाहरू" : "Digital Services"}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href={localize("/services/mobile-banking", lang)} className="hover:text-secondary-400 transition-colors">Smart Mobile Banking</Link></li>
                <li><Link href={localize("/services/connect-ips", lang)} className="hover:text-secondary-400 transition-colors">connectIPS Payments</Link></li>
                <li><Link href={localize("/services/corporatepay", lang)} className="hover:text-secondary-400 transition-colors">CORPORATEPAY</Link></li>
                <li><Link href={localize("/services/debit-card", lang)} className="hover:text-secondary-400 transition-colors">Debit Card Services</Link></li>
                <li><Link href={localize("/services/remittance", lang)} className="hover:text-secondary-400 transition-colors">Remittance</Link></li>
                <li><Link href={localize("/services/qr-teller", lang)} className="hover:text-secondary-400 transition-colors">QR Teller Counter</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Details & Newsletter Grid */}
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "सम्पर्क ठेगाना" : "Central Contact"}
              </h3>
              <ul className="space-y-2.5 text-sm">
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
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "गुनासो र अनुपालन" : "Compliance & Officer Details"}
              </h3>
              <ul className="space-y-2.5 text-sm">
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
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                {isNp ? "मोबाइल एप डाउनलोड" : "Download Mobile Banking"}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-400">
                {isNp
                  ? "स्मार्ट मोबाइल बैंकिङ, QR भुक्तानी र फण्ड ट्रान्सफरको लागि RFL Smart एप।"
                  : "Enjoy 24/7 mobile banking, instant QR scanning, and bill payments."}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.f1soft.reliancefinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white transition-all hover:bg-primary-600 hover:-translate-y-0.5 border border-white/15"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={storeIconPaths.googlePlay} />
                  </svg>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-gray-400">Get it on</span>
                    <strong className="block text-sm">Google Play</strong>
                  </span>
                </a>
                <a
                  href="https://apps.apple.com/np/app/reliance-finance-smart/id1554035637"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white transition-all hover:bg-primary-600 hover:-translate-y-0.5 border border-white/15"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={storeIconPaths.apple} />
                  </svg>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-wide text-gray-400">Download on the</span>
                    <strong className="block text-sm">App Store</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure & Copyright Bar */}
        <div className="border-t border-white/10 bg-black/40">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-xs text-gray-500 md:flex-row">
            <div>
              <span>© {new Date().getFullYear()} Reliance Finance Limited. All rights reserved.</span>
            </div>
            <div className="flex gap-5 text-gray-400">
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

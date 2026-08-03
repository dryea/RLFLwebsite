"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import SearchOverlay from "@/components/shared/SearchOverlay";

const navItems = [
  {
    label: { en: "About Us", np: "हाम्रो बारे" },
    href: "/about",
    children: [
      { label: { en: "Introduction", np: "परिचय" }, href: "/about/introduction" },
      { label: { en: "Mission & Goals", np: "लक्ष्य र उद्देश्य" }, href: "/about/mission-goals" },
      { label: { en: "Strategic Framework", np: "रणनीतिक ढाँचा" }, href: "/about/strategic-framework" },
      { label: { en: "Milestones", np: "कोशेढुंगा" }, href: "/about/milestones" },
      { label: { en: "Capital Structure", np: "पुँजी संरचना" }, href: "/about/capital-structure" },
    ],
  },
  {
    label: { en: "Savings", np: "बचत" },
    href: "/products/savings",
    children: [
      { label: { en: "Normal Saving", np: "सामान्य बचत" }, href: "/products/savings/normal-saving-account" },
      { label: { en: "Everest Saving", np: "एभरेष्ट बचत" }, href: "/products/savings/everest-saving-account" },
      { label: { en: "Student Saving", np: "विद्यार्थी बचत" }, href: "/products/savings/student-saving-account" },
      { label: { en: "Gold Saving", np: "गोल्ड बचत" }, href: "/products/savings/gold-saving-account" },
      { label: { en: "Diamond Saving", np: "डायमण्ड बचत" }, href: "/products/savings/diamond-saving-account" },
    ],
  },
  {
    label: { en: "Fixed Deposits", np: "मुद्दती निक्षेप" },
    href: "/products/fixed-deposits",
    children: [
      { label: { en: "Individual FD", np: "व्यक्तिगत मुद्दती" }, href: "/products/fixed-deposits/individual-fixed-deposit" },
      { label: { en: "Corporate FD", np: "संस्थागत मुद्दती" }, href: "/products/fixed-deposits/corporate-fixed-deposit" },
    ],
  },
  {
    label: { en: "Loans", np: "ऋण" },
    href: "/products/loans",
    children: [
      { label: { en: "Home Loan", np: "गृह ऋण" }, href: "/products/loans/home-loan" },
      { label: { en: "Auto Loan", np: "अटो ऋण" }, href: "/products/loans/auto-loan" },
      { label: { en: "Education Loan", np: "शिक्षा ऋण" }, href: "/products/loans/education-loan" },
      { label: { en: "Business Loan", np: "व्यवसाय ऋण" }, href: "/products/loans/business-loan" },
      { label: { en: "Personal Loan", np: "व्यक्तिगत ऋण" }, href: "/products/loans/personal-loan" },
    ],
  },
  {
    label: { en: "Services", np: "सेवाहरू" },
    href: "/services",
    children: [
      { label: { en: "Mobile Banking", np: "मोबाइल बैंकिङ" }, href: "/services/mobile-banking" },
      { label: { en: "connectIPS", np: "कनेक्ट आइपिएस" }, href: "/services/connect-ips" },
      { label: { en: "Remittance", np: "रेमिट्यान्स" }, href: "/services/remittance" },
      { label: { en: "Debit Card", np: "डेबिट कार्ड" }, href: "/services/debit-card" },
      { label: { en: "SMS Banking", np: "एसएमएस बैंकिङ" }, href: "/services/sms-banking" },
    ],
  },
  {
    label: { en: "Rates", np: "ब्याज दर" },
    href: "/rates",
    children: [
      { label: { en: "Interest Rates", np: "ब्याज दर" }, href: "/rates/interest-rates" },
      { label: { en: "Base Rate", np: "आधार दर" }, href: "/rates/base-rate-spread-rate" },
      { label: { en: "Tariff Charges", np: "शुल्क" }, href: "/rates/standard-tariff-charges" },
      { label: { en: "Forex Rates", np: "विदेशी विनिमय" }, href: "/rates/forex-rates" },
    ],
  },
  {
    label: { en: "Publications", np: "प्रकाशनहरू" },
    href: "/publications",
    children: [
      { label: { en: "News", np: "समाचार" }, href: "/publications/news" },
      { label: { en: "Events", np: "कार्यक्रम" }, href: "/publications/events" },
      { label: { en: "Notices", np: "सूचना" }, href: "/publications/notices/general-notice" },
      { label: { en: "Reports", np: "प्रतिवेदन" }, href: "/publications/reports/annual-report" },
    ],
  },
  {
    label: { en: "Contact", np: "सम्पर्क" },
    href: "/contact",
  },
];

function localize(href: string, lang: string) {
  if (href.startsWith("http") || href.startsWith("/") && href.startsWith("/api")) return href;
  return `/${lang}${href}`;
}

export default function Header({ lang }: { lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <div className="bg-primary-500 text-white text-sm">
        <div className="container-page flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+977015361104" className="flex items-center gap-1.5 text-white/85 hover:text-secondary-500 transition-colors">
              <Phone className="h-3.5 w-3.5" /> +977-01-5361104
            </a>
            <a href="mailto:info@reliancenepal.com.np" className="hidden items-center gap-1.5 text-white/85 hover:text-secondary-500 transition-colors md:flex">
              <Mail className="h-3.5 w-3.5" /> info@reliancenepal.com.np
            </a>
            <Link href={localize("/loan-enquiry", lang)} className="hidden items-center gap-1.5 font-semibold text-secondary-500 hover:text-secondary-400 transition-colors md:flex">
              Loan Enquiry
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href={localize("/contact", lang)} className="text-white/85 hover:text-secondary-500 transition-colors">Grievance</Link>
            <div className="h-4 w-px bg-white/20" />
            <LanguageSwitcher />
            <SearchOverlay />
          </div>
        </div>
      </div>

      <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/85 backdrop-blur-md"}`}>
        <div className="container-page flex h-20 items-center justify-between">
          <Link href={`/${lang}`} className="flex-shrink-0">
            <img src="https://reliancenepal.com.np/assets/images/reliance/logo.png" alt="Reliance Finance" className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={localize(item.href, lang)}
                  className={`flex items-center gap-1 rounded-md px-3 py-2.5 font-heading text-sm font-medium transition-colors ${
                    openDropdown === item.href ? "bg-primary-50 text-primary-500" : "text-text-primary hover:bg-primary-50 hover:text-primary-500"
                  }`}
                >
                  {lang === "np" && item.label.np ? item.label.np : item.label.en}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                {item.children && openDropdown === item.href && (
                  <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-border bg-white p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={localize(child.href, lang)}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary-500"
                      >
                        {lang === "np" && child.label.np ? child.label.np : child.label.en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-1.5 lg:hidden" aria-label="Menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full z-50 max-h-[80vh] overflow-y-auto border-t border-border bg-white px-4 pb-6 pt-4 lg:hidden">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={localize(item.href, lang)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 font-heading font-medium text-text-primary hover:bg-primary-50 hover:text-primary-500"
                  onClick={() => !item.children && setMobileOpen(false)}
                >
                  {lang === "np" && item.label.np ? item.label.np : item.label.en}
                </Link>
                {item.children && (
                  <div className="ml-4 border-l-2 border-primary-100 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={localize(child.href, lang)}
                        className="block rounded-lg px-4 py-2 text-sm text-text-secondary hover:bg-primary-50 hover:text-primary-500"
                        onClick={() => setMobileOpen(false)}
                      >
                        {lang === "np" && child.label.np ? child.label.np : child.label.en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

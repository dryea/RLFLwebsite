"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Menu, X, UserPlus } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import SearchOverlay from "@/components/shared/SearchOverlay";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { useNavigation } from "@/hooks/useNavigation";
import { localize } from "@/lib/localize";

// Fallback nav for when CMS data hasn't loaded yet
const fallbackNav = [
  { label: { en: "About", np: "बारे" }, href: "/about/introduction" },
  { label: { en: "Products", np: "उत्पादन" }, href: "/products" },
  { label: { en: "Rates", np: "दर" }, href: "/rates" },
  { label: { en: "Publications", np: "प्रकाशन" }, href: "/publications/news" },
  { label: { en: "Services", np: "सेवा" }, href: "/services" },
  { label: { en: "Contact", np: "सम्पर्क" }, href: "/contact" },
];

export default function Header({ lang }: { lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = useNavigation("main-nav", lang);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header>
      {/* Top Bar */}
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

      {/* Main Navigation */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/85 backdrop-blur-md"}`}>
        <div className="container-page flex h-20 items-center justify-between">
          <Link href={`/${lang}`} className="flex-shrink-0" aria-label="Reliance Finance Limited — Home">
            <img
              src="/assets/logo.png"
              alt="Reliance Finance Limited"
              width={160}
              height={48}
              fetchPriority="high"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Mega Menu */}
          {navItems.length > 0 ? (
            <MegaMenu items={navItems} lang={lang} />
          ) : (
            <nav className="hidden items-center gap-1 lg:flex">
              {fallbackNav.map((item) => (
                <Link
                  key={item.href}
                  href={localize(item.href, lang)}
                  className="rounded-md px-3 py-2.5 font-heading text-sm font-medium text-text-primary transition-colors hover:bg-primary-50 hover:text-primary-500"
                >
                  {lang === "np" && item.label.np ? item.label.np : item.label.en}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link
              href={localize("/open-account", lang)}
              className="hidden items-center gap-1.5 rounded-lg bg-secondary-500 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-secondary-400 hover:-translate-y-0.5 lg:inline-flex"
            >
              <UserPlus className="h-4 w-4" /> {lang === "np" ? "खाता खोल्नुहोस्" : "Open Account"}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <MobileNav
        items={navItems.length > 0 ? navItems : fallbackNav.map((item, i) => ({
          id: i,
          label: lang === "np" && item.label.np ? item.label.np : item.label.en,
          href: item.href,
          imageUrl: null,
          imageAlt: null,
          description: null,
          isOpenInNewTab: false,
          children: [],
        }))}
        lang={lang}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

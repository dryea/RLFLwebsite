"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Menu, UserPlus, Search } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import SearchOverlay from "@/components/shared/SearchOverlay";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { useNavigation } from "@/hooks/useNavigation";
import { localize } from "@/lib/localize";

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
  const isNp = lang === "np";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="z-50">
      {/* Utility Bar — slim, minimal */}
      <div className="bg-primary-700 text-white">
        <div className="container-page flex items-center justify-between py-1.5">
          <div className="flex items-center gap-5 text-xs">
            <a
              href="tel:+977015361104"
              className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-secondary-400"
            >
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">+977-01-5361104</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <a
              href="mailto:info@reliancenepal.com.np"
              className="hidden items-center gap-1.5 text-white/80 transition-colors hover:text-secondary-400 md:flex"
            >
              <Mail className="h-3 w-3" />
              info@reliancenepal.com.np
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <SearchOverlay />
          </div>
        </div>
      </div>

      {/* Main Navigation — sticky with glassmorphism on scroll */}
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)] border-b border-gray-100/80"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="container-page flex h-[68px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex-shrink-0 transition-opacity hover:opacity-90"
            aria-label="Reliance Finance Limited — Home"
          >
            <img
              src="/assets/logo.png"
              alt="Reliance Finance Limited"
              width={148}
              height={44}
              fetchPriority="high"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Mega Menu */}
          {navItems.length > 0 ? (
            <MegaMenu items={navItems} lang={lang} />
          ) : (
            <nav className="hidden items-center gap-0.5 lg:flex">
              {fallbackNav.map((item) => (
                <Link
                  key={item.href}
                  href={localize(item.href, lang)}
                  className="rounded-lg px-3.5 py-2 font-heading text-sm font-medium text-text-primary transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
                >
                  {isNp && item.label.np ? item.label.np : item.label.en}
                </Link>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href={localize("/open-account", lang)}
              className="hidden items-center gap-1.5 rounded-lg bg-secondary-500 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-secondary-400 hover:-translate-y-px hover:shadow-md lg:inline-flex"
            >
              <UserPlus className="h-4 w-4" />
              {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label={isNp ? "मेनु खोल्नुहोस्" : "Open menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <MobileNav
        items={
          navItems.length > 0
            ? navItems
            : fallbackNav.map((item, i) => ({
                id: i,
                label: isNp && item.label.np ? item.label.np : item.label.en,
                href: item.href,
                imageUrl: null,
                imageAlt: null,
                description: null,
                isOpenInNewTab: false,
                children: [],
              }))
        }
        lang={lang}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

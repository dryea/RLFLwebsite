"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Menu, UserPlus } from "lucide-react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import CommandPalette from "@/components/shared/CommandPalette";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { CMSNavItem } from "@/types/navigation";
import { fallbackCMSNav } from "@/lib/cms-navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { localize } from "@/lib/localize";

interface HeaderProps {
  lang: string;
  initialNavData?: CMSNavItem[];
}

export default function Header({ lang, initialNavData }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const clientNavData = useNavigation("main-nav", lang);
  const isNp = lang === "np";

  // Use initialNavData if provided, fallback to client fetch or built-in fallback
  const navItems: CMSNavItem[] =
    initialNavData && initialNavData.length > 0
      ? initialNavData
      : clientNavData && clientNavData.length > 0
      ? (clientNavData as unknown as CMSNavItem[])
      : fallbackCMSNav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="z-50">
      {/* Top Utility Bar */}
      <div className="bg-primary-950 text-white border-b border-white/10">
        <div className="container-page flex items-center justify-between py-1.5">
          <div className="flex items-center gap-5 text-xs">
            <a
              href="tel:+977015361104"
              className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-secondary-400"
            >
              <Phone className="h-3 w-3 text-secondary-400" />
              <span className="hidden sm:inline">+977-01-5361104</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <a
              href="mailto:info@reliancenepal.com.np"
              className="hidden items-center gap-1.5 text-white/80 transition-colors hover:text-secondary-400 md:flex"
            >
              <Mail className="h-3 w-3 text-secondary-400" />
              info@reliancenepal.com.np
            </a>
          </div>

          <div className="flex items-center gap-3">
            <CommandPalette lang={lang} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navigation — Sticky with glassmorphism on scroll */}
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
          <MegaMenu items={navItems} lang={lang} />

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href={localize("/open-account", lang)}
              className="hidden items-center gap-1.5 rounded-xl bg-secondary-500 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-secondary-400 hover:-translate-y-px hover:shadow-md lg:inline-flex"
            >
              <UserPlus className="h-4 w-4" />
              {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label={isNp ? "मेनु खोल्नुहोस्" : "Open menu"}
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <MobileNav
        items={navItems}
        lang={lang}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

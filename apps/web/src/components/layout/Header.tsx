"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  Menu,
  UserPlus,
  Lock,
  ChevronDown,
  Smartphone,
  Building2,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
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
  const [portalOpen, setPortalOpen] = useState(false);
  const portalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const clientNavData = useNavigation("main-nav", lang);
  const isNp = lang === "np";

  const navItems: CMSNavItem[] =
    initialNavData && initialNavData.length > 0
      ? initialNavData
      : clientNavData && clientNavData.length > 0
      ? (clientNavData as unknown as CMSNavItem[])
      : fallbackCMSNav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openPortal = () => {
    if (portalTimeoutRef.current) clearTimeout(portalTimeoutRef.current);
    setPortalOpen(true);
  };

  const closePortal = () => {
    portalTimeoutRef.current = setTimeout(() => setPortalOpen(false), 150);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-slate-950 py-1.5 text-xs text-slate-300 border-b border-slate-800 relative z-50">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+977015361104"
              className="flex items-center gap-1.5 font-medium text-slate-300 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3 text-secondary-400" />
              <span className="hidden sm:inline">+977-01-5361104</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <a
              href="mailto:info@reliancenepal.com.np"
              className="hidden items-center gap-1.5 font-medium text-slate-300 transition-colors hover:text-white md:flex"
            >
              <Mail className="h-3 w-3 text-secondary-400" />
              info@reliancenepal.com.np
            </a>
            <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-4 text-[11px] text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span>{isNp ? "नेपाल राष्ट्र बैंकबाट 'ग' वर्गको इजाजतपत्र प्राप्त" : "NRB Licensed 'C' Class Financial Institution"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CommandPalette lang={lang} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Modern Floating Header Bar */}
      <header className={`sticky top-3 z-40 px-3 transition-all duration-300 ${scrolled ? "top-2" : "top-3"}`}>
        <div
          className={`container-page mx-auto flex h-[64px] items-center justify-between gap-4 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-gray-200 bg-white/95 shadow-lg shadow-gray-950/5 backdrop-blur-xl ring-1 ring-black/5"
              : "border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-lg"
          } px-5 md:px-6`}
        >
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex-shrink-0 transition-opacity hover:opacity-90"
            aria-label="Reliance Finance Limited — Home"
          >
            <img
              src="/assets/logo.png"
              alt="Reliance Finance Limited"
              width={145}
              height={42}
              fetchPriority="high"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Mega Menu */}
          <MegaMenu items={navItems} lang={lang} />

          {/* Right Action Engine */}
          <div className="flex items-center gap-2">
            {/* Online Banking Dropdown */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={openPortal}
              onMouseLeave={closePortal}
            >
              <button
                className={`flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-1.5 font-heading text-xs font-bold transition-colors ${
                  portalOpen
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Lock className="h-3.5 w-3.5 text-primary-600" />
                <span>{isNp ? "अनलाइन बैंकिङ" : "Online Banking"}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${portalOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Portal Floating Card */}
              {portalOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5">
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {isNp ? "आधिकारिक पोर्टल" : "Official Portals"}
                    </p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <a
                      href="https://reliancenepal.com.np"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-3.5 w-3.5 text-primary-600" />
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-primary-700">RFL Smart App</p>
                          <p className="text-[10px] text-gray-400">Mobile Banking</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>

                    <a
                      href="https://corporatepay.connectips.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-secondary-600" />
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-primary-700">CorporatePay</p>
                          <p className="text-[10px] text-gray-400">Business Portal</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>

                    <a
                      href="https://login.connectips.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-primary-700">connectIPS</p>
                          <p className="text-[10px] text-gray-400">e-Payment Gateway</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Open Account Pill */}
            <Link
              href={localize("/open-account", lang)}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary-500 px-4 py-2 text-xs font-bold text-gray-900 shadow-sm transition-all hover:bg-secondary-400 hover:shadow-md"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>{isNp ? "खाता खोल्नुहोस्" : "Open Account"}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label={isNp ? "मेनु खोल्नुहोस्" : "Open menu"}
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        items={navItems}
        lang={lang}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

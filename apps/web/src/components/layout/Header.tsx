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
  ArrowRight,
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Slim Utility Announcement Strip */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 py-1.5 text-xs text-white border-b border-white/10 relative z-50">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+977015361104"
              className="flex items-center gap-1.5 font-medium text-white/80 transition-colors hover:text-secondary-400"
            >
              <Phone className="h-3 w-3 text-secondary-400" />
              <span className="hidden sm:inline">+977-01-5361104</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <a
              href="mailto:info@reliancenepal.com.np"
              className="hidden items-center gap-1.5 font-medium text-white/80 transition-colors hover:text-secondary-400 md:flex"
            >
              <Mail className="h-3 w-3 text-secondary-400" />
              info@reliancenepal.com.np
            </a>
            <div className="hidden lg:flex items-center gap-2 border-l border-white/20 pl-4 text-[11px] text-white/70">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>{isNp ? "नेपाल राष्ट्र बैंकबाट 'ग' वर्गको इजाजतपत्र प्राप्त" : "NRB Licensed 'C' Class Financial Institution"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CommandPalette lang={lang} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Capsule Header Bar */}
      <header className={`sticky top-3 z-40 px-3 transition-all duration-300 ${scrolled ? "top-2" : "top-3"}`}>
        <div
          className={`container-page mx-auto flex h-[68px] items-center justify-between gap-4 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-gray-200/90 bg-white/90 shadow-[0_20px_50px_rgba(112,43,134,0.15)] backdrop-blur-3xl ring-1 ring-black/5"
              : "border-white/70 bg-white/85 shadow-[0_12px_35px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
          } px-5 md:px-7`}
        >
          {/* Brand Logo */}
          <Link
            href={`/${lang}`}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            aria-label="Reliance Finance Limited — Home"
          >
            <img
              src="/assets/logo.png"
              alt="Reliance Finance Limited"
              width={150}
              height={44}
              fetchPriority="high"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Next-Gen 4-Pane Desktop MegaMenu */}
          <MegaMenu items={navItems} lang={lang} />

          {/* Right Action Engine (Portal Login Dropdown & Open Account Pill) */}
          <div className="flex items-center gap-2.5">
            {/* Online Banking Portal Dropdown */}
            <div
              className="relative hidden xl:block"
              onMouseEnter={openPortal}
              onMouseLeave={closePortal}
            >
              <button
                className={`flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 font-heading text-xs font-bold transition-all ${
                  portalOpen
                    ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                    : "bg-gray-50/80 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Lock className="h-3.5 w-3.5 text-primary-600" />
                <span>{isNp ? "अनलाइन बैंकिङ ▾" : "Online Banking"}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${portalOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Portal Options Floating Card */}
              {portalOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white/95 p-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      {isNp ? "सुरक्षित पोर्टल लगइन" : "Secure Portal Login"}
                    </p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <a
                      href="https://reliancenepal.com.np"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                          <Smartphone className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary-700">RFL Smart App</p>
                          <p className="text-[10px] text-gray-400">Retail Mobile Banking</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>

                    <a
                      href="https://corporatepay.connectips.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary-100 text-secondary-800">
                          <Building2 className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary-700">CorporatePay</p>
                          <p className="text-[10px] text-gray-400">Business Payments</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>

                    <a
                      href="https://login.connectips.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary-700">connectIPS</p>
                          <p className="text-[10px] text-gray-400">e-Payment System</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-primary-600" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Open Account Glowing Gradient Pill */}
            <Link
              href={localize("/open-account", lang)}
              className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-secondary-500 via-amber-400 to-secondary-500 px-5 py-2.5 text-xs font-extrabold text-gray-900 shadow-lg shadow-secondary-500/20 transition-all duration-300 hover:scale-105 hover:shadow-secondary-500/40"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>{isNp ? "खाता खोल्नुहोस्" : "Open Account"}</span>
            </Link>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
              aria-label={isNp ? "मेनु खोल्नुहोस्" : "Open menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* App-Native Mobile Slide Drawer */}
      <MobileNav
        items={navItems}
        lang={lang}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

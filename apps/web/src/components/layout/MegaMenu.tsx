"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Wallet,
  Coins,
  Sparkles,
  Lock,
  Building,
  Home,
  Car,
  Briefcase,
  Sprout,
  LineChart,
  Calculator,
  Scale,
  CheckCircle2,
  Percent,
  TrendingUp,
  Receipt,
  ArrowLeftRight,
  BellRing,
  FileText,
  FileBarChart,
  FileCheck,
  Newspaper,
  Calendar,
  GraduationCap,
  Smartphone,
  Zap,
  Building2,
  CreditCard,
  QrCode,
  Globe,
  MapPin,
  ShoppingBag,
  HelpCircle,
  Phone,
  Target,
  Award,
  PieChart,
  Users,
  UserCheck,
  ShieldAlert,
  Heart,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { CMSNavItem } from "@/types/navigation";
import { localize } from "@/lib/localize";

const iconMap: Record<string, React.ElementType> = {
  Wallet, Coins, Sparkles, Lock, Building, Home, Car, Briefcase, Sprout, LineChart,
  Calculator, Scale, CheckCircle2, Percent, TrendingUp, Receipt, ArrowLeftRight,
  BellRing, FileText, FileBarChart, FileCheck, Newspaper, Calendar, GraduationCap,
  Smartphone, Zap, Building2, CreditCard, QrCode, Globe, MapPin, ShoppingBag,
  HelpCircle, Phone, Target, Award, PieChart, Users, UserCheck, ShieldAlert, Heart,
};

const iconThemeMap: Record<string, { bg: string; text: string; badgeBg: string; badgeText: string }> = {
  Wallet: { bg: "bg-purple-100/80", text: "text-purple-700", badgeBg: "bg-purple-100", badgeText: "text-purple-800" },
  Coins: { bg: "bg-emerald-100/80", text: "text-emerald-700", badgeBg: "bg-emerald-100", badgeText: "text-emerald-800" },
  Home: { bg: "bg-amber-100/80", text: "text-amber-700", badgeBg: "bg-amber-100", badgeText: "text-amber-800" },
  Car: { bg: "bg-blue-100/80", text: "text-blue-700", badgeBg: "bg-blue-100", badgeText: "text-blue-800" },
  Briefcase: { bg: "bg-indigo-100/80", text: "text-indigo-700", badgeBg: "bg-indigo-100", badgeText: "text-indigo-800" },
  Smartphone: { bg: "bg-sky-100/80", text: "text-sky-700", badgeBg: "bg-sky-100", badgeText: "text-sky-800" },
  TrendingUp: { bg: "bg-rose-100/80", text: "text-rose-700", badgeBg: "bg-rose-100", badgeText: "text-rose-800" },
  FileText: { bg: "bg-teal-100/80", text: "text-teal-700", badgeBg: "bg-teal-100", badgeText: "text-teal-800" },
};

interface MegaMenuProps {
  items: CMSNavItem[];
  lang: string;
}

export default function MegaMenu({ items, lang }: MegaMenuProps) {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      {items.map((item) => (
        <MegaMenuItem key={item.id} item={item} lang={lang} />
      ))}
    </nav>
  );
}

function MegaMenuItem({ item, lang }: { item: CMSNavItem; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  const itemHref = item.href ? localize(item.href, lang) : "#";
  const isActive = pathname === itemHref || (item.children?.some((c) => c.href && pathname.includes(c.href)));

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 160);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  if (!hasChildren) {
    if (item.isOpenInNewTab) {
      return (
        <a
          href={item.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full px-4 py-2 font-heading text-xs font-bold text-gray-700 transition-all hover:bg-gray-100 hover:text-primary-700"
        >
          {lang === "np" && item.labelNp ? item.labelNp : item.label}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      );
    }
    return (
      <Link
        href={itemHref}
        className={`rounded-full px-4 py-2 font-heading text-xs font-bold transition-all ${
          isActive
            ? "bg-primary-50 text-primary-700 shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-primary-700"
        }`}
      >
        {lang === "np" && item.labelNp ? item.labelNp : item.label}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onKeyDown={handleKeyDown}
    >
      <Link
        href={itemHref}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-heading text-xs font-bold transition-all ${
          isOpen || isActive
            ? "bg-primary-700 text-white shadow-md shadow-primary-700/20"
            : "text-gray-700 hover:bg-gray-100 hover:text-primary-700"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {lang === "np" && item.labelNp ? item.labelNp : item.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown className="h-3 w-3" />
        </motion.span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-[0_30px_70px_rgba(0,0,0,0.15)] ring-1 ring-black/5 backdrop-blur-3xl">
              <MegaPanel
                item={item}
                lang={lang}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaPanel({ item, lang, onClose }: { item: CMSNavItem; lang: string; onClose: () => void }) {
  const isNp = lang === "np";
  const items = item.children || [];
  const promoCard = items.find((c) => c.isPromoCard);
  const columnGroups = items.filter((c) => !c.isPromoCard);

  // In-menu EMI/Yield Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const interestRate = 10.5;

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi || 0).toLocaleString();
  };

  const isProductsPane = item.label.toLowerCase().includes("product") || item.label.toLowerCase().includes("personal");

  return (
    <div className="flex flex-col">
      {/* Financial Rate Ticker Header Strip */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 px-6 py-2.5 text-[11px] text-white">
        <div className="flex items-center gap-6 font-semibold">
          <span className="flex items-center gap-1.5 text-secondary-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{isNp ? "दरहरू:" : "Key Rates:"}</span>
          </span>
          <span>Normal Savings: <strong className="text-secondary-400 font-mono">6.25% p.a.</strong></span>
          <span>Fixed Deposit: <strong className="text-secondary-400 font-mono">Up to 8.25% p.a.</strong></span>
          <span>Base Rate: <strong className="text-secondary-400 font-mono">8.45%</strong></span>
        </div>
        <Link
          href={localize("/rates", lang)}
          onClick={onClose}
          className="font-bold text-secondary-400 hover:text-white transition-colors"
        >
          {isNp ? "सबै दरहरू हेर्नुहोस् →" : "View All Rates →"}
        </Link>
      </div>

      <div className="flex p-5 gap-6" style={{ minWidth: promoCard || isProductsPane ? "840px" : "620px" }}>
        {/* Dynamic Nav Columns */}
        <div className={`grid flex-1 gap-6 ${columnGroups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {columnGroups.map((group) => (
            <div key={group.id} className="space-y-3">
              {group.groupTitle && (
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="h-2 w-2 rounded-full bg-secondary-500" />
                  <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-primary-900">
                    {group.groupTitle}
                  </h4>
                </div>
              )}
              <div className="space-y-1">
                {(group.children?.length ? group.children : [group]).map((sub) => {
                  const IconComponent = sub.icon ? iconMap[sub.icon] || Wallet : Wallet;
                  const theme = sub.icon ? iconThemeMap[sub.icon] || { bg: "bg-primary-100/80", text: "text-primary-700", badgeBg: "bg-primary-100", badgeText: "text-primary-800" } : { bg: "bg-primary-100/80", text: "text-primary-700", badgeBg: "bg-primary-100", badgeText: "text-primary-800" };
                  const label = isNp && sub.labelNp ? sub.labelNp : sub.label;
                  const desc = isNp && sub.descriptionNp ? sub.descriptionNp : sub.description;

                  return (
                    <Link
                      key={sub.id}
                      href={sub.href ? localize(sub.href, lang) : "#"}
                      onClick={onClose}
                      className="group/sub flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-gray-50/90"
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.text} transition-transform duration-200 group-hover/sub:scale-110 shadow-sm`}>
                        <IconComponent className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-gray-900 transition-colors group-hover/sub:text-primary-700">
                            {label}
                          </span>
                          {sub.badgeText && (
                            <span className={`rounded-full ${theme.badgeBg} px-2 py-0.5 text-[10px] font-extrabold ${theme.badgeText}`}>
                              {sub.badgeText}
                            </span>
                          )}
                        </div>
                        {desc && (
                          <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400 line-clamp-1">
                            {desc}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Interactive EMI/Yield Preview Calculator (For Products Pane) */}
        {isProductsPane && (
          <div className="w-64 shrink-0 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="h-4 w-4 text-primary-700" />
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                  {isNp ? "ऋण ईएमआई क्याल्कुलेटर" : "Instant EMI Estimator"}
                </h5>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-gray-600 mb-1">
                    <span>Amount:</span>
                    <span className="font-mono font-bold text-gray-900">NPR {loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer accent-primary-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-gray-600 mb-1">
                    <span>Tenure:</span>
                    <span className="font-mono font-bold text-gray-900">{loanTenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer accent-primary-600"
                  />
                </div>

                <div className="rounded-xl bg-white p-3 border border-gray-200 text-center">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Estimated Monthly EMI</span>
                  <span className="font-heading text-base font-extrabold text-primary-700 font-mono">
                    NPR {calculateEMI()}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={localize("/emi-calculator", lang)}
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-700 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-800 transition-colors"
            >
              Full Calculator <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {/* Featured Promotion Card Column */}
        {promoCard && !isProductsPane && (
          <div className="w-56 shrink-0 rounded-2xl border border-gray-100 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-4 text-white shadow-xl flex flex-col justify-between">
            <div>
              {promoCard.imageUrl && (
                <img
                  src={promoCard.imageUrl}
                  alt="Promo"
                  className="mb-3 h-28 w-full rounded-xl object-cover shadow"
                />
              )}
              <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-secondary-400">
                Featured Highlight
              </span>
              <h5 className="mb-1 text-xs font-extrabold leading-snug">{promoCard.label}</h5>
              {promoCard.description && (
                <p className="text-[11px] leading-relaxed text-white/70 line-clamp-2">
                  {promoCard.description}
                </p>
              )}
            </div>
            {promoCard.href && (
              <Link
                href={localize(promoCard.href, lang)}
                onClick={onClose}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-secondary-500 py-2 text-xs font-extrabold text-gray-900 shadow transition-transform hover:scale-105"
              >
                Learn More <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

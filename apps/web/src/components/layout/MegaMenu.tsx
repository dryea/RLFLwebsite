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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 140);
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
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-700"
        >
          {lang === "np" && item.labelNp ? item.labelNp : item.label}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      );
    }
    return (
      <Link
        href={itemHref}
        className={`rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors ${
          isActive
            ? "bg-primary-50 text-primary-700 font-bold"
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
        className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors ${
          isOpen || isActive
            ? "bg-primary-700 text-white font-bold shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-primary-700"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {lang === "np" && item.labelNp ? item.labelNp : item.label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-2"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5">
              <MegaPanel
                items={item.children || []}
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

function MegaPanel({ items, lang, onClose }: { items: CMSNavItem[]; lang: string; onClose: () => void }) {
  const isNp = lang === "np";
  const promoCard = items.find((c) => c.isPromoCard);
  const columnGroups = items.filter((c) => !c.isPromoCard);

  return (
    <div className="flex gap-6" style={{ minWidth: promoCard ? "680px" : columnGroups.length > 1 ? "560px" : "260px" }}>
      {/* Navigation Columns */}
      <div className={`grid flex-1 gap-6 ${columnGroups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {columnGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            {group.groupTitle && (
              <h4 className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-primary-900 border-b border-gray-100 pb-1.5">
                {group.groupTitle}
              </h4>
            )}
            <div className="space-y-0.5">
              {(group.children?.length ? group.children : [group]).map((sub) => {
                const IconComponent = sub.icon ? iconMap[sub.icon] || Wallet : Wallet;
                const label = isNp && sub.labelNp ? sub.labelNp : sub.label;
                const desc = isNp && sub.descriptionNp ? sub.descriptionNp : sub.description;

                return (
                  <Link
                    key={sub.id}
                    href={sub.href ? localize(sub.href, lang) : "#"}
                    onClick={onClose}
                    className="group/sub flex items-start gap-2.5 rounded-xl p-2 transition-colors hover:bg-primary-50/80"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors group-hover/sub:bg-primary-700 group-hover/sub:text-white">
                      <IconComponent className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 transition-colors group-hover/sub:text-primary-700">
                          {label}
                        </span>
                        {sub.badgeText && (
                          <span className="rounded-full bg-secondary-100 px-1.5 py-0.5 text-[9px] font-extrabold text-secondary-800">
                            {sub.badgeText}
                          </span>
                        )}
                      </div>
                      {desc && (
                        <p className="text-[11px] text-gray-500 line-clamp-1">
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

      {/* Featured Promotion Card */}
      {promoCard && (
        <div className="w-52 shrink-0 rounded-xl border border-gray-100 bg-slate-900 p-4 text-white shadow-md flex flex-col justify-between">
          <div>
            {promoCard.imageUrl && (
              <img
                src={promoCard.imageUrl}
                alt="Promo"
                className="mb-2.5 h-24 w-full rounded-lg object-cover"
              />
            )}
            <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-widest text-amber-400">
              Featured
            </span>
            <h5 className="text-xs font-bold leading-snug">{promoCard.label}</h5>
            {promoCard.description && (
              <p className="mt-1 text-[10px] leading-relaxed text-slate-300 line-clamp-2">
                {promoCard.description}
              </p>
            )}
          </div>
          {promoCard.href && (
            <Link
              href={localize(promoCard.href, lang)}
              onClick={onClose}
              className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-amber-400 py-1.5 text-xs font-bold text-gray-900 shadow-sm transition-colors hover:bg-amber-300"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

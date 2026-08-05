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
    <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
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
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-heading text-sm font-semibold text-text-primary transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
        >
          {lang === "np" && item.labelNp ? item.labelNp : item.label}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      );
    }
    return (
      <Link
        href={itemHref}
        className={`rounded-xl px-3.5 py-2 font-heading text-sm font-semibold transition-all duration-200 ${
          isActive
            ? "bg-primary-50 text-primary-600 shadow-sm"
            : "text-text-primary hover:bg-primary-50 hover:text-primary-600"
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
        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-heading text-sm font-semibold transition-all duration-200 ${
          isOpen || isActive
            ? "bg-primary-50 text-primary-600"
            : "text-text-primary hover:bg-primary-50 hover:text-primary-600"
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
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </Link>

      {/* Active Indicator Line */}
      {(isOpen || isActive) && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-full z-50 mt-2"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
              <MegaPanel items={item.children || []} lang={lang} onClose={() => setIsOpen(false)} />
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
    <div className="flex p-4" style={{ minWidth: promoCard ? "720px" : columnGroups.length > 1 ? "640px" : "280px" }}>
      {/* Dynamic Columns */}
      <div className={`grid flex-1 gap-6 ${columnGroups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {columnGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            {group.groupTitle && (
              <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-secondary-600">
                {group.groupTitle}
              </h4>
            )}
            <div className="space-y-1">
              {(group.children?.length ? group.children : [group]).map((sub) => {
                const IconComponent = sub.icon ? iconMap[sub.icon] || Wallet : null;
                const label = isNp && sub.labelNp ? sub.labelNp : sub.label;
                const desc = isNp && sub.descriptionNp ? sub.descriptionNp : sub.description;
                return (
                  <Link
                    key={sub.id}
                    href={sub.href ? localize(sub.href, lang) : "#"}
                    onClick={onClose}
                    className="group/sub flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                  >
                    {IconComponent && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover/sub:bg-primary-500 group-hover/sub:text-white">
                        <IconComponent className="h-4 w-4" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 transition-colors group-hover/sub:text-primary-600">
                          {label}
                        </span>
                        {sub.badgeText && (
                          <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-extrabold text-secondary-800">
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

      {/* Featured Promo Card Column */}
      {promoCard && (
        <div className="ml-4 w-56 shrink-0 rounded-xl border border-gray-100 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-4 text-white shadow-lg">
          {promoCard.imageUrl && (
            <img
              src={promoCard.imageUrl}
              alt="Promo"
              className="mb-3 h-28 w-full rounded-lg object-cover"
            />
          )}
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-secondary-400">
            Featured
          </span>
          <h5 className="mb-1 text-sm font-bold leading-snug">{promoCard.label}</h5>
          {promoCard.description && (
            <p className="mb-3 text-[11px] leading-relaxed text-white/70 line-clamp-2">
              {promoCard.description}
            </p>
          )}
          {promoCard.href && (
            <Link
              href={localize(promoCard.href, lang)}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg bg-secondary-500 px-3 py-1.5 text-xs font-bold text-gray-900 shadow transition-transform hover:scale-105"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

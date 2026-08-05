"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Phone, Mail, UserPlus, Search, MapPin, TrendingUp, Lock } from "lucide-react";
import { CMSNavItem } from "@/types/navigation";
import { localize } from "@/lib/localize";

interface MobileNavProps {
  items: CMSNavItem[];
  lang: string;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export default function MobileNav({ items, lang, isOpen, onClose }: MobileNavProps) {
  const isNp = lang === "np";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const label = (item.label || "").toLowerCase();
    const labelNp = (item.labelNp || "").toLowerCase();
    const childMatch = item.children?.some((c) => (c.label || "").toLowerCase().includes(q) || (c.labelNp || "").toLowerCase().includes(q));
    return label.includes(q) || labelNp.includes(q) || childMatch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[999] flex w-[320px] max-w-[90vw] flex-col bg-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link href={`/${lang}`} onClick={onClose}>
                <img src="/assets/logo.png" alt="RFL" className="h-8 w-auto object-contain" />
              </Link>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search Filter Bar */}
            <div className="border-b border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isNp ? "सेवाहरू, ब्याजदर, शाखा खोज्नुहोस्..." : "Search services, rates, branches..."}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-primary-500"
                />
              </div>
            </div>



            {/* Navigation Accordion List */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <MobileNavItem key={item.id} item={item} lang={lang} onClose={onClose} depth={0} />
                ))}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-4 space-y-2.5">
              <Link
                href={localize("/open-account", lang)}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-secondary-500 to-amber-400 py-3 text-xs font-extrabold text-gray-900 shadow transition-transform hover:scale-[1.02]"
              >
                <UserPlus className="h-4 w-4" />
                {isNp ? "खाता खोल्नुहोस्" : "Open Account Online"}
              </Link>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:+977015361104"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Phone className="h-3.5 w-3.5 text-primary-600" />
                  <span>Call Us</span>
                </a>
                <Link
                  href={localize("/branches", lang)}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary-600" />
                  <span>Branches</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileNavItem({
  item,
  lang,
  onClose,
  depth,
}: {
  item: CMSNavItem;
  lang: string;
  onClose: () => void;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isNp = lang === "np";
  const hasChildren = item.children && item.children.length > 0;

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => !prev);
  }, []);

  const label = isNp && item.labelNp ? item.labelNp : item.label;

  if (item.isOpenInNewTab) {
    return (
      <a
        href={item.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100"
        style={{ paddingLeft: `${12 + depth * 14}px` }}
      >
        {label}
      </a>
    );
  }

  if (!hasChildren) {
    return (
      <Link
        href={item.href ? localize(item.href, lang) : "#"}
        onClick={onClose}
        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
        style={{ paddingLeft: `${12 + depth * 14}px` }}
      >
        <span>{label}</span>
        {item.badgeText && (
          <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-extrabold text-secondary-800">
            {item.badgeText}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={toggleExpand}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold text-gray-800 transition-colors hover:bg-gray-100"
        style={{ paddingLeft: `${12 + depth * 14}px` }}
      >
        <span>{label}</span>
        <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className={`space-y-0.5 ${depth === 0 ? "ml-3 border-l-2 border-primary-100 pl-2" : ""}`}>
              {item.children?.map((child) => (
                <MobileNavItem key={child.id} item={child} lang={lang} onClose={onClose} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

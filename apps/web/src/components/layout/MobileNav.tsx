"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Phone, Mail, UserPlus, Search, Sparkles } from "lucide-react";
import { CMSNavItem } from "@/types/navigation";
import { localize } from "@/lib/localize";

interface MobileNavProps {
  items: CMSNavItem[];
  lang: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ items, lang, isOpen, onClose }: MobileNavProps) {
  const isNp = lang === "np";
  // Track stack of navigation panels: level 0 = root, level 1 = sub-category, etc.
  const [navStack, setNavStack] = useState<CMSNavItem[]>([]);
  const [filterQuery, setFilterQuery] = useState("");

  const currentPanel = navStack.length > 0 ? navStack[navStack.length - 1] : null;
  const activeItems = currentPanel ? currentPanel.children || [] : items;

  const pushPanel = useCallback((item: CMSNavItem) => {
    setNavStack((stack) => [...stack, item]);
  }, []);

  const popPanel = useCallback(() => {
    setNavStack((stack) => stack.slice(0, stack.length - 1));
  }, []);

  const resetNav = useCallback(() => {
    setNavStack([]);
    setFilterQuery("");
    onClose();
  }, [onClose]);

  // Search filter
  const displayedItems = filterQuery
    ? activeItems.filter((i) =>
        i.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (i.labelNp && i.labelNp.includes(filterQuery))
      )
    : activeItems;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
            onClick={resetNav}
          />

          {/* Sliding Panel Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[999] flex w-[320px] max-w-[88vw] flex-col bg-white shadow-2xl"
          >
            {/* Top Bar / Back Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
              {navStack.length > 0 ? (
                <button
                  onClick={popPanel}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary-600 transition-colors hover:text-primary-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to {navStack.length === 1 ? "Main Menu" : navStack[navStack.length - 2].label}</span>
                </button>
              ) : (
                <Link href={`/${lang}`} onClick={resetNav}>
                  <img src="/assets/logo.png" alt="Reliance Finance" className="h-8 w-auto" />
                </Link>
              )}

              <button
                onClick={resetNav}
                className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Filter Search */}
            <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs">
                <Search className="h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder={isNp ? "मेनु खोज्नुहोस्..." : "Filter menu items..."}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                />
                {filterQuery && (
                  <button onClick={() => setFilterQuery("")} className="text-gray-400 hover:text-gray-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Panel Title if Sub-level */}
            {currentPanel && !filterQuery && (
              <div className="bg-primary-50 px-5 py-3 border-b border-primary-100">
                <h3 className="font-heading text-sm font-bold text-primary-800">
                  {isNp && currentPanel.labelNp ? currentPanel.labelNp : currentPanel.label}
                </h3>
                {currentPanel.description && (
                  <p className="mt-0.5 text-[11px] text-gray-500">{currentPanel.description}</p>
                )}
              </div>
            )}

            {/* Drill-down List */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={navStack.length + filterQuery}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  {displayedItems.map((item) => {
                    const hasChild = item.children && item.children.length > 0;
                    const label = isNp && item.labelNp ? item.labelNp : item.label;

                    if (hasChild) {
                      return (
                        <button
                          key={item.id}
                          onClick={() => pushPanel(item)}
                          className="flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          <span className="flex items-center gap-2">
                            {label}
                            {item.badgeText && (
                              <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-bold text-secondary-800">
                                {item.badgeText}
                              </span>
                            )}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </button>
                      );
                    }

                    if (item.isOpenInNewTab) {
                      return (
                        <a
                          key={item.id}
                          href={item.href || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-xl px-3.5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          {label}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.href ? localize(item.href, lang) : "#"}
                        onClick={resetNav}
                        className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                      >
                        <span>{label}</span>
                        {item.badgeText && (
                          <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-bold text-secondary-800">
                            {item.badgeText}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              <Link
                href={localize("/open-account", lang)}
                onClick={resetNav}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-500 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-secondary-400"
              >
                <UserPlus className="h-4 w-4" />
                {isNp ? "खाता खोल्नुहोस्" : "Open Account Online"}
              </Link>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <a href="tel:+977015361104" className="flex items-center gap-1.5 hover:text-primary-600">
                  <Phone className="h-3.5 w-3.5 text-primary-500" /> Call Us
                </a>
                <a href="mailto:info@reliancenepal.com.np" className="flex items-center gap-1.5 hover:text-primary-600">
                  <Mail className="h-3.5 w-3.5 text-primary-500" /> Email
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

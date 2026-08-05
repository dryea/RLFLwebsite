"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calculator,
  Percent,
  MapPin,
  FileText,
  Building2,
  Wallet,
  Coins,
  ArrowRight,
  Phone,
  Scale,
  X,
  Sparkles,
} from "lucide-react";
import { localize } from "@/lib/localize";

interface CommandItem {
  id: string;
  title: string;
  category: "Tools & Calculators" | "Products" | "Rates & Charges" | "Information & Support";
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const COMMANDS: CommandItem[] = [
  // Tools
  { id: "emi", title: "EMI Calculator", category: "Tools & Calculators", href: "/emi-calculator", icon: Calculator, badge: "Tool" },
  { id: "compare", title: "Compare Financial Products", category: "Tools & Calculators", href: "/products/compare", icon: Scale, badge: "Tool" },
  { id: "eligibility", title: "Check Loan Eligibility", category: "Tools & Calculators", href: "/loan-eligibility", icon: Sparkles, badge: "Tool" },
  { id: "enquiry", title: "Submit Loan Enquiry", category: "Tools & Calculators", href: "/loan-enquiry", icon: FileText },
  { id: "open", title: "Open Account Online", category: "Tools & Calculators", href: "/open-account", icon: Wallet, badge: "Hot" },

  // Products
  { id: "savings", title: "Savings Accounts Overview", category: "Products", href: "/products/savings", icon: Wallet },
  { id: "everest", title: "Everest Savings Account (5.50%)", category: "Products", href: "/products/savings/everest-saving-account", icon: Sparkles, badge: "5.50%" },
  { id: "gold-save", title: "Gold Savings Account (5.75%)", category: "Products", href: "/products/savings/gold-saving-account", icon: Coins, badge: "5.75%" },
  { id: "fd", title: "Fixed Deposit Schemes", category: "Products", href: "/products/fixed-deposits", icon: Building2, badge: "Up to 6.25%" },
  { id: "home-loan", title: "Home & Land Loan", category: "Products", href: "/products/loans/home-loan", icon: Building2 },
  { id: "auto-loan", title: "Auto & Vehicle Loan", category: "Products", href: "/products/loans/auto-loan", icon: Building2 },
  { id: "biz-loan", title: "SME & Business Loan", category: "Products", href: "/products/loans/business-loan", icon: Building2 },

  // Rates
  { id: "rates", title: "Interest Rates Schedule", category: "Rates & Charges", href: "/rates", icon: Percent, badge: "Updated" },
  { id: "base-rate", title: "Base Rate & Spread Rate", category: "Rates & Charges", href: "/rates/base-rate-spread-rate", icon: Percent },
  { id: "forex", title: "Forex Foreign Exchange Rates", category: "Rates & Charges", href: "/rates/forex-rates", icon: Percent },
  { id: "gold-rate", title: "Gold & Silver Rates", category: "Rates & Charges", href: "/rates/gold-silver", icon: Coins },
  { id: "tariff", title: "Standard Tariff & Charges", category: "Rates & Charges", href: "/rates/standard-tariff-charges", icon: FileText },

  // Support
  { id: "branches", title: "Branch Network Directory", category: "Information & Support", href: "/branches", icon: MapPin, badge: "21 Branches" },
  { id: "contact", title: "Contact Us & Toll-Free", category: "Information & Support", href: "/contact", icon: Phone },
  { id: "grievance", title: "Write to Us / Grievances", category: "Information & Support", href: "/write-to-us", icon: FileText },
  { id: "notices", title: "General Notices & Auctions", category: "Information & Support", href: "/publications/notices/general-notice", icon: FileText },
];

export default function CommandPalette({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter commands
  const filtered = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(localize(href, lang));
    },
    [router, lang]
  );

  // Keyboard navigation within list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      navigateTo(filtered[selectedIndex].href);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [open]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur transition-all hover:bg-white/20 hover:text-white"
        aria-label="Open command search palette"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Quick Search...</span>
        <kbd className="hidden rounded bg-white/20 px-1.5 py-0.5 text-[0.65rem] font-mono text-white/90 lg:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
              onKeyDown={handleListKeyDown}
            >
              {/* Input header */}
              <div className="flex items-center border-b border-gray-100 px-4 py-3">
                <Search className="mr-3 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search products, rates, tools, branches..."
                  className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results list */}
              <div className="max-h-[360px] overflow-y-auto p-2">
                {filtered.length > 0 ? (
                  <div className="space-y-1">
                    {filtered.map((item, idx) => {
                      const Icon = item.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => navigateTo(item.href)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors ${
                            isSelected ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold leading-tight">{item.title}</p>
                              <span className="text-[11px] text-gray-400">{item.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-bold text-secondary-800">
                                {item.badge}
                              </span>
                            )}
                            <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? "translate-x-0.5 text-primary-600" : "opacity-0"}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-400">
                    No matching pages found for &quot;{query}&quot;.
                  </p>
                )}
              </div>

              {/* Footer navigation guide */}
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 text-[11px] text-gray-400">
                <div className="flex gap-3">
                  <span><kbd className="rounded border bg-white px-1 font-mono">↑↓</kbd> Navigate</span>
                  <span><kbd className="rounded border bg-white px-1 font-mono">↵</kbd> Select</span>
                  <span><kbd className="rounded border bg-white px-1 font-mono">esc</kbd> Close</span>
                </div>
                <span>Reliance Finance Search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

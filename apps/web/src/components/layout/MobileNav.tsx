"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Phone, Mail, UserPlus } from "lucide-react";
import { localize } from "@/lib/localize";

interface NavItemData {
  id: number;
  label: string;
  href: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  description: string | null;
  isOpenInNewTab: boolean;
  children: NavItemData[];
}

interface MobileNavProps {
  items: NavItemData[];
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

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function MobileNav({ items, lang, isOpen, onClose }: MobileNavProps) {
  const isNp = lang === "np";

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
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[999] flex w-[310px] max-w-[88vw] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link href={`/${lang}`} onClick={onClose}>
                <img src="/assets/logo.png" alt="RFL" className="h-8 w-auto" />
              </Link>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-0.5">
                {items.map((item, i) => (
                  <motion.div key={item.id} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <MobileNavItem item={item} lang={lang} onClose={onClose} depth={0} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              <Link
                href={localize("/open-account", lang)}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-500 py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all hover:bg-secondary-400"
              >
                <UserPlus className="h-4 w-4" />
                {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
              </Link>
              <div className="flex gap-4 text-xs text-gray-500">
                <a href="tel:+977015361104" className="flex items-center gap-1.5 hover:text-primary-600">
                  <Phone className="h-3.5 w-3.5" /> +977–01–5361104
                </a>
                <a href="mailto:info@reliancenepal.com.np" className="flex items-center gap-1.5 hover:text-primary-600">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileNavItem({
  item, lang, onClose, depth,
}: {
  item: NavItemData;
  lang: string;
  onClose: () => void;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => !prev);
  }, []);

  if (item.isOpenInNewTab) {
    return (
      <a
        href={item.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {item.label}
      </a>
    );
  }

  if (!hasChildren) {
    return (
      <Link
        href={item.href ? localize(item.href, lang) : "#"}
        onClick={onClose}
        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-700"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={toggleExpand}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <span>{item.label}</span>
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
              {item.children.map((child) => (
                <MobileNavItem key={child.id} item={child} lang={lang} onClose={onClose} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

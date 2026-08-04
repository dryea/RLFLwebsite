"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, X, Search, Phone, Mail } from "lucide-react";
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

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function MobileNav({ items, lang, isOpen, onClose }: MobileNavProps) {
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
            className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[999] flex w-[320px] max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <Link href={`/${lang}`} onClick={onClose} className="flex items-center gap-2">
                <img src="/assets/logo.png" alt="RFL" className="h-8" />
              </Link>
              <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {items.map((item, i) => (
                  <motion.div key={item.id} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <MobileNavItem item={item} lang={lang} onClose={onClose} depth={0} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t px-5 py-4 space-y-3">
              <a href="tel:+977015361104" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700">
                <Phone className="h-4 w-4" /> +977–01–5361104
              </a>
              <a href="mailto:info@reliancenepal.com.np" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700">
                <Mail className="h-4 w-4" /> info@reliancenepal.com.np
              </a>
              <Link
                href={localize("/loan-enquiry", lang)}
                onClick={onClose}
                className="block w-full rounded-lg bg-primary-700 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-800"
              >
                Loan Enquiry
              </Link>
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
        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="rounded-lg">
      <button
        onClick={toggleExpand}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
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
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className={`space-y-0.5 ${depth === 0 ? "ml-4 border-l-2 border-primary-100 pl-2" : ""}`}>
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

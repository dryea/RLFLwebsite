"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
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

interface MegaMenuProps {
  items: NavItemData[];
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

function MegaMenuItem({ item, lang }: { item: NavItemData; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.children && item.children.length > 0;

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 120);
  }, []);

  // Keyboard support
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
          className="flex items-center gap-1 rounded-lg px-3.5 py-2 font-heading text-sm font-medium text-text-primary transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
        >
          {item.label}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      );
    }
    return (
      <Link
        href={item.href ? localize(item.href, lang) : "#"}
        className="rounded-lg px-3.5 py-2 font-heading text-sm font-medium text-text-primary transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
      >
        {item.label}
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
        href={item.href ? localize(item.href, lang) : "#"}
        className={`flex items-center gap-1 rounded-lg px-3.5 py-2 font-heading text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "bg-primary-50 text-primary-600"
            : "text-text-primary hover:bg-primary-50 hover:text-primary-600"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </Link>

      {/* Active indicator bar */}
      {isOpen && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-full z-50 mt-2"
            style={{ minWidth: item.children.some((c) => c.description || c.imageUrl) ? "480px" : "220px" }}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
              {item.children.some((c) => c.description || c.imageUrl) ? (
                <MegaPanel items={item.children} lang={lang} />
              ) : (
                <SimpleDropdown items={item.children} lang={lang} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SimpleDropdown({ items, lang }: { items: NavItemData[]; lang: string }) {
  return (
    <div className="p-2">
      {items.map((child) =>
        child.isOpenInNewTab ? (
          <a
            key={child.id}
            href={child.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary-600"
          >
            {child.label}
            <ExternalLink className="h-3 w-3 opacity-50" />
          </a>
        ) : (
          <Link
            key={child.id}
            href={child.href ? localize(child.href, lang) : "#"}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary-600"
          >
            {child.label}
          </Link>
        )
      )}
    </div>
  );
}

function MegaPanel({ items, lang }: { items: NavItemData[]; lang: string }) {
  const featured = items.find((c) => c.imageUrl);
  const links = featured ? items.filter((c) => c.id !== featured.id) : items;

  return (
    <div className="flex">
      <div className="flex-1 p-3">
        <div className="grid grid-cols-2 gap-1">
          {links.map((child) => (
            <Link
              key={child.id}
              href={child.href ? localize(child.href, lang) : "#"}
              className="group/link flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary-50"
            >
              {child.imageUrl && (
                <img
                  src={child.imageUrl}
                  alt={child.imageAlt || child.label}
                  className="h-9 w-9 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 transition-colors group-hover/link:text-primary-600">
                  {child.label}
                </p>
                {child.description && (
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500 line-clamp-2">
                    {child.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {featured && (
        <div className="w-[176px] border-l border-gray-100 bg-gradient-to-b from-primary-50 to-white p-4">
          <img
            src={featured.imageUrl!}
            alt={featured.imageAlt || featured.label}
            className="mb-3 h-24 w-full rounded-xl object-cover"
          />
          <p className="text-sm font-semibold text-gray-900">{featured.label}</p>
          {featured.description && (
            <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-3">{featured.description}</p>
          )}
          {featured.href && (
            <Link
              href={localize(featured.href, lang)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Learn more →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

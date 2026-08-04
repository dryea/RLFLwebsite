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
    <nav className="hidden items-center gap-1 lg:flex">
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

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!hasChildren) {
    if (item.isOpenInNewTab) {
      return (
        <a
          href={item.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-md px-3 py-2.5 font-heading text-sm font-medium text-text-primary transition-colors hover:bg-primary-50 hover:text-primary-500"
        >
          {item.label}
          <ExternalLink className="h-3 w-3" />
        </a>
      );
    }
    return (
      <Link
        href={item.href ? localize(item.href, lang) : "#"}
        className="flex items-center gap-1 rounded-md px-3 py-2.5 font-heading text-sm font-medium text-text-primary transition-colors hover:bg-primary-50 hover:text-primary-500"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href ? localize(item.href, lang) : "#"}
        className={`flex items-center gap-1 rounded-md px-3 py-2.5 font-heading text-sm font-medium transition-colors ${
          isOpen ? "bg-primary-50 text-primary-500" : "text-text-primary hover:bg-primary-50 hover:text-primary-500"
        }`}
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-full z-50 mt-1"
            style={{ minWidth: item.children.some(c => c.description || c.imageUrl) ? "480px" : "240px" }}
          >
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl">
              {item.children.some(c => c.description || c.imageUrl) ? (
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
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary-500"
          >
            {child.label}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <Link
            key={child.id}
            href={child.href ? localize(child.href, lang) : "#"}
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50 hover:text-primary-500"
          >
            {child.label}
          </Link>
        )
      )}
    </div>
  );
}

function MegaPanel({ items, lang }: { items: NavItemData[]; lang: string }) {
  const featured = items.find(c => c.imageUrl);
  const links = featured ? items.filter(c => c.id !== featured.id) : items;

  return (
    <div className="flex">
      <div className="flex-1 p-3">
        <div className="grid grid-cols-2 gap-1">
          {links.map((child) => (
            <Link
              key={child.id}
              href={child.href ? localize(child.href, lang) : "#"}
              className="group/link flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary-50"
            >
              {child.imageUrl && (
                <img
                  src={child.imageUrl}
                  alt={child.imageAlt || child.label}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover/link:text-primary-600">{child.label}</p>
                {child.description && (
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{child.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {featured && (
        <div className="w-[180px] border-l border-gray-100 bg-gray-50 p-4">
          <img
            src={featured.imageUrl!}
            alt={featured.imageAlt || featured.label}
            className="mb-3 h-24 w-full rounded-lg object-cover"
          />
          <p className="text-sm font-semibold text-gray-900">{featured.label}</p>
          {featured.description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-3">{featured.description}</p>
          )}
          {featured.href && (
            <Link
              href={localize(featured.href, lang)}
              className="mt-3 inline-block text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Learn more →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

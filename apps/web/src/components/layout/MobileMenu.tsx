"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { mainNav, type NavItem } from "@/lib/navigation";

function MobileNavList({ items, depth = 0 }: { items: NavItem[]; depth?: number }) {
  const lang = useLang();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <ul className={depth > 0 ? "ml-4 border-l border-gray-200 pl-3" : ""}>
      {items.map((item) => {
        const key = item.href || item.label;
        const label = lang === "en" ? item.label : (item.labelNp ?? item.label);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <li key={key}>
            {hasChildren ? (
              <div>
                <button
                  onClick={() => toggle(key)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:text-primary-700"
                >
                  <span className={depth > 0 ? "font-normal" : ""}>{label}</span>
                  {expanded.has(key) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expanded.has(key) && (
                  <MobileNavList items={item.children!} depth={depth + 1} />
                )}
              </div>
            ) : (
              <Link
                href={item.href || "#"}
                className="flex px-4 py-3 text-sm text-gray-700 transition-colors hover:text-primary-700"
              >
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const lang = useLang();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-gray-800"
        aria-label={lang === "en" ? "Open menu" : "मेनु खोल्नुहोस्"}
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="w-80 max-w-[85vw] overflow-y-auto bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
              <span className="text-sm font-semibold text-gray-500">
                {lang === "en" ? "Menu" : "मेनु"}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <MobileNavList items={mainNav} />
          </div>
        </div>
      )}
    </div>
  );
}

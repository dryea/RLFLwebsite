"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function SearchOverlay() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="transition-opacity hover:opacity-80"
        aria-label={lang === "en" ? "Search" : "खोजी गर्नुहोस्"}
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm">
      <div className="w-full max-w-2xl px-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "en" ? "Search..." : "खोजी गर्नुहोस्..."}
            className="w-full rounded-xl border-0 bg-white py-4 pl-12 pr-12 text-lg shadow-2xl outline-none ring-0"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label={lang === "en" ? "Close search" : "खोजी बन्द गर्नुहोस्"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-white/70">
          {lang === "en" ? "Press Esc to close" : "बन्द गर्न Esc थिच्नुहोस्"}
        </p>
      </div>
    </div>
  );
}

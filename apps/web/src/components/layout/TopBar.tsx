"use client";

import { Phone, Mail, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { topBarLinks } from "@/lib/navigation";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import SearchOverlay from "@/components/shared/SearchOverlay";
import { useState } from "react";

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { en: string; href: string; external?: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const lang = useLang();

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm transition-opacity hover:opacity-80"
      >
        {label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <ul className="absolute right-0 top-full z-50 min-w-48 rounded-lg border bg-white py-2 shadow-lg">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-700"
              >
                {lang === "en" ? item.en : (item as any).np || item.en}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TopBar() {
  const lang = useLang();
  const t = topBarLinks;

  return (
    <div className="bg-primary-700 text-white">
      <div className="container-page flex items-center justify-between py-2">
        <div className="flex items-center gap-4 text-sm">
          <a href={`tel:${t.phone.replace(/[^0-9]/g, "")}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <Phone className="h-3.5 w-3.5" />
            <span>{t.phone}</span>
          </a>
          <a href={`mailto:${t.email}`} className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 md:flex">
            <Mail className="h-3.5 w-3.5" />
            <span>{t.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={t.loanEnquiry.href}
            className="mr-2 rounded bg-accent-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {lang === "en" ? t.loanEnquiry.en : t.loanEnquiry.np}
          </a>

          <ul className="hidden items-center gap-3 lg:flex">
            <Dropdown
              label={lang === "en" ? t.grievance.label.en : t.grievance.label.np}
              items={t.grievance.items}
            />
            <Dropdown
              label={lang === "en" ? t.quickLinks.label.en : t.quickLinks.label.np}
              items={t.quickLinks.items}
            />
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-opacity hover:opacity-80"
                >
                  {lang === "en" ? link.en : link.np}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <SearchOverlay />
          </div>
        </div>
      </div>
    </div>
  );
}

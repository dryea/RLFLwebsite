"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { mainNav, type NavItem } from "@/lib/navigation";
import Image from "next/image";

function NavDropdown({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const label = lang === "en" ? item.label : (item.labelNp ?? item.label);
  const isMega = depth === 0 && item.children && item.children.length > 8;

  if (!item.children) {
    return (
      <li className="nav-item">
        <Link
          href={item.href || "#"}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-primary-700"
        >
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="nav-item relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href || "#"}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-primary-700"
      >
        {label}
        <ChevronDown className="h-3 w-3" />
      </Link>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 rounded-lg border bg-white py-2 shadow-lg ${
            isMega ? "w-[700px]" : "min-w-52"
          }`}
        >
          <div className={isMega ? "grid grid-cols-3 gap-0" : ""}>
            {item.children.map((child) => (
              <div key={child.href || child.label} className="relative group/sub">
                {child.children ? (
                  <>
                    <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-500">
                      {lang === "en" ? child.label : (child.labelNp ?? child.label)}
                      <ChevronDown className="h-3 w-3 -rotate-90" />
                    </div>
                    <div className="border-t border-gray-100">
                      {child.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href || "#"}
                          className="block px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-700"
                        >
                          {lang === "en" ? sub.label : (sub.labelNp ?? sub.label)}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={child.href || "#"}
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-700"
                  >
                    {lang === "en" ? child.label : (child.labelNp ?? child.label)}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default function MainNav() {
  const lang = useLang();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center">
        {mainNav.map((item) => (
          <NavDropdown key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  );
}

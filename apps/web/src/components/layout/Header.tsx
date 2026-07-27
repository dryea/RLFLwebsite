"use client";

import Link from "next/link";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import MobileMenu from "./MobileMenu";
import { Calendar } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Header() {
  const lang = useLang();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBar />

      <div className="container-page">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://reliancenepal.com.np/assets/images/reliance/logo.png"
              alt="Reliance Finance Limited"
              className="h-10 w-auto"
            />
          </Link>

          <MainNav />

          <div className="flex items-center gap-2">
            <a
              href="/calendar"
              className="hidden items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-700 md:flex"
            >
              <Calendar className="h-4 w-4" />
              <span>{lang === "en" ? "Calendar" : "पात्रो"}</span>
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

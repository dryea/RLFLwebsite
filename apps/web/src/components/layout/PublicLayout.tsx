"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";

export default function PublicLayout({ children, lang = "en" }: { children: React.ReactNode; lang?: string }) {
  return (
    <LanguageProvider lang={lang as "en" | "np"}>
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}

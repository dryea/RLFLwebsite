"use client";

import { createContext, useContext } from "react";

export type Lang = "en" | "np";

const LanguageContext = createContext<Lang>("en");

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  );
}

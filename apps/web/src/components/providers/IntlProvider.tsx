"use client";

import { NextIntlClientProvider } from "next-intl";
import { LanguageProvider, type Lang } from "@/contexts/LanguageContext";

export default function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: Lang;
  messages: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider lang={locale}>
        {children}
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}

import type { Metadata } from "next";
import { LanguageProvider, type Lang } from "@/contexts/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import CookieConsent from "@/components/shared/CookieConsent";
import AccessibilityToolbar from "@/components/shared/AccessibilityToolbar";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "np" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: {
      template: "%s | Reliance Finance Limited",
      default: "Reliance Finance Limited",
    },
    description: "Reliance Finance Limited — a trusted C-class finance company in Nepal offering savings, loans, fixed deposits, and banking services.",
    alternates: {
      canonical: `https://reliancenepal.com.np/${lang}`,
      languages: {
        "en": "https://reliancenepal.com.np/en",
        "ne": "https://reliancenepal.com.np/np",
        "x-default": "https://reliancenepal.com.np/en",
      } as Record<string, string>,
    },
    openGraph: {
      siteName: "Reliance Finance Limited",
      locale: lang === "np" ? "ne_NP" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <LanguageProvider lang={lang as Lang}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Reliance Finance Limited",
        url: "https://reliancenepal.com.np",
        logo: "https://reliancenepal.com.np/logo.png",
        description: "Your trusted financial partner in Nepal",
        address: { "@type": "PostalAddress", addressCountry: "NP" },
      }} />
      <Header lang={lang} />
      <main id="main-content" className="flex-1">{children}</main>
      <CookieConsent />
      <Footer />
      <AccessibilityToolbar />
    </LanguageProvider>
  );
}

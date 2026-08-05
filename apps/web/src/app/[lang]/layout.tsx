import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import CookieConsent from "@/components/shared/CookieConsent";
import AccessibilityToolbar from "@/components/shared/AccessibilityToolbar";
import IntlProvider from "@/components/providers/IntlProvider";
import Analytics from "@/components/shared/Analytics";
import ChatWidget from "@/components/shared/ChatWidget";
import BackToTop from "@/components/shared/BackToTop";
import RouteProgress from "@/components/shared/RouteProgress";
import { getSeoSettings } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "np" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const seo = await getSeoSettings();
  const siteUrl = seo.siteUrl || "https://reliancenepal.com.np";
  const siteTitle = seo.siteTitle || "Reliance Finance Limited";
  const template = seo.defaultTitleTemplate || "%s | Reliance Finance Limited";
  const defaultDescription =
    seo.defaultDescription ||
    "Reliance Finance Limited — a trusted C-class finance company in Nepal offering savings, loans, fixed deposits, and banking services.";

  return {
    title: { template, default: siteTitle },
    description: defaultDescription,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        "en": `${siteUrl}/en`,
        "ne": `${siteUrl}/np`,
        "x-default": `${siteUrl}/en`,
      } as Record<string, string>,
    },
    openGraph: {
      siteName: siteTitle,
      locale: lang === "np" ? "ne_NP" : "en_US",
      type: "website",
      ...(seo.ogImage
        ? { images: [{ url: seo.ogImage }] }
        : { images: [{ url: "https://rfil-web.sudeepdhakal.workers.dev/og-image.png", width: 1200, height: 630, alt: siteTitle }] }),
    },
    twitter: {
      card: (seo.twitterCardType as any) || "summary_large_image",
      ...(seo.ogImage ? { images: [seo.ogImage] } : { images: ["https://rfil-web.sudeepdhakal.workers.dev/og-image.png"] }),
    },
    robots: {
      index: seo.robotsIndex !== false,
      follow: seo.robotsFollow !== false,
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
  const messages = await getMessages();
  const seo = await getSeoSettings();

  const siteUrl = seo.siteUrl || "https://reliancenepal.com.np";
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": seo.schemaOrgType || "Organization",
    name: seo.schemaOrgName || "Reliance Finance Limited",
    url: siteUrl,
    logo: seo.schemaOrgLogo || `${siteUrl}/logo.png`,
    description: seo.tagline || "Your trusted financial partner in Nepal",
    ...(seo.schemaOrgAddress ? { address: { "@type": "PostalAddress", streetAddress: seo.schemaOrgAddress, addressCountry: "NP" } } : {}),
    ...(seo.schemaOrgPhone ? { telephone: seo.schemaOrgPhone } : {}),
    ...(seo.schemaOrgEmail ? { email: seo.schemaOrgEmail } : {}),
    sameAs: [seo.socialFacebook, seo.socialTwitter, seo.socialLinkedIn, seo.socialInstagram, seo.socialYouTube].filter(Boolean),
  };

  return (
    <IntlProvider locale={lang as "en" | "np"} messages={messages}>
      <RouteProgress />
      <JsonLd data={orgSchema} />
      <Header lang={lang} />
      <main id="main-content" className="flex-1">{children}</main>
      <CookieConsent />
      <Footer />
      <AccessibilityToolbar />
      <Analytics />
      <ChatWidget lang={lang} />
      <BackToTop />
    </IntlProvider>
  );
}

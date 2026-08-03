"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import {
  footerColumns,
  footerAboutLinks,
  footerServices,
  footerContact,
  socialLinks,
} from "@/lib/navigation";
import NewsletterForm from "@/components/shared/NewsletterForm";

// Routes that exist at root level (tool pages), not under /[lang]
const ROOT_ROUTES = [
  "/services", "/branches", "/careers", "/contact", "/faq", "/gallery",
  "/downloads", "/emi-calculator", "/loan-enquiry", "/calendar", "/search",
  "/banking-hours", "/auction-notice", "/merchant-offers", "/partner", "/write-to-us",
];

function localize(href: string, lang: string) {
  if (href.startsWith("http")) return href;
  if (href.startsWith("/api")) return href;
  const rootMatch = ROOT_ROUTES.find((r) => href === r || href.startsWith(`${r}/`));
  if (rootMatch) return href;
  return `/${lang}${href}`;
}

function FooterLink({ href, label, external, lang }: { href: string; label: string; external?: boolean; lang: string }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
      >
        {label}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  return (
    <Link
      href={localize(href, lang)}
      className="text-sm text-gray-400 transition-colors hover:text-white"
    >
      {label}
    </Link>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { en: string; np: string; href: string; external?: boolean }[];
}) {
  const lang = useLang();
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink
              href={link.href}
              label={lang === "en" ? link.en : link.np}
              external={link.external}
              lang={lang}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const socialIconPaths: Record<string, string> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15V9l6 3-6 3z",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm-5 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm5-9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
};

export default function Footer() {
  const lang = useLang();
  const c = footerContact;

  return (
    <footer className="bg-[#111827] text-gray-400">
      <div className="container-page py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((col) => (
            <FooterLinkColumn
              key={col.title.en}
              title={lang === "en" ? col.title.en : col.title.np}
              links={col.links}
            />
          ))}
          <FooterLinkColumn
            title={lang === "en" ? footerAboutLinks.title.en : footerAboutLinks.title.np}
            links={footerAboutLinks.links}
          />
          <FooterLinkColumn
            title={lang === "en" ? footerServices.title.en : footerServices.title.np}
            links={footerServices.links}
          />
        </div>

        <div className="mt-10 grid gap-8 border-t border-gray-700/50 pt-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {lang === "en" ? c.title.en : c.title.np}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span>{lang === "en" ? c.address.en : c.address.np}</span>
              </li>
              <li>
                <a href={`tel:${c.phone.replace(/[^0-9]/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {c.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {c.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {lang === "en" ? "Follow Us" : "हामीलाई पछ्याउनुहोस्"}
            </h3>
            <div className="mb-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white"
                  aria-label={s.name}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={socialIconPaths[s.icon] || ""} />
                  </svg>
                </a>
              ))}
            </div>

            <NewsletterForm />
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {lang === "en" ? "Mobile App" : "मोबाइल एप"}
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              {lang === "en" ? "Download the RFL Smart app for convenient mobile banking." : "सुविधाजनक मोबाइल बैंकिङको लागि RFL Smart एप डाउनलोड गर्नुहोस्।"}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.rfl.smart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm text-white transition-colors hover:bg-primary-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 12.88l-4.463-4.462-2.073 2.074 3.416 3.416-3.416 3.416 2.073 2.074 4.463-4.462a.586.586 0 0 0 0-.826zM5.578 6.443a.61.61 0 0 0-.61.61v9.895a.61.61 0 0 0 .61.61.63.63 0 0 0 .433-.18l4.734-4.734-4.734-4.734a.613.613 0 0 0-.433-.18z" />
              </svg>
              <span>{lang === "en" ? "Download for Android" : "एन्ड्रोइडको लागि डाउनलोड गर्नुहोस्"}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700/50">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-gray-500 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Reliance Finance Limited. {lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}</span>
          <div className="flex gap-4">
            <Link href={`/${lang}/about/privacy-policy`} className="transition-colors hover:text-white">{lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}</Link>
            <Link href={`/${lang}/faq`} className="transition-colors hover:text-white">{lang === "en" ? "FAQ" : "प्रायः सोधिने प्रश्न"}</Link>
            <Link href={`/${lang}/sitemap`} className="transition-colors hover:text-white">{lang === "en" ? "Sitemap" : "साइट नक्सा"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

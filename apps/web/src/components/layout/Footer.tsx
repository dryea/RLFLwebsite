"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, Inbox, Apple } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import {
  footerColumns,
  footerAboutLinks,
  footerServices,
  footerContact,
  socialLinks,
} from "@/lib/navigation";
import { localize } from "@/lib/localize";
import NewsletterForm from "@/components/shared/NewsletterForm";

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
  viber: "M15.9 2.4C11.7 1.6 7.9 2.1 4.9 4.5c-1.9 1.5-3 3.6-3.3 6.1-.3 2.4.3 4.8 1.6 6.7v.2l-.5 3.6c0 .2.1.3.3.3.1 0 .2-.1.3-.1l2.9-1.7h.1c1.6.6 3.3.9 4.9.9 1.3 0 2.6-.2 3.9-.5 2.8-.8 5.2-2.4 6.9-4.6 1.8-2.3 2.6-5.2 2.1-8-.4-2.8-1.8-4.9-4.2-6.3-.7-.4-1.5-.7-2.5-.9zM6.2 14.8c-.2-.3-.3-.7-.4-1-.2-.5-.3-.9-.4-1.4-.1-.8 0-1.6.2-2.4.2-.6.5-1.2.9-1.8 1.6-2.1 4.2-3.2 7.1-2.9 1.2.1 2.3.5 3.3 1.1 1.6 1 2.7 2.6 2.9 4.5.1 1-.1 2-.6 2.9-.6 1.1-1.4 2.1-2.4 2.9-.9.8-2 1.4-3.1 1.9-1.2.5-2.4.7-3.6.7-.7 0-1.4-.1-2.1-.2-.5-.1-1-.3-1.5-.4h-.1c-.3-.1-.5.1-.6.4l-.2.9c-.1.1-.2.2-.4.2-.2 0-.3-.2-.3-.4l-.1-.4c-.1-.3-.1-.5-.2-.7zm3.5-6.5c-.3 0-.6.2-.6.5s.2.6.5.7c1.1.3 2.1.9 2.9 1.7.8.8 1.3 1.8 1.6 2.9 0 .3.3.5.6.5.1 0 .3-.1.4-.2.1-.3 0-.5-.2-.7-1.7-2.2-4.4-3.3-4.8-3.4-.1 0-.3-.1-.4-.1zm2.9.6c-.4.1-.6.4-.6.8 0 .3.3.6.6.6 1.1.2 2 .8 2.7 1.7.6.8 1 1.7 1 2.7 0 .3.2.6.5.6.3 0 .6-.2.6-.5.1-.1.1-.3 0-.4-.1-1.2-.5-2.3-1.2-3.3-.9-1.2-2.2-2-3.6-2.2zm2.9-.1c-.4 0-.7.3-.7.7 0 .4.3.6.6.6.8.1 1.5.4 2.1.9.6.5 1 1.2 1.1 2 0 .3.2.6.5.6.4 0 .7-.2.7-.6 0-.1 0-.2-.1-.3-.1-1.2-.6-2.3-1.4-3.2-.7-.7-1.6-1.2-2.6-1.4-.2 0-.3 0-.3 0z",
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
              {c.phones.map((p, i) => (
                <li key={i}>
                  <a href={`tel:${p.replace(/[^0-9]/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-white">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span>
                  {lang === "en" ? "Toll-Free: " : "टोल-फ्रि: "}
                  {c.tollFree}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Inbox className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span>{lang === "en" ? "PO Box: " : "हुलाक बाकस: "}{c.poBox}</span>
              </li>
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {c.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${c.feedbackEmail}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {c.feedbackEmail}
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
            <div className="flex flex-col gap-2">
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
              <a
                href="https://apps.apple.com/np/app/reliance-finance-smart/id1554035637"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm text-white transition-colors hover:bg-primary-600"
              >
                <Apple className="h-5 w-5" />
                <span>{lang === "en" ? "Download for iOS" : "आईओएसको लागि डाउनलोड गर्नुहोस्"}</span>
              </a>
            </div>
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

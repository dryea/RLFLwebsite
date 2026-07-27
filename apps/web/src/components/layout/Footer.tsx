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

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
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
      href={href}
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const lang = useLang();
  const c = footerContact;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Report, Media, Rates, EMI columns */}
          {footerColumns.map((col) => (
            <FooterLinkColumn
              key={col.title.en}
              title={lang === "en" ? col.title.en : col.title.np}
              links={col.links}
            />
          ))}

          {/* About */}
          <FooterLinkColumn
            title={lang === "en" ? footerAboutLinks.title.en : footerAboutLinks.title.np}
            links={footerAboutLinks.links}
          />

          {/* Services */}
          <FooterLinkColumn
            title={lang === "en" ? footerServices.title.en : footerServices.title.np}
            links={footerServices.links}
          />
        </div>

        {/* Contact & Social */}
        <div className="mt-10 grid gap-8 border-t border-gray-800 pt-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {lang === "en" ? c.title.en : c.title.np}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-700 hover:text-white"
                  aria-label={s.name}
                >
                  <span className="text-xs font-bold">{s.name.charAt(0)}</span>
                </a>
              ))}
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {lang === "en" ? "Mobile App" : "मोबाइल एप"}
            </h3>
            <a
              href="https://play.google.com/store/apps/details?id=com.rfl.smart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-700"
            >
              <span>{lang === "en" ? "Download App" : "एप डाउनलोड गर्नुहोस्"}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="container-page text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Reliance Finance Limited.{" "}
          {lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}
        </div>
      </div>
    </footer>
  );
}

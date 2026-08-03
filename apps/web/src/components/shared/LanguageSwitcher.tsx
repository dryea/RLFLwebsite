"use client";

import { useLang } from "@/contexts/LanguageContext";
import { usePathname } from "next/navigation";

// Tool pages that exist at root level (no /[lang] prefix in source, but will render under /en/ and /np/)
// When on a root path like /services, we switch to /en/services or /np/services.
function buildSwitchPath(pathname: string, current: string, target: string): string {
  const hasLangPrefix = /^\/(en|np)(\/|$)/.test(pathname);
  if (hasLangPrefix) {
    // Already prefixed — swap the language segment
    return pathname.replace(/^\/(en|np)/, `/${target}`);
  }
  // Root path (e.g. /services, /emi-calculator) — prepend the target language
  return `/${target}${pathname === "/" ? "" : pathname}`;
}

export default function LanguageSwitcher() {
  const lang = useLang();
  const pathname = usePathname() || "/";

  const switchTo = lang === "en" ? "np" : "en";
  const label = lang === "en" ? "नेपाली" : "English";
  const newPath = buildSwitchPath(pathname, lang, switchTo);

  return (
    <a
      href={newPath}
      className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
      title={switchTo === "en" ? "Switch to English" : "नेपालीमा स्विच गर्नुहोस्"}
    >
      <span className="inline-block h-4 w-6 overflow-hidden rounded">
        <img
          src={
            switchTo === "en"
              ? "https://reliancenepal.com.np/assets/images/reliance/en_flag.png"
              : "https://reliancenepal.com.np/assets/images/reliance/nep_flag.png"
          }
          alt={switchTo === "en" ? "English flag" : "नेपाली झण्डा"}
          width={24}
          height={16}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </span>
      {label}
    </a>
  );
}

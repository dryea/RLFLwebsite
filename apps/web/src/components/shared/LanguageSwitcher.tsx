"use client";

import { useLang } from "@/contexts/LanguageContext";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const lang = useLang();
  const pathname = usePathname();

  const switchTo = lang === "en" ? "np" : "en";
  const label = lang === "en" ? "नेपाली" : "English";
  const newPath = pathname.replace(/^\/(en|np)\//, `/${switchTo}/`);

  return (
    <a
      href={newPath}
      className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
    >
      <span className="inline-block h-4 w-6 overflow-hidden rounded">
        <img
          src={
            switchTo === "en"
              ? "https://reliancenepal.com.np/assets/images/reliance/en_flag.png"
              : "https://reliancenepal.com.np/assets/images/reliance/nep_flag.png"
          }
          alt=""
          className="h-full w-full object-cover"
        />
      </span>
      {label}
    </a>
  );
}

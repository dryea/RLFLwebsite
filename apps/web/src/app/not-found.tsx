"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ArrowLeft, Landmark } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();
  const isNp = pathname?.startsWith("/np") ?? false;
  const lang = isNp ? "np" : "en";

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-20 text-white">
      <div className="container-page text-center">
        <div className="mb-6 flex justify-center">
          <span className="text-[8rem] font-black leading-none text-white/10 md:text-[10rem]">404</span>
        </div>
        <div className="-mt-10">
          <Landmark className="mx-auto mb-4 h-12 w-12 text-secondary-500" />
          <h1 className="text-3xl font-bold md:text-4xl">
            {isNp ? "पृष्ठ फेला परेन" : "Page Not Found"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/70">
            {isNp
              ? "तपाईंले खोज्नुभएको पृष्ठ अवस्थित छैन वा सारिएको हुन सक्छ।"
              : "The page you're looking for doesn't exist or may have been moved."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${lang}`} className="inline-flex items-center gap-2 rounded-xl bg-secondary-500 px-6 py-3 font-semibold text-gray-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-secondary-400">
              <Home className="h-4 w-4" /> {isNp ? "गृहपृष्ठमा फर्कनुहोस्" : "Back to Home"}
            </Link>
            <Link href={`/${lang}/search`} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/20">
              <Search className="h-4 w-4" /> {isNp ? "खोज्नुहोस्" : "Search the Site"}
            </Link>
            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" /> {isNp ? "सम्पर्क गर्नुहोस्" : "Contact Us"}
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { label: isNp ? "उत्पादनहरू" : "Products", href: "/products" },
              { label: isNp ? "दरहरू" : "Rates", href: "/rates" },
              { label: isNp ? "शाखाहरू" : "Branches", href: "/branches" },
            ].map((l) => (
              <Link key={l.href} href={`/${lang}${l.href}`} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white/15">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

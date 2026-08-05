"use client";

import Link from "next/link";
import { useABTest } from "@/hooks/useABTest";

interface ABVariant {
  label: string;
  href: string;
  className?: string;
}

/**
 * A/B-tested call-to-action button.
 * Assigns a sticky 50/50 variant and tracks impressions + conversions.
 */
export default function ABButton({
  name,
  variants,
}: {
  name: string;
  variants: [ABVariant, ABVariant];
}) {
  const { variant, trackConversion } = useABTest(name);
  const v = variant === "b" ? variants[1] : variants[0];
  const isExternal = v.href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={v.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackConversion}
        className={
          v.className ||
          "inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary-800"
        }
      >
        {v.label}
      </a>
    );
  }

  return (
    <Link
      href={v.href}
      onClick={trackConversion}
      className={
        v.className ||
        "inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary-800"
      }
    >
      {v.label}
    </Link>
  );
}

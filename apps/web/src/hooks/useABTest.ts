"use client";

import { useEffect, useState, useCallback } from "react";
import { trackEvent } from "@/components/shared/Analytics";

/**
 * Lightweight A/B test hook.
 * Assigns a sticky variant (50/50) per user in sessionStorage.
 * Tracks impressions and conversions to the analytics endpoint.
 */
export function useABTest(name: string, variants: string[] = ["a", "b"]): {
  variant: string;
  trackConversion: () => void;
} {
  const [variant, setVariant] = useState<string>("a");

  useEffect(() => {
    const key = `ab_${name}`;
    let v = sessionStorage.getItem(key);
    if (!v) {
      const idx = Math.random() < 0.5 ? 0 : 1;
      v = variants[idx] || "a";
      sessionStorage.setItem(key, v);
    }
    setVariant(v);
    // Track impression
    trackEvent("ab_impression", `${name}:${v}`);
  }, [name, variants]);

  const trackConversion = useCallback(() => {
    trackEvent("ab_conversion", `${name}:${variant}`);
  }, [name, variant]);

  return { variant, trackConversion };
}

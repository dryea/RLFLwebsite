"use client";

import { useEffect, useState } from "react";

/**
 * Subtle parallax: returns a translateY offset based on the element's
 * scroll position relative to the viewport. Disabled on reduced motion.
 */
export function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.25): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Only parallax while the hero is near/above the top
      const progress = Math.max(-1, Math.min(1, (vh - rect.top) / vh));
      setOffset(progress * speed * 100);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, speed]);

  return offset;
}

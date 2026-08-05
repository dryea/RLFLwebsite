"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Top route progress bar (like YouTube/Medium) — gives a smooth
 * "page transition" feel during client-side navigation.
 * Starts on route change, completes after a short delay.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const route = `${pathname}${searchParams?.toString() || ""}`;

  useEffect(() => {
    // Start the bar
    setVisible(true);
    setProgress(15);
    // Animate to ~90%, then finish
    timer.current = setTimeout(() => setProgress(90), 150);
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 600);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      clearTimeout(finish);
    };
  }, [route]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-0 top-0 z-[99999] h-0.5 bg-secondary-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ boxShadow: "0 0 8px rgba(242,169,0,0.6)" }}
        />
      )}
    </AnimatePresence>
  );
}

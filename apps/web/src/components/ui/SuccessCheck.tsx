"use client";

import { motion } from "framer-motion";

/**
 * Animated success checkmark (SVG path draw + spring pop).
 * Used on form submission success states.
 */
export default function SuccessCheck({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 12, stiffness: 200 }}
      className="mx-auto mb-5 flex items-center justify-center rounded-full bg-green-100"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 52 52" fill="none">
        <motion.path
          d="M14 27 L23 36 L38 18"
          stroke="#16a34a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

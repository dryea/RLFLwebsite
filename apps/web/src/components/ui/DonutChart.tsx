"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated donut chart (SVG). Animates the arc when scrolled into view.
 */
interface DonutChartProps {
  /** segments as percentage values (0-100) */
  segments: { value: number; color: string; label?: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}

export default function DonutChart({
  segments,
  size = 160,
  thickness = 18,
  centerLabel,
  centerSub,
}: DonutChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;

  let cumulative = 0;
  const arcs = segments.map((seg) => {
    const start = cumulative / total;
    cumulative += seg.value;
    const end = cumulative / total;
    const dash = (end - start) * circumference;
    return { ...seg, start, end, dash };
  });

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={thickness}
        />
        {arcs.map((seg, i) => (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
            strokeDashoffset={circumference * (1 - seg.start)}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
            style={{ transition: "stroke-dashoffset 0.9s ease" }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {centerLabel && <span className="text-xl font-extrabold text-gray-900">{centerLabel}</span>}
        {centerSub && <span className="text-[11px] text-gray-500">{centerSub}</span>}
      </div>
    </div>
  );
}

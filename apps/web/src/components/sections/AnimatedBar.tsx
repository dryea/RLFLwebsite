"use client";

import { motion } from "framer-motion";

interface AnimatedBarProps {
  value: number;
  color: string;
  delay?: number;
}

export default function AnimatedBar({ value, color, delay = 0 }: AnimatedBarProps) {
  return (
    <motion.div
      className={`h-full rounded-full ${color}`}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

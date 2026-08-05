"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const blur: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 8 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0 },
};

const slideInUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

type AnimationType = "fadeUp" | "fadeIn" | "blur" | "slideInLeft" | "slideInRight" | "slideInUp" | "scaleIn";

const variantsMap: Record<AnimationType, Variants> = {
  fadeUp, fadeIn, blur, slideInLeft, slideInRight, slideInUp, scaleIn,
};

interface RevealProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  type = "fadeUp",
  delay = 0,
  duration = 0.55,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      variants={variantsMap[type]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

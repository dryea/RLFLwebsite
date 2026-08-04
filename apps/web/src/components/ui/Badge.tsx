"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral" | "gold";

const tones: Record<BadgeTone, string> = {
  primary: "bg-primary-50 text-primary-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-gray-100 text-gray-600",
  gold: "bg-secondary-100 text-secondary-800",
};

export function Badge({ children, tone = "primary", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Stat({ value, label, tone = "primary" }: { value: ReactNode; label: string; tone?: BadgeTone }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
      <div className={cn("font-heading text-3xl font-extrabold", tone === "gold" ? "text-secondary-500" : "text-primary-500")}>{value}</div>
      <div className="mt-1 text-sm font-medium text-gray-500">{label}</div>
    </div>
  );
}

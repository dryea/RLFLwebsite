"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
  secondary: "bg-secondary-500 text-slate-950 font-bold hover:bg-secondary-400 shadow-sm",
  accent: "bg-gradient-to-r from-secondary-400 to-secondary-500 text-slate-950 font-bold hover:from-secondary-300 hover:to-secondary-400 shadow-md shadow-secondary-900/20",
  outline: "border-2 border-primary-600 text-primary-700 hover:bg-primary-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const combinedCls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    fullWidth ? "w-full" : "",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedCls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedCls} {...props}>
      {children}
    </button>
  );
}

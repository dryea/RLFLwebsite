import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  children: React.ReactNode;
}

/**
 * Standardized Heading primitive supporting Inter and Devanagari typography scale.
 */
export function Heading({
  as: Component = "h2",
  size = "md",
  className,
  children,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    xs: "text-base font-bold",
    sm: "text-lg font-bold md:text-xl",
    md: "text-2xl font-bold md:text-3xl tracking-tight",
    lg: "text-3xl font-extrabold md:text-4xl tracking-tight",
    xl: "text-4xl font-extrabold md:text-5xl tracking-tight",
    "2xl": "text-5xl font-black md:text-6xl tracking-tight",
    "3xl": "text-6xl font-black md:text-7xl tracking-tight",
  };

  return (
    <Component
      className={cn("font-heading text-primary-950", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "muted" | "subtitle" | "caption";
  children: React.ReactNode;
}

/**
 * Standardized Text body primitive.
 */
export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  const variantClasses = {
    body: "text-base text-text-primary leading-relaxed",
    muted: "text-sm text-text-muted",
    subtitle: "text-lg text-text-secondary md:text-xl leading-relaxed",
    caption: "text-xs text-text-muted font-medium",
  };

  return (
    <p className={cn("font-body", variantClasses[variant], className)} {...props}>
      {children}
    </p>
  );
}

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "gold" | "emerald";
  children: React.ReactNode;
}

/**
 * High-impact gradient text typography helper.
 */
export function GradientText({
  variant = "brand",
  className,
  children,
  ...props
}: GradientTextProps) {
  const variantClasses = {
    brand: "gradient-text",
    gold: "gradient-text-gold",
    emerald: "gradient-text-emerald",
  };

  return (
    <span
      className={cn("font-heading font-extrabold", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

interface BadgeTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * Category/Product Badge title component.
 */
export function BadgeTitle({ className, children, ...props }: BadgeTitleProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-secondary-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-700 border border-secondary-500/30",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

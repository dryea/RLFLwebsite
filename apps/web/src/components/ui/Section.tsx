import React from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "surface" | "alt" | "primary" | "dark" | "glass";
  padding?: "none" | "sm" | "default" | "lg";
  containerSize?: "sm" | "default" | "lg" | "full" | "tight";
  badge?: string;
  title?: string;
  subtitle?: string;
  centerHeader?: boolean;
  children: React.ReactNode;
}

/**
 * Standardized Section wrapper primitive with brand background variations and integrated section headers.
 */
export default function Section({
  variant = "surface",
  padding = "default",
  containerSize = "default",
  badge,
  title,
  subtitle,
  centerHeader = true,
  className,
  children,
  ...props
}: SectionProps) {
  const variantClasses = {
    surface: "bg-surface text-text-primary",
    alt: "bg-surface-alt text-text-primary",
    primary: "bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white",
    dark: "bg-slate-950 text-white",
    glass: "glass-white border-y border-slate-200/60",
  };

  const paddingClasses = {
    none: "py-0",
    sm: "py-8 md:py-12",
    default: "py-16 md:py-20",
    lg: "py-20 md:py-28",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden transition-colors",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      <Container size={containerSize}>
        {(title || badge || subtitle) && (
          <div
            className={cn(
              "mb-12 max-w-2xl",
              centerHeader ? "mx-auto text-center" : "text-left"
            )}
          >
            {badge && (
              <span className="mb-3 inline-block rounded-full bg-secondary-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-600 dark:text-secondary-400 border border-secondary-500/30">
                {badge}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  "relative mb-4 text-3xl font-bold tracking-tight md:text-4xl",
                  variant === "primary" || variant === "dark"
                    ? "text-white"
                    : "text-primary-950",
                  centerHeader &&
                    "pb-3 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-16 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-primary-600 after:to-secondary-500"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-base md:text-lg",
                  variant === "primary" || variant === "dark"
                    ? "text-slate-300"
                    : "text-text-secondary"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

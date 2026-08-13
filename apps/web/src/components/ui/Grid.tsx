import React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  colsMd?: 1 | 2 | 3 | 4;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "default" | "lg" | "xl";
  children: React.ReactNode;
}

/**
 * Standardized responsive grid component for product cards, feature cards, and statistics.
 */
export default function Grid({
  cols = 1,
  colsMd,
  colsLg,
  gap = "default",
  className,
  children,
  ...props
}: GridProps) {
  const gapClasses = {
    none: "gap-0",
    sm: "gap-3 sm:gap-4",
    default: "gap-6 lg:gap-8",
    lg: "gap-8 lg:gap-10",
    xl: "gap-10 lg:gap-12",
  };

  const colsClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const colsMdClasses: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  const colsLgClasses: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  return (
    <div
      className={cn(
        "grid",
        colsClasses[cols],
        colsMd && colsMdClasses[colsMd],
        colsLg && colsLgClasses[colsLg],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import { type ReactNode } from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-200/80 ${className}`} />
  );
}

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

export function SkeletonCard({ lines = 3, className = "" }: SkeletonCardProps) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>
      <Skeleton className="mb-4 h-6 w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="mb-2 h-4 w-full" />
      ))}
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  columns?: number;
  className?: string;
}

export function SkeletonGrid({ count = 6, columns = 3, className = "" }: SkeletonGridProps) {
  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Premium Round RFL Brand Spinner
 * Features concentric dual-ring motion with brand logo emblem
 */
export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const containerSize = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const logoSize = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${containerSize[size]} ${className}`}>
      {/* Outer spinning gradient ring */}
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary-100 border-t-primary-600 border-r-secondary-500" />
      
      {/* Counter-spinning inner accent ring */}
      <div className="absolute inset-1 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border border-dashed border-secondary-400 opacity-70" />

      {/* Center Brand Logo Icon */}
      <div className="relative flex items-center justify-center rounded-full bg-white/90 p-1 shadow-sm backdrop-blur">
        <img
          src="/favicon.png"
          alt="RFL Loading..."
          className={`${logoSize[size]} animate-pulse object-contain`}
        />
      </div>
    </div>
  );
}

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message }: LoadingPageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="relative flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
        <LoadingSpinner size="xl" />
        <p className="mt-5 font-heading text-sm font-semibold text-gray-700">
          {message || "Loading Reliance Finance..."}
        </p>
        <span className="mt-1 text-xs text-gray-400">Please wait a moment</span>
      </div>
    </div>
  );
}

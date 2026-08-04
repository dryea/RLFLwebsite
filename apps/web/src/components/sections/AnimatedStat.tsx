"use client";

import CountUp from "@/components/motion/CountUp";

interface AnimatedStatProps {
  value: string;
  suffix?: string;
  label: string;
}

export default function AnimatedStat({ value, suffix = "", label }: AnimatedStatProps) {
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const isNumeric = !isNaN(numeric);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
      <div className="absolute bottom-0 left-0 h-1 w-full bg-secondary-500" />
      <div className="text-3xl font-extrabold text-primary-500 lg:text-4xl">
        {isNumeric ? (
          <CountUp target={numeric} suffix={suffix} />
        ) : (
          `${value}${suffix}`
        )}
      </div>
      <div className="mt-1 text-sm font-medium text-gray-500">{label}</div>
    </div>
  );
}

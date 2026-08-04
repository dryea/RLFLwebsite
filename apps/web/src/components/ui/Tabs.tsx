"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  render: (id: T) => React.ReactNode;
}

export default function Tabs<T extends string>({ tabs, active, onChange, render }: TabsProps<T>) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative rounded-lg px-5 py-2.5 font-heading text-sm font-semibold transition-colors",
              active === tab.id ? "text-white" : "text-gray-600 hover:bg-primary-50 hover:text-primary-700"
            )}
          >
            {active === tab.id && (
              <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-lg bg-primary-500" transition={{ type: "spring", damping: 28, stiffness: 300 }} />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {render(active)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

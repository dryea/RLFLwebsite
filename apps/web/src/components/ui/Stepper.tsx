"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  subtitle?: string;
}

export default function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.title} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.1 : 1 }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  done ? "bg-green-500 text-white" : active ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-400"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <div className="hidden sm:block">
                <p className={cn("text-xs font-semibold", active ? "text-primary-700" : "text-gray-500")}>{step.title}</p>
                {step.subtitle && <p className="text-[10px] text-gray-400">{step.subtitle}</p>}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-0.5 flex-1 rounded", done ? "bg-green-400" : "bg-gray-200")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

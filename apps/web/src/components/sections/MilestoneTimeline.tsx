"use client";

import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface MilestoneTimelineProps {
  items: Milestone[];
}

export default function MilestoneTimeline({ items }: MilestoneTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[11px] top-2 h-full w-0.5 bg-gradient-to-b from-primary-500 via-primary-300 to-transparent" />
      <div className="space-y-8">
        {items.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative pl-12"
          >
            <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-500 bg-white">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
            </span>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-700">
                  {m.year}
                </span>
                {i === 0 && (
                  <span className="rounded-full bg-secondary-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-secondary-800">
                    Founded
                  </span>
                )}
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-gray-900">{m.title}</h3>
              <p className="leading-relaxed text-gray-600">{m.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

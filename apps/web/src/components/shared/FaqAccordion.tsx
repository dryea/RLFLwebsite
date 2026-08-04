"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (id: number) =>
    setOpen((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open.has(faq.id);
        return (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`overflow-hidden rounded-xl border bg-white transition-shadow ${isOpen ? "shadow-md border-primary-200" : "shadow-sm"}`}
          >
            <button
              onClick={() => toggle(faq.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-gray-900 transition-colors hover:bg-gray-50"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className={`h-5 w-5 ${isOpen ? "text-primary-600" : "text-gray-400"}`} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="border-t px-6 py-4 text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

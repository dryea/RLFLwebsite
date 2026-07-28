"use client";

import { useState } from "react";
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
      {faqs.map((faq) => (
        <div key={faq.id} className="overflow-hidden rounded-lg border bg-white">
          <button
            onClick={() => toggle(faq.id)}
            className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-gray-900 transition-colors hover:bg-gray-50"
          >
            {faq.question}
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${open.has(faq.id) ? "rotate-180" : ""}`}
            />
          </button>
          {open.has(faq.id) && (
            <div
              className="border-t px-6 py-4 text-sm leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

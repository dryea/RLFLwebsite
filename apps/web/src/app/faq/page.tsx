"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getFaqs } from "@/lib/public-api";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [open, setOpen] = useState<Set<number>>(new Set());
  useEffect(() => { getFaqs().then(setFaqs).catch(() => {}); }, []);
  const toggle = (id: number) => setOpen((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Frequently Asked Questions</h1><p className="mt-2 text-primary-100">Find answers to common questions</p></div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq: any) => (
              <div key={faq.id} className="overflow-hidden rounded-lg border bg-white">
                <button onClick={() => toggle(faq.id)} className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-gray-900 transition-colors hover:bg-gray-50">
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${open.has(faq.id) ? "rotate-180" : ""}`} />
                </button>
                {open.has(faq.id) && <div className="border-t px-6 py-4 text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

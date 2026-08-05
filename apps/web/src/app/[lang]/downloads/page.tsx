"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileText, Phone, Mail } from "lucide-react";
import { getDownloads } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function LangDownloadsPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDownloads().then(setItems).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "डाउनलोडहरू" : "Downloads"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "फारम, ब्रोसर र कागजातहरू" : "Download forms, brochures and documents"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          {loading ? (
            <div className="h-48 animate-pulse rounded-xl bg-gray-100" />
          ) : items.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-dashed p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-primary-200" />
              <h2 className="text-xl font-bold text-gray-900">{isNp ? "कागजातहरू चाँडै उपलब्ध हुनेछन्" : "Documents coming soon"}</h2>
              <p className="mt-2 text-sm text-gray-500">
                {isNp
                  ? "फारम, ब्रोसर र अन्य कागजातहरू यहाँ उपलब्ध हुनेछन्। तत्कालको आवश्यकताको लागि हामीलाई सम्पर्क गर्नुहोस्।"
                  : "Forms, brochures, and other documents will be available here. For immediate needs, please contact us."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a href="tel:+977015361104" className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
                  <Phone className="h-4 w-4" /> +977-01-5361104
                </a>
                <a href="mailto:info@reliancenepal.com.np" className="inline-flex items-center gap-2 rounded-xl border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                  <Mail className="h-4 w-4" /> info@reliancenepal.com.np
                </a>
                <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                  {isNp ? "सम्पर्क पृष्ठ" : "Contact Page"}
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item: any) => (
                <a key={item.id} href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-primary-700" />
                    <div>
                      <p className="font-medium text-gray-900">{isNp && item.titleNp ? item.titleNp : item.title}</p>
                      {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                    </div>
                  </div>
                  <Download className="h-5 w-5 shrink-0 text-primary-700" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Store } from "lucide-react";

export default function MerchantOffersPage() {
  const lang = useLang();
  const isNp = lang === "np";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Store className="h-7 w-7" /> {isNp ? "व्यापारी र प्रस्ताव" : "Merchant & Offers"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "हाम्रा व्यापारी साझेदार र विशेष प्रस्तावहरू" : "Our merchant partners and special offers"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          <div className="rounded-2xl border-2 border-dashed p-12 text-center text-gray-500">
            <Store className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-lg font-medium">
              {isNp ? "सामग्री अझै अपडेट हुँदैछ" : "Content coming soon"}
            </p>
            <p className="mt-1 text-sm">
              {isNp
                ? "व्यापारी र प्रस्तावहरूको विवरण छिट्टै अपडेट गरिनेछ।"
                : "Merchant and offer details will be updated shortly."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

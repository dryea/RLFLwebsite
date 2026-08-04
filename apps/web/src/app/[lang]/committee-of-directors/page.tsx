"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";

export default function CommitteeOfDirectorsPage() {
  const lang = useLang();
  const isNp = lang === "np";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Users className="h-7 w-7" /> {isNp ? "संचालक समिति" : "Committee of Directors"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "हाम्रा संचालक समितिका सदस्यहरू" : "Meet our committee members"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          <div className="rounded-2xl border-2 border-dashed p-12 text-center text-gray-500">
            <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-lg font-medium">
              {isNp ? "सामग्री अझै अपडेट हुँदैछ" : "Content coming soon"}
            </p>
            <p className="mt-1 text-sm">
              {isNp
                ? "संचालक समितिको विवरण छिट्टै अपडेट गरिनेछ।"
                : "Committee of directors details will be updated shortly."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getFaqs } from "@/lib/public-api";
import FaqAccordion from "@/components/shared/FaqAccordion";
import JsonLdScript from "@/components/shared/JsonLdScript";
import { useLang } from "@/contexts/LanguageContext";

export default function LangFaqPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    getFaqs().then((data) => {
      setFaqs(data.map((f: any) => ({
        id: f.id,
        question: isNp && f.questionNp ? f.questionNp : f.question,
        answer: isNp && f.answerNp ? f.answerNp : f.answer,
      })));
    }).catch(() => {});
  }, [isNp]);

  return (
    <>
      {faqs.length > 0 && (
        <JsonLdScript data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }} />
      )}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "प्रायः सोधिने प्रश्नहरू" : "Frequently Asked Questions"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "सामान्य प्रश्नहरूको उत्तर" : "Find answers to common questions"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}

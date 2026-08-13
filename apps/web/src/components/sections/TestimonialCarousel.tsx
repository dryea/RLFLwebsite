"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  roleNp?: string;
  location: string;
  rating: number;
  comment: string;
  commentNp?: string;
  avatarUrl: string;
  category: "SME Loan" | "Fixed Deposit" | "Remittance" | "Savings";
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ramesh Shrestha",
    role: "Proprietor, Shrestha Enterprises",
    roleNp: "सञ्चालक, श्रेष्ठ इन्टरप्राइजेज",
    location: "Kathmandu",
    rating: 5,
    comment:
      "Reliance Finance provided quick approval for our SME Business Loan. Their transparent rates and dedicated relationship manager helped expand our retail supply chain across Province 3.",
    commentNp:
      "रिलायन्स फाइनान्सले हाम्रो साना तथा मझौला कर्जा द्रुत रूपमा स्वीकृत गर्‍यो। पारदर्शी ब्याजदर र उत्कृष्ट ग्राहक सेवाले हाम्रो व्यवसाय विस्तार गर्न ठूलो सहयोग पुर्‍यायो।",
    avatarUrl: "/assets/avatar_user1.png",
    category: "SME Loan",
  },
  {
    id: 2,
    name: "Sunita Adhikari",
    role: "Senior Educator & Savings Account Holder",
    roleNp: "वरिष्ठ शिक्षिका",
    location: "Pokhara",
    rating: 5,
    comment:
      "I have been maintaining my Fixed Deposit with RFIL for over 5 years. High interest rates, timely maturity payouts, and friendly staff at the Pokhara branch make them my most trusted partner.",
    commentNp:
      "म विगत ५ वर्षदेखि रिलायन्स फाइनान्समा मुद्दती निक्षेप राख्दै आएकी छु। उच्च ब्याजदर, समयमै भुक्तानी र पोखरा शाखाका कर्मचारीको मीठो व्यवहार अति नै प्रशंसनीय छ।",
    avatarUrl: "/assets/avatar_user2.png",
    category: "Fixed Deposit",
  },
  {
    id: 3,
    name: "Bikash Gurung",
    role: "Remittance Beneficiary",
    roleNp: "वैदेशिक रोजगार परिवार",
    location: "Butwal",
    rating: 5,
    comment:
      "Receiving remittance sent from Dubai is instant through RFL Smart. Funds reflect directly in my account with zero hassle.",
    commentNp:
      "दुबईबाट पठाएको रकम RFL स्मार्ट एप मार्फत तुरुन्तै मेरो खातामा जम्मा हुन्छ। कुनै झन्झटविना सजिलै सेवा पाउन सकिन्छ।",
    avatarUrl: "/assets/avatar_user3.png",
    category: "Remittance",
  },
];

export default function TestimonialCarousel({ lang }: { lang: string }) {
  const isNp = lang === "np";
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % defaultTestimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + defaultTestimonials.length) % defaultTestimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(next, 7000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  const active = defaultTestimonials[current];

  return (
    <Section
      variant="surface"
      badge={isNp ? "ग्राहक अनुभव" : "Client Success Stories"}
      title={isNp ? "हाम्रा ग्राहकहरूको भनाइ" : "Trusted By Thousands Across Nepal"}
      subtitle={
        isNp
          ? "नेपालभरिका उद्योगी, व्यवसायी र सर्वसाधारण नागरिकहरूको भरोसा।"
          : "Discover how Reliance Finance empowers businesses, families, and savers every day."
      }
    >
      <div className="relative mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-primary-50/30 p-8 shadow-xl md:p-12"
          >
            {/* Background Quote Watermark */}
            <Quote className="absolute right-6 top-6 h-28 w-28 text-primary-100/50" aria-hidden="true" />

            <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-center">
              {/* Customer Info Card */}
              <div className="flex flex-col items-center text-center md:col-span-4 md:border-r md:border-slate-200 md:pr-8">
                <div className="relative mb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 text-white font-heading text-2xl font-bold shadow-lg ring-4 ring-white">
                    {active.name.charAt(0)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                </div>

                <h4 className="font-heading text-lg font-bold text-primary-950">{active.name}</h4>
                <p className="text-xs font-semibold text-primary-600">
                  {isNp && active.roleNp ? active.roleNp : active.role}
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">{active.location}, Nepal</p>

                {/* Rating Stars */}
                <div className="mt-3 flex items-center justify-center gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary-500 text-secondary-500" />
                  ))}
                </div>
              </div>

              {/* Quote Content */}
              <div className="md:col-span-8">
                <span className="mb-3 inline-block rounded-full bg-secondary-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-secondary-800 border border-secondary-500/30">
                  Verified Client • {active.category}
                </span>
                <blockquote className="font-body text-base leading-relaxed text-slate-800 md:text-lg italic">
                  "{isNp && active.commentNp ? active.commentNp : active.comment}"
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {defaultTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2 bg-primary-600 shadow-sm"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-primary-600 hover:text-white active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-primary-600 hover:text-white active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

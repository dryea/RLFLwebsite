"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Smartphone, Percent, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useABTest } from "@/hooks/useABTest";
import { useParallax } from "@/hooks/useParallax";
import { localize } from "@/lib/localize";

interface Slide {
  id: number;
  title: string;
  titleNp?: string;
  description: string;
  descriptionNp?: string;
  imageUrl: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  badge?: string;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Go Digital With RFL Smart Banking",
    titleNp: "RFL स्मार्ट बैंकिङसँग डिजिटल बन्नुहोस्",
    description: "Experience seamless mobile banking, QR payments, and instant digital transfers anytime, anywhere in Nepal.",
    descriptionNp: "नेपालभरि जुनसुकै समयमा सहज मोबाइल बैंकिङ, QR भुक्तानी र फण्ड ट्रान्सफरको अनुभव लिनुहोस्।",
    imageUrl: "/assets/hero_digital_banking.png",
    ctaPrimaryText: "Open Account",
    ctaPrimaryLink: "/open-account",
    ctaSecondaryText: "View Rates",
    ctaSecondaryLink: "/rates",
    badge: "Digital Banking",
  },
  {
    id: 2,
    title: "Earn Up to 6.25% with Fixed Deposits",
    titleNp: "मुद्दती निक्षेपमा ६.२५% सम्म उच्च ब्याज पाउनुहोस्",
    description: "Maximize your wealth with guaranteed returns, flexible tenure options, and NRB-regulated security.",
    descriptionNp: "सुनिश्चित प्रतिफल र लचिलो समयावधिसँग आफ्नो बचतलाई अझ बढाउनुहोस्।",
    imageUrl: "/assets/hero_fixed_deposits.png",
    ctaPrimaryText: "Explore Fixed Deposits",
    ctaPrimaryLink: "/products/fixed-deposits",
    ctaSecondaryText: "Calculate Maturity",
    ctaSecondaryLink: "/calculators",
    badge: "High Yield Investment",
  },
  {
    id: 3,
    title: "Flexible SME & Personal Home Loans",
    titleNp: "सरल घर तथा व्यवसाय कर्जा",
    description: "Empowering Nepalese businesses and homeowners with competitive interest rates and minimal processing fees.",
    descriptionNp: "आकर्षक ब्याजदर र सरल प्रक्रियामा व्यवसाय तथा घर कर्जा प्राप्त गर्नुहोस्।",
    imageUrl: "/assets/hero_loans.png",
    ctaPrimaryText: "Apply For Loan",
    ctaPrimaryLink: "/loan-enquiry",
    ctaSecondaryText: "EMI Calculator",
    ctaSecondaryLink: "/emi-calculator",
    badge: "Fast Approval Loans",
  },
  {
    id: 4,
    title: "Trusted Governance & 17+ Years Legacy",
    titleNp: "१७+ वर्षको विश्वास र बलियो सुशासन",
    description: "Incorporated in B.S. 2066 under Nepal Rastra Bank 'Class C' licensing, built on institutional trust and transparency.",
    descriptionNp: "नेपाल राष्ट्र बैंकद्वारा इजाजतपत्र प्राप्त, २०६६ देखि वित्तीय सुशासनको पर्याय।",
    imageUrl: "/assets/hero_governance.png",
    ctaPrimaryText: "Governance Reports",
    ctaPrimaryLink: "/about/introduction",
    ctaSecondaryText: "Board of Directors",
    ctaSecondaryLink: "/team/board-of-directors",
    badge: "NRB Regulated",
  },
  {
    id: 5,
    title: "Fast International & Domestic Remittance",
    titleNp: "सुरक्षित र द्रुत रेमिट्यान्स सेवा",
    description: "Receive money instantly from global corridors directly to your bank account or at any of our 21+ branches nationwide.",
    descriptionNp: "विश्वभरिबाट पठाइएको रकम तुरुन्तै खातामा वा शाखाहरूबाट सहज रूपमा प्राप्त गर्नुहोस्।",
    imageUrl: "/assets/hero_remittance.png",
    ctaPrimaryText: "Explore Remittance",
    ctaPrimaryLink: "/services/remittance",
    ctaSecondaryText: "Find Branch",
    ctaSecondaryLink: "/branches",
    badge: "Global Money Transfer",
  },
];

const SLIDE_DURATION = 6500;

function optimizedBg(src: string): string {
  return src || "/assets/hero_digital_banking.png";
}

export default function HeroSlider({ slides, lang }: { slides: Slide[]; lang: string }) {
  const allSlides = slides && slides.length >= 3 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { variant: ctaVariant, trackConversion } = useABTest("hero_cta");
  const parallax = useParallax(sectionRef, 0.25);
  const isNp = lang === "np";

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % allSlides.length), [current, allSlides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + allSlides.length) % allSlides.length), [current, allSlides.length, goTo]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % allSlides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, allSlides.length]);

  return (
    <section
      ref={sectionRef}
      className="hero-slider relative overflow-hidden bg-[#071829]"
      style={{ minHeight: "clamp(540px, 75vh, 820px)" }}
      aria-label="Hero slider"
    >
      <link
        rel="preload"
        as="image"
        href={optimizedBg(allSlides[0]?.imageUrl)}
        fetchPriority="high"
      />

      {/* Slide Background Layer with Ken Burns Effect */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute -inset-y-16 inset-x-0 animate-kenburns bg-cover bg-center"
            style={{
              backgroundImage: `url(${optimizedBg(allSlides[current].imageUrl)})`,
              transform: `translateY(${parallax}px) scale(1.05)`,
              willChange: "transform",
            }}
            aria-hidden="true"
          />
          {/* Multi-stage RFIL Blue to Dark Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071829]/95 via-[#0F4C81]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071829] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Active Content */}
      <AnimatePresence mode="wait">
        <div
          key={current}
          className="relative z-10 flex h-full items-end"
          style={{ minHeight: "clamp(540px, 75vh, 820px)" }}
        >
          <div className="container-page w-full pb-28 pt-16">
            <div className="max-w-2xl">
              {/* Badge Tag */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-400/40 bg-secondary-500/20 px-3.5 py-1 backdrop-blur-md"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-secondary-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-secondary-300">
                  {allSlides[current].badge || (isNp ? "रिलायन्स फाइनान्स" : "Reliance Finance")}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-5 font-heading text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.1] text-white tracking-tight"
              >
                {isNp && allSlides[current].titleNp
                  ? allSlides[current].titleNp
                  : allSlides[current].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-8 font-body text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-slate-200"
              >
                {isNp && allSlides[current].descriptionNp
                  ? allSlides[current].descriptionNp
                  : allSlides[current].description}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.44, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap gap-3.5"
              >
                {allSlides[current].ctaPrimaryText && (
                  <Link
                    href={localize(allSlides[current].ctaPrimaryLink || "#", lang)}
                    onClick={trackConversion}
                    className="btn btn-secondary shadow-gold shadow-secondary-500/20"
                  >
                    {current === 0 && ctaVariant === "b"
                      ? (isNp ? "आजै बचत सुरु गर्नुहोस्" : "Start Saving Today")
                      : allSlides[current].ctaPrimaryText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                {allSlides[current].ctaSecondaryText && (
                  <Link
                    href={localize(allSlides[current].ctaSecondaryLink || "#", lang)}
                    className="btn btn-ghost"
                  >
                    {allSlides[current].ctaSecondaryText}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatePresence>

      {/* Slide Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
        <motion.div
          key={progressKey}
          className="h-full bg-secondary-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-6 z-30 hidden items-center gap-3 md:flex">
        <button
          onClick={prev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-secondary-500 hover:text-slate-950 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-secondary-500 hover:text-slate-950 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {allSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2 bg-secondary-500 shadow-sm"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Go Digital With RFL Smart Banking",
    description: "Experience seamless mobile banking, QR payments, and digital transfers anytime, anywhere in Nepal.",
    imageUrl: "/assets/hero_digital_banking.png",
    ctaPrimaryText: "Open Account",
    ctaPrimaryLink: "/open-account",
    ctaSecondaryText: "View Rates",
    ctaSecondaryLink: "/rates",
  },
  {
    id: 2,
    title: "Earn More with Fixed Deposits",
    description: "Maximize your savings with competitive fixed deposit rates and flexible tenure options.",
    imageUrl: "/assets/hero_fixed_deposits.png",
    ctaPrimaryText: "Explore Fixed Deposits",
    ctaPrimaryLink: "/products/fixed-deposits",
    ctaSecondaryText: "Calculate Returns",
    ctaSecondaryLink: "/calculators",
  },
  {
    id: 3,
    title: "Flexible Home & Auto Loans",
    description: "Turn your dreams into reality with low-interest home, vehicle, and business loan options built for you.",
    imageUrl: "/assets/hero_loans.png",
    ctaPrimaryText: "Explore Loans",
    ctaPrimaryLink: "/products/loans",
    ctaSecondaryText: "EMI Calculator",
    ctaSecondaryLink: "/emi-calculator",
  },
  {
    id: 4,
    title: "Trusted Governance & Legacy",
    description: "Built on 17+ years of trust, institutional integrity, and full compliance under Nepal Rastra Bank.",
    imageUrl: "/assets/hero_governance.png",
    ctaPrimaryText: "Our Governance",
    ctaPrimaryLink: "/governance",
    ctaSecondaryText: "Board of Directors",
    ctaSecondaryLink: "/governance",
  },
  {
    id: 5,
    title: "Fast & Secure Remittance",
    description: "Collect international and domestic money transfers instantly across our 21+ branch network.",
    imageUrl: "/assets/hero_remittance.png",
    ctaPrimaryText: "Explore Remittance",
    ctaPrimaryLink: "/services/remittance",
    ctaSecondaryText: "Find a Branch",
    ctaSecondaryLink: "/branches",
  },
];

const SLIDE_DURATION = 6000;

// Serve hero backgrounds directly (local assets or remote URL).
// Cloudflare image resizing is not available on the workers.dev origin,
// so we avoid the cdn-cgi proxy that previously 404'd every slide image.
function optimizedBg(src: string): string {
  return src || src;
}

export default function HeroSlider({ slides, lang }: { slides: Slide[]; lang: string }) {
  const allSlides = slides.length >= 5 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // A/B test: which CTA variant to show on the first slide
  const { variant: ctaVariant, trackConversion } = useABTest("hero_cta");
  // Parallax background
  const parallax = useParallax(sectionRef, 0.3);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % allSlides.length), [current, allSlides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + allSlides.length) % allSlides.length), [current, allSlides.length, goTo]);

  // Autoplay with timer reset on manual nav
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % allSlides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, allSlides.length]);

  return (
    <section
      ref={sectionRef}
      className="hero-slider relative overflow-hidden bg-gray-950"
      style={{ minHeight: "clamp(520px, 72vh, 800px)" }}
      aria-label="Featured highlights"
    >
      {/* Preload the first slide's background image for faster LCP */}
      <link
        rel="preload"
        as="image"
        href={optimizedBg(allSlides[0]?.imageUrl)}
        fetchPriority="high"
      />
      {/* Slides */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background image with Ken Burns + parallax */}
          <div
            className="absolute -inset-y-16 inset-x-0 animate-kenburns bg-cover bg-center"
            style={{
              backgroundImage: `url(${optimizedBg(allSlides[current].imageUrl)})`,
              transform: `translateY(${parallax}px) scale(1.05)`,
              willChange: "transform",
            }}
            aria-hidden="true"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <div
          key={current}
          className="relative z-10 flex h-full items-end"
          style={{ minHeight: "clamp(520px, 72vh, 800px)" }}
        >
          <div className="container-page w-full pb-28">
            <div className="max-w-[640px]">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="mb-3 inline-block rounded-full bg-secondary-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-400">
                  {lang === "en" ? "Reliance Finance" : "रिलायन्स फाइनान्स"}
                </span>
              </motion.div>

              {/* H1 for active slide — correct semantics */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-5 text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.1] text-white"
              >
                {lang === "np" && allSlides[current].titleNp
                  ? allSlides[current].titleNp
                  : allSlides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-8 text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/80"
              >
                {lang === "np" && allSlides[current].descriptionNp
                  ? allSlides[current].descriptionNp
                  : allSlides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.44, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap gap-3"
              >
                {allSlides[current].ctaPrimaryText && (
                  <Link
                    href={localize(allSlides[current].ctaPrimaryLink || "#", lang)}
                    onClick={trackConversion}
                    className="btn btn-secondary"
                  >
                    {current === 0 && ctaVariant === "b"
                      ? (lang === "en" ? "Start Saving Today" : "आजै बचत सुरु गर्नुहोस्")
                      : allSlides[current].ctaPrimaryText}
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

      {/* Progress bar (auto-advance indicator) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <motion.div
          key={progressKey}
          className="h-full bg-secondary-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 right-6 z-30 flex items-center gap-3">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-secondary-500 hover:text-gray-900"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-secondary-500 hover:text-gray-900"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {allSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 h-2 bg-secondary-500"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

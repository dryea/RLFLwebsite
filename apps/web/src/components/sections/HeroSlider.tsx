"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    imageUrl: "https://reliancenepal.com.np/assets/images/hero_digital_banking.png",
    ctaPrimaryText: "Open Account",
    ctaPrimaryLink: "/products/savings",
    ctaSecondaryText: "View Rates",
    ctaSecondaryLink: "/rates",
  },
  {
    id: 2,
    title: "Individual Fixed Deposits",
    description: "Earn higher returns on your hard-earned savings. Open a fixed deposit with flexible tenures and lucrative rates.",
    imageUrl: "https://reliancenepal.com.np/assets/images/hero_fixed_deposits.png",
    ctaPrimaryText: "Learn More",
    ctaPrimaryLink: "/products/fixed-deposits",
    ctaSecondaryText: "Calculate Earnings",
    ctaSecondaryLink: "/emi-calculator",
  },
  {
    id: 3,
    title: "Flexible Home & Auto Loans",
    description: "Turn your dreams into reality with low-interest home, vehicle, and agricultural loan options customized for you.",
    imageUrl: "https://reliancenepal.com.np/assets/images/hero_loans.png",
    ctaPrimaryText: "Explore Loans",
    ctaPrimaryLink: "/products/loans",
    ctaSecondaryText: "EMI Calculator",
    ctaSecondaryLink: "/emi-calculator",
  },
  {
    id: 4,
    title: "Corporate Governance & Legacy",
    description: "Guided by transparency, institutional integrity, and compliance under Nepal Rastra Bank regulations for over a decade.",
    imageUrl: "https://reliancenepal.com.np/assets/images/hero_governance.png",
    ctaPrimaryText: "Governance Policies",
    ctaPrimaryLink: "/governance",
    ctaSecondaryText: "Board of Directors",
    ctaSecondaryLink: "/governance",
  },
  {
    id: 5,
    title: "Fast & Secure Remittance",
    description: "Collect international and domestic money transfers easily across our nationwide branch network.",
    imageUrl: "https://reliancenepal.com.np/assets/images/hero_remittance.png",
    ctaPrimaryText: "Explore Remittance",
    ctaPrimaryLink: "/services/remittance",
    ctaSecondaryText: "Locate Branches",
    ctaSecondaryLink: "/branches",
  },
];

export default function HeroSlider({ slides, lang }: { slides: Slide[]; lang: string }) {
  const allSlides = slides.length >= 5 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % allSlides.length), [allSlides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + allSlides.length) % allSlides.length), [allSlides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-slider relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-black">
      {allSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 flex items-center ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent z-[2]" />
          <div className={`container-page relative z-[3] w-full transition-all duration-1000 ${i === current ? "translate-y-0" : "translate-y-8"}`}>
            <div className="max-w-[650px] text-white">
              <h2 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight text-secondary-500">
                {lang === "np" && slide.titleNp ? slide.titleNp : slide.title}
              </h2>
              <p className="mb-8 text-[clamp(1rem,2vw,1.25rem)] text-white/90">
                {lang === "np" && slide.descriptionNp ? slide.descriptionNp : slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {slide.ctaPrimaryText && (
                  <Link href={slide.ctaPrimaryLink || "#"} className="btn btn-secondary">
                    {slide.ctaPrimaryText}
                  </Link>
                )}
                {slide.ctaSecondaryText && (
                  <Link href={slide.ctaSecondaryLink || "#"} className="btn btn-outline !border-white !text-white hover:!bg-white/10">
                    {slide.ctaSecondaryText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-controls absolute bottom-8 right-8 z-[4] flex gap-3">
        <button onClick={prev} className="slider-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-secondary-500 hover:text-text-primary" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} className="slider-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-secondary-500 hover:text-text-primary" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 gap-3">
        {allSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all ${i === current ? "w-8 bg-secondary-500" : "w-3 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

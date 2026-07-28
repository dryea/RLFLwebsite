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

export default function HeroSlider({ slides, lang }: { slides: Slide[]; lang: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!slides.length) return null;

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className={`relative z-20 flex h-full items-center transition-all duration-1000 ${i === current ? "translate-y-0" : "translate-y-8"}`}>
            <div className="container-page w-full">
              <div className="max-w-2xl text-white">
                <h2 className="mb-4 text-4xl font-extrabold leading-tight text-secondary-500 md:text-5xl lg:text-6xl">
                  {lang === "np" && slide.titleNp ? slide.titleNp : slide.title}
                </h2>
                <p className="mb-8 text-lg text-white/90 md:text-xl">
                  {lang === "np" && slide.descriptionNp ? slide.descriptionNp : slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {slide.ctaPrimaryText && (
                    <Link href={slide.ctaPrimaryLink || "#"} className="btn btn-secondary">
                      {slide.ctaPrimaryText}
                    </Link>
                  )}
                  {slide.ctaSecondaryText && (
                    <Link href={slide.ctaSecondaryLink || "#"} className="rounded-md border-2 border-white px-5 py-3 font-heading font-semibold text-white transition-all hover:bg-white/10">
                      {slide.ctaSecondaryText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 right-8 z-30 flex gap-3">
        <button onClick={prev} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-secondary-500" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-secondary-500" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition-all ${i === current ? "w-8 bg-secondary-500" : "bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

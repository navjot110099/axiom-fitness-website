"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <section className="relative overflow-hidden border-t border-line bg-obsidian py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">/ 06 — Members</p>
            <SplitText
              text="Trusted by people who measure everything."
              as="h2"
              className="max-w-2xl font-display text-display-sm font-extrabold leading-[0.98]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => embla?.scrollPrev()}
              data-cursor
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-voltage hover:text-voltage focus-ring"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              data-cursor
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-voltage hover:text-voltage focus-ring"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="min-w-0 flex-[0_0_100%] rounded-3xl border border-line bg-void/50 p-8 md:flex-[0_0_60%] lg:p-12"
              >
                <Quote className="h-8 w-8 text-voltage" />
                <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-bone md:text-3xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-elevated font-display text-sm font-bold text-voltage">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block font-medium text-bone">{t.name}</span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-faint">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                selected === i ? "w-10 bg-voltage" : "w-4 bg-line hover:bg-faint"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/lib/useGSAP";
import { DISCIPLINES_FULL } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal-scroll gallery of disciplines.
 * The vertical scroll is translated into a horizontal track move while the
 * section is pinned — a classic Locomotive/Obys storytelling device.
 */
export function DisciplinesScroll() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = track.current!;
    if (window.matchMedia("(max-width: 1023px)").matches) return; // vertical stack on mobile
    const distance = el.scrollWidth - window.innerWidth;
    gsap.to(el, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative lg:h-screen lg:overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-6 py-10 lg:h-full lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pl-[8vw] lg:pr-[12vw]"
      >
        {/* intro panel */}
        <div className="shrink-0 lg:w-[28vw]">
          <p className="eyebrow mb-5">
            <span className="text-voltage">/ 01</span> — The floor
          </p>
          <h2 className="font-display text-display-sm font-extrabold leading-[0.95]">
            Eight worlds
            <br />
            under one
            <br />
            <span className="text-voltage-grad">roof.</span>
          </h2>
          <p className="mt-6 max-w-xs text-ash">
            Drag through the floor. Every space is engineered — and instrumented —
            for a different way of moving.
          </p>
          <p className="mt-8 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint lg:flex">
            Scroll to travel →
          </p>
        </div>

        {DISCIPLINES_FULL.map((d, i) => (
          <article
            key={d.slug}
            id={d.slug}
            className="group relative aspect-[4/5] shrink-0 overflow-hidden rounded-3xl border border-line lg:h-[68vh] lg:w-[46vh]"
          >
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes="(max-width:1024px) 100vw, 46vh"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
            <div className="absolute left-6 top-6">
              <span className="font-mono text-xs text-bone/60">
                {String(i + 1).padStart(2, "0")} / {String(DISCIPLINES_FULL.length).padStart(2, "0")}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <Badge tone={d.accent as "voltage"}>{d.kicker}</Badge>
              <h3 className="mt-3 font-display text-3xl font-extrabold">{d.name}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ash">{d.desc}</p>
              <div className="mt-4 flex gap-6">
                {d.stats.map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-xl font-bold text-voltage">{s.v}</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-faint">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

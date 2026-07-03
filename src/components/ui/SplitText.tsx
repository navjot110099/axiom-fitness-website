"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-by-word mask reveal for editorial headings.
 * Each word sits inside an overflow-hidden line and slides up from a clip,
 * triggered on scroll. Pure DOM split — no paid GSAP SplitText plugin.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  start = "top 85%",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.05,
          delay,
          ease: "power4.out",
          stagger,
          scrollTrigger: { trigger: el, start },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, stagger, start]);

  const words = text.split(" ");

  return createElement(
    Tag,
    { ref, className: cn(className) },
    words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-word className={cn("inline-block will-change-transform", wordClassName)}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
    )),
  );
}

"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger direct children instead of the element itself */
  stagger?: boolean;
  once?: boolean;
};

/**
 * Scroll-triggered reveal. Animates the element (or its children) up + in
 * as it enters the viewport. Respects reduced-motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 32,
  stagger = false,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger, once]);

  return createElement(Tag, { ref, className: cn(className) }, children);
}

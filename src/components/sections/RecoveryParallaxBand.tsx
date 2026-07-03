"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Three-layer parallax image band — spa, ice, sauna — each panel drifting at a
 * different rate as the band passes through the viewport. Spa/sauna imagery from
 * Unsplash. Purely useScroll/useTransform driven (no pin), so it reads very
 * differently from the sticky contrast circuit above it.
 */

const PANELS = [
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
    caption: "Deep-tissue recovery suite",
    speed: -80,
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600&auto=format&fit=crop",
    caption: "Contrast plunge · 3°C",
    speed: 60,
  },
  {
    src: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=1600&auto=format&fit=crop",
    caption: "Cedar sauna · 90°C",
    speed: -50,
  },
];

function Panel({ src, caption, speed }: (typeof PANELS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line">
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src={src}
          alt={caption}
          fill
          sizes="(max-width:1024px) 100vw, 33vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
          {caption}
        </span>
      </div>
    </div>
  );
}

export function RecoveryParallaxBand() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PANELS.map((p, i) => (
        <div key={p.caption} className={i === 1 ? "sm:translate-y-10" : ""}>
          <Panel {...p} />
        </div>
      ))}
    </div>
  );
}

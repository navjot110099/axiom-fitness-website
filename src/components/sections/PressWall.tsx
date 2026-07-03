"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { PRESS } from "@/lib/data";

// Duplicated for a seamless marquee loop.
const LOOP = [...PRESS, ...PRESS];

export function PressWall() {
  return (
    <div className="space-y-16">
      {/* Oversized rotating marquee of press quotes */}
      <div
        className="group relative overflow-hidden py-4"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {LOOP.map((p, i) => (
            <div
              key={i}
              className="flex w-[min(80vw,540px)] shrink-0 flex-col justify-between rounded-3xl border border-line bg-obsidian p-8 lg:p-10"
            >
              <Quote className="h-7 w-7 text-voltage/60" />
              <p className="mt-6 font-display text-2xl font-extrabold leading-[1.15] tracking-tight lg:text-3xl">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                <span className="font-display text-lg font-extrabold">{p.outlet}</span>
                <span className="font-mono text-xs text-faint">{p.year}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Editorial pull-quote feature — the strongest quote, oversized */}
      <FeatureQuote />
    </div>
  );
}

function FeatureQuote() {
  const lead = PRESS[0];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto max-w-4xl rounded-3xl border border-voltage/20 bg-gradient-to-b from-voltage/[0.05] to-transparent px-8 py-16 text-center lg:px-16 lg:py-20"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-2 select-none font-display text-[10rem] leading-none text-voltage/10 lg:text-[14rem]"
      >
        &ldquo;
      </span>
      <blockquote className="relative font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
        {lead.quote}
      </blockquote>
      <figcaption className="mt-8 font-mono text-xs uppercase tracking-widest text-ash">
        {lead.outlet} · {lead.year}
      </figcaption>
    </motion.figure>
  );
}

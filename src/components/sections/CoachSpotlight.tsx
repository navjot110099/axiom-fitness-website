"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { COACHES } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

/**
 * Featured coach spotlight.
 * A parallax portrait (useScroll/useTransform drives the image's y) sits beside
 * a large pull-quote. The quote words mask-reveal on view; the credential row
 * slides up beneath. Editorial, unhurried — a counterpoint to the busy roster.
 */
const FEATURED = COACHES[0]; // Mara Voss — Head of Strength

const QUOTE = "Strength isn't a feeling. It's a number that moves — and my job is to make yours move on purpose.";

export function CoachSpotlight() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  const words = QUOTE.split(" ");

  return (
    <section ref={root} className="relative py-16 lg:py-24">
      <div className="container-x">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Parallax portrait */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line lg:aspect-auto">
            <motion.div style={{ y, scale }} className="absolute inset-0 -inset-y-[12%]">
              <Image
                src={FEATURED.image}
                alt={FEATURED.name}
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
            <div className="absolute left-7 top-7">
              <Badge tone="voltage">Featured coach</Badge>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-voltage">
                {FEATURED.role}
              </p>
              <h3 className="mt-1 font-display text-4xl font-extrabold">{FEATURED.name}</h3>
            </div>
          </div>

          {/* Pull-quote */}
          <div className="flex flex-col justify-center py-4 lg:py-0">
            <p className="eyebrow mb-6">
              <span className="text-voltage">/ 01</span> — In her words
            </p>
            <blockquote className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="sr-only">{QUOTE}</span>
              <span aria-hidden className="inline">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{
                        delay: i * 0.03,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {w}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </span>
            </blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8"
            >
              <div>
                <div className="font-display text-3xl font-extrabold text-voltage">
                  {FEATURED.years}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Years coaching
                </div>
              </div>
              <div className="max-w-xs">
                <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Credentials
                </div>
                <p className="mt-1 text-sm text-ash">{FEATURED.creds}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FEATURED.specialty.map((s) => (
                  <Badge key={s} tone="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

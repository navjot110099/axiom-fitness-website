"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DISCIPLINES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Disciplines() {
  const [active, setActive] = useState(0);
  const item = DISCIPLINES[active];

  return (
    <section className="relative border-t border-line py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">/ 02 — Disciplines</p>
            <SplitText
              text="Twelve ways to move."
              as="h2"
              className="font-display text-display-sm font-extrabold leading-[0.95]"
            />
          </div>
          <Link
            href="/disciplines"
            data-cursor
            className="group inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
          >
            View all disciplines
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          {/* Hover list */}
          <ul className="order-2 flex flex-col lg:order-1">
            {DISCIPLINES.map((d, i) => (
              <li key={d.slug}>
                <Link
                  href={`/disciplines#${d.slug}`}
                  data-cursor="cta"
                  data-cursor-label="View"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center justify-between gap-4 border-b border-line py-6 transition-colors"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-3xl font-extrabold tracking-tight transition-all duration-300 md:text-4xl ${
                        active === i ? "translate-x-2 text-bone" : "text-faint"
                      }`}
                    >
                      {d.name}
                    </span>
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest transition-opacity ${
                      active === i ? "text-voltage opacity-100" : "opacity-0"
                    }`}
                  >
                    {d.kicker}
                  </span>
                  {/* fill sweep */}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-voltage transition-transform duration-500 ${
                      active === i ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Image stage */}
          <Reveal className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line lg:sticky lg:top-28">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={active === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-voltage">
                  {item.kicker}
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold">{item.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">
                  {item.desc}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

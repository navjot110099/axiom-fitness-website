"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COACHES } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";

/**
 * Staggered grid of coach portraits.
 * Cards reveal with a staggered spring on view; each is a TiltCard whose lower
 * panel slides up on hover to reveal specialisms + years. The portrait quietly
 * scales under the tilt for depth.
 */
export function CoachRoster() {
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {COACHES.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <TiltCard className="group/card overflow-hidden rounded-3xl border border-line bg-obsidian">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover/card:scale-105 group-hover/card:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

              {/* Static identity — always visible */}
              <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-out-expo group-hover/card:-translate-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-voltage">
                  {c.role}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight">
                  {c.name}
                </h3>
              </div>

              {/* Hover reveal — specialisms + years */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-void via-void/95 to-void/70 px-6 pb-6 pt-5 opacity-0 transition-all duration-500 ease-out-expo group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <div className="flex flex-wrap gap-1.5">
                  {c.specialty.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-ash"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="max-w-[70%] text-xs leading-relaxed text-ash">{c.creds}</p>
                  <div className="text-right">
                    <div className="font-display text-2xl font-extrabold text-voltage">
                      {c.years}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-faint">
                      Years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}

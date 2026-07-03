"use client";

import { useRef, useState } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/content";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [start, setStart] = useState(false);

  if (inView && !start) setStart(true);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-obsidian py-20">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" />
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={start ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left"
            >
              <div className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-7xl">
                {start ? (
                  <CountUp end={s.value} duration={2.4} separator="," />
                ) : (
                  0
                )}
                <span className="text-voltage">{s.suffix}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ash">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

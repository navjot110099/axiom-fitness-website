"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const FACTS = [
  { value: 2400, suffix: "+", label: "Members in residence" },
  { value: 48, suffix: "", label: "Master coaches" },
  { value: 12, suffix: "", label: "Training disciplines" },
  { value: 2019, suffix: "", label: "Year founded", raw: true },
];

export function PressFacts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
    >
      {FACTS.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-obsidian p-8 lg:p-10"
        >
          <div className="font-display text-5xl font-extrabold tracking-tight text-bone">
            {inView ? (
              <CountUp
                end={f.value}
                duration={2}
                separator={f.raw ? "" : ","}
                suffix={f.suffix}
              />
            ) : (
              0
            )}
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-faint">
            {f.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

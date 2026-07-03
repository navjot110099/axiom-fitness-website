"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Flame, Utensils, ArrowRight, Zap } from "lucide-react";
import { MACRO_RINGS } from "@/lib/data";

/** Two training-demand presets that retarget the day's macros. */
const DEMANDS = {
  Rest: {
    label: "Recovery day",
    kcal: 2200,
    note: "Lower carbs, protein held high to protect lean mass.",
    macros: [
      { ...MACRO_RINGS[0], target: 200, value: 176 },
      { ...MACRO_RINGS[1], target: 190, value: 150 },
      { ...MACRO_RINGS[2], target: 72, value: 58 },
    ],
    suggestion: {
      name: "Cold Smoke Salmon",
      macro: "40P · 22C · 28F",
      why: "Fats front-loaded for a low-carb recovery window.",
    },
  },
  Heavy: {
    label: "Heavy pull block",
    kcal: 2900,
    note: "Carbs surge to fuel the top single and refill glycogen.",
    macros: [
      { ...MACRO_RINGS[0], target: 210, value: 182 },
      { ...MACRO_RINGS[1], target: 320, value: 246 },
      { ...MACRO_RINGS[2], target: 70, value: 61 },
    ],
    suggestion: {
      name: "The Recovery Bowl",
      macro: "48P · 62C · 14F",
      why: "Fast carbs + complete protein to slam the post-lift window.",
    },
  },
} as const;

type DemandKey = keyof typeof DEMANDS;

function MacroRing({
  macro,
  play,
  delay,
}: {
  macro: { label: string; value: number; target: number; unit: string; color: string };
  play: boolean;
  delay: number;
}) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const pct = Math.min(macro.value / macro.target, 1);
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#26262D" strokeWidth="9" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={macro.color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={play ? { strokeDashoffset: c - pct * c } : { strokeDashoffset: c }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-extrabold" style={{ color: macro.color }}>
            {play ? <CountUp end={macro.value} duration={1.3} delay={delay} /> : 0}
          </span>
          <span className="font-mono text-[9px] text-faint">/ {macro.target}{macro.unit}</span>
        </div>
      </div>
      <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ash">
        {macro.label}
      </span>
    </div>
  );
}

export function IntelNutrition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [demand, setDemand] = useState<DemandKey>("Heavy");
  const [cycle, setCycle] = useState(0);
  const active = DEMANDS[demand];

  // bump a cycle counter whenever demand changes so the rings replay
  useEffect(() => {
    setCycle((c) => c + 1);
  }, [demand]);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      {/* Panel: rings + demand toggle */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative overflow-hidden rounded-3xl border border-line p-7 shadow-2xl shadow-black/50"
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-plasma/[0.08] blur-[90px]" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-ember" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Today&apos;s targets
            </p>
          </div>
          <div className="flex gap-1.5 rounded-full border border-line bg-obsidian p-1">
            {(Object.keys(DEMANDS) as DemandKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setDemand(k)}
                data-cursor
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors focus-ring ${
                  demand === k ? "text-void" : "text-ash"
                }`}
              >
                {demand === k && (
                  <motion.span
                    layoutId="demand-pill"
                    className="absolute inset-0 rounded-full bg-voltage"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{k}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-4xl font-extrabold text-bone">
            {inView && (
              <CountUp key={active.kcal} end={active.kcal} duration={1} separator="," />
            )}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            kcal · {active.label}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2">
          {active.macros.map((m, i) => (
            <MacroRing key={`${cycle}-${m.label}`} macro={m} play={inView} delay={i * 0.12} />
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-2xl border border-line bg-void/40 p-4">
          <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-voltage" />
          <p className="text-xs leading-relaxed text-ash">{active.note}</p>
        </div>
      </motion.div>

      {/* Copy + food suggestion */}
      <div>
        <p className="eyebrow mb-4 flex items-center gap-2">
          <Utensils className="h-3.5 w-3.5 text-voltage" /> Surface 02 — AI Nutrition
        </p>
        <h3 className="font-display text-3xl font-extrabold leading-[1.02] sm:text-4xl">
          Fuel that moves
          <br />
          with the workload.
        </h3>
        <p className="mt-5 max-w-md text-ash">
          Macros aren&apos;t fixed — they follow the plan. Toggle the training demand
          and watch the day retarget: carbs surge for a heavy block, protein stays
          protected on recovery days.
        </p>

        <motion.div
          key={demand}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass mt-8 rounded-2xl border border-line p-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-voltage">
            Suggested next meal
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold">{active.suggestion.name}</p>
              <p className="mt-1 font-mono text-[11px] text-ash">{active.suggestion.macro}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-voltage/40 hover:text-voltage">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-faint">{active.suggestion.why}</p>
        </motion.div>
      </div>
    </div>
  );
}

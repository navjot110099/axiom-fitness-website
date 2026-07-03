"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { MACRO_RINGS } from "@/lib/data";

/**
 * Animated SVG macro rings. On inView each ring draws its arc via strokeDashoffset
 * to (value/target) of the circumference, in its own colour, while the number
 * counts up. A distinct animation vocabulary from the recovery page's scroll work.
 */

const SIZE = 200;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

function MacroRing({
  ring,
  active,
  delay,
}: {
  ring: (typeof MACRO_RINGS)[number];
  active: boolean;
  delay: number;
}) {
  const pct = ring.value / ring.target;
  const offset = C * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={ring.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={active ? { strokeDashoffset: offset } : { strokeDashoffset: C }}
            transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 12px ${ring.color}55)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-display text-4xl font-extrabold tabular-nums"
            style={{ color: ring.color }}
          >
            {active ? (
              <CountUp end={ring.value} duration={1.4} delay={delay} />
            ) : (
              0
            )}
            <span className="text-xl">{ring.unit}</span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">
            of {ring.target}
            {ring.unit}
          </div>
        </div>
      </div>
      <div className="mt-5 text-center">
        <div className="font-display text-lg font-extrabold text-bone">{ring.label}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ash">
          {Math.round(pct * 100)}% of target
        </div>
      </div>
    </div>
  );
}

export function NutritionMacroRings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="grid gap-12 sm:grid-cols-3">
      {MACRO_RINGS.map((r, i) => (
        <MacroRing key={r.label} ring={r} active={inView} delay={i * 0.15} />
      ))}
    </div>
  );
}

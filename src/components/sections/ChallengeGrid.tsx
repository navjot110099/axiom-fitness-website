"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Users, CalendarDays, ArrowUpRight, Check } from "lucide-react";
import { CHALLENGES } from "@/lib/data";

/**
 * Community challenge cards.
 * Each card carries an animated SVG participation ring (strokeDashoffset springs
 * closed on view), a join count that counts up when it enters the viewport, and
 * an accent tint pulled from the challenge. The Join CTA flips to a confirmed
 * state locally so the page feels responsive.
 */

type Challenge = (typeof CHALLENGES)[number];

const ACCENT_HEX: Record<string, string> = {
  voltage: "#25A8FF",
  ember: "#FF4D1C",
  plasma: "#6FD3FF",
  gold: "#E9C46A",
};

const ACCENT_TEXT: Record<string, string> = {
  voltage: "text-voltage",
  ember: "text-ember",
  plasma: "text-plasma",
  gold: "text-gold",
};

// Fill % is derived deterministically from participation so the ring means
// something without inventing extra data.
function fillFor(c: Challenge): number {
  return Math.min(96, Math.round((c.joined / 520) * 100));
}

function Ring({ pct, hex }: { pct: number; hex: string }) {
  const R = 44;
  const C = 2 * Math.PI * R;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
      <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <motion.circle
        cx="50"
        cy="50"
        r={R}
        fill="none"
        stroke={hex}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: inView ? C - (C * pct) / 100 : C }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
    </svg>
  );
}

function ChallengeCard({ c, index }: { c: Challenge; index: number }) {
  const [joined, setJoined] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const hex = ACCENT_HEX[c.accent] ?? ACCENT_HEX.voltage;
  const pct = fillFor(c);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 2) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-obsidian p-7"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: hex }}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
            style={{ borderColor: `${hex}55`, color: hex, background: `${hex}18` }}
          >
            {c.tag}
          </span>
          <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight">{c.name}</h3>
        </div>

        {/* Ring with % in the centre */}
        <div className="relative shrink-0">
          <Ring pct={pct} hex={hex} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-lg font-extrabold" style={{ color: hex }}>
              {pct}%
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-faint">
              full
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">{c.desc}</p>

      <div className="mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-ash">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-faint" />
          {c.days} days
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-faint" />
          <span className={ACCENT_TEXT[c.accent]}>
            {inView ? <CountUp end={c.joined} duration={2} separator="," /> : 0}
          </span>{" "}
          joined
        </span>
      </div>

      <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setJoined((v) => !v)}
          data-cursor="cta"
          data-cursor-label={joined ? "Joined" : "Join"}
          className="focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300"
          style={
            joined
              ? { background: "transparent", color: hex, border: `1px solid ${hex}55` }
              : { background: hex, color: "#0A0A0A" }
          }
        >
          {joined ? (
            <>
              <Check className="h-4 w-4" /> You&apos;re in
            </>
          ) : (
            <>
              Join challenge <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          {joined ? "Day 1 starts Monday" : "Free for members"}
        </span>
      </div>
    </motion.article>
  );
}

export function ChallengeGrid() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-2">
      {CHALLENGES.map((c, i) => (
        <ChallengeCard key={c.name} c={c} index={i} />
      ))}
    </div>
  );
}

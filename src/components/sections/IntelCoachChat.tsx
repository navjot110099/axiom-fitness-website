"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, HeartPulse, Moon, Activity, Check, SlidersHorizontal } from "lucide-react";

type Msg = {
  from: "coach" | "member";
  text: string;
  accent?: boolean;
};

const THREAD: Msg[] = [
  { from: "coach", text: "Morning, Alex. Your HRV is up 12% and sleep hit 7h48. You're primed today." },
  { from: "member", text: "Feeling it. What's the call — push the pull block?" },
  { from: "coach", text: "Yes. Load says green. Add a top single at 92% on deadlift, then deload the accessories so you bank the recovery." },
  { from: "coach", text: "I've also nudged tomorrow's conditioning down 15% — you're two sessions into a hard microcycle.", accent: true },
];

const CONTEXT = [
  { icon: HeartPulse, label: "HRV", value: "+12%", tone: "text-voltage" },
  { icon: Moon, label: "Sleep", value: "7h48", tone: "text-plasma" },
  { icon: Activity, label: "Load 7d", value: "Balanced", tone: "text-bone" },
];

function Typing() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ash"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function IntelCoachChat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [decision, setDecision] = useState<null | "accept" | "adjust">(null);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const step = (i: number) => {
      if (cancelled || i >= THREAD.length) return;
      setTyping(true);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setVisible(i + 1);
          timers.push(setTimeout(() => step(i + 1), 620));
        }, i === 0 ? 500 : 1050),
      );
    };
    step(0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  const showActions = visible >= THREAD.length && !typing;

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      {/* Left: framing copy + context chips */}
      <div>
        <p className="eyebrow mb-4 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-voltage" /> Surface 01 — AI Fitness Coach
        </p>
        <h3 className="font-display text-3xl font-extrabold leading-[1.02] sm:text-4xl">
          A coach that has already
          <br />
          read your morning.
        </h3>
        <p className="mt-5 max-w-md text-ash">
          Every signal — HRV, sleep, training load, mood — collapses into a single
          read. The coach opens each day with a specific move, and the reasoning
          behind it. You always hold the final call.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {CONTEXT.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass flex items-center gap-2.5 rounded-full border border-line px-4 py-2"
            >
              <c.icon className={`h-3.5 w-3.5 ${c.tone}`} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                {c.label}
              </span>
              <span className={`font-mono text-xs font-medium ${c.tone}`}>{c.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: chat panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 6 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative overflow-hidden rounded-3xl border border-line shadow-2xl shadow-black/50"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-voltage/[0.08] blur-[90px]" />

        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-voltage">
              <Sparkles className="h-3.5 w-3.5 text-void" />
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-none">AXIOM Coach</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-voltage">
                Online · reading live signals
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            Wed · 06:12
          </span>
        </div>

        {/* messages */}
        <div className="flex min-h-[340px] flex-col gap-3 px-6 py-6">
          <AnimatePresence initial={false}>
            {THREAD.slice(0, visible).map((m, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={m.from === "member" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.from === "member"
                      ? "max-w-[78%] rounded-2xl rounded-br-md border border-line bg-surface px-4 py-3 text-sm text-bone"
                      : m.accent
                        ? "max-w-[82%] rounded-2xl rounded-bl-md border border-voltage/25 bg-voltage/[0.06] px-4 py-3 text-sm leading-relaxed text-bone"
                        : "max-w-[82%] rounded-2xl rounded-bl-md border border-line bg-void/50 px-4 py-3 text-sm leading-relaxed text-bone"
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="rounded-2xl rounded-bl-md border border-line bg-void/50 px-2">
                <Typing />
              </div>
            </motion.div>
          )}
        </div>

        {/* action bar */}
        <div className="border-t border-line px-6 py-4">
          <AnimatePresence mode="wait">
            {showActions && !decision && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <button
                  onClick={() => setDecision("accept")}
                  data-cursor="cta"
                  data-cursor-label="Accept"
                  className="focus-ring flex items-center gap-2 rounded-full bg-voltage px-5 py-2 text-sm font-medium text-void transition-colors hover:bg-white"
                >
                  <Check className="h-3.5 w-3.5" /> Accept plan
                </button>
                <button
                  onClick={() => setDecision("adjust")}
                  data-cursor="cta"
                  data-cursor-label="Adjust"
                  className="focus-ring flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm text-ash transition-colors hover:border-bone/40 hover:text-bone"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Adjust
                </button>
              </motion.div>
            )}
            {showActions && decision && (
              <motion.p
                key="confirmed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-voltage"
              >
                <Check className="h-4 w-4" />
                {decision === "accept"
                  ? "Locked into today's plan"
                  : "Opening the session editor…"}
              </motion.p>
            )}
            {!showActions && (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] uppercase tracking-widest text-faint"
              >
                Coach is building today&apos;s recommendation…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

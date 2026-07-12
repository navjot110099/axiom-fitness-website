"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, TrendingUp, HeartPulse, Flame } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";

const LOAD = [42, 58, 35, 71, 64, 88, 52];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function ReadinessRing({ value }: { value: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#26262D" strokeWidth="10" />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#25A8FF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (value / 100) * c }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
}

export function Intelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative overflow-hidden border-t border-line py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[40vw] w-[40vw] rounded-full bg-voltage/[0.06] blur-[130px]" />
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Copy */}
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-voltage" /> / 04 — AXIOM Intelligence
            </p>
            <SplitText
              text="An AI coach that reads the whole picture."
              as="h2"
              className="font-display text-display-sm font-extrabold leading-[0.98]"
            />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
              Training load, sleep, HRV, nutrition and mood become one signal.
              AXIOM proposes the next session, flags overreach before it becomes
              injury, and adapts your plan every week. You always approve the move.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: TrendingUp, t: "Adaptive programming", d: "Your plan rewrites weekly around real recovery." },
                { icon: HeartPulse, t: "Overreach detection", d: "Early warning when load outpaces recovery." },
                { icon: Flame, t: "Fuel matching", d: "Macros retargeted to the day's training demand." },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                    <f.icon className="h-4 w-4 text-voltage" />
                  </span>
                  <div>
                    <p className="font-medium text-bone">{f.t}</p>
                    <p className="text-sm text-ash">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/intelligence" arrow>
                Explore the platform
              </Button>
            </div>
          </div>

          {/* Dashboard mock */}
          <div ref={ref} className="perspective">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong preserve-3d relative rounded-3xl p-6 shadow-2xl shadow-black/50"
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-voltage">
                    <span className="h-1.5 w-1.5 rounded-full bg-void" />
                  </span>
                  <span className="font-display text-sm font-bold">AXIOM OS</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Today · Wed
                </span>
              </div>

              <div className="grid gap-4 pt-5 sm:grid-cols-2">
                {/* readiness */}
                <div className="rounded-2xl border border-line bg-void/40 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    Readiness
                  </p>
                  <div className="relative mt-2 flex items-center justify-center">
                    <ReadinessRing value={82} />
                    <div className="absolute text-center">
                      <div className="font-display text-3xl font-extrabold text-voltage">82</div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-ash">
                        Primed
                      </div>
                    </div>
                  </div>
                </div>

                {/* coach message */}
                <div className="flex flex-col rounded-2xl border border-line bg-void/40 p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-voltage" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      Coach
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-bone">
                    HRV is up 12%. You&apos;re primed for the{" "}
                    <span className="text-voltage">heavy pull</span> block — add
                    a top single, then deload accessories.
                  </p>
                  <div className="mt-auto flex gap-2 pt-4">
                    <span className="rounded-full bg-voltage px-3 py-1 text-[11px] font-medium text-void">
                      Accept
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-[11px] text-ash">
                      Adjust
                    </span>
                  </div>
                </div>

                {/* weekly load */}
                <div className="rounded-2xl border border-line bg-void/40 p-5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      Training load · 7d
                    </p>
                    <p className="font-mono text-[10px] text-voltage">Balanced</p>
                  </div>
                  <div className="mt-4 flex h-24 items-end gap-2">
                    {LOAD.map((v, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={inView ? { height: `${v}%` } : {}}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className={`w-full rounded-t-md ${
                            i === 5 ? "bg-voltage" : "bg-elevated"
                          }`}
                        />
                        <span className="font-mono text-[9px] text-faint">{DAYS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp, Trophy, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { MEMBER } from "@/lib/data";

const W = 640;
const H = 260;
const PAD = { top: 28, right: 20, bottom: 34, left: 20 };

function buildPaths() {
  const vals = MEMBER.volume.map((v) => v.value);
  const min = Math.min(...vals) * 0.94;
  const max = Math.max(...vals) * 1.02;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const pts = MEMBER.volume.map((v, i) => {
    const x = PAD.left + (i / (MEMBER.volume.length - 1)) * innerW;
    const y = PAD.top + innerH - ((v.value - min) / (max - min)) * innerH;
    return { x, y, ...v };
  });

  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x} ${PAD.top + innerH} L ${pts[0].x} ${PAD.top + innerH} Z`;
  return { pts, line, area, innerH };
}

/** Parse the numeric part of a PR value for count-up (handles kg and mm:ss). */
function prNumber(value: string): { end: number; suffix: string; decimals: number; isTime: boolean } {
  if (value.includes(":")) {
    return { end: 0, suffix: value, decimals: 0, isTime: true };
  }
  const match = value.match(/([\d.]+)/);
  const end = match ? parseFloat(match[1]) : 0;
  const suffix = value.replace(/[\d.]+/, "");
  const decimals = match && match[1].includes(".") ? 1 : 0;
  return { end, suffix, decimals, isTime: false };
}

export function IntelProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const { pts, line, area, innerH } = buildPaths();

  return (
    <div ref={ref}>
      <div className="mb-8 max-w-md">
        <p className="eyebrow mb-4 flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-voltage" /> Surface 04 — Tracker + Progress
        </p>
        <h3 className="font-display text-3xl font-extrabold leading-[1.02] sm:text-4xl">
          The line that
          <br />
          only goes up.
        </h3>
        <p className="mt-5 text-ash">
          Every logged set feeds one number: total volume. Six weeks of work,
          drawn live — with the personal records it produced counting up beside it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong relative overflow-hidden rounded-3xl border border-line p-6 shadow-2xl shadow-black/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Total volume · 6 weeks
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-bone">
                {inView && <CountUp end={MEMBER.volume[MEMBER.volume.length - 1].value} duration={1.8} separator="," />}
                <span className="ml-1 font-mono text-xs font-normal text-ash">kg</span>
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-voltage/25 bg-voltage/[0.06] px-3 py-1 font-mono text-[11px] text-voltage">
              <ArrowUpRight className="h-3.5 w-3.5" /> +40% arc
            </span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="intel-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7F94B" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#C7F94B" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* gridlines */}
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={PAD.top + innerH * g}
                y2={PAD.top + innerH * g}
                stroke="#26262D"
                strokeWidth="1"
                strokeDasharray="2 5"
              />
            ))}

            {/* area fill */}
            <motion.path
              d={area}
              fill="url(#intel-area)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
            />

            {/* animated line */}
            <motion.path
              d={line}
              fill="none"
              stroke="#C7F94B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* nodes + labels */}
            {pts.map((p, i) => (
              <g key={p.week}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={i === pts.length - 1 ? 5 : 3.5}
                  fill={i === pts.length - 1 ? "#C7F94B" : "#0A0A0B"}
                  stroke="#C7F94B"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.22, duration: 0.4, ease: "backOut" }}
                />
                <text
                  x={p.x}
                  y={H - 12}
                  textAnchor="middle"
                  className="fill-faint font-mono"
                  style={{ fontSize: 10 }}
                >
                  {p.week}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* PR tiles */}
        <div className="grid grid-cols-2 gap-4">
          {MEMBER.prs.map((pr, i) => {
            const num = prNumber(pr.value);
            const down = pr.delta.trim().startsWith("-");
            // For a run time a negative delta is an improvement (green).
            const good = pr.lift.includes("Run") ? down : !down;
            return (
              <motion.div
                key={pr.lift}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass flex flex-col justify-between rounded-2xl border border-line p-5"
              >
                <div className="flex items-center justify-between">
                  <Trophy className="h-4 w-4 text-gold" />
                  <span
                    className={`flex items-center gap-0.5 font-mono text-[11px] ${
                      good ? "text-voltage" : "text-ember"
                    }`}
                  >
                    {down ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                    {pr.delta}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="font-display text-2xl font-extrabold text-bone">
                    {inView && !num.isTime ? (
                      <>
                        <CountUp
                          end={num.end}
                          duration={1.6}
                          decimals={num.decimals}
                          delay={0.5 + i * 0.12}
                        />
                        <span className="text-base font-bold text-ash">{num.suffix}</span>
                      </>
                    ) : (
                      pr.value
                    )}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                    {pr.lift}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weekly load footer strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass mt-6 flex flex-col gap-4 rounded-3xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
            This week&apos;s daily load
          </p>
          <p className="mt-1 text-sm text-ash">Seven days of relative effort, auto-scored.</p>
        </div>
        <div className="flex h-16 items-end gap-2">
          {MEMBER.weekLoad.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: v * 0.55 } : {}}
                transition={{ delay: 0.9 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-2.5 rounded-full ${v >= 80 ? "bg-voltage" : v >= 55 ? "bg-plasma" : "bg-elevated"}`}
                style={{ minHeight: 4 }}
              />
              <span className="font-mono text-[9px] text-faint">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

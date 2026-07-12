"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Flame,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Dumbbell,
  Apple,
  HeartPulse,
  ChevronRight,
  Zap,
} from "lucide-react";
import { MEMBER } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- utils */

function useCountUp(target: number, active: boolean, duration = 1.4, decimals = 0) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    decimals ? v.toFixed(decimals) : Math.round(v).toString(),
  );
  useEffect(() => {
    if (!active) return;
    const controls = animate(mv, target, { duration, ease: EASE });
    return controls.stop;
  }, [active, target, duration, mv]);
  return rounded;
}

function CountText({
  target,
  active,
  decimals = 0,
  className,
}: {
  target: number;
  active: boolean;
  decimals?: number;
  className?: string;
}) {
  const v = useCountUp(target, active, 1.4, decimals);
  return <motion.span className={className}>{v}</motion.span>;
}

/* ---------------------------------------------------------- activity rings */

function ActivityRing({
  value,
  color,
  radius,
  active,
  delay,
}: {
  value: number;
  color: string;
  radius: number;
  active: boolean;
  delay: number;
}) {
  const c = 2 * Math.PI * radius;
  return (
    <>
      <circle cx="90" cy="90" r={radius} fill="none" stroke="#1E1E24" strokeWidth="12" />
      <motion.circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={active ? { strokeDashoffset: c - (value / 100) * c } : {}}
        transition={{ duration: 1.6, ease: EASE, delay }}
        style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
      />
    </>
  );
}

function Rings({ active }: { active: boolean }) {
  const [move, fuel, rest] = MEMBER.rings;
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative">
        <svg viewBox="0 0 180 180" className="h-44 w-44 -rotate-90">
          <ActivityRing value={move.value} color={move.color} radius={74} active={active} delay={0.2} />
          <ActivityRing value={fuel.value} color={fuel.color} radius={56} active={active} delay={0.35} />
          <ActivityRing value={rest.value} color={rest.color} radius={38} active={active} delay={0.5} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Zap className="h-5 w-5 text-voltage" />
        </div>
      </div>
      <ul className="space-y-3">
        {MEMBER.rings.map((r, i) => (
          <li key={r.label} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />
            <div>
              <div className="flex items-baseline gap-1.5">
                <CountText
                  target={r.value}
                  active={active}
                  className="font-display text-2xl font-extrabold leading-none"
                />
                <span className="font-mono text-xs text-faint">%</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ash">
                {r.label}
              </div>
            </div>
            <span className="sr-only">{`ring ${i}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------- readiness dial */

function ReadinessDial({ active }: { active: boolean }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const val = MEMBER.readiness;
  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 150 150" className="h-40 w-40 -rotate-90">
        <circle cx="75" cy="75" r={r} fill="none" stroke="#1E1E24" strokeWidth="9" />
        <motion.circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="#25A8FF"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={active ? { strokeDashoffset: c - (val / 100) * c } : {}}
          transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 8px #25A8FF55)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <CountText
          target={val}
          active={active}
          className="font-display text-4xl font-extrabold text-voltage"
        />
        <span className="font-mono text-[9px] uppercase tracking-widest text-ash">Primed</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- weekly load bars */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function LoadBars({ active }: { active: boolean }) {
  const max = Math.max(...MEMBER.weekLoad);
  const peak = MEMBER.weekLoad.indexOf(max);
  return (
    <div className="flex h-40 items-end gap-2.5">
      {MEMBER.weekLoad.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={active ? { height: `${(v / max) * 100}%` } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: EASE }}
              className={`w-full rounded-t-md ${
                i === peak ? "bg-voltage shadow-[0_0_20px_rgba(37,168,255,0.35)]" : "bg-elevated"
              }`}
            />
          </div>
          <span className="font-mono text-[9px] uppercase text-faint">{DAYS[i][0]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- volume area line */

function VolumeChart({ active }: { active: boolean }) {
  const w = 520;
  const h = 190;
  const pad = { t: 20, r: 16, b: 26, l: 16 };
  const data = MEMBER.volume;
  const vals = data.map((d) => d.value);
  const min = Math.min(...vals) * 0.9;
  const max = Math.max(...vals) * 1.05;
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.t + innerH - ((v - min) / (max - min)) * innerH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.value)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[420px]">
        <defs>
          <linearGradient id="volFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25A8FF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#25A8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={pad.l}
            x2={w - pad.r}
            y1={pad.t + innerH * g}
            y2={pad.t + innerH * g}
            stroke="#1E1E24"
            strokeWidth="1"
          />
        ))}
        <motion.path
          d={areaPath}
          fill="url(#volFill)"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.9 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#25A8FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        />
        {data.map((d, i) => (
          <g key={d.week}>
            <motion.circle
              cx={x(i)}
              cy={y(d.value)}
              r={i === data.length - 1 ? 5 : 3}
              fill={i === data.length - 1 ? "#25A8FF" : "#0A0A0B"}
              stroke="#25A8FF"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.4, ease: EASE }}
            />
            <text
              x={x(i)}
              y={h - 8}
              textAnchor="middle"
              className="fill-faint font-mono"
              fontSize="9"
            >
              {d.week}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------- PR tiles */

function parseNumeric(value: string) {
  const m = value.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

function PRTile({ pr, active, delay }: { pr: (typeof MEMBER.prs)[number]; active: boolean; delay: number }) {
  const num = parseNumeric(pr.value);
  const suffix = pr.value.replace(/[\d.]+/, "");
  const isTime = pr.value.includes(":");
  const negative = pr.delta.startsWith("-");
  const good = isTime ? negative : !negative; // faster time good, more weight good
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="glass rounded-2xl border border-line p-5"
    >
      <div className="flex items-start justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-faint">{pr.lift}</p>
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[10px] ${
            good ? "bg-voltage/15 text-voltage" : "bg-ember/15 text-ember"
          }`}
        >
          {good ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {pr.delta}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-0.5">
        {isTime ? (
          <span className="font-display text-2xl font-extrabold">{pr.value}</span>
        ) : (
          <>
            <CountText
              target={num}
              active={active}
              decimals={pr.value.includes(".") ? 1 : 0}
              className="font-display text-2xl font-extrabold"
            />
            <span className="font-mono text-sm text-ash">{suffix}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------- quick links */

const QUICK = [
  { label: "Book a class", href: "/booking", icon: Calendar },
  { label: "Log a lift", href: "/dashboard", icon: Dumbbell },
  { label: "Nutrition", href: "/dashboard", icon: Apple },
  { label: "Recovery", href: "/dashboard", icon: HeartPulse },
];

/* ================================================================= root */

export function DashMember() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-10%" });
  const [greeting, setGreeting] = useState("Good evening");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);

  return (
    <div ref={ref} className="container-x pb-28">
      {/* Greeting header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="glass-strong flex flex-col gap-6 rounded-3xl border border-line p-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-voltage">
            {MEMBER.tier} Member
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-none sm:text-5xl">
            {greeting}, {MEMBER.name.split(" ")[0]}.
          </h1>
          <p className="mt-3 max-w-md text-ash">
            You are three sessions off your best month. Recovery says push — one heavy
            block, then coast.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-void/40 px-6 py-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember/15">
            <Flame className="h-6 w-6 text-ember" />
          </span>
          <div>
            <div className="flex items-baseline gap-1">
              <CountText
                target={MEMBER.streak}
                active={active}
                className="font-display text-3xl font-extrabold"
              />
              <span className="font-mono text-xs text-ash">days</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Current streak
            </p>
          </div>
        </div>
      </motion.div>

      {/* Rings + readiness + coach */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass rounded-3xl border border-line p-7 lg:col-span-2"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Daily activity
            </p>
            <span className="font-mono text-[10px] text-voltage">On track</span>
          </div>
          <Rings active={active} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Readiness
            </p>
            <TrendingUp className="h-3.5 w-3.5 text-voltage" />
          </div>
          <ReadinessDial active={active} />
          <p className="mt-2 text-center text-xs text-ash">
            HRV up 12% overnight — cleared for load.
          </p>
        </motion.div>
      </div>

      {/* Load + volume */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Training load · 7 days
              </p>
              <p className="mt-1 font-display text-lg font-bold">Weekly distribution</p>
            </div>
            <span className="rounded-full bg-voltage/15 px-3 py-1 font-mono text-[10px] text-voltage">
              Balanced
            </span>
          </div>
          <LoadBars active={active} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Total volume · 6 weeks
              </p>
              <p className="mt-1 font-display text-lg font-bold">
                <CountText target={17400} active={active} /> kg lifted
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-voltage/15 px-3 py-1 font-mono text-[10px] text-voltage">
              <ArrowUpRight className="h-3 w-3" /> +40%
            </span>
          </div>
          <VolumeChart active={active} />
        </motion.div>
      </div>

      {/* PRs */}
      <div className="mt-10">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-voltage" />
          <h2 className="font-display text-xl font-bold">Personal records</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            · last 30 days
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBER.prs.map((pr, i) => (
            <PRTile key={pr.lift} pr={pr} active={active} delay={0.2 + i * 0.1} />
          ))}
        </div>
      </div>

      {/* Upcoming + quick links */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass rounded-3xl border border-line p-7 lg:col-span-2"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Upcoming sessions</h2>
            <Link
              href="/booking"
              data-cursor="cta"
              className="focus-ring flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-voltage transition-opacity hover:opacity-70"
            >
              Book more <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {MEMBER.upcoming.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, x: -16 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
                className="group flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void/50 font-display text-sm font-bold text-voltage">
                    {s.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-medium text-bone">{s.name}</p>
                    <p className="font-mono text-[11px] text-ash">
                      {s.when} · {s.coach}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    data-cursor
                    className="focus-ring rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ash transition-colors hover:border-voltage/40 hover:text-bone"
                  >
                    Manage
                  </button>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-voltage" />
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <h2 className="mb-5 font-display text-xl font-bold">Quick links</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK.map((q, i) => (
              <motion.div
                key={q.label}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE }}
              >
                <Link
                  href={q.href}
                  data-cursor="cta"
                  className="focus-ring group flex aspect-square flex-col justify-between rounded-2xl border border-line bg-void/40 p-4 transition-colors hover:border-voltage/40"
                >
                  <q.icon className="h-5 w-5 text-voltage" />
                  <span className="text-sm font-medium leading-tight text-bone group-hover:text-voltage">
                    {q.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

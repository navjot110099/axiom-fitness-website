"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Clock,
  Users,
  Gauge,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Activity,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------- mock data */

type Status = "on-track" | "overreaching" | "detraining" | "peaking";

const CLIENTS: {
  name: string;
  focus: string;
  adherence: number;
  next: string;
  status: Status;
  load: number;
}[] = [
  { name: "Jordan Hale", focus: "Powerlifting peak", adherence: 96, next: "Today · 16:00", status: "peaking", load: 88 },
  { name: "Priya Nair", focus: "Mobility rebuild", adherence: 88, next: "Tomorrow · 09:00", status: "on-track", load: 54 },
  { name: "Marcus Bell", focus: "Hypertrophy block", adherence: 74, next: "Today · 17:30", status: "overreaching", load: 94 },
  { name: "Amara Okafor", focus: "Fight camp", adherence: 91, next: "Wed · 18:00", status: "on-track", load: 79 },
  { name: "Liam Fraser", focus: "Return to sport", adherence: 62, next: "Thu · 07:00", status: "detraining", load: 38 },
  { name: "Yuki Tanaka", focus: "Conditioning", adherence: 83, next: "Fri · 12:30", status: "on-track", load: 66 },
];

const TODAY = [
  { time: "07:00", client: "Small group", type: "Sunrise Strength", len: "60m", filled: 8, cap: 10 },
  { time: "12:30", client: "Yuki Tanaka", type: "1:1 Conditioning", len: "45m", filled: 1, cap: 1 },
  { time: "16:00", client: "Jordan Hale", type: "1:1 Peak session", len: "75m", filled: 1, cap: 1 },
  { time: "17:30", client: "Marcus Bell", type: "1:1 Hypertrophy", len: "60m", filled: 1, cap: 1 },
];

const LOAD_TREND = [58, 64, 61, 72, 68, 81, 76, 84];

const STATUS_META: Record<Status, { label: string; color: string; bg: string }> = {
  "on-track": { label: "On track", color: "text-voltage", bg: "bg-voltage/15" },
  overreaching: { label: "Overreaching", color: "text-ember", bg: "bg-ember/15" },
  detraining: { label: "Detraining", color: "text-plasma", bg: "bg-plasma/15" },
  peaking: { label: "Peaking", color: "text-gold", bg: "bg-gold/15" },
};

const ALERTS = [
  { client: "Marcus Bell", msg: "Acute load 34% above chronic — recommend a deload week.", tone: "ember" as const },
  { client: "Liam Fraser", msg: "Two sessions missed. Adherence slipping below 65%.", tone: "plasma" as const },
];

/* ------------------------------------------------------------- utils */

function useCountUp(target: number, active: boolean, decimals = 0) {
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toString()));
  useEffect(() => {
    if (!active) return;
    const c = animate(mv, target, { duration: 1.4, ease: EASE });
    return c.stop;
  }, [active, target, mv, decimals]);
  return out;
}

function Count({
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
  const v = useCountUp(target, active, decimals);
  return <motion.span className={className}>{v}</motion.span>;
}

/* ------------------------------------------------------------- KPI */

function Stat({
  active,
  value,
  suffix,
  label,
  icon: Icon,
  delay,
  decimals = 0,
}: {
  active: boolean;
  value: number;
  suffix?: string;
  label: string;
  icon: typeof Users;
  delay: number;
  decimals?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="glass rounded-2xl border border-line p-6"
    >
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-void/50">
        <Icon className="h-4 w-4 text-voltage" />
      </div>
      <div className="flex items-baseline gap-0.5">
        <Count target={value} active={active} decimals={decimals} className="font-display text-3xl font-extrabold" />
        {suffix && <span className="font-mono text-sm text-ash">{suffix}</span>}
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------- load chart */

function ClientLoadChart({ active }: { active: boolean }) {
  const w = 480;
  const h = 170;
  const pad = { t: 16, b: 16, l: 12, r: 12 };
  const max = Math.max(...LOAD_TREND) * 1.1;
  const min = Math.min(...LOAD_TREND) * 0.85;
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const x = (i: number) => pad.l + (i / (LOAD_TREND.length - 1)) * iw;
  const y = (v: number) => pad.t + ih - ((v - min) / (max - min)) * ih;
  const line = LOAD_TREND.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const area = `${line} L ${x(LOAD_TREND.length - 1)} ${pad.t + ih} L ${x(0)} ${pad.t + ih} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="trLoad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FD3FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6FD3FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.33, 0.66].map((g) => (
        <line key={g} x1={pad.l} x2={w - pad.r} y1={pad.t + ih * g} y2={pad.t + ih * g} stroke="#1E1E24" />
      ))}
      <motion.path
        d={area}
        fill="url(#trLoad)"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#6FD3FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
        style={{ filter: "drop-shadow(0 0 6px #6FD3FF44)" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------- adherence bar */

function AdherenceBar({ value, active, delay }: { value: number; active: boolean; delay: number }) {
  const color = value >= 85 ? "#25A8FF" : value >= 70 ? "#6FD3FF" : "#FF4D1C";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-void">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={active ? { width: `${value}%` } : {}}
        transition={{ delay, duration: 1, ease: EASE }}
      />
    </div>
  );
}

/* ================================================================= root */

export function DashTrainer() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-10%" });

  const avgAdherence = Math.round(CLIENTS.reduce((s, c) => s + c.adherence, 0) / CLIENTS.length);

  return (
    <div ref={ref} className="container-x pb-28">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="glass-strong flex flex-col gap-6 rounded-3xl border border-line p-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-voltage">
            Coach console
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-none sm:text-5xl">
            Your floor, Mara.
          </h1>
          <p className="mt-3 max-w-md text-ash">
            Four sessions today, {CLIENTS.length} active clients. Two need your eyes before
            you touch a barbell.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-line bg-void/40 px-5 py-4 text-center">
            <div className="font-display text-2xl font-extrabold text-voltage">
              <Count target={TODAY.length} active={active} />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-faint">Sessions</p>
          </div>
          <div className="rounded-2xl border border-line bg-void/40 px-5 py-4 text-center">
            <div className="font-display text-2xl font-extrabold text-ember">
              <Count target={ALERTS.length} active={active} />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-faint">Alerts</p>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat active={active} value={CLIENTS.length} label="Active clients" icon={Users} delay={0.1} />
        <Stat active={active} value={avgAdherence} suffix="%" label="Avg adherence" icon={Activity} delay={0.18} />
        <Stat active={active} value={82} suffix="%" label="Capacity used" icon={Gauge} delay={0.26} />
        <Stat active={active} value={31} suffix="h" label="Booked this week" icon={Clock} delay={0.34} />
      </div>

      {/* Today + load chart */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Today&apos;s sessions</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-faint">Wed</span>
          </div>
          <ul className="space-y-2">
            {TODAY.map((s, i) => (
              <motion.li
                key={s.time}
                initial={{ opacity: 0, x: -16 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-void/30 p-4 transition-colors hover:border-voltage/30"
              >
                <span className="font-mono text-sm font-bold text-voltage">{s.time}</span>
                <div className="flex-1">
                  <p className="font-medium text-bone">{s.type}</p>
                  <p className="font-mono text-[11px] text-ash">
                    {s.client} · {s.len}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-faint">
                  {s.filled}/{s.cap}
                </span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-voltage" />
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
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Roster load · 8 weeks
              </p>
              <p className="mt-1 font-display text-lg font-bold">Average client load</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-plasma/15 px-3 py-1 font-mono text-[10px] text-plasma">
              <ArrowUpRight className="h-3 w-3" /> Rising
            </span>
          </div>
          <ClientLoadChart active={active} />
          <p className="mt-3 text-xs text-ash">
            Roster is trending up. Watch total volume as fight camp intensifies next block.
          </p>
        </motion.div>
      </div>

      {/* Roster table */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mt-6 glass rounded-3xl border border-line p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Client roster</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            {CLIENTS.length} active
          </span>
        </div>
        {/* header row */}
        <div className="hidden grid-cols-[1.6fr_1fr_1.4fr_1fr] gap-4 border-b border-line pb-3 sm:grid">
          {["Client", "Adherence", "Next session", "Status"].map((h) => (
            <span key={h} className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {h}
            </span>
          ))}
        </div>
        <div className="divide-y divide-line">
          {CLIENTS.map((c, i) => {
            const meta = STATUS_META[c.status];
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-[1.6fr_1fr_1.4fr_1fr] sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void/50 font-display text-xs font-bold text-voltage">
                    {c.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <div>
                    <p className="font-medium text-bone">{c.name}</p>
                    <p className="font-mono text-[10px] text-ash">{c.focus}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AdherenceBar value={c.adherence} active={active} delay={0.4 + i * 0.08} />
                  <span className="w-9 shrink-0 font-mono text-xs text-ash">{c.adherence}%</span>
                </div>
                <span className="font-mono text-xs text-ash">{c.next}</span>
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] ${meta.bg} ${meta.color}`}
                >
                  <CircleDot className="h-3 w-3" /> {meta.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        {ALERTS.map((a, i) => (
          <div
            key={a.client}
            className={`glass flex items-start gap-4 rounded-2xl border p-6 ${
              a.tone === "ember" ? "border-ember/30" : "border-plasma/30"
            }`}
          >
            <span
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                a.tone === "ember" ? "bg-ember/15" : "bg-plasma/15"
              }`}
            >
              <AlertTriangle
                className={`h-4 w-4 ${a.tone === "ember" ? "text-ember" : "text-plasma"}`}
              />
            </span>
            <div>
              <p className="font-medium text-bone">{a.client}</p>
              <p className="mt-1 text-sm text-ash">{a.msg}</p>
              <button
                data-cursor
                className="focus-ring mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-voltage transition-opacity hover:opacity-70"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Adjust program
              </button>
            </div>
            <span className="sr-only">alert {i}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

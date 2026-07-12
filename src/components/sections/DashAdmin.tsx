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
  Users,
  DollarSign,
  Activity,
  TrendingDown,
  Smile,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------- mock data */

const REVENUE: { month: string; value: number }[] = [
  { month: "Jan", value: 412 },
  { month: "Feb", value: 438 },
  { month: "Mar", value: 461 },
  { month: "Apr", value: 449 },
  { month: "May", value: 502 },
  { month: "Jun", value: 548 },
  { month: "Jul", value: 571 },
  { month: "Aug", value: 604 },
  { month: "Sep", value: 596 },
  { month: "Oct", value: 641 },
  { month: "Nov", value: 688 },
  { month: "Dec", value: 724 },
];

const DISCIPLINE_USE: { name: string; pct: number; color: string }[] = [
  { name: "Strength Lab", pct: 92, color: "#25A8FF" },
  { name: "The Furnace", pct: 84, color: "#FF4D1C" },
  { name: "The Yard", pct: 78, color: "#FF4D1C" },
  { name: "Velodrome", pct: 71, color: "#6FD3FF" },
  { name: "Reform Room", pct: 66, color: "#25A8FF" },
  { name: "Stillness Studio", pct: 58, color: "#E9C46A" },
  { name: "The Depths", pct: 44, color: "#6FD3FF" },
];

const OCCUPANCY: { hour: string; pct: number }[] = [
  { hour: "6", pct: 62 },
  { hour: "8", pct: 88 },
  { hour: "10", pct: 41 },
  { hour: "12", pct: 74 },
  { hour: "14", pct: 38 },
  { hour: "16", pct: 55 },
  { hour: "18", pct: 96 },
  { hour: "20", pct: 79 },
];

const SIGNUPS: { name: string; tier: string; when: string; source: string }[] = [
  { name: "Elena Costa", tier: "Signature", when: "12 min ago", source: "Referral" },
  { name: "Ray Osei", tier: "Performance", when: "1 hr ago", source: "Web" },
  { name: "Hana Kim", tier: "Signature", when: "3 hrs ago", source: "Event" },
  { name: "Tomas Ruiz", tier: "Essential", when: "5 hrs ago", source: "Web" },
  { name: "Zoë Bennett", tier: "Performance", when: "Yesterday", source: "Referral" },
];

const TIER_TONE: Record<string, string> = {
  Signature: "bg-gold/15 text-gold",
  Performance: "bg-voltage/15 text-voltage",
  Essential: "bg-plasma/15 text-plasma",
};

/* ------------------------------------------------------------- utils */

function useCountUp(target: number, active: boolean, decimals = 0) {
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toString()));
  useEffect(() => {
    if (!active) return;
    const c = animate(mv, target, { duration: 1.6, ease: EASE });
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

/* ------------------------------------------------------------- KPI card */

function KPI({
  active,
  icon: Icon,
  prefix,
  value,
  suffix,
  decimals = 0,
  label,
  delta,
  positive,
  delay,
}: {
  active: boolean;
  icon: typeof Users;
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  delta: string;
  positive: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="glass rounded-2xl border border-line p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-void/50">
          <Icon className="h-4 w-4 text-voltage" />
        </span>
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[10px] ${
            positive ? "bg-voltage/15 text-voltage" : "bg-ember/15 text-ember"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {delta}
        </span>
      </div>
      <div className="flex items-baseline gap-0.5">
        {prefix && <span className="font-display text-xl font-extrabold text-ash">{prefix}</span>}
        <Count target={value} active={active} decimals={decimals} className="font-display text-3xl font-extrabold" />
        {suffix && <span className="font-mono text-sm text-ash">{suffix}</span>}
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------- revenue chart */

function RevenueChart({ active }: { active: boolean }) {
  const max = Math.max(...REVENUE.map((r) => r.value)) * 1.08;
  return (
    <div className="flex h-56 items-end gap-1.5 sm:gap-2">
      {REVENUE.map((r, i) => (
        <div key={r.month} className="group flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={active ? { height: `${(r.value / max) * 100}%` } : {}}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: EASE }}
              className={`w-full rounded-t-md ${
                i === REVENUE.length - 1
                  ? "bg-voltage shadow-[0_0_18px_rgba(37,168,255,0.35)]"
                  : "bg-elevated group-hover:bg-voltage/40"
              } transition-colors`}
            />
            <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-void px-1.5 py-0.5 font-mono text-[9px] text-voltage opacity-0 transition-opacity group-hover:opacity-100">
              ${r.value}k
            </span>
          </div>
          <span className="font-mono text-[8px] uppercase text-faint sm:text-[9px]">
            {r.month[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- discipline bars */

function DisciplineBars({ active }: { active: boolean }) {
  return (
    <div className="space-y-3.5">
      {DISCIPLINE_USE.map((d, i) => (
        <div key={d.name} className="flex items-center gap-4">
          <span className="w-32 shrink-0 truncate text-sm text-bone">{d.name}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-void">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: d.color }}
              initial={{ width: 0 }}
              animate={active ? { width: `${d.pct}%` } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: EASE }}
            />
          </div>
          <span className="w-9 shrink-0 text-right font-mono text-xs text-ash">{d.pct}%</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- occupancy */

function Occupancy({ active }: { active: boolean }) {
  const peak = OCCUPANCY.reduce((p, c) => (c.pct > p.pct ? c : p));
  return (
    <div className="flex h-40 items-end gap-3">
      {OCCUPANCY.map((o, i) => (
        <div key={o.hour} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={active ? { height: `${o.pct}%` } : {}}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: EASE }}
              className={`w-full rounded-md ${
                o.hour === peak.hour ? "bg-ember" : "bg-elevated"
              }`}
            />
          </div>
          <span className="font-mono text-[9px] text-faint">{o.hour}</span>
        </div>
      ))}
    </div>
  );
}

/* ================================================================= root */

export function DashAdmin() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="container-x pb-28">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="glass-strong flex flex-col gap-6 rounded-3xl border border-line p-7 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-voltage">
            Operations · Flagship NYC
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-none sm:text-5xl">
            The house is full.
          </h1>
          <p className="mt-3 max-w-md text-ash">
            December closed at record revenue and a personal-best NPS. Floor utilization is
            the only lever left to pull.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-void/40 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-voltage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
            Live · updated 2m ago
          </span>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KPI active={active} icon={Users} value={3428} label="Total members" delta="+6.2%" positive delay={0.1} />
        <KPI active={active} icon={DollarSign} prefix="$" value={724} suffix="k" label="MRR" delta="+5.3%" positive delay={0.18} />
        <KPI active={active} icon={Activity} value={81} suffix="%" label="Floor utilization" delta="+3.1%" positive delay={0.26} />
        <KPI active={active} icon={TrendingDown} value={2.4} decimals={1} suffix="%" label="Monthly churn" delta="-0.4%" positive delay={0.34} />
        <KPI active={active} icon={Smile} value={74} label="NPS" delta="+9" positive delay={0.42} />
      </div>

      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mt-6 glass rounded-3xl border border-line p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Recurring revenue · 12 months
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold">
              $<Count target={6512} active={active} />k annualised
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-voltage/15 px-3 py-1 font-mono text-[10px] text-voltage">
            <ArrowUpRight className="h-3 w-3" /> +75% YoY
          </span>
        </div>
        <RevenueChart active={active} />
      </motion.div>

      {/* Discipline util + occupancy */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              Utilization by discipline
            </p>
            <p className="mt-1 font-display text-lg font-bold">Where the floor lives</p>
          </div>
          <DisciplineBars active={active} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="glass rounded-3xl border border-line p-7"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Occupancy by hour
              </p>
              <p className="mt-1 font-display text-lg font-bold">Peak at 18:00</p>
            </div>
            <span className="rounded-full bg-ember/15 px-3 py-1 font-mono text-[10px] text-ember">
              96% peak
            </span>
          </div>
          <Occupancy active={active} />
          <p className="mt-4 text-xs text-ash">
            Mid-morning is your soft spot — 41% at 10:00. A prime target for daytime
            memberships.
          </p>
        </motion.div>
      </div>

      {/* Recent signups */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mt-6 glass rounded-3xl border border-line p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent signups</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            48 this week
          </span>
        </div>
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 border-b border-line pb-3 sm:grid">
          {["Member", "Tier", "Joined", "Source"].map((h) => (
            <span key={h} className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {h}
            </span>
          ))}
        </div>
        <div className="divide-y divide-line">
          {SIGNUPS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -14 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE }}
              className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void/50 font-display text-xs font-bold text-voltage">
                  {s.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span className="font-medium text-bone">{s.name}</span>
              </div>
              <span
                className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] ${TIER_TONE[s.tier]}`}
              >
                {s.tier}
              </span>
              <span className="font-mono text-xs text-ash">{s.when}</span>
              <span className="font-mono text-xs text-faint">{s.source}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

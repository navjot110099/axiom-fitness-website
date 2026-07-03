"use client";

import { useRef } from "react";
import {
  Snowflake,
  Flame,
  Sun,
  Wind,
  Activity,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { RECOVERY } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Snowflake,
  Flame,
  Sun,
  Wind,
  Activity,
  Moon,
};

const TONE: Record<string, string> = {
  Snowflake: "#5AA9FF",
  Flame: "#FF4D1C",
  Sun: "#FFB061",
  Wind: "#7FB3FF",
  Activity: "#C7F94B",
  Moon: "#9C8CFF",
};

function ModalityCard({
  name,
  detail,
  icon,
}: {
  name: string;
  detail: string;
  icon: string;
}) {
  const Icon = ICONS[icon] ?? Activity;
  const color = TONE[icon] ?? "#C7F94B";

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--ly", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <TiltCard className="h-full rounded-3xl">
      <div
        onPointerMove={onMove}
        className="group relative h-full overflow-hidden rounded-3xl border border-line bg-obsidian p-8"
      >
        {/* cursor-tracked hover lighting */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at var(--lx,50%) var(--ly,50%), ${color}22, transparent 60%)`,
          }}
        />
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border"
          style={{ borderColor: `${color}40`, background: `${color}12` }}
        >
          <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.5} />
        </div>
        <h3 className="relative mt-6 font-display text-2xl font-extrabold text-bone">
          {name}
        </h3>
        <p className="relative mt-2 font-mono text-[11px] uppercase tracking-widest text-faint">
          {detail}
        </p>
      </div>
    </TiltCard>
  );
}

const PROTOCOL = [
  { step: "01", time: "0–3 min", title: "Cold plunge", body: "Enter at 3°C. Constrict, brace, breathe slow. The shock flushes metabolic load." },
  { step: "02", time: "3–6 min", title: "Reheat", body: "Move to the infrared lounge. Radiant heat pulls blood back to the surface." },
  { step: "03", time: "6–9 min", title: "Sauna soak", body: "Ninety degrees of cedar heat. Vasodilation floods tissue with fresh supply." },
  { step: "04", time: "9–12 min", title: "Repeat contrast", body: "Two more cold-hot cycles. Each pass sharpens the vascular pump." },
  { step: "05", time: "12–25 min", title: "Compression & NSDR", body: "Pneumatic recovery, then a guided sleep pod. The system finally stands down." },
];

function TimelineRow({
  item,
  index,
}: {
  item: (typeof PROTOCOL)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 pl-1 last:pb-0"
    >
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-obsidian font-mono text-xs text-plasma">
          {item.step}
        </span>
        {index < PROTOCOL.length - 1 && (
          <motion.span
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.06 + 0.2 }}
            style={{ originY: 0 }}
            className="mt-1 w-px flex-1 bg-gradient-to-b from-plasma/60 to-ember/50"
          />
        )}
      </div>
      <div className="pt-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          {item.time}
        </div>
        <h4 className="mt-1 font-display text-xl font-extrabold text-bone">{item.title}</h4>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">{item.body}</p>
      </div>
    </motion.div>
  );
}

export function RecoveryModalitiesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {RECOVERY.map((r) => (
        <ModalityCard key={r.name} name={r.name} detail={r.detail} icon={r.icon} />
      ))}
    </div>
  );
}

export function RecoveryProtocolTimeline() {
  return (
    <div className="mt-14">
      {PROTOCOL.map((p, i) => (
        <TimelineRow key={p.step} item={p} index={i} />
      ))}
    </div>
  );
}

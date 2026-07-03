"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/content";

const HOURS = [
  { day: "Mon — Fri", time: "05:00 — 23:00" },
  { day: "Saturday", time: "06:00 — 22:00" },
  { day: "Sunday", time: "07:00 — 21:00" },
  { day: "Recovery suite", time: "24 / 7 · members" },
];

// Abstract street grid — hand-placed vector "map" so we never touch a blocked iframe.
const H_LINES = [40, 96, 168, 232, 300, 364];
const V_LINES = [56, 132, 210, 300, 388, 460];
const PARKS = [
  { x: 132, y: 96, w: 78, h: 72 },
  { x: 300, y: 232, w: 88, h: 68 },
];
const ROUTE = "M0 168 L210 168 L210 300 L460 300 L460 364";

export function ContactMap() {
  const PIN = { x: 210, y: 168 };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-obsidian">
      {/* ---------------- Stylized map ---------------- */}
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        <svg
          viewBox="0 0 520 420"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="mapglow" cx="40%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#141414" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
            <linearGradient id="pinbeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C7F94B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C7F94B" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="520" height="420" fill="url(#mapglow)" />

          {/* parks / blocks */}
          {PARKS.map((p, i) => (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx="6"
              fill="#C7F94B"
              opacity="0.05"
            />
          ))}

          {/* street grid */}
          {H_LINES.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} stroke="#2a2a2a" strokeWidth="1.5" />
          ))}
          {V_LINES.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420" stroke="#2a2a2a" strokeWidth="1.5" />
          ))}

          {/* a couple of thicker avenues */}
          <line x1="0" y1="168" x2="520" y2="168" stroke="#3a3a3a" strokeWidth="4" />
          <line x1="210" y1="0" x2="210" y2="420" stroke="#3a3a3a" strokeWidth="4" />

          {/* animated route drawing toward the pin */}
          <motion.path
            d={ROUTE}
            fill="none"
            stroke="#C7F94B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* pin beam */}
          <rect x={PIN.x - 14} y={PIN.y} width="28" height="220" fill="url(#pinbeam)" opacity="0.6" />

          {/* pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={PIN.x}
              cy={PIN.y}
              r="10"
              fill="none"
              stroke="#C7F94B"
              strokeWidth="1.5"
              initial={{ scale: 0.4, opacity: 0.7 }}
              animate={{ scale: 4.2, opacity: 0 }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }}
              style={{ transformOrigin: `${PIN.x}px ${PIN.y}px` }}
            />
          ))}

          {/* the pin */}
          <motion.g
            initial={{ y: -18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.4 }}
          >
            <circle cx={PIN.x} cy={PIN.y} r="9" fill="#C7F94B" />
            <circle cx={PIN.x} cy={PIN.y} r="3.5" fill="#0a0a0a" />
          </motion.g>
        </svg>

        {/* label chip over the map */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-voltage/30 bg-void/70 px-3 py-1.5 backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-voltage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-bone">
            One Meridian Row
          </span>
        </div>

        {/* fade into details */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      {/* ---------------- Contact details ---------------- */}
      <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <Detail icon={<MapPin className="h-4 w-4" />} label="Studio" value={BRAND.location} />
          <Detail
            icon={<Mail className="h-4 w-4" />}
            label="Concierge"
            value={BRAND.email}
            href={`mailto:${BRAND.email}`}
          />
          <Detail
            icon={<Phone className="h-4 w-4" />}
            label="Direct line"
            value={BRAND.phone}
            href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
          />
          <Detail icon={<Clock className="h-4 w-4" />} label="Response" value="Within one business day" />
        </div>

        <div className="hairline" />

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-faint">Opening hours</p>
          <ul className="mt-4 space-y-3">
            {HOURS.map((h, i) => (
              <motion.li
                key={h.day}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="text-ash">{h.day}</span>
                <span className="flex-1 translate-y-1 border-b border-dashed border-line" />
                <span className="font-mono text-bone">{h.time}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint">
        <span className="text-voltage">{icon}</span>
        {label}
      </span>
      <span className="mt-1.5 block text-sm text-bone transition-colors group-hover/detail:text-voltage">
        {value}
      </span>
    </>
  );
  return href ? (
    <a href={href} data-cursor className="group/detail block">
      {body}
    </a>
  ) : (
    <div className="group/detail">{body}</div>
  );
}

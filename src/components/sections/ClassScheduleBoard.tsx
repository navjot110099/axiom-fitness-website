"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Timer, User, ArrowUpRight } from "lucide-react";
import { CLASS_DAYS, CLASSES } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

/**
 * Filterable weekly class board.
 * Day + discipline chips drive a framer-motion `layout` grid so cards re-flow
 * with a spring when the filter changes (AnimatePresence handles exits).
 * Each card carries an animated 5-bar intensity meter and a spots-left badge
 * that turns ember when capacity is running low.
 */

type ClassItem = (typeof CLASSES)[number];

// Deterministic per-day roster: rotate the base list so each day reads unique
// without inventing off-brand data.
function rosterForDay(dayIndex: number): ClassItem[] {
  if (dayIndex === -1) return CLASSES;
  const offset = dayIndex % CLASSES.length;
  const rotated = [...CLASSES.slice(offset), ...CLASSES.slice(0, offset)];
  // Weekend days run a lighter board.
  const count = dayIndex >= 5 ? 4 : CLASSES.length;
  return rotated.slice(0, count);
}

const DISCIPLINES = ["All", ...Array.from(new Set(CLASSES.map((c) => c.discipline)))];

function IntensityMeter({ level }: { level: number }) {
  return (
    <div className="flex items-end gap-1" aria-label={`Intensity ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < level;
        return (
          <motion.span
            key={i}
            initial={{ scaleY: 0.2, opacity: 0.3 }}
            whileInView={{ scaleY: on ? 1 : 0.35, opacity: on ? 1 : 0.25 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 320, damping: 20 }}
            className={`w-1.5 origin-bottom rounded-full ${
              on ? (level >= 4 ? "bg-ember" : "bg-voltage") : "bg-line"
            }`}
            style={{ height: `${8 + i * 4}px` }}
          />
        );
      })}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  accent = "voltage",
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  accent?: "voltage" | "plasma";
}) {
  const activeCls =
    accent === "plasma"
      ? "border-plasma/50 text-plasma"
      : "border-voltage/50 text-voltage";
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor
      className={`focus-ring relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
        active ? activeCls : "border-line text-ash hover:border-bone/40 hover:text-bone"
      }`}
    >
      {active && (
        <motion.span
          layoutId={`chip-${accent}`}
          className={`absolute inset-0 -z-10 rounded-full ${
            accent === "plasma" ? "bg-plasma/10" : "bg-voltage/10"
          }`}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      {children}
    </button>
  );
}

export function ClassScheduleBoard() {
  const [day, setDay] = useState<number>(-1); // -1 = whole week
  const [discipline, setDiscipline] = useState<string>("All");

  const roster = useMemo(() => {
    const base = rosterForDay(day);
    return discipline === "All"
      ? base
      : base.filter((c) => c.discipline === discipline);
  }, [day, discipline]);

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x">
        {/* Day chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-faint">
            Day
          </span>
          <Chip active={day === -1} onClick={() => setDay(-1)}>
            All week
          </Chip>
          {CLASS_DAYS.map((d, i) => (
            <Chip key={d} active={day === i} onClick={() => setDay(i)}>
              {d}
            </Chip>
          ))}
        </div>

        {/* Discipline chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-faint">
            Discipline
          </span>
          {DISCIPLINES.map((d) => (
            <Chip
              key={d}
              active={discipline === d}
              accent="plasma"
              onClick={() => setDiscipline(d)}
            >
              {d}
            </Chip>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-voltage/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-voltage" />
          </span>
          {roster.length} sessions{" "}
          {day === -1 ? "this week" : `on ${CLASS_DAYS[day]}`}
        </div>

        {/* Cards */}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {roster.map((c) => {
              const low = c.spots <= 3;
              return (
                <motion.article
                  key={`${c.name}-${c.time}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-obsidian p-6"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-voltage/[0.06] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-sm text-voltage">
                        <Clock className="h-3.5 w-3.5" />
                        {c.time}
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">
                        {c.name}
                      </h3>
                    </div>
                    <Badge tone={low ? "ember" : "neutral"}>
                      {c.spots} spot{c.spots === 1 ? "" : "s"} left
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ash">
                    <span className="inline-flex items-center gap-1.5">
                      <Timer className="h-3.5 w-3.5 text-faint" />
                      {c.len}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-faint" />
                      {c.coach}
                    </span>
                    <span className="text-plasma">{c.discipline}</span>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                        Intensity
                      </p>
                      <div className="mt-2">
                        <IntensityMeter level={c.intensity} />
                      </div>
                    </div>
                    <a
                      href="/booking"
                      data-cursor="cta"
                      data-cursor-label="Reserve"
                      className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-voltage px-5 py-2.5 text-sm font-medium text-void transition-colors duration-300 hover:bg-white"
                    >
                      Reserve
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {roster.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center font-mono text-sm uppercase tracking-widest text-faint"
          >
            No {discipline === "All" ? "" : `${discipline} `}sessions on this day —
            try another filter.
          </motion.p>
        )}
      </div>
    </section>
  );
}

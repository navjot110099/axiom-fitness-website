"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Wind,
  Zap,
  Waves,
  Activity,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
} from "lucide-react";
import { BOOKING_DISCIPLINES, BOOKING_TIMES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------- meta */

const DISC_META: Record<
  string,
  { icon: typeof Dumbbell; kicker: string; color: string }
> = {
  "Strength Lab": { icon: Dumbbell, kicker: "Powerlifting · Hypertrophy", color: "#C7F94B" },
  "The Furnace": { icon: Flame, kicker: "HIIT · Conditioning", color: "#FF4D1C" },
  "Stillness Studio": { icon: Wind, kicker: "Yoga · Mobility", color: "#E9C46A" },
  "Iron & Rope": { icon: Zap, kicker: "Boxing · MMA", color: "#FF4D1C" },
  "The Depths": { icon: Waves, kicker: "Swimming · Aqua", color: "#5AA9FF" },
  "Reform Room": { icon: Activity, kicker: "Pilates · Barre", color: "#C7F94B" },
};

const STEPS = ["Discipline", "Date", "Time", "Confirm"] as const;

const MONTH_LABEL = "July 2026";
const YEAR = 2026;
const MONTH = 6; // July (0-indexed)
const DAYS_IN_MONTH = 31;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/* ================================================================= root */

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [discipline, setDiscipline] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const firstWeekday = useMemo(() => new Date(YEAR, MONTH, 1).getDay(), []);
  const today = 3; // treat July 3 as "today" per session date

  const canNext =
    (step === 0 && discipline) ||
    (step === 1 && day) ||
    (step === 2 && time) ||
    step === 3;

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(4px)" }),
  };

  const dateLabel =
    day != null
      ? new Date(YEAR, MONTH, day).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <div className="container-x pb-28">
      <div className="mx-auto max-w-2xl">
        {/* Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      animate={{
                        backgroundColor: done || current ? "#C7F94B" : "#1E1E24",
                        color: done || current ? "#0A0A0B" : "#6B6B76",
                        scale: current ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold"
                    >
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </motion.span>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-widest ${
                        current ? "text-voltage" : "text-faint"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mx-2 h-px flex-1 overflow-hidden bg-line">
                      <motion.div
                        className="h-full bg-voltage"
                        initial={false}
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="glass-strong relative overflow-hidden rounded-3xl border border-line p-7 sm:p-9">
          <AnimatePresence mode="wait" custom={dir}>
            {/* STEP 1 — discipline */}
            {step === 0 && (
              <motion.div
                key="s0"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="font-display text-2xl font-extrabold">Choose your world</h2>
                <p className="mt-2 text-sm text-ash">
                  Six instrumented rooms. Pick where today happens.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BOOKING_DISCIPLINES.map((d) => {
                    const meta = DISC_META[d];
                    const Icon = meta.icon;
                    const selected = discipline === d;
                    return (
                      <button
                        key={d}
                        data-cursor="cta"
                        onClick={() => setDiscipline(d)}
                        className={`focus-ring group relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                          selected
                            ? "border-voltage bg-voltage/[0.06]"
                            : "border-line bg-void/30 hover:border-voltage/40"
                        }`}
                      >
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${meta.color}22` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: meta.color }} />
                        </span>
                        <div>
                          <p className="font-medium text-bone">{d}</p>
                          <p className="font-mono text-[10px] text-ash">{meta.kicker}</p>
                        </div>
                        <AnimatePresence>
                          {selected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-voltage"
                            >
                              <Check className="h-3 w-3 text-void" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — date */}
            {step === 1 && (
              <motion.div
                key="s1"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="font-display text-2xl font-extrabold">Pick a date</h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ash">
                  <CalendarIcon className="h-3.5 w-3.5 text-voltage" /> {MONTH_LABEL}
                </p>
                <div className="mt-6 grid grid-cols-7 gap-1.5">
                  {WEEKDAYS.map((w, i) => (
                    <div
                      key={i}
                      className="pb-2 text-center font-mono text-[10px] uppercase text-faint"
                    >
                      {w}
                    </div>
                  ))}
                  {Array.from({ length: firstWeekday }).map((_, i) => (
                    <div key={`blank-${i}`} />
                  ))}
                  {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
                    const d = i + 1;
                    const past = d < today;
                    const selected = day === d;
                    return (
                      <motion.button
                        key={d}
                        data-cursor={past ? undefined : "cta"}
                        disabled={past}
                        onClick={() => setDay(d)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.012, duration: 0.3, ease: EASE }}
                        className={`focus-ring aspect-square rounded-lg font-mono text-sm transition-colors ${
                          past
                            ? "cursor-not-allowed text-faint/40"
                            : selected
                              ? "bg-voltage font-bold text-void"
                              : "border border-line bg-void/30 text-bone hover:border-voltage/40"
                        }`}
                      >
                        {d}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3 — time */}
            {step === 2 && (
              <motion.div
                key="s2"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="font-display text-2xl font-extrabold">Choose a time</h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ash">
                  <Clock className="h-3.5 w-3.5 text-voltage" /> {dateLabel} · {discipline}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {BOOKING_TIMES.map((t, i) => {
                    const selected = time === t;
                    const spots = ((i * 7) % 9) + 2;
                    return (
                      <motion.button
                        key={t}
                        data-cursor="cta"
                        onClick={() => setTime(t)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                        className={`focus-ring flex flex-col items-center gap-1 rounded-2xl border p-4 transition-colors ${
                          selected
                            ? "border-voltage bg-voltage/[0.06]"
                            : "border-line bg-void/30 hover:border-voltage/40"
                        }`}
                      >
                        <span className="font-display text-lg font-extrabold">{t}</span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-ash">
                          {spots} spots
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4 — confirm */}
            {step === 3 && (
              <motion.div
                key="s3"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="font-display text-2xl font-extrabold">Confirm your session</h2>
                <p className="mt-2 text-sm text-ash">One last look before we lock it in.</p>
                <div className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                  {[
                    { label: "Discipline", value: discipline },
                    { label: "Date", value: dateLabel },
                    { label: "Time", value: time },
                    { label: "Location", value: "AXIOM Flagship · NYC" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between bg-void/50 px-5 py-4"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                        {row.label}
                      </span>
                      <span className="font-medium text-bone">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-voltage/20 bg-voltage/[0.04] p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-voltage" />
                  <p className="text-sm text-ash">
                    Free cancellation up to 6 hours before. This session counts toward your
                    <span className="text-voltage"> 75 Days Forged</span> challenge.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="mt-6 flex items-center justify-between">
          <button
            data-cursor
            onClick={() => go(Math.max(0, step - 1))}
            disabled={step === 0}
            className="focus-ring flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-ash transition-colors hover:text-bone disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          {step < 3 ? (
            <button
              data-cursor="cta"
              data-cursor-label="Next"
              onClick={() => canNext && go(step + 1)}
              disabled={!canNext}
              className="focus-ring flex items-center gap-1.5 rounded-full bg-voltage px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <BookButton onBooked={() => go(4)} />
          )}
        </div>
      </div>

      {/* SUCCESS overlay */}
      <AnimatePresence>
        {step === 4 && (
          <SuccessScreen
            discipline={discipline!}
            date={dateLabel!}
            time={time!}
            onReset={() => {
              setDiscipline(null);
              setDay(null);
              setTime(null);
              go(0);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------- book button */

function BookButton({ onBooked }: { onBooked: () => void }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      data-cursor="cta"
      data-cursor-label="Confirm"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(onBooked, 700);
      }}
      className="focus-ring flex items-center gap-2 rounded-full bg-voltage px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-void transition-opacity hover:opacity-90 disabled:opacity-70"
    >
      {loading ? (
        <>
          <motion.span
            className="h-3.5 w-3.5 rounded-full border-2 border-void border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          />
          Booking
        </>
      ) : (
        <>
          Confirm booking <Check className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

/* ------------------------------------------------------------- success */

function SuccessScreen({
  discipline,
  date,
  time,
  onReset,
}: {
  discipline: string;
  date: string;
  time: string;
  onReset: () => void;
}) {
  const sparks = Array.from({ length: 14 });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 px-6 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="glass-strong relative w-full max-w-md overflow-hidden rounded-3xl border border-line p-9 text-center"
      >
        {/* sparks */}
        <div className="pointer-events-none absolute left-1/2 top-24">
          {sparks.map((_, i) => {
            const angle = (i / sparks.length) * Math.PI * 2;
            const dist = 90 + (i % 3) * 22;
            return (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: i % 2 ? "#C7F94B" : "#5AA9FF" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            );
          })}
        </div>

        {/* checkmark */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-voltage/15">
          <svg viewBox="0 0 52 52" className="h-12 w-12">
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="#C7F94B"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <motion.path
              d="M15 27 L23 34 L38 18"
              fill="none"
              stroke="#C7F94B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            />
          </svg>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 font-display text-3xl font-extrabold"
        >
          You&apos;re in.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          className="mt-2 text-ash"
        >
          {discipline} is locked for {date} at {time}. A confirmation is on its way to
          your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86, duration: 0.5 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/dashboard"
            data-cursor="cta"
            className="focus-ring flex-1 rounded-full bg-voltage px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-void transition-opacity hover:opacity-90"
          >
            View dashboard
          </Link>
          <button
            data-cursor
            onClick={onReset}
            className="focus-ring flex-1 rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-ash transition-colors hover:text-bone"
          >
            Book another
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

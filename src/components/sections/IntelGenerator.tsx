"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Timer, Wrench, Cpu, RefreshCw } from "lucide-react";

type Goal = "Strength" | "Hypertrophy" | "Conditioning";
type Duration = "30" | "45" | "60";
type Equip = "Full gym" | "Barbell only" | "Bodyweight";

type Move = { name: string; scheme: string; note: string };

const GOALS: Goal[] = ["Strength", "Hypertrophy", "Conditioning"];
const DURATIONS: Duration[] = ["30", "45", "60"];
const EQUIP: Equip[] = ["Full gym", "Barbell only", "Bodyweight"];

/** A deterministic little "engine" — real state changes real output. */
function build(goal: Goal, duration: Duration, equip: Equip): { title: string; moves: Move[] } {
  const heavy = goal === "Strength";
  const pump = goal === "Hypertrophy";

  const primary: Record<Equip, Move> = {
    "Full gym": {
      name: heavy ? "Back Squat" : pump ? "Hack Squat" : "Trap-Bar Jump",
      scheme: heavy ? "5 × 3 @ 87%" : pump ? "4 × 10" : "6 × 5 explosive",
      note: heavy ? "3–4 min rest, brace hard" : pump ? "2 min rest, controlled eccentric" : "Full recovery between sets",
    },
    "Barbell only": {
      name: heavy ? "Deadlift" : pump ? "Front Squat" : "Barbell Complex",
      scheme: heavy ? "5 × 2 @ 90%" : pump ? "5 × 8" : "5 rounds · 6 reps each",
      note: heavy ? "Reset every rep, top single optional" : pump ? "Tempo 3-0-1" : "No bar down for 5 moves",
    },
    "Bodyweight": {
      name: heavy ? "Pistol Squat" : pump ? "Bulgarian Split" : "Burpee Broad-Jump",
      scheme: heavy ? "5 × 5 / leg" : pump ? "4 × 12 / leg" : "8 × 20s on / 10s off",
      note: heavy ? "Slow, add tempo" : pump ? "Deep range, no bounce" : "Max intent each interval",
    },
  };

  const secondary: Record<Equip, Move> = {
    "Full gym": {
      name: pump ? "Incline DB Press" : "Weighted Pull-Up",
      scheme: pump ? "4 × 12" : heavy ? "4 × 4 @ 80%" : "5 × 8",
      note: "Balance the primary pattern",
    },
    "Barbell only": {
      name: heavy ? "Overhead Press" : pump ? "Bent-Over Row" : "Push Press",
      scheme: heavy ? "5 × 3" : pump ? "4 × 10" : "6 × 6",
      note: "Same bar, no plate changes if racing time",
    },
    "Bodyweight": {
      name: pump ? "Ring Dip" : "Explosive Push-Up",
      scheme: pump ? "4 × 12" : "6 × 6",
      note: "Elevate feet to progress",
    },
  };

  const accessory: Move = {
    name: goal === "Conditioning" ? "EMOM Finisher" : pump ? "Cable Iso Circuit" : "Core + Carry",
    scheme:
      duration === "30" ? "1 round" : duration === "45" ? "2 rounds" : "3 rounds",
    note:
      goal === "Conditioning"
        ? "Every minute on the minute, 12 reps"
        : "Superset, minimal rest",
  };

  const moves: Move[] = [primary[equip], secondary[equip]];
  // longer sessions add volume
  if (duration !== "30") moves.push(accessory);
  if (duration === "60") {
    moves.push({
      name: goal === "Conditioning" ? "Assault Bike Intervals" : "Loaded Stretch",
      scheme: goal === "Conditioning" ? "6 × 40s hard" : "3 × 45s / position",
      note: goal === "Conditioning" ? "Zone 4, full recovery" : "Own the end range",
    });
  }

  return {
    title: `${goal} · ${duration} min · ${equip}`,
    moves,
  };
}

function Chip<T extends string>({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor
      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring ${
        active ? "text-void" : "text-ash hover:text-bone"
      }`}
    >
      <span
        className={`absolute inset-0 rounded-full border transition-colors ${
          active ? "border-voltage bg-voltage" : "border-line bg-obsidian"
        }`}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function IntelGenerator() {
  const [goal, setGoal] = useState<Goal>("Strength");
  const [duration, setDuration] = useState<Duration>("45");
  const [equip, setEquip] = useState<Equip>("Full gym");
  const [seed, setSeed] = useState(0);

  const workout = useMemo(() => build(goal, duration, equip), [goal, duration, equip]);
  // seed included in animation key so "Regenerate" replays the reveal
  const revealKey = `${workout.title}-${seed}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      {/* Controls */}
      <div>
        <p className="eyebrow mb-4 flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-voltage" /> Surface 03 — Workout Generator
        </p>
        <h3 className="font-display text-3xl font-extrabold leading-[1.02] sm:text-4xl">
          Describe the day.
          <br />
          Get the session.
        </h3>
        <p className="mt-5 max-w-md text-ash">
          Pick a goal, the time you have, and what&apos;s in front of you. The engine
          writes a coherent session in real time — change any input and the plan
          rebuilds instantly.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint">
              <Dumbbell className="h-3.5 w-3.5" /> Goal
            </p>
            <div className="flex flex-wrap gap-2.5">
              {GOALS.map((g) => (
                <Chip key={g} active={goal === g} onClick={() => setGoal(g)}>
                  {g}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint">
              <Timer className="h-3.5 w-3.5" /> Duration
            </p>
            <div className="flex flex-wrap gap-2.5">
              {DURATIONS.map((d) => (
                <Chip key={d} active={duration === d} onClick={() => setDuration(d)}>
                  {d} min
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint">
              <Wrench className="h-3.5 w-3.5" /> Equipment
            </p>
            <div className="flex flex-wrap gap-2.5">
              {EQUIP.map((e) => (
                <Chip key={e} active={equip === e} onClick={() => setEquip(e)}>
                  {e}
                </Chip>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSeed((s) => s + 1)}
            data-cursor="cta"
            data-cursor-label="Regenerate"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ash transition-colors hover:border-voltage/40 hover:text-voltage"
          >
            <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="glass-strong relative overflow-hidden rounded-3xl border border-line p-7 shadow-2xl shadow-black/50">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-voltage/[0.07] blur-[90px]" />

        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-2 w-2 animate-ping rounded-full bg-voltage/70" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-voltage">
              Generated session
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={workout.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] uppercase tracking-widest text-faint"
            >
              {workout.moves.length} blocks
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={revealKey} className="mt-5 space-y-3">
            {workout.moves.map((m, i) => (
              <motion.div
                key={`${revealKey}-${i}`}
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-line bg-void/40 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface font-mono text-xs text-voltage">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold text-bone">{m.name}</p>
                  <p className="mt-0.5 text-xs text-faint">{m.note}</p>
                </div>
                <span className="shrink-0 rounded-full border border-voltage/25 bg-voltage/[0.06] px-3 py-1 font-mono text-[11px] text-voltage">
                  {m.scheme}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
            {workout.title}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
            Est. load · {goal === "Conditioning" ? "aerobic" : "high"}
          </p>
        </div>
      </div>
    </div>
  );
}

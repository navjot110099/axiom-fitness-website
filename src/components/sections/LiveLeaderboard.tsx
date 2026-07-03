"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { ChevronUp, ChevronDown, Minus, Crown, Flame } from "lucide-react";
import { LEADERBOARD } from "@/lib/data";

/**
 * Live leaderboard.
 * A three-place podium whose columns rise from the floor (spring on height),
 * then a stack of ranked rows that stagger in with points counting up and a
 * rank-delta arrow (green up / red down / neutral). A discipline filter re-ranks
 * the board with layout animation, and the member's own row is highlighted. A
 * pulsing "live" dot sells the real-time feel.
 */

type Row = (typeof LEADERBOARD)[number];

const YOUR_NAME = "Amara Okafor"; // the signed-in member, highlighted below
const DISCIPLINES = ["All", ...Array.from(new Set(LEADERBOARD.map((r) => r.discipline)))];

// Podium visual heights (top spot tallest); index maps to display order L/C/R.
const PODIUM_ORDER = [2, 1, 3] as const; // ranks shown left→right
const PODIUM_HEIGHT: Record<number, number> = { 1: 180, 2: 140, 3: 112 };
const PODIUM_DELAY: Record<number, number> = { 1: 0.15, 2: 0.3, 3: 0.45 };

function Delta({ delta }: { delta: number }) {
  if (delta > 0)
    return (
      <span className="inline-flex items-center gap-0.5 font-mono text-[11px] text-voltage">
        <ChevronUp className="h-3.5 w-3.5" />
        {delta}
      </span>
    );
  if (delta < 0)
    return (
      <span className="inline-flex items-center gap-0.5 font-mono text-[11px] text-ember">
        <ChevronDown className="h-3.5 w-3.5" />
        {Math.abs(delta)}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 font-mono text-[11px] text-faint">
      <Minus className="h-3.5 w-3.5" />
    </span>
  );
}

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-voltage">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-voltage/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-voltage" />
      </span>
      Live
    </span>
  );
}

export function LiveLeaderboard() {
  const [filter, setFilter] = useState("All");

  const ranked = useMemo<Row[]>(() => {
    const rows =
      filter === "All" ? LEADERBOARD : LEADERBOARD.filter((r) => r.discipline === filter);
    // Re-rank within the filtered set by points so the board stays coherent.
    return [...rows]
      .sort((a, b) => b.points - a.points)
      .map((r, i) => ({ ...r, rank: i + 1 }));
  }, [filter]);

  const podium = useMemo(() => {
    const byRank = new Map(ranked.map((r) => [r.rank, r]));
    return PODIUM_ORDER.map((rank) => byRank.get(rank)).filter(Boolean) as Row[];
  }, [ranked]);

  return (
    <section className="relative py-12 lg:py-16">
      <div className="container-x">
        {/* Discipline tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {DISCIPLINES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setFilter(d)}
                data-cursor
                className={`focus-ring relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                  filter === d
                    ? "border-voltage/50 text-voltage"
                    : "border-line text-ash hover:border-bone/40 hover:text-bone"
                }`}
              >
                {filter === d && (
                  <motion.span
                    layoutId="lb-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-voltage/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {d}
              </button>
            ))}
          </div>
          <LiveDot />
        </div>

        {/* Podium */}
        {podium.length === 3 && (
          <div className="mt-14 grid grid-cols-3 items-end gap-3 sm:gap-6">
            {podium.map((p) => {
              const isFirst = p.rank === 1;
              return (
                <div key={p.name} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: PODIUM_DELAY[p.rank], duration: 0.6 }}
                    className="mb-4 flex flex-col items-center text-center"
                  >
                    {isFirst && <Crown className="mb-2 h-6 w-6 text-gold" />}
                    <div
                      className={`font-display font-extrabold leading-tight ${
                        isFirst ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {p.name}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-faint">
                      {p.discipline}
                    </div>
                    <div
                      className={`mt-1 font-display text-xl font-extrabold ${
                        isFirst ? "text-gold" : "text-voltage"
                      }`}
                    >
                      <CountUp end={p.points} duration={2.2} separator="," />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: PODIUM_HEIGHT[p.rank] }}
                    transition={{
                      delay: PODIUM_DELAY[p.rank],
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                    }}
                    className={`flex w-full items-start justify-center rounded-t-2xl border-x border-t pt-4 ${
                      isFirst
                        ? "border-gold/30 bg-gradient-to-b from-gold/15 to-transparent"
                        : "border-line bg-gradient-to-b from-white/[0.05] to-transparent"
                    }`}
                  >
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        isFirst ? "text-gold" : "text-bone/70"
                      }`}
                    >
                      {p.rank}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ranked rows */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-line">
          <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line bg-surface px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-faint sm:grid-cols-[3rem_1fr_6rem_auto]">
            <span>Rank</span>
            <span>Member</span>
            <span className="hidden sm:block">Streak</span>
            <span className="text-right">Points</span>
          </div>

          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {ranked.map((row, i) => {
                const you = row.name === YOUR_NAME;
                return (
                  <motion.div
                    key={row.name}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      delay: Math.min(i * 0.05, 0.4),
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                    }}
                    className={`grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[3rem_1fr_6rem_auto] ${
                      you
                        ? "bg-voltage/[0.07] ring-1 ring-inset ring-voltage/30"
                        : "bg-obsidian hover:bg-elevated"
                    } transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-display text-lg font-extrabold ${
                          row.rank <= 3 ? "text-voltage" : "text-bone/70"
                        }`}
                      >
                        {String(row.rank).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-display text-base font-bold">
                          {row.name}
                        </span>
                        {you && (
                          <span className="rounded-full border border-voltage/40 bg-voltage/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-voltage">
                            You
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                        {row.discipline}
                      </div>
                    </div>

                    <div className="hidden items-center gap-1.5 font-mono text-[11px] text-ash sm:flex">
                      <Flame className="h-3.5 w-3.5 text-ember" />
                      {row.streak}d
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <Delta delta={row.delta} />
                      <div className="w-24 text-right font-display text-lg font-extrabold text-bone">
                        <CountUp
                          end={row.points}
                          duration={1.6}
                          separator=","
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {ranked.length === 0 && (
          <p className="mt-10 text-center font-mono text-sm uppercase tracking-widest text-faint">
            No ranked members in {filter} yet.
          </p>
        )}
      </div>
    </section>
  );
}

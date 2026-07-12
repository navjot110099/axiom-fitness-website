"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowUpRight, Flame } from "lucide-react";
import CountUp from "react-countup";
import { LEADERBOARD } from "@/lib/data";
import { Button } from "@/components/ui/Button";

/**
 * Leaderboard teaser.
 * A compact top-3 preview that slides in from the right in a staggered marquee
 * of energy, linking through to the full live board. Deliberately punchier than
 * the calm spotlight sections elsewhere on the site.
 */
export function ChallengeLeaderboardTeaser() {
  const top = LEADERBOARD.slice(0, 3);
  return (
    <section className="relative overflow-hidden border-t border-line py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(600px circle at 85% 20%, rgba(37,168,255,0.08), transparent 60%)",
        }}
      />
      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-5">
              <span className="text-voltage">/ 02</span> — The scoreboard
            </p>
            <h2 className="font-display text-display-sm font-extrabold leading-[0.98]">
              Every rep counts
              <br />
              toward your <span className="text-voltage-grad">rank.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ash">
              Challenge points roll straight onto the live leaderboard. Climb the
              board, hold a streak, and watch your name rise in real time.
            </p>
            <div className="mt-8">
              <Button href="/leaderboards" arrow>
                Open the live board
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {top.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-line bg-obsidian p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line font-display text-lg font-extrabold text-voltage">
                  {row.rank === 1 ? <Trophy className="h-5 w-5 text-gold" /> : row.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-lg font-bold">{row.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {row.discipline} · {row.streak}d streak
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-extrabold text-bone">
                    <CountUp end={row.points} duration={2} separator="," enableScrollSpy scrollSpyOnce />
                  </div>
                  <div className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-ember">
                    <Flame className="h-3 w-3" /> pts
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.a
              href="/leaderboards"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              data-cursor="cta"
              className="focus-ring flex items-center justify-between rounded-2xl border border-dashed border-line px-5 py-4 font-mono text-[11px] uppercase tracking-widest text-ash transition-colors hover:border-voltage/40 hover:text-bone"
            >
              See all {LEADERBOARD.length} ranked
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

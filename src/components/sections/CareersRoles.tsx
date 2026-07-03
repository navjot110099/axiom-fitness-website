"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight, MapPin, Users, Clock } from "lucide-react";
import { ROLES } from "@/lib/data";

const BLURBS: Record<string, string> = {
  Coaching:
    "Lead members through the most instrumented training floor in the country. You'll program, coach, and read the data that makes progress undeniable.",
  Intelligence:
    "Turn force-plate, HRV and volume signals into the model that coaches every member. Research rigor, shipped weekly.",
  Recovery:
    "Own the contrast circuit, breathwork and sleep science. Recovery is programmed here as deliberately as the training — you make that real.",
  Nutrition:
    "Run a performance kitchen where bloodwork becomes a menu. Precise, delicious, engineered for adaptation.",
  Platform:
    "Build the app that unifies every rep, plate and heartbeat into one living picture. React, TypeScript, and a design bar to match the floor.",
  Experience:
    "Be the first face a member meets. You set the tone of a place people trust with their bodies — warmth, precision, zero friction.",
};

export function CareersRoles() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {ROLES.map((role, i) => {
        const isOpen = open === i;
        return (
          <div key={role.title}>
            <button
              type="button"
              data-cursor
              onClick={() => setOpen(isOpen ? null : i)}
              className="focus-ring group flex w-full items-center gap-6 py-7 text-left"
            >
              <span className="w-10 shrink-0 font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="font-display text-xl font-extrabold leading-tight text-bone transition-colors group-hover:text-voltage sm:text-2xl">
                  {role.title}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-ash">
                  {role.team}
                </span>
              </span>
              <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint sm:flex">
                {role.place}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-bone transition-colors group-hover:border-voltage/50"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-9 pl-16 lg:grid-cols-[1.4fr_1fr]">
                    <p className="max-w-xl text-ash">
                      {BLURBS[role.team] ??
                        "Join a team that treats the human body like the most important system it will ever build."}
                    </p>
                    <div className="flex flex-col items-start gap-5 lg:items-end">
                      <div className="flex flex-wrap gap-6">
                        <Meta icon={<Users className="h-3.5 w-3.5" />} label="Team" value={role.team} />
                        <Meta icon={<Clock className="h-3.5 w-3.5" />} label="Type" value={role.type} />
                        <Meta icon={<MapPin className="h-3.5 w-3.5" />} label="Place" value={role.place} />
                      </div>
                      <Link
                        href="/contact"
                        data-cursor="cta"
                        className="focus-ring group/apply inline-flex items-center gap-2 rounded-full bg-voltage px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-white"
                      >
                        Apply for this role
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-faint">
        <span className="text-voltage">{icon}</span>
        {label}
      </span>
      <span className="mt-1 block text-sm text-bone">{value}</span>
    </div>
  );
}

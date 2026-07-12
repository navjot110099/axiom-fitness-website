"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Droplet, ChefHat, LineChart, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { MEAL_PLANS } from "@/lib/data";

const ACCENT_HEX: Record<string, string> = {
  voltage: "#25A8FF",
  plasma: "#6FD3FF",
  gold: "#E9C56A",
};

export function NutritionPlanCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {MEAL_PLANS.map((plan) => {
        const hex = ACCENT_HEX[plan.accent] ?? "#25A8FF";
        return (
          <TiltCard key={plan.name} className="h-full rounded-3xl" glow={false}>
            <div
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-obsidian p-8"
              style={{ boxShadow: `inset 0 1px 0 ${hex}18` }}
            >
              <span
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: hex }}
              />
              <Badge tone={plan.accent as "voltage" | "plasma" | "gold"}>
                {plan.focus}
              </Badge>
              <h3 className="relative mt-6 font-display text-3xl font-extrabold text-bone">
                {plan.name}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ash">
                {plan.desc}
              </p>
              <div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                <div className="bg-surface p-5">
                  <div className="font-display text-2xl font-extrabold" style={{ color: hex }}>
                    {plan.kcal}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                    kcal / day
                  </div>
                </div>
                <div className="bg-surface p-5">
                  <div className="font-display text-2xl font-extrabold" style={{ color: hex }}>
                    {plan.protein}g
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                    protein
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
}

const STEPS: { icon: LucideIcon; n: string; title: string; body: string }[] = [
  {
    icon: Droplet,
    n: "01",
    title: "Bloodwork",
    body: "A quarterly panel reads your iron, glucose, lipids, hormones and inflammation markers — the raw signal beneath how you feel.",
  },
  {
    icon: LineChart,
    n: "02",
    title: "Model",
    body: "We fuse the panel with your training load and body-composition scans. AXIOM Intelligence sets macro targets to the demand you place on the system.",
  },
  {
    icon: ChefHat,
    n: "03",
    title: "Menu",
    body: "Those targets become an actual menu — meals engineered by our chefs and pushed to the cafe, so every plate moves you toward the adaptation you want.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl border border-line bg-obsidian p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-voltage/30 bg-voltage/10">
          <Icon className="h-6 w-6 text-voltage" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-sm text-faint">{step.n}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-extrabold text-bone">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ash">{step.body}</p>
    </motion.div>
  );
}

export function NutritionPipeline() {
  return (
    <div className="relative grid gap-6 lg:grid-cols-3">
      {/* connective arrow line on desktop */}
      <div className="pointer-events-none absolute inset-x-8 top-14 hidden h-px bg-gradient-to-r from-voltage/40 via-line to-voltage/40 lg:block" />
      {STEPS.map((s, i) => (
        <StepCard key={s.n} step={s} index={i} />
      ))}
    </div>
  );
}

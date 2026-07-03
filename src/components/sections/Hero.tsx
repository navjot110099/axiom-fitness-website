"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";

// WebGL is client-only + heavy — load it after paint so the headline is instant.
const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => null,
});

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      <Aurora />
      {/* WebGL energy core */}
      <div className="absolute inset-0 z-0">
        <div className="relative mx-auto h-full w-full max-w-[1100px] opacity-90">
          <HeroOrb />
        </div>
      </div>
      {/* radial vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_50%_50%,transparent_25%,rgba(6,6,7,0.55)_70%,#060607_100%)]" />

      <div className="container-x relative z-10">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-voltage" />
          Fitness &amp; Wellness Operating System — New York
        </motion.p>

        <SplitText
          text="ENGINEER YOUR"
          as="h1"
          className="font-display text-display-lg font-extrabold leading-[0.82] tracking-mega"
          stagger={0.08}
        />
        <SplitText
          text="APEX"
          as="h1"
          className="font-display text-display-lg font-extrabold leading-[0.82] tracking-mega"
          wordClassName="text-voltage-grad"
          stagger={0.08}
          delay={0.15}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <motion.p
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-xl text-lg leading-relaxed text-ash"
          >
            Twelve disciplines. A full recovery circuit. Performance nutrition.
            One intelligence layer that turns every rep, breath and meal into
            your next move. This is not a gym — it is an ecosystem.
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 lg:justify-end"
          >
            <Button href="/membership" size="lg" arrow data-cursor>
              Start 7-day trial
            </Button>
            <Button href="/disciplines" variant="ghost" size="lg">
              Explore disciplines
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD */}
      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 mt-16"
      >
        <div className="hairline mb-5" />
        <div className="flex flex-wrap items-center justify-between gap-y-4 font-mono text-xs uppercase tracking-widest text-faint">
          <span className="flex items-center gap-2 text-ash">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-voltage" />
            Scroll to enter
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span>40.741° N</span>
            <span>—73.989° W</span>
            <span className="text-voltage">2,400+ members</span>
            <span>Est. 2019</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

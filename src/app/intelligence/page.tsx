import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Marquee } from "@/components/ui/Marquee";
import { IntelCoachChat } from "@/components/sections/IntelCoachChat";
import { IntelNutrition } from "@/components/sections/IntelNutrition";
import { IntelGenerator } from "@/components/sections/IntelGenerator";
import { IntelProgress } from "@/components/sections/IntelProgress";

export const metadata: Metadata = {
  title: "AXIOM Intelligence",
  description:
    "The AI platform behind every AXIOM membership — an adaptive coach, demand-matched nutrition, an instant workout generator, and a progress tracker that turns every set into signal.",
};

const SIGNALS = [
  "HRV",
  "Sleep depth",
  "Training load",
  "Resting HR",
  "Macros",
  "Mood",
  "Force plates",
  "Step count",
  "Menstrual phase",
  "Hydration",
  "Session RPE",
  "Body composition",
];

const PRINCIPLES = [
  {
    tone: "voltage" as const,
    k: "One model",
    t: "Every signal, one read.",
    d: "Wearables, force plates, the café and your logged sets feed a single model. No siloed apps, no contradicting numbers.",
  },
  {
    tone: "plasma" as const,
    k: "You approve",
    t: "It proposes. You decide.",
    d: "The coach never silently changes your plan. Each move comes with its reasoning and a one-tap accept or adjust.",
  },
  {
    tone: "ember" as const,
    k: "Adaptive",
    t: "Rewritten every week.",
    d: "Overreach gets caught before it becomes injury. Fuel and volume retarget around real recovery, not a fixed template.",
  },
];

export default function IntelligencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Intelligence"
        title="One model."
        accent="Every signal."
        description="AXIOM Intelligence is the layer that makes the whole facility think. Four connected surfaces — coach, nutrition, generator and tracker — running on one read of you."
        meta={[
          { label: "Signals fused", value: "40+" },
          { label: "Plan refresh", value: "Weekly" },
          { label: "Surfaces", value: "04" },
          { label: "You approve", value: "100%" },
        ]}
      />

      {/* Live signal marquee */}
      <div className="border-y border-line bg-obsidian/60 py-5">
        <Marquee duration={38}>
          <span className="mx-6 flex items-center gap-6">
            {SIGNALS.map((s) => (
              <span key={s} className="flex items-center gap-6">
                <span className="font-mono text-sm uppercase tracking-widest text-ash">{s}</span>
                <span className="h-1 w-1 rounded-full bg-voltage/60" />
              </span>
            ))}
          </span>
        </Marquee>
      </div>

      {/* Intro / principles */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            index="/ 01"
            eyebrow="The idea"
            title="A gym that behaves like a research lab."
            description="Most fitness apps guess. AXIOM measures — then reasons across everything it measures. The result feels less like a tracker and more like a coach who never forgets a detail."
          />
          <Reveal stagger className="grid gap-4">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="glass rounded-2xl border border-line p-6">
                <Badge tone={p.tone}>{p.k}</Badge>
                <p className="mt-4 font-display text-xl font-bold text-bone">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ash">{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Surface 01 — Coach */}
      <Section className="border-t border-line">
        <IntelCoachChat />
      </Section>

      {/* Surface 02 — Nutrition */}
      <Section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute left-0 top-1/4 h-[36vw] w-[36vw] rounded-full bg-plasma/[0.05] blur-[140px]" />
        <div className="relative">
          <IntelNutrition />
        </div>
      </Section>

      {/* Surface 03 — Generator */}
      <Section className="border-t border-line">
        <IntelGenerator />
      </Section>

      {/* Surface 04 — Progress */}
      <Section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute right-0 top-0 h-[38vw] w-[38vw] rounded-full bg-voltage/[0.05] blur-[140px]" />
        <div className="relative">
          <IntelProgress />
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="border-t border-line">
        <div className="glass-strong relative overflow-hidden rounded-3xl border border-line p-10 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-voltage/[0.1] blur-[100px]" />
          <div className="relative max-w-2xl">
            <SectionHeading
              index="/ 06"
              eyebrow="Included with every tier"
              title="The intelligence isn't an upsell."
              description="Core, Signature or Private — the full platform ships with your membership from day one. Start with a 7-day performance trial and let the model learn you."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/membership" arrow>
                Start your trial
              </Button>
              <Button href="/disciplines" variant="ghost">
                Explore the floor
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

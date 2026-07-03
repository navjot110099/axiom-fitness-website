import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisciplinesScroll } from "@/components/sections/DisciplinesScroll";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { DISCIPLINES_FULL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Disciplines",
  description:
    "Eight instrumented training worlds under one roof — strength, HIIT, yoga, boxing, swim, pilates, CrossFit and cycle.",
};

export default function DisciplinesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Disciplines"
        title="Eight ways"
        accent="to move."
        description="Every space is engineered and instrumented for one thing — a specific way of moving. Travel the floor below."
        meta={[
          { label: "Disciplines", value: "08" },
          { label: "Weekly classes", value: "240" },
          { label: "Master coaches", value: "48" },
          { label: "Open daily", value: "18h" },
        ]}
      />

      <DisciplinesScroll />

      <Section>
        <SectionHeading
          index="/ 02"
          eyebrow="Precision"
          title="Instrumented, not estimated."
          description="Every platform reads your work — force, tempo, symmetry, power — and feeds it straight into your model."
        />
        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES_FULL.slice(0, 4).map((d) => (
            <TiltCard key={d.slug} className="rounded-3xl border border-line bg-obsidian p-7">
              <div className="font-display text-2xl font-extrabold">{d.name}</div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-voltage">
                {d.kicker}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ash">{d.desc}</p>
            </TiltCard>
          ))}
        </Reveal>
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/classes" arrow>
            See the class schedule
          </Button>
          <Button href="/membership" variant="ghost">
            Become a member
          </Button>
        </div>
      </Section>
    </>
  );
}

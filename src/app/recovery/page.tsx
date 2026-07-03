import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { RecoveryContrastCircuit } from "@/components/sections/RecoveryContrastCircuit";
import { RecoveryParallaxBand } from "@/components/sections/RecoveryParallaxBand";
import {
  RecoveryModalitiesGrid,
  RecoveryProtocolTimeline,
} from "@/components/sections/RecoveryModalities";

export const metadata: Metadata = {
  title: "Recovery",
  description:
    "The AXIOM recovery floor — a full contrast circuit of ice, cryo, infrared and sauna, programmed as deliberately as the training.",
};

export default function RecoveryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recovery"
        title="Recovery is"
        accent="training."
        description="The adaptation you chase happens in the hours you rest. Our floor runs a full contrast circuit — cold to hot and back — engineered to move blood, flush load, and rebuild you faster than you broke."
        meta={[
          { label: "Cold floor", value: "3°C" },
          { label: "Cryo", value: "-110°C" },
          { label: "Sauna", value: "90°C" },
          { label: "Modalities", value: "06" },
        ]}
      />

      {/* WOW: sticky temperature journey, cold plasma → hot ember */}
      <RecoveryContrastCircuit />

      <Section>
        <SectionHeading
          index="/ 02"
          eyebrow="The floor"
          title="Six ways to rebuild."
          description="Each modality is a different lever on the same system — circulation, inflammation, the nervous system. Programmed together, they compound."
        />
        <Reveal className="mt-14">
          <RecoveryModalitiesGrid />
        </Reveal>
      </Section>

      <Section className="bg-obsidian">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <Badge tone="plasma">The protocol</Badge>
            <h2 className="mt-5 font-display text-display-sm font-extrabold leading-[0.98]">
              A single, <span className="text-heat-grad">deliberate</span> lap.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ash">
              Twenty-five minutes, five stations, one flow. Our recovery lead
              scripts each member&apos;s circuit to the load they trained — the
              same rigour we bring to a lifting programme.
            </p>
            <div className="mt-8">
              <Button href="/intelligence" variant="ghost" arrow>
                See how we read your recovery
              </Button>
            </div>
          </div>
          <RecoveryProtocolTimeline />
        </div>
      </Section>

      <Section>
        <SectionHeading
          index="/ 04"
          eyebrow="The rooms"
          title="Cold water. Cedar heat."
          description="Real spaces, built for one thing. Scroll and the rooms drift past at their own pace."
        />
        <Reveal className="mt-14">
          <RecoveryParallaxBand />
        </Reveal>
      </Section>

      <Section className="bg-obsidian">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-plasma/10 via-void to-ember/10 p-10 lg:p-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6 text-ember">/ Book the circuit</p>
            <h2 className="font-display text-display-sm font-extrabold leading-[0.98]">
              Leave feeling rebuilt, not wrecked.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
              Reserve a contrast circuit with our recovery team, then take a flat
              white made to your macros next door at the cafe.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" arrow>
                Book a recovery session
              </Button>
              <Button href="/cafe" variant="ghost">
                Visit the cafe
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

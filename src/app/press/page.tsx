import type { Metadata } from "next";
import { Download, FileText, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PressWall } from "@/components/sections/PressWall";
import { PressFacts } from "@/components/sections/PressFacts";

export const metadata: Metadata = {
  title: "Press",
  description:
    "AXIOM in the press — coverage, brand facts, and a downloadable press kit. For interviews and imagery, contact the concierge team.",
};

const KIT = [
  { icon: FileText, title: "Fact sheet", detail: "PDF · 2 pages · company overview" },
  { icon: ImageIcon, title: "Photography", detail: "ZIP · 24 hi-res facility images" },
  { icon: Download, title: "Logo pack", detail: "SVG · wordmark & monogram, all lockups" },
];

export default function PressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press"
        title="What the world"
        accent="is saying."
        description="AXIOM has been covered as a design object, a research lab and a glimpse of where fitness is headed. For interviews, imagery or comment, the concierge team responds within a day."
      />

      <Section>
        <PressWall />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          index="/ 01"
          eyebrow="By the numbers"
          title="The brand, briefly."
        />
        <div className="mt-14">
          <PressFacts />
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            index="/ 02"
            eyebrow="Press kit"
            title="Everything you need to publish."
            description="High-resolution imagery, the wordmark in every lockup, and a fact sheet vetted by our team. Please credit AXIOM and link where possible."
          />
          <Reveal stagger className="space-y-4">
            {KIT.map((k) => (
              <div
                key={k.title}
                className="group flex items-center gap-5 rounded-2xl border border-line bg-obsidian p-6 transition-colors hover:border-voltage/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line text-voltage transition-colors group-hover:border-voltage/50">
                  <k.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg font-extrabold">{k.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {k.detail}
                  </p>
                </div>
                <Download className="h-5 w-5 text-ash transition-transform group-hover:translate-y-0.5 group-hover:text-bone" />
              </div>
            ))}
            <div className="pt-2">
              <Button href="/contact" size="lg" arrow>
                Request the full kit
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

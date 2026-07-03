import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Membership } from "@/components/sections/Membership";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Three tiers of AXIOM membership — Core, Signature and Private. Every tier includes the full facility and the intelligence layer.",
};

const INCLUDED = [
  "All training disciplines",
  "Recovery circuit access",
  "AXIOM Intelligence app",
  "Performance cafe",
  "Body composition scans",
  "Guest passes",
  "Priority booking",
  "Member events",
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Choose your"
        accent="altitude."
        description="One facility, one intelligence layer, three levels of team. Every membership begins with a 7-day performance trial — no card required."
      />

      <Membership />

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            index="/ 06"
            eyebrow="Always included"
            title="The essentials never sit behind a tier."
            description="Whatever level you choose, the whole ecosystem is open to you from day one."
          />
          <Reveal stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {INCLUDED.map((f) => (
              <div key={f} className="flex items-center gap-3 bg-obsidian p-5">
                <span className="h-1.5 w-1.5 rounded-full bg-voltage" />
                <span className="text-sm text-bone/90">{f}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading index="/ 07" eyebrow="Questions" title="Everything you might ask." />
        <div className="mt-12">
          <Accordion items={FAQ} />
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/contact" arrow>
            Book a private tour
          </Button>
          <Button href="/intelligence" variant="ghost">
            See the platform
          </Button>
        </div>
      </Section>
    </>
  );
}

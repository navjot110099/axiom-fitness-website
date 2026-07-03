import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { JournalIndex } from "@/components/sections/JournalIndex";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The AXIOM Journal — essays on recovery, strength, nutrition and the intelligence behind performance. Written by our coaches and scientists.",
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="The thinking"
        accent="behind the work."
        description="Field notes from the floor and the lab. No hot takes, no hype — just the physiology, the programming, and the honest trade-offs behind training well."
      />

      <Section container={false} className="pt-4">
        <JournalIndex />
      </Section>
    </>
  );
}

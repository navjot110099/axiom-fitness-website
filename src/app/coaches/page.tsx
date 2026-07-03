import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CoachSpotlight } from "@/components/sections/CoachSpotlight";
import { CoachRoster } from "@/components/sections/CoachRoster";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "The AXIOM master coaches — biomechanists, national athletes and performance scientists who program the floor.",
};

export default function CoachesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coaches"
        title="The people"
        accent="who read you."
        description="Not instructors — practitioners. Every coach on the floor pairs elite competitive experience with the science to make your progress measurable."
        meta={[
          { label: "Master coaches", value: "48" },
          { label: "Combined years", value: "80+" },
          { label: "National athletes", value: "11" },
          { label: "Specialisms", value: "14" },
        ]}
      />

      <CoachSpotlight />

      <Section className="border-t border-line">
        <SectionHeading
          index="/ 02"
          eyebrow="The roster"
          title="Find the coach for your goal."
          description="Hover a portrait to see the specialisms and the years behind them. Every one of them coaches by data, not dogma."
        />
        <CoachRoster />
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/booking" arrow>
            Book an assessment
          </Button>
          <Button href="/classes" variant="ghost">
            See their classes
          </Button>
        </div>
      </Section>
    </>
  );
}

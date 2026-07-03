import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ClassScheduleBoard } from "@/components/sections/ClassScheduleBoard";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "The AXIOM weekly schedule — filter by day and discipline, read live intensity and remaining spots, and reserve your platform.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Classes"
        title="The week,"
        accent="scheduled."
        description="Two hundred and forty coached sessions a week, every one instrumented. Filter the board, read the intensity, and claim your spot before it's gone."
        meta={[
          { label: "Weekly classes", value: "240" },
          { label: "Disciplines", value: "07" },
          { label: "Earliest start", value: "06:00" },
          { label: "Master coaches", value: "48" },
        ]}
      />

      <ClassScheduleBoard />

      <Section className="border-t border-line">
        <SectionHeading
          index="/ 02"
          eyebrow="No wasted sessions"
          title="Every slot is programmed."
          description="Miss the board you want? Your coach can build a private session around the same protocol — same instrumentation, your schedule."
        />
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/booking" arrow>
            Reserve a class
          </Button>
          <Button href="/coaches" variant="ghost">
            Meet the coaches
          </Button>
        </div>
      </Section>
    </>
  );
}

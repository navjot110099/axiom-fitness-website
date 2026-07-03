import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CareersCulture } from "@/components/sections/CareersCulture";
import { CareersRoles } from "@/components/sections/CareersRoles";
import { ROLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the future of human performance. Open roles across coaching, intelligence, recovery, nutrition and platform at AXIOM.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the body's"
        accent="operating system."
        description="We are coaches, scientists, chefs and engineers with one obsession: making human potential measurable — and then moving it. If that sounds like your life's work, it might be your next job."
        meta={[
          { label: "Open roles", value: String(ROLES.length) },
          { label: "Flagship", value: "New York" },
          { label: "Retention", value: "94%" },
          { label: "Founded", value: "2019" },
        ]}
      />

      <Section>
        <SectionHeading
          index="/ 01"
          eyebrow="How we work"
          title="Four commitments, no exceptions."
          description="These aren't posters on a wall. They decide who we hire, what we ship, and how we treat the people who trust us with their bodies."
        />
        <div className="mt-16">
          <CareersCulture />
        </div>
      </Section>

      <Section className="border-t border-line" id="open-roles">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="/ 02"
            eyebrow="Open roles"
            title="Find your platform."
            description="Every role touches a member's real progress. Expand one to see what the work looks like."
          />
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            {ROLES.length} positions · New York & remote
          </p>
        </div>

        <CareersRoles />

        <div className="mt-16 flex flex-col items-start gap-6 rounded-3xl border border-voltage/25 bg-gradient-to-br from-voltage/[0.06] to-transparent p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-extrabold leading-tight">
              Don&apos;t see your role? Introduce yourself anyway.
            </h3>
            <p className="mt-3 text-ash">
              We hire ahead of the posting for exceptional people. Tell us what you&apos;d
              build here and why it matters.
            </p>
          </div>
          <Button href="/contact" size="lg" arrow>
            Start a conversation
          </Button>
        </div>
      </Section>
    </>
  );
}

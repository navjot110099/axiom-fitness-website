import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { StoreGrid } from "@/components/sections/StoreGrid";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Store",
  description:
    "The AXIOM store — apparel, nutrition, gear and accessories engineered in our materials lab and tested by our coaching staff.",
};

const TICKER = [
  "Engineered, not merchandised",
  "Member pricing at checkout",
  "Carbon-neutral shipping",
  "Field-tested by our coaches",
  "30-day free returns",
];

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        title="Kit worthy"
        accent="of the work."
        description="Every piece is developed in the AXIOM materials lab and pressure-tested on the floor before it ever reaches you. No filler. No fast fashion."
        meta={[
          { label: "Collections", value: "04" },
          { label: "Lab-tested", value: "100%" },
          { label: "Returns", value: "30d" },
          { label: "Shipping", value: "Neutral" },
        ]}
      />

      <div className="border-y border-line bg-obsidian/60 py-4">
        <Marquee duration={28}>
          {TICKER.map((t) => (
            <span
              key={t}
              className="mx-8 font-mono text-[11px] uppercase tracking-widest text-faint"
            >
              {t} <span className="ml-8 text-voltage">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Section container={false}>
        <StoreGrid />
      </Section>
    </>
  );
}

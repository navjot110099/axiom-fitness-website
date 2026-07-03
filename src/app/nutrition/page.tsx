import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NutritionMacroRings } from "@/components/sections/NutritionMacroRings";
import {
  NutritionPlanCards,
  NutritionPipeline,
} from "@/components/sections/NutritionPlans";

export const metadata: Metadata = {
  title: "Nutrition",
  description:
    "Food engineered for adaptation — macro science, meal plans, and a nutrition team that turns your bloodwork into a menu.",
};

export default function NutritionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nutrition"
        title="Fuel is"
        accent="engineered."
        description="We do not hand you a diet. We read the demand your training places on the system and build the exact macros to meet it — then push it to the cafe as an actual plate."
        meta={[
          { label: "Panel markers", value: "40+" },
          { label: "Plans", value: "03" },
          { label: "Cafe daily", value: "16h" },
          { label: "Reassess", value: "Quarterly" },
        ]}
      />

      <Section>
        <SectionHeading
          index="/ 01"
          eyebrow="Today's target"
          title="Macros, quantified."
          description="Every plan resolves to three numbers. Here is a Signature member's day — protein, carbs and fats, filling toward target as you read."
        />
        <div className="mt-16 rounded-[2rem] border border-line bg-obsidian p-10 lg:p-16">
          <NutritionMacroRings />
        </div>
      </Section>

      <Section className="bg-obsidian">
        <SectionHeading
          index="/ 02"
          eyebrow="Bloodwork → menu"
          title="From panel to plate."
          description="Three steps turn a vial of blood into the meal in front of you. Nothing about it is guessed."
        />
        <div className="mt-14">
          <NutritionPipeline />
        </div>
      </Section>

      <Section>
        <SectionHeading
          index="/ 03"
          eyebrow="Meal plans"
          title="Built to the goal."
          description="Pick the arc you're on. Each plan is a starting frame our team tailors to your panel and training block."
        />
        <Reveal className="mt-14">
          <NutritionPlanCards />
        </Reveal>
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/cafe" arrow>
            See it on the cafe menu
          </Button>
          <Button href="/intelligence" variant="ghost">
            How the model works
          </Button>
        </div>
      </Section>

      <Section className="bg-obsidian">
        <div className="grid items-center gap-10 rounded-[2rem] border border-line bg-gradient-to-br from-voltage/10 via-void to-plasma/10 p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <p className="eyebrow mb-6 text-voltage">/ The premise</p>
            <h2 className="font-display text-display-sm font-extrabold leading-[0.98]">
              Food is a training variable.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ash">
            You would not guess a working weight, so we do not guess your intake.
            Carbs are periodised to the effort, protein to the repair, fats to the
            hormones — and the whole thing re-tunes every quarter as your body
            changes. Nutrition here is not willpower. It is engineering.
          </p>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ChallengeGrid } from "@/components/sections/ChallengeGrid";
import { ChallengeLeaderboardTeaser } from "@/components/sections/ChallengeLeaderboardTeaser";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Community challenges at AXIOM — structured, scored arcs you take on together, from 75 Days Forged to the Stillness Streak.",
};

export default function ChallengesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Challenges"
        title="Harder,"
        accent="together."
        description="Structured arcs with a start line, a scoreboard and a community pulling in the same direction. Pick one, commit, and let the board hold you to it."
        meta={[
          { label: "Live challenges", value: "04" },
          { label: "Members in", value: "1.5k" },
          { label: "Longest streak", value: "128d" },
          { label: "Completion", value: "71%" },
        ]}
      />

      <Section>
        <SectionHeading
          index="/ 01"
          eyebrow="Choose your arc"
          title="Four ways to be held accountable."
          description="Every challenge is scored daily against a clear protocol. Join, and your progress ring fills as the community's does."
        />
        <ChallengeGrid />
      </Section>

      <ChallengeLeaderboardTeaser />
    </>
  );
}

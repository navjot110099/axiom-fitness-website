import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LiveLeaderboard } from "@/components/sections/LiveLeaderboard";

export const metadata: Metadata = {
  title: "Leaderboards",
  description:
    "The AXIOM live leaderboard — a top-three podium, ranked members with points and rank deltas, filtered by discipline.",
};

export default function LeaderboardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leaderboards"
        title="The board"
        accent="is live."
        description="Points from every session, class and challenge, ranked in real time. Filter by discipline, find your line, and see who's climbing."
        meta={[
          { label: "Ranked members", value: "2.4k" },
          { label: "Points today", value: "312k" },
          { label: "Longest streak", value: "141d" },
          { label: "Updates", value: "Live" },
        ]}
      />

      <LiveLeaderboard />
    </>
  );
}

import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { DashTrainer } from "@/components/sections/DashTrainer";

export const metadata: Metadata = {
  title: "Coach Console",
  description:
    "The AXIOM coach console — today's sessions, live client roster, load trends and overreach alerts in one command view.",
};

export default function TrainerDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 lg:pt-36">
      <Aurora />
      <DashTrainer />
    </main>
  );
}

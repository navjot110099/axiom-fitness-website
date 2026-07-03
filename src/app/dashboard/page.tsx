import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { DashMember } from "@/components/sections/DashMember";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your AXIOM control room — activity rings, readiness, training load, personal records and upcoming sessions in one living view.",
};

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 lg:pt-36">
      <Aurora />
      <DashMember />
    </main>
  );
}

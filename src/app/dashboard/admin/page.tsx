import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { DashAdmin } from "@/components/sections/DashAdmin";

export const metadata: Metadata = {
  title: "Operations",
  description:
    "AXIOM operations — revenue, membership, floor utilization, churn and NPS in one executive command dashboard.",
};

export default function AdminDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 lg:pt-36">
      <Aurora />
      <DashAdmin />
    </main>
  );
}

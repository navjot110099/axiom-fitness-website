import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingFlow } from "@/components/sections/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Reserve your next AXIOM session in four steps — choose a discipline, a date, a time, and confirm.",
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen">
      <PageHeader
        eyebrow="Booking"
        title="Reserve"
        accent="your session."
        description="Four quick steps to lock your spot on the floor. Free cancellation up to six hours before."
      />
      <BookingFlow />
    </main>
  );
}

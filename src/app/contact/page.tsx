import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";

export const metadata: Metadata = {
  title: "Contact & Tours",
  description:
    "Book a private tour of AXIOM, ask about membership, or reach the concierge team. One Meridian Row, New York.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come see"
        accent="the machine."
        description="Book a private tour, ask about a tier, or just say hello. Every message reaches a person on the concierge team — never a queue."
      />

      <section className="relative pb-28 lg:pb-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            {/* LEFT — form */}
            <div className="rounded-3xl border border-line bg-obsidian/60 p-8 lg:p-10">
              <p className="eyebrow mb-3">/ Send a message</p>
              <h2 className="mb-8 font-display text-2xl font-extrabold leading-tight">
                Tell us what you&apos;re after.
              </h2>
              <ContactForm />
            </div>

            {/* RIGHT — map + details */}
            <ContactMap />
          </div>
        </div>
      </section>
    </>
  );
}

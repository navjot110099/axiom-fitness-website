import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalLayout, type LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AXIOM collects, uses and protects your personal and biometric data — written to be read, not hidden.",
};

const UPDATED = "1 June 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "AXIOM is a performance ecosystem, which means we work with unusually intimate data — your training loads, heart-rate variability, body composition and, if you opt in, bloodwork. We treat that data as a responsibility, not an asset to be traded.",
      "This policy explains what we collect, why, how long we keep it, and the controls you have. It applies to your membership, the AXIOM Intelligence app, and any device you connect to us. Where a specific product differs, we say so plainly at the point of collection.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: [
      "Account data: your name, email, phone number, billing details and membership tier. This is the minimum required to give you an account and take payment.",
      "Performance data: reps, sets, force-plate readings, class attendance, recovery-circuit usage, and metrics from wearables or equipment you link. This is the data that makes coaching precise.",
      "Health and biometric data: body-composition scans and, only where you explicitly consent, bloodwork panels. We never process this category without a clear, separate opt-in.",
      "Technical data: device type, app version and anonymised usage analytics, used strictly to keep the product working and safe.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your data",
    body: [
      "To coach you: our intelligence layer combines your signals into a single model that proposes sessions, flags overreach, and adapts your plan. You always approve the move — the system recommends, it never overrides.",
      "To run your membership: bookings, billing, access control and concierge support.",
      "To improve responsibly: we study aggregated, de-identified patterns to make programming better for everyone. Your individual health data is never used to train shared models without consent.",
      "We do not sell your data. We do not serve third-party advertising inside AXIOM.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and processors",
    body: [
      "Your coach and, for Signature and Private tiers, your dedicated team can see the performance data needed to program for you. You can restrict this at any time in the app.",
      "We use a small set of vetted processors — payment, cloud hosting and email delivery — bound by contract to our standards and permitted to use your data only to provide their service to us.",
      "We will disclose data if legally compelled, and only to the minimum extent required. If lawful, we will tell you first.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    body: [
      "We keep account and performance data for as long as you hold a membership, so your history and trends remain intact. If you leave, we retain a minimal record for the period required by tax and legal obligations, then delete or irreversibly anonymise it.",
      "Health and biometric data is deleted within 30 days of a valid request, unless we are legally required to retain a specific record.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "You can access, correct, export or delete your data, and withdraw any consent you've given, at any time. Most controls live directly in the AXIOM Intelligence app under Privacy.",
      "You can also object to certain processing and ask us to restrict it. Where the law gives you a right to complain to a supervisory authority, you keep that right — but we'd always rather you came to us first.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Data is encrypted in transit and at rest. Access inside AXIOM is role-based and logged, and health data sits behind an additional layer of controls. We run regular security reviews and hold our processors to the same bar.",
      "No system is perfect. If a breach ever affects your data, we will notify you and the relevant authorities promptly and tell you exactly what happened and what to do.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      "Questions, requests or concerns about your privacy go to our team at concierge@axiom.fit, or by post to One Meridian Row, New York. A real person will respond within one business day.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your body's data is the most personal there is. Here is exactly how we handle it — in plain language, because trust starts with being understood."
      />
      <Section>
        <LegalLayout sections={SECTIONS} updated={UPDATED} />
      </Section>
    </>
  );
}

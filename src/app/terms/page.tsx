import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalLayout, type LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The agreement between you and AXIOM — membership, billing, conduct, safety and liability, written to be read.",
};

const UPDATED = "1 June 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    title: "The agreement",
    body: [
      "These terms govern your membership at AXIOM and your use of the AXIOM Intelligence app and any connected services. By joining, booking, or using the app, you agree to them.",
      "We've written this to be read. Where a term carries real weight — money, safety, or liability — we've kept it in the open rather than buried it. If anything is unclear, ask us before you agree.",
    ],
  },
  {
    id: "membership",
    title: "Membership & trial",
    body: [
      "Every membership begins with a 7-day performance trial. During the trial you get full facility access, an assessment, and coached sessions; you may cancel at any point before it ends at no charge.",
      "Memberships are personal and non-transferable. Access is granted through your account and, where applicable, your dedicated team. You are responsible for keeping your credentials secure.",
      "Tiers and their inclusions are described on our Membership page. We may adjust inclusions with reasonable notice; material changes that disadvantage you give you the right to cancel without penalty.",
    ],
  },
  {
    id: "billing",
    title: "Billing & cancellation",
    body: [
      "Paid memberships bill monthly in advance from the end of your trial. Prices are shown before you commit and include applicable taxes unless stated.",
      "You can cancel any time from your account; cancellation stops the next renewal and your access continues until the end of the paid period. We do not pro-rate part-months, and we don't lock you into long contracts to make leaving hard.",
      "Failed payments pause access until resolved. If a charge is genuinely in error, tell us — we fix mistakes quickly and fairly.",
    ],
  },
  {
    id: "conduct",
    title: "Conduct on the floor",
    body: [
      "AXIOM is a shared space held to a high standard. Respect coaches, staff and other members; re-rack your loads; honour bookings and cancel in good time so someone else can take the slot.",
      "Harassment, intimidation, unsafe use of equipment, or filming others without consent are grounds for suspension or termination without refund. We reserve judgement here, and we use it sparingly and fairly.",
    ],
  },
  {
    id: "health-safety",
    title: "Health & safety",
    body: [
      "Training is inherently physical. You confirm you are medically fit to participate and will disclose relevant conditions to your coach so we can program safely for you.",
      "Our coaching and intelligence layer are guidance, not medical advice. Recommendations from the app — including readiness and load suggestions — support your decisions; they don't replace a clinician. Always stop and seek care if something feels wrong.",
      "Recovery facilities including ice, sauna and cryo carry their own guidance posted on-site. Follow it; the limits exist for good reason.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "The AXIOM name, wordmark, app, programming methodology and content are ours or our licensors'. Your membership grants you personal use, not ownership or a licence to reproduce.",
      "Anything you post in member spaces you grant us a limited right to display within those spaces. You keep ownership of your own content and your own data.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "To the fullest extent the law allows, AXIOM is not liable for indirect or consequential loss, and our total liability to you is limited to the fees you paid us in the preceding twelve months.",
      "Nothing here excludes liability we cannot lawfully exclude — including for death or personal injury caused by our negligence, or for fraud. Your statutory rights as a consumer are unaffected.",
    ],
  },
  {
    id: "changes",
    title: "Changes & contact",
    body: [
      "We may update these terms; when we do, we'll post the new date above and, for material changes, notify you in the app. Continued use after an update means you accept it.",
      "Questions about these terms go to concierge@axiom.fit or One Meridian Row, New York. We'd rather resolve any issue in conversation than in a clause.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The agreement between you and AXIOM — fair, plainly written, and free of the fine print designed to trap you. Read it once; it's short on purpose."
      />
      <Section>
        <LegalLayout sections={SECTIONS} updated={UPDATED} />
      </Section>
    </>
  );
}

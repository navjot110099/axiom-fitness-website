import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Badge } from "@/components/ui/Badge";
import { CafeHoverMenu } from "@/components/sections/CafeHoverMenu";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Cafe",
  description:
    "The AXIOM performance cafe — food built to your macros, served in a room worth lingering in. One Meridian Row, New York.",
};

const INGREDIENTS = [
  "Wild salmon",
  "Ancient grains",
  "Cold-pressed oils",
  "Grass-fed whey",
  "Beetroot",
  "Sea salt",
  "Cacao nib",
  "Tahini",
  "Berries",
  "Spinach",
  "Avocado",
  "Cold brew",
];

export default function CafePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Cafe"
        title="Eat like it's"
        accent="part of the plan."
        description="Because it is. The performance cafe sits steps from the recovery floor — a warm, low-lit room where every plate is engineered to your macros and made to be lingered over."
        meta={[
          { label: "Open", value: "6a–10p" },
          { label: "Seats", value: "48" },
          { label: "Sourced", value: "Local" },
          { label: "Menu", value: "Seasonal" },
        ]}
      />

      {/* photography-forward hero band */}
      <Section container={false} className="!py-0">
        <div className="container-x">
          <Reveal className="grid gap-5 md:grid-cols-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line md:row-span-2 md:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1400&auto=format&fit=crop"
                alt="The AXIOM performance cafe interior"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Badge tone="gold">The room</Badge>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line md:col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop"
                alt="A plate at the performance cafe"
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line md:col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop"
                alt="Coffee at the cafe counter"
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ingredients marquee */}
      <Section className="!py-14">
        <Marquee duration={34}>
          {INGREDIENTS.map((ing) => (
            <span
              key={ing}
              className="font-display text-4xl font-extrabold text-bone/25 transition-colors hover:text-gold lg:text-6xl"
            >
              {ing}
              <span className="mx-8 text-gold">·</span>
            </span>
          ))}
        </Marquee>
      </Section>

      {/* editorial hover-image menu */}
      <Section>
        <SectionHeading
          index="/ 02"
          eyebrow="On the menu"
          title="Today's plates."
          description="Hover a dish to see it. Every line lists its macros, because here that is not an afterthought — it is the point."
        />
        <div className="mt-14">
          <CafeHoverMenu />
        </div>
      </Section>

      {/* hours / location teaser */}
      <Section className="bg-obsidian">
        <div className="grid gap-10 rounded-[2rem] border border-line bg-gradient-to-br from-gold/10 via-void to-ember/10 p-10 lg:grid-cols-2 lg:items-center lg:p-16">
          <div>
            <p className="eyebrow mb-6 text-gold">/ Find us</p>
            <h2 className="font-display text-display-sm font-extrabold leading-[0.98]">
              Sit a while.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ash">
              The cafe is open to members and their guests from first class to
              last. Book a table, or simply drift in after your circuit.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" arrow>
                Book a table
              </Button>
              <Button href="/nutrition" variant="ghost">
                See the nutrition science
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div className="bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Weekdays
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold text-gold">
                6:00 – 22:00
              </div>
            </div>
            <div className="bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Weekends
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold text-gold">
                7:00 – 21:00
              </div>
            </div>
            <div className="bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Location
              </div>
              <div className="mt-2 font-display text-lg font-extrabold text-bone">
                {BRAND.location.split(" · ")[0]}
              </div>
            </div>
            <div className="bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Reserve
              </div>
              <div className="mt-2 font-display text-lg font-extrabold text-bone">
                {BRAND.phone}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

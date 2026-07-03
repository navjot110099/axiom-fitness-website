import { Hero } from "@/components/sections/Hero";
import { EthosTicker } from "@/components/sections/EthosTicker";
import { Manifesto } from "@/components/sections/Manifesto";
import { Disciplines } from "@/components/sections/Disciplines";
import { Recovery } from "@/components/sections/Recovery";
import { Pillars } from "@/components/sections/Pillars";
import { Intelligence } from "@/components/sections/Intelligence";
import { Stats } from "@/components/sections/Stats";
import { Membership } from "@/components/sections/Membership";
import { Testimonials } from "@/components/sections/Testimonials";
import { BRAND } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: BRAND.name,
  description:
    "A luxury fitness & wellness ecosystem with twelve training disciplines, a full recovery circuit, performance nutrition, and an AI intelligence layer.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "One Meridian Row",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  email: BRAND.email,
  telephone: BRAND.phone,
  openingHours: "Mo-Su 05:00-23:00",
  priceRange: "$$$",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <EthosTicker />
      <Manifesto />
      <Disciplines />
      <Recovery />
      <Pillars />
      <Intelligence />
      <Stats />
      <Membership />
      <Testimonials />
    </>
  );
}

/**
 * AXIOM content model.
 * Single source of truth for copy + data across the marketing site.
 * All copy is bespoke — no placeholder text.
 */

export const BRAND = {
  name: "AXIOM",
  tagline: "The operating system for the human body.",
  location: "One Meridian Row · New York · Est. 2019",
  email: "concierge@axiom.fit",
  phone: "+1 (212) 555-0110",
};

export type NavLink = { label: string; href: string; note?: string };

export const NAV: NavLink[] = [
  { label: "Disciplines", href: "/disciplines", note: "12 training modalities" },
  { label: "Recovery", href: "/recovery", note: "Spa · Ice · Sauna" },
  { label: "Nutrition", href: "/nutrition", note: "Cafe & meal science" },
  { label: "Intelligence", href: "/intelligence", note: "AI coach & tracker" },
  { label: "Membership", href: "/membership", note: "Three tiers" },
];

export const DISCIPLINES = [
  {
    slug: "strength",
    name: "Strength Lab",
    kicker: "Powerlifting · Hypertrophy",
    desc: "Force-plate platforms and instrumented racks that read every rep. Progressive overload, quantified.",
    accent: "voltage",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "hiit",
    name: "The Furnace",
    kicker: "HIIT · Conditioning",
    desc: "Heart-rate-zoned interval theatre. Lighting and sound modulate to your effort in real time.",
    accent: "ember",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "yoga",
    name: "Stillness Studio",
    kicker: "Yoga · Mobility",
    desc: "Heated, circadian-lit sanctuary tuned for breath. Where output finally learns to rest.",
    accent: "gold",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "boxing",
    name: "Iron & Rope",
    kicker: "Boxing · MMA",
    desc: "Regulation ring, sensor-wrapped bags, and coaches from three national programs.",
    accent: "ember",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "swim",
    name: "The Depths",
    kicker: "Swimming · Aqua",
    desc: "25-metre saltwater endless pool with underwater pace lighting and stroke analysis.",
    accent: "plasma",
    image:
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "pilates",
    name: "Reform Room",
    kicker: "Pilates · Barre",
    desc: "Instrumented reformers that measure spring tension and symmetry across every carriage.",
    accent: "voltage",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
  },
];

export const RECOVERY = [
  { name: "Contrast Suite", detail: "Ice bath · 3°C", icon: "Snowflake" },
  { name: "Finnish Sauna", detail: "Cedar · 90°C", icon: "Flame" },
  { name: "Infrared Lounge", detail: "Deep tissue heat", icon: "Sun" },
  { name: "Cryo Chamber", detail: "-110°C · 3 min", icon: "Wind" },
  { name: "Compression Bar", detail: "Pneumatic recovery", icon: "Activity" },
  { name: "Sleep Pods", detail: "NSDR · guided", icon: "Moon" },
];

export const STATS = [
  { value: 2400, suffix: "+", label: "Members in residence" },
  { value: 48, suffix: "", label: "Master coaches on staff" },
  { value: 12, suffix: "", label: "Training disciplines" },
  { value: 94, suffix: "%", label: "Retain past 12 months" },
];

export const PILLARS = [
  {
    n: "01",
    title: "Train",
    body: "Twelve disciplines under one roof — strength, combat, water, stillness. Every platform is instrumented so the work is measured, not guessed.",
  },
  {
    n: "02",
    title: "Recover",
    body: "A full contrast circuit: ice, sauna, cryo, infrared, compression, and guided sleep. Recovery is programmed as deliberately as the training.",
  },
  {
    n: "03",
    title: "Fuel",
    body: "An in-house performance cafe and a nutrition team that turns your bloodwork into a menu. Food engineered for adaptation.",
  },
  {
    n: "04",
    title: "Understand",
    body: "AXIOM Intelligence unifies every rep, plate, heart-beat and macro into one living model of you — and coaches the next move.",
  },
];

export const TRAINERS = [
  {
    name: "Mara Voss",
    role: "Head of Strength",
    creds: "Ex-national weightlifting · MSc Biomechanics",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Kai Renner",
    role: "Combat Director",
    creds: "Pro boxing · 3x regional MMA coach",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Elena Marchetti",
    role: "Movement & Mobility",
    creds: "500hr yoga · Clinical Pilates",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Devon Clarke",
    role: "Performance Science",
    creds: "PhD Exercise Physiology · ex-Olympic support",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop",
  },
];

export const PLANS = [
  {
    tier: "Core",
    price: 189,
    cadence: "/mo",
    blurb: "Full-facility access with the intelligence layer to guide you.",
    features: [
      "All 12 training disciplines",
      "Recovery circuit access",
      "AXIOM Intelligence app",
      "2 guided classes / week",
      "Performance cafe access",
    ],
    accent: "ghost",
  },
  {
    tier: "Signature",
    price: 349,
    cadence: "/mo",
    blurb: "Coaching, programming, and priority across the entire ecosystem.",
    features: [
      "Everything in Core",
      "Personal coach · biweekly",
      "Quarterly bloodwork + meal plan",
      "Unlimited classes",
      "Priority booking & guest passes",
      "Body composition scans",
    ],
    accent: "primary",
    featured: true,
  },
  {
    tier: "Private",
    price: null,
    cadence: "Invitation",
    blurb: "A dedicated team, private training floor, and 24/7 concierge.",
    features: [
      "Everything in Signature",
      "Dedicated coaching team",
      "Private training suite",
      "Concierge nutrition & chef",
      "Recovery on demand",
    ],
    accent: "ghost",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I've trained in three countries and nothing is close. AXIOM measures things my last coach only guessed at. My deadlift went up 40kg in a year — and my sleep score with it.",
    name: "Jordan Hale",
    role: "Member · 2 years",
  },
  {
    quote:
      "The recovery floor alone is worth it. Ice, sauna, compression, then a flat white made to my macros. I leave feeling rebuilt, not wrecked.",
    name: "Priya Nair",
    role: "Member · 18 months",
  },
  {
    quote:
      "It doesn't feel like a gym. It feels like a research lab that happens to love you. The AI coach nudged me off a plateau I'd sat on for years.",
    name: "Marcus Bell",
    role: "Member · 3 years",
  },
];

export const FAQ = [
  {
    q: "Is AXIOM only for elite athletes?",
    a: "No. The intelligence layer meets you exactly where you are — a first deadlift or a national podium. The programming scales to you, not the other way around.",
  },
  {
    q: "What does the AI coach actually do?",
    a: "It reads your training, recovery, and nutrition as one signal and proposes the next session, flags overreach before injury, and adapts your plan weekly. You always approve the move.",
  },
  {
    q: "Can I try before I commit?",
    a: "Yes. Every membership begins with a 7-day performance trial including a full assessment, one coached session per discipline you choose, and recovery access.",
  },
  {
    q: "Where is AXIOM located?",
    a: "Our flagship is at One Meridian Row in Manhattan, with satellite recovery lounges opening in 2026. Membership is portable across all locations.",
  },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Train",
    links: [
      { label: "Disciplines", href: "/disciplines" },
      { label: "Classes", href: "/classes" },
      { label: "Coaches", href: "/coaches" },
      { label: "Challenges", href: "/challenges" },
    ],
  },
  {
    title: "Live",
    links: [
      { label: "Recovery", href: "/recovery" },
      { label: "Nutrition", href: "/nutrition" },
      { label: "The Cafe", href: "/cafe" },
      { label: "Store", href: "/store" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "AXIOM Intelligence", href: "/intelligence" },
      { label: "Member Dashboard", href: "/dashboard" },
      { label: "Leaderboards", href: "/leaderboards" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Book a tour", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
];

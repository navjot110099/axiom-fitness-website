/**
 * AXIOM extended data.
 * Feeds every inner route. All content bespoke — no placeholders.
 */

/* ----------------------------- Disciplines ----------------------------- */
export const DISCIPLINES_FULL = [
  { slug: "strength", name: "Strength Lab", kicker: "Powerlifting · Hypertrophy", accent: "voltage",
    desc: "Force-plate platforms and instrumented racks that read every rep. Progressive overload, quantified to the newton.",
    stats: [{ k: "Platforms", v: "18" }, { k: "Max load", v: "500kg" }],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop" },
  { slug: "hiit", name: "The Furnace", kicker: "HIIT · Conditioning", accent: "ember",
    desc: "Heart-rate-zoned interval theatre. Lighting and sound modulate to your effort in real time.",
    stats: [{ k: "Zones", v: "5" }, { k: "Class size", v: "24" }],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop" },
  { slug: "yoga", name: "Stillness Studio", kicker: "Yoga · Mobility", accent: "gold",
    desc: "Heated, circadian-lit sanctuary tuned for breath. Where output finally learns to rest.",
    stats: [{ k: "Temp", v: "34°C" }, { k: "Styles", v: "7" }],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop" },
  { slug: "boxing", name: "Iron & Rope", kicker: "Boxing · MMA", accent: "ember",
    desc: "Regulation ring, sensor-wrapped bags, and coaches from three national programs.",
    stats: [{ k: "Bags", v: "22" }, { k: "Ring", v: "6.1m" }],
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop" },
  { slug: "swim", name: "The Depths", kicker: "Swimming · Aqua", accent: "plasma",
    desc: "25-metre saltwater endless pool with underwater pace lighting and stroke analysis.",
    stats: [{ k: "Length", v: "25m" }, { k: "Salt", v: "Yes" }],
    image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?q=80&w=1600&auto=format&fit=crop" },
  { slug: "pilates", name: "Reform Room", kicker: "Pilates · Barre", accent: "voltage",
    desc: "Instrumented reformers that measure spring tension and symmetry across every carriage.",
    stats: [{ k: "Reformers", v: "16" }, { k: "Sensors", v: "Live" }],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop" },
  { slug: "crossfit", name: "The Yard", kicker: "CrossFit · Functional", accent: "ember",
    desc: "A cathedral of rigs, sleds and Olympic platforms. Community WODs scored on the live board.",
    stats: [{ k: "Rigs", v: "12" }, { k: "Sled track", v: "30m" }],
    image: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=1600&auto=format&fit=crop" },
  { slug: "cycle", name: "Velodrome", kicker: "Cycle · Endurance", accent: "plasma",
    desc: "Immersive projection cycling with power-matched bikes and leaderboard climbs.",
    stats: [{ k: "Bikes", v: "40" }, { k: "Wattage", v: "Live" }],
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1600&auto=format&fit=crop" },
];

/* ----------------------------- Classes ----------------------------- */
export const CLASS_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const CLASSES = [
  { name: "Sunrise Strength", time: "06:00", len: "60m", coach: "Mara Voss", discipline: "Strength", intensity: 4, spots: 3 },
  { name: "The Furnace", time: "07:15", len: "45m", coach: "Kai Renner", discipline: "HIIT", intensity: 5, spots: 6 },
  { name: "Flow & Breath", time: "09:00", len: "75m", coach: "Elena Marchetti", discipline: "Yoga", intensity: 2, spots: 11 },
  { name: "Power Hour", time: "12:30", len: "60m", coach: "Devon Clarke", discipline: "CrossFit", intensity: 4, spots: 2 },
  { name: "Ring Craft", time: "17:30", len: "60m", coach: "Kai Renner", discipline: "Boxing", intensity: 4, spots: 8 },
  { name: "Deep Water", time: "18:45", len: "45m", coach: "Elena Marchetti", discipline: "Swim", intensity: 3, spots: 5 },
  { name: "Reformer Sculpt", time: "19:00", len: "50m", coach: "Mara Voss", discipline: "Pilates", intensity: 3, spots: 4 },
];

/* ----------------------------- Coaches ----------------------------- */
export const COACHES = [
  { name: "Mara Voss", role: "Head of Strength", creds: "Ex-national weightlifting · MSc Biomechanics", specialty: ["Powerlifting", "Hypertrophy"], years: 14,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop" },
  { name: "Kai Renner", role: "Combat Director", creds: "Pro boxing · 3x regional MMA coach", specialty: ["Boxing", "MMA", "Conditioning"], years: 11,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop" },
  { name: "Elena Marchetti", role: "Movement & Mobility", creds: "500hr yoga · Clinical Pilates", specialty: ["Yoga", "Pilates", "Rehab"], years: 16,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop" },
  { name: "Devon Clarke", role: "Performance Science", creds: "PhD Exercise Physiology · ex-Olympic support", specialty: ["Endurance", "Programming"], years: 18,
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop" },
  { name: "Sana Iyer", role: "Recovery Lead", creds: "Physiotherapy · Sports massage · Breathwork", specialty: ["Recovery", "Mobility"], years: 9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop" },
  { name: "Theo Nakamura", role: "Aquatics Coach", creds: "National swim squad · Stroke analyst", specialty: ["Swim", "Endurance"], years: 12,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1200&auto=format&fit=crop" },
];

/* ----------------------------- Challenges ----------------------------- */
export const CHALLENGES = [
  { name: "75 Days Forged", tag: "Transformation", days: 75, joined: 412, accent: "voltage",
    desc: "A structured 75-day body-recomposition arc — training, recovery and nutrition scored daily." },
  { name: "Sub-20 5K", tag: "Endurance", days: 42, joined: 288, accent: "plasma",
    desc: "Break twenty minutes over five kilometres with a periodised aerobic build." },
  { name: "Iron Ascent", tag: "Strength", days: 60, joined: 356, accent: "ember",
    desc: "Add 20% to your big-three total with autoregulated progressive overload." },
  { name: "Stillness Streak", tag: "Wellness", days: 30, joined: 501, accent: "gold",
    desc: "Thirty consecutive days of mobility, breathwork and guided sleep." },
];

/* ----------------------------- Leaderboard ----------------------------- */
export const LEADERBOARD = [
  { rank: 1, name: "Jordan Hale", points: 9840, streak: 128, discipline: "Strength", delta: 2 },
  { rank: 2, name: "Priya Nair", points: 9410, streak: 96, discipline: "Yoga", delta: 1 },
  { rank: 3, name: "Marcus Bell", points: 9180, streak: 141, discipline: "CrossFit", delta: -1 },
  { rank: 4, name: "Amara Okafor", points: 8720, streak: 74, discipline: "Boxing", delta: 3 },
  { rank: 5, name: "Liam Fraser", points: 8510, streak: 62, discipline: "Swim", delta: 0 },
  { rank: 6, name: "Yuki Tanaka", points: 8330, streak: 88, discipline: "HIIT", delta: -2 },
  { rank: 7, name: "Noa Bergman", points: 8100, streak: 51, discipline: "Pilates", delta: 1 },
  { rank: 8, name: "Diego Ramos", points: 7940, streak: 44, discipline: "Cycle", delta: 4 },
];

/* ----------------------------- Store ----------------------------- */
export const PRODUCTS = [
  { slug: "recovery-hoodie", name: "Thermal Recovery Hoodie", price: 168, tag: "Apparel", accent: "voltage",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop" },
  { slug: "protein-blend", name: "AXIOM Whey Isolate", price: 62, tag: "Nutrition", accent: "plasma",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop" },
  { slug: "training-sling", name: "Carbon Training Sling", price: 240, tag: "Gear", accent: "gold",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop" },
  { slug: "band-set", name: "Precision Band Set", price: 48, tag: "Gear", accent: "ember",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=1200&auto=format&fit=crop" },
  { slug: "steel-bottle", name: "Insulated Steel Flask", price: 44, tag: "Accessories", accent: "voltage",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop" },
  { slug: "shaker", name: "Vortex Shaker", price: 28, tag: "Accessories", accent: "plasma",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1200&auto=format&fit=crop" },
  { slug: "electrolytes", name: "Cellular Electrolytes", price: 38, tag: "Nutrition", accent: "gold",
    image: "https://images.unsplash.com/photo-1622484211148-cf1e3b0f2b34?q=80&w=1200&auto=format&fit=crop" },
  { slug: "lifting-shoe", name: "Platform Lifting Shoe", price: 195, tag: "Apparel", accent: "ember",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop" },
];
export const PRODUCT_CATEGORIES = ["All", "Apparel", "Nutrition", "Gear", "Accessories"];

/* ----------------------------- Nutrition ----------------------------- */
export const MACRO_RINGS = [
  { label: "Protein", value: 182, target: 200, unit: "g", color: "#25A8FF" },
  { label: "Carbs", value: 246, target: 280, unit: "g", color: "#6FD3FF" },
  { label: "Fats", value: 61, target: 70, unit: "g", color: "#FF4D1C" },
];
export const MEAL_PLANS = [
  { name: "Lean Build", kcal: 2600, protein: 200, focus: "Hypertrophy", accent: "voltage",
    desc: "High-protein surplus engineered for clean muscle gain and full recovery." },
  { name: "Endurance Fuel", kcal: 2900, protein: 150, focus: "Aerobic", accent: "plasma",
    desc: "Carb-periodised to power long efforts without crashing your afternoons." },
  { name: "Recomposition", kcal: 2200, protein: 190, focus: "Balance", accent: "gold",
    desc: "Precise maintenance calories that shed fat while holding hard-won strength." },
];
export const CAFE_MENU = [
  { name: "The Recovery Bowl", macro: "48P · 62C · 14F", price: 16, desc: "Grilled chicken, ancient grains, roasted roots, tahini." },
  { name: "Cold Smoke Salmon", macro: "40P · 22C · 28F", price: 19, desc: "Beetroot-cured salmon, avocado, seeded rye, dill oil." },
  { name: "Voltage Smoothie", macro: "30P · 40C · 6F", price: 12, desc: "Whey isolate, banana, spinach, peanut, cold brew." },
  { name: "Sunrise Oats", macro: "24P · 58C · 12F", price: 11, desc: "Overnight oats, berry compote, casein, cacao nib." },
];

/* ----------------------------- Journal / Blog ----------------------------- */
export const POSTS = [
  { slug: "recovery-is-training", title: "Recovery Is Training: The Science of Adaptation", category: "Recovery", read: 8, date: "Jun 2026", featured: true,
    excerpt: "Why the adaptation you chase happens in the hours you rest — and how to program it deliberately.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop" },
  { slug: "hrv-explained", title: "Reading Your HRV Without the Hype", category: "Intelligence", read: 6, date: "Jun 2026",
    excerpt: "Heart-rate variability is powerful and wildly misread. Here is what the number actually tells you.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop" },
  { slug: "progressive-overload", title: "Progressive Overload, Quantified", category: "Strength", read: 7, date: "May 2026",
    excerpt: "Force plates turn a vague principle into a precise dial. A field guide to using the data.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop" },
  { slug: "cold-exposure", title: "Cold Exposure: Dose, Timing, Truth", category: "Recovery", read: 5, date: "May 2026",
    excerpt: "Ice baths are having a moment. We separate the physiology from the folklore.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600&auto=format&fit=crop" },
  { slug: "fuelling-endurance", title: "Fuelling the Long Effort", category: "Nutrition", read: 9, date: "Apr 2026",
    excerpt: "Carb periodisation for people who train hard and think harder about what they eat.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop" },
  { slug: "sleep-architecture", title: "Sleep Architecture for Athletes", category: "Wellness", read: 6, date: "Apr 2026",
    excerpt: "Deep sleep is where the body rebuilds. Small, boring habits move the needle most.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1600&auto=format&fit=crop" },
];
export const POST_CATEGORIES = ["All", "Recovery", "Strength", "Nutrition", "Intelligence", "Wellness"];

/* ----------------------------- Careers ----------------------------- */
export const ROLES = [
  { title: "Master Strength Coach", team: "Coaching", type: "Full-time", place: "New York" },
  { title: "Performance Scientist", team: "Intelligence", type: "Full-time", place: "New York" },
  { title: "Recovery Therapist", team: "Recovery", type: "Full-time", place: "New York" },
  { title: "Head Chef — Performance Cafe", team: "Nutrition", type: "Full-time", place: "New York" },
  { title: "Senior Product Engineer", team: "Platform", type: "Remote", place: "Remote · US" },
  { title: "Member Concierge", team: "Experience", type: "Part-time", place: "New York" },
];

/* ----------------------------- Press ----------------------------- */
export const PRESS = [
  { outlet: "Vogue", quote: "The most beautiful place to sweat in America.", year: "2026" },
  { outlet: "WIRED", quote: "A gym that behaves like a research lab.", year: "2025" },
  { outlet: "GQ", quote: "Equinox, but from the future.", year: "2025" },
  { outlet: "Monocle", quote: "Wellness design at its most quietly radical.", year: "2024" },
];

/* ----------------------------- Dashboard mock ----------------------------- */
export const MEMBER = {
  name: "Alex Rivera",
  tier: "Signature",
  streak: 34,
  readiness: 82,
  weekLoad: [42, 58, 35, 71, 64, 88, 52],
  volume: [
    { week: "W1", value: 12400 },
    { week: "W2", value: 13800 },
    { week: "W3", value: 12900 },
    { week: "W4", value: 15200 },
    { week: "W5", value: 16050 },
    { week: "W6", value: 17400 },
  ],
  prs: [
    { lift: "Back Squat", value: "182.5kg", delta: "+7.5" },
    { lift: "Deadlift", value: "220kg", delta: "+10" },
    { lift: "Bench", value: "125kg", delta: "+2.5" },
    { lift: "5K Run", value: "20:48", delta: "-0:31" },
  ],
  upcoming: [
    { name: "Sunrise Strength", when: "Tomorrow · 06:00", coach: "Mara Voss" },
    { name: "Contrast Recovery", when: "Thu · 19:30", coach: "Sana Iyer" },
    { name: "Ring Craft", when: "Sat · 17:30", coach: "Kai Renner" },
  ],
  rings: [
    { label: "Move", value: 78, color: "#25A8FF" },
    { label: "Fuel", value: 64, color: "#6FD3FF" },
    { label: "Rest", value: 91, color: "#FF4D1C" },
  ],
};

/* ----------------------------- Booking steps ----------------------------- */
export const BOOKING_DISCIPLINES = ["Strength Lab", "The Furnace", "Stillness Studio", "Iron & Rope", "The Depths", "Reform Room"];
export const BOOKING_TIMES = ["06:00", "07:15", "09:00", "12:30", "17:30", "18:45", "19:00"];

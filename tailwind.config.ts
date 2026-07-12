import type { Config } from "tailwindcss";

/**
 * AXIOM design system.
 * A dark, cinematic, editorial fitness & wellness language.
 * Obsidian surfaces · warm bone type · electric "voltage" signal accent.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // Base surfaces — obsidian scale
        void: "#060607",
        obsidian: "#0B0B0D",
        surface: "#111115",
        elevated: "#17171C",
        line: "#26262D",
        // Type
        bone: "#F4F3EE",
        ash: "#9A9A94",
        faint: "#6A6A66",
        // Signal accents
        voltage: "#25A8FF", // electric azure — primary energy
        "voltage-deep": "#0B7BDD",
        ember: "#FF4D1C", // heat — HIIT / boxing
        plasma: "#6FD3FF", // icy cyan — recovery / ice / swim
        gold: "#E9C56A", // spa / premium membership
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid editorial display scale
        "display-sm": ["clamp(2.5rem,6vw,4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display": ["clamp(3.5rem,9vw,7rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(4.5rem,13vw,12rem)", { lineHeight: "0.82", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        mega: "-0.05em",
        eyebrow: "0.32em",
      },
      backgroundImage: {
        "aurora":
          "radial-gradient(60% 80% at 15% 0%, rgba(37, 168, 255,0.10) 0%, transparent 60%), radial-gradient(50% 60% at 100% 20%, rgba(90,169,255,0.10) 0%, transparent 55%), radial-gradient(70% 90% at 50% 120%, rgba(255,77,28,0.08) 0%, transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "aurora-drift": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%,-3%,0) scale(1.08)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "float-y": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "marquee": "marquee var(--marquee-duration,40s) linear infinite",
        "shimmer": "shimmer 2.2s infinite",
        "pulse-ring": "pulse-ring 2.6s ease-out infinite",
        "float-y": "float-y 6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16,1,0.3,1)",
        "in-out-quint": "cubic-bezier(0.83,0,0.17,1)",
      },
    },
  },
  plugins: [],
};

export default config;

# AXIOM — The Operating System for the Human Body

A luxury fitness & wellness **ecosystem** (not a gym website). Dark, cinematic,
editorial. Built to compete for Awwwards Website of the Year.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS ·
GSAP + ScrollTrigger · Framer Motion · Lenis (smooth scroll) · Three.js +
React Three Fiber + Drei · Embla · React CountUp · React Hook Form + Zod ·
Lucide.

## Getting started

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

> Node lives at `~/.local/node` on this machine (not on the default PATH).
> The preview launch config exports it explicitly.

## Design system

- **Surfaces** — obsidian scale (`void`, `obsidian`, `surface`, `elevated`, `line`)
- **Type** — `bone` / `ash` / `faint`
- **Signal accents** — `voltage` (lime, primary energy), `ember` (heat / HIIT),
  `plasma` (cool / recovery), `gold` (spa / premium)
- **Fonts** — Archivo (display), Inter (body), JetBrains Mono (data/eyebrows)
- Tokens live in `tailwind.config.ts`; base layer + utilities in `src/app/globals.css`.

## Architecture

```
src/
  app/            layout (fonts, SEO, shell), globals, page (home)
  components/
    providers/    SmoothScroll (Lenis ↔ GSAP ticker)
    ui/           Cursor, Magnetic, Button, Reveal, SplitText, Marquee, Aurora
    three/        HeroOrb (R3F energy core + particle field)
    layout/       Navbar, Footer
    sections/     Hero, EthosTicker, Manifesto, Disciplines, Recovery,
                  Pillars, Intelligence, Stats, Membership, Testimonials
  lib/            content (single source of truth), fonts, utils
```

Reusable primitives (`Reveal`, `SplitText`, `Magnetic`, `Button`, `Marquee`)
are the vocabulary — every new page composes them. All copy is in `lib/content.ts`.

## Status — complete

All 23 routes built, verified (every route HTTP 200, `tsc --noEmit` clean, zero
console errors, desktop + mobile):

`/` · `/disciplines` · `/recovery` · `/nutrition` · `/cafe` · `/intelligence` ·
`/classes` · `/coaches` · `/challenges` · `/leaderboards` · `/membership` ·
`/store` · `/journal` (+ `/journal/[slug]`) · `/contact` · `/careers` · `/press` ·
`/privacy` · `/terms` · `/dashboard` · `/dashboard/trainer` · `/dashboard/admin` ·
`/booking`

### Motion system
- **Preloader** (`components/providers/Preloader.tsx`) — canvas energy sparks,
  morphing SVG core, split wordmark, live counter, clip-path + blur reveal.
  Shown once per session (sessionStorage).
- **Page transitions** (`app/template.tsx`) — clip + blur + rise on every route,
  with voltage/void sweep panels.
- **Cursor** — spring physics + velocity stretch + context labels.
- **TiltCard** — 3D tilt with cursor-tracked glare and voltage glow.
- **HeroOrb** — distorting core, energy rings, orbiting shards, particle field,
  pointer camera drift.
- **ScrollProgress** — gradient progress bar.
- Every section animates with a varied vocabulary (pinned horizontal scroll,
  parallax, mask/word reveals, animated SVG charts, count-ups, magnetic hover,
  interactive lighting). Accessibility (reduced-motion, skip link, focus rings)
  and SEO (per-page metadata + JSON-LD) are wired throughout.

### Extra data/util modules
`lib/data.ts` (all inner-page data), `lib/journal-bodies.ts` (article copy),
`lib/useGSAP.ts` (gsap.context hook).
```

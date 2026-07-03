import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, FOOTER_NAV } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-obsidian">
      {/* CTA band */}
      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5">Begin</p>
            <h2 className="font-display text-display-sm font-extrabold leading-[0.92]">
              Your body is the
              <br />
              <span className="text-voltage-grad">only asset</span> that
              <br />
              compounds daily.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-xs text-ash lg:text-right">
              Start with a 7-day performance trial. Full assessment, coached
              sessions, recovery access — no card required.
            </p>
            <Button href="/membership" size="lg" arrow>
              Claim your trial
            </Button>
          </div>
        </div>
      </div>

      {/* Giant wordmark marquee */}
      <div className="border-y border-line py-6">
        <Marquee duration={38}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-6xl font-extrabold tracking-tight text-elevated md:text-8xl"
            >
              AXIOM · TRAIN · RECOVER · FUEL ·
            </span>
          ))}
        </Marquee>
      </div>

      {/* Link grid */}
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-voltage/60">
              <span className="h-1.5 w-1.5 rounded-full bg-voltage" />
            </span>
            <span className="font-display text-lg font-extrabold">{BRAND.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
            {BRAND.tagline}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-faint">
            {BRAND.location}
          </p>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-faint">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor
                    className="group inline-flex items-center gap-1 text-sm text-ash transition-colors hover:text-bone"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} AXIOM Performance Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ash">Privacy</Link>
            <Link href="/terms" className="hover:text-ash">Terms</Link>
            <Link href="/contact" className="hover:text-ash">Contact</Link>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-voltage" />
              Flagship open · 05:00–23:00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

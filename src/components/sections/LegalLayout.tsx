"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

/**
 * Restrained legal layout: sticky anchor TOC on desktop that tracks the
 * section in view, well-structured sections with a subtle reveal on scroll.
 */
export function LegalLayout({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
      {/* Sticky TOC — desktop only */}
      <aside className="hidden lg:block">
        <div className="sticky top-32">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-faint">
            On this page
          </p>
          <nav className="space-y-1 border-l border-line">
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  data-cursor
                  className="group relative -ml-px block border-l border-transparent py-2 pl-4 text-sm transition-colors"
                  style={{ color: isActive ? "#EDEDE8" : undefined }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="legal-toc-active"
                      className="absolute -left-px top-0 h-full w-px bg-voltage"
                    />
                  )}
                  <span
                    className={
                      isActive
                        ? "text-bone"
                        : "text-ash transition-colors group-hover:text-bone"
                    }
                  >
                    <span className="mr-2 font-mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </span>
                </a>
              );
            })}
          </nav>
          <p className="mt-8 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-widest text-faint">
            Last updated
            <span className="mt-1 block text-ash">{updated}</span>
          </p>
        </div>
      </aside>

      {/* Body */}
      <div className="max-w-2xl">
        <p className="mb-12 font-mono text-xs uppercase tracking-widest text-faint lg:hidden">
          Last updated · {updated}
        </p>
        <div className="space-y-16">
          {sections.map((s, i) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-32"
            >
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-mono text-xs text-voltage">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl font-extrabold leading-tight">
                  {s.title}
                </h2>
              </div>
              <div className="space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-ash">
                    {p}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

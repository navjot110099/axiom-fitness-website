"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { PILLARS } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";

/**
 * The loop. Four pillars connected by a line that draws across as the section
 * enters. Each cell carries a cursor-tracked spotlight (interactive lighting).
 */
export function Pillars() {
  return (
    <section className="relative border-t border-line py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5">/ 03 — The loop</p>
          <SplitText
            text="One continuous loop of adaptation."
            as="h2"
            className="font-display text-display-sm font-extrabold leading-[0.98]"
          />
        </div>

        <div className="relative grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line that draws across */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-[104px] z-10 hidden h-px w-full origin-left bg-gradient-to-r from-voltage/0 via-voltage to-voltage/0 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {PILLARS.map((p, i) => (
            <PillarCell key={p.n} n={p.n} title={p.title} body={p.body} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCell({
  n,
  title,
  body,
  index,
}: {
  n: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      data-cursor
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-obsidian p-8"
    >
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x,50%) var(--y,50%), rgba(199,249,75,0.10), transparent 60%)",
        }}
      />
      <div className="relative mb-16 flex items-center justify-between">
        <motion.span
          className="font-display text-4xl font-extrabold text-elevated"
          whileInView={{ color: ["#17171C", "#C7F94B"] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        >
          {n}
        </motion.span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-voltage opacity-0 transition-opacity duration-500 group-hover:animate-ping group-hover:opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-line transition-colors duration-500 group-hover:bg-voltage" />
        </span>
      </div>
      <h3 className="relative font-display text-2xl font-extrabold">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-ash">{body}</p>
      <span className="absolute inset-x-8 bottom-6 h-px origin-left scale-x-0 bg-voltage transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

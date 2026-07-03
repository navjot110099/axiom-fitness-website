"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

/**
 * Editorial manifesto. Two mirrored statements with a scrubbed "wipe" reveal
 * on the emphasis words. The section pins visually via a tall container.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 lg:py-48">
      <div className="container-x">
        <motion.p style={{ y }} className="eyebrow mb-10">
          / 01 — The thesis
        </motion.p>

        <div className="max-w-5xl">
          <SplitText
            text="A gym gives you equipment."
            as="h2"
            className="font-display text-display-sm font-semibold leading-[1.02] text-faint"
            stagger={0.03}
          />
          <SplitText
            text="AXIOM gives you a system that measures every input, models your"
            as="h2"
            className="mt-2 font-display text-display-sm font-semibold leading-[1.02]"
            stagger={0.03}
          />
          <SplitText
            text="recovery, tunes your fuel, and coaches the next decision —"
            as="h2"
            className="mt-2 font-display text-display-sm font-semibold leading-[1.02]"
            stagger={0.03}
          />
          <span className="mt-2 block font-display text-display-sm font-semibold leading-[1.02]">
            <SplitText
              text="so progress stops being"
              as="span"
              className="inline"
              stagger={0.03}
            />{" "}
            <SplitText
              text="a guess."
              as="span"
              className="inline"
              wordClassName="text-voltage-grad"
              stagger={0.03}
              delay={0.2}
            />
          </span>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            { k: "Measured", v: "Every platform is instrumented. Nothing is estimated." },
            { k: "Adaptive", v: "Your plan rewrites itself weekly around real recovery." },
            { k: "Complete", v: "Train, recover, fuel and analyse without leaving the ecosystem." },
          ].map((c) => (
            <div key={c.k} className="bg-obsidian p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-voltage">
                {c.k}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ash">{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Snowflake, Flame, Sun, Wind, Activity, Moon } from "lucide-react";
import { RECOVERY } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";

const ICONS = { Snowflake, Flame, Sun, Wind, Activity, Moon };

export function Recovery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Parallax bg */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=2000&auto=format&fit=crop"
          alt="AXIOM recovery suite"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
      <div className="absolute inset-0 bg-void/40" />

      <div className="container-x relative z-10 py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 text-plasma">/ Recovery is training</p>
          <SplitText
            text="The work is only half of it."
            as="h2"
            className="font-display text-display font-extrabold leading-[0.9]"
          />
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
            Adaptation happens when you recover, not when you train. Our contrast
            circuit — ice, sauna, cryo, infrared, compression and guided sleep —
            is programmed as deliberately as any session on the floor.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {RECOVERY.map((r, i) => {
            const Icon = ICONS[r.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                data-cursor
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:border-plasma/40"
              >
                <Icon className="h-5 w-5 text-plasma transition-transform duration-500 group-hover:scale-110" />
                <p className="mt-6 font-display text-base font-bold">{r.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ash">
                  {r.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <Button href="/recovery" variant="ghost" arrow>
            Tour the recovery floor
          </Button>
        </div>
      </div>
    </section>
  );
}

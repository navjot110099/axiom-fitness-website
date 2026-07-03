"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VALUES = [
  {
    n: "01",
    title: "Measure, don't guess.",
    body: "Every claim we make about the body is backed by a number we can show you. Intuition earns its keep by being tested.",
  },
  {
    n: "02",
    title: "Beauty is a feature.",
    body: "The floor, the app, the cafe — all held to the same design bar. People perform better in spaces that respect them.",
  },
  {
    n: "03",
    title: "Care at the edge.",
    body: "We work with people's bodies. That's a privilege that demands warmth, discretion and follow-through, every single time.",
  },
  {
    n: "04",
    title: "Ship the next move.",
    body: "Research is only worth it when it reaches a member's Tuesday. We turn what we learn into what they do.",
  },
];

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    alt: "A coach guiding a member through a movement",
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    alt: "The strength floor at AXIOM",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    alt: "A conditioning class in motion",
  },
];

export function CareersCulture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMid = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySide = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={ref} className="space-y-24">
      {/* Culture imagery — offset parallax trio */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        <motion.div style={{ y: ySide }} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src={IMAGES[0].src}
            alt={IMAGES[0].alt}
            fill
            sizes="(max-width:1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          style={{ y: yMid }}
          className="relative aspect-[3/4] translate-y-8 overflow-hidden rounded-2xl"
        >
          <Image
            src={IMAGES[1].src}
            alt={IMAGES[1].alt}
            fill
            sizes="(max-width:1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-voltage/10 to-transparent mix-blend-screen" />
        </motion.div>
        <motion.div
          style={{ y: ySide }}
          className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-1 lg:aspect-[3/4]"
        >
          <Image
            src={IMAGES[2].src}
            alt={IMAGES[2].alt}
            fill
            sizes="(max-width:1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Values grid */}
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group bg-obsidian p-8 transition-colors hover:bg-surface lg:p-10"
          >
            <span className="font-mono text-xs text-voltage">{v.n}</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">{v.title}</h3>
            <p className="mt-4 leading-relaxed text-ash">{v.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

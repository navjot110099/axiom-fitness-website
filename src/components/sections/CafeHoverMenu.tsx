"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CAFE_MENU } from "@/lib/data";

/**
 * Editorial hover-image menu. Hovering a dish row floats its photo + macros to a
 * cursor-tracked panel — the classic Awwwards "hover reveals image" list. On
 * touch/mobile the images stack inline instead. Warm/gold editorial treatment,
 * unlike anything on the recovery or nutrition pages.
 */

const IMAGES = [
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop",
];

export function CafeHoverMenu() {
  const [hovered, setHovered] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div ref={wrap} onPointerMove={onMove} className="relative">
      <ul className="border-t border-line">
        {CAFE_MENU.map((dish, i) => (
          <li
            key={dish.name}
            onPointerEnter={() => setHovered(i)}
            onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
            className="group relative border-b border-line"
          >
            <div className="flex flex-col gap-4 py-7 transition-colors duration-300 md:flex-row md:items-center md:gap-8 md:py-9">
              <span className="hidden font-mono text-xs text-faint md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl font-extrabold text-bone transition-transform duration-300 group-hover:translate-x-2 group-hover:text-gold md:text-5xl">
                {dish.name}
              </h3>
              <div className="md:ml-auto md:text-right">
                <div className="font-mono text-[11px] uppercase tracking-widest text-gold">
                  {dish.macro}
                </div>
                <div className="mt-1 text-sm text-ash">{dish.desc}</div>
              </div>
              <span className="font-display text-2xl font-extrabold text-bone md:ml-6">
                ${dish.price}
              </span>
            </div>

            {/* inline image for touch / small screens */}
            <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl md:hidden">
              <Image
                src={IMAGES[i % IMAGES.length]}
                alt={dish.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* cursor-tracked floating image (desktop) */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: pos.x, top: pos.y }}
            className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <div className="relative h-64 w-80 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl">
              <Image
                src={IMAGES[hovered % IMAGES.length]}
                alt={CAFE_MENU[hovered].name}
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-gold">
                {CAFE_MENU[hovered].macro}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

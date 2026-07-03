"use client";

import { useEffect, useRef } from "react";
import { lerp, clamp } from "@/lib/utils";

/**
 * Luxury cursor with spring physics + velocity stretch.
 * A precise dot tracks 1:1; a trailing ring eases behind, stretches along its
 * travel vector proportional to speed, and swells / labels itself over
 * [data-cursor] targets. Desktop + fine-pointer only; respects reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-cursor");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const render = () => {
      const px = ringPos.x;
      const py = ringPos.y;
      ringPos.x = lerp(ringPos.x, mouse.x, 0.16);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.16);
      scale = lerp(scale, targetScale, 0.15);

      // velocity → directional stretch
      const dx = ringPos.x - px;
      const dy = ringPos.y - py;
      const speed = Math.hypot(dx, dy);
      const stretch = clamp(speed / 22, 0, 0.45);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      ring.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) ` +
        `rotate(${angle}deg) scale(${scale * (1 + stretch)}, ${scale * (1 - stretch)})`;
      raf = requestAnimationFrame(render);
    };
    render();

    const onOver = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!t) return;
      const mode = t.dataset.cursor || "hover";
      targetScale = mode === "cta" ? 2.7 : 2;
      ring.dataset.active = "true";
      const text = t.dataset.cursorLabel || "";
      label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };
    const onOut = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!t) return;
      targetScale = 1;
      ring.dataset.active = "false";
      label.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-voltage mix-blend-difference"
      />
      <div
        ref={ringRef}
        data-active="false"
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-bone/40 transition-colors duration-300 will-change-transform data-[active=true]:border-voltage data-[active=true]:bg-voltage/5"
      >
        <span
          ref={labelRef}
          className="rotate-0 font-mono text-[9px] uppercase tracking-widest text-voltage opacity-0 transition-opacity"
        />
      </div>
    </div>
  );
}

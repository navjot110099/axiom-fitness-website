"use client";

import { useEffect, useRef } from "react";
import { lerp, clamp } from "@/lib/utils";

/**
 * AXIOM performance cursor.
 * A crisp leading dot tracks the pointer 1:1. Behind it, a motion streak
 * elongates along the travel vector in proportion to speed — reading as
 * kinetic energy. Over interactive [data-cursor] targets the streak resolves
 * into a focus reticle (four corner brackets) with an optional label, evoking
 * precision / targeting. Desktop + fine-pointer only; respects reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-cursor");
    const dot = dotRef.current!;
    const streak = streakRef.current!;
    const reticle = reticleRef.current!;
    const label = labelRef.current!;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const trail = { x: mouse.x, y: mouse.y };
    let hovering = false;
    let ret = 0; // eased reticle presence 0..1
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const render = () => {
      const px = trail.x;
      const py = trail.y;
      trail.x = lerp(trail.x, mouse.x, 0.2);
      trail.y = lerp(trail.y, mouse.y, 0.2);

      const dx = trail.x - px;
      const dy = trail.y - py;
      const speed = Math.hypot(dx, dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      ret = lerp(ret, hovering ? 1 : 0, 0.18);

      // motion streak: length grows with speed, shrinks as the reticle takes over
      const len = clamp(10 + speed * 3.2, 10, 90) * (1 - ret);
      streak.style.transform =
        `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${len / 10})`;
      streak.style.opacity = `${clamp(0.25 + speed * 0.05, 0.25, 0.9) * (1 - ret)}`;

      // focus reticle
      const scale = 0.6 + ret * 0.4;
      reticle.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${ret * 45 - 45}deg)`;
      reticle.style.opacity = `${ret}`;

      raf = requestAnimationFrame(render);
    };
    render();

    const onOver = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!t) return;
      hovering = true;
      const text = t.dataset.cursorLabel || "";
      label.textContent = text;
      label.style.opacity = text ? "1" : "0";
    };
    const onOut = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!t) return;
      hovering = false;
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
      {/* motion streak */}
      <div
        ref={streakRef}
        className="absolute left-0 top-0 h-[2px] w-[10px] rounded-full bg-voltage will-change-transform"
        style={{ mixBlendMode: "screen" }}
      />
      {/* leading dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-voltage shadow-[0_0_10px_2px_rgba(37,168,255,0.6)]"
      />
      {/* focus reticle (corner brackets) */}
      <div
        ref={reticleRef}
        className="absolute left-0 top-0 h-11 w-11 opacity-0 will-change-transform"
      >
        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-voltage" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-voltage" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-voltage" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-voltage" />
        <span
          ref={labelRef}
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-voltage opacity-0 transition-opacity"
        />
      </div>
    </div>
  );
}

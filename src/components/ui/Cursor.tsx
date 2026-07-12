"use client";

import { useEffect, useRef } from "react";
import { lerp, clamp } from "@/lib/utils";

/**
 * AXIOM cursor accent.
 * The native system cursor stays visible and is the real pointer — this only
 * layers a subtle blue enhancement on top: a motion streak that trails the
 * cursor and elongates with speed (kinetic energy), plus a focus reticle
 * (corner brackets + label) that frames the pointer over interactive
 * [data-cursor] targets. Desktop + fine-pointer only; respects reduced-motion.
 */
export function Cursor() {
  const streakRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const streak = streakRef.current!;
    const reticle = reticleRef.current!;
    const label = labelRef.current!;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const trail = { x: mouse.x, y: mouse.y };
    let moved = false;
    let hovering = false;
    let ret = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!moved) {
        moved = true;
        streak.style.opacity = "1";
      }
    };

    const render = () => {
      const px = trail.x;
      const py = trail.y;
      trail.x = lerp(trail.x, mouse.x, 0.22);
      trail.y = lerp(trail.y, mouse.y, 0.22);

      const dx = trail.x - px;
      const dy = trail.y - py;
      const speed = Math.hypot(dx, dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      ret = lerp(ret, hovering ? 1 : 0, 0.18);

      // motion streak trailing behind the real cursor
      const len = clamp(8 + speed * 3, 8, 84) * (1 - ret);
      streak.style.transform =
        `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${len / 8})`;
      streak.style.opacity = `${(moved ? 1 : 0) * clamp(0.2 + speed * 0.05, 0.2, 0.8) * (1 - ret)}`;

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
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* motion streak (trails the native cursor) */}
      <div
        ref={streakRef}
        className="absolute left-0 top-0 h-[2px] w-[8px] rounded-full bg-voltage opacity-0 will-change-transform"
        style={{ mixBlendMode: "screen" }}
      />
      {/* focus reticle over interactive targets */}
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

"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt card with a cursor-tracked glare and voltage glow.
 * Pointer position drives rotateX/rotateY + a radial highlight; springs back
 * on leave. GPU-only transforms keep it at 60fps.
 */
export function TiltCard({
  children,
  className,
  max = 9,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={cn(
          "group/tilt relative transition-transform duration-300 ease-out-expo [transform-style:preserve-3d] [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))]",
          className,
        )}
      >
        {children}
        {/* glare */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.10), transparent 40%)",
          }}
        />
        {glow && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 blur-xl transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{
              background:
                "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(199,249,75,0.14), transparent 45%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

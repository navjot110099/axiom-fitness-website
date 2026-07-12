"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic preloader.
 * Rising energy sparks on a 2D canvas, a morphing SVG core, a split-text
 * wordmark, and a percentage counter — then a clip-path + blur wipe reveals
 * the hero. Shows once per session; respects reduced-motion.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lock scroll while active.
  useEffect(() => {
    if (done) return;
    document.documentElement.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [done]);

  // Progress simulation.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("axiom-loaded");
    if (already || reduce) {
      setProgress(100);
      setDone(true);
      return;
    }
    let raf = 0;
    let val = 0;
    const start = performance.now();
    const DURATION = 2400;
    const tick = (t: number) => {
      const elapsed = t - start;
      if (elapsed >= DURATION) {
        setProgress(100);
        sessionStorage.setItem("axiom-loaded", "1");
        setTimeout(() => setDone(true), 460);
        return;
      }
      // ease toward the time-based target for an organic climb
      const target = (elapsed / DURATION) * 100;
      val += (target - val) * 0.14;
      setProgress(Math.min(99, Math.round(val)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rising energy sparks.
  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = (canvas.width = innerWidth * dpr);
    let h = (canvas.height = innerHeight * dpr);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    type P = { x: number; y: number; vy: number; r: number; a: number };
    const parts: P[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vy: -(0.3 + Math.random() * 1.1) * dpr,
      r: (0.5 + Math.random() * 1.6) * dpr,
      a: 0.2 + Math.random() * 0.6,
    }));

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,168,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();
    const onResize = () => {
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    };
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
    };
  }, [done]);

  const letters = "AXIOM".split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            filter: "blur(14px)",
            transition: { duration: 0.9, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          {/* glow */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-voltage/10 blur-[120px]"
            animate={{ scale: [0.8, 1.15, 0.9], opacity: [0.4, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

          {/* morphing core */}
          <motion.svg
            width="90"
            height="90"
            viewBox="0 0 100 100"
            className="relative mb-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <motion.path
              fill="none"
              stroke="#25A8FF"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M50,8 C74,8 92,26 92,50 C92,74 74,92 50,92 C26,92 8,74 8,50 C8,26 26,8 50,8Z",
                  "M50,14 C70,4 96,30 86,50 C96,70 70,96 50,86 C30,96 4,70 14,50 C4,30 30,4 50,14Z",
                  "M50,8 C74,8 92,26 92,50 C92,74 74,92 50,92 C26,92 8,74 8,50 C8,26 26,8 50,8Z",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="50" cy="50" r="4" fill="#25A8FF" />
          </motion.svg>

          {/* wordmark split reveal */}
          <div className="relative flex overflow-hidden">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* counter + bar */}
          <div className="relative mt-10 w-56">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Calibrating
              </span>
              <span className="font-mono text-sm tabular-nums text-voltage">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
            <div className="mt-2 h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-voltage"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

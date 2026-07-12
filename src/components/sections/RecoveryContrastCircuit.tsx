"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Snowflake, Flame } from "lucide-react";

/**
 * Contrast-circuit temperature journey.
 * A tall scroll region drives a sticky "screen" whose background, accent and
 * copy morph from glacial plasma (3°C) to sauna ember (90°C) as you descend.
 * Uses framer useScroll/useTransform on a color-interpolated gradient plus a
 * scrubbed thermometer column. Distinct from any GSAP-pinned section elsewhere.
 */

const STOPS = [
  {
    at: 0,
    temp: "3°C",
    name: "Contrast Suite",
    label: "Ice",
    body: "You step in and the cold takes the room. Vasoconstriction slams the door on inflammation; the nervous system snaps to attention.",
    color: "#6FD3FF",
  },
  {
    at: 0.34,
    temp: "-110°C",
    name: "Cryo Chamber",
    label: "Cryo",
    body: "Three minutes in dry nitrogen air. The deepest cold we offer, and the fastest — a controlled shock that resets the whole system.",
    color: "#7FB3FF",
  },
  {
    at: 0.66,
    temp: "45°C",
    name: "Infrared Lounge",
    label: "Infrared",
    body: "The pivot. Radiant heat sinks past the skin into muscle, drawing blood back to the surface. Cold to warm, the circuit turns.",
    color: "#FFB061",
  },
  {
    at: 1,
    temp: "90°C",
    name: "Finnish Sauna",
    label: "Heat",
    body: "Cedar walls, ninety degrees, and the exhale you have been chasing all day. Vasodilation floods tissue with recovery.",
    color: "#FF4D1C",
  },
];

type Stop = (typeof STOPS)[number];

function ContrastPanel({
  stop,
  index,
  total,
  progress,
  accent,
}: {
  stop: Stop;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: MotionValue<string>;
}) {
  const window = 1 / total;
  const center = stop.at;
  const opacity = useTransform(
    progress,
    [center - window * 0.7, center, center + window * 0.7],
    index === 0 ? [1, 1, 0] : index === total - 1 ? [0, 1, 1] : [0, 1, 0],
  );
  const y = useTransform(
    progress,
    [center - window * 0.7, center, center + window * 0.7],
    [40, 0, -40],
  );
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <motion.div
        className="font-mono text-sm uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        {stop.label}
      </motion.div>
      <motion.div
        className="mt-3 font-display text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-none"
        style={{ color: accent }}
      >
        {stop.temp}
      </motion.div>
      <h3 className="mt-2 font-display text-3xl font-extrabold text-bone">{stop.name}</h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ash">{stop.body}</p>
    </motion.div>
  );
}

function Thermometer({ progress }: { progress: MotionValue<number> }) {
  const fillHeight = useTransform(progress, [0, 1], ["6%", "100%"]);
  const fillColor = useTransform(
    progress,
    [0, 0.34, 0.66, 1],
    STOPS.map((s) => s.color),
  );
  return (
    <div className="relative flex h-full w-full items-end justify-center">
      <div className="relative h-[70%] w-[6px] overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="absolute inset-x-0 bottom-0 rounded-full"
          style={{ height: fillHeight, background: fillColor }}
        />
      </div>
      <motion.div
        className="absolute h-6 w-6 rounded-full shadow-[0_0_40px_6px_rgba(255,255,255,0.15)]"
        style={{
          bottom: fillHeight,
          background: fillColor,
        }}
      />
    </div>
  );
}

export function RecoveryContrastCircuit() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    [
      "radial-gradient(120% 80% at 50% 20%, rgba(90,169,255,0.22), rgba(6,8,12,1) 62%)",
      "radial-gradient(120% 80% at 50% 20%, rgba(127,179,255,0.20), rgba(6,8,12,1) 62%)",
      "radial-gradient(120% 80% at 50% 20%, rgba(255,176,97,0.20), rgba(9,7,6,1) 62%)",
      "radial-gradient(120% 80% at 50% 20%, rgba(255,77,28,0.26), rgba(10,6,5,1) 60%)",
    ],
  );
  const accent = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    STOPS.map((s) => s.color),
  );
  const iceOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const fireOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section ref={root} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: bg }} />

        {/* atmospheric icons */}
        <motion.div style={{ opacity: iceOpacity }} className="pointer-events-none absolute left-[8%] top-[22%]">
          <Snowflake className="h-16 w-16 text-plasma/40" strokeWidth={1} />
        </motion.div>
        <motion.div style={{ opacity: fireOpacity }} className="pointer-events-none absolute right-[10%] bottom-[24%]">
          <Flame className="h-20 w-20 text-ember/50" strokeWidth={1} />
        </motion.div>

        <div className="container-x relative grid w-full items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <motion.p
              className="eyebrow mb-6"
              style={{ color: accent }}
            >
              / The contrast circuit
            </motion.p>

            <div className="relative">
              {STOPS.map((s, i) => (
                <ContrastPanel
                  key={s.name}
                  stop={s}
                  index={i}
                  total={STOPS.length}
                  progress={scrollYProgress}
                  accent={accent}
                />
              ))}
              {/* spacer to give the absolute stack height */}
              <div className="invisible">
                <div className="font-mono text-sm tracking-[0.3em]">Heat</div>
                <div className="mt-3 font-display text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-none">
                  90°C
                </div>
                <h3 className="mt-2 font-display text-3xl font-extrabold">Finnish Sauna</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed">
                  Cedar walls, ninety degrees, and the exhale you have been chasing all day.
                  Vasodilation floods tissue with recovery.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden h-[60vh] w-24 lg:block">
            <Thermometer progress={scrollYProgress} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
            Scroll — cold to hot
          </span>
        </div>
      </div>
    </section>
  );
}

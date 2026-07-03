"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { POSTS, POST_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

type Post = (typeof POSTS)[number];
type Tone = "voltage" | "ember" | "plasma" | "gold" | "neutral";

const TONE: Record<string, Tone> = {
  Recovery: "plasma",
  Strength: "voltage",
  Nutrition: "gold",
  Intelligence: "plasma",
  Wellness: "gold",
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(6px)" },
};

function FeaturedHero({ post }: { post: Post }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <div className="container-x">
      <Link
        href={`/journal/${post.slug}`}
        data-cursor="cta"
        data-cursor-label="Read"
        className="group block"
      >
        <div
          ref={ref}
          className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line md:aspect-[21/9]"
        >
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge tone="ember">Featured</Badge>
              <Badge tone={TONE[post.category] ?? "neutral"}>
                {post.category}
              </Badge>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-faint">
                <Clock className="h-3 w-3" /> {post.read} min · {post.date}
              </span>
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-[1.02] md:text-5xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ash">
              {post.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-voltage">
              Read the essay
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Editorial journal index: parallax featured hero, animated category-tab
 * filtering (AnimatePresence + layout), and an asymmetric grid where every
 * third card spans two columns. Hover reveals an image zoom + arrow.
 */
export function JournalIndex() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p.slug !== featured.slug);

  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () =>
      category === "All"
        ? rest
        : rest.filter((p) => p.category === category),
    [category, rest],
  );

  return (
    <>
      <FeaturedHero post={featured} />

      <div className="container-x mt-24">
        {/* filter tabs */}
        <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-6">
          {POST_CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-cursor
                className={cn(
                  "relative pb-1 font-mono text-[11px] uppercase tracking-widest transition-colors focus-ring",
                  active ? "text-bone" : "text-faint hover:text-ash",
                )}
              >
                {c}
                {active && (
                  <motion.span
                    layoutId="journal-underline"
                    className="absolute -bottom-[25px] left-0 right-0 h-px bg-voltage"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* asymmetric grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const wide = i % 3 === 0;
              return (
                <motion.article
                  layout
                  key={p.slug}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={cn(
                    "group",
                    wide ? "lg:col-span-4" : "lg:col-span-2",
                  )}
                >
                  <Link
                    href={`/journal/${p.slug}`}
                    data-cursor="cta"
                    data-cursor-label="Read"
                    className="block h-full"
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl border border-line",
                        wide ? "aspect-[16/9]" : "aspect-[4/3]",
                      )}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width:1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/15 bg-void/50 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-voltage" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-3 flex items-center gap-3">
                        <Badge tone={TONE[p.category] ?? "neutral"}>
                          {p.category}
                        </Badge>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-faint">
                          <Clock className="h-3 w-3" /> {p.read} min
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                          {p.date}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "font-display font-extrabold leading-tight transition-colors group-hover:text-voltage",
                          wide ? "text-2xl md:text-3xl" : "text-xl",
                        )}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ash">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

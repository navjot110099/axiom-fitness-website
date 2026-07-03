"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import type { ArticleBlock } from "@/lib/journal-bodies";

/** Reading-progress bar pinned under the site header, tied to page scroll. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[121] h-[3px] origin-left bg-gradient-to-r from-voltage via-plasma to-ember"
    />
  );
}

/** Parallax cover image with a slow drift + zoom as the article scrolls in. */
export function ArticleCover({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.24]);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 900px"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
    </div>
  );
}

/** Renders the article body: drop-cap first paragraph + styled pull-quotes. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  let paragraphIndex = 0;
  return (
    <div className="mt-14 space-y-8">
      {blocks.map((block, i) => {
        if (block.type === "quote") {
          return (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-12 border-l-2 border-voltage py-2 pl-8"
            >
              <Quote className="mb-4 h-7 w-7 text-voltage/60" />
              <p className="font-display text-2xl font-extrabold leading-snug text-bone md:text-3xl">
                {block.text}
              </p>
              {block.cite && (
                <cite className="mt-4 block font-mono text-[11px] uppercase not-italic tracking-widest text-faint">
                  {block.cite}
                </cite>
              )}
            </motion.blockquote>
          );
        }

        const isFirst = paragraphIndex === 0;
        paragraphIndex += 1;
        return (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={
              isFirst
                ? "text-lg leading-relaxed text-bone/90 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-voltage"
                : "text-lg leading-relaxed text-ash"
            }
          >
            {block.text}
          </motion.p>
        );
      })}
    </div>
  );
}

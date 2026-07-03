"use client";

import { motion } from "framer-motion";

/**
 * Per-navigation transition.
 *
 * IMPORTANT: the wrapper that contains the page must NOT use transform, filter,
 * clip-path, perspective or will-change — any of those create a containing block
 * that makes descendant `position: fixed`/`sticky` (GSAP ScrollTrigger pins,
 * sticky rails) resolve against this element instead of the viewport, which
 * breaks pinned sections. So the content only animates `opacity` (which is
 * containing-block-safe); the cinematic wipe is carried entirely by the fixed
 * overlay sweep panels, which sit outside the content flow.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
      >
        {children}
      </motion.div>

      {/* voltage sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9997] bg-voltage"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: "top" }}
      />
      {/* void sweep (trailing) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9996] bg-void"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: "top" }}
      />
    </>
  );
}

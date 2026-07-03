"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

/**
 * Minimal useGSAP: runs the callback inside a gsap.context scoped to an element
 * (so selector text is local) and auto-reverts all animations on unmount.
 * A dependency-free stand-in for @gsap/react's useGSAP.
 */
export function useGSAP(
  cb: (ctx: gsap.Context) => void,
  options?: { scope?: RefObject<HTMLElement | null>; deps?: unknown[] },
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context((self) => cbRef.current(self), options?.scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options?.deps ?? []);
}

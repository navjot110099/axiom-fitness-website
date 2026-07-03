"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, BRAND } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500",
              scrolled ? "glass-strong shadow-2xl shadow-black/40" : "bg-transparent",
            )}
          >
            {/* Wordmark */}
            <Link
              href="/"
              data-cursor
              className="group flex items-center gap-2.5 focus-ring rounded-full"
              aria-label={`${BRAND.name} home`}
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-voltage/60" />
                <span className="absolute inset-0 rounded-full bg-voltage/20 animate-pulse-ring" />
                <span className="h-1.5 w-1.5 rounded-full bg-voltage" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                {BRAND.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <Magnetic key={item.href} strength={0.2}>
                  <Link
                    href={item.href}
                    data-cursor
                    className="group relative rounded-full px-4 py-2 text-sm text-ash transition-colors hover:text-bone focus-ring"
                  >
                    {item.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-voltage transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </Magnetic>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/dashboard"
                data-cursor
                className="rounded-full px-4 py-2 text-sm text-ash transition-colors hover:text-bone focus-ring"
              >
                Sign in
              </Link>
              <Button href="/membership" size="sm" arrow>
                Join AXIOM
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden focus-ring"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-extrabold">{BRAND.name}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line focus-ring"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-5"
                    >
                      <span className="font-display text-4xl font-extrabold tracking-tight">
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                          {item.note}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Button href="/membership" size="lg" arrow magnetic={false}>
                  Join AXIOM
                </Button>
                <Button href="/dashboard" variant="ghost" size="lg" magnetic={false}>
                  Member sign in
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Variants,
} from "framer-motion";
import { Heart, Plus, X, ShoppingBag, Check } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

type Product = (typeof PRODUCTS)[number];
type Tone = "voltage" | "ember" | "plasma" | "gold";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.97 },
};

/**
 * Luxury store: animated category filtering (layout + AnimatePresence),
 * tilt cards with hover zoom + a wishlist heart, a glass Quick View modal,
 * and a floating cart pill with an animated counter. All client-side.
 */
export function StoreGrid() {
  const [category, setCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [bump, setBump] = useState(false);

  const filtered = useMemo(
    () =>
      category === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.tag === category),
    [category],
  );

  const toggleWish = (slug: string) =>
    setWishlist((w) => ({ ...w, [slug]: !w[slug] }));

  const addToCart = (p: Product) => {
    setCart((c) => [...c, p]);
    setBump(true);
    window.setTimeout(() => setBump(false), 420);
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="container-x">
      {/* filter tabs */}
      <LayoutGroup>
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {PRODUCT_CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-cursor
                className={cn(
                  "relative rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors focus-ring",
                  active ? "text-void" : "text-ash hover:text-bone",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="store-pill"
                    className="absolute inset-0 rounded-full bg-voltage"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-widest text-faint sm:block">
            {filtered.length} pieces
          </span>
        </div>

        {/* grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const wished = !!wishlist[p.slug];
              return (
                <motion.div
                  layout
                  key={p.slug}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  <TiltCard
                    max={7}
                    className="h-full overflow-hidden rounded-3xl border border-line bg-obsidian"
                  >
                    <div className="group/card relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />

                      {/* wishlist heart */}
                      <button
                        onClick={() => toggleWish(p.slug)}
                        aria-label="Add to wishlist"
                        data-cursor
                        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-void/50 backdrop-blur transition-colors hover:border-white/30 focus-ring"
                      >
                        <motion.span
                          animate={
                            wished
                              ? { scale: [1, 1.35, 0.9, 1.1, 1] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 transition-colors",
                              wished
                                ? "fill-ember text-ember"
                                : "text-bone/70",
                            )}
                          />
                        </motion.span>
                      </button>

                      {/* quick view button (reveals on hover) */}
                      <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 ease-out-expo group-hover/card:translate-y-0 group-hover/card:opacity-100">
                        <button
                          onClick={() => setQuickView(p)}
                          data-cursor="cta"
                          data-cursor-label="View"
                          className="w-full rounded-full border border-white/15 bg-void/60 py-3 text-center font-mono text-[11px] uppercase tracking-widest text-bone backdrop-blur transition-colors hover:bg-voltage hover:text-void focus-ring"
                        >
                          Quick view
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-4 p-6">
                      <div>
                        <Badge tone={p.accent as Tone}>{p.tag}</Badge>
                        <h3 className="mt-3 font-display text-lg font-extrabold leading-tight">
                          {p.name}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right font-display text-lg font-extrabold text-voltage">
                        ${p.price}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Quick View modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close quick view"
              onClick={() => setQuickView(null)}
              className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="glass-strong relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl border border-line md:grid-cols-2"
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={quickView.image}
                  alt={quickView.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col p-8">
                <button
                  aria-label="Close"
                  onClick={() => setQuickView(null)}
                  className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line bg-void/40 text-ash transition-colors hover:text-bone focus-ring"
                >
                  <X className="h-4 w-4" />
                </button>

                <Badge tone={quickView.accent as Tone}>{quickView.tag}</Badge>
                <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">
                  {quickView.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ash">
                  Engineered in the AXIOM materials lab and stress-tested by our
                  coaching staff. Built to move with you and outlast the
                  programme.
                </p>

                <ul className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-widest text-faint">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-voltage" /> Member pricing
                    applied at checkout
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-voltage" /> Free returns
                    within 30 days
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-voltage" /> Carbon-neutral
                    shipping
                  </li>
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <div className="font-display text-3xl font-extrabold text-voltage">
                    ${quickView.price}
                  </div>
                  <button
                    onClick={() => addToCart(quickView)}
                    data-cursor="cta"
                    className="group/add inline-flex items-center gap-2 rounded-full bg-voltage px-7 py-3.5 text-sm font-medium text-void transition-colors hover:bg-white focus-ring"
                  >
                    <Plus className="h-4 w-4 transition-transform group-hover/add:rotate-90" />
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating cart pill */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-6 right-6 z-[125]"
          >
            <motion.div
              animate={bump ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="glass-strong flex items-center gap-4 rounded-full border border-line py-3 pl-5 pr-3"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 text-voltage" />
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={cartCount}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-ember font-mono text-[9px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="hidden text-right sm:block">
                <div className="font-mono text-[9px] uppercase tracking-widest text-faint">
                  Subtotal
                </div>
                <div className="font-display text-sm font-extrabold text-bone">
                  ${cartTotal}
                </div>
              </div>
              <button
                data-cursor="cta"
                className="rounded-full bg-voltage px-5 py-2 text-sm font-medium text-void transition-colors hover:bg-white focus-ring"
              >
                Checkout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

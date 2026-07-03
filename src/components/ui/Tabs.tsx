"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  className,
}: {
  tabs: { label: string; content: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 rounded-full border border-line bg-obsidian p-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            data-cursor
            className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus-ring"
          >
            {active === i && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-voltage"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className={cn("relative z-10", active === i ? "text-void" : "text-ash")}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-10">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {tabs[active].content}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-[color,background-color,box-shadow,border-color] duration-300 focus-ring disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-voltage text-void hover:bg-white hover:shadow-[0_0_34px_-6px_rgba(199,249,75,0.65)]",
        ghost:
          "border border-line bg-white/[0.02] text-bone hover:border-bone/40 hover:shadow-[0_0_28px_-10px_rgba(244,243,238,0.4)]",
        ember:
          "bg-ember text-white hover:bg-white hover:text-void hover:shadow-[0_0_34px_-6px_rgba(255,77,28,0.6)]",
        plain: "text-bone hover:text-voltage",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof button> & {
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

type AsLink = BaseProps & { href: string; onClick?: never };
type AsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button(props: AsLink | AsButton) {
  const { children, className, variant, size, arrow = false, magnetic = true } = props;

  const inner = (
    <span
      className={cn(button({ variant, size }), className)}
      data-cursor="cta"
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        )}
      </span>
      {/* sheen sweep */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
    </span>
  );

  const node =
    "href" in props && props.href ? (
      <Link href={props.href}>{inner}</Link>
    ) : (
      <button type={(props as AsButton).type ?? "button"} onClick={(props as AsButton).onClick}>
        {inner}
      </button>
    );

  return magnetic ? <Magnetic strength={0.3}>{node}</Magnetic> : node;
}

import { cn } from "@/lib/utils";

const styles = {
  voltage: "border-voltage/30 bg-voltage/10 text-voltage",
  ember: "border-ember/30 bg-ember/10 text-ember",
  plasma: "border-plasma/30 bg-plasma/10 text-plasma",
  gold: "border-gold/30 bg-gold/10 text-gold",
  neutral: "border-line bg-white/[0.03] text-ash",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest",
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

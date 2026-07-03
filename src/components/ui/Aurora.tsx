import { cn } from "@/lib/utils";

/**
 * Aurora background — layered radial gradients that drift slowly.
 * Used as an ambient wash behind dark sections. Purely decorative.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -left-[15%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-voltage/[0.09] blur-[120px] animate-aurora-drift" />
      <div
        className="absolute -right-[10%] top-[10%] h-[45vw] w-[45vw] rounded-full bg-plasma/[0.10] blur-[130px] animate-aurora-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[50vw] w-[50vw] rounded-full bg-ember/[0.07] blur-[140px] animate-aurora-drift"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}

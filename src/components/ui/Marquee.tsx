import { cn } from "@/lib/utils";

/**
 * Seamless CSS marquee. Duplicates its children once and translates -50%,
 * so the loop is perfectly continuous regardless of content width.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-8 pr-8 animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            // @ts-expect-error CSS var
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

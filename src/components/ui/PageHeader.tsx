import Link from "next/link";
import { SplitText } from "./SplitText";
import { Aurora } from "./Aurora";
import { cn } from "@/lib/utils";

/**
 * Standard page hero used by every inner route. Aurora wash, an eyebrow with a
 * breadcrumb, a split-text title (optional accent word), and lede copy.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  meta,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  meta?: { label: string; value: string }[];
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden pt-40 pb-16 lg:pt-48 lg:pb-20", className)}>
      <Aurora />
      <div className="container-x relative">
        <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
          <p className="eyebrow mb-6 flex items-center gap-2">
            <Link href="/" className="transition-colors hover:text-bone">
              AXIOM
            </Link>
            <span className="text-faint">/</span>
            <span className="text-voltage">{eyebrow}</span>
          </p>
          <SplitText
            text={title}
            as="h1"
            className="font-display text-display font-extrabold leading-[0.88] tracking-mega"
          />
          {accent && (
            <SplitText
              text={accent}
              as="p"
              className="font-display text-display font-extrabold leading-[0.88] tracking-mega"
              wordClassName="text-voltage-grad"
              delay={0.1}
            />
          )}
          {description && (
            <p
              className={cn(
                "mt-8 max-w-2xl text-lg leading-relaxed text-ash",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
        </div>

        {meta && (
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-obsidian p-6">
                <div className="font-display text-3xl font-extrabold text-bone">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

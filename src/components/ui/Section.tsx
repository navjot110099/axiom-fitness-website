import { cn } from "@/lib/utils";
import { SplitText } from "./SplitText";

/** Standard vertical-rhythm section wrapper. */
export function Section({
  children,
  className,
  id,
  container = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 lg:py-28", className)}>
      {container ? <div className="container-x">{children}</div> : children}
    </section>
  );
}

/** Standard section heading with index + eyebrow + animated title. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow mb-5">
        {index && <span className="text-voltage">{index} — </span>}
        {eyebrow}
      </p>
      <SplitText
        text={title}
        as="h2"
        className="font-display text-display-sm font-extrabold leading-[0.98]"
      />
      {description && (
        <p className="mt-6 text-lg leading-relaxed text-ash">{description}</p>
      )}
    </div>
  );
}

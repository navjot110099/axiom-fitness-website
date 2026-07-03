import { Check } from "lucide-react";
import { PLANS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export function Membership() {
  return (
    <section className="relative border-t border-line py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">/ 05 — Membership</p>
            <SplitText
              text="Choose your altitude."
              as="h2"
              className="font-display text-display-sm font-extrabold leading-[0.95]"
            />
          </div>
          <p className="max-w-sm text-ash">
            Every tier includes the full facility and the intelligence layer.
            The difference is how much of the team moves with you.
          </p>
        </div>

        <Reveal stagger className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <TiltCard
              key={plan.tier}
              max={6}
              className={cn(
                "flex h-full flex-col rounded-3xl border p-8",
                plan.featured
                  ? "border-voltage/40 bg-gradient-to-b from-voltage/[0.08] to-transparent"
                  : "border-line bg-obsidian",
              )}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-voltage px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-void">
                  Most chosen
                </span>
              )}
              <p className="font-mono text-xs uppercase tracking-eyebrow text-ash">
                {plan.tier}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                {plan.price !== null ? (
                  <>
                    <span className="font-display text-5xl font-extrabold tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-faint">{plan.cadence}</span>
                  </>
                ) : (
                  <span className="font-display text-4xl font-extrabold tracking-tight">
                    {plan.cadence}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ash">{plan.blurb}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.featured ? "text-voltage" : "text-ash",
                      )}
                    />
                    <span className="text-bone/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href="/membership"
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full"
                  magnetic={false}
                  arrow
                >
                  {plan.price !== null ? "Start trial" : "Request invitation"}
                </Button>
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

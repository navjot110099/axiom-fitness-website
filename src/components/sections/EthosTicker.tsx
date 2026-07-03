import { Marquee } from "@/components/ui/Marquee";

const WORDS = [
  "STRENGTH",
  "HIIT",
  "YOGA",
  "BOXING",
  "MMA",
  "SWIM",
  "PILATES",
  "CROSSFIT",
  "RECOVERY",
  "ICE BATH",
  "SAUNA",
  "NUTRITION",
];

export function EthosTicker() {
  return (
    <div className="relative z-10 border-y border-line bg-obsidian/60 py-5 backdrop-blur-sm">
      <Marquee duration={32}>
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-ash">
              {w}
            </span>
            <span className="h-1 w-1 rounded-full bg-voltage" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

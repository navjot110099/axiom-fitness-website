/**
 * Bespoke article bodies for the AXIOM Journal, keyed by post slug.
 * Each block is either a paragraph or a pull-quote. All original copy.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string };

const BODIES: Record<string, ArticleBlock[]> = {
  "recovery-is-training": [
    {
      type: "p",
      text: "There is a stubborn myth that progress is made in the gym. It is not. The session is only the stimulus — the demolition order. The building happens afterward, quietly, in the hours you are not training at all: while you sleep, while you eat, while you sit still and let your nervous system recalibrate. Treat recovery as an afterthought and you spend your life renovating a house you keep knocking down.",
    },
    {
      type: "p",
      text: "Adaptation follows a curve every coach should have tattooed somewhere useful. You train, performance dips, and then — given the right conditions — it rebounds past where it started. That overshoot is supercompensation, and its window is finite. Return too soon and you train on the dip. Return too late and the gain quietly bleeds away. The art is not working harder; it is landing the next stimulus on the crest of the last one's rebound.",
    },
    {
      type: "quote",
      text: "You do not get fitter from the workout. You get fitter from recovering from the workout. The distinction is not pedantic — it is the whole game.",
    },
    {
      type: "p",
      text: "This is why we program rest with the same precision we program load. At AXIOM every session is scored, and every score feeds a readiness model that watches heart-rate variability, sleep debt, and accumulated mechanical load. When the model says back off, backing off is not weakness — it is the plan working exactly as designed. The discipline of doing less on the right day is rarer, and harder, than the discipline of grinding.",
    },
    {
      type: "p",
      text: "Practically, deliberate recovery has a hierarchy. Sleep sits at the top and nothing you buy replaces it. Below that: protein timing, hydration, and genuine downregulation — a walk, a sauna, ten slow breaths — not merely the absence of training. Cold plunges and compression boots are real, but they are the last five percent, and chasing the last five percent while ignoring the first ninety is how ambitious people stall for years.",
    },
    {
      type: "p",
      text: "So build your week like a composer, not a machine. Hard days earn easy days. Peaks require valleys. The athletes who last are not the ones who never rest — they are the ones who learned to rest on purpose, and who understood, early, that recovery was never the pause between the training. It was the training.",
    },
  ],
  "hrv-explained": [
    {
      type: "p",
      text: "Heart-rate variability is the most useful number most people are reading completely wrong. It is not, despite the marketing, a scoreboard. A high HRV is not a trophy and a low one is not a failure. It is a signal — a noisy, deeply personal signal about the balance between the two halves of your autonomic nervous system, and it means almost nothing until you know what your own normal looks like.",
    },
    {
      type: "p",
      text: "The physiology is elegant. Your heart does not beat like a metronome; the gap between beats flexes constantly as your parasympathetic and sympathetic systems negotiate. More variability generally means your body feels safe enough to let the parasympathetic brake do its work. Less variability often means stress is winning — training stress, life stress, a virus you have not noticed yet. The number is the argument between rest and readiness, rendered in milliseconds.",
    },
    {
      type: "quote",
      text: "Your HRV is not a comparison with anyone else. It is a conversation with yourself, and the only meaningful trend is your own baseline over time.",
    },
    {
      type: "p",
      text: "This is where most apps do harm. They show you a red screen because you scored below some population average, and you spend the day anxious — which, ironically, lowers your HRV further. Ignore the absolute figure. Watch the rolling trend against your personal baseline. A single low morning is noise. Three low mornings in a row, trending down, while your sleep and mood also sag — that is a message worth acting on.",
    },
    {
      type: "p",
      text: "Measure it the same way every time or do not bother. First thing on waking, lying still, before caffeine, before your phone, before the day's cortisol arrives. Consistency of measurement matters more than the device you use. A cheap chest strap read correctly beats an expensive ring read carelessly, every single morning.",
    },
    {
      type: "p",
      text: "Used well, HRV becomes a quiet coach. It will not tell you what to do, but it will tell you when your ambition and your physiology have drifted apart — and give you a few days' warning before your body finds a louder way to say the same thing.",
    },
  ],
  "progressive-overload": [
    {
      type: "p",
      text: "Progressive overload is the oldest true idea in strength training and also the vaguest. Do a little more over time. Fine — but more of what, measured how, and how much more before it stops being progress and starts being injury? For a century the honest answer was feel, intuition, and a training log written in pencil. Force plates changed that. They turned a slogan into a dial.",
    },
    {
      type: "p",
      text: "Stand on an instrumented platform and every rep becomes a data point: peak force, rate of force development, the symmetry between your left and right sides, the velocity of the bar as it leaves the bottom. Suddenly overload is not just weight on the bar. It is the shape of the effort. Two lifters can move the same load while one is grinding at the edge of failure and the other is barely taxed — the plate sees the difference the eye cannot.",
    },
    {
      type: "quote",
      text: "Weight on the bar is the input. Force, velocity and symmetry are the outputs. Overload the outputs, and the inputs take care of themselves.",
    },
    {
      type: "p",
      text: "The most useful signal is bar velocity. For a given load, the speed you can move it is a remarkably honest readout of your readiness that day. When your usual working weight moves slower than its baseline, you are more fatigued than you feel, and pushing for a personal record is a gamble against the odds. When it moves faster, the tank is full — take the extra set, add the extra plate. This is autoregulation, and it lets the session adapt to the athlete instead of the other way around.",
    },
    {
      type: "p",
      text: "Symmetry is the quiet guardian. Nagging imbalances between limbs are how strong people get hurt, and they hide easily under a barbell that only reports a single number. Watch the split, correct it early with targeted work, and you buy yourself years of uninterrupted training — which, over a career, dwarfs any single program.",
    },
    {
      type: "p",
      text: "None of this replaces the fundamentals. Sleep, protein, patience, and showing up still do the heavy lifting. But when the principle finally has instruments behind it, progressive overload stops being a hope you check months later and becomes a decision you make, correctly, rep by rep.",
    },
  ],
  "cold-exposure": [
    {
      type: "p",
      text: "Few recovery tools have travelled from the fringe to the mainstream as fast as the ice bath. A decade ago it was the preserve of elite athletes and eccentric Dutchmen. Now there is a plunge tub in every third garage. Some of the enthusiasm is earned. A good deal of it is folklore wearing the costume of physiology, and it is worth separating the two before you commit to being cold on purpose.",
    },
    {
      type: "p",
      text: "Start with what is real. Cold water is a genuine, potent stressor. It spikes noradrenaline, blunts the perception of pain and fatigue, and reliably lifts mood and alertness for hours afterward. As a tool for feeling switched-on, resilient, and mentally sharp, cold exposure delivers — the acute effects are among the best-documented in the field.",
    },
    {
      type: "quote",
      text: "Cold is a superb intervention for how you feel and a surprisingly blunt one for how you adapt. Confuse the two and you can sabotage the very gains you trained for.",
    },
    {
      type: "p",
      text: "Here is the inconvenient part. Plunging immediately after a hard strength or hypertrophy session can dampen the inflammatory signaling that drives muscle adaptation. The very response you are trying to quiet is, in that context, the messenger telling your body to grow. If you have just trained for size or strength, put a few hours — ideally the rest of the day — between the barbell and the bath.",
    },
    {
      type: "p",
      text: "Dose and timing carry the whole thing. You do not need to suffer; the evidence clusters around brief exposures in genuinely cold water, a few times a week, not marathon sessions of endurance masochism. And you do not need it every day. Use it on rest days, after conditioning rather than heavy lifting, or simply on mornings when you want the mood and focus it reliably provides.",
    },
    {
      type: "p",
      text: "Treated as a precise tool rather than a daily ritual of proving something, cold exposure earns its place. Treated as a cure-all applied at the worst possible moment, it becomes an expensive way to feel hard while quietly working against yourself.",
    },
  ],
  "fuelling-endurance": [
    {
      type: "p",
      text: "The long effort is where nutrition stops being a background variable and becomes the whole plot. You can have the engine, the training history, and the willpower, and still fall apart at the eightieth minute because you ran out of the one thing your working muscles could not manufacture fast enough. Endurance is, to an uncomfortable degree, a fuel-management problem wearing a fitness costume.",
    },
    {
      type: "p",
      text: "Carbohydrate is the currency. Fat is the deep reserve — vast, patient, and slow to spend — but the hard efforts, the surges, the final climb all draw on glycogen, and glycogen is finite. The skill of endurance fuelling is not eating as much as possible; it is placing carbohydrate exactly where the effort demands it and getting out of its way when it does not.",
    },
    {
      type: "quote",
      text: "You do not train your fitness in isolation. You train your fuelling alongside it — and on race day, an untrained gut fails just as surely as untrained legs.",
    },
    {
      type: "p",
      text: "This is the case for periodising carbohydrate rather than eating the same way every day. Fuel the hard sessions generously — they are the ones that demand it and the ones where under-fuelling degrades quality. Pull carbohydrate back on easy days and let the body practice tapping its fat reserves, which builds metabolic flexibility. The goal is an engine that runs efficiently on fat when it can and reaches confidently for sugar when it must.",
    },
    {
      type: "p",
      text: "And train the gut like any other organ. The ability to absorb carbohydrate mid-effort is a trainable skill, and the athlete who has practiced eating at pace can take on far more fuel without distress than one who tries it for the first time on race morning. Rehearse your race-day intake in training, precisely, until it is boringly familiar.",
    },
    {
      type: "p",
      text: "Do this well and the long effort transforms. The wall stops being an inevitability and becomes an avoidable planning error. You finish the way you started — not because you were tougher, but because you were, quietly and deliberately, better fuelled.",
    },
  ],
  "sleep-architecture": [
    {
      type: "p",
      text: "Ask an athlete for their most powerful recovery tool and they will usually reach for something you can buy. The truth is duller and more demanding: it is sleep, and specifically the architecture of that sleep — the ordered procession of stages your brain and body move through each night, each doing repair work the others cannot.",
    },
    {
      type: "p",
      text: "Deep sleep, the slow-wave phase early in the night, is when the body does its heaviest structural work. Growth hormone pulses, tissue repairs, and the physical debt of training gets paid down. Later, REM sleep does the cognitive filing — consolidating motor skills, regulating mood, cementing the very movement patterns you drilled that day. Miss either and you wake up having been horizontal for eight hours without having actually recovered.",
    },
    {
      type: "quote",
      text: "Time in bed is not sleep, and sleep is not recovery. What matters is how much of the night your body spent in the stages that rebuild you.",
    },
    {
      type: "p",
      text: "The habits that protect that architecture are almost insultingly unglamorous. A consistent sleep and wake time, held even on weekends, does more than any supplement. A cool, genuinely dark room. A hard boundary between the last screen and the pillow. Caffeine cut off by early afternoon, because it lingers far longer than its felt effect. None of this is a secret. All of it is quietly, relentlessly effective.",
    },
    {
      type: "p",
      text: "Alcohol deserves a specific warning, because it is the great impostor of sleep. It knocks you out and then wrecks the second half of the night, gutting REM and fragmenting the very stages you needed. A nightcap does not help you sleep; it helps you lose consciousness while your recovery quietly falls apart.",
    },
    {
      type: "p",
      text: "So before you optimise anything exotic, optimise the eight hours you were going to spend unconscious anyway. It is free, it is available every single night, and no other intervention in sport comes close to its return. The boring habits move the needle most — that is not a disclaimer, it is the entire finding.",
    },
  ],
};

/** Fallback body derived from a post's own title + excerpt (never lorem). */
export function bodyFor(slug: string): ArticleBlock[] {
  return BODIES[slug] ?? [];
}

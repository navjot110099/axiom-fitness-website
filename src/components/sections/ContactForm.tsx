"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, RotateCcw } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Field";

const INTERESTS = ["Membership", "Private tour", "Corporate", "Press"] as const;

const schema = z.object({
  name: z.string().min(2, "Tell us who you are"),
  email: z.string().min(1, "We need a way to reach you").email("That email doesn't look right"),
  interest: z.enum(INTERESTS, { errorMap: () => ({ message: "Pick a reason" }) }),
  message: z.string().min(12, "A little more context, please").max(1000, "That's a touch long"),
});

type FormValues = z.infer<typeof schema>;

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return { x: Math.cos(angle) * (60 + (i % 3) * 22), y: Math.sin(angle) * (60 + (i % 3) * 22), d: i };
});

export function ContactForm() {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", interest: "Private tour", message: "" },
  });

  async function onSubmit() {
    // No backend — simulate a network round-trip.
    await new Promise((r) => setTimeout(r, 1600));
    setDone(true);
  }

  function again() {
    setDone(false);
    reset();
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              {SPARKS.map((s) => (
                <motion.span
                  key={s.d}
                  className="absolute h-1.5 w-1.5 rounded-full bg-voltage"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], x: s.x, y: s.y, scale: [0, 1.2, 0] }}
                  transition={{ duration: 0.9, delay: 0.25 + s.d * 0.02, ease: "easeOut" }}
                />
              ))}
              <motion.svg
                viewBox="0 0 80 80"
                className="h-24 w-24"
                initial={{ rotate: -8 }}
                animate={{ rotate: 0 }}
              >
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#C7F94B"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <motion.path
                  d="M25 41 L36 52 L57 29"
                  fill="none"
                  stroke="#C7F94B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
                />
              </motion.svg>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 font-display text-3xl font-extrabold"
            >
              Received. We&apos;re on it.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82 }}
              className="mt-3 max-w-sm text-ash"
            >
              A member of the AXIOM concierge team will reply within one business day —
              often sooner. Check your inbox for a confirmation.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              type="button"
              onClick={again}
              data-cursor="cta"
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ash transition-colors hover:border-bone/40 hover:text-bone"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Send another
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <FocusField invalid={!!errors.name && !!touchedFields.name}>
                <Input
                  label="Full name"
                  placeholder="Alex Rivera"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </FocusField>
              <FocusField invalid={!!errors.email && !!touchedFields.email}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@domain.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </FocusField>
            </div>

            <FocusField invalid={!!errors.interest}>
              <Select
                label="What brings you in"
                options={[...INTERESTS]}
                error={errors.interest?.message}
                {...register("interest")}
              />
            </FocusField>

            <FocusField invalid={!!errors.message && !!touchedFields.message}>
              <Textarea
                label="Message"
                hint="What are you hoping to achieve?"
                placeholder="I'd love to book a private tour of the strength floor and recovery suite…"
                error={errors.message?.message}
                {...register("message")}
              />
            </FocusField>

            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor="cta"
              className="focus-ring group/submit relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-voltage font-medium text-void transition-colors hover:bg-white disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-void/30 border-t-void"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/submit:translate-x-full" />
            </button>

            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-faint">
              Encrypted · No spam · Reply within one business day
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Wraps a field so the whole control lifts + underlines on focus. */
function FocusField({ children, invalid }: { children: React.ReactNode; invalid: boolean }) {
  return (
    <motion.div
      whileFocus={{}}
      className="group/field relative"
      data-invalid={invalid}
    >
      <motion.div
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-2xl bg-voltage/[0.04] opacity-0 transition-opacity duration-300 group-focus-within/field:opacity-100"
        aria-hidden
      />
      <div className="relative transition-transform duration-300 group-focus-within/field:translate-x-0.5">
        {children}
      </div>
    </motion.div>
  );
}

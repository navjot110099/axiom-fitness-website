"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-bone placeholder:text-faint transition-colors focus:border-voltage/60 focus:outline-none focus:ring-1 focus:ring-voltage/40";

type FieldWrap = { label: string; error?: string; className?: string; hint?: string };

function Label({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className="mb-2 flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ash">{label}</span>
      {hint && <span className="text-[10px] text-faint">{hint}</span>}
    </span>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & FieldWrap
>(function Input({ label, error, className, hint, ...props }, ref) {
  return (
    <label className={cn("block", className)}>
      <Label label={label} hint={hint} />
      <input ref={ref} className={cn(base, error && "border-ember/60")} {...props} />
      {error && <span className="mt-1.5 block text-xs text-ember">{error}</span>}
    </label>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrap
>(function Textarea({ label, error, className, hint, ...props }, ref) {
  return (
    <label className={cn("block", className)}>
      <Label label={label} hint={hint} />
      <textarea ref={ref} className={cn(base, "min-h-32 resize-y", error && "border-ember/60")} {...props} />
      {error && <span className="mt-1.5 block text-xs text-ember">{error}</span>}
    </label>
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & FieldWrap & { options: string[] }
>(function Select({ label, error, className, hint, options, ...props }, ref) {
  return (
    <label className={cn("block", className)}>
      <Label label={label} hint={hint} />
      <select ref={ref} className={cn(base, "appearance-none", error && "border-ember/60")} {...props}>
        {options.map((o) => (
          <option key={o} value={o} className="bg-obsidian">
            {o}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block text-xs text-ember">{error}</span>}
    </label>
  );
});

"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  className
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  const decDisabled = value <= min;
  const incDisabled = typeof max === "number" ? value >= max : false;

  return (
    <div
      className={cn(
        "flex h-12 items-center rounded-[var(--radius-pill)] border border-[var(--line)] bg-white/90 px-1 shadow-[var(--shadow-soft)]",
        className
      )}
    >
      <button
        aria-label="Reduire la quantite"
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] disabled:opacity-35"
        disabled={decDisabled}
        onClick={() => onChange(Math.max(min, value - 1))}
        type="button"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-9 text-center text-sm font-semibold">{value}</span>
      <button
        aria-label="Augmenter la quantite"
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] disabled:opacity-35"
        disabled={incDisabled}
        onClick={() => onChange(typeof max === "number" ? Math.min(max, value + 1) : value + 1)}
        type="button"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

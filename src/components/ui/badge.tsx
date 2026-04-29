import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-8 items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
  {
    variants: {
      variant: {
        accent: "bg-[rgba(255,95,162,0.14)] text-[var(--accent-strong)]",
        lavender: "bg-[rgba(216,201,255,0.32)] text-[#6e53b9]",
        mint: "bg-[rgba(215,244,234,0.8)] text-[#2c7a5c]",
        peach: "bg-[rgba(255,216,202,0.82)] text-[#bb6a4e]",
        neutral: "bg-white/78 text-[var(--muted)]"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("surface-panel overflow-hidden", {
  variants: {
    variant: {
      product:
        "rounded-[var(--radius-xl)] border-white/60 bg-white/86 shadow-[var(--shadow-glow)]",
      soft: "rounded-[var(--radius-lg)] bg-[var(--surface-soft)] shadow-[var(--shadow-soft)]",
      panel: "rounded-[var(--radius-lg)] bg-white/90 shadow-[var(--shadow-soft)]",
      floating:
        "rounded-[var(--radius-xl)] border-white bg-white/94 shadow-[var(--shadow-raised)]"
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-5 md:p-6",
      lg: "p-6 md:p-8"
    }
  },
  defaultVariants: {
    variant: "panel",
    padding: "md"
  }
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export function Card({
  className,
  variant,
  padding,
  asChild = false,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(cardVariants({ variant, padding, className }))} {...props} />;
}

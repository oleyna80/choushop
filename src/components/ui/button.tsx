import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold shadow-[var(--shadow-soft)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-soft)] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 data-[pressed=true]:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "rounded-[var(--radius-pill)] bg-[var(--accent)] px-5 text-white hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]",
        secondary:
          "rounded-[var(--radius-pill)] border border-[var(--line)] bg-white/88 px-5 text-[var(--foreground)] shadow-none hover:-translate-y-0.5 hover:border-white hover:bg-white",
        ghost:
          "rounded-[var(--radius-pill)] bg-transparent px-3 text-[var(--foreground)] shadow-none hover:bg-white/70"
      },
      size: {
        sm: "min-h-10 text-sm",
        md: "min-h-12 text-sm",
        lg: "min-h-14 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };

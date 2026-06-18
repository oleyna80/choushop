import * as React from "react";

import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "focus-ring h-5 w-5 rounded-md border border-[var(--border-soft)] text-[var(--primary)] accent-[var(--primary)]",
      className
    )}
    type={type ?? "checkbox"}
    {...props}
  />
));

Checkbox.displayName = "Checkbox";

import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "focus-ring h-12 w-full appearance-none rounded-[var(--radius-md)] border border-[var(--line)] bg-white/90 px-4 text-sm text-[var(--foreground)] shadow-[var(--shadow-soft)] outline-none",
      className
    )}
    {...props}
  />
));

Select.displayName = "Select";

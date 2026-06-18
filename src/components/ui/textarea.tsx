import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "focus-ring min-h-32 w-full resize-y rounded-[var(--radius-md)] border border-[var(--line)] bg-white/90 px-4 py-3 text-sm text-[var(--foreground)] shadow-[var(--shadow-soft)] outline-none placeholder:text-[color:rgba(118,106,124,0.75)]",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

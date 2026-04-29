import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-12 w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-white/90 px-4 text-sm text-[var(--foreground)] shadow-[var(--shadow-soft)] outline-none placeholder:text-[color:rgba(123,112,141,0.75)]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

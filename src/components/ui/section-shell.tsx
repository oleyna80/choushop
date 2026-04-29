import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
  containerClassName,
  density = "default",
  as = "section"
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  density?: "default" | "tight";
  as?: "section" | "div";
}) {
  const Comp = as;

  return (
    <Comp className={cn("section-shell", className)} data-density={density}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </Comp>
  );
}

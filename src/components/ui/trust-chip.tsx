import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function TrustChip({
  icon,
  title,
  detail,
  className
}: {
  icon?: ReactNode;
  title: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-panel flex min-h-16 items-center gap-3 rounded-[var(--radius-pill)] px-4 py-3",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--accent-strong)]">
        {icon}
      </div>
      <div className="grid gap-0.5">
        <span className="text-sm font-semibold text-[var(--foreground)]">{title}</span>
        {detail ? (
          <span className="text-xs leading-5 text-[var(--muted)]">{detail}</span>
        ) : null}
      </div>
    </div>
  );
}

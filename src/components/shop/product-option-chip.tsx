import { cn } from "@/lib/utils";

export function ProductOptionChip({
  label,
  value,
  active = false,
  dotClassName,
  className
}: {
  label: string;
  value?: string;
  active?: boolean;
  dotClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-[var(--radius-pill)] border px-4 py-2.5",
        active
          ? "border-white bg-white/94 shadow-[var(--shadow-soft)]"
          : "border-[var(--line)] bg-white/65",
        className
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--line)]",
          dotClassName
        )}
      />
      <div className="grid gap-0.5">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          {label}
        </span>
        {value ? (
          <span className="text-sm font-semibold text-[var(--foreground)]">
            {value}
          </span>
        ) : null}
      </div>
    </div>
  );
}

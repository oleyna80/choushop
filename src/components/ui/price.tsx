import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  currency = "EUR",
  className
}: {
  amount: number;
  compareAt?: number;
  currency?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      <span className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
        {formatMoney(amount, currency)}
      </span>
      {compareAt ? (
        <span className="pb-1 text-sm font-medium text-[var(--muted)] line-through">
          {formatMoney(compareAt, currency)}
        </span>
      ) : null}
    </div>
  );
}

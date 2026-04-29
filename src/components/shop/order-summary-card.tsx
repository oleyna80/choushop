import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CartResolvedLine } from "@/features/cart/cart-types";
import { formatMoney } from "@/lib/money";

type SummaryAction =
  | {
      href: string;
      label: string;
      disabled?: boolean;
    }
  | {
      onClick: () => void;
      label: string;
      disabled?: boolean;
    };

export function OrderSummaryCard({
  title = "Résumé",
  eyebrow,
  lines,
  subtotal,
  shippingAmount,
  shippingLabel = "Livraison",
  totalAmount,
  note,
  action,
  footer
}: {
  title?: string;
  eyebrow?: string;
  lines: CartResolvedLine[];
  subtotal: number;
  shippingAmount?: number | null;
  shippingLabel?: string;
  totalAmount?: number;
  note?: string;
  action?: SummaryAction;
  footer?: ReactNode;
}) {
  const resolvedTotal = totalAmount ?? subtotal + (shippingAmount ?? 0);

  return (
    <Card className="grid gap-6" padding="lg" variant="floating">
      <div className="grid gap-2">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <div className="grid gap-1">
          <h2 className="text-[length:var(--text-h3)]">{title}</h2>
          <p className="text-sm leading-6 text-[var(--muted)]">
            {lines.length} {lines.length > 1 ? "lignes" : "ligne"} dans ta commande
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {lines.map((line) => (
          <div
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm"
            key={line.product.id}
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-[var(--foreground)]">
                {line.product.title}
              </p>
              <p className="text-[var(--muted)]">
                {line.quantity} x {formatMoney(line.product.price, line.product.currency)}
              </p>
            </div>
            <p className="font-semibold text-[var(--foreground)]">
              {formatMoney(line.totalPrice, line.product.currency)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 border-t border-[rgba(239,221,234,0.9)] pt-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[var(--muted)]">Sous-total TTC</span>
          <span className="font-semibold text-[var(--foreground)]">
            {formatMoney(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[var(--muted)]">{shippingLabel}</span>
          <span className="font-semibold text-[var(--foreground)]">
            {typeof shippingAmount === "number" ? formatMoney(shippingAmount) : "Calculée à l'étape suivante"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[rgba(239,221,234,0.9)] pt-3">
          <span className="text-base font-semibold text-[var(--foreground)]">Total TTC</span>
          <span className="font-[var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
            {formatMoney(resolvedTotal)}
          </span>
        </div>
      </div>

      {note ? <p className="text-sm leading-6 text-[var(--muted)]">{note}</p> : null}

      {action ? (
        "href" in action ? (
          action.disabled ? (
            <Button className="w-full" disabled size="lg" type="button">
              {action.label}
            </Button>
          ) : (
            <Button asChild className="w-full" size="lg">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          )
        ) : (
          <Button
            className="w-full"
            disabled={action.disabled}
            onClick={action.onClick}
            size="lg"
            type="button"
          >
            {action.label}
          </Button>
        )
      ) : null}

      {footer}
    </Card>
  );
}

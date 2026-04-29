"use client";

import Image from "next/image";
import Link from "next/link";

import { IconBadge } from "@/components/ui/icon-badge";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import type { CartResolvedLine } from "@/features/cart/cart-types";
import { formatMoney } from "@/lib/money";

export function CartLineItem({
  line,
  onQuantityChange,
  onRemove
}: {
  line: CartResolvedLine;
  onQuantityChange: (nextQuantity: number) => void;
  onRemove: () => void;
}) {
  const soldOut = line.product.stock <= 0;

  return (
    <article className="surface-panel grid gap-5 rounded-[var(--radius-xl)] border border-white/70 p-4 sm:p-5 lg:grid-cols-[132px_minmax(0,1fr)] lg:gap-6">
      <Link
        className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-white/70"
        href={`/product/${line.product.slug}`}
      >
        <Image
          alt={line.product.title}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 132px, (min-width: 640px) 35vw, 100vw"
          src={line.product.imageUrl}
        />
      </Link>

      <div className="grid gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="grid max-w-2xl gap-3">
            <div className="flex flex-wrap gap-2">
              <IconBadge variant={line.product.accentTone}>{line.product.badge}</IconBadge>
              <IconBadge variant="neutral">{line.product.theme}</IconBadge>
            </div>

            <div className="grid gap-2">
              <Link
                className="font-[var(--font-display)] text-[length:var(--text-h3)] text-[var(--foreground)]"
                href={`/product/${line.product.slug}`}
              >
                {line.product.title}
              </Link>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
                {line.product.shortDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-left sm:text-right">
            <Price
              amount={line.totalPrice}
              className="justify-start sm:justify-end"
              compareAt={
                line.product.compareAtPrice
                  ? line.product.compareAtPrice * line.quantity
                  : undefined
              }
              currency={line.product.currency}
            />
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
              {formatMoney(line.product.price, line.product.currency)} l&apos;unite
            </p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[rgba(239,221,234,0.9)] pt-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
          <div className="grid gap-1 text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">
              {soldOut ? "Rupture de stock" : `${line.product.stock} exemplaires disponibles`}
            </span>
            <span>{line.product.tagline}</span>
          </div>

          <QuantityStepper
            max={Math.max(line.product.stock, 1)}
            onChange={onQuantityChange}
            value={line.quantity}
          />

          <button
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--line)] px-4 text-sm font-semibold text-[var(--foreground)] hover:border-white hover:bg-white/80"
            onClick={onRemove}
            type="button"
          >
            Retirer
          </button>
        </div>
      </div>
    </article>
  );
}

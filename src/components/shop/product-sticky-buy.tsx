import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ProductOptionChip } from "@/components/shop/product-option-chip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Price } from "@/components/ui/price";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";
import {
  getAccentClassName,
  getProductBadgeLabel,
  getProductTypeLabel,
  getReviewLabel,
  getSavingsAmount,
  getStockLabel
} from "@/features/product/product-detail";
import { formatMoney } from "@/lib/money";

export function ProductStickyBuy({
  product
}: {
  product: StorefrontProduct;
}) {
  const soldOut = product.stock <= 0;
  const accent = getAccentClassName(product.accentTone);
  const savings = getSavingsAmount(product);

  return (
    <>
      <Card
        className="rounded-[calc(var(--radius-xl)+0.25rem)] lg:sticky lg:top-24"
        padding="lg"
        variant="floating"
      >
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={accent.badgeVariant}>{getProductBadgeLabel(product.badge)}</Badge>
            <Badge variant="neutral">{getProductTypeLabel(product)}</Badge>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
              {product.theme}
            </p>
            <div className="grid gap-2">
              <h1 className="text-[length:var(--text-h2)]">{product.title}</h1>
              <p className="text-pretty text-base leading-7 text-[var(--muted)]">
                {product.shortDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Price
              amount={product.price}
              className="items-end"
              compareAt={product.compareAtPrice}
              currency={product.currency}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
              <span>{getReviewLabel(product)}</span>
              <span>Prix TTC</span>
              {savings > 0 ? <span>Economisez {formatMoney(savings, product.currency)}</span> : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProductOptionChip
              active={!soldOut}
              dotClassName={soldOut ? "bg-[var(--warning)]" : accent.dotClassName}
              label="Disponibilite"
              value={soldOut ? "Rupture temporaire" : getStockLabel(product.stock)}
            />
            <ProductOptionChip
              dotClassName={accent.dotClassName}
              label="Style"
              value={product.tagline}
            />
            <ProductOptionChip
              dotClassName={accent.dotClassName}
              label="Theme"
              value={product.theme}
            />
            <ProductOptionChip
              dotClassName={accent.dotClassName}
              label="Selection"
              value="Contenu surprise, ambiance annoncee"
            />
          </div>

          <div className="grid gap-3">
            <AddToCartButton
              className="min-h-14"
              disabled={soldOut}
              label={soldOut ? "Rupture temporaire" : "Ajouter cette box"}
              productId={product.id}
            />
            <p className="text-sm leading-6 text-[var(--muted)]">
              Livraison calculee au checkout. Paiement securise via Stripe Checkout.
            </p>
          </div>
        </div>
      </Card>

      <div className="surface-panel fixed inset-x-3 bottom-3 z-30 rounded-[var(--radius-xl)] p-3 shadow-[var(--shadow-raised)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[var(--foreground)]">
              {product.title}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Price amount={product.price} compareAt={product.compareAtPrice} currency={product.currency} />
            </div>
          </div>
          <AddToCartButton
            className="w-auto min-w-[11rem] px-5"
            disabled={soldOut}
            label={soldOut ? "Epuise" : "Ajouter"}
            productId={product.id}
          />
        </div>
      </div>
    </>
  );
}

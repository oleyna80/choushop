import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { Price } from "@/components/ui/price";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";

const badgeLabelMap: Record<StorefrontProduct["badge"], string> = {
  "best-seller": "Best-seller",
  "edition-limitee": "Edition limitee",
  populaire: "Populaire",
  nouveaute: "Nouveaute"
};

const badgeVariantMap: Record<
  StorefrontProduct["accentTone"],
  "accent" | "lavender" | "mint" | "peach"
> = {
  accent: "accent",
  lavender: "lavender",
  mint: "mint",
  peach: "peach"
};

export function ProductCard({ product }: { product: StorefrontProduct }) {
  const soldOut = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 6;
  const previewItems = product.includedPreview.slice(0, 2);

  return (
    <Card
      asChild
      className="group h-full border-white/70"
      padding="none"
      variant="product"
    >
      <article>
        <Link
          className="relative block aspect-[0.8] overflow-hidden rounded-[var(--radius-xl)] bg-white/80"
          href={`/product/${product.slug}`}
        >
          <Image
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            src={product.imageUrl}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <Badge variant={badgeVariantMap[product.accentTone]}>
              {badgeLabelMap[product.badge]}
            </Badge>
            {product.featured ? <Badge variant="neutral">Coup de coeur</Badge> : null}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(47,36,65,0.7)] via-[rgba(47,36,65,0.18)] to-transparent p-3 pt-10 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/78">
              {product.theme}
            </p>
            <p className="mt-1 text-sm text-white/88">{product.tagline}</p>
          </div>
        </Link>

        <div className="grid gap-4 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <IconBadge className="bg-white/70" icon="*" variant="neutral">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </IconBadge>
            <span className="font-medium uppercase tracking-[0.08em]">
              {soldOut
                ? "Epuise"
                : lowStock
                  ? `Plus que ${product.stock}`
                  : `${product.stock} en stock`}
            </span>
          </div>

          <div className="grid gap-2">
            <Link
              className="text-[length:clamp(1.15rem,2vw,1.45rem)] font-bold tracking-[-0.04em] text-[var(--foreground)]"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>
            <p className="text-sm leading-6 text-[var(--muted)]">
              {product.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {previewItems.map((item) => (
              <Badge key={item.label} variant="neutral">
                {item.label}
              </Badge>
            ))}
          </div>

          <div className="mt-auto grid gap-3">
            <div className="flex items-end justify-between gap-3">
              <Price
                amount={product.price}
                className="items-end"
                compareAt={product.compareAtPrice}
                currency={product.currency}
              />
              <span className="pb-1 text-right text-xs leading-5 text-[var(--muted)]">
                Prix TTC
              </span>
            </div>
            <AddToCartButton
              className="min-h-11"
              disabled={soldOut}
              label={soldOut ? "Bientot de retour" : "Ajouter au panier"}
              productId={product.id}
            />
          </div>
        </div>
      </article>
    </Card>
  );
}

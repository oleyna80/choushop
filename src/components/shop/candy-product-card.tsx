import Link from "next/link";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { MysteryBoxVisual } from "@/components/shop/mystery-box-visual";
import { Badge } from "@/components/ui/badge";
import type { CandyProduct } from "@/features/candy-cloud/products";
import { formatCandyPrice } from "@/features/candy-cloud/products";

export function CandyProductCard({ product }: { product: CandyProduct }) {
  return (
    <article className="group grid h-full gap-5 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]">
      <div className="block">
        <MysteryBoxVisual tone={product.accentTone} />
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={product.accentTone}>{product.badge}</Badge>
          {product.isBestSeller ? <Badge variant="neutral">Coup de coeur</Badge> : null}
        </div>
        <div className="grid gap-2">
          <Link
            className="font-[var(--font-display)] text-2xl font-bold leading-tight text-[var(--text-main)]"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="text-sm leading-6 text-[var(--text-muted)]">
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-auto grid gap-3">
        <p className="text-2xl font-black text-[var(--text-main)]">
          {formatCandyPrice(product.price)}
        </p>
        <AddToCartButton
          label="Ajouter au panier"
          productId={product.id}
          styleChoice={product.styles[0]}
        />
      </div>
    </article>
  );
}

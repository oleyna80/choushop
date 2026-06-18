import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import type { CandyProduct } from "@/features/candy-cloud/products";
import { formatCandyPrice } from "@/features/candy-cloud/products";

export function CandyProductCard({ product }: { product: CandyProduct }) {
  const reviewMap: Record<string, number> = {
    "mini-mystery-box": 176,
    "classic-mystery-box": 248,
    "premium-mystery-box": 143,
    "jewelry-surprise-box": 126,
    "cute-accessories-box": 98
  };

  return (
    <article className="group grid h-full gap-5 rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-white p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]">
      <div className="relative aspect-[1.35] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--background-soft)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={product.accentTone}>{product.badge}</Badge>
          {product.isBestSeller ? <Badge variant="neutral">Coup de coeur</Badge> : null}
        </div>
        <div className="grid gap-2">
          <Link
            className="font-[var(--font-display)] text-2xl font-extrabold leading-tight text-[#684fd6] hover:text-[#ff7aae] transition-colors"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="text-sm leading-6 text-[#a788fa]">
            {product.shortDescription}
          </p>

          {/* Rating stars */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex text-[#ffd6a5]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[#f59f5b] text-sm font-bold">★</span>
              ))}
            </div>
            <span className="text-xs text-[#a788fa] font-bold">
              ({reviewMap[product.id] || 120})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid gap-3">
        <p className="text-2xl font-black text-[#684fd6]">
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

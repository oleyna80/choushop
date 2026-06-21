import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import type { CandyProduct } from "@/features/candy-cloud/products";
import { formatCandyPrice } from "@/features/candy-cloud/products";
import { cn } from "@/lib/utils";

export function CandyProductCard({
  product,
  density = "default"
}: {
  product: CandyProduct;
  density?: "default" | "compact";
}) {
  const reviewMap: Record<string, number> = {
    "mini-mystery-box": 176,
    "classic-mystery-box": 248,
    "premium-mystery-box": 143,
    "jewelry-surprise-box": 126,
    "cute-accessories-box": 98
  };
  const isCompact = density === "compact";

  return (
    <article
      className={cn(
        "group grid h-full rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-white shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]",
        isCompact ? "gap-3 p-3" : "gap-5 p-4"
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--background-soft)]",
          isCompact ? "aspect-[1.12]" : "aspect-[1.35]"
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className={cn("grid", isCompact ? "gap-2" : "gap-3")}>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={product.accentTone}>{product.badge}</Badge>
          {!isCompact && product.isBestSeller ? <Badge variant="neutral">Coup de coeur</Badge> : null}
        </div>
        <div className="grid gap-2">
          <Link
            className={cn(
              "font-[var(--font-display)] font-extrabold leading-tight text-[#684fd6] transition-colors hover:text-[#ff7aae]",
              isCompact ? "text-base" : "text-2xl"
            )}
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className={cn("leading-6 text-[#a788fa]", isCompact ? "line-clamp-2 text-xs" : "text-sm")}>
            {product.shortDescription}
          </p>

          {/* Rating stars */}
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex text-[#ffd6a5]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={cn("font-bold text-[#f59f5b]", isCompact ? "text-[10px]" : "text-sm")}>★</span>
              ))}
            </div>
            <span className={cn("font-bold text-[#a788fa]", isCompact ? "text-[10px]" : "text-xs")}>
              ({reviewMap[product.id] || 120})
            </span>
          </div>
        </div>
      </div>

      <div className={cn("mt-auto grid", isCompact ? "gap-2" : "gap-3")}>
        <p className={cn("font-black text-[#684fd6]", isCompact ? "text-lg" : "text-2xl")}>
          {formatCandyPrice(product.price)}
        </p>
        <AddToCartButton
          className={isCompact ? "min-h-9 text-xs" : undefined}
          label="Ajouter au panier"
          productId={product.id}
          styleChoice={product.styles[0]}
        />
      </div>
    </article>
  );
}

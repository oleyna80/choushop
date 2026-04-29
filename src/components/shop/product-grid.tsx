import type { ReactNode } from "react";

import { ProductCard } from "@/components/shop/product-card";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  intro,
  controls,
  className
}: {
  products: StorefrontProduct[];
  intro?: ReactNode;
  controls?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8", className)}>
      {intro || controls ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>{intro}</div>
          {controls ? <div>{controls}</div> : null}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

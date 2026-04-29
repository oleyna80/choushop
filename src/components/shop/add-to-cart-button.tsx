"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/cart-client";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  productId,
  quantity = 1,
  disabled = false,
  className,
  label = "Ajouter au panier"
}: {
  productId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <Button
      className={cn("w-full", className)}
      disabled={disabled}
      onClick={() => {
        addToCart(productId, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      type="button"
    >
      {added ? "Ajoute au panier" : label}
    </Button>
  );
}

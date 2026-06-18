"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/cart-client";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  productId,
  quantity = 1,
  disabled = false,
  className,
  label = "Ajouter au panier",
  styleChoice
}: {
  productId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  styleChoice?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <Button
      className={cn("w-full rounded-full bg-[#ff7aae] text-white hover:bg-[#ff5b9b] transition-transform duration-300 font-bold", className)}
      disabled={disabled}
      onClick={() => {
        addToCart(productId, quantity, styleChoice);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      type="button"
    >
      {added ? (
        <span className="flex items-center justify-center gap-1.5 animate-pulse">
          <Check size={16} />
          Ajouté !
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <ShoppingBag size={16} className="shrink-0" />
          {label}
        </span>
      )}
    </Button>
  );
}

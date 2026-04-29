import type { CartLineInput, CartResolvedLine } from "@/features/cart/cart-types";
import { sampleProducts } from "@/features/catalog/sample-products";

export function resolveCartLines(items: CartLineInput[]): CartResolvedLine[] {
  return items
    .map((item) => {
      const product = sampleProducts.find((entry) => entry.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        totalPrice: product.price * item.quantity
      };
    })
    .filter((line): line is CartResolvedLine => line !== null);
}

export function getCartSubtotal(lines: CartResolvedLine[]) {
  return lines.reduce((sum, line) => sum + line.totalPrice, 0);
}

export function getCartItemCount(lines: CartResolvedLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

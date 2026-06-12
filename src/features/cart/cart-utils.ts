import type { StorefrontProduct } from "@/features/catalog/storefront-types";
import type { CartLineInput, CartResolvedLine } from "@/features/cart/cart-types";

export function resolveCartLines(
  items: CartLineInput[],
  productMap: Map<string, StorefrontProduct>
): CartResolvedLine[] {
  return items
    .map((item) => {
      const product = productMap.get(item.productId);

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

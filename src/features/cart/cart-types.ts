import type { StorefrontProduct } from "@/features/catalog/storefront-types";

export type CartLineInput = {
  productId: string;
  quantity: number;
  styleChoice?: string;
};

export type CartLine = CartLineInput & {
  title: string;
  slug: string;
  imageUrl: string;
  unitPrice: number;
  currency: string;
};

export type CartSnapshot = {
  cartId: string;
  items: CartLineInput[];
};

export type CartResolvedLine = CartLineInput & {
  product: StorefrontProduct;
  totalPrice: number;
};

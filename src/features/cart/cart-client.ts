"use client";

import type { CartLineInput, CartSnapshot } from "@/features/cart/cart-types";

const CART_KEY = "choushop.cart.v1";
const CART_ID_KEY = "choushop.cartId.v1";

function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getCartId() {
  const existing = window.localStorage.getItem(CART_ID_KEY);
  if (existing) return existing;

  const next = cryptoId();
  window.localStorage.setItem(CART_ID_KEY, next);
  return next;
}

export function readCart(): CartSnapshot {
  const raw = window.localStorage.getItem(CART_KEY);
  const items = raw ? (JSON.parse(raw) as CartLineInput[]) : [];

  return {
    cartId: getCartId(),
    items
  };
}

export function writeCart(items: CartLineInput[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("choushop:cart"));
}

export function addToCart(productId: string, quantity = 1) {
  const current = readCart().items;
  const existing = current.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
    writeCart([...current]);
    return;
  }

  writeCart([...current, { productId, quantity }]);
}

export function removeFromCart(productId: string) {
  writeCart(readCart().items.filter((item) => item.productId !== productId));
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  writeCart(
    readCart().items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )
  );
}

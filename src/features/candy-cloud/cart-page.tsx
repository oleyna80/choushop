"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import {
  readCart,
  removeFromCart,
  updateCartQuantity
} from "@/features/cart/cart-client";
import type { CartLineInput } from "@/features/cart/cart-types";
import {
  candyProducts,
  formatCandyPrice
} from "@/features/candy-cloud/products";

export function CandyCartPage() {
  const [items, setItems] = useState<CartLineInput[]>([]);

  useEffect(() => {
    const refresh = () => setItems(readCart().items);
    refresh();
    window.addEventListener("choushop:cart", refresh);
    return () => window.removeEventListener("choushop:cart", refresh);
  }, []);

  const lines = items
    .map((item) => ({
      item,
      product: candyProducts.find((product) => product.id === item.productId)
    }))
    .filter((line) => line.product);

  const total = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + (line.product?.price ?? 0) * line.item.quantity,
        0
      ),
    [lines]
  );

  if (!lines.length) {
    return (
      <section className="container grid min-h-[58svh] content-center gap-6 py-16 text-center">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Panier</p>
        <h1 className="text-[length:var(--text-h1)]">Ton panier est vide</h1>
        <p className="mx-auto max-w-xl text-lg leading-8 text-[var(--text-muted)]">
          Ajoute une Mystery Box pour envoyer une demande et recevoir ton lien Vinted personnalise.
        </p>
        <div>
          <Button asChild size="lg">
            <Link href="/catalog">Voir les box</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16 relative">
      {/* Background Pastel Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="design-blob design-blob-pink absolute left-[-10%] top-[5%] h-[32rem] w-[32rem] opacity-65 blur-[120px] animate-float-gentle" />
        <div className="design-blob design-blob-lilac absolute right-[-5%] top-[35%] h-[35rem] w-[35rem] opacity-55 blur-[130px] animate-float-slow" />
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Panier</p>
          <h1 className="text-[length:var(--text-h1)]">Vérifie ta demande</h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Ce total est indicatif. Aucun paiement n&apos;est pris sur ce site.
          </p>
        </div>

        <div className="grid gap-4">
          {lines.map(({ item, product }) => {
            if (!product) return null;
            const subtotal = product.price * item.quantity;

            return (
              <article
                className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-raised)] sm:grid-cols-[7rem_minmax(0,1fr)_auto] hover:border-pink-200/50"
                key={`${item.productId}-${item.styleChoice ?? "default"}`}
              >
                <div className="relative overflow-hidden rounded-[var(--radius-lg)] aspect-[1.25] bg-[var(--background-soft)] w-full sm:w-[7rem]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="grid gap-2">
                  <Link className="text-2xl font-black hover:text-[var(--primary)]" href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                  <p className="text-sm text-[var(--text-muted)]">Style : {item.styleChoice ?? product.styles[0]}</p>
                  <p className="font-black text-[var(--primary)]">{formatCandyPrice(product.price)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <QuantityStepper
                    max={9}
                    onChange={(next) => updateCartQuantity(product.id, next, item.styleChoice)}
                    value={item.quantity}
                  />
                  <p className="min-w-20 text-right font-black">{formatCandyPrice(subtotal)}</p>
                  <button
                    aria-label={`Retirer ${product.name}`}
                    className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-pink)] text-[var(--primary)] transition-all duration-200 hover:bg-[var(--primary)] hover:text-white active:scale-95 shadow-sm"
                    onClick={() => removeFromCart(product.id, item.styleChoice)}
                    type="button"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="grid h-fit gap-5 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-6 shadow-[var(--shadow-raised)]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-[var(--text-muted)]">Total indicatif</span>
          <span className="text-3xl font-black text-[var(--primary)]">{formatCandyPrice(total)}</span>
        </div>
        <p className="rounded-[var(--radius-md)] bg-[var(--surface-lilac)] p-4 text-sm font-bold leading-6 text-[var(--text-main)]">
          Paiement et livraison via Vinted. Apres ta demande, nous creons une annonce personnalisee.
        </p>
        <Button asChild size="lg">
          <Link href="/order">Envoyer ma demande</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/catalog">Ajouter une box</Link>
        </Button>
      </aside>
    </section>
  );
}

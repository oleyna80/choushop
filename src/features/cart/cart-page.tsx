"use client";

import Link from "next/link";
import { Receipt, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CartLineItem } from "@/components/shop/cart-line-item";
import { OrderSummaryCard } from "@/components/shop/order-summary-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TrustChip } from "@/components/ui/trust-chip";
import { readCart, removeFromCart, updateCartQuantity } from "@/features/cart/cart-client";
import type { CartLineInput } from "@/features/cart/cart-types";
import {
  getCartItemCount,
  getCartSubtotal,
  resolveCartLines
} from "@/features/cart/cart-utils";
import { CheckoutStepIndicator } from "@/features/checkout/checkout-step-indicator";

export function CartClientPage() {
  const [items, setItems] = useState<CartLineInput[]>([]);

  useEffect(() => {
    const sync = () => setItems(readCart().items);
    sync();
    window.addEventListener("choushop:cart", sync);
    return () => window.removeEventListener("choushop:cart", sync);
  }, []);

  const lines = useMemo(() => resolveCartLines(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(lines), [lines]);
  const itemCount = useMemo(() => getCartItemCount(lines), [lines]);
  const isEmpty = lines.length === 0;

  return (
    <SectionShell density="tight">
      <div className="grid gap-8 lg:gap-10">
        <div className="grid gap-6">
          <SectionHeading
            eyebrow="Panier"
            title="Ton panier prend forme."
            description="Ajuste tes box, vérifie le total TTC estimé et passe à l'étape livraison quand tout te semble parfait."
          />
          <CheckoutStepIndicator
            steps={[
              {
                label: "Panier",
                detail: "Choix et quantités",
                status: "current"
              },
              {
                label: "Coordonnées",
                detail: "Adresse et livraison",
                status: "upcoming"
              },
              {
                label: "Paiement",
                detail: "Stripe Checkout sécurisé",
                status: "upcoming"
              }
            ]}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <TrustChip
            detail="Le serveur revalidera prix TTC et disponibilité avant paiement."
            icon={<Receipt size={18} />}
            title="Total contrôlé"
          />
          <TrustChip
            detail="La confirmation de paiement passe uniquement par Stripe Checkout."
            icon={<ShieldCheck size={18} />}
            title="Paiement sécurisé"
          />
          <TrustChip
            detail="Choix de livraison à l'étape suivante, pensé pour une session mobile rapide."
            icon={<Truck size={18} />}
            title="Livraison simple"
          />
        </div>

        {isEmpty ? (
          <div className="surface-panel grid gap-5 rounded-[var(--radius-xl)] border border-white/70 px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--accent-strong)] shadow-[var(--shadow-soft)]">
              <Sparkles size={22} />
            </div>
            <div className="grid gap-2">
              <h2 className="text-[length:var(--text-h3)]">Ton panier est encore vide.</h2>
              <p className="mx-auto max-w-lg text-sm leading-6 text-[var(--muted)]">
                Explore les box pastel du moment et reviens ici pour finaliser ton achat en quelques minutes.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/shop">Voir les box</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/faq">Comment ça marche</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div className="grid gap-4">
              {lines.map((line) => (
                <CartLineItem
                  key={line.product.id}
                  line={line}
                  onQuantityChange={(nextQuantity) => {
                    updateCartQuantity(line.product.id, nextQuantity);
                    setItems(readCart().items);
                  }}
                  onRemove={() => {
                    removeFromCart(line.product.id);
                    setItems(readCart().items);
                  }}
                />
              ))}
            </div>

            <aside className="lg:sticky lg:top-24">
              <OrderSummaryCard
                action={{
                  href: "/checkout",
                  label: "Continuer vers la livraison"
                }}
                eyebrow={`${itemCount} article${itemCount > 1 ? "s" : ""}`}
                lines={lines}
                note="Le montant final, la livraison et le stock seront recalculés côté serveur avant la redirection vers Stripe Checkout."
                shippingAmount={null}
                subtotal={subtotal}
                title="Résumé de commande"
              />
            </aside>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

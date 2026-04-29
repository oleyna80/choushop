"use client";

import Link from "next/link";
import { Lock, MapPin, Receipt, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { OrderSummaryCard } from "@/components/shop/order-summary-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TrustChip } from "@/components/ui/trust-chip";
import { readCart } from "@/features/cart/cart-client";
import type { CartLineInput } from "@/features/cart/cart-types";
import {
  getCartSubtotal,
  resolveCartLines
} from "@/features/cart/cart-utils";
import { CheckoutStepIndicator } from "@/features/checkout/checkout-step-indicator";
import { mockShippingOptions } from "@/features/checkout/mock-shipping-options";

type CheckoutState = "idle" | "loading" | "error";

export function CheckoutClientPage() {
  const [items, setItems] = useState<CartLineInput[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState(
    mockShippingOptions[0]?.id ?? ""
  );
  const [state, setState] = useState<CheckoutState>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setItems(readCart().items);
    sync();
    window.addEventListener("choushop:cart", sync);
    return () => window.removeEventListener("choushop:cart", sync);
  }, []);

  const lines = useMemo(() => resolveCartLines(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(lines), [lines]);
  const selectedShipping =
    mockShippingOptions.find((option) => option.id === selectedShippingId) ??
    mockShippingOptions[0];
  const totalAmount = subtotal + (selectedShipping?.price ?? 0);
  const isEmpty = lines.length === 0;

  async function submitCheckout(formData: FormData) {
    setState("loading");
    setError(null);

    try {
      const cart = readCart();
      const payload = {
        cartId: cart.cartId,
        items: cart.items,
        customer: {
          email: String(formData.get("email") ?? ""),
          name: String(formData.get("name") ?? ""),
          phone: String(formData.get("phone") ?? "")
        },
        shippingAddress: {
          line1: String(formData.get("line1") ?? ""),
          line2: String(formData.get("line2") ?? ""),
          postalCode: String(formData.get("postalCode") ?? ""),
          city: String(formData.get("city") ?? ""),
          country: String(formData.get("country") ?? "FR")
        },
        shippingMethodId: String(formData.get("shippingMethodId") ?? ""),
        termsAccepted: formData.get("termsAccepted") === "on",
        termsVersion: "2026-04-13"
      };

      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        setState("error");
        setError(result.error ?? "Checkout indisponible.");
        return;
      }

      window.location.href = result.url;
    } catch {
      setState("error");
      setError("Checkout indisponible.");
    }
  }

  return (
    <SectionShell density="tight">
      <div className="grid gap-8 lg:gap-10">
        <div className="grid gap-6">
          <SectionHeading
            eyebrow="Commande"
            title="Finalise ta commande en douceur."
            description="Tes coordonnées, la livraison et l'acceptation des CGV sont regroupées ici pour une session mobile simple avant Stripe Checkout."
          />
          <CheckoutStepIndicator
            steps={[
              {
                label: "Panier",
                detail: "Sélection validée",
                status: "complete"
              },
              {
                label: "Coordonnées",
                detail: "Adresse et livraison",
                status: "current"
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
            detail="Le serveur recalcule le total TTC et la disponibilité avant de créer la session."
            icon={<Receipt size={18} />}
            title="Vérification serveur"
          />
          <TrustChip
            detail="Choisis le mode de livraison qui te convient, avec des identifiants déjà alignés au checkout."
            icon={<Truck size={18} />}
            title="Livraison claire"
          />
          <TrustChip
            detail="Le paiement se termine sur Stripe Checkout, jamais directement dans ce formulaire."
            icon={<Lock size={18} />}
            title="Paiement sécurisé"
          />
        </div>

        {isEmpty ? (
          <div className="surface-panel grid gap-5 rounded-[var(--radius-xl)] border border-white/70 px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--accent-strong)] shadow-[var(--shadow-soft)]">
              <ShoppingBag size={22} />
            </div>
            <div className="grid gap-2">
              <h2 className="text-[length:var(--text-h3)]">Ajoute d&apos;abord une box à ton panier.</h2>
              <p className="mx-auto max-w-lg text-sm leading-6 text-[var(--muted)]">
                Le checkout reste prêt, mais il lui faut une sélection active pour préparer la session Stripe.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/shop">Voir les box</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/cart">Retour au panier</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
            <form action={submitCheckout} className="grid gap-5">
              <Card className="grid gap-5" padding="lg" variant="panel">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]">
                    <Sparkles size={16} />
                    <span>Contact</span>
                  </div>
                  <h2 className="text-[length:var(--text-h3)]">Tes coordonnées</h2>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Nous utilisons ces informations pour préparer la commande et te transmettre les détails Stripe.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                    Adresse e-mail
                    <Input
                      autoComplete="email"
                      name="email"
                      placeholder="toi@example.fr"
                      required
                      type="email"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                    Nom complet
                    <Input
                      autoComplete="name"
                      name="name"
                      placeholder="Prénom Nom"
                      required
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                  Téléphone
                  <Input
                    autoComplete="tel"
                    name="phone"
                    placeholder="06 12 34 56 78"
                    type="tel"
                  />
                </label>
              </Card>

              <Card className="grid gap-5" padding="lg" variant="panel">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]">
                    <MapPin size={16} />
                    <span>Livraison</span>
                  </div>
                  <h2 className="text-[length:var(--text-h3)]">Adresse et option d&apos;envoi</h2>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Les options affichées ici restent en mode mock, mais utilisent déjà les identifiants du checkout existant.
                  </p>
                </div>

                <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                  Adresse
                  <Input
                    autoComplete="address-line1"
                    name="line1"
                    placeholder="12 rue des fleurs"
                    required
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                  Complément d&apos;adresse
                  <Input
                    autoComplete="address-line2"
                    name="line2"
                    placeholder="Appartement, étage, bâtiment"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-[160px_minmax(0,1fr)]">
                  <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                    Code postal
                    <Input
                      autoComplete="postal-code"
                      inputMode="numeric"
                      name="postalCode"
                      placeholder="75001"
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                    Ville
                    <Input
                      autoComplete="address-level2"
                      name="city"
                      placeholder="Paris"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
                  <span>Pays</span>
                  <div className="surface-panel flex min-h-12 items-center rounded-[var(--radius-md)] border border-white/70 px-4 text-sm text-[var(--muted)]">
                    France métropolitaine
                  </div>
                  <input name="country" type="hidden" value="FR" />
                </div>

                <div className="grid gap-3">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Choisir une livraison
                  </span>
                  <div className="grid gap-3">
                    {mockShippingOptions.map((option) => {
                      const isSelected = option.id === selectedShippingId;

                      return (
                        <label key={option.id}>
                          <input
                            checked={isSelected}
                            className="sr-only"
                            name="shippingMethodId"
                            onChange={() => setSelectedShippingId(option.id)}
                            required
                            type="radio"
                            value={option.id}
                          />
                          <span className="surface-panel flex cursor-pointer flex-col gap-3 rounded-[var(--radius-lg)] border px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
                            <span className="grid gap-1">
                              <span className="text-sm font-semibold text-[var(--foreground)]">
                                {option.label}
                              </span>
                              <span className="text-sm leading-6 text-[var(--muted)]">
                                {option.description}
                              </span>
                              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                                {option.detail}
                              </span>
                            </span>
                            <span
                              className={`inline-flex min-h-10 items-center rounded-[var(--radius-pill)] px-4 text-sm font-semibold ${
                                isSelected
                                  ? "bg-[var(--accent)] text-white"
                                  : "bg-white text-[var(--foreground)]"
                              }`}
                            >
                              {new Intl.NumberFormat("fr-FR", {
                                style: "currency",
                                currency: "EUR"
                              }).format(option.price / 100)}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="grid gap-5" padding="lg" variant="panel">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]">
                    <Receipt size={16} />
                    <span>Validation</span>
                  </div>
                  <h2 className="text-[length:var(--text-h3)]">Dernière vérification</h2>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    L&apos;acceptation explicite des CGV reste obligatoire avant la création de la session Stripe.
                  </p>
                </div>

                <label className="surface-panel flex gap-3 rounded-[var(--radius-lg)] border border-white/70 px-4 py-4 text-sm leading-6 text-[var(--foreground)]">
                  <input
                    className="mt-1 h-4 w-4 rounded border-[var(--line)] accent-[var(--accent)]"
                    name="termsAccepted"
                    required
                    type="checkbox"
                  />
                  <span>
                    J&apos;accepte les CGV et je confirme avoir lu les informations de livraison et de retour avant de passer sur Stripe Checkout.
                  </span>
                </label>

                {error ? (
                  <p className="rounded-[var(--radius-md)] bg-[rgba(255,95,162,0.12)] px-4 py-3 text-sm font-semibold text-[var(--accent-strong)]">
                    {error}
                  </p>
                ) : null}

                <Button disabled={state === "loading"} size="lg" type="submit">
                  {state === "loading" ? "Préparation de Stripe..." : "Continuer vers Stripe Checkout"}
                </Button>
              </Card>
            </form>

            <aside className="xl:sticky xl:top-24">
              <OrderSummaryCard
                eyebrow="Commande active"
                lines={lines}
                note="Affichage mock côté storefront. Le serveur reste la source de vérité pour les prix TTC, le stock et la livraison avant redirection."
                shippingAmount={selectedShipping?.price ?? 0}
                shippingLabel={selectedShipping?.label ?? "Livraison"}
                subtotal={subtotal}
                title="Résumé de commande"
                totalAmount={totalAmount}
              />
            </aside>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

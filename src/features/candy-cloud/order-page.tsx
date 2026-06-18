"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, ShieldCheck } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { readCart } from "@/features/cart/cart-client";
import type { CartLineInput } from "@/features/cart/cart-types";
import {
  candyProducts,
  formatCandyPrice
} from "@/features/candy-cloud/products";

export function OrderRequestPage() {
  const router = useRouter();
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

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/order/success");
  }

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:py-16 relative">
      {/* Background Pastel Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="design-blob design-blob-pink absolute left-[-10%] top-[5%] h-[32rem] w-[32rem] opacity-65 blur-[120px] animate-float-gentle" />
        <div className="design-blob design-blob-lilac absolute right-[-5%] top-[35%] h-[35rem] w-[35rem] opacity-55 blur-[130px] animate-float-slow" />
      </div>

      <form
        className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-raised)] md:p-7"
        onSubmit={submitRequest}
      >
        <div className="grid gap-3">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Demande</p>
          <h1 className="text-[length:var(--text-h1)]">Recevoir mon lien Vinted</h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)] text-pretty">
            Laisse ton contact et tes préférences. Nous t&apos;envoyons ensuite une annonce Vinted personnalisée.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Prénom">
            <Input name="firstName" placeholder="Léa" required />
          </Field>
          <Field label="Méthode de contact">
            <Select defaultValue="vinted" name="contactMethod" required>
              <option value="vinted">Vinted</option>
              <option value="instagram">Instagram</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </Select>
          </Field>
          <Field label="Pseudo ou contact">
            <Input name="contact" placeholder="@choushop ou email" required />
          </Field>
          <Field label="Pseudo Vinted">
            <Input name="vinted" placeholder="Optionnel" />
          </Field>
        </div>

        <Field label="Préférences">
          <Textarea
            name="preferences"
            placeholder="Couleurs préférées, bijoux ou accessoires, style cute, kawaii, coquette..."
          />
        </Field>

        <label className="flex gap-3 rounded-[var(--radius-lg)] bg-[var(--surface-lilac)] p-4 font-bold leading-6 cursor-pointer">
          <Checkbox required />
          <span>
            J&apos;ai compris que le paiement et la livraison se feront via Vinted.
          </span>
        </label>

        <Button size="lg" type="submit">
          Envoyer ma demande
        </Button>
      </form>

      <aside className="grid h-fit gap-5 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)]">
        <div className="grid gap-2">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Resume</p>
          <h2 className="text-3xl">Panier</h2>
        </div>
        <div className="grid gap-3">
          {lines.length ? (
            lines.map(({ item, product }) =>
              product ? (
                <div
                  className="grid gap-1 border-b border-[var(--border-soft)] pb-3 last:border-0"
                  key={`${item.productId}-${item.styleChoice ?? "default"}`}
                >
                  <div className="flex justify-between gap-3 font-bold">
                    <span>{product.name}</span>
                    <span>{formatCandyPrice(product.price * item.quantity)}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    {item.quantity} x {item.styleChoice ?? product.styles[0]}
                  </p>
                </div>
              ) : null
            )
          ) : (
            <p className="text-sm text-[var(--text-muted)]">
              Ton panier est vide. Tu peux quand meme envoyer une demande generale.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between text-xl font-black">
          <span>Total indicatif</span>
          <span className="text-[var(--primary)]">{formatCandyPrice(total)}</span>
        </div>
        <p className="flex gap-3 rounded-[var(--radius-md)] bg-[var(--surface-pink)] p-4 text-sm font-bold leading-6">
          <ShieldCheck className="shrink-0 text-[var(--primary)]" size={20} />
          Aucun paiement par carte ici. Vinted gere le paiement et la livraison.
        </p>
        <p className="flex gap-3 text-sm font-bold leading-6 text-[var(--text-muted)]">
          <MessageCircle className="shrink-0 text-[var(--secondary)]" size={20} />
          Nous te contactons avant la creation de l&apos;annonce si une precision manque.
        </p>
      </aside>
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[var(--text-main)]">{label}</span>
      {children}
    </label>
  );
}

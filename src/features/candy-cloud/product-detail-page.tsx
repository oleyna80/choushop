"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Heart, ShieldCheck, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { MysteryBoxVisual } from "@/components/shop/mystery-box-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import type { CandyProduct } from "@/features/candy-cloud/products";
import { formatCandyPrice } from "@/features/candy-cloud/products";

export function CandyProductDetailPage({ product }: { product: CandyProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [styleChoice, setStyleChoice] = useState(product.styles[0] ?? "Surprise");

  return (
    <section className="container grid gap-10 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-16">
      <div className="grid gap-5">
        <Button asChild size="sm" variant="ghost">
          <Link href="/catalog">
            <ArrowLeft size={16} />
            Retour au catalogue
          </Link>
        </Button>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-raised)]">
          <MysteryBoxVisual className="min-h-[28rem] rounded-[var(--radius-xl)]" tone={product.accentTone} />
        </div>
      </div>

      <div className="grid content-start gap-7">
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant={product.accentTone}>{product.category}</Badge>
            {product.isBestSeller ? <Badge variant="accent">Best seller</Badge> : null}
          </div>
          <h1 className="text-[length:var(--text-h1)] text-[var(--text-main)]">{product.name}</h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{product.description}</p>
          <p className="text-4xl font-black text-[var(--primary)]">{formatCandyPrice(product.price)}</p>
        </div>

        <div className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Style</p>
          <div className="flex flex-wrap gap-2">
            {product.styles.map((style) => (
              <button
                className={styleChoice === style ? "chip-active" : "chip"}
                key={style}
                onClick={() => setStyleChoice(style)}
                type="button"
              >
                {style}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <QuantityStepper max={9} min={1} onChange={setQuantity} value={quantity} />
            <AddToCartButton productId={product.id} quantity={quantity} styleChoice={styleChoice} />
          </div>
        </div>

        <div className="grid gap-3 rounded-[var(--radius-lg)] bg-[var(--surface-lilac)] p-5">
          <TrustLine icon={ShieldCheck} text="Aucun paiement sur ce site: le reglement se fait via Vinted." />
          <TrustLine icon={Video} text="La box peut etre preparee en video apres validation." />
          <TrustLine icon={Heart} text="Tu peux ajouter tes preferences dans le formulaire de demande." />
        </div>

        <div className="grid gap-3">
          <h2 className="text-2xl">Dans cette box</h2>
          <ul className="grid gap-2 text-[var(--text-muted)]">
            {product.includes.map((item) => (
              <li className="flex items-center gap-2" key={item}>
                <CheckCircle2 className="text-[var(--primary)]" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustLine({
  icon: Icon,
  text
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <p className="flex items-center gap-3 font-bold text-[var(--text-main)]">
      <Icon className="shrink-0 text-[var(--primary)]" size={20} />
      {text}
    </p>
  );
}

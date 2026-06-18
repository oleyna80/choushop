"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Video
} from "lucide-react";

import { CandyProductCard } from "@/components/shop/candy-product-card";
import { MysteryBoxVisual } from "@/components/shop/mystery-box-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  candyProducts,
  categoryCards,
  faqPreview,
  formatCandyPrice,
  styleTags,
  testimonials
} from "@/features/candy-cloud/products";

const steps = [
  "Choisis tes box",
  "Ajoute au panier",
  "Envoie ta demande",
  "Recois le lien Vinted"
];

export function CandyHomePage() {
  const featured = candyProducts
    .filter((product) => product.isBestSeller)
    .concat(candyProducts.filter((product) => !product.isBestSeller))
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(25rem,0.9fr)] lg:items-center">
          <div className="grid gap-7">
            <Badge variant="accent">ChouShop / Soft Surprise</Badge>
            <div className="grid gap-5">
              <h1 className="max-w-4xl text-[length:clamp(3.2rem,7vw,6.2rem)] font-black leading-[0.95] tracking-normal text-[var(--text-main)]">
                Ta Mystery Box cute, preparee juste pour toi
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-[var(--text-muted)]">
                Choisis ton style, ajoute tes box au panier, puis recois un lien Vinted securise pour finaliser ta commande.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/catalog">
                  Choisir ma box
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#how-it-works">Comment ca marche ?</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-raised)]">
            <div className="absolute left-8 top-8 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--primary)] shadow-[var(--shadow-soft)]">
              surprise
            </div>
            <div className="absolute right-8 top-16 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--secondary)] shadow-[var(--shadow-soft)]">
              bijoux
            </div>
            <div className="absolute bottom-12 left-10 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--primary)] shadow-[var(--shadow-soft)]">
              pink mood
            </div>
            <div className="absolute bottom-14 right-12 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--peach)] shadow-[var(--shadow-soft)]">
              cute
            </div>
            <MysteryBoxVisual className="min-h-[22rem] rounded-[var(--radius-xl)]" />
          </div>
        </div>
      </section>

      <section className="container grid gap-6 py-12">
        <SectionIntro
          kicker="Choisis ta box"
          title="Trois formats simples pour commander vite."
          text="Sans paiement sur le site, sans checkout complique."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {categoryCards.map((category) => (
            <Link
              className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-1"
              href={category.href}
              key={category.title}
            >
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4">
                <MysteryBoxVisual compact tone={category.accentTone} />
                <div className="grid content-center gap-1">
                  <h3 className="text-2xl">{category.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{category.description}</p>
                  <p className="font-black">A partir de {formatCandyPrice(category.priceFrom)}</p>
                </div>
              </div>
              <span className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-pink)] font-bold text-[var(--primary)]">
                Voir la box
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container grid gap-6 py-12">
        <SectionIntro
          kicker="Best sellers"
          title="Ajoute une ou plusieurs box au panier."
          text="Tu enverras ensuite une demande pour recevoir ton lien Vinted."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <CandyProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <HowItWorksSection />
      <VintedTrustSection />
      <TestimonialsSection />
      <FaqPreviewSection />
    </>
  );
}

export function CatalogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("Toutes");

  const filtered = selectedTag === "Toutes"
    ? candyProducts
    : candyProducts.filter((p) => p.styles.includes(selectedTag));

  return (
    <section className="container grid gap-8 py-12 md:py-16">
      <SectionIntro
        kicker="Catalogue"
        title="Choisis ta Mystery Box"
        text="Ajoute une ou plusieurs box au panier. Le paiement se fera ensuite via un lien Vinted personnalise."
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par style">
        {["Toutes", ...styleTags].map((tag) => {
          const isActive = tag === selectedTag;
          return (
            <button
              aria-pressed={isActive}
              className={isActive ? "chip-active" : "chip"}
              key={tag}
              onClick={() => setSelectedTag(tag)}
              type="button"
            >
              {tag}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="text-sm text-[var(--text-muted)]">
        {filtered.length === 1 ? "1 box disponible" : `${filtered.length} box disponibles`}
        {selectedTag !== "Toutes" && <> en style <span className="font-bold text-[var(--text-main)]">{selectedTag}</span></>}
      </p>
      {filtered.length === 0 ? (
        <div className="grid place-items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white px-6 py-16 text-center">
          <p className="text-xl font-black text-[var(--text-main)]">
            Aucune box trouvee pour &quot;{selectedTag}&quot;
          </p>
          <p className="text-[var(--text-muted)]">
            Essaie un autre style ou reviens a toutes les box.
          </p>
          <Button onClick={() => setSelectedTag("Toutes")} variant="secondary">
            Voir toutes les box
          </Button>
        </div>
      ) : (
        <div aria-live="polite" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <CandyProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="container grid gap-6 py-12" id="how-it-works">
      <SectionIntro
        kicker="Comment ca marche ?"
        title="Un parcours simple: panier ici, paiement via Vinted."
        text="Ta box est preparee en video apres paiement."
      />
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)]"
            key={step}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-lg font-black text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-2xl">{step}</h3>
          </div>
        ))}
      </div>
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-6 text-center text-xl font-black">
        Aucun paiement sur le site - Commande finalisee via Vinted - Box preparee en video
      </div>
    </section>
  );
}

export function VintedTrustSection() {
  const badges = [
    { icon: ShieldCheck, label: "Paiement via Vinted" },
    { icon: PackageCheck, label: "Livraison Vinted" },
    { icon: Video, label: "Preparation en video" },
    { icon: MessageCircle, label: "Contact avant commande" }
  ];

  return (
    <section className="container py-12">
      <div className="grid gap-8 rounded-[var(--radius-xl)] bg-[var(--surface-lilac)] p-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-10">
        <SectionIntro
          kicker="Vinted"
          title="Paiement et livraison via Vinted"
          text="Aucun paiement n'est effectue sur ce site. Apres ta demande, nous creons une annonce Vinted personnalisee pour finaliser l'achat en toute securite."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {badges.map(({ icon: Icon, label }) => (
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 font-bold" key={label}>
              <Icon className="text-[var(--primary)]" size={22} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="container grid gap-6 py-12">
      <SectionIntro kicker="Avis" title="Des demandes simples et rassurantes." />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)]" key={item.name}>
            <div className="flex gap-1 text-[var(--primary)]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Heart fill="currentColor" key={index} size={16} />
              ))}
            </div>
            <blockquote className="text-lg font-bold leading-7">&quot;{item.quote}&quot;</blockquote>
            <figcaption className="text-sm text-[var(--text-muted)]">{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FaqPreviewSection() {
  return (
    <section className="container grid gap-6 py-12">
      <SectionIntro kicker="FAQ" title="Les questions avant de demander ta box." />
      <div className="grid gap-3">
        {faqPreview.map((item, index) => (
          <details
            className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-white px-5 py-4"
            key={item.question}
            open={index === 0}
          >
            <summary className="cursor-pointer text-lg font-black">{item.question}</summary>
            <p className="pt-3 leading-7 text-[var(--text-muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({
  kicker,
  title,
  text
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="grid max-w-3xl gap-3">
      <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">{kicker}</p>
      <h2 className="text-[length:var(--text-h2)] text-[var(--text-main)]">{title}</h2>
      {text ? <p className="text-lg leading-8 text-[var(--text-muted)]">{text}</p> : null}
    </div>
  );
}

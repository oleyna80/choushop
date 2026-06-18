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
  "Reçois le lien Vinted"
];

export function CandyHomePage() {
  const featured = candyProducts
    .filter((product) => product.isBestSeller)
    .concat(candyProducts.filter((product) => !product.isBestSeller))
    .slice(0, 3);

  return (
    <>
      {/* Background Pastel Blobs */}
      <div className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none -z-10 h-[200vh]">
        <div className="design-blob design-blob-pink absolute -left-20 -top-20 h-[35rem] w-[35rem] opacity-75 blur-[120px] animate-float-slow" />
        <div className="design-blob design-blob-lilac absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] opacity-65 blur-[130px] animate-float-gentle" />
        <div className="design-blob design-blob-peach absolute left-[20%] top-[45%] h-[30rem] w-[30rem] opacity-55 blur-[110px] animate-float-delayed" />
      </div>

      <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-24">
        {/* Floating stars & pluses decoration */}
        <div className="absolute left-[5%] top-[18%] hidden lg:block animate-float-slow opacity-35 text-[var(--primary)]">
          <span className="text-3xl font-light">+</span>
        </div>
        <div className="absolute right-[50%] top-[8%] hidden lg:block animate-float-gentle opacity-25 text-[var(--secondary)]">
          <span className="text-2xl font-light">+</span>
        </div>
        <div className="absolute left-[40%] bottom-[12%] hidden lg:block animate-float-delayed opacity-30 text-[var(--peach)]">
          <span className="text-2xl font-light">+</span>
        </div>
        <div className="absolute right-[4%] top-[40%] hidden lg:block animate-float-slow opacity-40 text-[var(--primary)] animate-sparkle">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
        <div className="absolute left-[3%] bottom-[32%] hidden lg:block animate-float-delayed opacity-35 text-[var(--secondary)] animate-sparkle">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(25rem,0.9fr)] lg:items-center">
          <div className="grid gap-7">
            <Badge variant="accent">ChouShop / Soft Surprise</Badge>
            <div className="grid gap-5">
              <h1 className="max-w-4xl text-[length:clamp(3.2rem,7vw,6.2rem)] font-black leading-[0.95] tracking-normal text-[var(--text-main)]">
                Ta Mystery Box cute, préparée juste pour toi
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-[var(--text-muted)] text-pretty">
                Choisis ton style, ajoute tes box au panier, puis reçois un lien Vinted sécurisé pour finaliser ta commande.
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
                <Link href="#how-it-works">Comment ça marche ?</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-raised)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(181,109,170,0.28)]">
            <div className="absolute left-8 top-8 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--primary)] shadow-[var(--shadow-soft)] animate-float-gentle">
              surprise
            </div>
            <div className="absolute right-8 top-16 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--secondary)] shadow-[var(--shadow-soft)] animate-float-delayed">
              bijoux
            </div>
            <div className="absolute bottom-12 left-10 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--primary)] shadow-[var(--shadow-soft)] animate-float-slow">
              pink mood
            </div>
            <div className="absolute bottom-14 right-12 z-10 rounded-[var(--radius-pill)] bg-white px-4 py-2 text-sm font-bold text-[var(--peach)] shadow-[var(--shadow-soft)] animate-float-gentle">
              cute
            </div>
            <MysteryBoxVisual className="min-h-[22rem] rounded-[var(--radius-xl)]" />
          </div>
        </div>
      </section>

      <section className="container grid gap-6 py-12 relative">
        <SectionIntro
          kicker="Choisis ta box"
          title="Trois formats simples pour commander vite."
          text="Sans paiement sur le site, sans checkout compliqué."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {categoryCards.map((category) => (
            <Link
              className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-raised)] hover:border-[var(--primary)]/20"
              href={category.href}
              key={category.title}
            >
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4">
                <MysteryBoxVisual compact tone={category.accentTone} />
                <div className="grid content-center gap-1">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{category.description}</p>
                  <p className="font-black text-[var(--primary)]">À partir de {formatCandyPrice(category.priceFrom)}</p>
                </div>
              </div>
              <span className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-pink)] font-bold text-[var(--primary)] transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white">
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
        text="Ajoute une ou plusieurs box au panier. Le paiement se fera ensuite via un lien Vinted personnalisé."
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
        <div className="grid place-items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white px-6 py-16 text-center shadow-[var(--shadow-soft)]">
          <p className="text-xl font-black text-[var(--text-main)]">
            Aucune box trouvée pour &quot;{selectedTag}&quot;
          </p>
          <p className="text-[var(--text-muted)]">
            Essaie un autre style ou reviens à toutes les box.
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
        kicker="Comment ça marche ?"
        title="Un parcours simple : panier ici, paiement via Vinted."
        text="Ta box est préparée en vidéo après paiement."
      />
      <div className="grid gap-5 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-raised)]"
            key={step}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-lg font-black text-white shadow-[0_4px_12px_rgba(232,75,163,0.3)]">
              {index + 1}
            </span>
            <h3 className="mt-5 text-2xl font-bold text-[var(--text-main)]">{step}</h3>
          </div>
        ))}
      </div>
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white/70 p-6 text-center text-xl font-black shadow-[var(--shadow-soft)] backdrop-blur-md">
        Aucun paiement sur le site · Commande finalisée via Vinted · Box préparée en vidéo
      </div>
    </section>
  );
}

export function VintedTrustSection() {
  const badges = [
    { icon: ShieldCheck, label: "Paiement via Vinted" },
    { icon: PackageCheck, label: "Livraison Vinted" },
    { icon: Video, label: "Préparation en vidéo" },
    { icon: MessageCircle, label: "Contact avant commande" }
  ];

  return (
    <section className="container py-12">
      <div className="grid gap-8 rounded-[var(--radius-xl)] bg-[var(--surface-lilac)] p-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-10 shadow-[var(--shadow-soft)] border border-white/40">
        <SectionIntro
          kicker="Vinted"
          title="Paiement et livraison via Vinted"
          text="Aucun paiement n'est effectué sur ce site. Après ta demande, nous créons une annonce Vinted personnalisée pour finaliser l'achat en toute sécurité."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {badges.map(({ icon: Icon, label }) => (
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 font-bold shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.03]" key={label}>
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
          <figure className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.02]" key={item.name}>
            <div className="flex gap-1 text-[var(--primary)] animate-sparkle">
              {Array.from({ length: 5 }).map((_, index) => (
                <Heart fill="currentColor" key={index} size={16} />
              ))}
            </div>
            <blockquote className="text-lg font-bold leading-7 text-pretty">&quot;{item.quote}&quot;</blockquote>
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
            className="group rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-white px-5 py-4 shadow-[var(--shadow-soft)] transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
            key={item.question}
            open={index === 0}
          >
            <summary className="flex cursor-pointer items-center justify-between text-lg font-black text-[var(--text-main)] outline-none">
              <span>{item.question}</span>
              <span className="transition-transform duration-300 group-open:rotate-180 text-[var(--primary)] text-2xl font-light">
                &darr;
              </span>
            </summary>
            <p className="pt-3 leading-7 text-[var(--text-muted)] text-pretty border-t border-[var(--border-soft)]/40 mt-3">{item.answer}</p>
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
      <h2 className="text-[length:var(--text-h2)] text-[var(--text-main)] font-black leading-[1.1]">{title}</h2>
      {text ? <p className="text-lg leading-8 text-[var(--text-muted)]">{text}</p> : null}
    </div>
  );
}

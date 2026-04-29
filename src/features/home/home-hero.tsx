import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gift,
  HeartHandshake,
  ShoppingBag,
  Sparkles,
  Truck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { Price } from "@/components/ui/price";
import { TrustChip } from "@/components/ui/trust-chip";
import { sampleCollections } from "@/features/catalog/sample-collections";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";
import { getToneStyles } from "@/features/home/tone-styles";

export function HomeHero({
  heroProduct,
  secondaryProducts
}: {
  heroProduct: StorefrontProduct;
  secondaryProducts: StorefrontProduct[];
}) {
  const collections = sampleCollections.slice(0, 2);
  const tone = getToneStyles(heroProduct.accentTone);

  return (
    <section className="relative overflow-hidden pt-6 md:pt-8">
      <div
        aria-hidden="true"
        className="glow-orb top-10 right-[8%] h-44 w-44"
        data-tone="lavender"
      />
      <div
        aria-hidden="true"
        className="glow-orb left-[-5%] top-48 h-40 w-40"
        data-tone="accent"
      />

      <div className="container">
        <div className="grid gap-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center">
          <div className="grid gap-6 py-6 md:py-10">
            <IconBadge icon={<Sparkles size={14} />} variant="accent">
              ChouShop maison pastel
            </IconBadge>

            <div className="grid max-w-2xl gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Mystery box cute et premium pour la France
              </p>
              <h1 className="max-w-3xl text-[length:var(--text-display)]">
                La surprise qui fait vraiment cadeau des l&apos;ouverture.
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
                Des box pastel choisies avec une direction claire, des details
                utiles et une presentation douce qui reste premium.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/shop">
                  Voir les box
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/faq">Comment ca marche</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <TrustChip
                detail="Prix affiches en EUR TTC."
                icon={<Gift size={18} />}
                title="Pret a offrir"
              />
              <TrustChip
                detail="Paiement securise via Stripe Checkout."
                icon={<ShoppingBag size={18} />}
                title="Commande simple"
              />
              <TrustChip
                detail="Preparation rapide puis expedition suivie."
                icon={<Truck size={18} />}
                title="France d'abord"
              />
            </div>
          </div>

          <div className="relative pb-3">
            <div
              className={`surface-panel relative overflow-hidden rounded-[calc(var(--radius-xl)+0.5rem)] border ${tone.border} bg-gradient-to-br ${tone.panel} p-4 shadow-[var(--shadow-raised)] md:p-5`}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end">
                <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)-0.25rem)] bg-white/60">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
                    <IconBadge icon={<Sparkles size={14} />} variant={tone.badge}>
                      {heroProduct.badge.replace("-", " ")}
                    </IconBadge>
                    <span className="rounded-full bg-white/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {heroProduct.theme}
                    </span>
                  </div>
                  <div className="relative aspect-[4/4.7]">
                    <Image
                      priority
                      alt={heroProduct.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 34rem, 100vw"
                      src={heroProduct.imageUrl}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(47,36,65,0.76)] via-[rgba(47,36,65,0.25)] to-transparent p-4 pt-12 text-white">
                    <div className="grid gap-2">
                      <p className="text-sm uppercase tracking-[0.16em] text-white/76">
                        Selection du moment
                      </p>
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div className="grid gap-1">
                          <h2 className="text-[length:var(--text-h3)]">
                            {heroProduct.title}
                          </h2>
                          <p className="max-w-sm text-sm leading-6 text-white/82">
                            {heroProduct.tagline}
                          </p>
                        </div>
                        <Price
                          amount={heroProduct.price}
                          className="[&_span:first-child]:text-white [&_span:last-child]:text-white/72"
                          compareAt={heroProduct.compareAtPrice}
                          currency={heroProduct.currency}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {secondaryProducts.map((product) => {
                    const styles = getToneStyles(product.accentTone);

                    return (
                      <Link
                        key={product.id}
                        className={`group surface-panel grid gap-3 rounded-[var(--radius-lg)] border ${styles.border} bg-white/78 p-3 hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]`}
                        href={`/product/${product.slug}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <IconBadge variant={styles.badge}>{product.badge}</IconBadge>
                          <span className="text-xs font-semibold text-[var(--muted)]">
                            {product.theme}
                          </span>
                        </div>
                        <div className="grid gap-1">
                          <span className="font-[var(--font-display)] text-lg font-bold tracking-[-0.04em]">
                            {product.title}
                          </span>
                          <p className="text-sm leading-6 text-[var(--muted)]">
                            {product.shortDescription}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-semibold ${styles.text}`}
                        >
                          En voir plus
                          <ArrowRight size={16} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3 border-t border-white/70 pt-4 sm:grid-cols-2">
                {collections.map((collection) => {
                  const styles = getToneStyles(collection.accentTone);

                  return (
                    <Link
                      key={collection.id}
                      className={`group rounded-[var(--radius-lg)] border ${styles.border} ${styles.wash} px-4 py-4 hover:-translate-y-0.5`}
                      href={collection.href}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                          Collection
                        </span>
                        <ArrowRight
                          className={`${styles.text} transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1`}
                          size={16}
                        />
                      </div>
                      <div className="mt-2 grid gap-1">
                        <span className="font-[var(--font-display)] text-lg font-bold tracking-[-0.04em]">
                          {collection.title}
                        </span>
                        <span className="text-sm leading-6 text-[var(--muted)]">
                          {collection.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="surface-panel absolute -bottom-2 right-3 hidden max-w-[16rem] rounded-[var(--radius-lg)] border border-white/80 bg-white/88 p-4 shadow-[var(--shadow-glow)] md:grid">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,95,162,0.14)] text-[var(--accent-strong)]">
                  <HeartHandshake size={18} />
                </div>
                <div className="grid gap-0.5">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Selection douce
                  </span>
                  <span className="text-xs leading-5 text-[var(--muted)]">
                    Chaque box garde sa surprise, jamais sa confusion.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

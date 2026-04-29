import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Price } from "@/components/ui/price";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";
import { getToneStyles } from "@/features/home/tone-styles";

export function HomeFeaturedProductsSection({
  products
}: {
  products: StorefrontProduct[];
}) {
  return (
    <SectionShell className="overflow-hidden">
      <div className="grid gap-8">
        <SectionHeading
          description="Des formats lisibles, un prix TTC clair et des editions qui restent irresistiblement cadeau."
          eyebrow="A offrir"
          title="Les box les plus choisies pour offrir sans trop reflechir."
        />

        <div className="grid gap-5 xl:grid-cols-3">
          {products.map((product) => {
            const styles = getToneStyles(product.accentTone);

            return (
              <article
                key={product.id}
                className={`surface-panel rounded-[calc(var(--radius-xl)+0.15rem)] border ${styles.border} overflow-hidden bg-white/84`}
              >
                <div className={`relative overflow-hidden bg-gradient-to-br ${styles.panel}`}>
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 p-4">
                    <IconBadge icon={<Star size={13} />} variant={styles.badge}>
                      {product.badge.replace("-", " ")}
                    </IconBadge>
                    <span className="rounded-full bg-white/86 px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                      {product.reviewCount} avis
                    </span>
                  </div>
                  <div className="relative aspect-[4/4.2]">
                    <Image
                      alt={product.title}
                      className="object-cover transition duration-500 hover:scale-[1.03]"
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                      src={product.imageUrl}
                    />
                  </div>
                </div>

                <div className="grid gap-5 p-5">
                  <div className="grid gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid gap-1">
                        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                          {product.theme}
                        </span>
                        <h3 className="text-[length:var(--text-h3)]">{product.title}</h3>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--muted)]">
                        {product.rating.toFixed(1)}/5
                      </div>
                    </div>
                    <p className="text-pretty leading-7 text-[var(--muted)]">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="grid gap-3 border-y border-[var(--line)] py-4">
                    {product.highlights.slice(0, 3).map((highlight) => (
                      <div
                        key={highlight.title}
                        className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-start"
                      >
                        <span className={`text-sm font-semibold ${styles.text}`}>
                          {highlight.title}
                        </span>
                        <span className="text-sm leading-6 text-[var(--muted)]">
                          {highlight.description}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="grid gap-1">
                      <Price
                        amount={product.price}
                        compareAt={product.compareAtPrice}
                        currency={product.currency}
                      />
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                        Prix TTC
                      </span>
                    </div>
                    <Link
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.text}`}
                      href={`/product/${product.slug}`}
                    >
                      Voir la box
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

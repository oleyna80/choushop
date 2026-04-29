import Link from "next/link";

import { ProductGrid } from "@/components/shop/product-grid";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { Select } from "@/components/ui/select";
import { TrustChip } from "@/components/ui/trust-chip";
import { sampleCollections } from "@/features/catalog/sample-collections";
import { sampleProducts } from "@/features/catalog/sample-products";
import type { AccentTone } from "@/features/catalog/storefront-types";

export const metadata = {
  title: "Catalogue"
};

const filterChips = [
  "Toutes les box",
  "Petites attentions",
  "Signature pastel",
  "Editions limitees",
  "Cadeaux premium"
];

const collectionVariantMap: Record<
  AccentTone,
  "accent" | "lavender" | "mint" | "peach"
> = {
  accent: "accent",
  lavender: "lavender",
  mint: "mint",
  peach: "peach"
};

export default function ShopPage() {
  const spotlightProduct = sampleProducts[1] ?? sampleProducts[0];

  return (
    <SectionShell className="overflow-hidden" density="tight">
      <div className="relative grid gap-10">
        <div
          className="glow-orb right-[-4rem] top-10 h-36 w-36 md:h-48 md:w-48"
          data-tone="lavender"
        />
        <div
          className="glow-orb bottom-[14rem] left-[-3rem] h-32 w-32 md:h-44 md:w-44"
          data-tone="accent"
        />

        <ProductGrid
          controls={
            <Card className="grid gap-3" variant="soft">
              <label
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                htmlFor="catalog-sort"
              >
                Trier
              </label>
              <Select defaultValue="selection" id="catalog-sort">
                <option value="selection">Selection du moment</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix decroissant</option>
                <option value="popularite">Les plus aimees</option>
              </Select>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Maquette de tri pour parcourir les box plus vite.
              </p>
            </Card>
          }
          intro={
            <div className="grid gap-8">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(17rem,0.95fr)] lg:items-start">
                <div className="grid gap-5">
                  <SectionHeading
                    description="Des formats a offrir ou a s'offrir, avec une ambiance claire et un effet cadeau immediat."
                    eyebrow="Catalogue ChouShop"
                    title="Choisis une box qui ressemble deja au moment que tu veux creer."
                  />
                  <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                    Le catalogue ChouShop reste court, pastel et simple a lire:
                    des box signature, des capsules limitees et des surprises
                    pensees pour une commande mobile rapide.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {filterChips.map((chip, index) => (
                      <button
                        key={chip}
                        aria-pressed={index === 0}
                        className={
                          index === 0
                            ? "focus-ring inline-flex min-h-10 items-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
                            : "focus-ring inline-flex min-h-10 items-center rounded-[var(--radius-pill)] border border-white/70 bg-white/76 px-4 text-sm font-medium text-[var(--muted)] shadow-[var(--shadow-soft)]"
                        }
                        type="button"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <Card className="grid gap-5" variant="floating">
                  <div className="grid gap-3">
                    <Badge variant={collectionVariantMap[spotlightProduct.accentTone]}>
                      Format vedette
                    </Badge>
                    <div className="grid gap-2">
                      <h2 className="text-[length:var(--text-h3)]">
                        {spotlightProduct.title}
                      </h2>
                      <p className="text-base leading-7 text-[var(--muted)]">
                        {spotlightProduct.tagline}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-[var(--muted)]">
                      {spotlightProduct.shortDescription}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {spotlightProduct.highlights.slice(0, 2).map((highlight) => (
                      <TrustChip
                        detail={highlight.description}
                        icon="+"
                        key={highlight.title}
                        title={highlight.title}
                      />
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {sampleCollections.map((collection) => (
                  <Link href={collection.href} key={collection.id}>
                    <Card
                      className="h-full border-white/65 transition-transform hover:-translate-y-1"
                      variant="soft"
                    >
                      <div className="grid gap-3">
                        <Badge variant={collectionVariantMap[collection.accentTone]}>
                          Selection
                        </Badge>
                        <div className="grid gap-2">
                          <h3 className="text-xl">{collection.title}</h3>
                          <p className="text-sm leading-6 text-[var(--muted)]">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          }
          products={sampleProducts}
        />
      </div>
    </SectionShell>
  );
}

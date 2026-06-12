import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductStickyBuy } from "@/components/shop/product-sticky-buy";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TrustChip } from "@/components/ui/trust-chip";
import {
  mapApiProductToStorefront,
} from "@/features/catalog/catalog-mapper";
import {
  getProductBySlug,
  getProductSlugs,
} from "@/server/services/catalog";
import {
  getAccentClassName,
  getProductCareNotes,
  getProductTrustCues
} from "@/features/product/product-detail";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [product.images[0]?.url ?? ""],
    },
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const p = mapApiProductToStorefront(product);

  const accent = getAccentClassName(p.accentTone);
  const trustCues = getProductTrustCues(p);
  const careNotes = getProductCareNotes(p);

  return (
    <>
      <SectionShell className="overflow-hidden pb-28 lg:pb-[var(--space-section)]" density="tight">
        <div className="relative">
          <div
            className="glow-orb right-[-5rem] top-10 h-40 w-40"
            data-tone={p.accentTone === "peach" ? "accent" : p.accentTone}
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-start">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <span className="eyebrow">Fiche produit</span>
                <div className="max-w-3xl">
                  <h1 className="text-[length:var(--text-h1)]">{p.title}</h1>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                    {p.tagline}
                  </p>
                </div>
              </div>

              <ProductGallery
                accentTone={p.accentTone}
                badge={p.badge}
                images={p.gallery}
                theme={p.theme}
                title={p.title}
              />
            </div>

            <ProductStickyBuy product={p} />
          </div>
        </div>
      </SectionShell>

      <SectionShell density="tight">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustCues.map((cue, index) => (
            <TrustChip
              className="min-h-[4.75rem]"
              detail={cue.detail}
              icon={<TrustCueIcon index={index} />}
              key={`${cue.title}-${index}`}
              title={cue.title}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell density="tight">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="grid content-start gap-6">
            <SectionHeading
              description="Un apercu de l'univers de la box pour acheter en confiance, tout en gardant l'effet surprise a l'ouverture."
              eyebrow="Apercu inclus"
              title="Ce que la box peut contenir"
            />

            <div className="grid gap-3">
              {p.includedPreview.map((item, index) => (
                <div
                  className="grid gap-2 border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[auto_1fr]"
                  key={`${item.label}-${index}`}
                >
                  <IconBadge className="w-fit" variant={accent.badgeVariant}>
                    {item.label}
                  </IconBadge>
                  <p className="text-pretty text-sm leading-6 text-[var(--muted)] sm:pt-1">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-5">
              <SectionHeading
                description={p.shortDescription}
                eyebrow="Ambiance"
                title="Une surprise guidee, jamais surchargee"
              />
              <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--foreground)]">
                {p.description}
              </p>
            </div>

            <div
              className={`rounded-[var(--radius-xl)] border border-white/70 bg-gradient-to-br ${accent.washClassName} p-6 shadow-[var(--shadow-soft)]`}
            >
              <div className="grid gap-5 md:grid-cols-2">
                {careNotes.map((note) => (
                  <div
                    className="flex gap-3 rounded-[var(--radius-lg)] bg-white/82 p-4"
                    key={note}
                  >
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${accent.dotClassName}`} />
                    <p className="text-sm leading-6 text-[var(--foreground)]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell density="tight">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14">
          <div className="grid content-start gap-6">
            <SectionHeading
              description="Les informations utiles avant de commander, en gardant le parcours court et clair."
              eyebrow="Infos utiles"
              title="Avant de valider ta box"
            />
            <div className="grid gap-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                Chaque box suit une direction annoncee, mais les references exactes peuvent
                evoluer selon une edition et le stock du moment.
              </p>
              <p>
                Les prix affiches sur ChouShop sont toujours en EUR TTC. La livraison est calculee
                au checkout avant paiement.
              </p>
              <p>
                La preparation est manuelle pour garder une presentation propre, douce et prete a
                offrir des reception.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <SectionHeading eyebrow="FAQ" title="Questions frequentes" />
            <div className="grid gap-3">
              {p.faq.map((item, index) => (
                <details
                  className="surface-panel rounded-[var(--radius-lg)] border border-white/70 bg-white/86 px-5 py-4"
                  key={`${item.question}-${index}`}
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[var(--foreground)] marker:content-none">
                    {item.question}
                  </summary>
                  <p className="pt-3 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

function TrustCueIcon({ index }: { index: number }) {
  const icons = [
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      key="spark"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    </svg>,
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      key="heart"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M12 20s-6.5-4.1-8.4-8A4.8 4.8 0 0 1 12 6.2 4.8 4.8 0 0 1 20.4 12c-1.9 3.9-8.4 8-8.4 8Z" />
    </svg>,
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      key="truck"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M3 7h10v8H3zM13 10h4l3 3v2h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>,
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      key="shield"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M12 3 5 6v5c0 4.2 2.3 7.7 7 10 4.7-2.3 7-5.8 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </svg>
  ];

  return icons[index % icons.length];
}

import { Check, CreditCard, Sparkles, Truck } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { StorefrontProduct } from "@/features/catalog/storefront-types";

const steps = [
  {
    title: "Choisis un mood",
    body: "Mini attention, box signature ou edition plus marquee: la navigation reste simple."
  },
  {
    title: "On garde la surprise",
    body: "Le theme rassure, mais le contenu exact varie pour conserver l'effet cadeau."
  },
  {
    title: "Tu paies puis on prepare",
    body: "Commande via Stripe Checkout, puis expedition suivie des que la box est prete."
  }
];

export function HomeExperienceSection({
  spotlightProduct
}: {
  spotlightProduct: StorefrontProduct;
}) {
  return (
    <SectionShell className="relative">
      <div
        aria-hidden="true"
        className="glow-orb right-[-2%] top-16 h-36 w-36"
        data-tone="mint"
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="grid gap-6">
          <SectionHeading
            description="Une experience courte, lisible et rassurante pour garder le plaisir de la mystery box sans friction inutile."
            eyebrow="Comment ca marche"
            title="Un parcours tout doux, du choix a l'expedition."
          />

          <div className="surface-panel rounded-[var(--radius-xl)] border border-white/70 bg-white/84 p-5">
            <div className="grid gap-5">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-2 border-b border-[var(--line)] pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,95,162,0.14)] text-sm font-semibold text-[var(--accent-strong)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl">{step.title}</h3>
                  </div>
                  <p className="pl-12 text-pretty leading-7 text-[var(--muted)]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-panel rounded-[calc(var(--radius-xl)+0.15rem)] border border-white/70 bg-[rgba(255,255,255,0.82)] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="grid gap-2">
                <IconBadge icon={<Sparkles size={14} />} variant="lavender">
                  Souvent a l&apos;interieur
                </IconBadge>
                <h3 className="text-[length:var(--text-h3)]">
                  {spotlightProduct.title}
                </h3>
                <p className="max-w-lg text-pretty leading-7 text-[var(--muted)]">
                  {spotlightProduct.description}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--muted)]">
                {spotlightProduct.theme}
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {spotlightProduct.includedPreview.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white/76 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(255,95,162,0.12)] text-[var(--accent-strong)]">
                      <Check size={14} />
                    </div>
                    <div className="grid gap-1">
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {item.label}
                      </span>
                      <span className="text-sm leading-6 text-[var(--muted)]">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-panel rounded-[var(--radius-lg)] border border-white/80 bg-white/88 p-4">
              <CreditCard className="text-[var(--accent-strong)]" size={18} />
              <p className="mt-3 text-sm font-semibold">Paiement securise</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Stripe Checkout uniquement.
              </p>
            </div>
            <div className="surface-panel rounded-[var(--radius-lg)] border border-white/80 bg-white/88 p-4">
              <Truck className="text-[var(--accent-strong)]" size={18} />
              <p className="mt-3 text-sm font-semibold">Livraison suivie</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Mise a jour apres expedition.
              </p>
            </div>
            <div className="surface-panel rounded-[var(--radius-lg)] border border-white/80 bg-white/88 p-4">
              <Sparkles className="text-[var(--accent-strong)]" size={18} />
              <p className="mt-3 text-sm font-semibold">Surprise reelle</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Theme annonce, contenu variable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

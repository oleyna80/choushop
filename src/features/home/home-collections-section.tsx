import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { AccentTone } from "@/features/catalog/storefront-types";
import { getToneStyles } from "@/features/home/tone-styles";
import { getAllCollections } from "@/server/services/collections";

export default async function HomeCollectionsSection() {
  const collections = await getAllCollections();

  return (
    <SectionShell density="tight">
      <div className="grid gap-8">
        <SectionHeading
          description="Trois facons simples d'entrer dans l'univers ChouShop sans perdre l'effet surprise."
          eyebrow="Ambiances"
          title="Des collections pensees comme des humeurs a offrir."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {collections.map((collection) => {
            const styles = getToneStyles(collection.accentTone as AccentTone);

            return (
              <Link
                key={collection.id}
                className={`group surface-panel rounded-[var(--radius-xl)] border ${styles.border} bg-gradient-to-br ${styles.panel} p-5 hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]`}
                href="/shop"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    Selection
                  </span>
                  <ArrowRight
                    className={`transition-transform duration-[var(--duration-fast)] ${styles.text} group-hover:translate-x-1`}
                    size={18}
                  />
                </div>
                <div className="mt-14 grid gap-3">
                  <h3 className="text-[length:var(--text-h3)]">{collection.title}</h3>
                  <p className="text-pretty leading-7 text-[var(--muted)]">
                    {collection.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

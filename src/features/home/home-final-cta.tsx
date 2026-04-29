import Link from "next/link";
import { ArrowRight, Gift, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export function HomeFinalCta() {
  return (
    <SectionShell density="tight">
      <div className="surface-panel relative overflow-hidden rounded-[calc(var(--radius-xl)+0.3rem)] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,243,248,0.94),rgba(255,250,247,0.88))] px-5 py-7 shadow-[var(--shadow-raised)] md:px-8 md:py-9">
        <div
          aria-hidden="true"
          className="glow-orb -right-6 top-6 h-28 w-28"
          data-tone="accent"
        />
        <div
          aria-hidden="true"
          className="glow-orb bottom-0 left-6 h-24 w-24"
          data-tone="lavender"
        />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="grid max-w-2xl gap-4">
            <span className="eyebrow">
              <Gift size={14} />
              Derniere touche
            </span>
            <h2 className="text-[length:var(--text-h2)]">
              Une box douce a offrir, meme quand tu n&apos;as pas envie d&apos;hesiter.
            </h2>
            <p className="text-pretty text-base leading-7 text-[var(--muted)]">
              Va droit au shop pour choisir une ambiance, ou consulte la FAQ si
              tu veux comprendre le fonctionnement avant de commander.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg">
              <Link href="/shop">
                Explorer la boutique
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                <MessageCircle size={18} />
                Nous ecrire
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

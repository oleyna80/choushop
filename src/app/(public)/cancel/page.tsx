import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Paiement annule"
};

export default function CancelPage() {
  return (
    <section className="py-20">
      <div className="container max-w-2xl">
        <h1 className="text-5xl font-black">Paiement annule.</h1>
        <p className="mt-5 leading-7 text-[var(--muted)]">
          Aucun paiement n&apos;a ete confirme. Tu peux revenir au panier ou choisir
          une autre box.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link href="/cart">Voir le panier</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/shop">Retour au shop</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

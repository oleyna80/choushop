import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Demande non finalisee"
};

export default function CancelPage() {
  return (
    <section className="py-20">
      <div className="container max-w-2xl">
        <h1 className="text-5xl font-black">Demande non finalisee.</h1>
        <p className="mt-5 leading-7 text-[var(--muted)]">
          Aucun paiement n&apos;est pris sur ce site. Tu peux revenir au panier ou
          envoyer une demande pour recevoir ton lien Vinted.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link href="/cart">Voir le panier</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/catalog">Retour au catalogue</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CheckCircle2, MessageCircle, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderSuccessPage() {
  return (
    <section className="container grid min-h-[64svh] content-center gap-8 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-pink)] text-[var(--primary)]">
        <CheckCircle2 size={38} />
      </div>
      <div className="grid gap-4">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Demande envoyee</p>
        <h1 className="mx-auto max-w-4xl text-[length:var(--text-h1)]">
          On prepare ton lien Vinted personnalise
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
          Ceci est un prototype frontend: aucune demande reelle n&apos;a ete envoyee.
          Dans la version finale, le vendeur confirme la box, cree l&apos;annonce Vinted,
          puis partage le lien de paiement et livraison.
        </p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-3 text-left md:grid-cols-2">
        <NextStep icon={MessageCircle} text="Confirmation du style et du contenu par message." />
        <NextStep icon={PackageCheck} text="Paiement, etiquette et livraison geres par Vinted." />
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/catalog">Voir d&apos;autres box</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/">Retour accueil</Link>
        </Button>
      </div>
    </section>
  );
}

function NextStep({
  icon: Icon,
  text
}: {
  icon: typeof MessageCircle;
  text: string;
}) {
  return (
    <p className="flex gap-3 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-4 font-bold leading-6 shadow-[var(--shadow-soft)]">
      <Icon className="shrink-0 text-[var(--primary)]" size={22} />
      {text}
    </p>
  );
}

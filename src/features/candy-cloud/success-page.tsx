import Link from "next/link";
import { CheckCircle2, MessageCircle, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderSuccessPage() {
  return (
    <section className="container grid min-h-[64svh] content-center gap-8 py-16 text-center relative">
      {/* Background Pastel Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="design-blob design-blob-pink absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] opacity-70 blur-[130px] animate-float-slow" />
      </div>

      {/* Floating Sparkles decoration */}
      <div className="absolute left-[20%] top-[20%] hidden md:block animate-float-gentle opacity-40 text-[var(--primary)] animate-sparkle">
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>
      <div className="absolute right-[22%] bottom-[25%] hidden md:block animate-float-delayed opacity-30 text-[var(--secondary)] animate-sparkle">
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-pink)] text-[var(--primary)] shadow-[0_8px_24px_rgba(232,75,163,0.2)] animate-float-gentle">
        <CheckCircle2 size={38} />
      </div>
      <div className="grid gap-4">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Demande envoyée</p>
        <h1 className="mx-auto max-w-4xl text-[length:var(--text-h1)] font-black leading-[1.1]">
          On prépare ton lien Vinted personnalisé
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--text-muted)] text-pretty">
          Ceci est un prototype frontend : aucune demande réelle n&apos;a été envoyée.
          Dans la version finale, le vendeur confirme la box, crée l&apos;annonce Vinted,
          puis partage le lien de paiement et de livraison.
        </p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-4 text-left md:grid-cols-2">
        <NextStep icon={MessageCircle} text="Confirmation du style et du contenu par message." />
        <NextStep icon={PackageCheck} text="Paiement, étiquette et livraison gérés par Vinted." />
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-row pt-4">
        <Button asChild size="lg">
          <Link href="/catalog">Voir d&apos;autres box</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/">Retour à l&apos;accueil</Link>
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
    <p className="flex gap-3 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5 font-bold leading-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.02] hover:border-pink-200/55">
      <Icon className="shrink-0 text-[var(--primary)]" size={22} />
      {text}
    </p>
  );
}

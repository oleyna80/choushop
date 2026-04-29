import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

const footerLinks = [
  { href: "/legal", label: "Mentions legales" },
  { href: "/terms", label: "CGV" },
  { href: "/privacy", label: "Confidentialite" },
  { href: "/shipping-returns", label: "Livraison & retours" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-[rgba(255,255,255,0.74)] py-12 backdrop-blur-sm">
      <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="grid gap-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,95,162,0.14)] text-[var(--accent-strong)]">
              <Sparkles size={18} />
            </span>
            <div className="grid gap-0.5">
              <p className="font-[var(--font-display)] text-xl font-bold tracking-[-0.04em]">
                ChouShop
              </p>
              <p className="text-sm text-[var(--muted)]">
                Mystery boxes cute, premium et faciles a offrir.
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Des editions pastel preparees pour faire plaisir sans rendre le
            choix complique. Les prix affiches sont en EUR TTC et le paiement
            passe par Stripe Checkout.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span className="rounded-[var(--radius-pill)] border border-white/80 bg-white/82 px-4 py-2">
              France d&apos;abord
            </span>
            <span className="rounded-[var(--radius-pill)] border border-white/80 bg-white/82 px-4 py-2">
              Livraison suivie
            </span>
            <span className="rounded-[var(--radius-pill)] border border-white/80 bg-white/82 px-4 py-2">
              Surprise reelle
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          <nav className="grid gap-3 text-sm font-semibold text-[var(--muted)]">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                className="inline-flex items-center gap-2 hover:text-[var(--foreground)]"
                href={item.href}
              >
                {item.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </nav>

          <p className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <Heart size={14} />
            Service client via la page contact.
          </p>
        </div>
      </div>

      <div className="container mt-8 border-t border-white/70 pt-5">
        <p className="text-sm text-[var(--muted)]">
          ChouShop presente ses box en francais, en EUR TTC, avec des editions
          et contenus variables selon les capsules.
        </p>
      </div>
    </footer>
  );
}

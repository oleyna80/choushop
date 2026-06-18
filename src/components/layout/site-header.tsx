import Link from "next/link";
import { ChevronRight, ShoppingBag, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/catalog", label: "Box" },
  { href: "/#how-it-works", label: "Comment ça marche" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/65 bg-[rgba(255,247,251,0.82)] backdrop-blur-xl">
      <div className="bg-[var(--primary)] px-4 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-white">
        Paiement & livraison via Vinted · Box préparée avec soin en vidéo
      </div>
      <div className="container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            className="surface-panel flex items-center gap-3 rounded-[var(--radius-pill)] border border-white/80 px-4 py-2"
            href="/"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,95,162,0.14)] text-[var(--accent-strong)]">
              <Sparkles size={18} />
            </span>
            <span className="grid gap-0.5">
              <span className="font-[var(--font-display)] text-lg font-bold tracking-normal">
                ChouShop
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Mystery Box
              </span>
            </span>
          </Link>

          <div className="hidden rounded-[var(--radius-pill)] border border-white/70 bg-white/72 px-3 py-2 lg:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              France · Demande ici · Paiement Vinted
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-[var(--radius-pill)] border border-white/70 bg-white/76 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href="/cart">
            <ShoppingBag aria-hidden="true" size={18} />
            Panier
            <ChevronRight aria-hidden="true" size={16} />
          </Link>
        </Button>
      </div>
    </header>
  );
}

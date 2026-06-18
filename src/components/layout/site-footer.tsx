"use client";

import Link from "next/link";
import { Heart, Instagram, Youtube, Compass } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ffe8f2] bg-white py-16 text-[#684fd6]">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.4fr] lg:gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe8f2] text-[#ff7aae] shrink-0">
              <CabbageIcon className="h-6 w-6" />
            </span>
            <div className="grid gap-0">
              <p className="font-[var(--font-logo)] text-lg text-[#ff7aae] leading-none pb-0.5">
                ChouShop
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a788fa] -mt-0.5">
                Mystery Box
              </p>
            </div>
          </div>

          <p className="text-xs font-semibold leading-relaxed text-[#a788fa]">
            La boutique de mystery boxes pensées pour les filles de 14 à 16 ans.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-[#ff7aae] mt-2">
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7fb] border border-[#ffe8f2] hover:bg-[#ffe8f2] transition-all" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7fb] border border-[#ffe8f2] hover:bg-[#ffe8f2] transition-all" aria-label="TikTok">
              <Compass size={16} />
            </a>
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7fb] border border-[#ffe8f2] hover:bg-[#ffe8f2] transition-all" aria-label="Pinterest">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Column 1: Boutique */}
        <div className="grid content-start gap-4">
          <p className="text-xs font-black uppercase tracking-wider text-[#ff7aae]">Boutique</p>
          <nav className="grid gap-2 text-xs font-bold text-[#a788fa]">
            <Link href="/catalog" className="hover:text-[#684fd6] transition-colors">Nos boxes</Link>
            <Link href="/catalog" className="hover:text-[#684fd6] transition-colors">Nouveautés</Link>
            <Link href="/catalog" className="hover:text-[#684fd6] transition-colors">Idées cadeaux</Link>
            <Link href="/catalog" className="hover:text-[#684fd6] transition-colors">Toutes les boxes</Link>
          </nav>
        </div>

        {/* Column 2: Infos */}
        <div className="grid content-start gap-4">
          <p className="text-xs font-black uppercase tracking-wider text-[#ff7aae]">Infos</p>
          <nav className="grid gap-2 text-xs font-bold text-[#a788fa]">
            <Link href="/#how-it-works" className="hover:text-[#684fd6] transition-colors">À propos</Link>
            <Link href="/" className="hover:text-[#684fd6] transition-colors">Avis clientes</Link>
            <Link href="/faq" className="hover:text-[#684fd6] transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-[#684fd6] transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Column 3: Légal */}
        <div className="grid content-start gap-4">
          <p className="text-xs font-black uppercase tracking-wider text-[#ff7aae]">Légal</p>
          <nav className="grid gap-2 text-xs font-bold text-[#a788fa]">
            <Link href="/legal" className="hover:text-[#684fd6] transition-colors">Mentions légales</Link>
            <Link href="/terms" className="hover:text-[#684fd6] transition-colors">CGV</Link>
            <Link href="/privacy" className="hover:text-[#684fd6] transition-colors">Politique de confidentialité</Link>
          </nav>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div className="rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-[#fff7fb] p-5 shadow-sm flex flex-col gap-3">
          <div className="grid gap-1">
            <p className="text-sm font-black text-[#684fd6] flex items-center gap-1.5">
              Ne manque rien !
            </p>
            <p className="text-[10px] font-semibold text-[#a788fa] leading-relaxed">
              Nouveautés, offres et surprises rien que pour toi 💌
            </p>
          </div>
          <form className="grid gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Ton email"
              className="w-full text-xs font-semibold px-3 py-2 border border-[#c4b5fd] rounded-full focus:outline-none focus:border-[#ff7aae] bg-white"
              required
            />
            <button
              type="submit"
              className="w-full min-h-[2.2rem] rounded-full bg-[#ff7aae] text-xs font-bold text-white shadow-sm hover:bg-[#ff5b9b] transition-colors"
            >
              Je m&apos;inscris
            </button>
          </form>
        </div>
      </div>

      <div className="container mt-12 border-t border-[#ffe8f2] pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs font-bold text-[#a788fa]">
        <p>© {new Date().getFullYear()} ChouShop – Tous droits réservés</p>
        <p className="flex items-center gap-1">
          Paiement & livraison via Vinted
          <Heart size={10} className="text-[#ff7aae]" fill="currentColor" />
        </p>
      </div>
    </footer>
  );
}

function CabbageIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Outer Leaf */}
      <path
        d="M 30,70 C 12,65 10,40 30,28 C 42,20 50,28 50,42 C 40,55 35,68 30,70 Z"
        fill="#FFE8F2"
        stroke="#FF7AAE"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Outer Leaf */}
      <path
        d="M 70,70 C 88,65 90,40 70,28 C 58,20 50,28 50,42 C 60,55 65,68 70,70 Z"
        fill="#FFE8F2"
        stroke="#FF7AAE"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central Inner Heart Leaf */}
      <path
        d="M 50,78 C 32,78 35,52 50,38 C 65,52 68,78 50,78 Z"
        fill="#B8EAD9"
        stroke="#684FD6"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tiny overlapping opening folds inside the heart */}
      <path
        d="M 45,50 C 45,45 55,42 55,48"
        stroke="#684FD6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 55,58 C 55,54 48,50 48,56"
        stroke="#684FD6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Sparkles on the side */}
      <path
        d="M 82,22 L 85,26 L 90,27 L 85,28 L 82,32 L 80,28 L 75,27 L 80,26 Z"
        fill="#FFD6A5"
      />
    </svg>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, ShoppingBag, ShieldCheck, Video, Heart } from "lucide-react";

import { readCart } from "@/features/cart/cart-client";

const navItems = [
  { href: "/catalog", label: "Box" },
  { href: "/#how-it-works", label: "Comment ça marche" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = readCart();
        const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (e) {
        console.error(e);
      }
    };

    updateCount();
    window.addEventListener("choushop:cart", updateCount);
    return () => window.removeEventListener("choushop:cart", updateCount);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#ffe8f2] bg-white/90 backdrop-blur-xl">
      {/* Top Banner */}
      <div className="border-b border-[#ffe8f2] bg-[#fff7fb] px-3 py-1.5 text-center text-[11px] font-bold text-[#684fd6] sm:px-4 sm:py-2 sm:text-xs">
        <div className="container flex items-center justify-center gap-4 overflow-x-auto whitespace-nowrap sm:gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#ff7aae]" />
            <span className="hidden sm:inline">Paiement & livraison via Vinted</span>
            <span className="sm:hidden">Vinted sécurisé</span>
          </span>
          <span className="hidden md:inline text-[#c4b5fd]">|</span>
          <span className="flex items-center gap-1.5">
            <Video size={14} className="text-[#ff7aae]" />
            <span className="hidden sm:inline">Toutes nos boxes sont préparées en vidéo</span>
            <span className="sm:hidden">Préparées en vidéo</span>
          </span>
          <span className="hidden md:inline text-[#c4b5fd]">|</span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Heart size={14} className="text-[#ff7aae]" />
            Livraison rapide & soignée
          </span>
        </div>
      </div>

      <div className="container flex min-h-16 items-center justify-between gap-3 py-2.5 sm:min-h-[4.5rem] sm:gap-4 sm:py-3">
        <div className="flex items-center gap-3">
          <Link
            className="relative block h-11 w-[168px] shrink-0 transition-transform hover:scale-[1.02] sm:h-[54px] sm:w-[218px]"
            href="/"
            aria-label="ChouShop"
          >
            <Image
              src="/images/choushop-logo.png"
              alt="ChouShop"
              width={1281}
              height={381}
              priority
              className="h-full w-full object-contain"
            />
          </Link>

          <div className="hidden rounded-[var(--radius-pill)] border border-[#ffe8f2] bg-[#fff7fb] px-3 py-1.5 lg:flex">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#a788fa]">
              France · Demande ici · Paiement Vinted
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-[var(--radius-pill)] border border-[#ffe8f2] bg-white/60 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-[var(--radius-pill)] px-4 py-2 text-sm font-bold text-[#a788fa] transition-colors hover:bg-[#ffe8f2] hover:text-[#684fd6]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#ff7aae] bg-white px-3 text-sm font-bold text-[#684fd6] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ffe8f2] sm:min-h-11 sm:gap-2 sm:px-5"
        >
          <ShoppingBag size={16} className="text-[#ff7aae]" />
          <span>Panier</span>
          <span className="rounded-full bg-[#ffe8f2] px-2 py-0.5 text-xs font-extrabold text-[#ff7aae]">
            ({cartCount})
          </span>
          <ChevronRight size={14} className="text-[#ff7aae] -mr-1" />
        </Link>
      </div>
    </header>
  );
}

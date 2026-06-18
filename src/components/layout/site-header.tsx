"use client";

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
      <div className="bg-[#fff7fb] border-b border-[#ffe8f2] px-4 py-2 text-center text-xs font-bold text-[#684fd6]">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#ff7aae]" />
            Paiement & livraison via Vinted
          </span>
          <span className="hidden md:inline text-[#c4b5fd]">|</span>
          <span className="flex items-center gap-1.5">
            <Video size={14} className="text-[#ff7aae]" />
            Toutes nos boxes sont préparées en vidéo
          </span>
          <span className="hidden md:inline text-[#c4b5fd]">|</span>
          <span className="flex items-center gap-1.5">
            <Heart size={14} className="text-[#ff7aae]" />
            Livraison rapide & soignée
          </span>
        </div>
      </div>

      <div className="container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center gap-2 px-2 py-1 transition-transform hover:scale-[1.02]"
            href="/"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe8f2] text-[#ff7aae] shrink-0">
              <CabbageIcon className="h-7 w-7" />
            </span>
            <span className="grid gap-0">
              <span className="font-[var(--font-logo)] text-xl text-[#ff7aae] leading-none pb-0.5">
                ChouShop
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a788fa] -mt-0.5">
                Mystery Box
              </span>
            </span>
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
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#ff7aae] bg-white px-5 text-sm font-bold text-[#684fd6] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#ffe8f2]"
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

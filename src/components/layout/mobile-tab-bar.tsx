"use client";

import Link from "next/link";
import { HelpCircle, Home, Send, ShoppingBag, Store } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/catalog", label: "Box", icon: Store },
  { href: "/cart", label: "Panier", icon: ShoppingBag },
  { href: "/order", label: "Demande", icon: Send },
  { href: "/faq", label: "Aide", icon: HelpCircle }
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
      <div className="pointer-events-auto mx-auto grid max-w-lg grid-cols-5 rounded-[calc(var(--radius-xl)+0.2rem)] border border-white/80 bg-[rgba(255,255,255,0.9)] p-2 shadow-[var(--shadow-raised)] backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              className={cn(
                "focus-ring grid place-items-center gap-1 rounded-[var(--radius-lg)] px-2 py-2 text-center text-[0.72rem] font-semibold text-[var(--muted)]",
                active
                  ? "bg-[var(--surface-pink)] text-[var(--primary)]"
                  : "hover:bg-white/82 hover:text-[var(--foreground)]"
              )}
              href={item.href}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

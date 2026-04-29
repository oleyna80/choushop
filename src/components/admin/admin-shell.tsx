import Link from "next/link";

const adminNav = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/shipping", label: "Shipping" },
  { href: "/admin/events", label: "Events" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <aside className="border-b border-[var(--line)]">
        <div className="container flex h-16 items-center justify-between">
          <Link className="text-lg font-black" href="/admin">
            ChouShop Admin
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-bold text-[var(--muted)]">
            {adminNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="container py-10">{children}</main>
    </div>
  );
}

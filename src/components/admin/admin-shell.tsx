import Link from "next/link";

import { signOut } from "@/auth";

const adminNav = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/shipping", label: "Shipping" },
  { href: "/admin/events", label: "Events" },
];

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string | null;
}) {
  return (
    <div className="min-h-screen bg-white">
      <aside className="border-b border-[var(--line)]">
        <div className="container flex h-16 items-center justify-between">
          <Link className="text-lg font-black" href="/admin">
            ChouShop Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-bold text-[var(--muted)]">
            {adminNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {userEmail && (
              <span className="ml-4 text-xs text-[var(--muted)]">
                {userEmail}
              </span>
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button className="text-xs text-[var(--muted)] hover:underline" type="submit">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </aside>
      <main className="container py-10">{children}</main>
    </div>
  );
}

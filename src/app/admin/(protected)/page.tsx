import Link from "next/link";

const sections = [
  {
    href: "/admin/products",
    title: "Products",
    body: "Create, publish and manage stock."
  },
  {
    href: "/admin/orders",
    title: "Orders",
    body: "Review paid orders and update fulfillment."
  },
  {
    href: "/admin/shipping",
    title: "Shipping",
    body: "Manage fixed France and EU methods."
  },
  {
    href: "/admin/events",
    title: "Events",
    body: "Read-only event log for future agents."
  }
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-4xl font-black">Operations</h1>
      <p className="mt-3 text-[var(--muted)]">
        MVP-0 admin shell. Authentication and RBAC are wired as a scoped next
        task before go-live.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            className="rounded-md border border-[var(--line)] p-5 transition hover:border-[var(--accent)]"
            href={section.href}
            key={section.href}
          >
            <h2 className="text-xl font-black">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {section.body}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

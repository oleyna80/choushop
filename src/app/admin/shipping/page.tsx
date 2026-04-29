import { prisma } from "@/lib/db/prisma";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminShippingPage() {
  const methods = await prisma.shippingMethod.findMany({
    orderBy: [{ zone: "asc" }, { sortOrder: "asc" }]
  });

  return (
    <div>
      <h1 className="text-4xl font-black">Shipping methods</h1>
      <p className="mt-3 text-[var(--muted)]">
        Countries are stored as a Postgres text array for MVP-0.
      </p>
      <div className="mt-8 overflow-hidden rounded-md border border-[var(--line)]">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-[var(--background)] text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Zone</th>
              <th className="p-4">Countries</th>
              <th className="p-4">Price</th>
              <th className="p-4">Active</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr className="border-t border-[var(--line)]" key={method.id}>
                <td className="p-4 font-bold">{method.name}</td>
                <td className="p-4">{method.zone}</td>
                <td className="p-4">{method.countries.join(", ")}</td>
                <td className="p-4">{formatMoney(method.price, method.currency)}</td>
                <td className="p-4">{method.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
            {methods.length === 0 ? (
              <tr>
                <td className="p-4 text-[var(--muted)]" colSpan={5}>
                  No shipping methods yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

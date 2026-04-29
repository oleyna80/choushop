import { prisma } from "@/lib/db/prisma";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-4xl font-black">Products</h1>
      <div className="mt-8 overflow-hidden rounded-md border border-[var(--line)]">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-[var(--background)] text-left">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price TTC</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-t border-[var(--line)]" key={product.id}>
                <td className="p-4 font-bold">{product.title}</td>
                <td className="p-4">{product.status}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{formatMoney(product.price, product.currency)}</td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td className="p-4 text-[var(--muted)]" colSpan={4}>
                  No products yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

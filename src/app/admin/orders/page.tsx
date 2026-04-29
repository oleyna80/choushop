import { prisma } from "@/lib/db/prisma";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-4xl font-black">Orders</h1>
      <div className="mt-8 overflow-hidden rounded-md border border-[var(--line)]">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-[var(--background)] text-left">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Fulfillment</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="border-t border-[var(--line)]" key={order.id}>
                <td className="p-4 font-bold">{order.orderNumber}</td>
                <td className="p-4">{order.customerEmail}</td>
                <td className="p-4">{order.paymentStatus}</td>
                <td className="p-4">
                  {order.stockIssue ? "ON_HOLD_STOCK" : order.fulfillmentStatus}
                </td>
                <td className="p-4">{formatMoney(order.totalAmount, order.currency)}</td>
              </tr>
            ))}
            {orders.length === 0 ? (
              <tr>
                <td className="p-4 text-[var(--muted)]" colSpan={5}>
                  No orders yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

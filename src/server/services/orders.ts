import {
  type FulfillmentStatus,
  type PaymentStatus,
  type Prisma,
  type PrismaClient
} from "@/generated/prisma";

import { writeEvent } from "@/server/services/events";

export function createOrderNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `CHOU-${stamp}-${suffix}`;
}

export async function invalidatePendingOrdersForCart(
  db: PrismaClient | Prisma.TransactionClient,
  cartId: string
) {
  return db.order.updateMany({
    where: {
      cartId,
      paymentStatus: "PENDING",
      invalidatedAt: null
    },
    data: {
      invalidatedAt: new Date()
    }
  });
}

export async function changeOrderStatus(
  db: PrismaClient,
  input: {
    orderId: string;
    paymentStatus?: PaymentStatus;
    fulfillmentStatus?: FulfillmentStatus;
    source: string;
  }
) {
  const order = await db.order.update({
    where: { id: input.orderId },
    data: {
      paymentStatus: input.paymentStatus,
      fulfillmentStatus: input.fulfillmentStatus
    }
  });

  await writeEvent(db, {
    eventType: "order.status_changed",
    entityType: "order",
    entityId: order.id,
    payloadJson: {
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      fulfillmentStatus: order.fulfillmentStatus
    },
    source: input.source
  });

  return order;
}

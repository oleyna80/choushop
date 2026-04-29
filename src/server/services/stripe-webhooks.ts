import type Stripe from "stripe";

import { prisma } from "@/lib/db/prisma";
import { writeEvent } from "@/server/services/events";
import { sendOrderPaidEmail } from "@/server/services/email";

export async function markStripeEventReceived(event: Stripe.Event, rawPayload: unknown) {
  const existing = await prisma.webhookEvent.findUnique({
    where: { providerEventId: event.id }
  });

  if (existing?.processedAt) {
    return { duplicate: true };
  }

  await prisma.webhookEvent.upsert({
    where: { providerEventId: event.id },
    create: {
      provider: "stripe",
      providerEventId: event.id,
      eventType: event.type,
      payloadJson: rawPayload as object
    },
    update: {
      eventType: event.type,
      payloadJson: rawPayload as object
    }
  });

  return { duplicate: false };
}

export async function markStripeEventProcessed(event: Stripe.Event) {
  await prisma.webhookEvent.update({
    where: { providerEventId: event.id },
    data: { processedAt: new Date() }
  });
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    return;
  }

  const updated = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        id: orderId,
        stripeCheckoutSessionId: session.id,
        invalidatedAt: null
      },
      include: { items: true }
    });

    if (!order || order.paymentStatus === "PAID") {
      return null;
    }

    const stockIssues: string[] = [];

    for (const item of order.items) {
      if (!item.productId) {
        stockIssues.push(`${item.productTitleSnapshot}: product missing`);
        continue;
      }

      const result = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: {
            gte: item.quantity
          }
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });

      if (result.count !== 1) {
        stockIssues.push(`${item.productTitleSnapshot}: insufficient stock`);
      }
    }

    const stockIssue = stockIssues.length > 0;
    const saved = await tx.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        fulfillmentStatus: stockIssue ? "ON_HOLD" : "UNFULFILLED",
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
        stockIssue,
        stockIssueReason: stockIssue ? stockIssues.join("; ") : null
      }
    });

    await writeEvent(tx, {
      eventType: "order.paid",
      entityType: "order",
      entityId: saved.id,
      payloadJson: {
        orderNumber: saved.orderNumber,
        stockIssue: saved.stockIssue,
        stripeCheckoutSessionId: session.id
      },
      source: "stripe"
    });

    return saved;
  });

  if (updated) {
    await sendOrderPaidEmail({
      to: updated.customerEmail,
      orderNumber: updated.orderNumber
    });
  }
}

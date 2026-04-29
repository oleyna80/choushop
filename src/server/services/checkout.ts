import type { Prisma } from "@/generated/prisma";

import { prisma } from "@/lib/db/prisma";
import { getStripe } from "@/lib/stripe/client";
import type { CheckoutSessionInput } from "@/lib/validation/checkout";
import { taxFromTtc } from "@/lib/money";
import { writeEvent } from "@/server/services/events";
import { createOrderNumber, invalidatePendingOrdersForCart } from "@/server/services/orders";
import { findCheckoutShippingMethod } from "@/server/services/shipping";

export class CheckoutError extends Error {
  constructor(
    message: string,
    readonly status = 400
  ) {
    super(message);
  }
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function createCheckoutSession(input: CheckoutSessionInput) {
  const productIds = [...new Set(input.items.map((item) => item.productId))];
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      status: "ACTIVE"
    },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
        take: 1
      }
    }
  });

  const productById = new Map(products.map((product) => [product.id, product]));

  if (products.length !== productIds.length) {
    throw new CheckoutError("Un produit du panier n'est plus disponible.");
  }

  const shippingMethod = await findCheckoutShippingMethod(prisma, {
    shippingMethodId: input.shippingMethodId,
    country: input.shippingAddress.country
  });

  if (!shippingMethod) {
    throw new CheckoutError("Option de livraison indisponible.");
  }

  const orderItems = input.items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) {
      throw new CheckoutError("Produit introuvable.");
    }

    if (product.stock < item.quantity) {
      throw new CheckoutError(`${product.title} n'a pas assez de stock.`);
    }

    return {
      product,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = 0;
  const totalAmount = subtotal + shippingMethod.price - discountAmount;
  const taxRateSnapshot = orderItems[0]?.product.taxRate ?? 2000;
  const taxAmount = taxFromTtc(totalAmount, taxRateSnapshot);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const order = await prisma.$transaction(async (tx) => {
    await invalidatePendingOrdersForCart(tx, input.cartId);

    const created = await tx.order.create({
      data: {
        orderNumber: createOrderNumber(),
        cartId: input.cartId,
        customerEmail: input.customer.email,
        customerName: input.customer.name,
        phone: input.customer.phone || null,
        shippingAddressJson: input.shippingAddress as Prisma.InputJsonValue,
        paymentStatus: "PENDING",
        fulfillmentStatus: "UNFULFILLED",
        currency: "EUR",
        subtotal,
        shippingAmount: shippingMethod.price,
        taxAmount,
        taxRateSnapshot,
        discountCode: null,
        discountAmount,
        totalAmount,
        shippingMethodId: shippingMethod.id,
        checkoutExpiresAt: expiresAt,
        termsAcceptedAt: new Date(),
        termsVersion: input.termsVersion,
        items: {
          create: orderItems.map((item) => ({
            productId: item.product.id,
            productTitleSnapshot: item.product.title,
            productImageSnapshot: item.product.images[0]?.url ?? null,
            unitPrice: item.product.price,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            taxRateSnapshot: item.product.taxRate
          }))
        }
      },
      include: { items: true }
    });

    await writeEvent(tx, {
      eventType: "order.created",
      entityType: "order",
      entityId: created.id,
      payloadJson: {
        orderNumber: created.orderNumber,
        cartId: created.cartId,
        totalAmount: created.totalAmount
      },
      source: "checkout"
    });

    return created;
  });

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.customer.email,
    line_items: orderItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: item.product.price,
        product_data: {
          name: item.product.title,
          images: item.product.images[0]?.url ? [item.product.images[0].url] : undefined
        },
        tax_behavior: "inclusive"
      }
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: shippingMethod.name,
          fixed_amount: {
            amount: shippingMethod.price,
            currency: "eur"
          }
        }
      }
    ],
    success_url: `${getAppUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getAppUrl()}/cancel`,
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      cartId: order.cartId
    },
    payment_intent_data: {
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber
      }
    }
  });

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: {
        stripeCheckoutSessionId: session.id,
        checkoutExpiresAt: session.expires_at
          ? new Date(session.expires_at * 1000)
          : expiresAt
      }
    });

    await writeEvent(tx, {
      eventType: "checkout.started",
      entityType: "order",
      entityId: order.id,
      payloadJson: {
        orderNumber: order.orderNumber,
        stripeCheckoutSessionId: session.id
      },
      source: "stripe"
    });
  });

  if (!session.url) {
    throw new CheckoutError("Stripe Checkout n'a pas retourne d'URL.", 502);
  }

  return { orderId: order.id, url: session.url };
}

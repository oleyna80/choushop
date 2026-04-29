import type { FulfillmentStatus, PaymentStatus } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireInternalAccess } from "@/lib/auth/internal";
import { prisma } from "@/lib/db/prisma";
import { sendOrderCancelledEmail } from "@/server/services/email";
import { changeOrderStatus } from "@/server/services/orders";

const statusSchema = z.object({
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
  fulfillmentStatus: z
    .enum([
      "UNFULFILLED",
      "PROCESSING",
      "PACKED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "ON_HOLD"
    ])
    .optional()
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const { id } = await params;
  const parsed = statusSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid status payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const order = await changeOrderStatus(prisma, {
    orderId: id,
    paymentStatus: parsed.data.paymentStatus as PaymentStatus | undefined,
    fulfillmentStatus: parsed.data.fulfillmentStatus as FulfillmentStatus | undefined,
    source: "internal-api"
  });

  if (order.paymentStatus === "PAID" && order.fulfillmentStatus === "CANCELLED") {
    await sendOrderCancelledEmail({
      to: order.customerEmail,
      orderNumber: order.orderNumber
    });
  }

  return NextResponse.json({ order });
}

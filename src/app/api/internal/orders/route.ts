import { NextRequest, NextResponse } from "next/server";

import { requireInternalAccess } from "@/lib/auth/internal";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const orders = await prisma.order.findMany({
    include: {
      items: true,
      shipment: true,
      shippingMethod: true
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return NextResponse.json({ orders });
}

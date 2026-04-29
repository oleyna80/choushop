import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { orderBy: { sortOrder: "asc" } }
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });

  return NextResponse.json({ products });
}

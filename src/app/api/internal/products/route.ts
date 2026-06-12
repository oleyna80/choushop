import { NextRequest, NextResponse } from "next/server";

import { requireInternalAccess } from "@/lib/auth/internal";
import { productCreateSchema } from "@/lib/validation/product";
import { createProduct, getAllProductsForAdmin } from "@/server/services/catalog";

export async function GET(request: NextRequest) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const products = await getAllProductsForAdmin();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const parsed = productCreateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const product = await createProduct(parsed.data);

  return NextResponse.json({ product }, { status: 201 });
}

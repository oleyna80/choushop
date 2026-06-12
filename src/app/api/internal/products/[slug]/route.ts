import { NextRequest, NextResponse } from "next/server";

import { requireInternalAccess } from "@/lib/auth/internal";
import { productUpdateSchema } from "@/lib/validation/product";
import { updateProduct } from "@/server/services/catalog";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const { slug } = await params;
  const parsed = productUpdateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const product = await updateProduct(slug, parsed.data);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}

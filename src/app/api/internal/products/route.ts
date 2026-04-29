import type { ProductStatus, ProductType } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireInternalAccess } from "@/lib/auth/internal";
import { prisma } from "@/lib/db/prisma";
import { writeEvent } from "@/server/services/events";

const productCreateSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  shortDescription: z.string().min(2),
  description: z.string().min(2),
  type: z.enum(["FIXED_BOX", "THEME_BOX", "LIMITED_BOX"]),
  theme: z.string().optional(),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().min(0).optional(),
  currency: z.literal("EUR").default("EUR"),
  taxRate: z.number().int().min(0).default(2000),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional(),
  weight: z.number().int().min(0).optional(),
  images: z.array(z.object({ url: z.string().url(), alt: z.string() })).default([])
});

export async function GET(request: NextRequest) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const products = await prisma.product.findMany({
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" }
  });

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

  const product = await prisma.product.create({
    data: {
      slug: parsed.data.slug,
      title: parsed.data.title,
      shortDescription: parsed.data.shortDescription,
      description: parsed.data.description,
      type: parsed.data.type as ProductType,
      theme: parsed.data.theme,
      price: parsed.data.price,
      compareAtPrice: parsed.data.compareAtPrice,
      currency: parsed.data.currency,
      taxRate: parsed.data.taxRate,
      status: parsed.data.status as ProductStatus,
      featured: parsed.data.featured,
      stock: parsed.data.stock,
      sku: parsed.data.sku,
      weight: parsed.data.weight,
      images: {
        create: parsed.data.images.map((image, index) => ({
          url: image.url,
          alt: image.alt,
          sortOrder: index
        }))
      }
    }
  });

  await writeEvent(prisma, {
    eventType: "product.created",
    entityType: "product",
    entityId: product.id,
    payloadJson: { slug: product.slug, title: product.title },
    source: "internal-api"
  });

  return NextResponse.json({ product }, { status: 201 });
}

import type { ProductStatus, ProductType } from "@/generated/prisma";

import { prisma } from "@/lib/db/prisma";
import type { ProductCreateInput, ProductUpdateInput } from "@/lib/validation/product";
import { writeEvent } from "@/server/services/events";

export async function getAllProducts() {
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getAllProductsForAdmin() {
  return prisma.product.findMany({
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getProductSlugs() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return products.map((p) => p.slug);
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { status: "ACTIVE", featured: true },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(input: ProductCreateInput) {
  const product = await prisma.product.create({
    data: {
      slug: input.slug,
      title: input.title,
      shortDescription: input.shortDescription,
      description: input.description,
      type: input.type as ProductType,
      theme: input.theme,
      price: input.price,
      compareAtPrice: input.compareAtPrice,
      currency: input.currency,
      taxRate: input.taxRate,
      status: input.status as ProductStatus,
      featured: input.featured,
      stock: input.stock,
      sku: input.sku,
      weight: input.weight,
      images: {
        create: input.images.map((image, index) => ({
          url: image.url,
          alt: image.alt,
          sortOrder: index,
        })),
      },
    },
  });

  await writeEvent(prisma, {
    eventType: "product.created",
    entityType: "product",
    entityId: product.id,
    payloadJson: { slug: product.slug, title: product.title },
    source: "internal-api",
  });

  return product;
}

export async function updateProduct(slug: string, input: ProductUpdateInput) {
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (!existing) return null;

  const product = await prisma.product.update({
    where: { id: existing.id },
    data: {
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.title !== undefined && { title: input.title }),
      ...(input.shortDescription !== undefined && {
        shortDescription: input.shortDescription,
      }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.type !== undefined && { type: input.type as ProductType }),
      ...(input.theme !== undefined && { theme: input.theme }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.compareAtPrice !== undefined && {
        compareAtPrice: input.compareAtPrice,
      }),
      ...(input.currency !== undefined && { currency: input.currency }),
      ...(input.taxRate !== undefined && { taxRate: input.taxRate }),
      ...(input.status !== undefined && { status: input.status as ProductStatus }),
      ...(input.featured !== undefined && { featured: input.featured }),
      ...(input.stock !== undefined && { stock: input.stock }),
      ...(input.sku !== undefined && { sku: input.sku }),
      ...(input.weight !== undefined && { weight: input.weight }),
      ...(input.images !== undefined && {
        images: {
          deleteMany: {},
          create: input.images.map((image, index) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: index,
          })),
        },
      }),
    },
  });

  await writeEvent(prisma, {
    eventType: "product.updated",
    entityType: "product",
    entityId: product.id,
    payloadJson: { slug: product.slug, title: product.title },
    source: "internal-api",
  });

  return product;
}

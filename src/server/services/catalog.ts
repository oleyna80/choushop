import { prisma } from "@/lib/db/prisma";

export async function getAllProducts() {
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
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

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../src/generated/prisma";

import { sampleProducts } from "../src/features/catalog/sample-products";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString })
});

async function main() {
  for (const product of sampleProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        slug: product.slug,
        title: product.title,
        shortDescription: product.shortDescription,
        description: product.description,
        type: product.type,
        theme: product.theme,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        currency: product.currency,
        taxRate: product.taxRate,
        status: "ACTIVE",
        featured: product.featured,
        stock: product.stock
      },
      create: {
        id: product.id,
        slug: product.slug,
        title: product.title,
        shortDescription: product.shortDescription,
        description: product.description,
        type: product.type,
        theme: product.theme,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        currency: product.currency,
        taxRate: product.taxRate,
        status: "ACTIVE",
        featured: product.featured,
        stock: product.stock,
        images: {
          create: {
            url: product.imageUrl,
            alt: product.title,
            sortOrder: 0
          }
        }
      }
    });
  }

  await prisma.shippingMethod.upsert({
    where: { id: "fr-standard" },
    update: {
      name: "France standard",
      description: "Livraison standard en France metropolitaine.",
      price: 490,
      currency: "EUR",
      zone: "FR",
      countries: ["FR"],
      isActive: true,
      sortOrder: 10
    },
    create: {
      id: "fr-standard",
      name: "France standard",
      description: "Livraison standard en France metropolitaine.",
      price: 490,
      currency: "EUR",
      zone: "FR",
      countries: ["FR"],
      isActive: true,
      sortOrder: 10
    }
  });

  await prisma.shippingMethod.upsert({
    where: { id: "fr-tracked" },
    update: {
      name: "France suivie",
      description: "Livraison suivie en France metropolitaine.",
      price: 690,
      currency: "EUR",
      zone: "FR",
      countries: ["FR"],
      isActive: true,
      sortOrder: 20
    },
    create: {
      id: "fr-tracked",
      name: "France suivie",
      description: "Livraison suivie en France metropolitaine.",
      price: 690,
      currency: "EUR",
      zone: "FR",
      countries: ["FR"],
      isActive: true,
      sortOrder: 20
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

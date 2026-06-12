import { prisma } from "@/lib/db/prisma";

export async function getAllCollections() {
  return prisma.collection.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

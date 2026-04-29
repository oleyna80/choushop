import type { PrismaClient } from "@/generated/prisma";

export async function findCheckoutShippingMethod(
  db: PrismaClient,
  input: {
    shippingMethodId: string;
    country: string;
  }
) {
  return db.shippingMethod.findFirst({
    where: {
      id: input.shippingMethodId,
      isActive: true,
      countries: {
        has: input.country
      }
    }
  });
}

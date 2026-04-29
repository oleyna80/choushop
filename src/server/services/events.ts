import type { Prisma, PrismaClient } from "@/generated/prisma";

export async function writeEvent(
  db: PrismaClient | Prisma.TransactionClient,
  input: {
    eventType: string;
    entityType: string;
    entityId: string;
    payloadJson: Prisma.InputJsonValue;
    source: string;
  }
) {
  return db.eventLog.create({
    data: {
      eventType: input.eventType,
      entityType: input.entityType,
      entityId: input.entityId,
      payloadJson: input.payloadJson,
      source: input.source
    }
  });
}

import { NextRequest, NextResponse } from "next/server";

import { requireInternalAccess } from "@/lib/auth/internal";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  const denied = requireInternalAccess(request);
  if (denied) return denied;

  const events = await prisma.eventLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200
  });

  return NextResponse.json({ events });
}

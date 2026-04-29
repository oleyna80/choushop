import type { NextRequest } from "next/server";

export function requireInternalAccess(request: NextRequest) {
  const expected = process.env.INTERNAL_API_SECRET;

  if (!expected) {
    return Response.json(
      { error: "INTERNAL_API_SECRET is not configured." },
      { status: 500 }
    );
  }

  const received = request.headers.get("x-internal-secret");

  if (received !== expected) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}

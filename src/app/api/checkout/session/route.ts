import { NextResponse } from "next/server";

import { checkoutSessionSchema } from "@/lib/validation/checkout";
import {
  CheckoutError,
  createCheckoutSession
} from "@/server/services/checkout";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = checkoutSessionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Checkout payload invalide.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const session = await createCheckoutSession(parsed.data);
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error(error);
    return NextResponse.json({ error: "Checkout indisponible." }, { status: 500 });
  }
}

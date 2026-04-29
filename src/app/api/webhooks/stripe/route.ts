import { NextResponse } from "next/server";

import { getStripe } from "@/lib/stripe/client";
import {
  handleCheckoutSessionCompleted,
  markStripeEventProcessed,
  markStripeEventReceived
} from "@/server/services/stripe-webhooks";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Stripe webhook not configured." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const received = await markStripeEventReceived(event, JSON.parse(rawBody));

  if (received.duplicate) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (event.type === "checkout.session.completed") {
    await handleCheckoutSessionCompleted(event.data.object);
  }

  await markStripeEventProcessed(event);

  return NextResponse.json({ received: true });
}

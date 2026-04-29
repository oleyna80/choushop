import Link from "next/link";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Commande recue"
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const order = sessionId
    ? await prisma.order.findUnique({
        where: { stripeCheckoutSessionId: sessionId },
        select: {
          orderNumber: true,
          paymentStatus: true,
          fulfillmentStatus: true,
          customerEmail: true
        }
      })
    : null;

  return (
    <section className="py-20">
      <div className="container max-w-2xl">
        <p className="text-sm font-black uppercase tracking-normal text-[var(--accent)]">
          Merci
        </p>
        <h1 className="mt-3 text-5xl font-black">Commande recue.</h1>
        {order?.paymentStatus === "PAID" ? (
          <p className="mt-5 leading-7 text-[var(--muted)]">
            La commande {order.orderNumber} est confirmee. Un email a ete
            envoye a {order.customerEmail}.
          </p>
        ) : order ? (
          <p className="mt-5 leading-7 text-[var(--muted)]">
            Le paiement est en cours de confirmation. Cette page se mettra a
            jour apres traitement du webhook Stripe.
          </p>
        ) : (
          <p className="mt-5 leading-7 text-[var(--muted)]">
            Nous n&apos;avons pas encore retrouve la session Stripe. Contacte le
            support si tu ne recois pas d&apos;email.
          </p>
        )}
        <Button asChild className="mt-8">
          <Link href="/shop">Retour au shop</Link>
        </Button>
      </div>
    </section>
  );
}

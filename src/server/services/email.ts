import { getResend } from "@/lib/email/resend";

const from = process.env.EMAIL_FROM ?? "ChouShop <orders@example.com>";

export async function sendOrderPaidEmail(input: {
  to: string;
  orderNumber: string;
}) {
  const resend = getResend();

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Commande ${input.orderNumber} confirmee`,
    html: `<p>Merci. La commande ${input.orderNumber} est confirmee.</p>`
  });
}

export async function sendOrderShippedEmail(input: {
  to: string;
  orderNumber: string;
  trackingUrl?: string | null;
}) {
  const resend = getResend();

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Commande ${input.orderNumber} expediee`,
    html: `<p>La commande ${input.orderNumber} a ete expediee.</p>${
      input.trackingUrl ? `<p><a href="${input.trackingUrl}">Suivre le colis</a></p>` : ""
    }`
  });
}

export async function sendOrderCancelledEmail(input: {
  to: string;
  orderNumber: string;
}) {
  const resend = getResend();

  return resend.emails.send({
    from,
    to: input.to,
    subject: `Commande ${input.orderNumber} annulee`,
    html: `<p>La commande ${input.orderNumber} a ete annulee.</p>`
  });
}

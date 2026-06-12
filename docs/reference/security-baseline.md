# Security Baseline

Status: ChouShop local baseline

Use this for every payment, auth, provider, deploy, or public portfolio change.

## Secrets

- Store secrets only in local `.env.local`, Vercel secrets, CI secrets, or an
  approved secret store.
- Commit only `.env.example` with placeholder values.
- Never log tokens, API keys, private keys, passwords, full connection strings,
  Stripe secrets, webhook secrets, or raw provider payloads containing sensitive
  data.

## Config

- Treat config and environment changes as approval-gated.
- Keep production config separate from local development config.
- Validate required env vars at startup when possible.

## Auth And Permissions

- Enforce admin authorization server-side.
- Do not expose generic admin, database, webhook, Stripe, Resend, Cloudinary, or
  provider proxy endpoints to public clients.
- Do not trust client-provided ownership, roles, prices, totals, stock,
  statuses, or IDs for sensitive operations.

## Stripe And External Providers

- Stripe Checkout is the only payment flow for MVP-0.
- Stripe webhook is the only source of truth for paid payment status.
- Verify Stripe webhook signatures before parsing or processing events.
- Use idempotency for Stripe webhooks and external sends.
- Record enough audit data to debug without storing secrets or unnecessary PII.

## Logging And Data

- Log operational events, not secrets.
- Minimize PII in logs and reports.
- Do not copy real customer data into docs, prompts, reports, screenshots, or
  public repos.
- Do not publish raw Stripe, Resend, Cloudinary, Neon, or analytics payloads.

## Release Review

Before production or public portfolio publication:

- review secret/config diffs;
- review auth and admin route permissions;
- review checkout/order/webhook paths when payments are touched;
- verify consent-gated analytics;
- record verification commands with result and skips.

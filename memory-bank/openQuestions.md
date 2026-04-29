# Open Questions

Track unresolved questions here. Move resolved decisions into `memory-bank/decisionLog.md`.

## Product and Business

| Question | Status | Notes |
|---|---|---|
| What is the final legal seller identity? | open | Needed for Mentions legales and CGV |
| Is launch France-only or France + EU? | open | MVP-0 currently assumes France-first fixed shipping |
| What are the final shipping methods and prices? | open | Needed before live checkout |
| What is the final support email? | open | Needed for footer, contact page, and transactional emails |
| Are small-item safety warnings required on all boxes? | open | Likely yes if boxes may include small accessories |

## Legal and Compliance

| Question | Status | Notes |
|---|---|---|
| Who will approve CGV? | open | Go-live blocker |
| Who will approve Privacy Policy? | open | Go-live blocker |
| Which cookie consent solution is used? | open | Needed before analytics pixels |
| Are analytics pixels enabled in MVP-0? | open | If yes, consent-gated loading is mandatory |
| Is VAT handling France-only at launch? | open | If EU expansion starts, tax model must be reviewed |

## Technical

| Question | Status | Notes |
|---|---|---|
| Admin auth final approach? | open | NextAuth credentials allowlist is current target |
| Rate limiting provider? | open | Upstash Redis is current target |
| Stripe webhook local testing method? | open | Stripe CLI recommended |
| Vercel project/environment setup complete? | open | Production deployment pending |
| Cloudinary upload preset/policy? | open | Needed for product image admin |

## Operational

| Question | Status | Notes |
|---|---|---|
| Who handles manual refunds? | open | Refund flow not automated in MVP-0 |
| How are stock issues resolved after paid webhook? | open | Current system marks `ON_HOLD`; business policy needed |
| What carrier/tracking format is used? | open | Needed for `order.shipped` email |

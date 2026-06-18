# Codex Task — Candy Cloud Mystery Box Frontend Template

## 0. Mission

Build a visual frontend template for a cute-premium pastel e-commerce MVP called **Candy Cloud**.

This is **not a full payment store yet**.  
The website must behave like an e-commerce storefront with a cart, but the final purchase is completed through **Vinted**.

The goal is to produce a clean, reusable frontend foundation that can later be connected to real data, n8n, Airtable, Google Sheets, Supabase, or another backend.

---

## 1. Business Context

Project: **Candy Cloud / Mystery Box**  
Market: France  
Audience: girls around 14–16 years old, plus parents/gift buyers  
Product: surprise boxes with jewelry, accessories, cute small items, charms, stationery, and small gifts  
Traffic sources: TikTok, YouTube Shorts, social content  
Current sales flow: Vinted  
Website stage: MVP

The website must support this flow:

```text
TikTok / YouTube
→ website
→ browse boxes
→ add one or several items to cart
→ review cart total
→ send order request
→ seller creates custom Vinted listing
→ customer receives Vinted link
→ customer pays through Vinted
→ box is prepared on video
→ delivery through Vinted
```

---

## 2. Core Rule

Do **not** build Stripe, PayPal, card payment, or real checkout payment.

The website has:
- product browsing
- product pages
- cart
- order request form
- success page

The website does **not** have:
- online payment
- payment checkout
- user account
- complex backend
- real order tracking in MVP

Correct logic:

```text
Cart = order summary
Order request = customer contact + confirmation
Vinted = payment + delivery
```

---

## 3. Visual Direction

Use the attached reference image as the primary visual inspiration.

Style name: **Candy Cloud / Soft Surprise**

Visual keywords:
- cute-premium
- pastel
- soft pink
- lilac
- peach
- airy
- rounded
- giftable
- modern feminine
- playful but clean
- trustworthy
- mobile-first
- conversion-focused

Avoid:
- childish toy-store look
- adult luxury fashion look
- corporate sterile minimalism
- chaotic Gen Z visual mess
- heavy parallax
- aggressive neon
- too many sparkles
- over-animated interface

The design should feel like:

```text
A soft, modern gift shop for personalized mystery boxes.
Cute enough for TikTok, clean enough for parents to trust.
```

---

## 4. Technical Stack

Use:

```text
Next.js
TypeScript
Tailwind CSS
```

Prefer:
- App Router
- clean component structure
- mock data
- reusable components
- simple local cart state
- no backend in the first version

If a cart persistence mechanism is needed, use localStorage or a simple client-side state layer.

---

## 5. Design Tokens

Use these as starting values. Adjust slightly if needed to improve contrast and visual balance.

### Colors

```css
--background: #FFF7FB;
--background-soft: #FDF0F7;
--surface: #FFFFFF;
--surface-pink: #FFEAF4;
--surface-lilac: #F0E8FF;
--surface-peach: #FFE8D8;

--primary: #E84BA3;
--primary-hover: #D93693;
--secondary: #9B7CFF;
--peach: #FFB38A;
--mint: #B8EAD9;

--text-main: #2B2230;
--text-muted: #766A7C;
--border-soft: #F3D9E8;
```

### Typography

Use Google Fonts or equivalent:

```text
Headings: Outfit or Sora
Body/UI: Inter
```

Font direction:
- headings should feel rounded, modern, friendly
- body text must be highly readable
- buttons and form labels must be clear

### Radius

```css
--radius-sm: 12px;
--radius-md: 18px;
--radius-lg: 28px;
--radius-xl: 36px;
--radius-pill: 999px;
```

### Shadows

Use soft pink/plum-tinted shadows, not harsh black shadows:

```css
box-shadow: 0 18px 45px rgba(215, 92, 162, 0.14);
```

Hover effect:

```css
transform: translateY(-3px);
box-shadow: 0 24px 55px rgba(215, 92, 162, 0.18);
```

### Motion

Use subtle transitions only:
- button hover
- card lift
- soft reveal
- cart drawer transition if implemented
- small floating decorative elements in hero

Avoid heavy animation.

---

## 6. Pages to Build

Build these MVP pages:

```text
/
Homepage

/catalog
Catalog page

/products/[slug]
Product detail page

/cart
Cart page

/order
Order request form

/order/success
Success page
```

Optional internal page:

```text
/design
Design system preview page
```

The `/design` page is recommended. It should show buttons, badges, product cards, inputs, section headers, color swatches, and trust blocks so the visual system can be reviewed quickly.

---

## 7. Required Components

Create reusable components.

### UI components

```text
Button
Badge
Card
Input
Select
Textarea
Checkbox
QuantitySelector
SectionHeader
TrustBadge
Price
EmptyState
```

### Layout components

```text
AnnouncementBar
Header
Footer
Container
Section
MobileMenu
```

### Commerce components

```text
ProductCard
CategoryCard
ProductGallery
VariantSelector
StyleSelector
CartItem
CartSummary
OrderSummary
AddToCartButton
```

### Section components

```text
HeroSection
CategorySection
FeaturedProducts
HowItWorks
VintedTrustSection
TestimonialsSection
FaqSection
NewsletterOrContactBlock
```

---

## 8. Mock Product Data

Create mock products in a separate file.

Example product types:

```text
Mini Mystery Box
Classic Mystery Box
Premium Mystery Box
Jewelry Surprise Box
Cute Accessories Box
```

Each product should have:

```ts
id
slug
name
shortDescription
description
price
image
badges
category
styles
includes
isBestSeller
```

Suggested style tags:

```text
Pink Mood
Jewelry
Cute Accessories
Soft Girl
Full Surprise
Sparkle
```

---

## 9. Homepage Requirements

The homepage must include:

### 1. Announcement Bar

Text:

```text
Paiement & livraison via Vinted · Box préparée avec soin en vidéo
```

Purpose:
- instantly clarify the business model
- build trust

### 2. Header

Include:
- logo: Candy Cloud
- navigation: Box, Comment ça marche, FAQ
- cart link/icon
- CTA: Commander

Mobile:
- logo
- cart icon
- menu button

### 3. Hero Section

Main headline:

```text
Ta Mystery Box cute, préparée juste pour toi
```

Subtitle:

```text
Choisis ton style, ajoute tes box au panier, puis reçois un lien Vinted sécurisé pour finaliser ta commande.
```

Primary CTA:

```text
Choisir ma box
```

Secondary CTA:

```text
Comment ça marche ?
```

Hero visual:
- soft pastel background blob
- large mystery box illustration/card
- floating stickers/badges:
  - surprise
  - bijoux
  - pink mood
  - cute
- soft glow behind the hero product

### 4. Category Cards

Show 3 core boxes:

```text
Mini Box
Classic Box
Premium Box
```

Each card should have:
- pastel background
- short description
- price-from
- CTA/link

### 5. Featured Products

Show 3–4 products using ProductCard.

Product card must include:
- image area
- badges
- name
- short description
- price
- CTA: Ajouter au panier

### 6. How It Works

Use 4 steps:

```text
1. Choisis tes box
2. Ajoute-les au panier
3. Envoie ta demande
4. Reçois ton lien Vinted pour payer
```

Add a fifth supporting note:

```text
Ta box est préparée en vidéo après paiement.
```

### 7. Vinted Trust Section

Headline:

```text
Paiement et livraison via Vinted
```

Text:

```text
Aucun paiement n’est effectué sur ce site. Après ta demande, nous créons une annonce Vinted personnalisée pour finaliser l’achat en toute sécurité.
```

Trust badges:
- Paiement via Vinted
- Livraison Vinted
- Préparation en vidéo
- Contact avant commande

### 8. Testimonials

Use simple mock testimonials:
- short quote
- name or pseudo
- small heart/rating visual

### 9. FAQ Preview

Questions:
- Est-ce que je paie sur ce site ?
- Comment je reçois le lien Vinted ?
- Puis-je choisir le style de ma box ?
- Quand la box est-elle préparée ?

### 10. Footer

Include:
- logo
- short brand sentence
- links: Box, FAQ, Contact, Vinted
- social placeholders: TikTok, Instagram

---

## 10. Catalog Page

Page title:

```text
Choisis ta Mystery Box
```

Subtitle:

```text
Ajoute une ou plusieurs box au panier. Le paiement se fera ensuite via un lien Vinted personnalisé.
```

Include:
- filter chips / tags
- product grid
- product cards
- mobile-first layout

Grid:
- mobile: 1 column
- tablet: 2 columns
- desktop: 3 or 4 columns

Do not overbuild filtering. Simple visual filter chips are enough in MVP.

---

## 11. Product Page

Product detail structure:

Left / top on mobile:
- product gallery
- large image
- thumbnails if useful

Right / below on mobile:
- badge: Best seller / New / Gift idea
- product name
- price
- short description
- style selector
- quantity selector
- CTA: Ajouter au panier
- trust note:

```text
Le paiement se fera ensuite via un lien Vinted sécurisé.
```

Below:
- What can be inside
- Good for which style
- How ordering works
- FAQ/reassurance

---

## 12. Cart Page

Cart title:

```text
Ton panier
```

Cart must show:
- item image
- item name
- selected style/variant
- quantity selector
- item price
- remove action
- subtotal
- estimated total

Important note:

```text
Aucun paiement n’est effectué sur ce site. Après l’envoi de ta demande, nous créerons une annonce Vinted personnalisée.
```

Main CTA:

```text
Envoyer ma demande
```

Secondary CTA:

```text
Continuer mes achats
```

If cart is empty:
- show friendly empty state
- CTA back to catalog

---

## 13. Order Request Page

This is the checkout replacement.

Title:

```text
Finalise ta demande
```

Form fields:
- Prénom
- Méthode de contact
- Contact
- Pseudo Vinted, optional
- Notes / préférences
- Confirmation checkbox:

```text
J’ai compris que le paiement et la livraison se feront via Vinted.
```

The page must also display order summary:
- cart items
- subtotal
- total
- Vinted explanation

CTA:

```text
Envoyer ma demande
```

Mock submit:
- no backend required
- on submit, redirect to `/order/success`
- structure code so the form can later submit to API route, n8n webhook, Google Sheets, Airtable, or Supabase

---

## 14. Success Page

Headline:

```text
Merci ! Ta demande est envoyée 💌
```

Message:

```text
Nous allons créer ton annonce Vinted personnalisée et t’envoyer le lien pour finaliser l’achat en toute sécurité.
```

Next steps:
1. On vérifie ta demande
2. On crée ton annonce Vinted
3. Tu reçois le lien
4. Ta box est préparée en vidéo après paiement

Buttons:
- Retour à l’accueil
- Voir d’autres box

---

## 15. UX Copy Rules

Tone:
- French
- short
- friendly
- natural
- not childish
- clear about Vinted

Always avoid implying that payment happens on the site.

Do not use:

```text
Payer maintenant
Checkout
Paiement par carte
Livraison standard
```

Use:

```text
Envoyer ma demande
Commander via Vinted
Réserver ma box
Lien Vinted sécurisé
Paiement & livraison via Vinted
```

---

## 16. Acceptance Criteria

The implementation is acceptable if:

- the site clearly looks like a cute-premium pastel e-commerce shop
- homepage is visually close to the attached reference direction
- customer understands that payment and delivery happen via Vinted
- cart supports multiple items
- cart shows totals
- order request form includes cart summary
- no online payment is implemented
- pages are responsive
- components are reusable
- styles are consistent
- code is clean and easy to extend
- mock data is separated from components
- future backend integration is straightforward

---

## 17. Execution Plan for Codex Orchestration

Do the work in steps.

### Step 1 — Foundation

Create:
- Tailwind theme/tokens
- global styles
- typography setup
- reusable UI components
- mock data structure

### Step 2 — Design System Preview

Create `/design` page showing:
- colors
- typography
- buttons
- badges
- cards
- inputs
- product card
- cart item
- trust blocks

### Step 3 — Homepage

Build homepage using the visual system.

### Step 4 — Catalog + Product Page

Build catalog and product detail pages.

### Step 5 — Cart

Build cart state, cart page, quantity changes, remove item, totals.

### Step 6 — Order Request

Build order request form and success page with mock submit.

### Step 7 — Polish

Check:
- mobile layout
- spacing
- visual consistency
- copy clarity
- no accidental payment checkout wording
- hover/focus states

---

## 18. Important Instruction

Use the reference image and this brief as constraints.

Do not invent a different brand direction.  
Do not over-engineer the MVP.  
Do not build payment.  
Do not create backend unless explicitly asked later.

Build a clean, visual, reusable frontend template first.

import type {
  AccentTone,
  ProductBadge,
  StorefrontProduct
} from "@/features/catalog/storefront-types";

export function getAccentClassName(accentTone: AccentTone) {
  switch (accentTone) {
    case "accent":
      return {
        badgeVariant: "accent",
        washClassName: "from-[rgba(255,95,162,0.18)] via-white/80 to-transparent",
        ringClassName: "ring-[rgba(255,95,162,0.22)]",
        dotClassName: "bg-[var(--accent)]"
      } as const;
    case "lavender":
      return {
        badgeVariant: "lavender",
        washClassName: "from-[rgba(216,201,255,0.32)] via-white/80 to-transparent",
        ringClassName: "ring-[rgba(164,129,255,0.28)]",
        dotClassName: "bg-[var(--lavender)]"
      } as const;
    case "mint":
      return {
        badgeVariant: "mint",
        washClassName: "from-[rgba(215,244,234,0.75)] via-white/82 to-transparent",
        ringClassName: "ring-[rgba(112,196,161,0.24)]",
        dotClassName: "bg-[var(--mint)]"
      } as const;
    case "peach":
      return {
        badgeVariant: "peach",
        washClassName: "from-[rgba(255,216,202,0.8)] via-white/82 to-transparent",
        ringClassName: "ring-[rgba(245,159,91,0.24)]",
        dotClassName: "bg-[var(--peach)]"
      } as const;
  }
}

export function getProductBadgeLabel(badge: ProductBadge) {
  switch (badge) {
    case "best-seller":
      return "Best-seller";
    case "edition-limitee":
      return "Edition limitee";
    case "populaire":
      return "Le plus choisi";
    case "nouveaute":
      return "Nouveaute";
  }
}

export function getProductTypeLabel(product: StorefrontProduct) {
  switch (product.type) {
    case "FIXED_BOX":
      return "Box signature";
    case "THEME_BOX":
      return "Box a theme";
    case "LIMITED_BOX":
      return "Capsule limitee";
  }
}

export function getStockLabel(stock: number) {
  if (stock <= 0) {
    return "Epuise";
  }

  if (stock <= 4) {
    return "Dernieres box";
  }

  return "En stock";
}

export function getSavingsAmount(product: StorefrontProduct) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return 0;
  }

  return product.compareAtPrice - product.price;
}

export function getReviewLabel(product: StorefrontProduct) {
  return `${product.rating.toFixed(1)}/5 (${product.reviewCount} avis)`;
}

export function getProductTrustCues(product: StorefrontProduct) {
  return [
    ...product.highlights.map((highlight) => ({
      title: highlight.title,
      detail: highlight.description
    })),
    {
      title: "Commande sereine",
      detail: "Paiement securise et prix affiches en EUR TTC."
    }
  ].slice(0, 4);
}

export function getProductCareNotes(product: StorefrontProduct) {
  return [
    `Preparation manuelle sous 1 a 3 jours ouvres depuis la France.`,
    `Chaque selection reste surprise, avec une direction ${product.theme.toLowerCase()}.`,
    "Certaines petites pieces ne conviennent pas aux jeunes enfants."
  ];
}

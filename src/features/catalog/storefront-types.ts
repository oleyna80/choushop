export type AccentTone = "accent" | "lavender" | "mint" | "peach";

export type ProductBadge =
  | "best-seller"
  | "edition-limitee"
  | "populaire"
  | "nouveaute";

export type ProductHighlight = {
  title: string;
  description: string;
};

export type ProductPreviewItem = {
  label: string;
  detail: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type StorefrontProduct = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  type: "FIXED_BOX" | "THEME_BOX" | "LIMITED_BOX";
  theme: string;
  badge: ProductBadge;
  accentTone: AccentTone;
  price: number;
  compareAtPrice?: number;
  currency: "EUR";
  taxRate: number;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  highlights: ProductHighlight[];
  includedPreview: ProductPreviewItem[];
  faq: ProductFaq[];
  featured: boolean;
};

export type StorefrontCollection = {
  id: string;
  title: string;
  description: string;
  href: string;
  accentTone: AccentTone;
};

import type { StorefrontProduct } from "./storefront-types";

interface ApiProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  type: string;
  theme: string | null;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  taxRate: number;
  stock: number;
  featured: boolean;
  images: { url: string; alt: string | null; sortOrder: number }[];
}

const PLACEHOLDER_IMAGE = "/placeholder.png";

export function mapApiProductToStorefront(p: ApiProduct): StorefrontProduct {
  const firstImage = p.images[0];

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    tagline: "",
    shortDescription: p.shortDescription,
    description: p.description,
    type: p.type as StorefrontProduct["type"],
    theme: p.theme ?? "",
    badge: "populaire",
    accentTone: "accent",
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    currency: p.currency as "EUR",
    taxRate: p.taxRate,
    stock: p.stock,
    rating: 4.8,
    reviewCount: 128,
    imageUrl: firstImage?.url ?? PLACEHOLDER_IMAGE,
    gallery: p.images.map((i) => i.url),
    highlights: [],
    includedPreview: [],
    faq: [],
    featured: p.featured,
  };
}

export function mapProductsToStorefront(
  products: ApiProduct[]
): StorefrontProduct[] {
  return products.map(mapApiProductToStorefront);
}

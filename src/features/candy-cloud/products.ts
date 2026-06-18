import type { AccentTone } from "@/features/catalog/storefront-types";

export type CandyProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  badge: string;
  category: string;
  accentTone: AccentTone;
  styles: string[];
  includes: string[];
  isBestSeller?: boolean;
};

export const styleTags = [
  "Pink Mood",
  "Jewelry",
  "Cute Accessories",
  "Soft Girl",
  "Full Surprise",
  "Sparkle"
];

export const candyProducts: CandyProduct[] = [
  {
    id: "mini-mystery-box",
    slug: "mini-mystery-box",
    name: "Mini Mystery Box",
    shortDescription: "Petite surprise cute pour tester l'univers ChouShop.",
    description:
      "Une box douce avec quelques accessoires, charms ou petites surprises soigneusement choisis selon ton style.",
    price: 990,
    badge: "Mini",
    category: "Mini Box",
    accentTone: "accent",
    styles: ["Pink Mood", "Cute Accessories", "Full Surprise"],
    includes: ["1 a 2 accessoires", "1 charm ou detail cute", "Mini surprise bonus"]
  },
  {
    id: "classic-mystery-box",
    slug: "classic-mystery-box",
    name: "Classic Mystery Box",
    shortDescription: "Le format prefere avec bijoux, accessoires et petites surprises.",
    description:
      "La box signature: un mix equilibre, giftable et pastel, prepare pour creer un vrai effet surprise sans etre trop charge.",
    price: 1490,
    badge: "Best seller",
    category: "Classic Box",
    accentTone: "accent",
    styles: ["Pink Mood", "Jewelry", "Cute Accessories", "Sparkle"],
    includes: ["Bijoux ou charms", "Accessoires cheveux", "Papeterie cute", "Surprise bonus"],
    isBestSeller: true
  },
  {
    id: "premium-mystery-box",
    slug: "premium-mystery-box",
    name: "Premium Mystery Box",
    shortDescription: "Plus d'items, plus de volume, plus de moment waouh.",
    description:
      "Une version plus genereuse pour un cadeau plus marque, avec une selection plus riche et une presentation soigneuse.",
    price: 2490,
    badge: "Premium",
    category: "Premium Box",
    accentTone: "peach",
    styles: ["Soft Girl", "Jewelry", "Sparkle", "Full Surprise"],
    includes: ["Selection plus complete", "Bijoux ou accessoires", "Pieces coup de coeur", "Bonus premium"]
  },
  {
    id: "jewelry-surprise-box",
    slug: "jewelry-surprise-box",
    name: "Jewelry Surprise Box",
    shortDescription: "Bagues, bracelets, charms et petits details sparkle.",
    description:
      "Une box orientee bijoux et details brillants, avec une ambiance douce et portable au quotidien.",
    price: 1790,
    badge: "Bijoux",
    category: "Jewelry",
    accentTone: "lavender",
    styles: ["Jewelry", "Sparkle", "Soft Girl"],
    includes: ["Bijoux fantaisie", "Charms", "Details nacres", "Mini surprise"]
  },
  {
    id: "cute-accessories-box",
    slug: "cute-accessories-box",
    name: "Cute Accessories Box",
    shortDescription: "Accessoires cheveux, charms, mini gifts et papeterie.",
    description:
      "Une box facile a aimer avec des petits objets utiles, jolis et TikTok-friendly.",
    price: 1290,
    badge: "Cute",
    category: "Accessories",
    accentTone: "mint",
    styles: ["Cute Accessories", "Pink Mood", "Full Surprise"],
    includes: ["Accessoires cheveux", "Papeterie", "Charms", "Mini gifts"]
  }
];

export const categoryCards = [
  {
    title: "Mini Box",
    description: "Petite surprise cute",
    priceFrom: 990,
    href: "/products/mini-mystery-box",
    accentTone: "accent" as AccentTone
  },
  {
    title: "Classic Box",
    description: "Le format prefere",
    priceFrom: 1490,
    href: "/products/classic-mystery-box",
    accentTone: "lavender" as AccentTone
  },
  {
    title: "Premium Box",
    description: "Plus d'items, plus de wow",
    priceFrom: 2490,
    href: "/products/premium-mystery-box",
    accentTone: "peach" as AccentTone
  }
];

export const testimonials = [
  {
    name: "Lina",
    quote: "La box etait trop jolie et le lien Vinted etait simple a utiliser."
  },
  {
    name: "Maya",
    quote: "J'ai adore choisir le style sans connaitre tous les produits avant."
  },
  {
    name: "Parent cadeau",
    quote: "Le fonctionnement via Vinted est clair, c'est rassurant pour payer."
  }
];

export const faqPreview = [
  {
    question: "Est-ce que je paie sur ce site ?",
    answer:
      "Non. Tu envoies une demande, puis nous creons une annonce Vinted personnalisee pour le paiement et la livraison."
  },
  {
    question: "Comment je recois le lien Vinted ?",
    answer:
      "Nous te contactons avec le lien apres verification de ta demande et des box choisies."
  },
  {
    question: "Puis-je choisir le style de ma box ?",
    answer:
      "Oui. Tu choisis une vibe comme Pink Mood, Jewelry, Soft Girl ou Full Surprise."
  },
  {
    question: "Quand la box est-elle preparee ?",
    answer:
      "La box est preparee en video apres le paiement finalise via Vinted."
  }
];

export function getCandyProduct(slug: string) {
  return candyProducts.find((product) => product.slug === slug);
}

export function formatCandyPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(amount / 100);
}

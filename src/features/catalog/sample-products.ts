import type { StorefrontProduct } from "@/features/catalog/storefront-types";

export const sampleProducts: StorefrontProduct[] = [
  {
    id: "sample-mini-box",
    slug: "mini-chou-box",
    title: "Mini Chou Box",
    tagline: "Le petit format qui fait toujours son effet.",
    shortDescription:
      "Une box douce et brillante pour offrir une premiere surprise cute sans se tromper.",
    description:
      "Mini Chou Box rassemble des accessoires utiles, de la papeterie brillante et quelques details surprises pour un cadeau leger, premium et facile a aimer.",
    type: "FIXED_BOX",
    theme: "Essentiels cute",
    badge: "best-seller",
    accentTone: "lavender",
    price: 1990,
    compareAtPrice: 2490,
    currency: "EUR",
    taxRate: 2000,
    stock: 12,
    rating: 4.8,
    reviewCount: 128,
    imageUrl:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      {
        title: "Livraison 2 a 4 jours",
        description: "Preparee en France et suivie rapidement."
      },
      {
        title: "Selection rassurante",
        description: "Un mix simple a offrir sans surcharge."
      },
      {
        title: "TTC affiche",
        description: "Pas de surprise sur le prix final."
      }
    ],
    includedPreview: [
      { label: "Papeterie", detail: "Notes, stickers, mini bloc" },
      { label: "Accessoires", detail: "Details cute du quotidien" },
      { label: "Bijoux", detail: "Une petite touche brillante" },
      { label: "Surprise bonus", detail: "Un extra selon le stock" }
    ],
    faq: [
      {
        question: "Est-ce vraiment une surprise ?",
        answer:
          "Oui. Le theme est annonce, mais la selection exacte change selon les editions et le stock du moment."
      },
      {
        question: "A partir de quel age ?",
        answer:
          "Le format convient surtout aux ados et jeunes adultes. Certaines petites pieces ne conviennent pas aux jeunes enfants."
      },
      {
        question: "Peut-on l'offrir directement ?",
        answer:
          "Oui. Le format a ete pense pour faire un cadeau facile, cute et rapide a commander."
      }
    ],
    featured: true
  },
  {
    id: "sample-standard-box",
    slug: "standard-chou-box",
    title: "Standard Chou Box",
    tagline: "Le meilleur equilibre entre surprise et valeur.",
    shortDescription:
      "Notre format signature pour celles qui veulent une jolie box complete, douce et tendance.",
    description:
      "Standard Chou Box melange accessoires, papeterie, petits bijoux et objets feel-good dans une composition pastel qui reste nette, premium et facile a partager.",
    type: "FIXED_BOX",
    theme: "Rose signature",
    badge: "populaire",
    accentTone: "accent",
    price: 2990,
    compareAtPrice: 3490,
    currency: "EUR",
    taxRate: 2000,
    stock: 20,
    rating: 4.9,
    reviewCount: 245,
    imageUrl:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      {
        title: "Format prefere",
        description: "Le coffret le plus choisi pour offrir."
      },
      {
        title: "Effet premium",
        description: "Presentation soignee et selection harmonieuse."
      },
      {
        title: "Paiement securise",
        description: "Stripe Checkout uniquement."
      }
    ],
    includedPreview: [
      { label: "Accessoires cheveux", detail: "Pieces faciles a porter" },
      { label: "Kawaii desk", detail: "Papeterie et petits objets" },
      { label: "Beauty cute", detail: "Mini essentiels feel-good" },
      { label: "Bijoux", detail: "Touches rosees ou nacrees" }
    ],
    faq: [
      {
        question: "Peut-on choisir les produits exacts ?",
        answer:
          "Non. La promesse reste la surprise, avec un theme clairement indique pour guider l'achat."
      },
      {
        question: "Quelle est la valeur ressentie ?",
        answer:
          "Le format est pense pour donner une impression de box riche, coherente et tres cadeau des l'ouverture."
      },
      {
        question: "Le prix est-il TTC ?",
        answer:
          "Oui. Tous les prix affiches sur ChouShop sont en EUR TTC."
      }
    ],
    featured: true
  },
  {
    id: "sample-deluxe-box",
    slug: "deluxe-chou-box",
    title: "Deluxe Chou Box",
    tagline: "Une surprise plus genereuse, plus glossy, plus waouh.",
    shortDescription:
      "Un format plus riche avec plus de volume, plus de moments cute et une vibe cadeau affirmée.",
    description:
      "Deluxe Chou Box vise le cadeau premium. La box offre plus de contenu, un effet d'ouverture plus fort et une selection pastel qui reste elegante plutot que surchargee.",
    type: "THEME_BOX",
    theme: "Dreamy deluxe",
    badge: "nouveaute",
    accentTone: "peach",
    price: 4490,
    compareAtPrice: 4990,
    currency: "EUR",
    taxRate: 2000,
    stock: 9,
    rating: 4.7,
    reviewCount: 74,
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      {
        title: "Pour marquer le coup",
        description: "Plus de volume et un reveal plus fort."
      },
      {
        title: "Selection editionnee",
        description: "Ligne courte et plus curationnee."
      },
      {
        title: "Pret a offrir",
        description: "Aspect cadeau premium des reception."
      }
    ],
    includedPreview: [
      { label: "Statement cute", detail: "Pieces plus visuelles" },
      { label: "Papeterie premium", detail: "Details plus travaillés" },
      { label: "Mode douce", detail: "Accessoires a porter" },
      { label: "Bonus collector", detail: "Selon l'edition en cours" }
    ],
    faq: [
      {
        question: "En quoi la deluxe change ?",
        answer:
          "La deluxe mise sur plus de volume, une impression d'abondance et des pieces un peu plus statement."
      },
      {
        question: "Est-ce une edition fixe ?",
        answer:
          "Le format existe en continu, mais la selection interne peut changer pour garder l'effet surprise."
      },
      {
        question: "Convient-elle a un cadeau anniversaire ?",
        answer:
          "Oui. C'est le format le plus adapte quand tu veux une surprise plus marquante."
      }
    ],
    featured: true
  },
  {
    id: "sample-kawaii-box",
    slug: "edition-kawaii-box",
    title: "Edition Kawaii",
    tagline: "La capsule la plus douce et la plus pastel du moment.",
    shortDescription:
      "Une edition limitee pensee autour des details kawaii, des teintes cremees et d'une ambiance tendre.",
    description:
      "Edition Kawaii garde le principe ChouShop: une direction claire, une surprise reelle et une presentation pastel qui fait tres vite cadeau.",
    type: "LIMITED_BOX",
    theme: "Kawaii edition",
    badge: "edition-limitee",
    accentTone: "mint",
    price: 3990,
    currency: "EUR",
    taxRate: 2000,
    stock: 6,
    rating: 4.8,
    reviewCount: 61,
    imageUrl:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      {
        title: "Capsule courte",
        description: "Quantites legerement limitees."
      },
      {
        title: "Palette tendre",
        description: "Tons creme, menthe et rose doux."
      },
      {
        title: "Format partageable",
        description: "Tres photogenique a l'ouverture."
      }
    ],
    includedPreview: [
      { label: "Accessoires doux", detail: "Petits objets feel-good" },
      { label: "Desk decor", detail: "Touches pastel pour le bureau" },
      { label: "Cute details", detail: "Pieces legeres et mignonnes" },
      { label: "Edition bonus", detail: "Un extra selon la capsule" }
    ],
    faq: [
      {
        question: "Edition limitee veut dire quoi ?",
        answer:
          "La ligne reste disponible pendant une periode plus courte et les quantites sont plus petites que sur les box permanentes."
      },
      {
        question: "Le contenu est-il plus theme ?",
        answer:
          "Oui. La curation suit une ambiance kawaii plus precise que sur les formats classiques."
      },
      {
        question: "Y a-t-il du stock toute l'annee ?",
        answer:
          "Non. Quand l'edition part, elle peut ne pas revenir sous la meme forme."
      }
    ],
    featured: false
  }
];

export function getProductBySlug(slug: string) {
  return sampleProducts.find((product) => product.slug === slug);
}

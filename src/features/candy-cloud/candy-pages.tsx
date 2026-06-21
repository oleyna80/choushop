"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  Video,
  ShoppingBag,
  Send,
  Link as LinkIcon
} from "lucide-react";

import { CandyProductCard } from "@/components/shop/candy-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  candyProducts,
  categoryCards,
  faqPreview,
  formatCandyPrice,
  styleTags,
  testimonials
} from "@/features/candy-cloud/products";

// Steps details mapped with icons and descriptions from the landing page screenshot
const steps = [
  {
    title: "Choisis tes box",
    desc: "Parcours la boutique et sélectionne celles qui te font craquer.",
    icon: PackageCheck
  },
  {
    title: "Ajoute au panier",
    desc: "Vérifie ton panier et tes quantités. C'est sans paiement !",
    icon: ShoppingBag
  },
  {
    title: "Envoie ta demande",
    desc: "Renseigne tes informations et valide ta demande de commande.",
    icon: Send
  },
  {
    title: "Reçois le lien Vinted",
    desc: "Tu reçois un lien Vinted sécurisé pour payer et être livrée.",
    icon: LinkIcon
  }
];

export function CandyHomePage() {
  const homeProductOrder = [
    "classic-mystery-box",
    "mini-mystery-box",
    "premium-mystery-box",
    "cute-accessories-box",
    "jewelry-surprise-box"
  ];
  const featured = homeProductOrder
    .map((id) => candyProducts.find((product) => product.id === id))
    .filter((product): product is (typeof candyProducts)[number] => Boolean(product));

  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pb-10 pt-6 md:px-8 md:pb-16 lg:pt-10">
        <div className="candy-sparkle candy-sparkle-pink left-[4%] top-[18%]" />
        <div className="candy-sparkle candy-sparkle-lilac right-[9%] top-[13%]" />
        <div className="candy-sparkle candy-sparkle-peach left-[42%] top-[25%]" />

        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:min-h-[40rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:items-center">
          <div className="grid gap-5 sm:gap-6">
            <div>
              <Badge variant="accent">ChouShop / Candy Cloud</Badge>
            </div>
            <div className="grid gap-5">
              <h1 className="max-w-3xl text-[length:clamp(3rem,6.6vw,5.8rem)] font-black leading-[0.96] text-[#19104f]">
                Des surprises qui te{" "}
                <span className="relative inline-block text-[#e92876]">
                  ressemblent
                  <Sparkles className="absolute -right-7 -top-3 h-6 w-6 text-[#ffb34e]" />
                </span>
              </h1>
              <p className="max-w-lg text-base font-semibold leading-7 text-[#34276f] text-pretty sm:text-lg sm:leading-8">
                Mystery boxes pour les filles de 14 à 16 ans, avec une sélection douce, rose et pleine de surprises.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#ff7aae] px-8 text-base font-bold !text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#ff5b9b]"
              >
                Choisir ma box
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-[#684fd6] bg-white px-8 text-base font-bold text-[#684fd6] shadow-sm hover:-translate-y-0.5 hover:bg-[#ffe8f2] transition-all"
              >
                Comment ça marche ?
              </Link>
            </div>

            <div className="mt-3 hidden max-w-2xl gap-3 text-xs font-black uppercase tracking-[0.08em] text-[#20165b] sm:grid sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ff7aae]" />
                Paiement sécurisé via Vinted
              </span>
              <span className="flex items-center gap-2">
                <Video size={16} className="text-[#a788fa]" />
                Préparées en vidéo avec soin
              </span>
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-[#ff7aae]" />
                +1000 clientes heureuses
              </span>
            </div>
          </div>

          <div className="relative mx-auto aspect-[1.1] w-full max-w-[42rem]">
            <div className="absolute inset-x-4 bottom-2 h-24 rounded-[50%] bg-[#f4d8ff] opacity-70 blur-2xl" />
            <div className="absolute -left-4 bottom-10 hidden h-24 w-32 rounded-full bg-white/70 md:block" />
            <div className="absolute right-0 bottom-14 hidden h-28 w-40 rounded-full bg-white/70 md:block" />
            <div className="absolute left-6 top-14 z-10 rounded-[var(--radius-pill)] border border-[#ffd3e4] bg-white px-4 py-2 text-sm font-black text-[#ff4f92] shadow-[var(--shadow-soft)] animate-float-gentle">
              surprise
            </div>
            <div className="absolute right-8 top-24 z-10 rounded-[var(--radius-pill)] border border-[#eadcff] bg-white px-4 py-2 text-sm font-black text-[#7f5ce8] shadow-[var(--shadow-soft)] animate-float-delayed">
              bijoux
            </div>
            <div className="absolute left-[12%] bottom-[13%] z-10 rounded-[var(--radius-pill)] border border-[#ffe6c7] bg-white px-4 py-2 text-sm font-black text-[#ff914d] shadow-[var(--shadow-soft)] animate-float-slow">
              pink mood
            </div>
            <div className="relative z-[1] mx-auto h-full w-[88%] overflow-hidden rounded-[2.4rem] bg-[#fff0f8] shadow-[0_34px_85px_rgba(232,40,118,0.2)]">
              <Image
                src="/images/classic-box.png"
                alt="Classic Mystery Box"
                fill
                preload
                loading="eager"
                sizes="(max-width: 768px) 92vw, 46vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <Sparkles className="absolute right-[12%] top-8 h-8 w-8 text-[#ffb34e] animate-sparkle" />
            <Sparkles className="absolute left-[2%] top-[38%] h-7 w-7 text-[#c087ff] animate-sparkle" />
          </div>
        </div>
      </section>

      <section className="container relative grid gap-6 py-8" id="boxes">
        <SectionIntro
          kicker="Choisis ta box"
          title="Trois formats simples."
          text="Des box plus petites à l'écran, plus faciles à comparer."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {categoryCards.map((category) => {
            const imageMap: Record<string, string> = {
              "Mini Box": "/images/mini-box.png",
              "Classic Box": "/images/classic-box.png",
              "Premium Box": "/images/premium-box.png"
            };

            const tagMap: Record<string, string> = {
              "Mini Box": "Idéale pour se faire plaisir",
              "Classic Box": "Notre best-seller",
              "Premium Box": "Pour une expérience inoubliable"
            };

            const titleColor =
              category.title === "Mini Box" ? "text-[#684fd6]" :
              category.title === "Classic Box" ? "text-[#ff7aae]" : "text-[#f59f5b]";

            const btnClass =
              category.title === "Mini Box" ? "bg-[#a788fa] hover:bg-[#8b6beb]" :
              category.title === "Classic Box" ? "bg-[#ff7aae] hover:bg-[#ff5b9b]" : "bg-[#ffd6a5] hover:bg-[#ffbe7a]";

            const hoverBorderClass =
              category.title === "Mini Box" ? "hover:border-[#a788fa]/40" :
              category.title === "Classic Box" ? "hover:border-[#ff7aae]/40" : "hover:border-[#ffd6a5]/40";

            return (
              <Link
                className={`grid grid-cols-[1fr_0.82fr] gap-3 overflow-hidden rounded-[1.55rem] border border-[#ffe8f2] bg-white/90 p-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-raised)] ${hoverBorderClass}`}
                href={category.href}
                key={category.title}
              >
                <div className="flex flex-col justify-between gap-3">
                  <div className="grid gap-1">
                    {tagMap[category.title] && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fff7fb] px-2 py-0.5 text-[9px] font-bold text-[#ff7aae] uppercase tracking-wide">
                        <Heart size={8} fill="currentColor" />
                        {tagMap[category.title]}
                      </span>
                    )}
                    <h3 className={`font-[800] text-xl tracking-tight ${titleColor}`}>
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#a788fa] font-medium leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <p className="font-extrabold text-[#684fd6] text-xs">
                      À partir de{" "}
                      <span className="text-sm font-black block sm:inline">
                        {formatCandyPrice(category.priceFrom)}
                      </span>
                    </p>
                    <span className={`inline-flex min-h-8 w-fit items-center justify-center rounded-full px-5 text-xs font-bold text-white transition-colors duration-300 ${btnClass}`}>
                      Découvrir
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[0.92] w-full self-center overflow-hidden rounded-[1.25rem] bg-[#fff7fb]">
                  <Image
                    src={imageMap[category.title] || "/images/classic-box.png"}
                    alt={category.title}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container grid gap-6 py-10">
        <SectionIntro
          kicker="Best sellers"
          title="Nos box à la une."
          text="Tu enverras ensuite une demande pour recevoir ton lien Vinted."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((product) => (
            <CandyProductCard density="compact" key={product.id} product={product} />
          ))}
        </div>
      </section>

      <HowItWorksSection />
      <VintedTrustSection />
      <TestimonialsSection />
      <FaqPreviewSection />
    </>
  );
}

export function CatalogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("Toutes");

  const filtered = selectedTag === "Toutes"
    ? candyProducts
    : candyProducts.filter((p) => p.styles.includes(selectedTag));

  return (
    <section className="container grid gap-8 py-12 md:py-16">
      <SectionIntro
        kicker="Catalogue"
        title="Choisis ta Mystery Box"
        text="Ajoute une ou plusieurs box au panier. Le paiement se fera ensuite via un lien Vinted personnalisé."
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par style">
        {["Toutes", ...styleTags].map((tag) => {
          const isActive = tag === selectedTag;
          return (
            <button
              aria-pressed={isActive}
              className={isActive ? "chip-active" : "chip"}
              key={tag}
              onClick={() => setSelectedTag(tag)}
              type="button"
            >
              {tag}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="text-sm text-[var(--text-muted)]">
        {filtered.length === 1 ? "1 box disponible" : `${filtered.length} box disponibles`}
        {selectedTag !== "Toutes" && <> en style <span className="font-bold text-[var(--text-main)]">{selectedTag}</span></>}
      </p>
      {filtered.length === 0 ? (
        <div className="grid place-items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white px-6 py-16 text-center shadow-[var(--shadow-soft)]">
          <p className="text-xl font-black text-[var(--text-main)]">
            Aucune box trouvée pour &quot;{selectedTag}&quot;
          </p>
          <p className="text-[var(--text-muted)]">
            Essaie un autre style ou reviens à toutes les box.
          </p>
          <Button onClick={() => setSelectedTag("Toutes")} variant="secondary">
            Voir toutes les box
          </Button>
        </div>
      ) : (
        <div aria-live="polite" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <CandyProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="container grid gap-10 py-16" id="how-it-works">
      <SectionIntro
        kicker="Comment ça marche ?"
        title="Un parcours simple : panier ici, paiement via Vinted."
        text="Ta box est préparée en vidéo après paiement."
      />
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex flex-col items-center">
              {/* Step Card */}
              <div className="w-full h-full rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-raised)] hover:border-[#ff7aae]/20 flex flex-col gap-4 text-center items-center">
                {/* Header Row: Circle number & Icon */}
                <div className="flex w-full items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe8f2] text-sm font-black text-[#ff7aae] border border-[#ffe8f2]">
                    {index + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#a788fa]">
                    <Icon size={24} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="grid gap-2 text-left w-full mt-2">
                  <h3 className="text-lg font-extrabold text-[#684fd6]">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#a788fa] font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting Arrow (Desktop/Large screens) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-[#c4b5fd] animate-pulse">
                  <span className="text-2xl font-light">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-[#fff7fb] p-6 text-center text-sm font-bold shadow-[var(--shadow-soft)] text-[#684fd6]">
        Aucun paiement sur le site · Commande finalisée via Vinted · Box préparée en vidéo
      </div>
    </section>
  );
}

export function VintedTrustSection() {
  const badges = [
    { icon: ShieldCheck, label: "Paiement via Vinted" },
    { icon: PackageCheck, label: "Livraison Vinted" },
    { icon: Video, label: "Préparation en vidéo" },
    { icon: MessageCircle, label: "Contact avant commande" }
  ];

  return (
    <section className="container py-12">
      <div className="grid gap-8 rounded-[var(--radius-xl)] border border-[#ffe8f2] bg-white p-6 shadow-[var(--shadow-soft)] md:grid-cols-[1.2fr_1fr_0.8fr] md:p-10">
        <div className="grid content-start gap-4">
          <SectionIntro
            kicker="Vinted"
            title="Paiement & livraison via Vinted"
            text="Aucun paiement n'est effectué sur ce site. Après ta demande, nous créons une annonce Vinted personnalisée pour finaliser l'achat en toute sécurité."
          />
        </div>
        <div className="grid gap-3 content-center">
          {badges.map(({ icon: Icon, label }) => (
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[#ffe8f2] bg-[#fff7fb] p-4 font-bold text-[#684fd6] shadow-sm transition-transform duration-300 hover:scale-[1.02]" key={label}>
              <Icon className="text-[#ff7aae] shrink-0" size={20} />
              <span className="text-xs uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        {/* Teal Vinted card */}
        <div className="flex flex-col justify-between rounded-[var(--radius-lg)] bg-[#097e82] p-6 text-white shadow-[var(--shadow-soft)] hover:scale-[1.02] transition-transform duration-300">
          <div className="grid gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#9ae9ec]">On passe par</p>
            <p className="text-3xl font-black tracking-tight flex items-center gap-1.5">
              Vinted
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-[#097e82]">✓</span>
            </p>
          </div>
          <p className="text-xs font-semibold leading-relaxed text-[#d4f9fa] mt-8">
            Plateforme française fiable & sécurisée
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="container grid gap-8 py-12">
      <SectionIntro kicker="Avis" title="Elles ont adoré leurs surprises 💕" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, index) => {
          const initials = item.name.slice(0, 2).toUpperCase();
          const avatarColors = [
            "bg-[#ffe8f2] text-[#ff7aae]",
            "bg-[#f3e8ff] text-[#a788fa]",
            "bg-[#fff4ea] text-[#ffd6a5]"
          ];
          const color = avatarColors[index % avatarColors.length];

          return (
            <figure className="grid gap-4 rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-white p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-[1.02] relative" key={item.name}>
              {/* Profile header row */}
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-black text-sm ${color} border border-[#ffe8f2]`}>
                  {initials}
                </div>
                <div className="grid gap-0.5">
                  <figcaption className="text-sm font-extrabold text-[#684fd6]">{item.name}</figcaption>
                  <div className="flex gap-0.5 text-[#f59f5b]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-sm font-semibold leading-relaxed text-[#a788fa] mt-2">&quot;{item.quote}&quot;</blockquote>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function FaqPreviewSection() {
  return (
    <section className="container grid gap-6 py-12">
      <SectionIntro kicker="FAQ" title="Les questions avant de demander ta box." />
      <div className="grid gap-3">
        {faqPreview.map((item, index) => (
          <details
            className="group rounded-[var(--radius-lg)] border border-[#ffe8f2] bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:bg-[#fff7fb] hover:border-[#ff7aae]/30"
            key={item.question}
            open={index === 0}
          >
            <summary className="flex cursor-pointer items-center justify-between text-base font-extrabold text-[#684fd6] outline-none select-none transition-colors group-open:text-[#ff7aae]">
              <span>{item.question}</span>
              <span className="text-[#ff7aae] text-base font-black flex items-center justify-center h-6 w-6 rounded-full bg-[#ffe8f2] group-open:bg-[#ff7aae] group-open:text-white transition-all duration-200">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="pt-4 leading-relaxed text-[#a788fa] font-medium text-sm border-t border-[#ffe8f2] mt-4">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({
  kicker,
  title,
  text
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="grid max-w-3xl gap-3">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-[#ff7aae]">{kicker}</p>
      <h2 className="text-[length:var(--text-h2)] text-[#684fd6] font-[800] leading-[1.1]">{title}</h2>
      {text ? <p className="text-base leading-relaxed text-[#a788fa]">{text}</p> : null}
    </div>
  );
}

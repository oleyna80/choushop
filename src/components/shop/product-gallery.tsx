"use client";

import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getAccentClassName,
  getProductBadgeLabel
} from "@/features/product/product-detail";
import { cn } from "@/lib/utils";

export function ProductGallery({
  title,
  images,
  accentTone,
  badge,
  theme
}: {
  title: string;
  images: string[];
  accentTone: "accent" | "lavender" | "mint" | "peach";
  badge: "best-seller" | "edition-limitee" | "populaire" | "nouveaute";
  theme: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const gallery = images.length > 0 ? images : [];
  const activeImage = gallery[selectedImage] ?? gallery[0];
  const accent = getAccentClassName(accentTone);

  if (!activeImage) {
    return null;
  }

  return (
    <div className="grid gap-4">
      <Card className="relative rounded-[calc(var(--radius-xl)+0.35rem)] p-3 sm:p-4" padding="none" variant="product">
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-40 rounded-t-[calc(var(--radius-xl)+0.35rem)] bg-gradient-to-b",
            accent.washClassName
          )}
        />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
          <Badge variant={accent.badgeVariant}>{getProductBadgeLabel(badge)}</Badge>
          <Badge variant="neutral">{theme}</Badge>
        </div>
        <div className="absolute bottom-4 right-4 z-10 rounded-[var(--radius-pill)] bg-[rgba(47,36,65,0.78)] px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-white/92 backdrop-blur">
          {selectedImage + 1}/{gallery.length}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-xl)-0.25rem)] bg-white/80">
          <Image
            priority
            alt={title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            src={activeImage}
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {gallery.map((image, index) => {
          const isActive = index === selectedImage;

          return (
            <button
              aria-label={`Voir l'image ${index + 1} de ${title}`}
              className={cn(
                "focus-ring group relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-white/78 ring-1 ring-transparent",
                isActive
                  ? cn("shadow-[var(--shadow-soft)] ring-2", accent.ringClassName)
                  : "hover:-translate-y-0.5"
              )}
              key={image}
              onClick={() => setSelectedImage(index)}
              type="button"
            >
              <Image
                alt={`${title} - vue ${index + 1}`}
                className={cn(
                  "object-cover transition duration-300",
                  isActive ? "scale-[1.02]" : "group-hover:scale-[1.04]"
                )}
                fill
                sizes="(min-width: 640px) 18vw, 28vw"
                src={image}
              />
              <span
                className={cn(
                  "absolute inset-0 rounded-[var(--radius-lg)] border transition",
                  isActive ? "border-white/85" : "border-white/30"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

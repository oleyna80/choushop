import type { AccentTone } from "@/features/catalog/storefront-types";

export function getToneStyles(tone: AccentTone) {
  switch (tone) {
    case "accent":
      return {
        badge: "accent" as const,
        panel: "from-[rgba(255,95,162,0.2)] via-white/88 to-[rgba(255,216,202,0.36)]",
        wash: "bg-[rgba(255,95,162,0.14)]",
        text: "text-[var(--accent-strong)]",
        border: "border-[rgba(255,95,162,0.16)]"
      };
    case "lavender":
      return {
        badge: "lavender" as const,
        panel: "from-[rgba(216,201,255,0.34)] via-white/90 to-[rgba(255,255,255,0.84)]",
        wash: "bg-[rgba(216,201,255,0.2)]",
        text: "text-[#6e53b9]",
        border: "border-[rgba(216,201,255,0.34)]"
      };
    case "mint":
      return {
        badge: "mint" as const,
        panel: "from-[rgba(215,244,234,0.5)] via-white/90 to-[rgba(255,255,255,0.84)]",
        wash: "bg-[rgba(215,244,234,0.44)]",
        text: "text-[#2c7a5c]",
        border: "border-[rgba(215,244,234,0.64)]"
      };
    case "peach":
      return {
        badge: "peach" as const,
        panel: "from-[rgba(255,216,202,0.55)] via-white/92 to-[rgba(255,255,255,0.84)]",
        wash: "bg-[rgba(255,216,202,0.58)]",
        text: "text-[#bb6a4e]",
        border: "border-[rgba(255,216,202,0.74)]"
      };
  }
}

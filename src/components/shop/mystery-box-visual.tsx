import type { AccentTone } from "@/features/catalog/storefront-types";
import { cn } from "@/lib/utils";

const toneClass: Record<AccentTone, string> = {
  accent: "bg-[var(--surface-pink)] text-[var(--primary)]",
  lavender: "bg-[var(--surface-lilac)] text-[var(--secondary)]",
  mint: "bg-[var(--mint)] text-[#2f7a62]",
  peach: "bg-[var(--surface-peach)] text-[#c06a48]"
};

export function MysteryBoxVisual({
  tone = "accent",
  compact = false,
  className
}: {
  tone?: AccentTone;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[var(--radius-lg)]",
        toneClass[tone],
        compact ? "aspect-[1.25]" : "aspect-[1.35]",
        className
      )}
    >
      <div className="absolute inset-x-[12%] top-[18%] h-[58%] rounded-[999px] bg-white/38" />
      <div className="relative h-[54%] w-[44%]">
        <div className="absolute inset-x-[8%] bottom-0 h-[54%] rounded-b-[18px] border-4 border-pink-200 bg-white" />
        <div className="absolute left-[10%] top-[11%] h-[44%] w-[40%] skew-y-[34deg] border-4 border-pink-200 bg-[rgba(255,255,255,0.72)]" />
        <div className="absolute right-[10%] top-[11%] h-[44%] w-[40%] -skew-y-[34deg] border-4 border-pink-200 bg-[rgba(255,255,255,0.72)]" />
        <div className="absolute left-1/2 top-[14%] h-[83%] w-2 -translate-x-1/2 rounded-full bg-[var(--primary)]" />
        <div className="absolute left-[9%] top-[45%] h-2 w-[82%] rounded-full bg-pink-200" />
      </div>
    </div>
  );
}

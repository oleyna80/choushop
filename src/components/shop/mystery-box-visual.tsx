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
        "relative grid place-items-center overflow-hidden rounded-[var(--radius-lg)] transition-all duration-300",
        toneClass[tone],
        compact ? "aspect-[1.25]" : "aspect-[1.35]",
        className
      )}
    >
      {/* Glow highlight behind the box */}
      <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-transparent pointer-events-none" />

      <svg
        className="w-[52%] h-[52%] select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Drop Shadow under the box */}
        <ellipse cx="100" cy="160" rx="55" ry="10" fill="rgba(181, 109, 170, 0.18)" />
        
        {/* Box interior content (Tissue paper/stars peeking out) */}
        <g className="animate-float-gentle">
          {/* Magic glow interior */}
          <circle cx="100" cy="85" r="25" fill="url(#magicGlow)" opacity="0.7" />
          
          {/* Magical sparkles floating out */}
          <path
            d="M100 42L103 48L109 51L103 54L100 60L97 54L91 51L97 48L100 42Z"
            fill="#FFF066"
            className="animate-sparkle"
            style={{ animationDuration: '1.8s' }}
          />
          <path
            d="M80 58L82 62L86 63L82 64L80 68L78 64L74 63L78 62L80 58Z"
            fill="#FFAAE5"
            className="animate-sparkle"
            style={{ animationDuration: '2.2s', animationDelay: '0.4s' }}
          />
          <path
            d="M120 52L122 56L126 57L122 58L120 62L118 58L114 57L118 56L120 52Z"
            fill="#9B7CFF"
            className="animate-sparkle"
            style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}
          />
        </g>

        {/* Open Lid Flaps */}
        {/* Left Lid */}
        <polygon
          points="56,104 30,80 50,65 76,89"
          fill="url(#lidLeft)"
          stroke="rgba(232, 75, 163, 0.15)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Right Lid */}
        <polygon
          points="144,104 170,80 150,65 124,89"
          fill="url(#lidRight)"
          stroke="rgba(232, 75, 163, 0.15)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Box Interior Backside */}
        <polygon points="56,104 100,126 144,104 144,100 100,78 56,100" fill="#FFE8F4" />
        
        {/* Tissue paper folds inside */}
        <path d="M60 98 C 75 88, 90 108, 105 88 C 115 78, 128 92, 138 90 L 142 104 L 58 104 Z" fill="#FFF2F9" />
        <path d="M72 101 C 85 92, 95 106, 110 94 L 122 104 L 68 104 Z" fill="#F0E8FF" />

        {/* Box Front Left Face */}
        <polygon points="56,104 100,126 100,174 56,152" fill="url(#sideLeft)" />
        {/* Box Front Right Face */}
        <polygon points="100,126 144,104 144,152 100,174" fill="url(#sideRight)" />

        {/* Ribbons wrapping the box */}
        {/* Left Face Ribbon */}
        <polygon points="75,114 83,118 83,166 75,162" fill="url(#ribbonLeft)" />
        {/* Right Face Ribbon */}
        <polygon points="117,118 125,114 125,162 117,166" fill="url(#ribbonRight)" />

        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2FC" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFE1F4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFE1F4" stopOpacity="0" />
          </radialGradient>

          {/* Box Side Gradients */}
          <linearGradient id="sideLeft" x1="56" y1="129" x2="100" y2="129" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF5FA" />
          </linearGradient>
          <linearGradient id="sideRight" x1="100" y1="129" x2="144" y2="129" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEBF5" />
            <stop offset="100%" stopColor="#FFE4F1" />
          </linearGradient>

          {/* Lid Gradients */}
          <linearGradient id="lidLeft" x1="30" y1="84" x2="76" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFEAF4" />
          </linearGradient>
          <linearGradient id="lidRight" x1="124" y1="84" x2="170" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEAF4" />
            <stop offset="100%" stopColor="#FFE4F1" />
          </linearGradient>

          {/* Ribbon Gradients */}
          <linearGradient id="ribbonLeft" x1="75" y1="140" x2="83" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E84BA3" />
            <stop offset="100%" stopColor="#D93693" />
          </linearGradient>
          <linearGradient id="ribbonRight" x1="117" y1="140" x2="125" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D93693" />
            <stop offset="100%" stopColor="#E84BA3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

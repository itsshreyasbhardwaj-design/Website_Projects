import type { CupFinish } from "@/lib/products";

const FILL: Record<CupFinish, { glass: string; rim: string; straw: string }> = {
  bamboo: { glass: "url(#g-bamboo)", rim: "#b5793a", straw: "#c9a06a" },
  blush: { glass: "url(#g-blush)", rim: "#d98a8f", straw: "#d98a8f" },
  iridescent: { glass: "url(#g-iri)", rim: "#bfa9dd", straw: "#a8e6cf" },
};

export function CupGlyph({
  finish,
  className,
}: {
  finish: CupFinish;
  className?: string;
}) {
  const f = FILL[finish];
  return (
    <svg viewBox="0 0 160 200" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="g-iri" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec6f9e" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#bfa9dd" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a8e6cf" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="g-blush" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d2d6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#d98a8f" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="g-bamboo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e7ddce" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="g-coffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5630" />
          <stop offset="100%" stopColor="#5c3719" />
        </linearGradient>
      </defs>

      {/* straw */}
      <rect x="96" y="20" width="9" height="150" rx="4" transform="rotate(8 100 90)" fill={f.straw} opacity="0.9" />
      {/* glass body */}
      <path d="M44 56 L116 56 L108 184 Q108 192 100 192 L60 192 Q52 192 52 184 Z" fill={f.glass} stroke={f.rim} strokeOpacity="0.35" strokeWidth="1.5" />
      {/* coffee fill */}
      <path d="M50 96 L110 96 L106 178 Q106 184 100 184 L60 184 Q54 184 54 178 Z" fill="url(#g-coffee)" opacity="0.92" />
      {/* ice */}
      <rect x="62" y="104" width="20" height="20" rx="4" transform="rotate(12 72 114)" fill="#eaf6ff" opacity="0.55" />
      <rect x="82" y="118" width="18" height="18" rx="4" transform="rotate(-10 91 127)" fill="#eaf6ff" opacity="0.45" />
      {/* rim/lid */}
      <ellipse cx="80" cy="56" rx="38" ry="7" fill={f.rim} opacity="0.85" />
      <ellipse cx="80" cy="54" rx="34" ry="5" fill="#fff" opacity="0.25" />
      {/* highlight */}
      <path d="M60 70 Q58 130 66 180" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

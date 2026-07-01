/* BrewdBro instant-coffee stand-up pouch — recreated as SVG to match the pack art.
   Drop a real photo at /public/photos/pouch.png to replace if desired. */
export function PouchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 392" className={className} role="img" aria-label="BrewdBro Premium Instant Coffee, 180g pouch">
      <defs>
        <clipPath id="pouch-clip">
          <path d="M44 28 h212 a18 18 0 0 1 18 18 v300 a18 18 0 0 1 -18 18 h-212 a18 18 0 0 1 -18 -18 v-300 a18 18 0 0 1 18 -18 z" />
        </clipPath>
        <linearGradient id="pg-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f5f5b" />
          <stop offset="50%" stopColor="#15716b" />
          <stop offset="100%" stopColor="#0e5a57" />
        </linearGradient>
        <linearGradient id="pg-orange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e15a27" />
          <stop offset="55%" stopColor="#e75f29" />
          <stop offset="100%" stopColor="#d2511f" />
        </linearGradient>
        <linearGradient id="pg-cream" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f4ebd6" />
          <stop offset="50%" stopColor="#f1e7cf" />
          <stop offset="100%" stopColor="#ece1c6" />
        </linearGradient>
        <path id="pg-arc-top" d="M62 312 A26 26 0 0 1 114 312" />
        <path id="pg-arc-bot" d="M64 314 A24 24 0 0 0 112 314" />
      </defs>

      {/* drop shadow */}
      <ellipse cx="150" cy="380" rx="98" ry="11" fill="#000" opacity="0.08" />

      <g clipPath="url(#pouch-clip)">
        {/* teal */}
        <rect x="0" y="0" width="300" height="392" fill="url(#pg-teal)" />
        {/* zipper seal ridges */}
        <g stroke="#0a4f4b" strokeWidth="2.4" opacity="0.6">
          <line x1="52" y1="64" x2="248" y2="64" />
          <line x1="52" y1="74" x2="248" y2="74" />
          <line x1="52" y1="84" x2="248" y2="84" />
        </g>
        {/* cream wave */}
        <path d="M0 120 C 52 150 92 156 150 150 C 212 144 250 116 300 132 L300 392 L0 392 Z" fill="url(#pg-cream)" />
        {/* orange wave */}
        <path d="M0 268 C 64 240 118 258 162 270 C 214 284 262 260 300 274 L300 392 L0 392 Z" fill="url(#pg-orange)" />
        {/* orange texture */}
        <g stroke="#c44e1b" strokeWidth="2" opacity="0.4" fill="none">
          <path d="M0 300 C 64 284 120 300 164 312 C 214 326 262 304 300 316" />
          <path d="M0 328 C 64 312 120 328 164 340 C 214 354 262 332 300 344" />
          <path d="M0 356 C 64 340 120 356 164 368 C 214 382 262 360 300 372" />
        </g>
      </g>

      {/* tear notches */}
      <path d="M26 150 l8 5 l-8 5 z" fill="#0a4f4b" />
      <path d="M274 150 l-8 5 l8 5 z" fill="#0a4f4b" />

      {/* wordmark */}
      <text x="140" y="182" textAnchor="middle" fontFamily="'Trebuchet MS','Arial Rounded MT Bold',system-ui,sans-serif" fontWeight="800" fontSize="52" letterSpacing="-1.5" fill="#2b1a12">Brewd</text>
      <text x="214" y="192" fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="800" fontSize="20" letterSpacing="1" fill="#0f5f5b">BRO</text>
      {/* steam */}
      <g fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M210 152 C 204 144 214 138 208 128" stroke="#2b1a12" strokeWidth="2.4" />
        <path d="M220 154 C 214 146 224 140 218 130" stroke="#15716b" strokeWidth="2.4" />
      </g>

      {/* tagline */}
      <text x="150" y="212" textAnchor="middle" fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="800" fontSize="13.5" letterSpacing="1.2" fill="#e15a27">JUST BREW IT BRO!</text>

      {/* premium pill */}
      <rect x="84" y="222" width="132" height="38" rx="9" fill="#0f5f5b" />
      <text x="150" y="238" textAnchor="middle" fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="700" fontSize="11.5" letterSpacing="1.5" fill="#f1e7cf">PREMIUM</text>
      <text x="150" y="252" textAnchor="middle" fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="700" fontSize="11.5" letterSpacing="0.6" fill="#f1e7cf">INSTANT COFFEE</text>

      {/* bean stamp */}
      <g fill="#2b1a12">
        <circle cx="88" cy="312" r="36" fill="none" stroke="#2b1a12" strokeWidth="2.2" />
        <text fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.4">
          <textPath href="#pg-arc-top" startOffset="50%" textAnchor="middle">RICH AROMA</textPath>
        </text>
        <text fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.4">
          <textPath href="#pg-arc-bot" startOffset="50%" textAnchor="middle">BOLD TASTE</textPath>
        </text>
        <path d="M55 312 l3 -3 l3 3 l-3 3 z" />
        <path d="M118 312 l3 -3 l3 3 l-3 3 z" />
        <ellipse cx="88" cy="310" rx="9" ry="15" />
        <path d="M88 297 C 84 303 84 317 88 323" stroke="#e15a27" strokeWidth="1.6" fill="none" />
      </g>

      {/* net weight */}
      <text x="188" y="356" textAnchor="middle" fontFamily="'Trebuchet MS',system-ui,sans-serif" fontWeight="700" fontSize="14.5" letterSpacing="0.5" fill="#2b1a12">NET WT. 180g</text>
    </svg>
  );
}

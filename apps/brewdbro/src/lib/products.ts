export type CupFinish = "bamboo" | "blush" | "iridescent";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: "combo" | "cup" | "premix";
  price: number; // INR
  compareAt?: number; // strike-through anchor
  finish: CupFinish; // drives the 3D cup colour
  badge?: string;
  capacityMl?: string;
  description: string;
  specs: { label: string; value: string }[];
  includesPremix: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "the-keep-the-cup-combo",
    name: "The Keep-the-Cup Combo",
    tagline: "A cup you keep + the coffee that fills it.",
    category: "combo",
    price: 499,
    compareAt: 598,
    finish: "iridescent",
    badge: "Bestseller",
    capacityMl: "350–450 ml",
    description:
      "Our hero. One iridescent double-wall glass tumbler with a spill-proof lid and reusable straw, plus 10 sachets of café-grade premix. Pour, film, sip — then keep the cup forever.",
    specs: [
      { label: "Includes", value: "1 tumbler + 10 sachets" },
      { label: "Capacity", value: "350–450 ml" },
      { label: "Body", value: "Ribbed double-wall glass" },
      { label: "Lid", value: "Spill-proof bamboo" },
      { label: "Straw", value: "Reusable glass" },
      { label: "Care", value: "Hand-wash · no microwave" },
    ],
    includesPremix: true,
  },
  {
    slug: "iridescent-tumbler",
    name: "Iridescent Tumbler",
    tagline: "Pearl-shimmer glass that shifts as you tilt it.",
    category: "cup",
    price: 349,
    finish: "iridescent",
    badge: "Most gifted",
    capacityMl: "350–450 ml",
    description:
      "The cup that started the obsession. A pearl-shimmer finish that catches light from every angle — the reason people stop scrolling. Ships with lid and glass straw.",
    specs: [
      { label: "Finish", value: "Pearl iridescent" },
      { label: "Capacity", value: "350–450 ml" },
      { label: "Body", value: "Ribbed double-wall glass" },
      { label: "Lid", value: "Spill-proof silicone" },
      { label: "Straw", value: "Reusable glass" },
      { label: "Care", value: "Hand-wash · no microwave" },
    ],
    includesPremix: false,
  },
  {
    slug: "blush-ribbed-tumbler",
    name: "Blush Ribbed Tumbler",
    tagline: "Soft pink ribbing. Pure desk-candy.",
    category: "cup",
    price: 349,
    finish: "blush",
    capacityMl: "350–450 ml",
    description:
      "Ribbed blush glass that photographs like a dream on any desk. Comes with a colour-matched lid and reusable straw.",
    specs: [
      { label: "Finish", value: "Blush ribbed" },
      { label: "Capacity", value: "350–450 ml" },
      { label: "Body", value: "Ribbed double-wall glass" },
      { label: "Lid", value: "Spill-proof silicone" },
      { label: "Straw", value: "Reusable silicone" },
      { label: "Care", value: "Hand-wash · no microwave" },
    ],
    includesPremix: false,
  },
  {
    slug: "bamboo-lid-tumbler",
    name: "Bamboo-Lid Tumbler",
    tagline: "Clear glass, warm bamboo. Quietly premium.",
    category: "cup",
    price: 399,
    finish: "bamboo",
    capacityMl: "350–450 ml",
    description:
      "The grown-up of the family — crystal-clear ribbed glass topped with a real bamboo lid and a glass straw. The one you gift to your boss.",
    specs: [
      { label: "Finish", value: "Clear ribbed glass" },
      { label: "Capacity", value: "350–450 ml" },
      { label: "Body", value: "Ribbed double-wall glass" },
      { label: "Lid", value: "Natural bamboo" },
      { label: "Straw", value: "Reusable glass" },
      { label: "Care", value: "Hand-wash · no microwave" },
    ],
    includesPremix: false,
  },
  {
    slug: "premium-instant-coffee",
    name: "Premium Instant Coffee",
    tagline: "Rich aroma, bold taste. Just brew it.",
    category: "premix",
    price: 199,
    finish: "iridescent",
    badge: "Bestseller",
    capacityMl: "180g pouch",
    description:
      "Our café-grade instant coffee in a resealable 180g stand-up pouch — around 90 cups of rich, bold brew. One spoon, hot or iced, ready in seconds. Just brew it, bro.",
    specs: [
      { label: "Net weight", value: "180g (~90 cups)" },
      { label: "Type", value: "Premium instant" },
      { label: "Serve", value: "Hot or iced" },
      { label: "Make it", value: "1 tsp → splash hot → top with milk + ice" },
      { label: "Pack", value: "Resealable stand-up pouch" },
    ],
    includesPremix: true,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const FINISH_LABEL: Record<CupFinish, string> = {
  bamboo: "Clear / Bamboo",
  blush: "Blush",
  iridescent: "Iridescent",
};

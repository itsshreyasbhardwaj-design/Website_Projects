"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "combo", label: "Combos" },
  { key: "cup", label: "Cups" },
  { key: "premix", label: "Refills" },
] as const;

export default function ShopPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const items = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-10">
      <p className="mono-label text-flame">Shop</p>
      <h1 className="editorial mt-2 text-5xl font-light md:text-6xl">
        Everything BrewdBro.
      </h1>
      <p className="mt-3 max-w-md text-taupe">
        Start with the combo, collect the cups, refill forever.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.key
                ? "bg-espresso text-cream"
                : "border border-sand bg-foam text-espresso hover:border-flame"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}

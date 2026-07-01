import Link from "next/link";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/format";
import { CupGlyph } from "./CupGlyph";
import { PouchGlyph } from "./PouchGlyph";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-sand bg-foam card-shadow transition hover:-translate-y-1">
      <Link
        href={`/product/${product.slug}`}
        className="relative grid aspect-[4/3] place-items-center bg-gradient-to-br from-cream to-sand/50"
      >
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-espresso px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            {product.badge}
          </span>
        )}
        {product.category === "premix" ? (
          <PouchGlyph className="h-44 transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <CupGlyph
            finish={product.finish}
            className="h-40 transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="mono-label text-flame">{product.category}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-bold leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-taupe">{product.tagline}</p>

        <div className="mt-4 flex items-center gap-2 font-mono">
          <span className="text-lg font-bold">{inr(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm text-taupe line-through">
              {inr(product.compareAt)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <AddToCartButton product={product} className="flex-1 px-4 py-2.5 text-sm" />
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-ghost px-4 py-2.5 text-sm"
            aria-label={`View ${product.name}`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  qty = 1,
  className = "",
  label = "Add to cart",
}: {
  product: Product;
  qty?: number;
  className?: string;
  label?: string;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className={`btn ${added ? "btn-dark" : "btn-primary"} ${className}`}
      aria-live="polite"
    >
      {added ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Added
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function MiniCartLink() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  if (count === 0) return null;
  return (
    <Link href="/cart" className="text-sm font-medium text-flame underline-offset-4 hover:underline">
      View cart ({count}) →
    </Link>
  );
}

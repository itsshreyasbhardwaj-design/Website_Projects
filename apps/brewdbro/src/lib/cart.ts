"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  finish: Product["finish"];
  category: Product["category"];
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.slug === p.slug);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.slug === p.slug ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return {
            lines: [
              ...s.lines,
              {
                slug: p.slug,
                name: p.name,
                price: p.price,
                finish: p.finish,
                category: p.category,
                qty,
              },
            ],
          };
        }),
      remove: (slug) =>
        set((s) => ({ lines: s.lines.filter((l) => l.slug !== slug) })),
      setQty: (slug, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    { name: "brewdbro-cart" }
  )
);

export const SHIPPING_FREE_OVER = 449;
export const SHIPPING_FLAT = 49;

export function shippingFor(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FLAT;
}

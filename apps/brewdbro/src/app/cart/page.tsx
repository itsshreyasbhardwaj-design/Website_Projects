"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, shippingFor, SHIPPING_FREE_OVER } from "@/lib/cart";
import { inr } from "@/lib/format";
import { CupGlyph } from "@/components/CupGlyph";
import { PouchGlyph } from "@/components/PouchGlyph";

export default function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sub = subtotal();
  const ship = shippingFor(sub);
  const total = sub + ship;
  const toFree = Math.max(0, SHIPPING_FREE_OVER - sub);

  if (!mounted) {
    return <main className="mx-auto max-w-3xl px-5 pt-28 pb-20" />;
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-20 text-center">
        <h1 className="font-display text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-taupe">Let&apos;s fix that.</p>
        <Link href="/shop" className="btn btn-primary mt-8 px-7 py-3.5">
          Shop BrewdBro
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-20">
      <h1 className="editorial text-4xl font-light md:text-5xl">Your cart</h1>

      {toFree > 0 ? (
        <p className="mt-3 text-sm text-taupe">
          Add <span className="font-semibold text-flame">{inr(toFree)}</span> more
          for free shipping.
        </p>
      ) : (
        <p className="mt-3 text-sm font-medium text-flame">
          🎉 You&apos;ve unlocked free shipping.
        </p>
      )}

      <ul className="mt-8 divide-y divide-sand rounded-3xl border border-sand bg-foam">
        {lines.map((l) => (
          <li key={l.slug} className="flex items-center gap-4 p-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cream to-sand/50">
              {l.category === "premix" ? (
                <PouchGlyph className="h-16" />
              ) : (
                <CupGlyph finish={l.finish} className="h-16" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/product/${l.slug}`} className="font-semibold hover:text-flame">
                {l.name}
              </Link>
              <p className="font-mono text-sm text-taupe">{inr(l.price)}</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-sand">
                  <button onClick={() => setQty(l.slug, l.qty - 1)} className="grid h-8 w-8 place-items-center" aria-label="Decrease">−</button>
                  <span className="w-6 text-center font-mono text-sm">{l.qty}</span>
                  <button onClick={() => setQty(l.slug, l.qty + 1)} className="grid h-8 w-8 place-items-center" aria-label="Increase">+</button>
                </div>
                <button onClick={() => remove(l.slug)} className="text-xs text-taupe underline-offset-2 hover:text-berry hover:underline">
                  Remove
                </button>
              </div>
            </div>
            <span className="font-mono font-bold">{inr(l.price * l.qty)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-3xl border border-sand bg-foam p-6">
        <Row label="Subtotal" value={inr(sub)} />
        <Row label="Shipping" value={ship === 0 ? "Free" : inr(ship)} />
        <div className="my-4 border-t border-sand" />
        <Row label="Total" value={inr(total)} big />
        <Link href="/checkout" className="btn btn-primary mt-6 w-full py-4 text-lg">
          Checkout · {inr(total)}
        </Link>
        <Link href="/shop" className="mt-3 block text-center text-sm text-taupe hover:text-flame">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={big ? "text-lg font-bold" : "text-taupe"}>{label}</span>
      <span className={`font-mono ${big ? "text-lg font-bold" : ""}`}>{value}</span>
    </div>
  );
}

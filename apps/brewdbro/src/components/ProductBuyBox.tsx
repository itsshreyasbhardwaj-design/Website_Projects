"use client";

import { useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";
import { inr } from "@/lib/format";
import { AddToCartButton, MiniCartLink } from "@/components/AddToCartButton";

export function ProductBuyBox({ product }: { product: Product }) {
  const combo = getProduct("the-keep-the-cup-combo")!;
  const canCombo = product.category === "cup";
  const [asCombo, setAsCombo] = useState(false);
  const [qty, setQty] = useState(1);

  const effective = asCombo && canCombo ? combo : product;
  const upgradeDelta = combo.price - product.price;

  const total = useMemo(() => effective.price * qty, [effective.price, qty]);

  return (
    <div>
      <div className="flex items-end gap-3 font-mono">
        <span className="text-3xl font-bold">{inr(effective.price)}</span>
        {effective.compareAt && (
          <span className="pb-1 text-lg text-taupe line-through">
            {inr(effective.compareAt)}
          </span>
        )}
      </div>

      {canCombo && (
        <button
          onClick={() => setAsCombo((v) => !v)}
          className={`mt-5 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
            asCombo ? "border-flame bg-flame/5" : "border-sand bg-foam hover:border-flame/60"
          }`}
        >
          <span>
            <span className="block font-semibold">Make it a combo</span>
            <span className="text-sm text-taupe">
              Add 10 premix sachets · +{inr(upgradeDelta)}
            </span>
          </span>
          <span
            className={`grid h-6 w-11 items-center rounded-full px-0.5 transition ${
              asCombo ? "bg-flame" : "bg-sand"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transition ${
                asCombo ? "translate-x-5" : ""
              }`}
            />
          </span>
        </button>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-full border border-sand bg-foam">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-mono font-bold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <AddToCartButton
          product={effective}
          qty={qty}
          className="flex-1 px-6 py-3.5 text-base"
          label={`Add — ${inr(total)}`}
        />
      </div>

      <div className="mt-4">
        <MiniCartLink />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-taupe">
        <Trust>♻ Reusable</Trust>
        <Trust>🎁 Gift-ready</Trust>
        <Trust>🔒 Secure UPI checkout</Trust>
        <Trust>🚚 Free shipping over ₹449</Trust>
      </div>
    </div>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1">{children}</span>;
}

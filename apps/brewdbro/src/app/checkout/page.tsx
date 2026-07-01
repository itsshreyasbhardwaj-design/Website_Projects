"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart, shippingFor } from "@/lib/cart";
import { inr } from "@/lib/format";
import { Logo } from "@/components/Logo";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", pickup: false });

  useEffect(() => setMounted(true), []);

  const sub = subtotal();
  const ship = shippingFor(sub);
  const total = sub + ship;

  const valid =
    form.name.trim().length > 1 &&
    /^\d{10}$/.test(form.phone.trim()) &&
    (form.pickup || form.address.trim().length > 6);

  if (mounted && lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold">Nothing to check out</h1>
        <Link href="/shop" className="btn btn-primary mt-6 px-7 py-3.5">Shop first</Link>
      </main>
    );
  }

  function onPaid() {
    const ref = "BB" + Math.floor(100000 + Math.random() * 899999);
    sessionStorage.setItem("brewdbro-last-order", JSON.stringify({ ref, total, name: form.name }));
    clear();
    router.push("/success");
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pt-28 pb-20">
      <Link href="/cart" className="mono-label text-taupe hover:text-flame">← Back to cart</Link>
      <h1 className="mt-4 font-display text-4xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]">
        {/* form */}
        <div className="space-y-5">
          <Field label="Full name" required>
            <input
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Aanya Sharma"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone" required hint="10-digit mobile">
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                className="input"
                placeholder="9876543210"
              />
            </Field>
            <Field label="Email" hint="for order updates">
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@email.com"
              />
            </Field>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-sand bg-foam p-4">
            <input
              type="checkbox"
              checked={form.pickup}
              onChange={(e) => setForm({ ...form, pickup: e.target.checked })}
              className="h-5 w-5 accent-flame"
            />
            <span className="text-sm">
              <span className="font-semibold">Campus pickup</span>
              <span className="block text-taupe">Skip shipping — collect at the Mesa stall.</span>
            </span>
          </label>

          {!form.pickup && (
            <Field label="Delivery address" required>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input min-h-24 resize-none"
                placeholder="Flat / street / city / PIN"
              />
            </Field>
          )}
        </div>

        {/* summary */}
        <aside className="h-fit rounded-3xl border border-sand bg-foam p-6">
          <h2 className="mono-label text-flame">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={l.slug} className="flex justify-between gap-3">
                <span className="text-taupe">{l.name} × {l.qty}</span>
                <span className="font-mono">{inr(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t border-sand" />
          <div className="flex justify-between text-sm"><span className="text-taupe">Subtotal</span><span className="font-mono">{inr(sub)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-taupe">Shipping</span><span className="font-mono">{ship === 0 ? "Free" : inr(ship)}</span></div>
          <div className="mt-3 flex justify-between border-t border-sand pt-3 text-lg font-bold"><span>Total</span><span className="font-mono">{inr(total)}</span></div>

          <button
            disabled={!valid}
            onClick={() => setPaying(true)}
            className="btn btn-primary mt-6 w-full py-4 text-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            Pay with UPI · {inr(total)}
          </button>
          <p className="mt-3 text-center text-xs text-taupe">
            🔒 UPI · Cards · Wallets · Secured by Razorpay
          </p>
        </aside>
      </div>

      {paying && (
        <RazorpayDemoSheet
          amount={total}
          onClose={() => setPaying(false)}
          onPaid={onPaid}
        />
      )}
    </main>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {required && <span className="text-berry">*</span>}
        {hint && <span className="text-xs font-normal text-taupe">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

/* A realistic Razorpay-style sheet for the showcase (demo mode).
   Swap for the real SDK by setting NEXT_PUBLIC_RAZORPAY_KEY and wiring an order route. */
function RazorpayDemoSheet({
  amount,
  onClose,
  onPaid,
}: {
  amount: number;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [stage, setStage] = useState<"choose" | "processing" | "done">("choose");

  function pay() {
    setStage("processing");
    setTimeout(() => setStage("done"), 1600);
    setTimeout(() => onPaid(), 2600);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-sand bg-cream px-5 py-4">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="font-display font-bold">BrewdBro</span>
            <span className="rounded bg-sand px-1.5 py-0.5 font-mono text-[10px] text-taupe">DEMO</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-taupe hover:text-espresso">✕</button>
        </div>

        <div className="p-5">
          <p className="text-sm text-taupe">Paying</p>
          <p className="font-mono text-3xl font-bold">{inr(amount)}</p>

          {stage === "choose" && (
            <div className="mt-5 space-y-3">
              <p className="mono-label text-taupe">Pay using</p>
              {["UPI · GPay / PhonePe / Paytm", "Card", "Netbanking", "Wallet"].map((m, i) => (
                <button
                  key={m}
                  onClick={pay}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition hover:border-flame ${
                    i === 0 ? "border-flame bg-flame/5" : "border-sand"
                  }`}
                >
                  <span className="font-medium">{m}</span>
                  <span className="text-taupe">→</span>
                </button>
              ))}
            </div>
          )}

          {stage === "processing" && (
            <div className="grid place-items-center gap-4 py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-sand border-t-flame" />
              <p className="text-sm text-taupe">Confirming payment…</p>
            </div>
          )}

          {stage === "done" && (
            <div className="grid place-items-center gap-4 py-12 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-flame/25">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1c140f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <p className="font-semibold">Payment successful</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

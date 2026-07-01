"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { inr } from "@/lib/format";

type Order = { ref: string; total: number; name: string };

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("brewdbro-last-order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  return (
    <main className="mx-auto grid min-h-dvh max-w-2xl place-items-center px-5 pt-24 pb-20 text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-flame">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h1 className="editorial mt-7 text-4xl font-light md:text-5xl">
          {order?.name ? `Thank you, ${order.name.split(" ")[0]}!` : "Order confirmed!"}
        </h1>
        <p className="mt-4 text-taupe">
          Your BrewdBro is on its way. We&apos;ve sent the details to your phone.
          Now go film that first pour. 📸
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-sand bg-foam p-6 text-left card-shadow">
          <div className="flex justify-between text-sm">
            <span className="text-taupe">Order ref</span>
            <span className="font-mono font-bold">{order?.ref ?? "BB——————"}</span>
          </div>
          {order && (
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-taupe">Amount paid</span>
              <span className="font-mono font-bold">{inr(order.total)}</span>
            </div>
          )}
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-taupe">Status</span>
            <span className="font-medium text-flame">Paid · processing</span>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn btn-primary px-7 py-3.5">Keep shopping</Link>
          <Link href="/" className="btn btn-ghost px-7 py-3.5">Back home</Link>
        </div>
      </div>
    </main>
  );
}

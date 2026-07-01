"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // read cart only on client to avoid hydration mismatch
  useEffect(() => {
    const unsub = useCart.subscribe((s) =>
      setCount(s.lines.reduce((n, l) => n + l.qty, 0))
    );
    setCount(useCart.getState().lines.reduce((n, l) => n + l.qty, 0));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-sand/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="BrewdBro home">
          <Logo size={36} className="shadow" />
          <span className="font-display text-lg font-bold tracking-tight">
            brewdbro
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/shop" className="transition hover:text-flame">
            Shop
          </Link>
          <Link href="/our-story" className="transition hover:text-flame">
            Our story
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/shop" className="btn btn-dark hidden px-4 py-2 text-sm sm:inline-flex">
            Shop the combo
          </Link>
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-sand bg-foam transition hover:border-flame"
            aria-label={`Cart, ${count} items`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-flame px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

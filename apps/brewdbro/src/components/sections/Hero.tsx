"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import type { CupFinish } from "@/lib/products";

const ExplodeCanvas = dynamic(() => import("@/components/three/ExplodeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-flame/20 blur-3xl" />
    </div>
  ),
});

const FINISHES: { key: CupFinish; label: string; dot: string }[] = [
  { key: "iridescent", label: "Iridescent", dot: "#bfa9dd" },
  { key: "blush", label: "Blush", dot: "#d98a8f" },
  { key: "bamboo", label: "Clear", dot: "#cdbfa8" },
];

const MATERIALS = [
  { n: "01", t: "Bamboo lid", d: "Spill-proof, naturally finished." },
  { n: "02", t: "Silicone seal", d: "Leak-tight under the lid." },
  { n: "03", t: "Ribbed grip", d: "Soft, no-slip band." },
  { n: "04", t: "Double-wall glass", d: "Keeps cold cold, hands comfy." },
  { n: "05", t: "Glass straw", d: "Reusable, plastic-free." },
];

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [finish, setFinish] = useState<CupFinish>("iridescent");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  const headOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);
  const matOpacity = useTransform(scrollYProgress, [0.24, 0.42, 0.62, 0.82], [0, 1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[260vh] bg-char text-cream">
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* warm ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/18 blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-[45vh] w-[45vh] rounded-full bg-teal/25 blur-[130px]" />
        </div>

        {/* 3D stage */}
        <div className="absolute inset-0">
          <ExplodeCanvas progress={progress} finish={finish} reduced={!!reduce} />
        </div>

        {/* top copy */}
        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="pointer-events-none absolute inset-x-0 top-[11vh] z-10 px-5 text-center"
        >
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.28em] text-flame sm:text-base">
            Just Brew It Bro!
          </p>
          <h1 className="editorial mx-auto mt-4 max-w-3xl text-6xl font-light leading-[0.92] sm:text-7xl lg:text-8xl">
            Keep the <span className="italic warm-text">cup.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-cream/70">
            Café-grade iced coffee at home — in a cup so good you keep it.
            Scroll to see what it&apos;s made of.
          </p>
          <div className="pointer-events-auto mt-7 flex justify-center gap-3">
            <Link href="/product/the-keep-the-cup-combo" className="btn btn-primary px-7 py-3.5">
              Shop the combo · ₹499
            </Link>
            <Link
              href="/shop"
              className="btn px-6 py-3.5 text-cream ring-1 ring-cream/25 hover:bg-cream/10"
            >
              All cups
            </Link>
          </div>
        </motion.div>

        {/* materials list — revealed mid-explode */}
        <motion.div
          style={{ opacity: matOpacity }}
          className="pointer-events-none absolute inset-y-0 right-6 z-10 hidden flex-col justify-center gap-5 md:flex"
        >
          {MATERIALS.map((m) => (
            <div key={m.n} className="max-w-[210px] text-right">
              <p className="mono-label text-flame">{m.n}</p>
              <p className="editorial text-2xl">{m.t}</p>
              <p className="text-sm text-cream/55">{m.d}</p>
            </div>
          ))}
        </motion.div>

        {/* colorway switch + scroll cue */}
        <div className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {FINISHES.map((f) => (
              <button
                key={f.key}
                onClick={() => setFinish(f.key)}
                aria-label={f.label}
                aria-pressed={finish === f.key}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  finish === f.key
                    ? "scale-110 border-cream"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ background: f.dot }}
              />
            ))}
          </div>
          <motion.span style={{ opacity: hintOpacity }} className="mono-label text-cream/45">
            scroll to disassemble ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}

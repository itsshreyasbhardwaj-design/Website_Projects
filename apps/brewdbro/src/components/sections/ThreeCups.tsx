import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CupGlyph } from "@/components/CupGlyph";
import { PRODUCTS } from "@/lib/products";
import { inr } from "@/lib/format";

const GLOW: Record<string, string> = {
  bamboo: "rgba(201,160,106,0.35)",
  blush: "rgba(217,138,143,0.40)",
  iridescent: "rgba(191,169,221,0.45)",
};

export function ThreeCups() {
  const cups = PRODUCTS.filter((p) => p.category === "cup");
  return (
    <section className="bg-espresso py-20 text-cream md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mono-label text-flame">02 — The colorways</p>
          <h2 className="editorial mt-3 max-w-2xl text-4xl font-light leading-[1.02] md:text-6xl">
            Pick the one that&apos;s <span className="italic">so you.</span>
          </h2>
          <p className="mt-4 max-w-md text-cream/55">
            Same café-grade glass. Three personalities. Drag to explore.
          </p>
        </Reveal>
      </div>

      {/* horizontal cinematic gallery */}
      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cups.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group relative flex w-[80vw] max-w-[440px] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] border border-cream/10 bg-char p-8"
          >
            <div
              className="relative grid flex-1 place-items-center rounded-2xl py-12"
              style={{ background: `radial-gradient(circle at 50% 45%, ${GLOW[p.finish]}, transparent 70%)` }}
            >
              <CupGlyph
                finish={p.finish}
                className="h-60 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <h3 className="editorial text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-cream/55">{p.tagline}</p>
              </div>
              <span className="font-mono text-lg font-bold">{inr(p.price)}</span>
            </div>
          </Link>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  );
}

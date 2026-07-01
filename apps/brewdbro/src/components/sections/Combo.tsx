import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CupGlyph } from "@/components/CupGlyph";
import { getProduct } from "@/lib/products";
import { inr } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";

export function Combo() {
  const combo = getProduct("the-keep-the-cup-combo")!;
  const save = (combo.compareAt ?? combo.price) - combo.price;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="mono-label text-flame">01 — The combo</p>
        <h2 className="editorial mt-3 max-w-2xl text-4xl font-light leading-[1.02] md:text-6xl">
          Coffee <span className="text-taupe">+</span> a cup you keep.
        </h2>
      </Reveal>

      <div className="mt-12 grid items-center gap-8 rounded-[2rem] border border-sand bg-foam p-6 card-shadow md:grid-cols-2 md:p-10">
        <Reveal className="relative grid place-items-center rounded-3xl bg-gradient-to-br from-latte via-sand to-cream py-10">
          <CupGlyph finish="iridescent" className="h-64 drop-shadow-xl" />
          <span className="absolute right-5 top-5 rounded-full bg-flame px-3 py-1 text-xs font-bold text-white">
            Save {inr(save)}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="editorial text-3xl">{combo.name}</h3>
          <p className="mt-3 text-taupe">{combo.description}</p>

          <ul className="mt-6 space-y-2.5 text-sm">
            {["1 iridescent double-wall glass tumbler", "Spill-proof lid + reusable straw", "10 sachets of café-grade premix", "Free shipping across India"].map(
              (b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-flame/20 text-flame-deep">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  {b}
                </li>
              )
            )}
          </ul>

          <div className="mt-7 flex items-center gap-3 font-mono">
            <span className="text-3xl font-bold">{inr(combo.price)}</span>
            <span className="text-lg text-taupe line-through">{inr(combo.compareAt!)}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton product={combo} className="px-7 py-3.5" />
            <Link href={`/product/${combo.slug}`} className="btn btn-ghost px-6 py-3.5">
              Details
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

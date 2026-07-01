import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const STATS = [
  { k: "₹110–130", v: "cost per cup", note: "sourced + assembled in-house" },
  { k: "~58%", v: "blended margin", note: "on the hero combo" },
  { k: "3 ways", v: "to buy", note: "combo · cup · refill" },
  { k: "₹0", v: "ad spend", note: "the product films itself" },
];

export function BusinessStrip() {
  return (
    <section className="bg-teal py-20 text-cream md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mono-label text-flame">05 — A real business</p>
          <h2 className="editorial mt-3 max-w-2xl text-4xl font-light leading-[1.05] md:text-5xl">
            Not a class project. A unit-economics-positive brand.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.07}>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <p className="font-mono text-3xl font-bold md:text-4xl">{s.k}</p>
                <p className="mt-1 font-semibold">{s.v}</p>
                <p className="mt-1 text-xs text-cream/55">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/our-story" className="btn btn-primary px-6 py-3">
              Read the full story
            </Link>
            <p className="text-sm text-cream/60">
              Built by Team 19 · Future Founders, Mesa School of Business.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

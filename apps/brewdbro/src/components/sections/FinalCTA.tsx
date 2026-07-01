import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-16 text-center text-cream md:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute -left-10 top-0 h-60 w-60 rounded-full bg-flame/45 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-teal/55 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="editorial mx-auto max-w-2xl text-5xl font-light leading-[1.0] md:text-7xl">
              Your next favourite cup is one tap away.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-cream/70">
              Pour it. Film it. Keep it. Free shipping on the combo, across India.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/product/the-keep-the-cup-combo" className="btn btn-primary px-8 py-4 text-lg">
                Shop the combo · ₹499
              </Link>
              <Link href="/shop" className="btn px-8 py-4 text-lg text-cream ring-1 ring-cream/30 hover:bg-cream/10">
                Browse all
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

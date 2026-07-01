import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our story · BrewdBro",
  description:
    "How a Future Founders project at Mesa School of Business became BrewdBro — the keep-the-cup coffee brand.",
};

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-10">
      <Reveal>
        <p className="mono-label text-flame">Our story</p>
        <h1 className="editorial mt-3 text-5xl font-light leading-[1.0] md:text-7xl">
          We sell a feeling. <br />
          <span className="italic warm-text">The cup is the proof.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 text-lg leading-relaxed text-espresso/80">
          BrewdBro started as Team 19&apos;s entry into the{" "}
          <strong>Future Founders</strong> programme at Mesa School of Business.
          The brief was simple: build a product people actually want. We noticed
          something — our friends weren&apos;t just buying coffee. They were buying
          the <em>moment</em>: the pour, the ice, the photo, the cup on the desk.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-5 text-lg leading-relaxed text-espresso/80">
          So we built the whole thing around that. Café-grade instant premix that
          takes 30 seconds, served in a ribbed double-wall glass tumbler so
          beautiful you keep it forever. Sell the drink, sell the cup, or sell
          them together. The product films itself — which means our customers do
          our marketing for us.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: "The drink", v: "Café-grade premix, 30-second ritual, hot or iced." },
          { k: "The cup", v: "Ribbed double-wall glass. A keepsake, not packaging." },
          { k: "The combo", v: "Keep-the-cup — our hero offer and best margin." },
        ].map((c, i) => (
          <Reveal key={c.k} delay={0.1 + i * 0.07}>
            <div className="h-full rounded-2xl border border-sand bg-foam p-5">
              <h3 className="font-display text-lg font-bold">{c.k}</h3>
              <p className="mt-2 text-sm text-taupe">{c.v}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 rounded-[2rem] bg-espresso p-8 text-cream md:p-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Why it&apos;s a real business
          </h2>
          <p className="mt-4 text-cream/75">
            Unit-economics positive from day one: ~₹110–130 cost per cup, ~58%
            blended margin on the combo, three ways to buy, and effectively zero
            ad spend because the product is inherently shareable. The website you
            just used is the same store our first customers checked out on.
          </p>
          <Link href="/shop" className="btn btn-primary mt-7 px-7 py-3.5">
            Try it yourself
          </Link>
        </div>
      </Reveal>
    </main>
  );
}

import { Reveal } from "@/components/Reveal";

const POSTS = [
  { from: "#e7d8c3", to: "#b5793a", quote: "literally the cutest thing on my desk", who: "@aanya.brews" },
  { from: "#dccdb9", to: "#6f4e37", quote: "the pour is so satisfying i filmed it 4 times", who: "@kabir_k" },
  { from: "#f4ecdf", to: "#3d2c1e", quote: "gifted it to my roommate, now she wants two", who: "@meher.m" },
  { from: "#e6c9a8", to: "#8f5a27", quote: "tastes like my ₹250 café order. costs nothing.", who: "@dev.codes" },
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="mono-label text-flame">04 — Made for the feed</p>
        <h2 className="editorial mt-3 max-w-2xl text-4xl font-light leading-[1.02] md:text-6xl">
          The cup <span className="italic warm-text">is</span> the marketing.
        </h2>
        <p className="mt-4 max-w-md text-taupe">
          Every pour is a reel waiting to happen. Our customers do our ads for us.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {POSTS.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <figure className="overflow-hidden rounded-3xl border border-sand bg-foam card-shadow">
              <div
                className="flex aspect-[3/4] items-end p-4"
                style={{ background: `linear-gradient(160deg, ${p.from}, ${p.to})` }}
              >
                <blockquote className="text-sm font-semibold leading-snug text-white drop-shadow">
                  “{p.quote}”
                </blockquote>
              </div>
              <figcaption className="px-4 py-3 font-mono text-xs text-taupe">
                {p.who}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

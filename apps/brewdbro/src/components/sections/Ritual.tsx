import { Reveal } from "@/components/Reveal";

const STEPS = [
  { n: "01", t: "Drop a sachet", d: "One sachet of premix into your tumbler." },
  { n: "02", t: "Splash of hot", d: "A small splash of hot water — stir to dissolve, no clumps." },
  { n: "03", t: "Top with cold", d: "200–250 ml cold milk or water, then a scoop of ice." },
  { n: "04", t: "Straw & sip", d: "Pop the straw in, film the pour, and serve." },
];

export function Ritual() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="mono-label text-flame">03 — The 30-second ritual</p>
        <h2 className="editorial mt-3 max-w-2xl text-4xl font-light leading-[1.02] md:text-6xl">
          Café iced coffee. <span className="italic text-taupe">No café.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="relative h-full rounded-3xl border border-sand bg-foam p-6 card-shadow">
              <span className="font-mono text-4xl font-bold text-sand">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-taupe">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

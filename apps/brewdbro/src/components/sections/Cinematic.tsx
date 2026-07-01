import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/**
 * Full-bleed editorial band.
 * Drop a photo at /public/photos/wild-1.jpg and it layers in automatically;
 * until then the warm gradient stands in (no broken image state).
 */
export function Cinematic() {
  return (
    <section className="relative isolate overflow-hidden bg-char text-cream">
      {/* photo layer (optional) + warm gradient base */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,11,8,0.35), rgba(16,11,8,0.85)), linear-gradient(120deg, #3d2c1e, #1c140f 60%, #100b08), url('/photos/wild-1.jpg')",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-80 w-80 rounded-full bg-flame/20 blur-[120px]" />

      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-5 py-24">
        <Reveal>
          <p className="mono-label text-flame">In the wild</p>
          <h2 className="editorial mt-4 max-w-3xl text-4xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
            Made to be carried,
            <br />
            <span className="italic text-cream/70">filmed, and kept.</span>
          </h2>
          <p className="mt-6 max-w-md text-cream/60">
            On your desk, in your bag, on your feed. The cup that turns a coffee
            into a moment worth posting.
          </p>
          <Link href="/shop" className="btn btn-primary mt-9 w-fit px-7 py-3.5">
            Find your cup
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

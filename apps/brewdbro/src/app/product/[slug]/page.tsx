import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductBuyBox } from "@/components/ProductBuyBox";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found · BrewdBro" };
  return {
    title: `${p.name} · BrewdBro`,
    description: p.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const show3d = product.category !== "premix";

  return (
    <main className="mx-auto max-w-6xl px-5 pt-24 pb-10">
      <Link href="/shop" className="mono-label text-taupe hover:text-flame">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductVisual finish={product.finish} show3d={show3d} pouch={product.category === "premix"} />

        <div className="md:pt-6">
          {product.badge && (
            <span className="rounded-full bg-espresso px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
              {product.badge}
            </span>
          )}
          <h1 className="editorial mt-3 text-4xl font-light leading-[1.05] md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-taupe">{product.tagline}</p>
          <p className="mt-5 leading-relaxed text-espresso/80">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductBuyBox product={product} />
          </div>

          {/* specs */}
          <div className="mt-10 rounded-2xl border border-sand bg-foam p-5">
            <h2 className="mono-label text-flame">Specs</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {product.specs.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="text-taupe">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}

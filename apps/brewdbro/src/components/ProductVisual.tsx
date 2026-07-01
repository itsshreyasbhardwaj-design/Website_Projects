"use client";

import dynamic from "next/dynamic";
import { CupGlyph } from "@/components/CupGlyph";
import { PouchGlyph } from "@/components/PouchGlyph";
import type { CupFinish } from "@/lib/products";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-flame/30 blur-2xl" />
    </div>
  ),
});

export function ProductVisual({
  finish,
  show3d,
  pouch = false,
}: {
  finish: CupFinish;
  show3d: boolean;
  pouch?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-sand bg-gradient-to-br from-latte via-cream to-sand">
      <div className="h-[52vh] w-full md:h-[68vh]">
        {pouch ? (
          <div className="grid h-full place-items-center p-8">
            <PouchGlyph className="h-full max-h-[56vh] drop-shadow-xl" />
          </div>
        ) : show3d ? (
          <HeroCanvas finish={finish} />
        ) : (
          <div className="grid h-full place-items-center">
            <CupGlyph finish={finish} className="h-64" />
          </div>
        )}
      </div>
      {show3d && !pouch && (
        <span className="mono-label pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-taupe">
          live 3D — drag to admire
        </span>
      )}
    </div>
  );
}

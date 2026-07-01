"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Tumbler } from "./Tumbler";
import type { CupFinish } from "@/lib/products";

export default function HeroCanvas({ finish = "iridescent" as CupFinish }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 6], fov: 35 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={2.2} castShadow />
        <directionalLight position={[-5, 2, -3]} intensity={1.1} color="#ec6f9e" />
        <spotLight position={[0, 6, 2]} angle={0.4} intensity={1.4} penumbra={1} />

        <Tumbler finish={finish} pour reduced={reduced} />

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.32}
          scale={8}
          blur={2.6}
          far={3}
          color="#3d2c1e"
        />

        {/* Self-contained studio environment (no external HDRI fetch) */}
        <Environment resolution={256}>
          <group rotation={[0, 0, 0]}>
            <Lightformer
              form="rect"
              intensity={3}
              position={[0, 3, 2]}
              scale={[6, 4, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={2}
              position={[-4, 1, 1]}
              scale={[3, 4, 1]}
              color="#ffd9b3"
            />
            <Lightformer
              form="ring"
              intensity={2.5}
              position={[4, 2, 1]}
              scale={[3, 3, 1]}
              color="#ec6f9e"
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, -2, -3]}
              scale={[4, 4, 1]}
              color="#a8e6cf"
            />
          </group>
        </Environment>
      </Suspense>
    </Canvas>
  );
}

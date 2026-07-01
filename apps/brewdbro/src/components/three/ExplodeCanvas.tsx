"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ExplodeTumbler } from "./ExplodeTumbler";
import type { CupFinish } from "@/lib/products";

function Rig({ children }: { children: React.ReactNode }) {
  const width = useThree((s) => s.size.width);
  const mobile = width < 768;
  return (
    <group scale={mobile ? 0.68 : 1} position={[0, mobile ? -1.0 : -0.7, 0]}>
      {children}
    </group>
  );
}

export default function ExplodeCanvas({
  progress,
  finish,
  reduced,
}: {
  progress: { current: number };
  finish: CupFinish;
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.6], fov: 34 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 7, 5]} intensity={2.4} />
        <directionalLight position={[-6, 3, -2]} intensity={1.3} color="#ff5a1f" />
        <spotLight position={[0, 7, 3]} angle={0.5} penumbra={1} intensity={1.6} />

        <Rig>
          <ExplodeTumbler progress={progress} finish={finish} reduced={reduced} />
        </Rig>

        <ContactShadows position={[0, -1.7, 0]} opacity={0.45} scale={9} blur={2.8} far={4} color="#000000" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 3, 2]} scale={[7, 5, 1]} color="#fff7ec" />
          <Lightformer form="rect" intensity={2} position={[-5, 1, 1]} scale={[3, 5, 1]} color="#ffd9b3" />
          <Lightformer form="ring" intensity={2.2} position={[5, 2, 1]} scale={[3, 3, 1]} color="#ffffff" />
          <Lightformer form="circle" intensity={1.8} position={[-3, -2, -4]} scale={[5, 5, 1]} color="#2aa7ad" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

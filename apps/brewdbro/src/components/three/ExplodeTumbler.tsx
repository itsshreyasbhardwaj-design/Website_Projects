"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CupFinish } from "@/lib/products";

type Fin = {
  glass: string;
  trans: number;
  irid: number;
  band: string;
  seal: string;
  straw: string;
  atten: string;
};

const FIN: Record<CupFinish, Fin> = {
  bamboo: { glass: "#ffffff", trans: 1, irid: 0, band: "#cdbfa8", seal: "#efe9dd", straw: "#e6ddcc", atten: "#f0e7d6" },
  blush: { glass: "#f7e3e6", trans: 0.96, irid: 0.12, band: "#d98a8f", seal: "#e7b9bd", straw: "#e9dfd6", atten: "#d98a8f" },
  iridescent: { glass: "#eef0ff", trans: 1, irid: 1, band: "#bfa9dd", seal: "#efe9dd", straw: "#cfeede", atten: "#bfa9dd" },
};

const RIBS = Array.from({ length: 28 });

export function ExplodeTumbler({
  progress,
  finish,
  reduced,
}: {
  progress: { current: number };
  finish: CupFinish;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const cup = useRef<THREE.Group>(null);
  const sleeve = useRef<THREE.Group>(null);
  const seal = useRef<THREE.Mesh>(null);
  const lid = useRef<THREE.Group>(null);
  const straw = useRef<THREE.Mesh>(null);
  const f = FIN[finish];

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    let p = reduced ? 0.34 : progress.current;
    p = Math.min(Math.max(p, 0), 1);
    const e = Math.sin(p * Math.PI); // 0 → 1 (mid) → 0

    if (group.current) {
      const targetRot = reduced ? 0.5 : p * Math.PI * 1.4 + t * 0.1;
      group.current.rotation.y = reduced
        ? 0.5
        : THREE.MathUtils.damp(group.current.rotation.y, targetRot, 8, delta);
      const floatY = reduced ? 0 : Math.sin(t * 1.1) * 0.05 * (1 - e);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, floatY, 6, delta);
    }

    const move = (
      ref: React.RefObject<THREE.Object3D | null>,
      ty: number,
      tx = 0
    ) => {
      if (!ref.current) return;
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, ty, 7, delta);
      ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, tx, 7, delta);
    };

    move(cup, -0.45 * e);
    move(sleeve, 0.2 + 0.16 * e);
    move(seal, 0.9 + 0.3 * e);
    move(lid, 1.02 + 0.78 * e);
    move(straw, 0.95 * e, 0.18 + 0.3 * e);
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* glass cup */}
      <group ref={cup} position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.82, 0.66, 1.9, 64, 1, true]} />
          <meshPhysicalMaterial
            color={f.glass}
            transmission={f.trans}
            roughness={0.06}
            metalness={0}
            ior={1.5}
            thickness={0.6}
            iridescence={f.irid}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 600]}
            attenuationColor={f.atten}
            attenuationDistance={2.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.07, 48]} />
          <meshPhysicalMaterial color={f.glass} transmission={f.trans * 0.9} roughness={0.1} ior={1.5} thickness={0.4} transparent />
        </mesh>
        {/* a little coffee */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.72, 0.6, 1.0, 40]} />
          <meshStandardMaterial color="#6f4326" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* ribbed silicone grip */}
      <group ref={sleeve} position={[0, 0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.87, 0.6, 48, 1, true]} />
          <meshStandardMaterial color={f.band} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
        {RIBS.map((_, i) => {
          const a = (i / RIBS.length) * Math.PI * 2;
          const r = 0.9;
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]} rotation={[0, -a, 0]}>
              <boxGeometry args={[0.028, 0.58, 0.06]} />
              <meshStandardMaterial color={f.band} roughness={0.55} />
            </mesh>
          );
        })}
      </group>

      {/* silicone seal ring */}
      <mesh ref={seal} position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.05, 14, 56]} />
        <meshStandardMaterial color={f.seal} roughness={0.5} />
      </mesh>

      {/* bamboo lid */}
      <group ref={lid} position={[0, 1.04, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.16, 56]} />
          <meshStandardMaterial color="#c9a06a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.8, 0.84, 0.06, 56]} />
          <meshStandardMaterial color="#b98e54" roughness={0.85} />
        </mesh>
      </group>

      {/* glass straw */}
      <mesh ref={straw} position={[0.18, 0, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 2.7, 20]} />
        <meshPhysicalMaterial color={f.straw} roughness={0.2} transmission={0.55} thickness={0.2} ior={1.45} transparent />
      </mesh>
    </group>
  );
}

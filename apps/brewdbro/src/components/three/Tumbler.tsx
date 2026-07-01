"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { CupFinish } from "@/lib/products";

type GlassDef = {
  color: string;
  transmission: number;
  roughness: number;
  ior: number;
  thickness: number;
  iridescence: number;
  attenuationColor: string;
  rim: string; // lid/rim accent
  straw: string;
};

const GLASS: Record<CupFinish, GlassDef> = {
  bamboo: {
    color: "#ffffff",
    transmission: 1,
    roughness: 0.05,
    ior: 1.5,
    thickness: 0.6,
    iridescence: 0,
    attenuationColor: "#f4ead8",
    rim: "#b5793a", // bamboo
    straw: "#c9a06a",
  },
  blush: {
    color: "#fbd6e4",
    transmission: 0.96,
    roughness: 0.07,
    ior: 1.45,
    thickness: 0.7,
    iridescence: 0.15,
    attenuationColor: "#ec6f9e",
    rim: "#ec6f9e",
    straw: "#ec6f9e",
  },
  iridescent: {
    color: "#eef0ff",
    transmission: 1,
    roughness: 0.05,
    ior: 1.5,
    thickness: 0.6,
    iridescence: 1,
    attenuationColor: "#bfa9dd",
    rim: "#bfa9dd",
    straw: "#a8e6cf",
  },
};

const CUP_H = 2.3;
const TOP_R = 0.88;
const BOT_R = 0.66;

export function Tumbler({
  finish,
  pour = true,
  reduced = false,
}: {
  finish: CupFinish;
  pour?: boolean;
  reduced?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const g = GLASS[finish];
  const start = useRef<number | null>(null);

  useFrame((state, delta) => {
    // slow auto-rotate
    if (group.current && !reduced) {
      group.current.rotation.y += delta * 0.28;
    }
    // pour fill animation
    if (liquid.current) {
      if (start.current === null) start.current = state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - start.current;
      const dur = 2.4;
      let t = reduced || !pour ? 1 : Math.min(elapsed / dur, 1);
      // easeOutCubic
      t = 1 - Math.pow(1 - t, 3);
      const fillH = (CUP_H - 0.25) * t;
      liquid.current.scale.y = Math.max(t, 0.0001);
      liquid.current.position.y = -CUP_H / 2 + fillH / 2 + 0.05;
    }
  });

  // liquid radius interpolated to sit just inside the wall
  const liqTop = TOP_R - 0.12;
  const liqBot = BOT_R - 0.1;

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={reduced ? 0 : 0.25}
      floatIntensity={reduced ? 0 : 0.5}
    >
      <group ref={group} position={[0, 0, 0]}>
        {/* glass body */}
        <mesh castShadow>
          <cylinderGeometry args={[TOP_R, BOT_R, CUP_H, 64, 1, true]} />
          <meshPhysicalMaterial
            color={g.color}
            transmission={g.transmission}
            roughness={g.roughness}
            metalness={0}
            ior={g.ior}
            thickness={g.thickness}
            iridescence={g.iridescence}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 600]}
            attenuationColor={g.attenuationColor}
            attenuationDistance={2.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* glass bottom */}
        <mesh position={[0, -CUP_H / 2 + 0.04, 0]}>
          <cylinderGeometry args={[BOT_R, BOT_R, 0.08, 64]} />
          <meshPhysicalMaterial
            color={g.color}
            transmission={g.transmission * 0.9}
            roughness={0.1}
            ior={g.ior}
            thickness={0.5}
            transparent
          />
        </mesh>

        {/* coffee liquid (opaque so it shows through the glass) */}
        <mesh ref={liquid} position={[0, 0, 0]}>
          <cylinderGeometry args={[liqTop, liqBot, CUP_H - 0.25, 48]} />
          <meshStandardMaterial color="#7a4a28" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* ice cubes */}
        {[
          [0.28, 0.55, 0.1, 0.5],
          [-0.3, 0.85, -0.18, 0.7],
          [0.05, 0.35, -0.32, -0.4],
          [-0.18, 1.05, 0.22, 1.0],
        ].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[r, r * 1.5, r * 0.5]}>
            <boxGeometry args={[0.34, 0.34, 0.34]} />
            <meshPhysicalMaterial
              color="#eaf6ff"
              transmission={0.6}
              roughness={0.15}
              thickness={0.3}
              ior={1.31}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}

        {/* rim / lid accent ring */}
        <mesh position={[0, CUP_H / 2, 0]}>
          <torusGeometry args={[TOP_R, 0.06, 16, 64]} />
          <meshStandardMaterial
            color={g.rim}
            roughness={finish === "bamboo" ? 0.7 : 0.3}
            metalness={finish === "bamboo" ? 0 : 0.1}
          />
        </mesh>

        {/* straw — opaque, kept in front of the glass so it reads as one straw */}
        <group rotation={[0.06, 0, 0.14]}>
          <mesh position={[0.36, CUP_H / 2 + 0.35, 0.62]}>
            <cylinderGeometry args={[0.055, 0.055, 2.2, 20]} />
            <meshStandardMaterial color={g.straw} roughness={0.35} metalness={0.05} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

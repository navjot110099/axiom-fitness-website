"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Torus, MeshDistortMaterial, Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/**
 * The AXIOM energy core.
 * A distorting nucleus in a voltage wireframe shell, wrapped by tilted energy
 * rings and a shell of orbiting shards, suspended in a particle field. The
 * camera drifts with the pointer for parallax depth.
 */

function ParticleField({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.1 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#c7f94b"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EnergyRings() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.z += dt * 0.12;
    g.current.rotation.x += dt * 0.05;
  });
  return (
    <group ref={g}>
      <Torus args={[2.5, 0.008, 16, 120]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color="#c7f94b" transparent opacity={0.35} />
      </Torus>
      <Torus args={[2.9, 0.006, 16, 120]} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <meshBasicMaterial color="#5aa9ff" transparent opacity={0.25} />
      </Torus>
      <Torus args={[3.3, 0.005, 16, 120]} rotation={[Math.PI / 1.7, -Math.PI / 6, 0]}>
        <meshBasicMaterial color="#ff4d1c" transparent opacity={0.18} />
      </Torus>
    </group>
  );
}

function Shards() {
  const g = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        radius: 2.3 + (i % 3) * 0.35,
        y: (Math.sin(i * 1.7) * 0.9),
        scale: 0.1 + (i % 2) * 0.06,
        speed: 0.2 + (i % 3) * 0.08,
      })),
    [],
  );
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.children.forEach((c, i) => {
      const s = shards[i];
      c.position.x = Math.cos(s.angle + t * s.speed) * s.radius;
      c.position.z = Math.sin(s.angle + t * s.speed) * s.radius;
      c.position.y = s.y + Math.sin(t * 0.8 + i) * 0.2;
      c.rotation.x += 0.01;
      c.rotation.y += 0.014;
    });
  });
  return (
    <group ref={g}>
      {shards.map((s, i) => (
        <Icosahedron key={i} args={[s.scale, 0]}>
          <meshStandardMaterial
            color={i % 2 ? "#c7f94b" : "#f4f3ee"}
            emissive={i % 2 ? "#c7f94b" : "#1a2a05"}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.6}
          />
        </Icosahedron>
      ))}
    </group>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const { pointer } = state;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.5, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.35, 0.04);
    }
    if (shell.current) shell.current.rotation.y -= 0.0015;
  });
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <Icosahedron args={[1.55, 12]}>
          <MeshDistortMaterial
            color="#0a0a0c"
            roughness={0.28}
            metalness={0.85}
            distort={0.32}
            speed={1.6}
            emissive="#1a2a05"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
        <Icosahedron ref={shell} args={[1.92, 3]}>
          <meshBasicMaterial color="#c7f94b" wireframe transparent opacity={0.16} />
        </Icosahedron>
      </Float>
    </group>
  );
}

/** Pointer-driven camera drift for parallax depth. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const base = useRef(new THREE.Vector3(0, 0, 6.2));
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  void base;
  return null;
}

export default function HeroOrb() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={2.4} color="#eaffb0" />
      <pointLight position={[-6, -3, -4]} intensity={40} color="#5aa9ff" />
      <pointLight position={[4, -4, 3]} intensity={22} color="#ff4d1c" />
      <Core />
      <EnergyRings />
      <Shards />
      <ParticleField />
      <CameraRig />
    </Canvas>
  );
}

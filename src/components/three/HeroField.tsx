"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/**
 * AXIOM kinetic energy field.
 * A wide floor-plane of points displaced by layered travelling waves and a
 * radial heartbeat pulse — an abstract biometric/energy surface. Colour ramps
 * from deep azure in the troughs to bright cyan on the crests; distance fades
 * into the void via fog. The rig drifts with the pointer for parallax depth.
 *
 * Rendered as a single BufferGeometry + ShaderMaterial (all motion on the GPU)
 * so it holds 60fps even at high point counts.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vElev;
  varying float vDist;

  void main() {
    vec3 p = position;
    float d = length(p.xy);

    // layered travelling waves
    float w =
        sin(p.x * 0.45 + uTime * 1.1) * 0.55
      + sin(p.y * 0.38 - uTime * 0.9) * 0.55
      + sin((p.x + p.y) * 0.28 + uTime * 0.7) * 0.40;

    // radial heartbeat pulse from the centre
    float pulse = sin(d * 0.7 - uTime * 2.0) * exp(-d * 0.14) * 1.1;

    // gentle lift toward the pointer
    vec2 pt = uPointer * 12.0;
    float lift = exp(-distance(p.xy, pt) * 0.12) * 0.45;

    float elev = w + pulse + lift;
    p.z += elev;

    vElev = elev;
    vDist = d;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.5 + (elev + 2.0) * 0.5) * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vElev;
  varying float vDist;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dd = dot(c, c);
    if (dd > 0.25) discard;
    float soft = smoothstep(0.25, 0.0, dd);

    float t = clamp(vElev * 0.5 + 0.5, 0.0, 1.0);
    // bias colour toward the crest so troughs stay dark and only peaks glow
    float tc = pow(t, 1.6);
    vec3 col = mix(uColorA, uColorB, tc);

    // fade the far field toward the void for depth
    float far = 1.0 - smoothstep(9.0, 25.0, vDist);
    float alpha = soft * (0.10 + tc * 0.55) * far;
    gl_FragColor = vec4(col, alpha);
  }
`;

function Field() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    // A subdivided plane → grid of points.
    const g = new THREE.PlaneGeometry(56, 56, 122, 122);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#072544") },
      uColorB: { value: new THREE.Color("#4FC2FF") },
    }),
    [],
  );

  // Dispose the geometry we created outside JSX when the field unmounts.
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, dt) => {
    const m = matRef.current;
    if (m) {
      // clamp dt so resuming after an off-screen pause doesn't jump the waves
      m.uniforms.uTime.value += Math.min(dt, 0.05);
      // ease pointer for smooth parallax
      m.uniforms.uPointer.value.x += (state.pointer.x - m.uniforms.uPointer.value.x) * 0.04;
      m.uniforms.uPointer.value.y += (state.pointer.y - m.uniforms.uPointer.value.y) * 0.04;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} rotation={[-Math.PI / 2.1, 0, 0]} position={[0, -3.3, 0]}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (2.6 + pointer.y * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, -0.5, -4);
  });
  return null;
}

export default function HeroField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);

  // Honour reduced-motion (render a single static frame, never animate).
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause the render loop while the hero is scrolled out of view — no point
  // driving a ~15k-point shader at 60fps behind the rest of the page.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 'demand' → renders one static frame then idles (reduced-motion or off-screen).
  const frameloop = reduce ? "demand" : visible ? "always" : "never";

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        className="!absolute inset-0"
        frameloop={frameloop}
        dpr={[1, 1.6]}
        camera={{ position: [0, 2.6, 9], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#060607", 9, 27]} />
        <AdaptiveDpr pixelated />
        <Field />
        {!reduce && <CameraRig />}
      </Canvas>
    </div>
  );
}

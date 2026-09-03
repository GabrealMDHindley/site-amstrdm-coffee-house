"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

export type HeroProgressRef = { current: number };

const liquidVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const liquidFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    float swirl = angle * 2.2 + r * 7.0 - uTime * 0.12;
    float n = noise(uv * 4.0 + vec2(cos(uTime * 0.04), sin(uTime * 0.04)));
    float pattern = sin(swirl + n * 3.2) * 0.5 + 0.5;

    vec3 espresso = vec3(0.145, 0.078, 0.035);
    vec3 crema = vec3(0.75, 0.6, 0.4);
    vec3 color = mix(espresso, crema, pattern * 0.5 + 0.18);

    float vign = smoothstep(0.52, 0.15, r);
    color *= vign * 0.55 + 0.45;

    float rim = smoothstep(0.5, 0.47, r);
    color += vec3(0.72, 0.58, 0.35) * (1.0 - rim) * 0.0;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const X_OFFSET = 1.7;
const BASE_RADIUS = 6.2;
const BASE_HEIGHT = 2.1;

function CupRig({
  progressRef,
  reducedMotion,
  isMobile,
}: {
  progressRef: HeroProgressRef;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const liquidMat = useRef<THREE.ShaderMaterial>(null);
  const camTarget = useRef(new THREE.Vector3(X_OFFSET, 0.5, 0));

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    const p = reducedMotion ? 0 : progressRef.current;

    if (uniforms.uTime) uniforms.uTime.value = state.clock.elapsedTime;

    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * 0.12;
    }

    const angle = THREE.MathUtils.degToRad(-30 + p * 120);
    const radius = BASE_RADIUS - p * 0.8;
    const height = BASE_HEIGHT - p * 0.7;
    const targetPos = new THREE.Vector3(
      X_OFFSET + Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );
    state.camera.position.lerp(targetPos, reducedMotion ? 1 : 0.08);
    state.camera.lookAt(camTarget.current);

    const fill = THREE.MathUtils.clamp(0.78 + p * 0.22, 0.78, 1.02);
    if (liquid.current) {
      liquid.current.scale.setScalar(THREE.MathUtils.lerp(liquid.current.scale.x, fill, 0.08));
    }
  });

  return (
    <group ref={group} position={[X_OFFSET, -0.15, 0]}>
      {/* saucer */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.98, 1.04, 0.06, 64]} />
        <meshPhysicalMaterial color="#faf7f0" roughness={0.2} clearcoat={0.6} clearcoatRoughness={0.3} />
      </mesh>

      {/* cup body */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.88, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#fbf8f2"
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* cup interior wall (so the inside reads dark/hollow, not see-through) */}
      <mesh position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.47, 0.38, 0.84, 64, 1, true]} />
        <meshStandardMaterial color="#2a1c14" roughness={0.6} side={THREE.BackSide} />
      </mesh>

      {/* cup base */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.38, 0.32, 0.1, 64]} />
        <meshPhysicalMaterial color="#fbf8f2" roughness={0.15} clearcoat={1} />
      </mesh>

      {/* gold rim */}
      <mesh position={[0, 0.905, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.014, 16, 96]} />
        <meshStandardMaterial color="#c9a05f" metalness={1} roughness={0.28} emissive="#3a2a12" emissiveIntensity={0.15} />
      </mesh>

      {/* handle */}
      <mesh position={[0.63, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.2, 0.045, 16, 48, Math.PI * 1.5]} />
        <meshPhysicalMaterial color="#fbf8f2" roughness={0.15} clearcoat={1} />
      </mesh>

      {/* liquid / crema surface */}
      <mesh ref={liquid} position={[0, 0.865, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.78}>
        <circleGeometry args={[0.46, 64]} />
        <shaderMaterial
          ref={liquidMat}
          uniforms={uniforms}
          vertexShader={liquidVertex}
          fragmentShader={liquidFragment}
        />
      </mesh>

      <Sparkles
        count={isMobile ? 14 : 30}
        scale={[0.7, 1.4, 0.7]}
        size={2.2}
        speed={0.15}
        opacity={0.45}
        color="#f2e3c9"
        position={[0, 1.35, 0]}
      />
    </group>
  );
}

function Ground({ isMobile }: { isMobile: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]}>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={isMobile ? [0, 0] : [300, 100]}
        resolution={isMobile ? 384 : 1024}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#0e0b09"
        metalness={0.6}
        mirror={0.35}
      />
    </mesh>
  );
}

export default function HeroScene({
  progressRef,
  reducedMotion = false,
  isMobile = false,
}: {
  progressRef: HeroProgressRef;
  reducedMotion?: boolean;
  isMobile?: boolean;
}) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, reducedMotion ? 1 : 1.5]}
      shadows={!isMobile}
      camera={{
        position: [
          X_OFFSET + Math.sin(THREE.MathUtils.degToRad(-30)) * BASE_RADIUS,
          BASE_HEIGHT,
          Math.cos(THREE.MathUtils.degToRad(-30)) * BASE_RADIUS,
        ],
        fov: 30,
      }}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <color attach="background" args={["#171310"]} />
      <fog attach="fog" args={["#171310", 6, 14]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} color="#fff3df" castShadow={!isMobile} />
      <pointLight position={[-2.5, 1.2, -2]} intensity={6} color="#c9a05f" distance={8} />
      <Suspense fallback={null}>
        <CupRig progressRef={progressRef} reducedMotion={reducedMotion} isMobile={isMobile} />
        {/* Synthetic, offline-safe environment built from in-scene light shapes —
            no external HDR fetch, so the hero never depends on third-party network. */}
        <Environment resolution={isMobile ? 128 : 256}>
          <group>
            <Lightformer form="rect" intensity={4} color="#fff3df" position={[0, 3, -2]} scale={[6, 3, 1]} />
            <Lightformer form="rect" intensity={2.5} color="#c9a05f" position={[-4, 1, 2]} scale={[3, 4, 1]} rotation={[0, Math.PI / 3, 0]} />
            <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[4, 1.5, 2]} scale={[3, 4, 1]} rotation={[0, -Math.PI / 3, 0]} />
            <Lightformer form="ring" intensity={2} color="#f2e3c9" position={[0, 0.4, 3.5]} scale={2.5} />
          </group>
        </Environment>
      </Suspense>
      <Ground isMobile={isMobile} />
    </Canvas>
  );
}

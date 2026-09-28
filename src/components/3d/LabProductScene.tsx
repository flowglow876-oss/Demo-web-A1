import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePerformanceMode, useInView, useDocumentVisibility } from "../../hooks/usePerformance";

interface LabObjectProps {
  productId: string;
  exploded: boolean;
  simplified: boolean;
}

function LabObject({ productId, exploded, simplified }: LabObjectProps) {
  const meshRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Mesh>(null);
  const abutmentRef = useRef<THREE.Group>(null);
  const fixtureRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;

    // Exploded assembly choreography for implant
    if (productId === "titanium" || productId === "implant-fixture") {
      if (crownRef.current) {
        crownRef.current.position.y = THREE.MathUtils.damp(
          crownRef.current.position.y,
          exploded ? 1.7 : 0.85,
          4,
          delta
        );
      }
      if (abutmentRef.current) {
        abutmentRef.current.position.y = THREE.MathUtils.damp(
          abutmentRef.current.position.y,
          exploded ? 0.8 : 0.2,
          4,
          delta
        );
      }
    }
  });

  const latheSegs = simplified ? 24 : 40;

  // 1. Titanium Implant Fixture Geometry
  const implantGeo = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.65, 0.4));
    points.push(new THREE.Vector2(0.72, 0.1));
    points.push(new THREE.Vector2(0.68, -0.2));
    for (let y = -0.3; y >= -2.0; y -= 0.22) {
      points.push(new THREE.Vector2(0.66, y));
      points.push(new THREE.Vector2(0.78, y - 0.08));
      points.push(new THREE.Vector2(0.56, y - 0.14));
    }
    points.push(new THREE.Vector2(0.32, -2.15));
    points.push(new THREE.Vector2(0.0, -2.25));
    return new THREE.LatheGeometry(points, latheSegs);
  }, [latheSegs]);

  // 2. Crown Geometry
  const crownGeo = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.85, -0.6));
    points.push(new THREE.Vector2(1.2, -0.2));
    points.push(new THREE.Vector2(1.38, 0.4));
    points.push(new THREE.Vector2(1.35, 0.9));
    points.push(new THREE.Vector2(1.15, 1.25));
    points.push(new THREE.Vector2(0.7, 1.35));
    points.push(new THREE.Vector2(0.2, 1.2));
    points.push(new THREE.Vector2(0.0, 1.15));
    return new THREE.LatheGeometry(points, latheSegs);
  }, [latheSegs]);

  // 3. Veneer Geometry
  const veneerGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.9, -1.3);
    shape.quadraticCurveTo(-1.1, 0, -0.85, 1.2);
    shape.quadraticCurveTo(0, 1.4, 0.85, 1.2);
    shape.quadraticCurveTo(1.1, 0, 0.9, -1.3);
    shape.quadraticCurveTo(0, -1.45, -0.9, -1.3);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: simplified ? 2 : 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [simplified]);

  // 4. Clear Aligner Arch
  const alignerGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.4, 0, -1.1),
      new THREE.Vector3(-1.3, 0, -0.3),
      new THREE.Vector3(-1.1, 0, 0.5),
      new THREE.Vector3(-0.6, 0, 1.1),
      new THREE.Vector3(0, 0, 1.3),
      new THREE.Vector3(0.6, 0, 1.1),
      new THREE.Vector3(1.1, 0, 0.5),
      new THREE.Vector3(1.3, 0, -0.3),
      new THREE.Vector3(1.4, 0, -1.1),
    ]);
    return new THREE.TubeGeometry(curve, simplified ? 32 : 56, 0.35, simplified ? 10 : 14, false);
  }, [simplified]);

  const isImplant = productId === "titanium" || productId === "implant-fixture";

  return (
    <group ref={meshRef}>
      {/* 1. IMPLANT FIXTURE & MULTI-PART EXPLODED RESTORATION */}
      {isImplant && (
        <group scale={[1.15, 1.15, 1.15]} position={[0, -0.2, 0]}>
          {/* Laser Guide line on explode */}
          {exploded && (
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 3.2, 8]} />
              <meshBasicMaterial color="#65D8FF" transparent opacity={0.65} />
            </mesh>
          )}

          {/* Top Crown Restoration */}
          <mesh ref={crownRef} geometry={crownGeo} position={[0, 0.85, 0]}>
            <meshPhysicalMaterial
              color="#FCFAF7"
              roughness={0.12}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
              transmission={0.4}
              thickness={1.0}
              ior={1.6}
            />
          </mesh>

          {/* Middle Titanium Abutment Core */}
          <group ref={abutmentRef} position={[0, 0.2, 0]}>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.45, 6]} />
              <meshStandardMaterial color="#E0A938" metalness={0.92} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.35, 16]} />
              <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Bottom Grade IV Titanium Implant Root Body */}
          <group ref={fixtureRef}>
            <mesh geometry={implantGeo} position={[0, -0.3, 0]}>
              <meshStandardMaterial color="#9CA1A8" metalness={0.94} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <torusGeometry args={[0.66, 0.02, 12, 24]} />
              <meshBasicMaterial color="#65D8FF" />
            </mesh>
          </group>
        </group>
      )}

      {/* 2. ZIRCONIA CROWN */}
      {(productId === "ceramic" || productId === "zirconia-crown") && (
        <mesh geometry={crownGeo} scale={[1.4, 1.4, 1.4]}>
          <meshPhysicalMaterial
            color="#FCFAF7"
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transmission={0.35}
            thickness={1.1}
            ior={1.62}
            reflectivity={0.95}
          />
        </mesh>
      )}

      {/* 3. E.MAX PORCELAIN VENEER */}
      {(productId === "veneer" || productId === "emax-veneer") && (
        <mesh geometry={veneerGeo} scale={[1.4, 1.4, 1.4]} rotation={[0.2, 0, 0]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.08}
            metalness={0.05}
            transmission={0.72}
            thickness={0.35}
            clearcoat={1.0}
            ior={1.54}
          />
        </mesh>
      )}

      {/* 4. CLEAR ORTHODONTIC ALIGNER */}
      {(productId === "aligner" || productId === "clear-tray") && (
        <group rotation={[Math.PI / 4, 0, 0]} scale={[1.2, 1.2, 1.2]}>
          <mesh geometry={alignerGeo}>
            <meshPhysicalMaterial
              color="#E6F7FF"
              roughness={0.04}
              transmission={0.94}
              thickness={0.5}
              ior={1.48}
              transparent
              opacity={0.9}
              clearcoat={1.0}
            />
          </mesh>
        </group>
      )}

      {/* Floating 3D Component Micro Labels (Desktop only) */}
      {!simplified && isImplant && (
        <>
          <Html position={[1.8, 1.4, 0]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#B69CFF]/40 text-white text-[9px] font-mono tracking-wider whitespace-nowrap shadow-md">
              CERAMIC RESTORATION
            </div>
          </Html>
          <Html position={[-1.8, 0.2, 0]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#E0A938]/40 text-white text-[9px] font-mono tracking-wider whitespace-nowrap shadow-md">
              GOLD PRECISION ABUTMENT
            </div>
          </Html>
          <Html position={[1.8, -1.2, 0]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#65D8FF]/40 text-white text-[9px] font-mono tracking-wider whitespace-nowrap shadow-md">
              GRADE IV TITANIUM · THREADED
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

export function LabProductScene({
  productId,
  exploded,
}: {
  productId: string;
  exploded: boolean;
}) {
  const perf = usePerformanceMode();
  const [containerRef, isInView] = useInView({ threshold: 0.1, rootMargin: "150px" });
  const isDocVisible = useDocumentVisibility();

  const isRendering = isInView && isDocVisible;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[380px] md:h-[480px] flex items-center justify-center select-none touch-pan-y"
    >
      {/* Studio Radial Purple/Cyan Rim Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-[#7C5CFF]/25 via-[#65D8FF]/20 to-transparent blur-3xl opacity-75" />
      </div>

      {/* Lazy mount Canvas only when approaching or inside viewport */}
      {isInView ? (
        <Canvas
          dpr={perf.dpr}
          gl={{
            antialias: perf.mode !== "LITE",
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={isRendering ? "always" : "never"}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <PerspectiveCamera makeDefault position={[0, 0.2, 5.5]} fov={38} />

          {/* Studio Lighting with Purple/Cyan Rim illumination */}
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 5, 4]} intensity={2.5} color="#FFF8EE" />
          <directionalLight position={[-4, -2, -3]} intensity={1.8} color="#65D8FF" />
          <directionalLight position={[0, 4, -4]} intensity={1.4} color="#B69CFF" />
          <pointLight position={[0, 3, 2]} intensity={1.2} color="#FFFFFF" />

          <Suspense fallback={null}>
            <Float
              speed={perf.mode === "LITE" ? 0 : 2}
              rotationIntensity={perf.mode === "LITE" ? 0 : 0.16}
              floatIntensity={perf.mode === "LITE" ? 0 : 0.22}
            >
              <LabObject
                productId={productId}
                exploded={exploded}
                simplified={perf.simplified3D}
              />
            </Float>
          </Suspense>

          {perf.enableHeavyShadows && (
            <ContactShadows
              position={[0, -2.1, 0]}
              opacity={0.35}
              scale={5.0}
              blur={2.2}
              far={3.8}
              color="#0B0914"
            />
          )}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={perf.isMobile ? 0.4 : 0.55}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
            }}
            autoRotate={isRendering && perf.mode !== "LITE" && !exploded}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      ) : (
        <div className="flex flex-col items-center justify-center text-white/40 font-mono text-xs gap-2">
          <div className="w-8 h-8 rounded-full border border-white/20 border-t-white/60 animate-spin" />
          <span>3D Lab Workspace Ready</span>
        </div>
      )}
    </div>
  );
}

export default React.memo(LabProductScene);

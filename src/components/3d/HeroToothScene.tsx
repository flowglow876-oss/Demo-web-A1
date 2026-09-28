import React, { useRef, useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, Html, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { usePerformanceMode, useInView, useDocumentVisibility } from "../../hooks/usePerformance";

export type AnatomicalPart = "enamel" | "dentin" | "pulp" | "roots" | null;
export type ExtendedPart = AnatomicalPart | "crown" | "abutment" | "implant";
export type AnatomyMode = "natural" | "implant";

interface ToothRipple {
  id: number;
  x: number;
  y: number;
}

interface RealisticToothProps {
  exploded: boolean;
  onToggleExplode: () => void;
  selectedPart: ExtendedPart;
  onSelectPart: (part: ExtendedPart) => void;
  mode: AnatomyMode;
  hovered: boolean;
  simplified: boolean;
  isTouchDevice: boolean;
  onTriggerTapFeedback: (clientX?: number, clientY?: number) => void;
}

/**
 * Anatomical 3D Human Molar with Iridescent Pearlescent Enamel
 * Supports controlled exploded view separation (Enamel, Dentin, Vascular Pulp, Roots / Crown, Abutment, Implant)
 * with individual part inspection, focused lighting, and smooth reassembly.
 */
function PearlescentAnatomicalTooth({
  exploded,
  onToggleExplode,
  selectedPart,
  onSelectPart,
  mode,
  hovered,
  simplified,
  isTouchDevice,
  onTriggerTapFeedback,
}: RealisticToothProps) {
  const groupRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Group>(null);
  const dentinRef = useRef<THREE.Group>(null);
  const pulpRef = useRef<THREE.Group>(null);
  const rootsRef = useRef<THREE.Group>(null);

  // Implant components
  const abutmentRef = useRef<THREE.Group>(null);
  const implantRef = useRef<THREE.Group>(null);

  const highlightLightRef = useRef<THREE.PointLight>(null);
  const internalPulpLightRef = useRef<THREE.PointLight>(null);
  const [hoveredComponent, setHoveredComponent] = useState<ExtendedPart>(null);

  // Tactile feedback refs
  const tapScaleRef = useRef(1.0);
  const tapHighlightRef = useRef(0.0);
  const tapRotationBonusRef = useRef(0.0);

  // Smooth transition tracking: temporarily lock pointer-follow during transition
  const isTransitioningRef = useRef(false);
  const prevExplodedRef = useRef(exploded);

  useEffect(() => {
    if (prevExplodedRef.current !== exploded) {
      prevExplodedRef.current = exploded;
      isTransitioningRef.current = true;
      const timer = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [exploded]);

  // Frame animation loop: smooth rotation, breathing, exploded transitions & camera shifts
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Damped pointer follow
    let targetRotY = 0;
    let targetRotX = 0;

    if (isTransitioningRef.current) {
      // During transition: stabilize tooth with small elegant 4-degree accent rotation
      targetRotY = 0.08 + tapRotationBonusRef.current;
      targetRotX = 0.02;
    } else if (isTouchDevice) {
      // Mobile: Rock-solid calm organic breath only. ZERO pointer jitter or shake!
      targetRotY = Math.sin(t * 0.3) * 0.02 + tapRotationBonusRef.current;
      targetRotX = Math.cos(t * 0.25) * 0.012;
    } else {
      // Desktop: Smooth damped pointer follow (gentle 3-5 degrees)
      targetRotY = state.pointer.x * 0.06 + (hovered ? 0.03 : 0) + Math.sin(t * 0.35) * 0.018 + tapRotationBonusRef.current;
      targetRotX = -state.pointer.y * 0.035 + Math.cos(t * 0.28) * 0.012;
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      isTouchDevice ? 3.5 : 2.8,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      isTouchDevice ? 3.5 : 2.8,
      delta
    );

    // Idle subtle vertical floating
    groupRef.current.position.y = 0.12 + Math.sin(t * 0.6) * 0.035;

    // Tactile Tap Feedback: Smoothly return scale from 1.025 back to 1.0
    tapScaleRef.current = THREE.MathUtils.damp(tapScaleRef.current, 1.0, 5.0, delta);
    tapHighlightRef.current = THREE.MathUtils.damp(tapHighlightRef.current, 0.0, 4.0, delta);
    tapRotationBonusRef.current = THREE.MathUtils.damp(tapRotationBonusRef.current, 0.0, 3.5, delta);

    const s = tapScaleRef.current;
    groupRef.current.scale.set(s, s, s);

    // Moving traveling iridescent highlight across the enamel surface
    if (highlightLightRef.current) {
      highlightLightRef.current.position.x = Math.sin(t * 0.75) * 1.8 + 0.8;
      highlightLightRef.current.position.y = Math.cos(t * 0.6) * 1.2 + 1.4;
      highlightLightRef.current.position.z = Math.cos(t * 0.75) * 1.4 + 2.0;
      highlightLightRef.current.intensity =
        (hovered ? 3.0 : 1.8) + tapHighlightRef.current * 2.8;
    }

    // Vascular pulp internal light focus when selected
    if (internalPulpLightRef.current) {
      const targetPulpLight = selectedPart === "pulp" ? 2.4 : 0.6;
      internalPulpLightRef.current.intensity = THREE.MathUtils.damp(
        internalPulpLightRef.current.intensity,
        targetPulpLight,
        5.0,
        delta
      );
    }

    // =========================================================
    // Controlled Exploded View Separation Timeline
    // =========================================================
    if (crownRef.current) {
      const targetCrownY = exploded ? 1.85 : 0;
      crownRef.current.position.y = THREE.MathUtils.damp(crownRef.current.position.y, targetCrownY, 4.2, delta);
      crownRef.current.rotation.z = THREE.MathUtils.damp(crownRef.current.rotation.z, exploded ? 0.06 : 0, 3.8, delta);
    }

    if (dentinRef.current) {
      const targetDentinY = exploded && mode === "natural" ? 0.95 : 0;
      dentinRef.current.position.y = THREE.MathUtils.damp(dentinRef.current.position.y, targetDentinY, 4.2, delta);
    }

    if (pulpRef.current) {
      const targetPulpY = exploded && mode === "natural" ? 0.32 : 0;
      pulpRef.current.position.y = THREE.MathUtils.damp(pulpRef.current.position.y, targetPulpY, 4.2, delta);
    }

    if (rootsRef.current) {
      const targetRootsY = exploded && mode === "natural" ? -0.45 : 0;
      rootsRef.current.position.y = THREE.MathUtils.damp(rootsRef.current.position.y, targetRootsY, 4.2, delta);
    }

    // Implant Mode Timeline
    if (abutmentRef.current) {
      const targetAbutmentY = exploded && mode === "implant" ? 0.8 : 0;
      abutmentRef.current.position.y = THREE.MathUtils.damp(abutmentRef.current.position.y, targetAbutmentY, 4.2, delta);
    }

    if (implantRef.current) {
      const targetImplantY = exploded && mode === "implant" ? -0.4 : 0;
      implantRef.current.position.y = THREE.MathUtils.damp(implantRef.current.position.y, targetImplantY, 4.2, delta);
    }

    // Camera target position based on selected part or exploded state
    let targetCamY = 0.2;
    let targetCamZ = isTouchDevice ? 6.2 : 5.8;

    if (exploded) {
      if (selectedPart === "enamel" || selectedPart === "crown") {
        targetCamY = 1.8;
        targetCamZ = isTouchDevice ? 5.4 : 4.8;
      } else if (selectedPart === "dentin" || selectedPart === "abutment") {
        targetCamY = 0.95;
        targetCamZ = isTouchDevice ? 5.2 : 4.6;
      } else if (selectedPart === "pulp") {
        targetCamY = 0.32;
        targetCamZ = isTouchDevice ? 4.9 : 4.4;
      } else if (selectedPart === "roots" || selectedPart === "implant") {
        targetCamY = -0.6;
        targetCamZ = isTouchDevice ? 5.2 : 4.6;
      } else {
        targetCamY = 0.6;
        targetCamZ = isTouchDevice ? 6.8 : 6.3;
      }
    }

    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 3.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 3.2, delta);
  });

  const segments = simplified ? 24 : 48;

  // 1. Anatomical Crown Lathe Profile
  const crownGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.92, -0.45));
    points.push(new THREE.Vector2(1.16, -0.15));
    points.push(new THREE.Vector2(1.42, 0.32));
    points.push(new THREE.Vector2(1.48, 0.74));
    points.push(new THREE.Vector2(1.39, 1.2));
    points.push(new THREE.Vector2(1.23, 1.5));
    points.push(new THREE.Vector2(0.75, 1.58));
    points.push(new THREE.Vector2(0.32, 1.4));
    points.push(new THREE.Vector2(0.0, 1.34));
    return new THREE.LatheGeometry(points, segments);
  }, [segments]);

  // 2. Dentin Core Geometry (Internal shock-absorbing layer)
  const dentinGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.68, -0.3));
    points.push(new THREE.Vector2(0.94, 0.2));
    points.push(new THREE.Vector2(1.04, 0.65));
    points.push(new THREE.Vector2(0.88, 1.05));
    points.push(new THREE.Vector2(0.5, 1.2));
    points.push(new THREE.Vector2(0.0, 1.1));
    return new THREE.LatheGeometry(points, Math.max(18, segments - 8));
  }, [segments]);

  // 3. Vascular Pulp Chamber Geometry (Nerve vitality center)
  const pulpGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.26, -0.3));
    points.push(new THREE.Vector2(0.44, 0.15));
    points.push(new THREE.Vector2(0.5, 0.5));
    points.push(new THREE.Vector2(0.36, 0.8));
    points.push(new THREE.Vector2(0.0, 0.9));
    return new THREE.LatheGeometry(points, Math.max(14, segments - 14));
  }, [segments]);

  // 4. Bifurcated Curving Roots
  const mesialRootGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, -0.38, 0),
      new THREE.Vector3(0.52, -0.88, -0.06),
      new THREE.Vector3(0.56, -1.38, -0.12),
      new THREE.Vector3(0.48, -1.88, -0.18),
      new THREE.Vector3(0.28, -2.35, -0.26),
      new THREE.Vector3(0.18, -2.55, -0.3),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.38, 16, false);
  }, []);

  const distalRootGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.4, -0.38, 0),
      new THREE.Vector3(-0.5, -0.85, 0.06),
      new THREE.Vector3(-0.54, -1.35, 0.12),
      new THREE.Vector3(-0.44, -1.85, 0.18),
      new THREE.Vector3(-0.26, -2.3, 0.24),
      new THREE.Vector3(-0.14, -2.5, 0.28),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.36, 16, false);
  }, []);

  const furcationCapGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.92, 0.74, 0.45, segments, 1, false);
  }, [segments]);

  // 5. Titanium Implant Components (Screw + Abutment)
  const implantFixtureGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.46, 0.2));
    points.push(new THREE.Vector2(0.52, 0.0));
    // Thread profile
    for (let y = -0.2; y >= -1.7; y -= 0.18) {
      points.push(new THREE.Vector2(0.48, y));
      points.push(new THREE.Vector2(0.55, y - 0.07));
      points.push(new THREE.Vector2(0.45, y - 0.13));
    }
    points.push(new THREE.Vector2(0.26, -1.85));
    points.push(new THREE.Vector2(0.0, -1.95));
    return new THREE.LatheGeometry(points, 28);
  }, []);

  const abutmentGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.38, 0.5));
    points.push(new THREE.Vector2(0.48, 0.3));
    points.push(new THREE.Vector2(0.54, 0.05));
    points.push(new THREE.Vector2(0.68, -0.15));
    points.push(new THREE.Vector2(0.48, -0.28));
    points.push(new THREE.Vector2(0.0, -0.3));
    return new THREE.LatheGeometry(points, 28);
  }, []);

  // Hit-test volume to guarantee clicks/taps never miss
  const hitVolumeGeometry = useMemo(() => new THREE.CylinderGeometry(1.6, 1.3, 4.2, 16), []);

  // =========================================================
  // MATERIALS: Realistic Pearlescent Hydroxyapatite Enamel
  // Target: 75–82% visual opacity with realistic subsurface highlights
  // =========================================================
  const pearlescentEnamelMaterial = useMemo(() => {
    const isEnamelSelected = selectedPart === "enamel" || selectedPart === "crown";
    const isOtherSelected = selectedPart !== null && !isEnamelSelected;

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAF9F6"),
      roughness: 0.08,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      // Visual opacity 75-82% (transmission 0.22 gives deep volumetric realism without disappearing)
      transmission: exploded ? (isOtherSelected ? 0.45 : 0.26) : 0.22,
      thickness: 1.45,
      ior: 1.58, // Natural hydroxyapatite index
      reflectivity: 0.95,
      iridescence: 0.92,
      iridescenceIOR: 1.62,
      iridescenceThicknessRange: [150, 420],
      sheen: 0.85,
      sheenColor: new THREE.Color("#FCE7F3"),
      specularIntensity: 1.65,
      specularColor: new THREE.Color("#FFFFFF"),
      attenuationColor: new THREE.Color("#FFF2E2"),
      attenuationDistance: 2.2,
      emissive: isEnamelSelected ? new THREE.Color("#67E8F9") : new THREE.Color("#000000"),
      emissiveIntensity: isEnamelSelected ? 0.35 : 0.0,
      transparent: true,
      opacity: isOtherSelected ? 0.65 : 0.96,
    });
  }, [exploded, selectedPart]);

  // Dentin Buffer Material
  const dentinMaterial = useMemo(() => {
    const isDentinSelected = selectedPart === "dentin";
    const isOtherSelected = selectedPart !== null && !isDentinSelected;

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FDE68A"),
      roughness: 0.2,
      metalness: 0.03,
      clearcoat: 0.6,
      transmission: 0.2,
      ior: 1.52,
      emissive: new THREE.Color("#F59E0B"),
      emissiveIntensity: isDentinSelected ? 0.65 : (isOtherSelected ? 0.02 : 0.12),
      transparent: true,
      opacity: isOtherSelected ? 0.5 : 0.96,
    });
  }, [selectedPart]);

  // Vascular Pulp Material
  const pulpMaterial = useMemo(() => {
    const isPulpSelected = selectedPart === "pulp";
    const isOtherSelected = selectedPart !== null && !isPulpSelected;

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F43F5E"),
      roughness: 0.16,
      clearcoat: 0.95,
      transmission: 0.15,
      emissive: new THREE.Color("#FB7185"),
      emissiveIntensity: isPulpSelected ? 1.2 : (isOtherSelected ? 0.15 : 0.55),
      transparent: true,
      opacity: isOtherSelected ? 0.45 : 0.98,
    });
  }, [selectedPart]);

  // Root Material (Ivory cementum)
  const rootMaterial = useMemo(() => {
    const isRootsSelected = selectedPart === "roots";
    const isOtherSelected = selectedPart !== null && !isRootsSelected;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#EFE7DC"),
      roughness: 0.35,
      metalness: 0.02,
      emissive: isRootsSelected ? new THREE.Color("#38BDF8") : new THREE.Color("#000000"),
      emissiveIntensity: isRootsSelected ? 0.35 : 0.0,
      transparent: true,
      opacity: isOtherSelected ? 0.5 : 1.0,
    });
  }, [selectedPart]);

  // Titanium Implant Material (Surgical Grade V)
  const titaniumMaterial = useMemo(() => {
    const isImplantSelected = selectedPart === "implant";
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#94A3B8"),
      metalness: 0.94,
      roughness: 0.2,
      emissive: isImplantSelected ? new THREE.Color("#38BDF8") : new THREE.Color("#000000"),
      emissiveIntensity: isImplantSelected ? 0.4 : 0.0,
    });
  }, [selectedPart]);

  // Gold-anodized Titanium Abutment
  const abutmentMaterial = useMemo(() => {
    const isAbutmentSelected = selectedPart === "abutment";
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F59E0B"),
      metalness: 0.88,
      roughness: 0.22,
      emissive: isAbutmentSelected ? new THREE.Color("#FBBF24") : new THREE.Color("#000000"),
      emissiveIntensity: isAbutmentSelected ? 0.45 : 0.0,
    });
  }, [selectedPart]);

  // Tap handler on the tooth
  const handleToothTap = (e: ThreeEvent<MouseEvent | PointerEvent>) => {
    e.stopPropagation();

    // 1. Tactile Touch Feedback: subtle 1.025 scale bump
    tapScaleRef.current = 1.025;
    // 2. Short highlight bloom
    tapHighlightRef.current = 1.0;
    // 3. Smooth ~4.5 degree rotation bump
    tapRotationBonusRef.current = 0.08;

    // Trigger DOM ripple & soft glow pulse
    const nativeEvent = e.nativeEvent as MouseEvent;
    onTriggerTapFeedback(nativeEvent?.clientX, nativeEvent?.clientY);

    // If assembled: trigger exploded view separation
    if (!exploded) {
      onToggleExplode();
    }
  };

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      {/* Invisible Expanded Hit Volume: Guarantees 100% reliable tap/click detection without missing */}
      <mesh
        geometry={hitVolumeGeometry}
        visible={false}
        onClick={handleToothTap}
        onPointerDown={handleToothTap}
      />

      {/* Dynamic traveling specular light that creates moving iridescent highlight across enamel */}
      <pointLight
        ref={highlightLightRef}
        intensity={hovered ? 3.0 : 1.8}
        distance={5.5}
        color={hovered ? "#67E8F9" : "#FEF3C7"}
      />

      {/* Soft internal vascular pulp point light */}
      <pointLight
        ref={internalPulpLightRef}
        position={[0, 0.32, 0]}
        intensity={0.6}
        distance={1.5}
        color="#FB7185"
      />

      {/* Exploded View Connecting Alignment Laser & Tier Indicators */}
      {exploded && (
        <group>
          {/* Central Vertical Alignment Laser Guide */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 3.4, 8]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
          </mesh>

          {/* Tier Guide Rings */}
          <mesh position={[0, 1.85, 0]}>
            <ringGeometry args={[0.3, 0.5, 24]} />
            <meshBasicMaterial color="#C084FC" side={THREE.DoubleSide} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <ringGeometry args={[0.25, 0.42, 24]} />
            <meshBasicMaterial color="#FBBF24" side={THREE.DoubleSide} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <ringGeometry args={[0.2, 0.35, 24]} />
            <meshBasicMaterial color="#FB7185" side={THREE.DoubleSide} transparent opacity={0.45} />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* 1. TOP TIER: Pearlescent Hydroxyapatite Enamel Crown Shell */}
      {/* ========================================================= */}
      <group
        ref={crownRef}
        onClick={(e) => {
          e.stopPropagation();
          if (exploded) {
            onSelectPart(mode === "natural" ? "enamel" : "crown");
          } else {
            handleToothTap(e);
          }
        }}
        onPointerDown={(e) => {
          if (!exploded) handleToothTap(e);
        }}
        onPointerOver={(e) => {
          if (exploded) {
            e.stopPropagation();
            setHoveredComponent(mode === "natural" ? "enamel" : "crown");
          }
        }}
        onPointerOut={() => setHoveredComponent(null)}
      >
        <mesh
          geometry={crownGeometry}
          material={pearlescentEnamelMaterial}
          castShadow
          receiveShadow
        />

        {/* Crown Spatial Tag in Exploded View */}
        {exploded && (
          <Html position={[1.8, 1.0, 0]} distanceFactor={7} center>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectPart(mode === "natural" ? "enamel" : "crown");
              }}
              className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                selectedPart === "enamel" || selectedPart === "crown" || hoveredComponent === "enamel"
                  ? "bg-[#7C5CFF] text-white border-[#A78BFA] scale-105 shadow-[0_0_18px_rgba(124,92,255,0.4)]"
                  : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                {mode === "natural" ? "01 · ENAMEL SHELL" : "01 · CERAMIC CROWN"}
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* ========================================================= */}
      {/* 2. MIDDLE TIER (Natural Dentin or Implant Abutment)        */}
      {/* ========================================================= */}
      {mode === "natural" ? (
        <group
          ref={dentinRef}
          onClick={(e) => {
            e.stopPropagation();
            if (exploded) {
              onSelectPart("dentin");
            } else {
              handleToothTap(e);
            }
          }}
          onPointerDown={(e) => {
            if (!exploded) handleToothTap(e);
          }}
          onPointerOver={(e) => {
            if (exploded) {
              e.stopPropagation();
              setHoveredComponent("dentin");
            }
          }}
          onPointerOut={() => setHoveredComponent(null)}
        >
          <mesh geometry={dentinGeometry} material={dentinMaterial} />

          {/* Dentin Spatial Tag in Exploded View */}
          {exploded && (
            <Html position={[-1.8, 0.4, 0]} distanceFactor={7} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart("dentin");
                }}
                className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                  selectedPart === "dentin" || hoveredComponent === "dentin"
                    ? "bg-[#D97706] text-white border-[#FDE68A] scale-105 shadow-[0_0_18px_rgba(217,119,6,0.4)]"
                    : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                  02 · DENTIN CORE
                </span>
              </div>
            </Html>
          )}
        </group>
      ) : (
        /* Implant Mode: Precision Gold Abutment */
        <group
          ref={abutmentRef}
          onClick={(e) => {
            e.stopPropagation();
            if (exploded) {
              onSelectPart("abutment");
            } else {
              handleToothTap(e);
            }
          }}
          onPointerDown={(e) => {
            if (!exploded) handleToothTap(e);
          }}
          onPointerOver={(e) => {
            if (exploded) {
              e.stopPropagation();
              setHoveredComponent("abutment");
            }
          }}
          onPointerOut={() => setHoveredComponent(null)}
        >
          <mesh geometry={abutmentGeometry} material={abutmentMaterial} />

          {/* Abutment Spatial Tag in Exploded View */}
          {exploded && (
            <Html position={[-1.8, 0.4, 0]} distanceFactor={7} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart("abutment");
                }}
                className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                  selectedPart === "abutment" || hoveredComponent === "abutment"
                    ? "bg-[#D97706] text-white border-[#FDE68A] scale-105 shadow-[0_0_18px_rgba(217,119,6,0.4)]"
                    : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                  02 · PRECISION ABUTMENT
                </span>
              </div>
            </Html>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* 3. VITAL TIER: Vascular Nerve Pulp Chamber                */}
      {/* ========================================================= */}
      {mode === "natural" && (
        <group
          ref={pulpRef}
          onClick={(e) => {
            e.stopPropagation();
            if (exploded) {
              onSelectPart("pulp");
            } else {
              handleToothTap(e);
            }
          }}
          onPointerDown={(e) => {
            if (!exploded) handleToothTap(e);
          }}
          onPointerOver={(e) => {
            if (exploded) {
              e.stopPropagation();
              setHoveredComponent("pulp");
            }
          }}
          onPointerOut={() => setHoveredComponent(null)}
        >
          <mesh geometry={pulpGeometry} material={pulpMaterial} />

          {/* Pulp Spatial Tag in Exploded View */}
          {exploded && (
            <Html position={[1.7, 0.0, 0]} distanceFactor={7} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart("pulp");
                }}
                className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                  selectedPart === "pulp" || hoveredComponent === "pulp"
                    ? "bg-[#E11D48] text-white border-[#FDA4AF] scale-105 shadow-[0_0_18px_rgba(225,29,72,0.4)]"
                    : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#FB7185] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                  03 · VASCULAR PULP
                </span>
              </div>
            </Html>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* 4. BASE TIER: Natural Roots OR Titanium Implant           */}
      {/* ========================================================= */}
      {mode === "natural" ? (
        <group
          ref={rootsRef}
          onClick={(e) => {
            e.stopPropagation();
            if (exploded) {
              onSelectPart("roots");
            } else {
              handleToothTap(e);
            }
          }}
          onPointerDown={(e) => {
            if (!exploded) handleToothTap(e);
          }}
          onPointerOver={(e) => {
            if (exploded) {
              e.stopPropagation();
              setHoveredComponent("roots");
            }
          }}
          onPointerOut={() => setHoveredComponent(null)}
        >
          {/* Natural Root Furcation Neck */}
          <mesh geometry={furcationCapGeometry} material={rootMaterial} position={[0, -0.6, 0]} />

          {/* Dual Anatomical Curving Roots */}
          <mesh geometry={mesialRootGeometry} material={rootMaterial} castShadow />
          <mesh geometry={distalRootGeometry} material={rootMaterial} castShadow />

          {/* Roots Spatial Tag in Exploded View */}
          {exploded && (
            <Html position={[-1.8, -1.2, 0]} distanceFactor={7} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart("roots");
                }}
                className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                  selectedPart === "roots" || hoveredComponent === "roots"
                    ? "bg-[#0284C7] text-white border-[#7DD3FC] scale-105 shadow-[0_0_18px_rgba(2,132,199,0.4)]"
                    : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                  04 · BIOMIMETIC ROOTS
                </span>
              </div>
            </Html>
          )}
        </group>
      ) : (
        /* Implant Mode: Titanium Screw Fixture */
        <group
          ref={implantRef}
          onClick={(e) => {
            e.stopPropagation();
            if (exploded) {
              onSelectPart("implant");
            } else {
              handleToothTap(e);
            }
          }}
          onPointerDown={(e) => {
            if (!exploded) handleToothTap(e);
          }}
          onPointerOver={(e) => {
            if (exploded) {
              e.stopPropagation();
              setHoveredComponent("implant");
            }
          }}
          onPointerOut={() => setHoveredComponent(null)}
        >
          <mesh geometry={implantFixtureGeometry} material={titaniumMaterial} position={[0, -0.5, 0]} />

          {/* Implant Spatial Tag in Exploded View */}
          {exploded && (
            <Html position={[-1.8, -1.2, 0]} distanceFactor={7} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart("implant");
                }}
                className={`px-3 py-1.5 rounded-full border shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap select-none ${
                  selectedPart === "implant" || hoveredComponent === "implant"
                    ? "bg-[#0284C7] text-white border-[#7DD3FC] scale-105 shadow-[0_0_18px_rgba(2,132,199,0.4)]"
                    : "bg-white/90 backdrop-blur-md text-[#0F172A] border-white/80 hover:bg-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                  03 · TITANIUM FIXTURE
                </span>
              </div>
            </Html>
          )}
        </group>
      )}

      {/* Floating Spatial Micro Data Markers Around Tooth (Desktop Only When Assembled) */}
      {!exploded && !simplified && !isTouchDevice && (
        <>
          <Html position={[-2.0, 1.4, 0.2]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse" />
              <span className="text-[9px] font-mono tracking-wider text-[#0F172A] font-semibold">
                OPAL IRIDESCENCE · 1.58 IOR
              </span>
            </div>
          </Html>

          <Html position={[2.0, 0.9, 0.3]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[9px] font-mono tracking-wider text-[#0F172A] font-semibold">
                ANATOMICAL CROWN CONTOUR
              </span>
            </div>
          </Html>

          <Html position={[1.9, -1.6, 0.2]} distanceFactor={8} center>
            <div className="pointer-events-none select-none px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[9px] font-mono tracking-wider text-[#0F172A] font-semibold">
                NATURAL ROOT ARCHITECTURE
              </span>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

interface HeroToothSceneProps {
  exploded?: boolean;
  onToggleExplode?: () => void;
  selectedPart?: AnatomicalPart;
  onSelectPart?: (part: AnatomicalPart) => void;
}

export function HeroToothScene({
  exploded: externalExploded,
  onToggleExplode: externalOnToggleExplode,
  selectedPart: externalSelectedPart,
  onSelectPart: externalOnSelectPart,
}: HeroToothSceneProps) {
  const [internalExploded, setInternalExploded] = useState(false);
  const [internalSelectedPart, setInternalSelectedPart] = useState<ExtendedPart>(null);
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<AnatomyMode>("natural");
  const [ripples, setRipples] = useState<ToothRipple[]>([]);

  const exploded = externalExploded !== undefined ? externalExploded : internalExploded;
  const toggleExplode = externalOnToggleExplode || (() => setInternalExploded((prev) => !prev));

  const mapToAnatomicalPart = (part: ExtendedPart): AnatomicalPart => {
    if (part === "crown") return "enamel";
    if (part === "abutment") return "dentin";
    if (part === "implant") return "roots";
    return part;
  };

  const selectedPart = internalSelectedPart !== null 
    ? internalSelectedPart 
    : (externalSelectedPart !== undefined ? externalSelectedPart : null);

  const selectPart = (part: ExtendedPart) => {
    setInternalSelectedPart(part);
    if (externalOnSelectPart) {
      externalOnSelectPart(mapToAnatomicalPart(part));
    }
  };

  const perf = usePerformanceMode();
  const [containerRef, isInView] = useInView({ threshold: 0.05, rootMargin: "100px" });
  const isVisible = useDocumentVisibility();

  // Robust touch detection (touchscreens, tablets, mobile)
  const isTouch = Boolean(
    perf.isMobile ||
      (typeof window !== "undefined" &&
        ("ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)))
  );

  // Tactile touch feedback: creates expanding ripple and soft glow ring exactly at touch coordinates
  const triggerTapFeedback = useCallback((clientX?: number, clientY?: number) => {
    let x = 160;
    let y = 160;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (clientX !== undefined && clientY !== undefined) {
        x = clientX - rect.left;
        y = clientY - rect.top;
      } else {
        x = rect.width / 2;
        y = rect.height / 2;
      }
    }
    const newRipple: ToothRipple = { id: Date.now() + Math.random(), x, y };
    setRipples((prev) => [...prev.slice(-3), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  }, []);

  // Reassemble action: smoothly resets all parts to original positions
  const handleReassemble = useCallback(() => {
    if (exploded) {
      toggleExplode();
      selectPart(null);
    }
  }, [exploded, toggleExplode, selectPart]);

  // Control active rendering: pause loop if out of view or tab hidden
  const shouldRender = isInView && isVisible;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] lg:h-[680px] flex items-center justify-center select-none touch-pan-y"
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
    >
      {/* Background Soft Atmospheric Ambient Glow (Warm Sunlight + Lavender Iridescent Halo) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] md:w-[540px] md:h-[540px] rounded-full bg-gradient-to-tr from-[#FFFBEB]/45 via-[#BAE6FD]/35 to-[#DDD6FE]/30 blur-3xl opacity-90 transition-opacity duration-700" />
      </div>

      {/* Tactile Touch / Click Ripple & Glow Ring */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: ripple.x, top: ripple.y }}
        >
          {/* Soft local glow around touch contact */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-r from-[#65D8FF]/35 via-[#B69CFF]/30 to-transparent blur-xl animate-pulse" />
          {/* Subtle expanding ripple rings */}
          <div className="w-10 h-10 rounded-full border-2 border-[#65D8FF]/80 animate-ping shadow-[0_0_20px_rgba(101,216,255,0.6)]" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border border-[#B69CFF]/60 animate-ping [animation-delay:120ms]" />
        </div>
      ))}

      {/* Interactive Controls Overlay When Exploded (REASSEMBLE + Mode Selector) */}
      {exploded && (
        <div className="absolute top-3 sm:top-5 right-3 sm:right-6 z-30 flex flex-col items-end gap-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {/* Mode Switcher: Natural Anatomy vs Titanium Implant */}
            <div className="flex items-center p-1 bg-white/90 backdrop-blur-md rounded-full border border-white/80 shadow-md">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("natural");
                  selectPart("enamel");
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  mode === "natural"
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                NATURAL
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("implant");
                  selectPart("crown");
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  mode === "implant"
                    ? "bg-[#0284C7] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                IMPLANT
              </button>
            </div>

            {/* REASSEMBLE Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReassemble();
              }}
              className="group px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#6366F1] hover:from-[#6D4AEB] hover:to-[#5558E6] text-white font-mono font-bold text-[11px] sm:text-xs shadow-lg hover:shadow-[0_0_20px_rgba(124,92,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer border border-[#A78BFA]/50"
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>REASSEMBLE</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Callout / Touch Invitation when Assembled */}
      {!exploded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500">
          <div className="px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#0F172A] uppercase whitespace-nowrap">
              {isTouch ? "TAP TO EXPLORE 3D ANATOMY" : "CLICK TO EXPLORE 3D ANATOMY"}
            </span>
          </div>
        </div>
      )}

      {/* Render 3D WebGL Canvas */}
      {perf.enable3D ? (
        <Canvas
          dpr={isTouch ? Math.min(perf.dpr, 1.25) : perf.dpr}
          gl={{
            antialias: perf.mode !== "LITE",
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={shouldRender ? "always" : "never"}
          className="w-full h-full cursor-pointer select-none touch-pan-y"
          onClick={(e) => {
            // Fallback canvas-level click to ensure zero missed interactions
            if (!exploded) {
              triggerTapFeedback(e.clientX, e.clientY);
              toggleExplode();
            }
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0.2, isTouch ? 6.2 : 5.8]} fov={34} />

          {/* Cinematic Studio Lighting System */}
          <ambientLight intensity={1.4} color="#FFFFFF" />
          <directionalLight position={[5, 8, 4]} intensity={3.2} color="#FFFDF5" castShadow />
          <directionalLight position={[-4, 6, 2]} intensity={1.8} color="#BAE6FD" />
          <directionalLight position={[-4, 2, -5]} intensity={2.6} color="#E9D5FF" />
          <directionalLight position={[0, -4, 2]} intensity={0.7} color="#D1FAE5" />

          <Suspense fallback={null}>
            <Float
              speed={perf.mode === "LITE" || exploded || isTouch ? 0 : 1.4}
              rotationIntensity={perf.mode === "LITE" || exploded || isTouch ? 0 : 0.08}
              floatIntensity={perf.mode === "LITE" || exploded || isTouch ? 0 : 0.18}
            >
              <PearlescentAnatomicalTooth
                exploded={exploded}
                onToggleExplode={toggleExplode}
                selectedPart={selectedPart}
                onSelectPart={selectPart}
                mode={mode}
                hovered={hovered}
                simplified={perf.simplified3D}
                isTouchDevice={isTouch}
                onTriggerTapFeedback={triggerTapFeedback}
              />
            </Float>
          </Suspense>

          {/* Ground Soft Contact Shadows onto the Meadow Grass */}
          {perf.enableHeavyShadows && (
            <ContactShadows
              position={[0, -2.55, 0]}
              opacity={0.45}
              scale={5.8}
              blur={2.4}
              far={4.0}
              color="#22541C"
            />
          )}

          {/* Desktop Only OrbitControls: Completely unmounted on touch/mobile to eliminate jitter */}
          {!isTouch && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.5}
              rotateSpeed={0.45}
            />
          )}
        </Canvas>
      ) : (
        /* Still Fallback for Lite/Reduced-Motion */
        <div className="relative w-64 h-80 flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="fallbackToothEnamel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FCE7F3" />
                <stop offset="60%" stopColor="#FAF7F0" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
            </defs>
            <path
              d="M 60,30 C 75,15, 125,15, 140,30 C 160,50, 165,95, 150,135 C 138,165, 125,210, 118,230 C 114,240, 108,240, 104,228 C 98,205, 96,170, 92,170 C 88,170, 86,205, 80,228 C 76,240, 70,240, 66,230 C 59,210, 46,165, 34,135 C 19,95, 24,50, 44,30 Z"
              fill="url(#fallbackToothEnamel)"
              filter="drop-shadow(0 15px 30px rgba(0,0,0,0.12))"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default React.memo(HeroToothScene);

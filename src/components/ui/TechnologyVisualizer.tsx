import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight, Scan, Activity, Compass, Cpu, Sparkles } from "lucide-react";
import { usePerformanceMode, useInView } from "../../hooks/usePerformance";

const LAB_PHASES = [
  {
    id: "scan",
    step: "01",
    label: "SCAN",
    title: "Micron-Level Optical Surface Scan",
    subtitle: "High-Speed Laser Point-Cloud Acquisition",
    description:
      "Intraoral scanning camera fires structured optical patterns at 45,000 points per second. It creates a distortion-free 3D mesh of your teeth and gingival contours in real time without silicone paste.",
    metric: "45,000 Pts/Sec",
    accuracy: "±12 Microns",
    color: "#65D8FF",
    glowClass: "shadow-[0_0_35px_rgba(101,216,255,0.3)]",
  },
  {
    id: "analyze",
    step: "02",
    label: "ANALYZE",
    title: "Volumetric CBCT & Biometric Diagnostics",
    subtitle: "Voxel-Level Bone Density & Nerve Segmentation",
    description:
      "Low-dose 3D cone-beam computed tomography merges with the surface scan. Sub-surface nerve pathways, cortical bone thickness, and dynamic masticatory bite vectors are automatically computed.",
    metric: "0.08mm Voxel Depth",
    accuracy: "100% Volumetric",
    color: "#7C5CFF",
    glowClass: "shadow-[0_0_35px_rgba(124,92,255,0.3)]",
  },
  {
    id: "plan",
    step: "03",
    label: "PLAN",
    title: "Virtual Guided Implant Modeling",
    subtitle: "Surgical CAD Simulation & Stent Design",
    description:
      "The exact implant diameter, pitch angle, and sub-gingival depth are planned in virtual 3D CAD space. A custom stereolithographic guide is 3D printed with micron-precision titanium guide sleeves.",
    metric: "3D CAD/CAM",
    accuracy: "Sub-Millimeter Guided",
    color: "#B69CFF",
    glowClass: "shadow-[0_0_35px_rgba(182,156,255,0.3)]",
  },
  {
    id: "treat",
    step: "04",
    label: "TREAT",
    title: "Keyhole Minimally Invasive Execution",
    subtitle: "Zero-Flap Computer-Locked Trajectory",
    description:
      "Surgical drills fit directly into the 3D-printed guide stent, physically preventing any deviation from the planned depth and angle. No incisions, no scalpels, and significantly faster tissue healing.",
    metric: "Keyhole Precision",
    accuracy: "Zero Flap Incision",
    color: "#8DE8C1",
    glowClass: "shadow-[0_0_35px_rgba(141,232,193,0.3)]",
  },
  {
    id: "restore",
    step: "05",
    label: "RESTORE",
    title: "Monolithic Enamel Restoration",
    subtitle: "In-House 5-Axis Milling & Micro-Glazing",
    description:
      "Our in-house 5-axis robotic mill shapes high-translucency multilayer zirconia or lithium disilicate (E.max). The crown matches adjacent teeth in optical luminescence, color gradient, and bite function.",
    metric: "1,150 MPa Strength",
    accuracy: "Enamel Match",
    color: "#FF8E87",
    glowClass: "shadow-[0_0_35px_rgba(255,142,135,0.3)]",
  },
];

export function TechnologyVisualizer() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = LAB_PHASES[activePhaseIndex];
  const perf = usePerformanceMode();
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#0D0D11] text-[#F7F6F2] rounded-3xl p-6 sm:p-10 md:p-14 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative"
    >
      {/* Ambient Lighting & Controlled Glows (Purple + Cyan) */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
        style={{ backgroundColor: activePhase.color }}
      />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-15 bg-[#7C5CFF]" />

      {/* Subtle Background Scan Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #65D8FF 1px, transparent 1px), linear-gradient(to bottom, #7C5CFF 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top Header: Title & Interactive Phase Control */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: activePhase.color }}
            />
            <span className="text-xs uppercase font-mono tracking-widest text-[#B69CFF] font-semibold">
              DENTAL INTELLIGENCE LAB
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Digital Diagnostics in Motion.
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl font-body">
            Experience our 5-phase guided pathway from initial intraoral photonic capture to final robotically milled restoration.
          </p>
        </div>

        {/* Phase Navigation Pills (Interactive Morphing Selector) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 overflow-x-auto no-scrollbar max-w-full">
          {LAB_PHASES.map((p, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhaseIndex(idx)}
                className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "text-[#111111] font-bold shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeLabPhaseBubble"
                    className="absolute inset-0 rounded-full bg-white z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-[10px] opacity-75">{p.step}</span>
                  <span>{p.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: Central 3D Digital Scan + Spatial Telemetry Panels */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Central 3D Diagnostic Viewport (7 cols) */}
        <div className="lg:col-span-7 relative h-[340px] sm:h-[400px] md:h-[460px] rounded-3xl bg-black/60 border border-white/15 overflow-hidden flex items-center justify-center p-6 shadow-inner">
          {/* Subtle Radial Viewport Glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(circle at center, ${activePhase.color} 0%, transparent 70%)`,
            }}
          />

          {/* Sweeping Animated Laser Scan Line */}
          {isInView && perf.mode !== "LITE" && (
            <motion.div
              key={activePhase.id}
              initial={{ y: -180 }}
              animate={{ y: [-170, 170, -170] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-0.5 z-20 pointer-events-none"
              style={{
                backgroundColor: activePhase.color,
                boxShadow: `0 0 16px 2px ${activePhase.color}`,
                willChange: "transform",
              }}
            />
          )}

          {/* Central Morphing Visualization based on Active Phase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xs sm:max-w-sm h-64 sm:h-72 flex items-center justify-center"
            >
              {/* PHASE 01: SCAN - Surface Laser Point Cloud Mesh */}
              {activePhase.id === "scan" && (
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                  <g stroke="#65D8FF" strokeWidth="0.9" fill="none" opacity="0.75">
                    <line x1="45" y1="80" x2="100" y2="35" />
                    <line x1="100" y1="35" x2="155" y2="80" />
                    <line x1="155" y1="80" x2="140" y2="150" />
                    <line x1="140" y1="150" x2="100" y2="175" />
                    <line x1="100" y1="175" x2="60" y2="150" />
                    <line x1="60" y1="150" x2="45" y2="80" />
                    <line x1="100" y1="35" x2="100" y2="175" strokeDasharray="3 3" />
                    <line x1="45" y1="80" x2="140" y2="150" strokeDasharray="2 2" />
                    <line x1="155" y1="80" x2="60" y2="150" strokeDasharray="2 2" />
                    <line x1="100" y1="175" x2="90" y2="230" />
                    <line x1="100" y1="175" x2="110" y2="230" />
                  </g>
                  <path
                    d="M 60 70 C 50 110, 65 160, 85 220 C 100 230, 115 220, 135 160 C 150 110, 140 70, 100 55 C 80 55, 65 60, 60 70 Z"
                    fill="url(#scanGrad)"
                    stroke="#65D8FF"
                    strokeWidth="1.6"
                  />
                  <defs>
                    <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#65D8FF" stopOpacity="0.3" />
                      <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#65D8FF" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="110" r="18" stroke="#65D8FF" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <circle cx="100" cy="110" r="3.5" fill="#65D8FF" />
                </svg>
              )}

              {/* PHASE 02: ANALYZE - Volumetric Bone Heatmap & Nerve Canal */}
              {activePhase.id === "analyze" && (
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                  {/* Bone Density Contour Rings */}
                  <g stroke="#7C5CFF" strokeWidth="1" fill="none" opacity="0.6">
                    <ellipse cx="100" cy="120" rx="65" ry="85" />
                    <ellipse cx="100" cy="120" rx="45" ry="60" strokeDasharray="4 2" />
                    <ellipse cx="100" cy="120" rx="25" ry="35" stroke="#B69CFF" />
                  </g>
                  {/* Mandibular Nerve Canal Tracing */}
                  <path
                    d="M 30 190 Q 70 215, 100 215 Q 130 215, 170 190"
                    stroke="#FF8E87"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <circle cx="100" cy="110" r="45" fill="rgba(124,92,255,0.15)" stroke="#7C5CFF" strokeWidth="1.2" />
                  <text x="100" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                    1,240 HU
                  </text>
                  <text x="100" y="235" textAnchor="middle" fill="#FF8E87" fontSize="8" fontFamily="monospace">
                    NERVE CHANNEL SAFE ZONE
                  </text>
                </svg>
              )}

              {/* PHASE 03: PLAN - 3D Implant Placement Trajectory */}
              {activePhase.id === "plan" && (
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                  {/* Target Root Contour */}
                  <path
                    d="M 60 70 C 50 110, 65 160, 85 220 C 100 230, 115 220, 135 160 C 150 110, 140 70, 100 55 Z"
                    fill="none"
                    stroke="#B69CFF"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  {/* Implant Fixture Simulation with Threading */}
                  <rect x="85" y="80" width="30" height="90" rx="4" fill="#9CA1A8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="80" y1="95" x2="120" y2="95" stroke="#E2B04A" strokeWidth="2" />
                  <line x1="82" y1="115" x2="118" y2="115" stroke="#65D8FF" strokeWidth="1.5" />
                  <line x1="84" y1="135" x2="116" y2="135" stroke="#65D8FF" strokeWidth="1.5" />
                  <line x1="86" y1="155" x2="114" y2="155" stroke="#65D8FF" strokeWidth="1.5" />
                  {/* Planned Trajectory Vector Arrow */}
                  <line x1="100" y1="30" x2="100" y2="80" stroke="#B69CFF" strokeWidth="2.5" />
                  <polygon points="95,78 100,88 105,78" fill="#B69CFF" />
                  <text x="100" y="24" textAnchor="middle" fill="#B69CFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    CAD VECTOR: 90.0°
                  </text>
                </svg>
              )}

              {/* PHASE 04: TREAT - Guided Keyhole Sleeve */}
              {activePhase.id === "treat" && (
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                  {/* Surgical Stent Guide Base */}
                  <path
                    d="M 40 70 Q 100 55, 160 70 L 155 100 Q 100 85, 45 100 Z"
                    fill="rgba(141,232,193,0.2)"
                    stroke="#8DE8C1"
                    strokeWidth="1.5"
                  />
                  {/* Titanium Guide Sleeve */}
                  <rect x="84" y="60" width="32" height="40" rx="3" fill="#333" stroke="#8DE8C1" strokeWidth="2" />
                  <line x1="100" y1="40" x2="100" y2="180" stroke="#8DE8C1" strokeWidth="2" strokeDasharray="3 2" />
                  <circle cx="100" cy="180" r="4" fill="#8DE8C1" />
                  <text x="100" y="215" textAnchor="middle" fill="#8DE8C1" fontSize="9" fontFamily="monospace">
                    STOP DEPTH: 11.5mm LOCKED
                  </text>
                </svg>
              )}

              {/* PHASE 05: RESTORE - Polished Ceramic Restoration */}
              {activePhase.id === "restore" && (
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="restoredEnamel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#FAF7F2" />
                      <stop offset="100%" stopColor="#E0D6C8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 60 70 C 50 110, 65 160, 85 220 C 100 230, 115 220, 135 160 C 150 110, 140 70, 100 55 C 80 55, 65 60, 60 70 Z"
                    fill="url(#restoredEnamel)"
                    stroke="#FF8E87"
                    strokeWidth="2"
                  />
                  {/* Enamel Highlight Shine */}
                  <path
                    d="M 80 85 Q 95 75, 110 80 Q 95 105, 85 125 Z"
                    fill="white"
                    opacity="0.6"
                  />
                  <text x="100" y="235" textAnchor="middle" fill="#FF8E87" fontSize="9" fontFamily="monospace">
                    MONOLITHIC ZIRCONIA · 100% BIO-COMPATIBLE
                  </text>
                </svg>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Telemetry Corner Badges */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-white/50 space-y-1">
            <div className="flex items-center gap-1.5 text-white/90">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: activePhase.color }}
              />
              <span className="font-bold uppercase tracking-wider">{activePhase.label} MODE</span>
            </div>
            <div>STATUS: GUIDED ENGINE ACTIVE</div>
          </div>

          <div className="absolute bottom-4 right-4 font-mono text-right text-[10px] text-white/60">
            <div className="text-white font-bold">{activePhase.accuracy}</div>
            <div>{activePhase.metric}</div>
          </div>
        </div>

        {/* Right Column: Phase Intelligence & Telemetry Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-black"
                  style={{ backgroundColor: activePhase.color }}
                >
                  PHASE {activePhase.step}
                </span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  {activePhase.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white leading-tight">
                {activePhase.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 leading-relaxed font-body">
                {activePhase.description}
              </p>

              {/* Quantitative Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-mono text-white/50 uppercase">Precision Tolerance</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {activePhase.accuracy}
                  </div>
                </div>
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-mono text-white/50 uppercase">Processing Throughput</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {activePhase.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Controls */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() =>
                setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : LAB_PHASES.length - 1))
              }
              className="px-4 py-2.5 rounded-full border border-white/15 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
            >
              Previous Phase
            </button>
            <button
              onClick={() => setActivePhaseIndex((prev) => (prev + 1) % LAB_PHASES.length)}
              className="px-6 py-2.5 rounded-full bg-white text-[#111111] text-xs font-semibold hover:bg-white/90 transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-md"
            >
              <span>Next Protocol Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Spatial Floating Diagnostics Panels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#65D8FF]">
            <Scan className="w-3.5 h-3.5" />
            <span>01 · SCAN RESOLUTION</span>
          </div>
          <div className="text-xl font-display font-bold text-white mt-2">0.01 mm</div>
          <div className="text-[11px] text-white/50 mt-1">45,000 Points / Sec Mesh</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#7C5CFF]">
            <Activity className="w-3.5 h-3.5" />
            <span>02 · 3D VOLUMETRIC</span>
          </div>
          <div className="text-xl font-display font-bold text-white mt-2">0.08 mm</div>
          <div className="text-[11px] text-white/50 mt-1">Sub-surface CBCT Voxels</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69CFF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 · DIGITAL PLANNING</span>
          </div>
          <div className="text-xl font-display font-bold text-white mt-2">100% CAD</div>
          <div className="text-[11px] text-white/50 mt-1">Surgical Stent Guided</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8DE8C1]">
            <Compass className="w-3.5 h-3.5" />
            <span>04 · IMPLANT PATH</span>
          </div>
          <div className="text-xl font-display font-bold text-white mt-2">Keyhole</div>
          <div className="text-[11px] text-white/50 mt-1">Zero Scalpel Incision</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TechnologyVisualizer);

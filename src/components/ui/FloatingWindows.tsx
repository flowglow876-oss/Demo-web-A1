import React from "react";
import { motion } from "motion/react";
import {
  Scan,
  Sparkles,
  Star,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Compass,
  Layers,
} from "lucide-react";

export function FloatingHeroWindows() {
  return (
    <>
      {/* WINDOW 01: DIGITAL SCAN (Top Left Floating) */}
      <motion.div
        initial={{ opacity: 0, y: -25, rotate: -2 }}
        animate={{ opacity: 1, y: [0, -6, 0], rotate: -1.5 }}
        transition={{
          opacity: { delay: 0.5, duration: 0.8 },
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="hidden xl:flex absolute -left-10 top-12 z-20 w-64 p-4 rounded-2xl glass-panel shadow-[0_20px_40px_-15px_rgba(101,216,255,0.15)] flex-col gap-2.5 select-none cursor-pointer border border-[#65D8FF]/25 hover:border-[#65D8FF]/50 transition-all duration-300"
      >
        <div className="flex items-center justify-between border-b border-black/5 pb-2">
          <div className="flex items-center gap-2">
            <Scan className="w-3.5 h-3.5 text-[#65D8FF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider font-semibold text-[#111111]">
              WINDOW 01 · DIGITAL SCAN
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Mini Wireframe Animated Scan Graphic */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-tr from-[#65D8FF]/15 to-[#B69CFF]/15 flex items-center justify-center border border-[#65D8FF]/20 overflow-hidden shrink-0">
            <svg viewBox="0 0 60 60" className="w-10 h-10">
              <path
                d="M 15 20 Q 30 10, 45 20 Q 48 35, 42 45 Q 30 52, 18 45 Q 12 35, 15 20 Z"
                fill="none"
                stroke="#65D8FF"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <circle cx="30" cy="30" r="3" fill="#7C5CFF" />
              <line x1="20" y1="20" x2="40" y2="40" stroke="#7C5CFF" strokeWidth="0.8" opacity="0.6" />
              <line x1="40" y1="20" x2="20" y2="40" stroke="#7C5CFF" strokeWidth="0.8" opacity="0.6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#65D8FF]/30 to-transparent animate-pulse pointer-events-none" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#111111]">Arch Point Cloud</div>
            <div className="text-[10px] font-mono text-[#737373] mt-0.5">0.01mm Mesh Calibrated</div>
            <div className="text-[9px] font-mono text-[#65D8FF] font-semibold mt-1">45,000 PTS / SEC</div>
          </div>
        </div>

        <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
          <div className="w-4/5 h-full bg-gradient-to-r from-[#65D8FF] to-[#7C5CFF] rounded-full" />
        </div>
      </motion.div>

      {/* WINDOW 02: TREATMENT PLAN (Bottom Right Floating) */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 2 }}
        animate={{ opacity: 1, y: [0, 6, 0], rotate: 1.5 }}
        transition={{
          opacity: { delay: 0.7, duration: 0.8 },
          y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
        }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="hidden xl:flex absolute -right-8 bottom-12 z-20 w-64 p-4 rounded-2xl glass-panel shadow-[0_20px_40px_-15px_rgba(124,92,255,0.15)] flex-col gap-2.5 select-none cursor-pointer border border-[#7C5CFF]/25 hover:border-[#7C5CFF]/50 transition-all duration-300"
      >
        <div className="flex items-center justify-between border-b border-black/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
            <span className="text-[11px] font-mono tracking-wider font-semibold text-[#111111]">
              WINDOW 02 · PLAN
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
            3D READY
          </span>
        </div>

        <div>
          <div className="text-xs font-bold text-[#111111] uppercase tracking-wide">
            IMPLANT 01 PLANNED
          </div>
          <p className="text-[10px] text-[#737373] mt-1 leading-snug">
            Cortical Bone Density: 1,240 HU · Guide Template #04
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#7C5CFF] font-semibold pt-1.5 border-t border-black/5">
          <span>Sub-Millimeter Safe</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </motion.div>

      {/* WINDOW 03: PRECISION (Bottom Left Floating) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, y: [0, 5, 0], x: 0 }}
        transition={{
          opacity: { delay: 0.9, duration: 0.8 },
          y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 },
        }}
        whileHover={{ scale: 1.05 }}
        className="hidden 2xl:flex absolute -left-12 bottom-20 z-20 w-56 p-3.5 rounded-2xl glass-panel shadow-sm flex-col gap-2 select-none border border-[#8DE8C1]/30 hover:border-[#8DE8C1]/60 transition-all"
      >
        <div className="flex items-center justify-between border-b border-black/5 pb-1.5">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#8DE8C1]" />
            <span className="text-[10px] font-mono font-semibold text-[#111111]">
              WINDOW 03 · PRECISION
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold text-emerald-700">100% DIGITAL</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-display font-bold text-[#111111] tabular-nums">0.01 mm</span>
          <span className="text-[10px] font-mono text-[#737373]">TOLERANCE</span>
        </div>
        <div className="text-[10px] text-[#737373]">Zero-flap keyhole trajectory</div>
      </motion.div>

      {/* WINDOW 04: SMILE DESIGN (Top Right Floating) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, y: [0, -5, 0], x: 0 }}
        transition={{
          opacity: { delay: 1.1, duration: 0.8 },
          y: { repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 },
        }}
        whileHover={{ scale: 1.05 }}
        className="hidden 2xl:flex absolute -right-10 top-16 z-20 w-56 p-3.5 rounded-2xl glass-panel shadow-sm flex-col gap-2 select-none border border-[#FF8E87]/30 hover:border-[#FF8E87]/60 transition-all"
      >
        <div className="flex items-center justify-between border-b border-black/5 pb-1.5">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#FF8E87]" />
            <span className="text-[10px] font-mono font-semibold text-[#111111]">
              WINDOW 04 · SMILE DESIGN
            </span>
          </div>
          <Sparkles className="w-3 h-3 text-[#FF8E87]" />
        </div>
        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111111] py-1 bg-[#F7F6F2] px-2 rounded-lg">
          <span>SCAN</span>
          <span className="text-[#FF8E87]">→</span>
          <span>PLAN</span>
          <span className="text-[#FF8E87]">→</span>
          <span>REFINE</span>
        </div>
        <div className="text-[10px] text-[#737373]">Golden proportion lip dynamics</div>
      </motion.div>
    </>
  );
}

export function FloatingClinicWindows() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto my-12">
      {/* WINDOW 03: SMILE PREVIEW */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="p-6 rounded-3xl glass-panel shadow-sm border border-black/10 flex flex-col justify-between group transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#B69CFF] font-semibold">
            WINDOW 03 · SMILE PREVIEW
          </span>
          <Sparkles className="w-4 h-4 text-[#B69CFF] group-hover:rotate-12 transition-transform" />
        </div>
        <div className="space-y-1 mb-4">
          <div className="text-base font-semibold text-[#111111]">Facial Proportion Golden Ratio</div>
          <p className="text-xs text-[#737373] leading-relaxed">
            Curvature aligned with interpupillary line and lip dynamics before ceramic milling.
          </p>
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-[#111111] pt-3 border-t border-black/5">
          <span>Simulation: Live</span>
          <span className="text-emerald-600 font-bold">100% Test-Drive</span>
        </div>
      </motion.div>

      {/* WINDOW 04: PATIENT REVIEW */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="p-6 rounded-3xl glass-panel shadow-sm border border-black/10 flex flex-col justify-between group transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase text-amber-500 font-semibold">
            WINDOW 04 · PATIENT AUDIT
          </span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
        </div>
        <div className="space-y-1 mb-4">
          <div className="text-base font-serif-accent italic text-[#111111]">
            "Thoughtfully designed experience from the moment I entered."
          </div>
          <p className="text-xs text-[#737373]">Verified Surgical Implant Patient · Aligarh</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-3 border-t border-black/5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent Patient Audit</span>
        </div>
      </motion.div>

      {/* WINDOW 05: APPOINTMENT */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="p-6 rounded-3xl glass-panel shadow-sm border border-black/10 flex flex-col justify-between group transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#65D8FF] font-semibold">
            WINDOW 05 · APPOINTMENT
          </span>
          <Calendar className="w-4 h-4 text-[#65D8FF] group-hover:scale-110 transition-transform" />
        </div>
        <div className="space-y-1 mb-4">
          <div className="text-base font-semibold text-[#111111]">NEXT AVAILABLE CONSULTATION</div>
          <p className="text-xs text-[#737373] leading-relaxed">
            This Week · Limited to 8 comprehensive daily patient reviews.
          </p>
        </div>
        <a
          href="#appointment-section"
          className="flex items-center justify-between text-xs font-semibold text-[#7C5CFF] hover:text-[#111111] transition-colors pt-3 border-t border-black/5"
        >
          <span>Reserve 3D Diagnostic Slot</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  );
}

export default FloatingHeroWindows;

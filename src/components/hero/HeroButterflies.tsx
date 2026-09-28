import React, { useState } from "react";
import { motion } from "motion/react";

interface ButterflyProps {
  id: string;
  leftPercent: number; // e.g. 25%
  topPercent: number; // e.g. 35%
  deltaXRange: number[];
  deltaYRange: number[];
  duration: number;
  scale?: number;
  wingColorPrimary: string;
  wingColorSecondary: string;
  wingPatternColor: string;
  spotColor: string;
}

function ButterflyUnit({
  leftPercent,
  topPercent,
  deltaXRange,
  deltaYRange,
  duration,
  scale = 1,
  wingColorPrimary,
  wingColorSecondary,
  wingPatternColor,
  spotColor,
}: ButterflyProps) {
  const [isDarting, setIsDarting] = useState(false);

  const handleInteraction = () => {
    setIsDarting(true);
    setTimeout(() => setIsDarting(false), 1100);
  };

  return (
    <motion.div
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        scale,
      }}
      animate={{
        x: isDarting ? deltaXRange.map((x) => x + (Math.random() * 50 - 25)) : deltaXRange,
        y: isDarting ? deltaYRange.map((y) => y - 40) : deltaYRange,
        rotate: isDarting ? [-14, 18, -8] : [-6, 8, -4],
      }}
      transition={{
        duration: isDarting ? 1.0 : duration,
        repeat: isDarting ? 0 : Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
      className="absolute z-25 cursor-pointer pointer-events-auto select-none"
    >
      {/* 3D Butterfly Container with Perspective */}
      <div className="relative flex items-center justify-center [perspective:600px] group">
        {/* Soft Ambient Ground Cast Shadow */}
        <div className="absolute -bottom-8 w-6 h-2 rounded-full bg-black/15 blur-xs transform scale-y-50 pointer-events-none" />

        {/* Left Wing */}
        <div className="animate-wing-left transform-gpu">
          <svg
            width="28"
            height="34"
            viewBox="0 0 28 34"
            fill="none"
            className="drop-shadow-sm filter"
          >
            {/* Forewing */}
            <path
              d="M 26 18 C 22 8, 12 1, 3 3 C -1 5, 1 15, 8 20 C 14 24, 22 21, 26 18 Z"
              fill={`url(#wingGradLeft-${wingColorPrimary.replace("#", "")})`}
              stroke={wingPatternColor}
              strokeWidth="0.8"
            />
            {/* Hindwing */}
            <path
              d="M 24 17 C 20 23, 14 31, 8 32 C 4 33, 3 26, 7 21 C 12 16, 20 16, 24 17 Z"
              fill={wingColorSecondary}
              stroke={wingPatternColor}
              strokeWidth="0.7"
              opacity="0.92"
            />
            {/* Decorative Wing Spots */}
            <circle cx="9" cy="8" r="1.6" fill={spotColor} />
            <circle cx="16" cy="11" r="1.3" fill={spotColor} />
            <circle cx="11" cy="24" r="1.2" fill={spotColor} />

            <defs>
              <linearGradient
                id={`wingGradLeft-${wingColorPrimary.replace("#", "")}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={wingColorPrimary} />
                <stop offset="60%" stopColor={wingColorSecondary} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Central Thorax & Antennae */}
        <div className="relative z-10 w-1.5 h-6 bg-[#2B2927] rounded-full mx-[-1px] shadow-2xs flex flex-col items-center">
          {/* Delicate Antennae */}
          <div className="absolute -top-3 w-4 h-3 flex justify-between pointer-events-none">
            <span className="w-1.5 h-3 border-l border-t border-[#333] rounded-tl-full" />
            <span className="w-1.5 h-3 border-r border-t border-[#333] rounded-tr-full" />
          </div>
        </div>

        {/* Right Wing */}
        <div className="animate-wing-right transform-gpu">
          <svg
            width="28"
            height="34"
            viewBox="0 0 28 34"
            fill="none"
            className="drop-shadow-sm filter"
          >
            {/* Forewing */}
            <path
              d="M 2 18 C 6 8, 16 1, 25 3 C 29 5, 27 15, 20 20 C 14 24, 6 21, 2 18 Z"
              fill={`url(#wingGradRight-${wingColorPrimary.replace("#", "")})`}
              stroke={wingPatternColor}
              strokeWidth="0.8"
            />
            {/* Hindwing */}
            <path
              d="M 4 17 C 8 23, 14 31, 20 32 C 24 33, 25 26, 21 21 C 16 16, 8 16, 4 17 Z"
              fill={wingColorSecondary}
              stroke={wingPatternColor}
              strokeWidth="0.7"
              opacity="0.92"
            />
            {/* Decorative Wing Spots */}
            <circle cx="19" cy="8" r="1.6" fill={spotColor} />
            <circle cx="12" cy="11" r="1.3" fill={spotColor} />
            <circle cx="17" cy="24" r="1.2" fill={spotColor} />

            <defs>
              <linearGradient
                id={`wingGradRight-${wingColorPrimary.replace("#", "")}`}
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={wingColorPrimary} />
                <stop offset="60%" stopColor={wingColorSecondary} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroButterflies({ isSunReacting = false }: { isSunReacting?: boolean }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-25 transition-all duration-700 ${
        isSunReacting ? "opacity-85" : "opacity-100"
      }`}
    >
      {/* BUTTERFLY 1: Warm Amber / Golden Monarch (Reference match: hovering mid-left of tooth) */}
      <ButterflyUnit
        id="butterfly-amber"
        leftPercent={51}
        topPercent={45}
        deltaXRange={[0, 40, 15, -25, 0]}
        deltaYRange={[0, -25, 20, -10, 0]}
        duration={13}
        scale={0.96}
        wingColorPrimary="#F59E0B"
        wingColorSecondary="#EA580C"
        wingPatternColor="#451A03"
        spotColor="#FFFBEB"
      />

      {/* BUTTERFLY 2: Pearlescent White & Cream (Reference match: hovering upper-right of tooth) */}
      <ButterflyUnit
        id="butterfly-cream"
        leftPercent={86}
        topPercent={18}
        deltaXRange={[0, 30, -20, -35, 0]}
        deltaYRange={[0, 20, -15, 12, 0]}
        duration={16}
        scale={0.88}
        wingColorPrimary="#FEF3C7"
        wingColorSecondary="#F3E8FF"
        wingPatternColor="#334155"
        spotColor="#FFFFFF"
      />

      {/* BUTTERFLY 3: Azure Swallowtail (Floating softly between left headline & sky) */}
      <ButterflyUnit
        id="butterfly-azure"
        leftPercent={32}
        topPercent={26}
        deltaXRange={[0, 35, 15, -25, 0]}
        deltaYRange={[0, -20, 15, -10, 0]}
        duration={15}
        scale={0.82}
        wingColorPrimary="#38BDF8"
        wingColorSecondary="#818CF8"
        wingPatternColor="#0F172A"
        spotColor="#FFFFFF"
      />
    </div>
  );
}

export default React.memo(HeroButterflies);

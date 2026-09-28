import React, { useState } from "react";
import { usePerformanceMode } from "../../hooks/usePerformance";

interface HeroEnvironmentProps {
  parallaxX?: number; // Normalized -1 to 1
  parallaxY?: number; // Normalized -1 to 1
  onSunInteract?: () => void;
  isSunInteracting?: boolean;
}

export function HeroEnvironment({
  parallaxX = 0,
  parallaxY = 0,
  onSunInteract,
  isSunInteracting = false,
}: HeroEnvironmentProps) {
  const perf = usePerformanceMode();
  const [internalSunPulse, setInternalSunPulse] = useState(false);

  const handleSunClick = () => {
    setInternalSunPulse(true);
    if (onSunInteract) onSunInteract();
    setTimeout(() => setInternalSunPulse(false), 1200);
  };

  // Parallax offsets scaled by depth factors
  const isMobile = perf.isMobile;
  const pFactor = isMobile ? 0.25 : 1;

  const skyShiftX = parallaxX * -4 * pFactor;
  const cloudsFarShiftX = parallaxX * -8 * pFactor;
  const cloudsNearShiftX = parallaxX * -14 * pFactor;
  const hillsShiftX = parallaxX * -18 * pFactor;
  const hillsShiftY = parallaxY * -6 * pFactor;
  const midMeadowShiftX = parallaxX * -24 * pFactor;
  const midMeadowShiftY = parallaxY * -10 * pFactor;
  const fgGrassShiftX = parallaxX * -36 * pFactor;
  const fgGrassShiftY = parallaxY * -14 * pFactor;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. SKY GRADIENT: Azure blue transitioning to sun-dappled horizon */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${skyShiftX}px, 0, 0)`,
          background:
            "linear-gradient(180deg, #4A9EEB 0%, #68B4F6 20%, #90CBFA 42%, #C4E5FD 65%, #E5F4FE 82%, #F7F6F2 100%)",
        }}
      />

      {/* 2. ATMOSPHERIC SUNSHINE & SOFT BLOOM */}
      <div
        className="absolute top-0 right-1/4 md:right-[28%] w-[480px] md:w-[750px] h-[480px] md:h-[750px] -translate-y-1/3 rounded-full pointer-events-none transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,252,230,0.85) 0%, rgba(254,240,190,0.5) 25%, rgba(253,224,171,0.25) 50%, rgba(255,255,255,0) 75%)",
          transform: `scale(${internalSunPulse || isSunInteracting ? 1.25 : 1}) translate3d(${parallaxX * -6}px, ${parallaxY * -4}px, 0)`,
        }}
      />

      {/* 3. INTERACTIVE SUN CORE & LENS FLARE */}
      <div
        onClick={handleSunClick}
        title="Bask in sunlight"
        className="absolute top-8 md:top-12 right-1/4 md:right-[28%] -translate-x-1/2 pointer-events-auto cursor-pointer group z-10"
      >
        <div className="relative flex items-center justify-center">
          {/* Core sun disk */}
          <div className="w-16 h-16 md:w-22 md:h-22 rounded-full bg-[#FFFBEB] shadow-[0_0_50px_rgba(255,245,180,0.95),0_0_110px_rgba(251,191,36,0.65)] animate-sun-glow group-hover:scale-110 transition-transform duration-500" />
          
          {/* Coronal pulsing glow */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-amber-200/40 animate-ping opacity-40 duration-1000" />

          {/* Diagonal sunbeams */}
          <div className="absolute w-64 md:w-88 h-1 bg-gradient-to-r from-transparent via-amber-100/50 to-transparent rotate-45 transform pointer-events-none blur-[0.5px]" />
          <div className="absolute w-64 md:w-88 h-1 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent -rotate-45 transform pointer-events-none blur-[0.5px]" />
        </div>
      </div>

      {/* 4. DRIFTING CUMULUS CLOUDS (Layer 1 - High Altitude) */}
      <div
        className="absolute top-4 left-0 w-[200%] h-48 opacity-75 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${cloudsFarShiftX}px, 0, 0)` }}
      >
        <div className="w-full h-full flex animate-cloud-slow">
          <svg
            className="w-1/2 h-full fill-white/80 filter drop-shadow-[0_10px_20px_rgba(100,160,220,0.15)]"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <path d="M0,160 Q80,110 160,140 Q220,90 320,120 Q380,60 480,90 Q560,30 680,80 Q780,50 880,100 Q960,70 1060,110 Q1140,80 1200,130 L1200,240 L0,240 Z" />
            <path d="M120,170 Q200,120 300,150 Q390,90 510,130 Q620,80 740,120 Q860,70 960,130 L1200,240 L0,240 Z" opacity="0.6" />
          </svg>
          <svg
            className="w-1/2 h-full fill-white/80 filter drop-shadow-[0_10px_20px_rgba(100,160,220,0.15)]"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <path d="M0,160 Q80,110 160,140 Q220,90 320,120 Q380,60 480,90 Q560,30 680,80 Q780,50 880,100 Q960,70 1060,110 Q1140,80 1200,130 L1200,240 L0,240 Z" />
            <path d="M120,170 Q200,120 300,150 Q390,90 510,130 Q620,80 740,120 Q860,70 960,130 L1200,240 L0,240 Z" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* 5. DRIFTING CUMULUS CLOUDS (Layer 2 - Fluffy Cumulus Billows matching reference image) */}
      <div
        className="absolute top-16 md:top-20 left-0 w-[200%] h-60 opacity-90 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${cloudsNearShiftX}px, 0, 0)` }}
      >
        <div className="w-full h-full flex animate-cloud-medium">
          <svg
            className="w-1/2 h-full fill-white/95 filter drop-shadow-[0_15px_30px_rgba(90,150,210,0.18)]"
            viewBox="0 0 1200 260"
            preserveAspectRatio="none"
          >
            <path d="M-50,190 C30,190 60,130 140,130 C200,130 240,160 290,160 C350,160 380,100 470,100 C540,100 580,140 640,140 C720,140 760,80 870,80 C950,80 990,130 1060,130 C1140,130 1180,170 1250,170 L1250,260 L-50,260 Z" />
            <path d="M140,130 C200,130 240,160 290,160 C350,160 380,100 470,100 C540,100 580,140 640,140 C720,140 760,80 870,80 C950,80 990,130 1060,130" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3" />
          </svg>
          <svg
            className="w-1/2 h-full fill-white/95 filter drop-shadow-[0_15px_30px_rgba(90,150,210,0.18)]"
            viewBox="0 0 1200 260"
            preserveAspectRatio="none"
          >
            <path d="M-50,190 C30,190 60,130 140,130 C200,130 240,160 290,160 C350,160 380,100 470,100 C540,100 580,140 640,140 C720,140 760,80 870,80 C950,80 990,130 1060,130 C1140,130 1180,170 1250,170 L1250,260 L-50,260 Z" />
            <path d="M140,130 C200,130 240,160 290,160 C350,160 380,100 470,100 C540,100 580,140 640,140 C720,140 760,80 870,80 C950,80 990,130 1060,130" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* 6. DISTANT ROLLING GREEN HILLS */}
      <div
        className="absolute bottom-20 sm:bottom-28 left-0 right-0 h-48 md:h-64 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${hillsShiftX}px, ${hillsShiftY}px, 0)`,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hillDistantGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#76BC70" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#58A352" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3E8636" />
            </linearGradient>
          </defs>
          <path
            d="M0,175 Q320,110 680,150 T1440,130 L1440,320 L0,320 Z"
            fill="url(#hillDistantGrad2)"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* 7. MAIN MEADOW MOUND (Exact match to reference photo: rising knoll cradling the tooth) */}
      <div
        className="absolute bottom-8 sm:bottom-12 left-0 right-0 h-72 md:h-96 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${midMeadowShiftX}px, ${midMeadowShiftY}px, 0)`,
        }}
      >
        <svg viewBox="0 0 1440 360" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="referenceMeadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#84D342" />
              <stop offset="25%" stopColor="#64BA30" />
              <stop offset="65%" stopColor="#3E8E1E" />
              <stop offset="100%" stopColor="#256012" />
            </linearGradient>
            <radialGradient id="sunGleamRightMound" cx="72%" cy="18%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Organic sloping knoll that rises on the right to anchor the monumental tooth */}
          <path
            d="M0,230 Q280,185 640,195 Q980,135 1260,115 Q1360,110 1440,125 L1440,360 L0,360 Z"
            fill="url(#referenceMeadowGrad)"
          />
          {/* Sunlight gleam striking the grassy mound */}
          <path
            d="M0,230 Q280,185 640,195 Q980,135 1260,115 Q1360,110 1440,125 L1440,360 L0,360 Z"
            fill="url(#sunGleamRightMound)"
          />
        </svg>
      </div>

      {/* 8. FOREGROUND SWAYING GRASS & CHAMOMILE WILDFLOWERS */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56 overflow-hidden transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${fgGrassShiftX}px, ${fgGrassShiftY}px, 0)`,
        }}
      >
        <div className="absolute inset-0 flex items-end justify-between px-2 md:px-8">
          {/* Left Cluster (Beneath Headline) */}
          <div className="flex items-end gap-1.5 md:gap-3 opacity-90 animate-grass-sway origin-bottom">
            <GrassBlade height={95} color="#5BAA2D" width={8} />
            <GrassBlade height={125} color="#7BC844" width={10} />
            <WildflowerChamomile size={20} />
            <GrassBlade height={105} color="#488D22" width={8} />
            <WildflowerChamomile size={16} />
            <GrassBlade height={135} color="#6EB938" width={10} />
            <GrassBlade height={85} color="#5BAA2D" width={7} />
          </div>

          {/* Mid-Left Cluster */}
          <div className="hidden sm:flex items-end gap-2 animate-grass-sway-soft origin-bottom">
            <GrassBlade height={100} color="#6EB938" width={9} />
            <WildflowerChamomile size={18} />
            <GrassBlade height={135} color="#4C9C29" width={11} />
            <GrassBlade height={110} color="#7BC844" width={9} />
            <WildflowerChamomile size={22} />
            <GrassBlade height={90} color="#5BAA2D" width={8} />
          </div>

          {/* Center Cluster (Cradling the Tooth Base) */}
          <div className="flex items-end gap-2 md:gap-3.5 animate-grass-sway origin-bottom">
            <GrassBlade height={120} color="#7BC844" width={10} />
            <WildflowerChamomile size={22} />
            <GrassBlade height={150} color="#4C9C29" width={11} />
            <GrassBlade height={170} color="#8CE04F" width={12} />
            <WildflowerChamomile size={24} />
            <GrassBlade height={155} color="#5EA92E" width={11} />
            <WildflowerChamomile size={19} />
            <GrassBlade height={130} color="#7BC844" width={10} />
          </div>

          {/* Right Cluster (Framing the Tooth & Meadow) */}
          <div className="flex items-end gap-2 md:gap-3 animate-grass-sway-soft origin-bottom">
            <GrassBlade height={130} color="#5BAA2D" width={10} />
            <WildflowerChamomile size={20} />
            <GrassBlade height={160} color="#7BC844" width={12} />
            <GrassBlade height={115} color="#488D22" width={9} />
            <WildflowerChamomile size={18} />
            <GrassBlade height={145} color="#8CE04F" width={11} />
            <GrassBlade height={100} color="#5BAA2D" width={8} />
          </div>
        </div>
      </div>

      {/* 9. REALISTIC PHOTOGRAPHY LENS FLARE (Matching the exact flare in reference photo!) */}
      <div className="absolute bottom-6 md:bottom-12 right-12 md:right-32 pointer-events-none z-15">
        {/* Soft diagonal flare beam */}
        <div className="w-48 md:w-80 h-1 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent rotate-35 transform filter blur-xs" />
        
        {/* Chromatic aberration colored bokeh disks along flare line */}
        <div className="relative">
          {/* Cyan/Aqua flare ring */}
          <div className="absolute -top-12 -left-8 w-12 h-12 rounded-full border border-cyan-400/40 bg-cyan-400/15 filter blur-[1px]" />
          {/* Golden sunburst glare */}
          <div className="absolute -top-4 left-6 w-20 h-20 rounded-full bg-radial from-amber-200/60 to-transparent filter blur-sm animate-pulse" />
          {/* Lavender/Pink secondary disc */}
          <div className="absolute top-10 left-20 w-8 h-8 rounded-full border border-purple-300/40 bg-pink-400/15 filter blur-[0.5px]" />
          {/* Emerald green tertiary disc */}
          <div className="absolute top-20 left-32 w-14 h-14 rounded-full border border-emerald-400/35 bg-emerald-400/10 filter blur-[1px]" />
        </div>
      </div>

      {/* 10. SEAMLESS HORIZON BASE BLEND (Transitions smoothly into the rest of the site) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-transparent via-[#F7F6F2]/75 to-[#F7F6F2] pointer-events-none" />
    </div>
  );
}

// Procedural Grass Blade SVG
function GrassBlade({ height, color, width }: { height: number; color: string; width: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="drop-shadow-xs"
      fill="none"
    >
      <path
        d={`M 0,${height} C ${width * 0.2},${height * 0.6} ${width * 0.8},${height * 0.3} ${width * 0.5},0 C ${width * 0.7},${height * 0.3} ${width},${height * 0.6} ${width},${height} Z`}
        fill={color}
      />
    </svg>
  );
}

// Beautiful Chamomile Daisy matching the reference photo
function WildflowerChamomile({ size }: { size: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center -mb-2.5 z-1 drop-shadow-xs select-none"
    >
      {/* 8 white delicate rounded petals */}
      <div className="absolute inset-0 rounded-full border-2 border-white/95 bg-white/90" />
      {/* Sunny warm yellow pollen center */}
      <div
        style={{ width: size * 0.44, height: size * 0.44 }}
        className="rounded-full bg-[#F59E0B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

export default React.memo(HeroEnvironment);

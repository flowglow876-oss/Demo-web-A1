import React from "react";
import { usePerformanceMode } from "../../hooks/usePerformance";

export function BackgroundSystem() {
  const perf = usePerformanceMode();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Layer 1: Subtle CSS Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35" />

      {/* Layer 2: Lightweight Color Orbs (transform-only, no heavy repaints) */}
      {perf.enableBackgroundAurora ? (
        <div className="absolute inset-0 overflow-hidden">
          {/* Lavender/Cyan Ambient Orb (Top Left) */}
          <div
            className={`absolute -top-24 -left-24 w-[380px] h-[380px] md:w-[540px] md:h-[540px] rounded-full opacity-60 ${
              perf.mode === 'HIGH' ? 'animate-aurora' : ''
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(182,156,255,0.18) 0%, rgba(101,216,255,0.10) 45%, transparent 70%)",
              willChange: perf.mode === 'HIGH' ? "transform" : "auto",
            }}
          />

          {/* Warm Peach/Coral Ambient Orb (Right Middle) */}
          <div
            className={`absolute top-1/3 -right-24 w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full opacity-50 ${
              perf.mode === 'HIGH' ? 'animate-aurora-reverse' : ''
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(255,142,135,0.14) 0%, rgba(255,198,156,0.10) 45%, transparent 70%)",
              willChange: perf.mode === 'HIGH' ? "transform" : "auto",
            }}
          />

          {/* Mint/Aqua Orb (Bottom Left) */}
          <div
            className="absolute bottom-12 left-1/4 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(141,232,193,0.15) 0%, rgba(101,216,255,0.06) 50%, transparent 70%)",
            }}
          />
        </div>
      ) : (
        /* Static CSS Radial Gradients for LITE / Low-Power Mode (0 GPU cost) */
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 10%, rgba(182,156,255,0.12) 0%, transparent 40%),
              radial-gradient(circle at 90% 40%, rgba(255,142,135,0.10) 0%, transparent 40%),
              radial-gradient(circle at 30% 90%, rgba(141,232,193,0.08) 0%, transparent 40%)
            `,
          }}
        />
      )}
    </div>
  );
}

export default React.memo(BackgroundSystem);

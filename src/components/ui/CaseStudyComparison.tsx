import React, { useState, useRef, useCallback } from "react";
import { CASE_STUDIES } from "@/src/data/dental-data";
import { MoveHorizontal, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export function CaseStudyComparison() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-1");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full">
      {/* Case Tabs with Agency Pill Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CASE_STUDIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCaseId(c.id);
              setSliderPosition(50);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
              selectedCaseId === c.id
                ? "bg-[#111111] text-[#F7F6F2] shadow-md shadow-black/10 scale-105"
                : "bg-white/80 border border-black/10 text-[#737373] hover:text-[#111111] hover:border-black/20"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Main Full-Width Comparison Agency Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/85 backdrop-blur-xl border border-black/10 rounded-3xl p-6 md:p-10 shadow-lg">
        {/* Left: Interactive Draggable Visualizer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center w-full">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-black/10 shadow-inner bg-[#EAE8E2] touch-pan-y"
            data-cursor="view"
          >
            {/* "AFTER" Layer (Full Background - Radiant Restored Smile) */}
            <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center">
              {activeCase.image && (
                <img
                  src={activeCase.image}
                  alt={`${activeCase.title} restored`}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Tag for After */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-mono tracking-wider font-semibold shadow-md flex items-center gap-1.5 border border-emerald-400/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AFTER · RESTORED
              </div>

              <div className="absolute bottom-12 right-6 max-w-xs text-right text-white pointer-events-none hidden sm:block">
                <div className="text-[11px] font-mono text-emerald-300 font-semibold">{activeCase.tag}</div>
                <div className="text-xs text-white/90 line-clamp-2 mt-0.5">{activeCase.result}</div>
              </div>
            </div>

            {/* "BEFORE" Layer (Clipped via Slider Percentage - Initial Presentation) */}
            <div
              className="absolute inset-0 overflow-hidden border-r border-white/80"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              {activeCase.image && (
                <img
                  src={activeCase.image}
                  alt={`${activeCase.title} before`}
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 sepia-25"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

              {/* Tag for Before */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0F172A]/90 backdrop-blur-md text-[#F8FAFC] text-[11px] font-mono tracking-wider font-semibold shadow-md flex items-center gap-1.5 border border-white/20">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                BEFORE · INITIAL
              </div>

              <div className="absolute bottom-12 left-6 max-w-xs text-left text-white pointer-events-none hidden sm:block">
                <div className="text-[11px] font-mono text-amber-300 font-semibold">INITIAL PRESENTATION</div>
                <div className="text-xs text-white/90 line-clamp-2 mt-0.5">{activeCase.challenge}</div>
              </div>
            </div>

            {/* Draggable Divider Handle Line with Reactive Light Trail */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none transition-shadow duration-150"
              style={{
                left: `${sliderPosition}%`,
                boxShadow: isDragging
                  ? "0 0 20px 3px rgba(182,156,255,0.8), 0 0 8px 1px rgba(101,216,255,0.9)"
                  : "0 0 10px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#111111] shadow-xl border border-black/15 flex items-center justify-center transition-transform duration-150 ${
                  isDragging ? "scale-110 shadow-[0_0_25px_rgba(124,92,255,0.5)]" : ""
                }`}
              >
                <MoveHorizontal className="w-4 h-4 text-[#111111]" />
              </div>
            </div>

            {/* Floating percentage indicator: BEFORE · 50% · AFTER */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-xs font-mono font-semibold text-[#111111] shadow-md pointer-events-none flex items-center gap-2">
              <span className="text-[#737373]">BEFORE</span>
              <span className="text-[#7C5CFF]">{Math.round(sliderPosition)}%</span>
              <span className="text-black/30">·</span>
              <span className="text-[#65D8FF]">{100 - Math.round(sliderPosition)}%</span>
              <span className="text-[#737373]">AFTER</span>
            </div>
          </div>

          <div className="text-[11px] text-[#737373] font-mono mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>DEMO CASE · Clinical simulation for educational demonstration</span>
          </div>
        </div>

        {/* Right: Case Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#7C5CFF] font-semibold">
                {activeCase.category}
              </span>
              <span className="text-black/20">·</span>
              <span className="text-xs text-[#737373]">{activeCase.timeline}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#111111] leading-tight">
              {activeCase.title}
            </h3>

            <div className="flex items-center gap-4 mt-3 py-2 border-y border-black/5 text-xs text-[#737373]">
              <div>
                <span className="font-semibold text-[#111111]">Age:</span> {activeCase.patientAge}
              </div>
              <div>
                <span className="font-semibold text-[#111111]">Region:</span> {activeCase.teethInvolved}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#737373] leading-relaxed">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#111111] font-semibold block mb-1">
                Diagnostic Challenge
              </span>
              <p>{activeCase.challenge}</p>
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#7C5CFF] font-semibold block mb-1">
                Digital Solution
              </span>
              <p>{activeCase.solution}</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-black/5">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-700 font-semibold block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Clinical Result
              </span>
              <p className="text-xs text-[#111111] font-medium">{activeCase.result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyComparison;

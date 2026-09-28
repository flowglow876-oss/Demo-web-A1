import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { PATIENT_STORIES } from "@/src/data/dental-data";
import { usePerformanceMode } from "@/src/hooks/usePerformance";

interface StaggerTestimonialsProps {
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Implants": "#7C5CFF",
  "Smile Design": "#B69CFF",
  "Aligners": "#65D8FF",
  "Veneers": "#FF8E87",
  "General": "#8DE8C1",
};

export function StaggerTestimonials({ className = "" }: StaggerTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = PATIENT_STORIES;
  const currentStory = stories[currentIndex] || stories[0];
  const activeColor = CATEGORY_COLORS[currentStory.category] || "#7C5CFF";
  const perf = usePerformanceMode();

  const touchStartX = useRef<number | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const setIndex = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextTestimonial();
      } else {
        prevTestimonial();
      }
    }
    touchStartX.current = null;
  };

  const maxVisibleCards = perf.maxTestimonialCards;

  return (
    <div className={`w-full py-8 relative ${className}`}>
      {/* Background Soft Ambient Light that Adapts to Active Category */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-colors duration-700"
        style={{ backgroundColor: activeColor }}
      />

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor }} />
              <span className="text-xs uppercase font-mono tracking-widest text-[#737373] font-semibold">
                SMILE STORIES · PATIENT PERSPECTIVES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
              Smile Stories.
            </h2>
            <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl font-normal font-body">
              Verified clinical journeys, computer-guided implant restorations, and clear aligner milestones.
            </p>
          </div>

          {/* Previous / Next Controls with Hover Glow */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              aria-label="Previous story"
              className="group w-11 h-11 rounded-full border border-black/10 bg-white/90 hover:bg-white text-[#111111] hover:border-[#7C5CFF]/40 shadow-xs hover:shadow-[0_0_15px_rgba(124,92,255,0.25)] transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <div className="text-xs font-mono text-[#737373] tabular-nums px-2">
              <span className="text-[#111111] font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
              {" / "}
              <span>{String(stories.length).padStart(2, "0")}</span>
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next story"
              className="group w-11 h-11 rounded-full border border-black/10 bg-white/90 hover:bg-white text-[#111111] hover:border-[#7C5CFF]/40 shadow-xs hover:shadow-[0_0_15px_rgba(124,92,255,0.25)] transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Stack Container with Animated Smile-Line Arc Behind */}
        <div
          className="relative min-h-[420px] sm:min-h-[400px] md:min-h-[380px] flex items-center justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Smile-Line Animation Behind Cards */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <svg viewBox="0 0 500 120" className="w-full max-w-lg">
              <path
                d="M 60 40 Q 250 110, 440 40"
                fill="none"
                stroke={activeColor}
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <AnimatePresence mode="popLayout">
            {stories.map((story, index) => {
              const offset = (index - currentIndex + stories.length) % stories.length;
              const isVisible = offset >= 0 && offset < maxVisibleCards;

              if (!isVisible) return null;

              const zIndex = stories.length - offset;
              const scale = 1 - offset * (perf.isMobile ? 0.03 : 0.04);
              const translateY = offset * (perf.mode === "LITE" ? 8 : perf.isMobile ? 12 : 16);
              const rotate =
                perf.mode === "LITE"
                  ? 0
                  : offset === 0
                  ? 0
                  : offset === 1
                  ? perf.isMobile
                    ? 0.8
                    : 1.5
                  : perf.isMobile
                  ? -0.8
                  : -1.5;
              const opacity = 1 - offset * 0.25;

              return (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{
                    opacity,
                    y: translateY,
                    scale,
                    rotate,
                    zIndex,
                  }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => offset !== 0 && setIndex(index)}
                  className={`absolute w-full cursor-pointer select-none rounded-3xl p-6 sm:p-8 md:p-10 border transition-all duration-300 ${
                    offset === 0
                      ? "bg-white/95 md:backdrop-blur-md border-black/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] cursor-default"
                      : "bg-[#FAFAF8]/90 border-black/5 hover:border-black/15 shadow-xs"
                  }`}
                  style={{
                    transformOrigin: "top center",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
                    {/* Top Row: Category, Rating & Demo Story Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-black/5 pb-3 sm:pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#7C5CFF]">
                          {story.category}
                        </span>
                        <span className="text-black/20">·</span>
                        <span className="text-[11px] sm:text-xs text-[#737373]">{story.treatment}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                          <ShieldCheck className="w-3 h-3" />
                          VERIFIED PATIENT
                        </span>
                      </div>
                    </div>

                    {/* Story Highlight Quote */}
                    <div>
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#B69CFF]/70 shrink-0 mt-0.5" />
                        <h4 className="text-base sm:text-xl md:text-2xl font-serif-accent italic font-normal text-[#111111] leading-snug">
                          "{story.highlight}"
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-[#737373] mt-2.5 sm:mt-3 leading-relaxed font-body pl-7 sm:pl-9">
                        {story.story}
                      </p>
                    </div>

                    {/* Author & Treatment Metric Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-black/5">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {story.avatar ? (
                          <img
                            src={story.avatar}
                            alt={story.name}
                            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border border-black/10 shadow-xs"
                          />
                        ) : (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#B69CFF]/20 to-[#65D8FF]/20 border border-black/10 flex items-center justify-center font-display font-semibold text-xs text-[#111111]">
                            {story.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[#111111]">{story.name}</div>
                          <div className="text-[10px] sm:text-[11px] text-[#737373]">{story.city}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] sm:text-[11px] font-mono text-[#737373]">{story.duration}</div>
                        <div className="text-[9px] sm:text-[10px] text-[#9E9E9E]">{story.date}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Stack Dots Indicator with 44px tap target wrappers */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="py-3 px-1.5 flex items-center justify-center cursor-pointer"
              aria-label={`Go to story ${i + 1}`}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 block ${
                  i === currentIndex
                    ? "w-8 bg-[#111111]"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaggerTestimonials;

import React, { useState } from "react";
import { motion } from "motion/react";
import { CLINIC_TIMELINE } from "@/src/data/dental-data";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";

export function Timeline() {
  const [activeYear, setActiveYear] = useState(CLINIC_TIMELINE[CLINIC_TIMELINE.length - 1].year);

  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-black/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
              Continuous Innovation
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
            Clinic progression.
          </h2>
          <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl">
            From our founding to 2026: An unbroken dedication to digital accuracy and patient comfort.
          </p>
        </div>

        <div className="text-xs font-mono text-[#737373]">
          ESTABLISHED 2017 · ALIGARH, UP
        </div>
      </div>

      {/* Interactive Horizontal Timeline */}
      <div className="relative">
        {/* Connecting track line */}
        <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-black/10 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative z-10">
          {CLINIC_TIMELINE.map((item, idx) => {
            const isSelected = activeYear === item.year;
            return (
              <div
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-[#7C5CFF] shadow-[0_15px_35px_-10px_rgba(124,92,255,0.2)] md:-translate-y-2"
                    : "bg-white/60 border-black/5 hover:border-black/15 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xl font-display font-bold ${
                        isSelected ? "text-[#7C5CFF]" : "text-[#111111]"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`w-3 h-3 rounded-full border-2 transition-all ${
                        isSelected
                          ? "bg-[#7C5CFF] border-white ring-4 ring-[#7C5CFF]/20"
                          : "bg-white border-black/20"
                      }`}
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-[#111111] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#737373] leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1 text-[11px] font-mono text-[#737373]">
                  <span>Milestone 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

import React from "react";
import { motion } from "motion/react";
import { CLINIC_SPACES } from "@/src/data/dental-data";
import { Sparkles, Compass, Shield, Maximize2 } from "lucide-react";

export function ClinicGallery() {
  return (
    <section id="clinic-section" className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#65D8FF]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
              Atmosphere & Architectural Design
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
            The studio experience.
          </h2>
          <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl">
            Thoughtfully engineered spaces bathed in natural light, acoustic isolation, and quiet Japanese-Scandinavian minimalism.
          </p>
        </div>

        <div className="text-xs font-mono text-[#737373] border-l-2 border-black/10 pl-4 py-1">
          <div>LOCATED ON MEDICAL ROAD</div>
          <div className="text-[#111111] font-semibold">CIVIL LINES · ALIGARH, UP</div>
        </div>
      </div>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Large Primary Card (7 cols) - The Studio Lounge */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-7 rounded-3xl overflow-hidden border border-black/10 shadow-lg p-6 sm:p-8 flex flex-col justify-between group min-h-[300px] sm:min-h-[380px] relative text-white"
        >
          {/* Architectural Clinic Photography */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={CLINIC_SPACES[0].image}
              alt={CLINIC_SPACES[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/25">
              {CLINIC_SPACES[0].label}
            </span>
            <span className="text-xs text-white/80 font-mono">{CLINIC_SPACES[0].accent}</span>
          </div>

          <div className="relative z-10 mt-12 sm:mt-24">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
              {CLINIC_SPACES[0].name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-lg leading-relaxed">
              {CLINIC_SPACES[0].description}
            </p>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#65D8FF] font-medium mt-3 sm:mt-4">
              EQUIPMENT: {CLINIC_SPACES[0].tech}
            </div>
          </div>
        </motion.div>

        {/* Card 2 (5 cols) - Digital Diagnostics Suite */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-5 rounded-3xl overflow-hidden border border-black/10 shadow-lg p-6 sm:p-8 flex flex-col justify-between group min-h-[300px] sm:min-h-[380px] relative text-white"
        >
          {/* Suite Photography */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={CLINIC_SPACES[1].image}
              alt={CLINIC_SPACES[1].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-semibold text-[#65D8FF] border border-white/25">
              {CLINIC_SPACES[1].label}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#65D8FF] animate-pulse" />
          </div>

          <div className="relative z-10 mt-12 sm:mt-20">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
              {CLINIC_SPACES[1].name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
              {CLINIC_SPACES[1].description}
            </p>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#65D8FF] font-medium mt-3 sm:mt-4">
              PRECISION: {CLINIC_SPACES[1].tech}
            </div>
          </div>
        </motion.div>

        {/* Card 3 (5 cols) - Clinical Treatment Theater */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-5 rounded-3xl overflow-hidden border border-black/10 shadow-lg p-6 sm:p-8 flex flex-col justify-between group min-h-[280px] sm:min-h-[340px] relative text-white"
        >
          {/* Operatory Photography */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={CLINIC_SPACES[2].image}
              alt={CLINIC_SPACES[2].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/25">
              {CLINIC_SPACES[2].label}
            </span>
            <span className="text-xs text-white/80 font-mono">{CLINIC_SPACES[2].accent}</span>
          </div>

          <div className="relative z-10 mt-10 sm:mt-16">
            <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-white">
              {CLINIC_SPACES[2].name}
            </h3>
            <p className="text-xs md:text-sm text-white/80 mt-2 leading-relaxed">
              {CLINIC_SPACES[2].description}
            </p>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#8DE8C1] font-medium mt-3">
              STANDARDS: {CLINIC_SPACES[2].tech}
            </div>
          </div>
        </motion.div>

        {/* Card 4 (7 cols) - In-House 3D Precision Lab */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-7 rounded-3xl overflow-hidden border border-black/10 shadow-lg p-6 sm:p-8 flex flex-col justify-between group min-h-[280px] sm:min-h-[340px] relative text-white"
        >
          {/* Lab Milling Photography */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={CLINIC_SPACES[3].image}
              alt={CLINIC_SPACES[3].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-semibold text-[#B69CFF] border border-white/25">
              {CLINIC_SPACES[3].label}
            </span>
            <span className="text-xs text-white/80 font-mono">{CLINIC_SPACES[3].accent}</span>
          </div>

          <div className="relative z-10 mt-16">
            <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
              {CLINIC_SPACES[3].name}
            </h3>
            <p className="text-xs md:text-sm text-white/80 mt-2 max-w-xl leading-relaxed">
              {CLINIC_SPACES[3].description}
            </p>
            <div className="text-[11px] font-mono text-[#B69CFF] font-medium mt-3">
              MANUFACTURING: {CLINIC_SPACES[3].tech}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ClinicGallery;

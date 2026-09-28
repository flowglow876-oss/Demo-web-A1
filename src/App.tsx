import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  TREATMENTS,
  DOCTORS,
  CLINIC_STATS,
  KNOWLEDGE_ARTICLES,
  Treatment,
  Doctor,
  Article,
  CLINIC_INFO,
} from "./data/dental-data";

// Performance system
import { usePerformanceMode } from "./hooks/usePerformance";

// 3D Scenes
import { HeroToothScene, AnatomicalPart } from "./components/3d/HeroToothScene";
import { LabProductScene } from "./components/3d/LabProductScene";

// Hero Cinematic Environment & Wildlife
import { HeroEnvironment } from "./components/hero/HeroEnvironment";
import { HeroButterflies } from "./components/hero/HeroButterflies";

// Layout & UI Components
import { BackgroundSystem } from "./components/layout/BackgroundSystem";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Preloader } from "./components/ui/Preloader";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { CaseStudyComparison } from "./components/ui/CaseStudyComparison";
import { TreatmentModal } from "./components/ui/TreatmentModal";
import { DoctorModal } from "./components/ui/DoctorModal";
import { ArticleModal } from "./components/ui/ArticleModal";
import { TechnologyVisualizer } from "./components/ui/TechnologyVisualizer";
import { AppointmentBooking } from "./components/ui/AppointmentBooking";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import { FloatingClinicWindows } from "./components/ui/FloatingWindows";

// Sections
import { WhyDifferent } from "./components/sections/WhyDifferent";
import { ClinicGallery } from "./components/sections/ClinicGallery";
import { Timeline } from "./components/sections/Timeline";
import { MapSection } from "./components/sections/MapSection";

import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

// Anatomy Information for Scientific Exploded View
const ANATOMY_INFO: Record<NonNullable<AnatomicalPart>, {
  title: string;
  tagline: string;
  metric: string;
  description: string;
  clinicalImpact: string;
  accentColor: string;
}> = {
  enamel: {
    title: "01 · PEARLESCENT ENAMEL",
    tagline: "Biomimetic Outer Hydroxyapatite Shield",
    metric: "1.58 IOR · 0.01mm Fit",
    description: "The hardest biological tissue in the human body, composed of 99.4% crystalline hydroxyapatite rods arranged in prismatic alignment.",
    clinicalImpact: "Custom multi-layer ceramic layering recreates natural opalescence, light transmission, and abrasion resistance.",
    accentColor: "#C084FC",
  },
  dentin: {
    title: "02 · DENTIN BUFFER CORE",
    tagline: "Elastic Shock-Absorbing Foundation",
    metric: "70% Mineral · 20% Collagen",
    description: "A resilient, flexible foundation of microscopic tubules that cushions biting forces and shields the internal dental nerve chamber.",
    clinicalImpact: "Biomimetic resin-bonding preserves vital tooth structure without aggressive crown reduction.",
    accentColor: "#F59E0B",
  },
  pulp: {
    title: "03 · VASCULAR PULP CHAMBER",
    tagline: "Biological Vitality & Sensory Matrix",
    metric: "Microvascular Capillary Plexus",
    description: "The living heart of the tooth, containing specialized odontoblast cells, sensory nerves, and microvascular capillaries.",
    clinicalImpact: "Microscope-guided endodontics and vital pulp capping ensure long-term biological tooth preservation.",
    accentColor: "#F43F5E",
  },
  roots: {
    title: "04 · BIOMIMETIC ROOTS & IMPLANT",
    tagline: "Periodontal Anchorage & Bone Fusion",
    metric: "Bifurcated Apex · Ti-Grade IV",
    description: "Dual curved anatomical roots secured into alveolar bone via periodontal ligament fibers, or replaced with precision keyhole titanium fixtures.",
    clinicalImpact: "Sub-millimeter 3D CBCT guides ensure flapless, zero-incision implant placement with rapid bone healing.",
    accentColor: "#0284C7",
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookingTargetTreatment, setBookingTargetTreatment] = useState<string>("");
  
  // 3D Dental Lab state
  const [activeMaterial, setActiveMaterial] = useState<string>("titanium");
  const [labExploded, setLabExploded] = useState<boolean>(false);
  
  // Hero 3D Tooth Scientific Exploded View State
  const [heroToothExploded, setHeroToothExploded] = useState(false);
  const [heroSelectedPart, setHeroSelectedPart] = useState<AnatomicalPart>(null);

  // Interactive hover tracking
  const [hoveredTreatmentId, setHoveredTreatmentId] = useState<string | null>(null);
  const [hoveredDoctorId, setHoveredDoctorId] = useState<string | null>(null);

  // Hero Cinematic Meadow & Parallax State
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [isSunInteracting, setIsSunInteracting] = useState(false);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Guard against touch devices to prevent mobile jitter and unnecessary React state updates
    if (typeof window !== "undefined" && (window.innerWidth < 768 || ("ontouchstart" in window && navigator.maxTouchPoints > 0))) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setHeroParallax({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroParallax({ x: 0, y: 0 });
  };

  const perf = usePerformanceMode();
  const { scrollYProgress } = useScroll();

  // Scroll choreographed transformations
  const smileArcProgress = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const heroSeparatorWidth = useTransform(scrollYProgress, [0, 0.15], ["0%", "100%"]);

  const scrollToAppointment = (treatmentName?: string) => {
    if (treatmentName) {
      setBookingTargetTreatment(treatmentName);
    }
    const element = document.getElementById("appointment-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#111111] overflow-x-hidden">
      {/* 1. Fast Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Desktop Custom Cursor */}
      <CustomCursor />

      {/* 3. Floating Pill Navigation */}
      <Navbar onBookClick={() => scrollToAppointment()} />

      {/* 4. Optimized Multi-Layer Background Architecture */}
      <BackgroundSystem />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* ========================================================= */}
        {/* HERO SECTION: COMPLETE CINEMATIC MEADOW & SKY REPLACEMENT */}
        {/* ========================================================= */}
        <section
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative min-h-[96vh] sm:min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden flex flex-col justify-center"
        >
          {/* 1. Living Natural Environment (Sky, Drifting Fluffy Clouds, Sun Bloom, Rolling Meadow, Swaying Grass & Wildflowers) */}
          <HeroEnvironment
            parallaxX={heroParallax.x}
            parallaxY={heroParallax.y}
            isSunInteracting={isSunInteracting}
            onSunInteract={() => setIsSunInteracting(true)}
          />

          {/* 2. Interactive Butterflies (Reference match: Golden Monarch mid-left, Cream Swallowtail upper-right) */}
          <HeroButterflies isSunReacting={isSunInteracting} />

          {/* 3. Floating Editorial Atmosphere Cards (Exact composition match to reference image!) */}
          {/* Center-Sky Paragraph */}
          <div className="hidden xl:block absolute left-[44%] top-28 2xl:top-32 z-15 w-60 p-3.5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/70 text-[11px] text-[#334155] leading-relaxed shadow-sm pointer-events-none select-none">
            <p>
              <strong className="text-[#0F172A] font-semibold">AVA Studio</strong> blends digital dentistry with gentle care — clean lines, calm spaces, and precise results, from first scan to final smile.
            </p>
          </div>

          {/* Far-Right Sky Paragraph */}
          <div className="hidden 2xl:block absolute right-8 top-44 z-15 w-64 p-3.5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/70 text-[11px] text-[#334155] leading-relaxed shadow-sm pointer-events-none select-none text-right">
            <p>
              Premium dentistry with 3D digital scans, gentle keyhole placement, clear plans, and naturally luminous ceramic restorations.
            </p>
          </div>

          {/* 4. Main Hero Editorial Content Grid */}
          <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Hero Column: Typography & Reference Tagline (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              {/* Eyebrow Pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/70 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse" />
                <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-[#0F172A] font-semibold">
                  COSMETIC DENTISTRY / IMPLANTOLOGY / ALIGARH
                </span>
              </motion.div>

              {/* Huge Editorial Headline matching reference image */}
              <div className="space-y-0 sm:space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-[#0F172A] leading-[0.96] drop-shadow-xs"
                >
                  PRECISION
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-[#0F172A] leading-[0.96] drop-shadow-xs"
                >
                  FOR A
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-[#0F172A] leading-[0.96] drop-shadow-xs"
                >
                  BETTER <span className="font-serif-accent italic font-normal bg-gradient-to-r from-[#6366F1] via-[#0284C7] to-[#8B5CF6] bg-clip-text text-transparent">smile.</span>
                </motion.h1>
              </div>

              {/* Tagline Row matching reference image: "BRIGHTER TEETH TODAY -> [CONTACT US]" */}
              <div className="pt-2">
                <div className="w-full h-px bg-white/70 mb-4" />
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-lg font-display font-semibold uppercase tracking-wider text-[#0F172A]">
                      BRIGHTER TEETH TODAY
                    </span>
                    <span className="text-[#0F172A]/70 text-lg hidden sm:inline">→</span>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    onClick={() => scrollToAppointment()}
                    data-action="book"
                    className="group relative px-6 sm:px-8 py-3 rounded-full bg-white/80 hover:bg-white text-[#0F172A] backdrop-blur-md border border-white/90 font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:scale-[1.03] active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>CONTACT US</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  {/* Interactive 3D Exploded View Toggle Button */}
                  <button
                    onClick={() => {
                      setHeroToothExploded((prev) => !prev);
                      if (!heroToothExploded) {
                        setHeroSelectedPart("enamel");
                      } else {
                        setHeroSelectedPart(null);
                      }
                    }}
                    className={`px-5 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider border ${
                      heroToothExploded
                        ? "bg-[#7C5CFF] text-white border-[#A78BFA] shadow-[0_0_25px_rgba(124,92,255,0.4)]"
                        : "bg-white/70 hover:bg-white/90 text-[#0F172A] border-white/80 backdrop-blur-md shadow-xs"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#65D8FF] animate-pulse" />
                    <span>{heroToothExploded ? "ASSEMBLE TOOTH" : "EXPLORE ANATOMY (3D)"}</span>
                  </button>
                </div>
              </div>

              {/* Reference Footnote Text (Bottom-Left) */}
              <p className="text-xs sm:text-sm text-[#334155] max-w-lg leading-relaxed pt-1">
                Calm, premium dentistry focused on comfort, precision, and natural results: digital scans, calm care, & clear plans for veneers, implants, and smile design.
              </p>

              {/* Exploded View Anatomy Navigation Drawer (Active in Exploded Mode) */}
              {heroToothExploded && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-[#0F172A] uppercase">
                      SCIENTIFIC ANATOMY · 4 TIERS
                    </span>
                    <span className="text-[10px] font-mono text-[#7C5CFF] font-semibold">
                      CLICK PART TO ZOOM
                    </span>
                  </div>

                  {/* 4 Anatomical Tier Selector Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["enamel", "dentin", "pulp", "roots"] as const).map((part) => {
                      const isSelected = heroSelectedPart === part;
                      return (
                        <button
                          key={part}
                          onClick={() => setHeroSelectedPart(part)}
                          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-semibold transition-all duration-200 capitalize text-center ${
                            isSelected
                              ? "bg-[#0F172A] text-white shadow-sm"
                              : "bg-white/80 hover:bg-white text-[#334155] border border-black/5"
                          }`}
                        >
                          {part}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Part Minimal Dossier */}
                  {heroSelectedPart && ANATOMY_INFO[heroSelectedPart] && (
                    <motion.div
                      key={heroSelectedPart}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-2 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-[#0F172A]">
                          {ANATOMY_INFO[heroSelectedPart].title}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-[#0F172A]">
                          {ANATOMY_INFO[heroSelectedPart].metric}
                        </span>
                      </div>
                      <p className="text-[#475569] leading-snug">
                        {ANATOMY_INFO[heroSelectedPart].description}
                      </p>
                      <p className="text-[#0284C7] font-medium text-[11px]">
                        ★ {ANATOMY_INFO[heroSelectedPart].clinicalImpact}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Hero Column: Pearlescent 3D Human Tooth Grounded in Meadow (5 cols, roughly 40-45% width) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Adaptive 3D Pearlescent Tooth Scene with Exploded Transformation */}
              <HeroToothScene
                exploded={heroToothExploded}
                onToggleExplode={() => {
                  setHeroToothExploded((prev) => !prev);
                  if (!heroToothExploded) {
                    setHeroSelectedPart("enamel");
                  } else {
                    setHeroSelectedPart(null);
                  }
                }}
                selectedPart={heroSelectedPart}
                onSelectPart={(part) => setHeroSelectedPart(part)}
              />
            </div>
          </div>
        </section>

        {/* Cinematic Scroll Horizon Line Transition */}
        <div className="w-full flex justify-center overflow-hidden py-1">
          <motion.div
            style={{ width: heroSeparatorWidth }}
            className="h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent"
          />
        </div>

        {/* ========================================================= */}
        {/* SECTION 01: INTERACTIVE TYPOGRAPHY MARQUEE */}
        {/* ========================================================= */}
        <section className="w-full py-5 sm:py-6 border-y border-black/10 bg-white/70 backdrop-blur-sm overflow-hidden select-none group">
          <div className="flex whitespace-nowrap animate-marquee font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#111111]/85 tracking-wide uppercase">
            <span className="mx-6 sm:mx-8 hover:text-[#7C5CFF] transition-colors cursor-default">PRECISION</span>
            <span className="mx-3 sm:mx-4 text-[#B69CFF]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#65D8FF] transition-colors cursor-default">DIGITAL DENTISTRY</span>
            <span className="mx-3 sm:mx-4 text-[#65D8FF]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#7C5CFF] transition-colors cursor-default">IMPLANTOLOGY</span>
            <span className="mx-3 sm:mx-4 text-[#8DE8C1]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#FF8E87] transition-colors cursor-default">SMILE DESIGN</span>
            <span className="mx-3 sm:mx-4 text-[#FF8E87]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#7C5CFF] transition-colors cursor-default">PRECISION</span>
            <span className="mx-3 sm:mx-4 text-[#B69CFF]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#65D8FF] transition-colors cursor-default">DIGITAL DENTISTRY</span>
            <span className="mx-3 sm:mx-4 text-[#65D8FF]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#7C5CFF] transition-colors cursor-default">IMPLANTOLOGY</span>
            <span className="mx-3 sm:mx-4 text-[#8DE8C1]">/</span>
            <span className="mx-6 sm:mx-8 hover:text-[#FF8E87] transition-colors cursor-default">SMILE DESIGN</span>
            <span className="mx-3 sm:mx-4 text-[#FF8E87]">/</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 02: CINEMATIC INTRO & REACTIVE SMILE ARC */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
            <div className="lg:col-span-7 relative">
              {/* Reactive Line Drawing of Smile Arc Behind Text */}
              <div className="absolute -bottom-8 left-0 right-0 h-24 pointer-events-none opacity-40">
                <svg viewBox="0 0 500 100" className="w-full h-full">
                  <path
                    d="M 50 30 Q 250 90, 450 30"
                    fill="none"
                    stroke="#7C5CFF"
                    strokeWidth="2.5"
                    strokeDasharray="400"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-[#111111] leading-tight tracking-tight relative z-10">
                "Modern dentistry should feel{" "}
                <span className="font-serif-accent italic font-normal text-[#7C5CFF] drop-shadow-xs">
                  personal, precise
                </span>{" "}
                and beautifully simple."
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-4 text-[#737373] text-sm sm:text-base leading-relaxed">
              <p>
                We founded AVA Studio with a singular focus: to elevate dentistry from a routine clinical chore into a thoughtful, aesthetically rigorous craft.
              </p>
              <p>
                Every treatment begins with high-resolution digital scanning, biological tissue preservation, and comprehensive patient collaboration. You see the outcome before treatment begins.
              </p>
            </div>
          </div>

          {/* 4 Numerical Stat Windows */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CLINIC_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-5 sm:p-6 md:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-black/10 shadow-xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#7C5CFF]/30 hover:shadow-md"
              >
                <div className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-[#111111] tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-black/5">
                  <div className="text-[11px] sm:text-xs font-mono font-semibold text-[#7C5CFF] tracking-wider uppercase">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#737373] mt-0.5 sm:mt-1">{stat.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Layered Floating Diagnostic Windows (Windows 03, 04, 05) */}
          <FloatingClinicWindows />
        </section>

        {/* ========================================================= */}
        {/* SECTION 03: HORIZONTAL SPATIAL TREATMENTS GALLERY */}
        {/* ========================================================= */}
        <section id="treatments-section" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#B69CFF]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
                  Clinical Disciplines
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
                Your smile. Precisely planned.
              </h2>
              <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl">
                Explore our core treatment disciplines. Click any treatment card to inspect its full 5-stage clinical protocol, technology used, and FAQs.
              </p>
            </div>

            <div className="text-xs font-mono text-[#737373] hidden md:block">
              CLICK CARD TO INSPECT 3D PROTOCOL
            </div>
          </div>

          {/* Spatial Depth Card Gallery */}
          <div className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {TREATMENTS.map((treatment) => {
              const isHovered = hoveredTreatmentId === treatment.id;
              const hasHoveredOther = hoveredTreatmentId !== null && !isHovered;

              return (
                <div
                  key={treatment.id}
                  onClick={() => setSelectedTreatment(treatment)}
                  onMouseEnter={() => setHoveredTreatmentId(treatment.id)}
                  onMouseLeave={() => setHoveredTreatmentId(null)}
                  className={`snap-center shrink-0 w-[84vw] sm:w-[350px] md:w-auto group relative rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-black/10 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer select-none overflow-hidden ${
                    isHovered
                      ? "scale-[1.02] -translate-y-1.5 shadow-[0_20px_40px_-10px_rgba(124,92,255,0.15)] border-[#7C5CFF]/40"
                      : hasHoveredOther
                      ? "opacity-75 scale-[0.99]"
                      : ""
                  }`}
                  data-cursor="view"
                >
                  {/* Dynamic Corner Hover Glow */}
                  <div
                    className="absolute top-0 right-0 w-44 h-44 rounded-tr-3xl transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${treatment.accentColor} 0%, transparent 70%)`,
                      opacity: isHovered ? 0.35 : 0.08,
                    }}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Visual Treatment Preview Image */}
                    {treatment.image && (
                      <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-black/5 bg-slate-100 mb-2">
                        <img
                          src={treatment.image}
                          alt={treatment.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold text-[#0F172A] border border-white/80 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: treatment.accentColor }} />
                          <span>{treatment.number} · {treatment.duration}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#737373] group-hover:text-[#111111] transition-colors">
                        DISCIPLINE {treatment.number}
                      </span>
                      <span className="text-[10px] font-mono text-[#737373] bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-black/5">
                        {treatment.anesthesia}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#111111] group-hover:text-[#7C5CFF] transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-xs font-mono text-[#737373] mt-1">{treatment.tagline}</p>
                      <p className="text-xs md:text-sm text-[#737373] mt-3 line-clamp-3 leading-relaxed font-body">
                        {treatment.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#111111] group-hover:underline">
                      View 5-Step Protocol
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] font-mono text-[#737373] mt-4">
            <span>SWIPE TO VIEW ALL TREATMENTS →</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 04: TECHNOLOGY ("DENTAL INTELLIGENCE LAB") */}
        {/* ========================================================= */}
        <section id="technology-section" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <TechnologyVisualizer />
        </section>

        {/* ========================================================= */}
        {/* SECTION 05: WHY IT FEELS DIFFERENT */}
        {/* ========================================================= */}
        <WhyDifferent />

        {/* ========================================================= */}
        {/* SECTION 06 & 07: 3D DENTAL LAB SHOWCASE & MATERIAL SWITCHER */}
        {/* ========================================================= */}
        <section id="lab-section" className="py-20 sm:py-24 px-4 md:px-8 bg-[#0D0D11] text-[#F7F6F2] relative overflow-hidden select-none border-y border-white/10">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#8DE8C1]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-white/50">
                    In-House Fabrication & Materials
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight">
                  Inside the Lab.
                </h2>
                <p className="text-sm md:text-base text-white/70 mt-2 max-w-xl font-body">
                  Inspect the physical components used in your mouth. High-purity grade-IV titanium, yttria-stabilized zirconia, and micro-thin lithium disilicate.
                </p>
              </div>

              {/* Material Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "titanium", label: "TITANIUM" },
                  { id: "ceramic", label: "CERAMIC" },
                  { id: "aligner", label: "ALIGNER" },
                  { id: "veneer", label: "VENEER" },
                ].map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setActiveMaterial(mat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                      activeMaterial === mat.id
                        ? "bg-white text-[#111111] font-bold shadow-md scale-105"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    {mat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product 3D Viewer & Specification Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative">
              {/* Left: 3D Canvas Viewer (7 cols) */}
              <div className="lg:col-span-7 relative">
                <LabProductScene productId={activeMaterial} exploded={labExploded} />

                {/* Explode / Assemble Controller Button (For Implant/Restoration) */}
                {activeMaterial === "titanium" && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                    <button
                      onClick={() => setLabExploded(!labExploded)}
                      className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold text-white transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#65D8FF]" />
                      <span>{labExploded ? "ASSEMBLE COMPONENT" : "EXPLODE ASSEMBLY"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Component Cards & Material Intelligence (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#65D8FF]">
                    <span className="uppercase tracking-widest">{activeMaterial} SPECIFICATION</span>
                    <span className="text-white/20">·</span>
                    <span className="text-white/60">PBR Studio Render</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
                    {activeMaterial === "titanium" && "Bio-Compatible Titanium Fixture"}
                    {activeMaterial === "ceramic" && "Monolithic Zirconia Crown"}
                    {activeMaterial === "aligner" && "Optically Clear Orthodontic Tray"}
                    {activeMaterial === "veneer" && "Ultra-Thin E.max Ceramic Veneer"}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed font-body">
                    {activeMaterial === "titanium" &&
                      "Cold-worked Grade-IV pure titanium with laser micro-textured threads. Engineered for rapid osteoblast attachment and permanent integration with mandibular bone."}
                    {activeMaterial === "ceramic" &&
                      "Yttria-stabilized translucent tetragonal zirconia polycrystalline (Y-TZP). Boasts 1,150 MPa flexural strength matching natural dental enamel light refraction."}
                    {activeMaterial === "aligner" &&
                      "Medical-grade polyurethane thermoplastic with calibrated elasticity. Applies continuous, gentle biomechanical forces to guide teeth into ideal aesthetic alignment."}
                    {activeMaterial === "veneer" &&
                      "Micro-thin lithium disilicate porcelain pressed to 0.3mm thickness. Preserves natural tooth structure while correcting micro-chips, shade discrepancies, and spacing."}
                  </p>

                  {/* Component Spec Badges */}
                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/50">Composition:</span>
                      <span className="text-white font-medium text-right">
                        {activeMaterial === "titanium" && "Ti-Grade IV (99.2% Pure)"}
                        {activeMaterial === "ceramic" && "Multilayer Monolithic Zirconia"}
                        {activeMaterial === "aligner" && "BPA-Free Polyurethane"}
                        {activeMaterial === "veneer" && "Lithium Disilicate (E.max)"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/50">Precision Standard:</span>
                      <span className="text-[#8DE8C1] font-mono font-bold">
                        {activeMaterial === "titanium" && "ISO 13485 Medical Grade"}
                        {activeMaterial === "ceramic" && "±8 Microns 5-Axis Milling"}
                        {activeMaterial === "aligner" && "0.2mm Progressive Staging"}
                        {activeMaterial === "veneer" && "0.3mm Contact Lens Thinness"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToAppointment(activeMaterial)}
                    data-cursor="book"
                    className="w-full mt-3 py-3 rounded-full bg-white text-[#111111] text-xs font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
                  >
                    <span>Consult on {activeMaterial.toUpperCase()} Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 08: SMILE STORIES (3D TESTIMONIAL STACK) */}
        {/* ========================================================= */}
        <section id="stories-section" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <StaggerTestimonials />
        </section>

        {/* ========================================================= */}
        {/* SECTION 09: CASE STUDIES (BEFORE & AFTER DRAGGABLE DIVIDER) */}
        {/* ========================================================= */}
        <section id="cases-section" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-black/5">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
                Clinical Documentation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
              Before & After cases.
            </h2>
            <p className="text-sm md:text-base text-[#737373] mt-2">
              Drag the interactive slider horizontally to compare initial patient presentation with the final computer-guided restoration.
            </p>
          </div>

          <CaseStudyComparison />
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: DOCTORS TEAM (LAYERED PROFILE SHOWCASE) */}
        {/* ========================================================= */}
        <section id="doctors-section" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8DE8C1]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
                  Clinical Leadership
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
                Meet the people behind your smile.
              </h2>
              <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl">
                A multidisciplinary team of prosthodontists, orthodontists, and microscope endodontists collaborating under one roof.
              </p>
            </div>

            <div className="text-xs font-mono text-[#737373] hidden sm:block">
              CLICK PROFILE TO VIEW BIO & AWARDS
            </div>
          </div>

          {/* Doctors Grid with Interactive Elevation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.map((doc) => {
              const isHovered = hoveredDoctorId === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  onMouseEnter={() => setHoveredDoctorId(doc.id)}
                  onMouseLeave={() => setHoveredDoctorId(null)}
                  className={`group rounded-3xl p-6 bg-white/85 backdrop-blur-md border border-black/10 shadow-xs transition-all duration-300 flex flex-col justify-between cursor-pointer select-none active:scale-[0.98] ${
                    isHovered
                      ? "-translate-y-2 shadow-[0_20px_40px_-10px_rgba(124,92,255,0.15)] border-[#7C5CFF]/30"
                      : ""
                  }`}
                  data-cursor="view"
                >
                  <div>
                    {/* Portrait Frame with Real Professional Photography & Clean Overlays */}
                    <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden border border-black/10 mb-5 bg-[#FAF9F5] shadow-xs group-hover:shadow-md transition-shadow">
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-20 h-20 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-2xl font-display font-bold text-[#111111]">
                            {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-semibold text-white border border-white/25">
                          {doc.qualification}
                        </span>
                        <div className="text-[11px] text-white/80 font-medium mt-1">{doc.experience}</div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-semibold text-[#111111] group-hover:text-[#7C5CFF] transition-colors">
                      {doc.name}
                    </h3>
                    <div className="text-xs text-[#737373] mt-1 font-medium">{doc.role}</div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#111111]">
                    <span className="font-semibold">View Doctor Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: CLINIC STUDIO ENVIRONMENT */}
        {/* ========================================================= */}
        <ClinicGallery />

        {/* ========================================================= */}
        {/* SECTION 12: CLINIC TIMELINE */}
        {/* ========================================================= */}
        <Timeline />

        {/* ========================================================= */}
        {/* SECTION 13: PATIENT KNOWLEDGE / EDITORIAL ARTICLES */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#B69CFF]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
                  Patient Knowledge Base
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
                Know before you decide.
              </h2>
              <p className="text-sm md:text-base text-[#737373] mt-2 max-w-xl">
                Demystifying implants, porcelain veneers, and digital smile mock-ups with transparent surgical explanations.
              </p>
            </div>

            <div className="text-xs font-mono text-[#737373] hidden sm:block">
              EVIDENCE-BASED CLINICAL GUIDES
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KNOWLEDGE_ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="rounded-3xl p-6 bg-white/85 backdrop-blur-md border border-black/10 hover:border-black/25 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between cursor-pointer select-none group active:scale-[0.98]"
                data-cursor="view"
              >
                <div>
                  {/* Article Thumbnail Preview */}
                  {article.image && (
                    <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 border border-black/5 bg-slate-100 relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono text-[#0F172A] font-semibold border border-white/70 shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-3">
                    <span className="text-[#7C5CFF] font-semibold">{article.readTime}</span>
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider">CLINICAL GUIDE</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-semibold text-[#111111] group-hover:text-[#7C5CFF] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#737373] mt-3 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#111111] font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 14: APPOINTMENT EXPERIENCE */}
        {/* ========================================================= */}
        <section className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto">
          <AppointmentBooking initialTreatment={bookingTargetTreatment} />
        </section>

        {/* ========================================================= */}
        {/* MAP & STUDIO LOCATION ("FIND THE STUDIO") */}
        {/* ========================================================= */}
        <MapSection />
      </main>

      {/* 5. Persistent WhatsApp CTA Widget */}
      <WhatsAppButton />

      {/* 6. Cinematic Agency Footer */}
      <Footer onBookClick={() => scrollToAppointment()} />

      {/* Interactive Modals */}
      {selectedTreatment && (
        <TreatmentModal
          treatment={selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
          onBookTreatment={(name) => {
            setSelectedTreatment(null);
            scrollToAppointment(name);
          }}
        />
      )}

      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookDoctor={(docName) => {
            setSelectedDoctor(null);
            scrollToAppointment(`Consultation with ${docName}`);
          }}
        />
      )}

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

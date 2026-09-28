import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, ArrowRight, Sparkles, HelpCircle, ChevronDown, Clock, Shield, Scan, Check } from "lucide-react";
import { Treatment } from "@/src/data/dental-data";

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookTreatment: (treatmentName: string) => void;
}

export function TreatmentModal({ treatment, onClose, onBookTreatment }: TreatmentModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!treatment) return null;

  const currentStep = treatment.steps[activeStepIndex] || treatment.steps[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0A0F]/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative w-full max-w-4xl bg-[#FAFAF8] border border-black/10 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Treatment Visual Banner */}
          {treatment.image && (
            <div className="relative w-full h-44 sm:h-56 overflow-hidden bg-slate-100">
              <img
                src={treatment.image}
                alt={treatment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>
          )}

          {/* Top Header Banner with Ambient Accent Glow */}
          <div
            className="relative px-6 md:px-10 py-7 border-b border-black/5"
            style={{
              background: `linear-gradient(135deg, ${treatment.glowColor} 0%, rgba(255,255,255,0.7) 60%)`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#7C5CFF] tracking-widest uppercase">
                    Protocol #{treatment.number}
                  </span>
                  <span className="text-black/20">·</span>
                  <span className="text-xs text-[#737373]">{treatment.duration}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-[#111111] tracking-tight">
                  {treatment.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#737373] mt-1.5 max-w-2xl font-body">
                  {treatment.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#111111] border border-black/10 shadow-xs transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                aria-label="Close treatment modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-8">
            {/* Overview & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 text-xs sm:text-sm text-[#737373] leading-relaxed">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold mb-2">
                  Clinical Overview
                </h4>
                <p>{treatment.description}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col justify-center space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                  <Clock className="w-4 h-4 text-[#7C5CFF]" />
                  <span>Duration: {treatment.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Anesthesia: {treatment.anesthesia}</span>
                </div>
              </div>
            </div>

            {/* Interactive 5-Step Animated Workflow Visualization */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-black/5 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                  Interactive 5-Phase Clinical Protocol
                </h4>
                <span className="text-[11px] font-mono text-[#7C5CFF] font-semibold">
                  SELECT PHASE TO INSPECT
                </span>
              </div>

              {/* Progress Steps Selector Pills */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {treatment.steps.map((s, idx) => {
                  const isSelected = activeStepIndex === idx;
                  return (
                    <button
                      key={s.number}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`py-2 px-1 sm:px-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? "bg-[#111111] text-white border-black shadow-sm"
                          : "bg-[#FAFAF8] text-[#737373] hover:text-[#111111] border-black/5 hover:border-black/15"
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold">{s.number}</span>
                      <span className="text-[10px] sm:text-xs font-display font-medium truncate max-w-full">
                        {s.title.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Feature Showcase with Morphing Graphic */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.number}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#FAFAF8] p-5 rounded-2xl border border-black/5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center"
                >
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#7C5CFF]">
                        PHASE {currentStep.number}
                      </span>
                      <span className="text-black/20">·</span>
                      <span className="text-[11px] font-mono text-[#737373]">
                        {currentStep.duration}
                      </span>
                    </div>
                    <h5 className="text-base sm:text-lg font-display font-semibold text-[#111111]">
                      {currentStep.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className="sm:col-span-4 flex items-center justify-center p-4 bg-white rounded-xl border border-black/5">
                    <div className="text-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C5CFF]/20 to-[#65D8FF]/20 mx-auto flex items-center justify-center">
                        <Scan className="w-5 h-5 text-[#7C5CFF]" />
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[#111111]">
                        Phase #{currentStep.number}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Verified Stage</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hardware & Software Integrated Chips */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold mb-3">
                Hardware & Software Integrated
              </h4>
              <div className="flex flex-wrap gap-2">
                {treatment.technologyUsed.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-[#111111] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold mb-4 flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-[#737373]" />
                  Frequently Asked Questions
                </h4>
                <div className="space-y-2.5">
                  {treatment.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="border border-black/5 rounded-2xl overflow-hidden bg-white shadow-2xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between text-xs md:text-sm font-semibold text-[#111111] hover:bg-black/[0.02] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#737373] transition-transform duration-200 ${
                            openFaqIndex === fIdx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === fIdx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-5 pb-4 text-xs md:text-sm text-[#737373] leading-relaxed border-t border-black/5 bg-[#FAFAF8]/50"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-5 md:px-10 border-t border-black/5 bg-[#FAFAF8] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#737373]">
              Consultation includes comprehensive 3D scan and tailored doctor evaluation.
            </div>
            <button
              onClick={() => {
                onClose();
                onBookTreatment(treatment.name);
              }}
              data-cursor="book"
              className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs md:text-sm font-semibold hover:bg-black shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Book Consultation for {treatment.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default TreatmentModal;

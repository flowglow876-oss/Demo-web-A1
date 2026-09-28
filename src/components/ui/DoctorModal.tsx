import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { Doctor } from "@/src/data/dental-data";

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookDoctor: (doctorName: string) => void;
}

export function DoctorModal({ doctor, onClose, onBookDoctor }: DoctorModalProps) {
  if (!doctor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-black/10 rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header with portrait avatar */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#FAF9F6] to-white border-b border-black/5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top border border-black/10 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B69CFF]/30 to-[#65D8FF]/30 border border-black/10 flex items-center justify-center font-display font-bold text-xl text-[#111111] shadow-inner">
                  {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
              )}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#7C5CFF] font-semibold">
                  {doctor.qualification}
                </span>
                <h3 className="text-2xl font-display font-semibold text-[#111111]">{doctor.name}</h3>
                <p className="text-xs text-[#737373]">{doctor.role} · {doctor.experience}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white text-[#111111] border border-black/10 hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-[#737373]">
            {/* Quote */}
            <div className="p-4 rounded-2xl bg-[#F7F6F2] border-l-2 border-[#7C5CFF] font-serif-accent italic text-base md:text-lg text-[#111111]">
              "{doctor.quote}"
            </div>

            {/* Biography */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2">
                Clinical Biography
              </h4>
              <p className="leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Treatment Specializations */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2">
                Specialized Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctor.focus.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-medium text-[#111111]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards & Credentials */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2">
                Fellowships & Accreditations
              </h4>
              <div className="space-y-1.5">
                {doctor.awards.map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#111111]">
                    <Award className="w-4 h-4 text-[#7C5CFF]" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Availability */}
            <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 font-medium">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Studio Clinic Days: {doctor.availability}</span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-5 sm:p-6 border-t border-black/5 bg-[#FAFAF8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#737373] text-center sm:text-left">Private appointments planned individually</span>
            <button
              onClick={() => {
                onClose();
                onBookDoctor(doctor.name);
              }}
              data-cursor="book"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default DoctorModal;

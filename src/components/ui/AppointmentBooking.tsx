import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, CheckCircle2, Send, MessageSquare, Sparkles, User, Phone, FileText } from "lucide-react";
import { TREATMENTS, CLINIC_INFO } from "@/src/data/dental-data";

interface AppointmentBookingProps {
  initialTreatment?: string;
}

export function AppointmentBooking({ initialTreatment = "" }: AppointmentBookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: initialTreatment || "Dental Implants",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM - 1:00 PM)",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [submittedBookingId, setSubmittedBookingId] = useState("");

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      const randomId = "AVA-" + Math.floor(100000 + Math.random() * 900000);
      setSubmittedBookingId(randomId);
    }, 700);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello AVA Dental Studio! I would like to request a consultation.\n\nName: ${formData.name || "Patient"}\nTreatment: ${formData.treatment}\nPreferred Date: ${formData.preferredDate || "Earliest Available"}\nNotes: ${formData.notes || "None"}`
    );
    window.open(`https://wa.me/919897012345?text=${text}`, "_blank");
  };

  return (
    <div id="appointment-section" className="w-full max-w-4xl mx-auto relative select-none">
      {/* Huge Soft Radial Light behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] bg-gradient-to-tr from-[#7C5CFF]/20 via-[#65D8FF]/15 to-[#B69CFF]/15 blur-3xl rounded-full pointer-events-none" />

      {/* Dark Cinematic Card Form Surface */}
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-[#0F0F14]/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-white">
        {/* Subtle Ambient Corner Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#7C5CFF]/15 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 text-center space-y-6"
            >
              <div className="relative mx-auto w-20 h-20">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                {/* Cute smile & sparkle accent badge */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-[#65D8FF] to-[#B69CFF] flex items-center justify-center text-white text-xs shadow-md animate-bounce">
                  ✨
                </div>
              </div>

              <div>
                <span className="text-xs font-mono tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full font-semibold border border-emerald-500/20">
                  Consultation Reserved · {submittedBookingId}
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mt-4">
                  We have received your clinical request.
                </h3>
                <p className="text-sm md:text-base text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                  Our clinical patient coordinator will call you at{" "}
                  <strong className="text-white">{formData.phone}</strong> within 2 business hours to finalize your diagnostic appointment.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Patient Name:</span>
                  <span className="font-semibold text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Treatment Focus:</span>
                  <span className="font-semibold text-[#B69CFF]">{formData.treatment}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Preferred Timing:</span>
                  <span className="font-semibold text-white">
                    {formData.preferredDate || "Earliest Slot"} ({formData.preferredTime})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Studio Location:</span>
                  <span className="font-semibold text-white">Medical Road, Aligarh</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs md:text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp</span>
                </button>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-3 rounded-full bg-white/10 border border-white/15 text-xs md:text-sm text-white hover:bg-white/15 transition-all cursor-pointer active:scale-95"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Form Heading */}
              <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#B69CFF]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-white/50">
                    Private Consultations & 3D Diagnostics
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight">
                  Let's plan your next smile.
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60 mt-2 font-body">
                  No rushing, no high-pressure sales. A quiet, in-depth evaluation with our senior clinical team.
                </p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B69CFF]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#7C5CFF] focus:shadow-[0_0_20px_rgba(124,92,255,0.25)] text-sm text-white placeholder:text-white/30 outline-none transition-all duration-150"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#65D8FF]" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98970 00000"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#65D8FF] focus:shadow-[0_0_20px_rgba(101,216,255,0.25)] text-sm text-white placeholder:text-white/30 outline-none transition-all duration-150"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Treatment Selection */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8DE8C1]" />
                      Treatment of Interest
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => handleFieldChange("treatment", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 focus:border-[#8DE8C1] focus:shadow-[0_0_20px_rgba(141,232,193,0.2)] text-sm text-white outline-none transition-all duration-150 cursor-pointer"
                    >
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.name} className="bg-[#16161D] text-white">
                          {t.name}
                        </option>
                      ))}
                      <option value="General Comprehensive Consultation" className="bg-[#16161D] text-white">
                        General Comprehensive Consultation
                      </option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF8E87]" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleFieldChange("preferredDate", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 focus:border-[#FF8E87] focus:shadow-[0_0_20px_rgba(255,142,135,0.2)] text-sm text-white outline-none transition-all duration-150 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Message / Symptoms Notes */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-white/40" />
                    Describe Your Goals or Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in replacing a missing molar with a permanent 3D guided implant, or looking for cosmetic smile veneers..."
                    value={formData.notes}
                    onChange={(e) => handleFieldChange("notes", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#B69CFF] focus:shadow-[0_0_20px_rgba(182,156,255,0.25)] text-sm text-white placeholder:text-white/30 outline-none transition-all duration-150 resize-none"
                  />
                </div>

                {/* Submit Button & Fast WhatsApp Link */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-white/50 text-left">
                    🔒 Medical information kept strictly confidential
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="px-4 py-3 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Direct WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-action="book"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#111111] hover:bg-white/90 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                    >
                      {status === "loading" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                          <span>Reserving Slot...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>REQUEST CONSULTATION</span>
                          <Send className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default React.memo(AppointmentBooking);

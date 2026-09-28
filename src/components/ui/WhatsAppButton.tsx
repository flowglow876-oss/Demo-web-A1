import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { CLINIC_INFO } from "@/src/data/dental-data";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside aria-label="Quick Clinic Chat" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-lg text-xs text-[#111111] animate-in fade-in slide-in-from-right-2">
          <span>Need rapid answers? Direct clinic chat available</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close chat tip"
            className="text-[#9E9E9E] hover:text-[#111111] cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Pill Button */}
      <a
        href={CLINIC_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AVA Dental Clinic on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#111111] text-white hover:bg-black border border-white/15 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3),0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.35),0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer select-none"
      >
        {/* Pulsing indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
        </span>

        <MessageSquare className="w-4 h-4 text-[#25D366] transition-transform duration-200 group-hover:scale-110" />

        <span className="text-xs font-mono tracking-wider font-semibold whitespace-nowrap hidden sm:inline">
          CHAT WITH THE CLINIC
        </span>
        <span className="text-xs font-mono tracking-wider font-semibold whitespace-nowrap sm:hidden">
          CHAT
        </span>
      </a>
    </aside>
  );
}

export default WhatsAppButton;

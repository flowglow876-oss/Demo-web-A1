import React from "react";
import { CLINIC_INFO } from "@/src/data/dental-data";
import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink } from "lucide-react";

export function MapSection() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Medical Road, Civil Lines, Aligarh, Uttar Pradesh, India"
  )}`;

  return (
    <section className="py-16 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-white/85 md:bg-white/80 md:backdrop-blur-xl border border-black/10 shadow-lg p-6 sm:p-8 md:p-14">
        {/* Ambient Warm Corner Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#B69CFF]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Studio Location Info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#7C5CFF]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
                  Studio Location
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-[#111111] tracking-tight">
                AVA DENTAL & IMPLANT STUDIO
              </h2>
              <p className="text-sm md:text-base text-[#737373] mt-2">
                Conveniently situated in Civil Lines along Medical Road, easily accessible with dedicated private valet parking.
              </p>
            </div>

            <div className="space-y-3.5 text-xs md:text-sm text-[#111111]">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-black/5">
                <MapPin className="w-4 h-4 text-[#7C5CFF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Studio Address</div>
                  <div className="text-[#737373] mt-0.5">{CLINIC_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-black/5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Consultation Hours</div>
                  <div className="text-[#737373] mt-0.5">{CLINIC_INFO.hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-black/5">
                <Phone className="w-4 h-4 text-[#65D8FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Direct Concierge</div>
                  <div className="text-[#737373] mt-0.5">{CLINIC_INFO.phone} · {CLINIC_INFO.email}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Stylized Architectural Map Card (6 cols) */}
          <div className="lg:col-span-6 relative h-[340px] md:h-[400px] rounded-2xl overflow-hidden border border-black/10 shadow-inner bg-[#EAE8E2] p-6 flex flex-col justify-between">
            {/* Vector Map Roads Diagram */}
            <div className="absolute inset-0 opacity-40">
              <svg viewBox="0 0 400 300" className="w-full h-full stroke-black/30 fill-none">
                {/* Major avenues */}
                <line x1="0" y1="80" x2="400" y2="80" strokeWidth="6" stroke="#D3CDC2" />
                <line x1="0" y1="210" x2="400" y2="210" strokeWidth="8" stroke="#D3CDC2" />
                <line x1="180" y1="0" x2="180" y2="300" strokeWidth="10" stroke="#D3CDC2" />
                <line x1="280" y1="0" x2="280" y2="300" strokeWidth="5" stroke="#D3CDC2" />
                {/* Minor cross-streets */}
                <line x1="40" y1="0" x2="40" y2="300" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="340" y1="0" x2="340" y2="300" strokeWidth="2" strokeDasharray="4 4" />
                {/* Roundabout / Traffic Circle */}
                <circle cx="180" cy="210" r="28" strokeWidth="4" stroke="#C4BCAD" />
              </svg>
            </div>

            {/* Top Map HUD Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/95 text-[11px] font-mono font-semibold text-[#111111] shadow-xs">
                COORDINATES: {CLINIC_INFO.coordinates}
              </span>
              <span className="text-[11px] font-mono text-[#737373]">CIVIL LINES DISTRICT</span>
            </div>

            {/* Central Animated Marker Pin */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-14 w-14 rounded-full bg-[#7C5CFF] opacity-40" />
                <div className="relative w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xl border-2 border-white">
                  <MapPin className="w-6 h-6 text-[#65D8FF]" />
                </div>
              </div>
              <div className="mt-3 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-xs font-bold text-[#111111] shadow-md">
                AVA DENTAL STUDIO
              </div>
            </div>

            {/* Bottom Landmark Badges */}
            <div className="relative z-10 flex flex-wrap gap-2 text-[10px] font-mono text-[#737373]">
              <span className="bg-white/80 px-2.5 py-1 rounded-full border border-black/5">
                Near AMU Medical Faculty
              </span>
              <span className="bg-white/80 px-2.5 py-1 rounded-full border border-black/5">
                Valet Parking Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;

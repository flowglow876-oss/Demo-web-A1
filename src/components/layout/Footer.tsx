import React from "react";
import { CLINIC_INFO } from "@/src/data/dental-data";
import { ArrowUpRight, MessageSquare, MapPin, Mail, Phone, Heart } from "lucide-react";

interface FooterProps {
  onBookClick: () => void;
}

export function Footer({ onBookClick }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#111113] text-[#F7F6F2] pt-24 pb-12 overflow-hidden border-t border-white/10 select-none">
      {/* Background Soft Aurora Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7C5CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#65D8FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mini Scrolling Top Marquee */}
      <div className="w-full overflow-hidden border-b border-white/10 pb-8 mb-16 opacity-75">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-xs text-white/50 tracking-[0.25em] uppercase">
          <span className="mx-6">★ AVA DENTAL & IMPLANT STUDIO</span>
          <span className="mx-6">· 3D CBCT DIAGNOSTICS</span>
          <span className="mx-6">· COMPUTER-GUIDED SURGERY</span>
          <span className="mx-6">· DIGITAL SMILE DESIGN</span>
          <span className="mx-6">· PORCELAIN VENEERS</span>
          <span className="mx-6">· CLEAR ALIGNERS</span>
          <span className="mx-6">· ALIGARH, UP</span>
          <span className="mx-6">★ AVA DENTAL & IMPLANT STUDIO</span>
          <span className="mx-6">· 3D CBCT DIAGNOSTICS</span>
          <span className="mx-6">· COMPUTER-GUIDED SURGERY</span>
          <span className="mx-6">· DIGITAL SMILE DESIGN</span>
          <span className="mx-6">· PORCELAIN VENEERS</span>
          <span className="mx-6">· CLEAR ALIGNERS</span>
          <span className="mx-6">· ALIGARH, UP</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Cinematic Headline & Direct CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#B69CFF] font-semibold">
              Ready for precision care?
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mt-3 leading-[0.95]">
              YOUR SMILE<br />STARTS HERE.
            </h2>
          </div>

          <div>
            <button
              onClick={onBookClick}
              data-action="book"
              className="px-8 py-4 rounded-full bg-white text-[#111111] hover:bg-[#F7F6F2] font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(182,156,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111]" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-white/10 text-xs md:text-sm">
          {/* Col 1: Treatments */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-white/40 tracking-wider font-semibold">
              Treatments
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Dental Implants</button></li>
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Digital Smile Design</button></li>
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Clear Aligners</button></li>
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Porcelain Veneers</button></li>
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Microscope Endodontics</button></li>
              <li><button onClick={() => scrollTo("treatments-section")} className="hover:text-white transition-colors cursor-pointer">Restorative Dentistry</button></li>
            </ul>
          </div>

          {/* Col 2: Technology & 3D */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-white/40 tracking-wider font-semibold">
              Technology
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => scrollTo("technology-section")} className="hover:text-white transition-colors cursor-pointer">3D Intraoral Scanning</button></li>
              <li><button onClick={() => scrollTo("technology-section")} className="hover:text-white transition-colors cursor-pointer">Cone-Beam CT 3D</button></li>
              <li><button onClick={() => scrollTo("lab-section")} className="hover:text-white transition-colors cursor-pointer">3D Dental Lab</button></li>
              <li><button onClick={() => scrollTo("technology-section")} className="hover:text-white transition-colors cursor-pointer">Keyhole Guided Surgery</button></li>
              <li><button onClick={() => scrollTo("cases-section")} className="hover:text-white transition-colors cursor-pointer">Before & After Cases</button></li>
            </ul>
          </div>

          {/* Col 3: Clinical Team */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-white/40 tracking-wider font-semibold">
              Clinical Team
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => scrollTo("doctors-section")} className="hover:text-white transition-colors cursor-pointer">Dr. Aarav Mehta (MDS)</button></li>
              <li><button onClick={() => scrollTo("doctors-section")} className="hover:text-white transition-colors cursor-pointer">Dr. Rhea Kapoor (MDS)</button></li>
              <li><button onClick={() => scrollTo("doctors-section")} className="hover:text-white transition-colors cursor-pointer">Dr. Kabir Shah (BDS)</button></li>
              <li><button onClick={() => scrollTo("doctors-section")} className="hover:text-white transition-colors cursor-pointer">Dr. Ananya Rao (BDS)</button></li>
              <li><button onClick={() => scrollTo("stories-section")} className="hover:text-white transition-colors cursor-pointer">Patient Stories</button></li>
            </ul>
          </div>

          {/* Col 4: Studio Location */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-white/40 tracking-wider font-semibold">
              Studio
            </h4>
            <div className="space-y-2 text-white/70">
              <p>{CLINIC_INFO.address}</p>
              <p className="text-white/50">{CLINIC_INFO.hours}</p>
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#65D8FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 5: Connect */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-white/40 tracking-wider font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition-colors cursor-pointer">
                  {CLINIC_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition-colors cursor-pointer">
                  {CLINIC_INFO.email}
                </a>
              </li>
              <li className="pt-2">
                <span className="text-white/40 text-xs">Instagram @avadentalstudio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Copyright & Anti-slop clean footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Cosmetic & Implant Dental Atelier</span>
            <span>·</span>
            <span>Aligarh, Uttar Pradesh, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

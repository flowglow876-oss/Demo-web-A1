import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CLINIC_INFO } from "@/src/data/dental-data";
import { Menu, X, ArrowRight, Calendar, MapPin, Phone } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_ITEMS = [
  { id: "treatments-section", label: "Treatments" },
  { id: "technology-section", label: "Technology" },
  { id: "lab-section", label: "3D Lab" },
  { id: "stories-section", label: "Smile Stories" },
  { id: "cases-section", label: "Case Studies" },
  { id: "doctors-section", label: "Doctors" },
  { id: "clinic-section", label: "Studio" },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("treatments-section");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-3 md:py-4">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 relative ${
            scrolled
              ? "bg-white/85 backdrop-blur-xl border border-[#B69CFF]/30 shadow-[0_12px_35px_-10px_rgba(124,92,255,0.12)]"
              : "bg-white/40 backdrop-blur-md border border-black/5 hover:border-black/10"
          }`}
        >
          {/* Subtle top edge luminous highlight line */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/30 to-transparent pointer-events-none" />

          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 text-base sm:text-lg md:text-xl font-display font-bold tracking-tight text-[#111111] select-none cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF] group-hover:scale-125 transition-transform duration-200" />
            <span className="hover:opacity-80 transition-opacity">
              {CLINIC_INFO.shortName}
            </span>
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links with Active Indicator & Soft Light Follower */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs md:text-sm font-medium text-[#737373]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <span
                    className={`transition-all duration-200 ${
                      isActive
                        ? "text-[#111111] font-semibold"
                        : isHovered
                        ? "text-[#111111] translate-x-0.5"
                        : "text-[#737373]"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active tiny underline glow */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-[#7C5CFF] to-transparent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBookClick}
              data-action="book"
              className="group relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111111] text-[#F7F6F2] hover:bg-black text-[11px] sm:text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(182,156,255,0.4)] hover:scale-[1.02] active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap overflow-hidden"
            >
              {/* Luminous Inner Reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <span className="hidden sm:inline">BOOK CONSULTATION</span>
              <span className="sm:hidden">BOOK</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Mobile hamburger trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full hover:bg-black/5 text-[#111111] transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Premium Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#111113]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            {/* Top Bar of Overlay */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
                <span className="font-display font-bold text-lg tracking-tight">
                  {CLINIC_INFO.shortName}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vertical Staggered Navigation Items */}
            <div className="py-8 flex flex-col space-y-4">
              <div className="text-[11px] font-mono tracking-widest text-[#B69CFF] uppercase mb-2">
                Studio Directory
              </div>
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between py-2 text-left text-2xl font-display font-medium text-white/90 hover:text-white hover:pl-2 transition-all cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#65D8FF] transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* Bottom Actions & Clinic Details */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-4 rounded-full bg-white text-[#111111] font-display font-semibold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4 text-[#7C5CFF]" />
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/50 gap-2 font-mono pt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#65D8FF]" />
                  <span>{CLINIC_INFO.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8DE8C1]" />
                  <span>{CLINIC_INFO.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

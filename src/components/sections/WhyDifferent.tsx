import React from "react";
import { motion } from "motion/react";
import { Target, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";

export function WhyDifferent() {
  const cards = [
    {
      number: "01",
      title: "PRECISION",
      subtitle: "Digital Diagnostics & Guided Surgery",
      description: "We replace guesswork with sub-millimeter computer planning. From 3D cone-beam tomography to stereolithographic 3D printed surgical stents, our implant trajectories and veneer preparations are micro-engineered for lifelong stability.",
      accent: "#B69CFF",
      glowClass: "hover:shadow-[0_20px_50px_-10px_rgba(182,156,255,0.35)]",
      bgGradient: "from-[#B69CFF]/10 to-transparent",
      icon: Target,
      points: ["Sub-millimeter guide accuracy", "Pre-operative 3D bone density mapping", "Zero flap incisions for rapid healing"],
    },
    {
      number: "02",
      title: "COMFORT",
      subtitle: "Empathetic, Unhurried Clinical Care",
      description: "We have banished dental anxiety through architectural serenity. Private acoustic suites, ceiling relaxation panoramas, computerized painless local numbing, and doctors who listen deeply before touching a single tooth.",
      accent: "#65D8FF",
      glowClass: "hover:shadow-[0_20px_50px_-10px_rgba(101,216,255,0.35)]",
      bgGradient: "from-[#65D8FF]/10 to-transparent",
      icon: HeartHandshake,
      points: ["Computerized painless anesthesia", "Acoustically isolated suites", "Complete step-by-step clarity"],
    },
    {
      number: "03",
      title: "AESTHETICS",
      subtitle: "Biological Translucency & Facial Balance",
      description: "True cosmetic dentistry does not look like Chiclets or opaque plastic. We hand-characterize each porcelain veneer and zirconia crown to mirror natural dental enamel light scattering, opalescence, and individual skin undertones.",
      accent: "#FF8E87",
      glowClass: "hover:shadow-[0_20px_50px_-10px_rgba(255,142,135,0.35)]",
      bgGradient: "from-[#FF8E87]/10 to-transparent",
      icon: Sparkles,
      points: ["100% reversible trial mock-ups", "Custom master ceramist hand-layering", "Dynamic facial proportion harmony"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
          <span className="text-xs uppercase font-mono tracking-widest text-[#737373]">
            Our Clinical Philosophy
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-semibold text-[#111111] tracking-tight">
          Why it feels different.
        </h2>
        <p className="text-sm md:text-base text-[#737373] mt-3">
          A modern medical standard engineered at the intersection of surgical science and aesthetic artistry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-6 sm:p-8 bg-white/85 md:bg-white/80 md:backdrop-blur-xl border border-black/10 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${card.glowClass}`}
            >
              {/* Corner soft glow accent */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${card.bgGradient} rounded-tr-3xl blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60`}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#111111] tracking-wider">
                    {card.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-black/5"
                    style={{ backgroundColor: `${card.accent}20` }}
                  >
                    <Icon className="w-5 h-5 text-[#111111]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-semibold text-[#111111]">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono text-[#737373] mt-1">{card.subtitle}</div>
                  <p className="text-sm text-[#737373] mt-4 leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 space-y-2">
                  {card.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-[#111111]">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyDifferent;

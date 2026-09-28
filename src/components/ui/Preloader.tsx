import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"initial" | "sub" | "exit">("initial");

  useEffect(() => {
    // Fast & crisp brand intro
    const t1 = setTimeout(() => {
      setPhase("sub");
    }, 350);

    const t2 = setTimeout(() => {
      setPhase("exit");
    }, 850);

    const t3 = setTimeout(() => {
      onComplete();
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F6F2] text-[#111111] select-none"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#B69CFF]/15 to-[#65D8FF]/15 blur-2xl pointer-events-none" />

          {/* Rotating Thin Precision Ring */}
          <div className="relative flex items-center justify-center w-28 h-28 mb-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#B69CFF]/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-t-[#7C5CFF] border-r-transparent border-b-[#65D8FF] border-l-transparent"
            />

            {/* Central Monogram */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-display font-bold tracking-tight text-[#111111]"
            >
              AVA
            </motion.div>
          </div>

          {/* Subtitle Line */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: phase === "sub" ? 1 : 0,
              y: phase === "sub" ? 0 : 6,
            }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#737373] font-medium"
          >
            <span>DENTAL & IMPLANT STUDIO</span>
          </motion.div>

          {/* Fast Progress Bar */}
          <div className="w-32 h-[2px] bg-black/5 rounded-full overflow-hidden mt-6">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#B69CFF] via-[#7C5CFF] to-[#65D8FF]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(Preloader);

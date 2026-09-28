import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { usePerformanceMode } from "../../hooks/usePerformance";

export function CustomCursor() {
  const perf = usePerformanceMode();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "rotate" | "book">("default");
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // If cursor is disabled (mobile, tablet, touch, reduced motion), do not attach any listeners
    if (!perf.enableCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle coordinate dispatch with requestAnimationFrame
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);

        const target = e.target as HTMLElement | null;
        if (!target) {
          rafRef.current = null;
          return;
        }

        const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
        if (cursorTarget) {
          const val = cursorTarget.getAttribute("data-cursor") as any;
          setCursorType(val || "pointer");
        } else if (
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest('[role="button"]')
        ) {
          const isBookBtn = target.closest('[data-action="book"]');
          setCursorType(isBookBtn ? "book" : "pointer");
        } else {
          setCursorType("default");
        }

        rafRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [perf.enableCursor, isVisible, mouseX, mouseY]);

  // Don't render anything if cursor is disabled
  if (!perf.enableCursor || !isVisible) return null;

  const isSpecial = cursorType === "rotate" || cursorType === "view" || cursorType === "book";

  const getCursorContent = () => {
    switch (cursorType) {
      case "rotate":
        return <span className="text-[9px] font-mono tracking-widest text-[#111111] font-bold">ROTATE</span>;
      case "view":
        return <span className="text-[9px] font-mono tracking-widest text-[#111111] font-bold">VIEW</span>;
      case "book":
        return <span className="text-[9px] font-mono tracking-widest text-white font-bold">BOOK</span>;
      default:
        return null;
    }
  };

  if (!perf.enableCursor || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-150"
      style={{
        x: cursorX,
        y: cursorY,
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          width: isSpecial ? 54 : cursorType === "pointer" ? 36 : 14,
          height: isSpecial ? 54 : cursorType === "pointer" ? 36 : 14,
          borderRadius: "50%",
          backgroundColor:
            cursorType === "book"
              ? "rgba(17, 17, 17, 0.95)"
              : isSpecial
              ? "rgba(255, 255, 255, 0.92)"
              : cursorType === "pointer"
              ? "rgba(182, 156, 255, 0.22)"
              : "rgba(17, 17, 17, 0.65)",
          borderColor:
            isSpecial
              ? "rgba(17, 17, 17, 0.2)"
              : cursorType === "pointer"
              ? "rgba(124, 92, 255, 0.4)"
              : "transparent",
          borderWidth: cursorType === "pointer" || isSpecial ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="flex items-center justify-center shadow-sm select-none"
      >
        {getCursorContent()}
      </motion.div>
    </motion.div>
  );
}

export default React.memo(CustomCursor);

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Article } from "@/src/data/dental-data";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

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
          className="relative w-full max-w-3xl bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[85vh] flex flex-col"
        >
          {/* Cover Image Banner */}
          {article.image && (
            <div className="relative w-full h-48 sm:h-60 overflow-hidden bg-slate-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>
          )}

          {/* Header */}
          <div className="p-6 md:p-8 border-b border-black/5 bg-gradient-to-br from-[#FDFBF7] to-[#F5F2EB]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#7C5CFF]">
                  <span className="uppercase tracking-widest font-semibold">{article.category}</span>
                  <span className="text-black/20">·</span>
                  <span className="flex items-center gap-1 text-[#737373]">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-[#111111] leading-tight">
                  {article.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white text-[#111111] border border-black/10 hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-6 text-sm md:text-base text-[#737373] leading-relaxed">
            <p className="text-base md:text-lg font-serif-accent italic text-[#111111] leading-normal border-l-2 border-[#7C5CFF] pl-4 py-1">
              "{article.excerpt}"
            </p>

            <div className="space-y-4">
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-black/5 mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7C5CFF]" />
                Key Clinical Takeaways
              </h4>
              <ul className="space-y-2">
                {article.keyTakeaways.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs md:text-sm text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-black/5 bg-[#FAFAF8] flex items-center justify-between">
            <span className="text-xs text-[#737373]">AVA Dental Knowledge Library</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-black cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ArticleModal;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Mail, MailOpen, Edit3 } from "lucide-react";
import { LetterData } from "../types";

export default function LoveLetter({ letterConfig }: { letterConfig: LetterData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  // Auto trigger typewriter sequence when opened
  useEffect(() => {
    if (!isOpen) {
      setTypedParagraphs([]);
      setCurrentParagraphIdx(0);
      setCurrentCharIdx(0);
      return;
    }

    const paragraphs = letterConfig.paragraphs;
    if (currentParagraphIdx >= paragraphs.length) return;

    const currentFullText = paragraphs[currentParagraphIdx];

    const typeChar = () => {
      if (currentCharIdx < currentFullText.length) {
        setTypedParagraphs((prev) => {
          const updated = [...prev];
          if (!updated[currentParagraphIdx]) {
            updated[currentParagraphIdx] = "";
          }
          updated[currentParagraphIdx] += currentFullText[currentCharIdx];
          return updated;
        });
        setCurrentCharIdx((prev) => prev + 1);
      } else {
        // Complete current paragraph, rest briefly, then advance to next
        setTimeout(() => {
          setCurrentParagraphIdx((prev) => prev + 1);
          setCurrentCharIdx(0);
        }, 500); // pause between paragraphs
      }
    };

    // Fast typing simulation (20ms per character)
    const timer = setTimeout(typeChar, 20);
    return () => clearTimeout(timer);
  }, [isOpen, currentParagraphIdx, currentCharIdx, letterConfig.paragraphs]);

  return (
    <section id="letter-section" ref={letterRef} className="relative w-full max-w-4xl mx-auto px-4 md:px-8 py-24 z-10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-luxury-bordeaux/15 blur-3xl pointer-events-none" />

      {/* Sealed Envelope Container */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-10 md:p-16 rounded-3xl text-center border border-gold-400/20 max-w-2xl mx-auto shadow-2xl relative cursor-pointer group flex flex-col items-center"
            onClick={() => setIsOpen(true)}
          >
            {/* Elegant wax seal */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-bordeaux to-red-950 border border-gold-400/30 flex items-center justify-center mb-8 relative shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <Mail className="w-8 h-8 text-gold-300 animate-pulse" />
              <div className="absolute -inset-2 rounded-full border border-gold-500/10 animate-ping opacity-30" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-4">
              Sana Bir <span className="italic text-gold-200">Mektubum Var</span>
            </h2>

            <p className="text-slate-100 text-xs md:text-sm tracking-widest uppercase mb-8 font-semibold">
              Mektubu açmak için mühre dokunun
            </p>

            <span className="font-mono text-[10px] text-gold-300 uppercase tracking-[0.25em] group-hover:text-gold-200 transition-colors font-medium">
              Gözlerden Uzak, Kalpten Gelenler ✦
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 md:p-16 rounded-3xl border border-gold-400/25 relative overflow-hidden shadow-2xl"
          >
            {/* Inner bordeaux accent */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-luxury-bordeaux/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold-400/5 rounded-full blur-2xl" />

            <div className="flex justify-between items-center pb-8 border-b border-gold-500/10 mb-8 z-10 relative">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-gold-300" />
                <span className="font-mono text-[10px] tracking-widest text-gold-400 uppercase">
                  Dijital Aşk Mektubu
                </span>
              </div>
              <MailOpen className="w-5 h-5 text-gold-400/60" />
            </div>

            {/* Typewritten Text Content */}
            <div className="font-serif text-base md:text-lg leading-relaxed text-white min-h-[350px] space-y-6 tracking-wide italic select-text z-10 relative">
              {typedParagraphs.map((para, idx) => {
                const isCurrent = idx === currentParagraphIdx;
                return (
                  <p key={idx} className="relative font-normal text-slate-100">
                    {para}
                    {isCurrent && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1.5 h-4 bg-gold-300 ml-1"
                      />
                    )}
                  </p>
                );
              })}
            </div>

            {/* Signature & Signoff */}
            {currentParagraphIdx >= letterConfig.paragraphs.length && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-12 border-t border-gold-500/10 mt-12 text-right z-10 relative"
              >
                <div className="inline-block text-center">
                  <span className="font-serif italic text-lg text-gold-100 block mb-2 font-medium">
                    {letterConfig.signature}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-luxury-bordeaux fill-current animate-pulse" />
                    <span className="font-mono text-[9px] text-gold-300 uppercase tracking-widest font-medium">
                      Sonsuz Aşkla
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Close / Reseal Option */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-widest text-gold-400/80 hover:text-gold-200 transition-colors cursor-pointer"
            >
              Mektubu Kapat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

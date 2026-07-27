/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const texts = [
    "Evrenin gizeminde...",
    "Sonsuz bir yolculuk...",
    "Seninle başlayan hikayemiz...",
    "Aşk, zaman ve yıldızlar..."
  ];

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        // Organic progress speed up / slow down
        const randInc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + randInc, 100);
      });
    }, 120);

    // Swap stage text
    const stageInterval = setInterval(() => {
      setStage((prev) => (prev + 1) % texts.length);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 bg-luxury-black z-9999 flex flex-col items-center justify-center select-none"
      >
        {/* Subtle glowing center spot */}
        <div className="absolute w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] bg-luxury-bordeaux/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col items-center text-center max-w-md px-6 z-10">
          {/* Constellation Sparkle */}
          <motion.div
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 bg-gold-300 rounded-full mb-8 gold-glow animate-gold-pulse"
          />

          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.2em] text-gold-200 gold-glow font-light mb-4">
            GAMZE & HÜSEYİN
          </h1>
          
          <p className="font-serif italic text-sm text-gold-400/60 tracking-wider mb-16 h-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={stage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                {texts[stage]}
              </motion.span>
            </AnimatePresence>
          </p>

          {/* Loading Ring & Numbers */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-4">
            {/* Outer track */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-gold-950/20 fill-none"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-gold-400 fill-none"
                strokeWidth="1.5"
                strokeDasharray="213.6"
                animate={{ strokeDashoffset: 213.6 - (213.6 * progress) / 100 }}
                transition={{ ease: "easeOut" }}
              />
            </svg>
            <span className="absolute font-mono text-xs text-gold-300 font-light tracking-widest">
              {progress}%
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-500/50">
            Deneyim Yükleniyor
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

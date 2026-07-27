/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Film, BookOpen, Heart, Sparkles } from "lucide-react";

// Import custom configurations & types
import storyDataRaw from "./data/storyData.json";
import { StoryData } from "./types";

// Import Sub-modules
import LoadingScreen from "./components/LoadingScreen";
import FairytaleTheatre from "./components/FairytaleTheatre";
import TimeCounter from "./components/TimeCounter";
import StoryTimeline from "./components/StoryTimeline";
import CelebrationSections from "./components/CelebrationSections";
import LoveLetter from "./components/LoveLetter";
import FinalAmbientScreen from "./components/FinalAmbientScreen";

const story: StoryData = storyDataRaw as StoryData;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<"cinema" | "album">("cinema");

  return (
    <div className="relative w-full min-h-screen bg-[#030508] text-white selection:bg-gold-500/30 selection:text-white">
      
      {/* Cinematic Film Grain Noise Overlay across the whole application */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-15" />

      {/* 1. Cinematic Loading Prologue screen */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : activeView === "cinema" ? (
          /* 2. Interactive Fairytale Theatre Player Stage */
          <motion.div
            key="cinema-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen overflow-hidden"
          >
            <FairytaleTheatre storyData={story} onToggleView={() => setActiveView("album")} />
          </motion.div>
        ) : (
          /* 3. Fully Scrollable Love Album Mode containing all visual memoir details */
          <motion.div
            key="album-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full min-h-screen bg-gradient-to-b from-[#030508] via-[#0b0e14] to-[#030508] relative pb-24 overflow-y-auto"
          >
            {/* Sticky HUD Menu Bar */}
            <header className="sticky top-0 z-40 w-full px-6 py-4 backdrop-blur-md bg-[#030508]/75 border-b border-gold-500/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold-400 animate-pulse fill-current" />
                <span className="font-serif italic text-base md:text-lg tracking-wide text-white">
                  Gamze & Hüseyin Aşk Defteri
                </span>
              </div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveView("cinema");
                }}
                className="px-5 py-2.5 rounded-full bg-gold-400 text-luxury-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:bg-gold-500 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 fill-current" />
                Sinema Moduna Geç
              </button>
            </header>

            {/* Content Modules Stacking */}
            <main className="relative z-10">
              
              {/* Introduction Banner inside Album view */}
              <div className="text-center py-20 px-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold-400/80 mb-3 block">
                  BİR ÖMÜR BOYU BERABER
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-white font-light mb-4">
                  Sonsuz Aşkın Defteri
                </h1>
                <p className="font-serif italic text-sm md:text-base text-gold-200/60 max-w-lg mx-auto">
                  "Gökyüzü dönerken, yıldızlar şahidimiz olsun."
                </p>
                <div className="w-16 h-[0.5px] bg-gold-400/20 mx-auto mt-6" />
              </div>

              {/* 1. Time Ticker counter passing correct April 16, 2025 date */}
              <TimeCounter weddingDateStr="2025-04-16T18:00:00" counterConfig={story.counter} />

              {/* 2. Visual Chronological Timeline of events */}
              <StoryTimeline events={story.timeline} />


              {/* 5. Birthday & Anniversary Countdowns */}
              <CelebrationSections birthdayConfig={story.birthday} anniversaryConfig={story.anniversary} />

              {/* 6. Deep romantic typed-out Letter */}
              <LoveLetter letterConfig={story.letter} />

              {/* 7. Scenic Final Ambient Screen */}
              <FinalAmbientScreen footerConfig={story.footer} />

              {/* Centered Return switch at very bottom */}
              <div className="w-full flex flex-col items-center justify-center mt-12 px-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400/40 mb-3">
                  MASALIMIZI SİNEMATİK İZLEMEK İÇİN
                </span>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setActiveView("cinema");
                  }}
                  className="px-6 py-3 rounded-full border border-gold-400/30 text-xs tracking-widest uppercase text-gold-300 hover:bg-gold-400/10 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  <Film className="w-4 h-4 text-gold-400" /> Sinema Moduna Dön
                </button>
              </div>

            </main>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

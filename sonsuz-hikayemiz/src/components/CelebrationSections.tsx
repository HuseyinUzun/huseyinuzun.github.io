/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Gift, Heart, Star, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { BirthdayData, AnniversaryData } from "../types";

interface CelebrationProps {
  birthdayConfig: BirthdayData;
  anniversaryConfig: AnniversaryData;
}

export default function CelebrationSections({ birthdayConfig, anniversaryConfig }: CelebrationProps) {
  
  // Custom, high-end double cannon confetti burst sequence
  const handleBirthdayCelebration = () => {
    const colors = birthdayConfig.confettiColors || ["#D4AF37", "#FFFFFF", "#8B0000"];
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Fire fireworks from left and right corners
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);

      // Left blast
      confetti({
        particleCount,
        spread: 80,
        startVelocity: 40,
        origin: { x: 0, y: 0.85 },
        colors: colors,
        angle: 45
      });
      // Right blast
      confetti({
        particleCount,
        spread: 80,
        startVelocity: 40,
        origin: { x: 1, y: 0.85 },
        colors: colors,
        angle: 135
      });
    }, 220);
  };

  return (
    <div id="celebrations-container" className="w-full relative z-10">
      
      {/* 1. BIRTHDAY SECTION (August 11) */}
      <section id="birthday-section" className="relative w-full min-h-[90vh] flex items-center justify-center py-24 px-4 md:px-8 overflow-hidden">
        
        {/* Velvety Bordeaux background radial gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-bordeaux/15 to-luxury-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-luxury-bordeaux/25 blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-4xl glass-panel p-8 md:p-16 rounded-3xl border border-gold-400/10 hover:border-gold-400/20 transition-all duration-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
          
          {/* Inner Shimmer line */}
          <div className="absolute inset-0 border border-gold-500/5 rounded-2xl pointer-events-none" />

          {/* Interactive Gift Vector / Box */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative">
            
            {/* Glowing gold back rings */}
            <div className="absolute w-48 h-48 rounded-full border border-gold-400/10 animate-slow-spin -z-10" />
            <div className="absolute w-56 h-56 rounded-full border border-gold-400/5 -z-10" style={{ animation: "slow-spin 80s linear infinite reverse" }} />

            <motion.div
              initial={{ rotate: -5 }}
              whileInView={{ rotate: [0, -5, 5, -3, 3, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-gold-950/80 to-luxury-black border border-gold-400/30 flex items-center justify-center relative shadow-2xl cursor-pointer hover:border-gold-400/60 transition-all duration-500"
              onClick={handleBirthdayCelebration}
            >
              <div className="absolute inset-2 rounded-full border border-gold-400/5" />
              <Gift className="w-14 h-14 text-gold-300 group-hover:scale-110 transition-transform duration-500" />
              
              {/* Dynamic sparkle indicators */}
              <div className="absolute top-4 right-4 animate-gold-pulse"><Sparkles className="w-4 h-4 text-gold-200" /></div>
              <div className="absolute bottom-6 left-5 animate-gold-pulse" style={{ animationDelay: "1.5s" }}><Star className="w-3.5 h-3.5 text-gold-400" /></div>
            </motion.div>

            <button
              onClick={handleBirthdayCelebration}
              className="mt-8 font-mono text-xs uppercase tracking-[0.25em] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-luxury-black font-semibold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Kutlamayı Başlat 🎉
            </button>
          </div>

          {/* Birthday Narrative Details */}
          <div className="w-full md:w-3/5 text-center md:text-left flex flex-col justify-center">
            <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase mb-2 block">
              {birthdayConfig.subTitle} — DOĞUM GÜNÜ
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide mb-6">
              {birthdayConfig.title}
            </h2>

            <div className="h-[1px] w-16 bg-gold-400/30 mb-6 mx-auto md:mx-0" />

            <p className="text-slate-100 text-sm md:text-base leading-relaxed font-normal italic pr-2">
              &ldquo;{birthdayConfig.message}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-gold-400/60 font-mono text-xs tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Sonsuza dek kutlanacak en özel gün.</span>
            </div>
          </div>
        </div>
      </section>


      {/* 2. ANNIVERSARY SECTION (August 21) */}
      <section id="anniversary-section" className="relative w-full min-h-[90vh] flex items-center justify-center py-24 px-4 md:px-8 overflow-hidden">
        
        {/* Deep celestial midnight aura */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-navy/20 to-luxury-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-luxury-indigo/15 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-4xl glass-panel p-8 md:p-16 rounded-3xl border border-gold-400/10 hover:border-gold-400/20 transition-all duration-700 shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row items-center gap-12 group">
          
          {/* Inner border frame */}
          <div className="absolute inset-0 border border-gold-500/5 rounded-2xl pointer-events-none" />

          {/* Anniversary Narrative Details */}
          <div className="w-full md:w-3/5 text-center md:text-left flex flex-col justify-center">
            <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase mb-2 block">
              {anniversaryConfig.subTitle} — DÜĞÜN GÜNÜMÜZ
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide mb-6">
              {anniversaryConfig.title}
            </h2>

            <div className="h-[1px] w-16 bg-gold-400/30 mb-6 mx-auto md:mx-0" />

            <p className="text-slate-100 text-sm md:text-base leading-relaxed font-normal italic pr-2">
              &ldquo;{anniversaryConfig.message}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-gold-400/60 font-mono text-xs tracking-wider">
              <Heart className="w-4 h-4 text-luxury-bordeaux" />
              <span>Bir ömür el ele, sonsuz bir aşk ile...</span>
            </div>
          </div>

          {/* Celestial Alignment Graphics */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative">
            
            {/* Elegant concentric gold celestial rings */}
            <div className="absolute w-32 h-32 rounded-full border border-gold-400/15 animate-slow-spin -z-10" />
            <div className="absolute w-44 h-44 rounded-full border border-gold-500/10 -z-10 animate-slow-spin" style={{ animationDuration: "60s" }} />
            <div className="absolute w-56 h-56 rounded-full border border-gold-500/5 -z-10" style={{ animation: "slow-spin 100s linear infinite reverse" }} />

            {/* Glowing Celestial heart core */}
            <motion.div
              animate={{ 
                scale: [0.96, 1.04, 0.96],
                boxShadow: ["0 0 20px rgba(181, 132, 59, 0.1)", "0 0 40px rgba(181, 132, 59, 0.25)", "0 0 20px rgba(181, 132, 59, 0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full bg-gradient-to-tr from-luxury-navy via-luxury-black to-gold-950/40 border border-gold-400/25 flex flex-col items-center justify-center relative shadow-inner select-none cursor-help group-hover:border-gold-400/50 transition-all duration-700"
            >
              {/* Internal geometry */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#deb766" strokeWidth="0.75" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#deb766" strokeWidth="0.5" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#deb766" strokeWidth="0.5" />
              </svg>

              <Heart className="w-12 h-12 text-gold-300 z-10 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              <span className="font-mono text-[9px] text-gold-300 tracking-[0.25em] uppercase mt-3 z-10 font-semibold">
                BİZ OLMAK
              </span>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

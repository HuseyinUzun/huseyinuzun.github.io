/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { FooterData } from "../types";

export default function FinalAmbientScreen({ footerConfig }: { footerConfig: FooterData }) {
  // Beautiful ECG to Heart continuous SVG path
  const ecgHeartPath = "M 10 50 L 90 50 L 102 20 L 114 80 L 126 35 L 138 58 L 150 50 L 180 50 C 180 25, 205 15, 220 35 C 235 15, 260 25, 260 50 C 260 78, 220 100, 220 100 C 220 100, 180 78, 180 50";

  return (
    <section id="final-screen" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center text-center px-4 md:px-8 py-24 overflow-hidden z-10 select-none">
      
      {/* Deep twilight background glow overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-navy/10 to-luxury-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-luxury-indigo/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-luxury-bordeaux/5 blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Final card structure */}
      <div className="max-w-3xl flex flex-col items-center justify-center z-10">
        
        {/* Glowing floating star accent */}
        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.9, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-2.5 h-2.5 bg-gold-200 rounded-full mb-12 gold-glow"
        />

        {/* Cinematic Final Message */}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide leading-relaxed max-w-2xl mb-16">
          &ldquo;Bazı insanlar <span className="italic text-gold-200">hayatımıza gelir</span>. <br />
          Sen ise benim <span className="text-gold-100 gold-glow">hayatım oldun</span>.&rdquo;
        </h2>

        {/* Animated ECG to Heart SVG Path Drawing */}
        <div className="w-72 h-32 md:w-[400px] md:h-40 flex items-center justify-center relative">
          <svg 
            className="w-full h-full text-gold-300 drop-shadow-[0_0_12px_rgba(213,185,124,0.4)]" 
            viewBox="0 0 280 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background faint guide line */}
            <path
              d={ecgHeartPath}
              fill="none"
              stroke="rgba(213, 185, 124, 0.06)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing drawn ECG Heart Path */}
            <motion.path
              d={ecgHeartPath}
              fill="none"
              stroke="#deb766"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 4.5, 
                ease: [0.25, 1, 0.5, 1],
                delay: 0.5
              }}
            />

            {/* Pulsing glow point at the apex of the heart once finished */}
            <circle cx="220" cy="35" r="2" fill="#deb766" className="animate-ping" />
          </svg>

          {/* Centered pulsing soft heart background element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.08, 0.04] }}
            viewport={{ once: true }}
            transition={{ delay: 4, duration: 2 }}
            className="absolute right-[45px] top-[15px] md:right-[60px] md:top-[20px] w-12 h-12 bg-gold-400 rounded-full blur-xl pointer-events-none animate-pulse"
          />
        </div>

        {/* Endless Peaceful loop credits signoff */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">
            SONSUZ BİR HİKAYE
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <Heart className="w-3 h-3 text-gold-500 fill-current animate-pulse" />
            <span className="font-serif italic text-xs text-gold-300">Gamze & Hüseyin</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

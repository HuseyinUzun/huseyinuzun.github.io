/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Eye, Moon, Sparkles } from "lucide-react";
import { DreamItem } from "../types";

export default function ConstellationDreams({ dreams }: { dreams: DreamItem[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(dreams[0]?.id || null);

  const selectedDream = dreams.find((d) => d.id === selectedId);

  return (
    <section id="dreams-section" className="relative w-full max-w-6xl mx-auto px-4 md:px-8 py-24 z-10 select-none">
      
      {/* Title block */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-gold-400 gold-glow mb-4 block"
        >
          YILDIZLARA YAZILANLAR
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide"
        >
          Gelecek <span className="italic text-gold-200">Hayallerimiz</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs md:text-sm text-white/80 mt-4 tracking-widest uppercase"
        >
          Yıldızlara dokunarak hayallerimizi keşfedin
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Constellation Canvas Column (Lg: col-span-7) */}
        <div className="col-span-1 lg:col-span-7 h-[380px] md:h-[450px] relative glass-panel rounded-3xl border border-gold-400/10 overflow-hidden bg-luxury-black/40">
          
          {/* Constellation SVG lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Draw lines connecting stars dynamically */}
            {dreams.map((dream, idx) => {
              if (idx === dreams.length - 1) return null;
              const nextDream = dreams[idx + 1];
              const isFirstSelected = dream.id === selectedId;
              const isSecondSelected = nextDream.id === selectedId;

              return (
                <line
                  key={`line-${dream.id}`}
                  x1={`${dream.coordinates.x}%`}
                  y1={`${dream.coordinates.y}%`}
                  x2={`${nextDream.coordinates.x}%`}
                  y2={`${nextDream.coordinates.y}%`}
                  stroke={isFirstSelected || isSecondSelected ? "#deb766" : "rgba(213, 185, 124, 0.15)"}
                  strokeWidth={isFirstSelected || isSecondSelected ? "1.5" : "0.75"}
                  className="transition-all duration-700"
                  strokeDasharray={isFirstSelected || isSecondSelected ? "0" : "4 4"}
                />
              );
            })}

            {/* Loop-back connector line to form a closed star constellation */}
            {dreams.length > 2 && (
              <line
                x1={`${dreams[dreams.length - 1].coordinates.x}%`}
                y1={`${dreams[dreams.length - 1].coordinates.y}%`}
                x2={`${dreams[0].coordinates.x}%`}
                y2={`${dreams[0].coordinates.y}%`}
                stroke={selectedId === dreams[dreams.length - 1].id || selectedId === dreams[0].id ? "#deb766" : "rgba(213, 185, 124, 0.15)"}
                strokeWidth={selectedId === dreams[dreams.length - 1].id || selectedId === dreams[0].id ? "1.5" : "0.75"}
                className="transition-all duration-700"
                strokeDasharray={selectedId === dreams[dreams.length - 1].id || selectedId === dreams[0].id ? "0" : "4 4"}
              />
            )}
          </svg>

          {/* Glowing Space dust hase */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-luxury-bordeaux/10 blur-3xl pointer-events-none" />

          {/* Interactive Star Nodes mapping */}
          {dreams.map((dream, idx) => {
            const isSelected = dream.id === selectedId;

            return (
              <button
                key={dream.id}
                onClick={() => setSelectedId(dream.id)}
                className="absolute group -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 cursor-pointer"
                style={{
                  left: `${dream.coordinates.x}%`,
                  top: `${dream.coordinates.y}%`
                }}
              >
                {/* Outermost pulsing ring */}
                <span className={`absolute -inset-4 rounded-full bg-gold-400/5 transition-all duration-500 scale-75 group-hover:scale-100 ${
                  isSelected ? "scale-100 bg-gold-400/10 animate-ping" : ""
                }`} />

                {/* Star visual */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  isSelected 
                    ? "bg-gold-400 border-gold-300 text-luxury-black scale-110 shadow-lg" 
                    : "bg-luxury-black/90 border-gold-400/30 text-gold-300 hover:border-gold-400/80 hover:scale-105"
                }`}>
                  <Star className={`w-4 h-4 ${isSelected ? "fill-current" : "group-hover:fill-current transition-colors"}`} />
                </div>

                {/* Floating labels near stars (Hidden on small mobiles, beautiful desktop details) */}
                <div className={`absolute left-10 top-1/2 -translate-y-1/2 bg-luxury-black/90 border border-gold-400/20 px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ${
                  isSelected ? "opacity-100 font-semibold border-gold-400" : ""
                }`}>
                  <span className="font-serif text-xs text-white tracking-wide">
                    {dream.title.replace("✦ ", "")}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-gold-400/40 font-mono text-[9px] tracking-widest uppercase">
            <Moon className="w-3.5 h-3.5" />
            <span>Takımyıldız Haritası</span>
          </div>
        </div>

        {/* Narrative Panel Column (Lg: col-span-5) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center h-[280px]">
          <AnimatePresence mode="wait">
            {selectedDream && (
              <motion.div
                key={selectedDream.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-8 rounded-3xl border border-gold-400/25 relative overflow-hidden"
              >
                {/* Bordeaux warm flare */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-luxury-bordeaux/20 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gold-950/40 border border-gold-400/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                  </div>
                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase font-medium">
                    Hayal 0{selectedDream.id}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-white font-medium tracking-wide mb-4">
                  {selectedDream.title}
                </h3>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {selectedDream.description}
                </p>

                <div className="absolute bottom-3 right-3 opacity-10">
                  <Moon className="w-16 h-16 text-gold-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

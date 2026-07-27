/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  MessageCircle, 
  Coffee, 
  Camera, 
  Sparkles, 
  Heart, 
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { sfx } from "../utils/soundEffects";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
}

interface MemoryTrainProps {
  timeline: TimelineEvent[];
  selectedWagon: number | null;
  onSelectWagon: (idx: number) => void;
}

export default function MemoryTrain({ timeline, selectedWagon, onSelectWagon }: MemoryTrainProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the container to center the selected wagon
  useEffect(() => {
    if (selectedWagon !== null && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const wagonElements = container.querySelectorAll(".train-wagon-item");
      const targetWagon = wagonElements[selectedWagon] as HTMLElement;
      
      if (targetWagon) {
        const containerWidth = container.clientWidth;
        const wagonOffset = targetWagon.offsetLeft;
        const wagonWidth = targetWagon.clientWidth;
        
        // Calculate scroll position to center the wagon, taking locomotive into account
        const scrollPosition = wagonOffset - (containerWidth / 2) + (wagonWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth"
        });
      }
    }
  }, [selectedWagon]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      sfx.playMagic();
    }
  };

  // Maps index to corresponding Lucide Icon
  const getWagonIcon = (idx: number) => {
    switch (idx) {
      case 0: return <MessageCircle className="w-4 h-4 text-sky-400" />;
      case 1: return <Coffee className="w-4 h-4 text-amber-500" />;
      case 2: return <Camera className="w-4 h-4 text-emerald-400" />;
      case 3: return <Sparkles className="w-4 h-4 text-yellow-300" />;
      case 4: return <Heart className="w-4 h-4 text-rose-500" />;
      case 5: return <Award className="w-4 h-4 text-violet-400" />;
      default: return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-2 relative select-none">
      
      {/* Scroll Assistance Buttons */}
      <div className="absolute top-1/2 -left-3 -translate-y-12 z-20 hidden md:block">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer backdrop-blur-sm"
          title="Geri Git"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-3 -translate-y-12 z-20 hidden md:block">
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer backdrop-blur-sm"
          title="İleri Git"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Train Interactive Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-none pb-6 pt-4 relative flex items-end snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Full Long Train Inner Layout */}
        <div className="flex items-end gap-0 pl-16 pr-24 py-2 relative min-w-max h-56">
          
          {/* TRACKS LAYER */}
          <div className="absolute bottom-4 left-0 right-0 h-4 pointer-events-none">
            {/* Wooden sleepers (traversler) */}
            <div className="absolute top-0.5 left-0 right-0 h-1 flex justify-between px-2 gap-4">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="w-3.5 h-2 bg-[#2d1e18] border border-[#1b120f] rounded-xs shrink-0 transform -rotate-12" />
              ))}
            </div>
            {/* Dual Steel rails */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-b from-slate-500 to-slate-700 shadow-sm" />
            <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-b from-slate-600 to-slate-800 shadow-sm" />
            
            {/* Magical stardust glowing track effect */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-400/20 blur-[1px] animate-pulse" />
          </div>

          {/* ==================== 1. LOCOMOTIVE (STEAM ENGINE) ==================== */}
          <div className="flex flex-col items-center shrink-0 mr-1 snap-start relative">
            <motion.div
              animate={{ 
                y: [0, -2, 0, -1, 0],
                rotate: [0, -0.5, 0, 0.5, 0]
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-36 h-28 relative overflow-visible cursor-pointer"
              onClick={() => {
                sfx.playTrainWhistle();
                // Play extra whistle sound or custom magic chimes
              }}
              title="Makinist Hüseyin'in Büyülü Lokomotifi! (Kornaya Basmak İçin Dokun)"
            >
              <svg viewBox="0 0 144 112" className="w-full h-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <defs>
                  {/* Gold trim gradient */}
                  <linearGradient id="locoGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                  {/* Metallic iron body */}
                  <linearGradient id="locoBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  {/* Red bumper */}
                  <linearGradient id="locoRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>

                {/* Smoke Funnel (Baca) */}
                <path d="M 28,15 L 42,15 L 38,32 L 32,32 Z" fill="url(#locoBody)" />
                <path d="M 26,12 L 44,12 L 44,15 L 26,15 Z" fill="url(#locoGold)" />

                {/* Steam Dome (Kubbe) */}
                <path d="M 68,32 Q 74,18 80,32 Z" fill="url(#locoGold)" />

                {/* Boiler Cylinder (Kazan) */}
                <rect x="20" y="32" width="75" height="34" rx="4" fill="url(#locoBody)" stroke="#ca8a04" strokeWidth="0.7" />
                {/* Horizontal boiler bands */}
                <line x1="38" y1="32" x2="38" y2="66" stroke="url(#locoGold)" strokeWidth="1.2" />
                <line x1="56" y1="32" x2="56" y2="66" stroke="url(#locoGold)" strokeWidth="1.2" />
                <line x1="74" y1="32" x2="74" y2="66" stroke="url(#locoGold)" strokeWidth="1.2" />

                {/* Cabin (Makinist Kabini) */}
                <path d="M 90,20 L 134,20 L 134,66 L 90,66 Z" fill="url(#locoBody)" stroke="#ca8a04" strokeWidth="0.7" />
                {/* Arched Cabin Roof */}
                <path d="M 86,22 Q 112,12 138,22 Z" fill="#090d16" stroke="url(#locoGold)" strokeWidth="1" />

                {/* Cabin Window with light inside */}
                <rect x="100" y="30" width="22" height="18" rx="2" fill="#fef08a" opacity="0.9" />
                {/* Driver silhouette (Hüseyin's captain hat) */}
                <path d="M 106,45 C 106,38 116,38 116,45 L 116,48 L 106,48 Z" fill="#0c1020" />
                <path d="M 105,39 L 117,39 L 114,41 L 108,41 Z" fill="#22c55e" /> {/* Green driver hat */}

                {/* Cowcatcher / Snowplow (Izgara) */}
                <path d="M 2,66 L 22,66 L 16,84 L 2,84 Z" fill="url(#locoRed)" />
                <line x1="6" y1="66" x2="4" y2="84" stroke="#ffffff" strokeWidth="1" />
                <line x1="12" y1="66" x2="10" y2="84" stroke="#ffffff" strokeWidth="1" />

                {/* Front Lantern Light (Büyülü Far) */}
                <path d="M 8,46 L 20,44 L 20,54 L 8,52 Z" fill="url(#locoGold)" />
                <circle cx="10" cy="49" r="3" fill="#ffffff" />
                {/* Warm golden light beam projection */}
                <path d="M 10,49 L -50,32 L -50,66 Z" fill="url(#locoGold)" opacity="0.12" />

                {/* Connecting bar to wagons (Coupler) */}
                <rect x="134" y="58" width="12" height="4" rx="1" fill="#475569" />

                {/* WHEELS (LOCOMOTIVE) */}
                {/* Small front wheel */}
                <circle cx="34" cy="78" r="11" fill="#020617" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="34" cy="78" r="8" fill="#ca8a04" />
                <circle cx="34" cy="78" r="3" fill="#f8fafc" />

                {/* Large rear driver wheels */}
                <circle cx="70" cy="74" r="16" fill="#020617" stroke="#ca8a04" strokeWidth="1.5" />
                <circle cx="70" cy="74" r="12" fill="url(#locoBody)" />
                {/* Wheel Spokes */}
                <line x1="56" y1="74" x2="84" y2="74" stroke="#e2e8f0" strokeWidth="1.2" />
                <line x1="70" y1="60" x2="70" y2="88" stroke="#e2e8f0" strokeWidth="1.2" />
                <circle cx="70" cy="74" r="4.5" fill="#ca8a04" />

                <circle cx="112" cy="74" r="16" fill="#020617" stroke="#ca8a04" strokeWidth="1.5" />
                <circle cx="112" cy="74" r="12" fill="url(#locoBody)" />
                <line x1="98" y1="74" x2="126" y2="74" stroke="#e2e8f0" strokeWidth="1.2" />
                <line x1="112" y1="60" x2="112" y2="88" stroke="#e2e8f0" strokeWidth="1.2" />
                <circle cx="112" cy="74" r="4.5" fill="#ca8a04" />

                {/* Mechanical piston piston rod (Connecting slide bar) */}
                <line x1="34" y1="78" x2="70" y2="74" stroke="#94a3b8" strokeWidth="2" />
                <line x1="70" y1="74" x2="112" y2="74" stroke="#cbd5e1" strokeWidth="2.5" />
              </svg>
            </motion.div>

            {/* Steaming Smoke Rings - Heart / Star Particles puffing out of the chimney */}
            <div className="absolute top-1 left-7 w-12 h-12 pointer-events-none overflow-visible">
              {/* Puff 1 (Star shape or circular smoke) */}
              <motion.div
                animate={{ 
                  y: [-10, -50], 
                  x: [0, -15, -5],
                  scale: [0.2, 1.1, 1.4], 
                  opacity: [0, 0.8, 0] 
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-3 bottom-0 text-[10px]"
              >
                ☁️
              </motion.div>
              {/* Puff 2 (Heart shape) */}
              <motion.div
                animate={{ 
                  y: [-12, -65], 
                  x: [0, -28, -12], 
                  scale: [0.2, 1.3, 1.6], 
                  opacity: [0, 0.9, 0] 
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
                className="absolute left-3 bottom-0 text-red-400 text-xs"
              >
                ❤️
              </motion.div>
              {/* Puff 3 (Magic spark) */}
              <motion.div
                animate={{ 
                  y: [-8, -42], 
                  x: [0, -8, -18], 
                  scale: [0.1, 1, 1.2], 
                  opacity: [0, 0.7, 0] 
                }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
                className="absolute left-4 bottom-1 text-yellow-300 text-[10px]"
              >
                ✨
              </motion.div>
            </div>

            {/* Locomotive Label */}
            <span className="text-[8px] tracking-widest text-emerald-400 font-mono mt-1 font-bold">LOKOMOTİF</span>
          </div>

          {/* ==================== 2. WAGONS LIST (1 to 6) ==================== */}
          {timeline.map((item, idx) => {
            const isSelected = selectedWagon === idx;
            
            return (
              <div
                key={item.id}
                className="train-wagon-item flex flex-col items-center shrink-0 relative snap-center"
              >
                {/* Coupler link between wagons (only shown if not the first wagon) */}
                <div className="absolute left-[-16px] bottom-10 w-5 h-1.5 bg-gradient-to-r from-slate-700 to-slate-900 pointer-events-none z-10 rounded-full" />

                {/* Interactive Wagon body container */}
                <motion.div
                  whileHover={{ 
                    y: -3, 
                    scale: 1.01,
                    transition: { duration: 0.2 } 
                  }}
                  animate={isSelected ? {
                    y: [0, -3, 0, -1, 0],
                    rotate: [0, 0.5, 0, -0.5, 0],
                  } : {
                    y: [0, -1.2, 0, -0.5, 0],
                  }}
                  transition={{ 
                    duration: isSelected ? 1.6 : 3.0, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }}
                  onClick={() => {
                    onSelectWagon(idx);
                    sfx.playMagic();
                  }}
                  className={`w-40 h-24 rounded-xl relative cursor-pointer border p-3 flex flex-col justify-between overflow-visible transition-shadow ${
                    isSelected
                      ? "bg-gradient-to-br from-[#1d274c] via-[#23356e] to-[#121936] border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)]"
                      : "bg-gradient-to-br from-[#0c0f20]/95 to-[#161e3d]/90 border-slate-700/60 shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:border-slate-500/80"
                  }`}
                >
                  {/* Wagon Header */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[8px] font-bold uppercase tracking-widest ${isSelected ? "text-amber-300" : "text-slate-400"}`}>
                      VAGON 0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] font-semibold text-slate-300">
                      {item.date.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>

                  {/* Windows with glowing warmth & SILHOUETTES */}
                  <div className="flex gap-2.5 justify-center my-1 relative">
                    {/* Window 1: Featuring Silhouette if selected */}
                    <div className={`w-11 h-8 rounded-t-lg border flex items-end justify-center overflow-hidden transition-all duration-500 relative ${
                      isSelected 
                        ? "bg-gradient-to-t from-[#ea580c]/80 via-[#fcd34d] to-[#fef08a] border-amber-400 shadow-[inset_0_1px_6px_rgba(0,0,0,0.3)]" 
                        : "bg-slate-950/90 border-slate-700/50"
                    }`}>
                      {/* Grid window pane line */}
                      <div className="absolute inset-0 flex justify-center pointer-events-none">
                        <div className="w-[1px] h-full bg-black/10" />
                      </div>
                      
                      {/* HÜSEYİN SILHOUETTE: Only stands out warmly when wagon selected */}
                      {isSelected ? (
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-end h-full"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible">
                            {/* Cute head silhouette with bowtie */}
                            <circle cx="12" cy="10" r="5" fill="#090d16" />
                            <path d="M 6,24 C 6,18 18,18 18,24 Z" fill="#090d16" />
                            {/* Glowing heart on chest */}
                            <circle cx="12" cy="18" r="2.5" fill="#ef4444" className="animate-pulse" />
                          </svg>
                        </motion.g>
                      ) : (
                        <div className="text-[7px] text-slate-600 mb-0.5">🛋️</div>
                      )}
                    </div>

                    {/* Window 2: Featuring Silhouette if selected */}
                    <div className={`w-11 h-8 rounded-t-lg border flex items-end justify-center overflow-hidden transition-all duration-500 relative ${
                      isSelected 
                        ? "bg-gradient-to-t from-[#ea580c]/80 via-[#fcd34d] to-[#fef08a] border-amber-400 shadow-[inset_0_1px_6px_rgba(0,0,0,0.3)]" 
                        : "bg-slate-950/90 border-slate-700/50"
                    }`}>
                      {/* Grid window pane line */}
                      <div className="absolute inset-0 flex justify-center pointer-events-none">
                        <div className="w-[1px] h-full bg-black/10" />
                      </div>

                      {/* GAMZE SILHOUETTE: Only stands out warmly when wagon selected */}
                      {isSelected ? (
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-end h-full"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible">
                            {/* Cute girl silhouette with floral crown shape */}
                            <circle cx="12" cy="10" r="4.5" fill="#090d16" />
                            <path d="M 12,5.5 Q 8,4 12,2 Q 16,4 12,5.5 Z" fill="#22c55e" opacity="0.8" /> {/* Hair crown */}
                            <path d="M 5,24 C 5,18 19,18 19,24 Z" fill="#090d16" />
                            {/* Smiling mouth curve or heart */}
                            <circle cx="12" cy="18" r="2.5" fill="#ec4899" className="animate-pulse" />
                          </svg>
                        </motion.g>
                      ) : (
                        <div className="text-[7px] text-slate-600 mb-0.5">🛋️</div>
                      )}
                    </div>

                    {/* Floating Heart over selected wagon windows */}
                    {isSelected && (
                      <motion.div
                        animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-4 text-xs text-rose-500 drop-shadow-md pointer-events-none"
                      >
                        ❤️
                      </motion.div>
                    )}
                  </div>

                  {/* Wagon Footer: Milestone Title with Icon */}
                  <div className="flex items-center gap-1.5 border-t border-slate-800/80 pt-1.5 mt-0.5">
                    <div className={`p-1 rounded-md ${isSelected ? "bg-amber-400/20" : "bg-slate-800/40"}`}>
                      {getWagonIcon(idx)}
                    </div>
                    <span className={`text-[9px] font-bold truncate leading-none ${isSelected ? "text-amber-200" : "text-slate-300"}`}>
                      {item.title}
                    </span>
                  </div>

                  {/* Gold star spark in selected vagon */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-900 font-extrabold text-[8px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce border border-yellow-300 shadow-md">
                      ✦
                    </div>
                  )}
                </motion.div>

                {/* WHEELS (WAGON) */}
                <div className="w-full flex justify-around px-4 mt-0.5 z-10 pointer-events-none">
                  {/* Wheel left */}
                  <motion.div
                    animate={isSelected ? { rotate: 360 } : {}}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-inner"
                  >
                    <div className="w-4 h-4 rounded-full border border-dashed border-slate-500/70 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
                    </div>
                  </motion.div>

                  {/* Wheel right */}
                  <motion.div
                    animate={isSelected ? { rotate: 360 } : {}}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-inner"
                  >
                    <div className="w-4 h-4 rounded-full border border-dashed border-slate-500/70 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track Indicator text */}
      <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-1 px-4 max-w-md">
        🚂 <span className="text-amber-300 font-semibold">Anılarımızın Büyülü Zaman Treni</span> raylar üzerinde süzülüyor. 
        Her vagon aşkımızın sarsılmaz bir temelini barındırıyor. Detayları keşfetmek için vagonlara tıklayabilirsin!
      </p>
    </div>
  );
}

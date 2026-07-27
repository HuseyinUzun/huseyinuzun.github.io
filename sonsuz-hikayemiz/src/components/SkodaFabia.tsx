/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { sfx } from "../utils/soundEffects";
import confetti from "canvas-confetti";

export default function SkodaFabia() {
  const [isHonking, setIsHonking] = useState(false);
  const [carColor, setCarColor] = useState<"moon-white" | "candy-white">("moon-white");
  const [headlightsOn, setHeadlightsOn] = useState(true);

  // Colors mapping for the body of the Skoda Fabia 3 (focusing on beautiful Skoda Whites)
  const colors = {
    "moon-white": {
      base: "#fafafa", // Pearlescent Metallic Moon White (Ay Beyazı)
      highlight: "#ffffff", // Glowing silver flake
      shadow: "#e2e8f0", // Subtle pearly silver shadow
    },
    "candy-white": {
      base: "#f4f4f5", // Pure solid Candy White (Şeker Beyazı)
      highlight: "#ffffff", // Pure bright white
      shadow: "#cbd5e1", // Contoured slate shadow
    }
  };

  const handleCarClick = () => {
    if (isHonking) return;
    setIsHonking(true);
    sfx.playCarHorn();
    
    // Fire a mini burst of heart confetti or star sparkles near the car
    confetti({
      particleCount: 20,
      spread: 50,
      colors: ["#ffd54f", "#f43f5e", "#ffffff", "#60a5fa"],
      origin: { y: 0.7, x: 0.75 }
    });

    setTimeout(() => {
      setIsHonking(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center mt-6 w-full max-w-sm bg-gradient-to-br from-[#0c0d1e]/95 to-[#161a35]/90 backdrop-blur-md p-4 rounded-2xl border border-blue-400/20 shadow-[0_4px_35px_rgba(0,0,0,0.5)] relative overflow-visible">
      {/* Decorative Sparkles */}
      <div className="absolute -top-2 -left-2 bg-yellow-400/20 text-yellow-300 p-1.5 rounded-full border border-yellow-400/30 animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Floating Moon Icon on top right to visually echo the "Aya Benzesin" theme */}
      <div className="absolute -top-2 -right-2 bg-amber-400/10 text-amber-300 p-1.5 rounded-full border border-amber-400/20 shadow-md">
        🌙
      </div>

      {/* Speech bubble when honking */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={isHonking ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
        className="absolute -top-12 z-20 bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 text-slate-950 font-sans font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none flex items-center gap-1.5 border border-amber-300"
      >
        <span>Düt Düt! 🚗💨</span>
        <Heart className="w-3 h-3 fill-rose-600 text-rose-600 animate-beat" />
      </motion.div>

      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-blue-400">Yol Arkadaşımız</span>
          <h5 className="font-serif italic text-xs text-slate-100 font-semibold mt-0.5">
            2015 Škoda Fabia 3 Hatchback
          </h5>
        </div>
        
        {/* Headlight switch and color selectors */}
        <div className="flex items-center gap-2">
          {/* Light toggle */}
          <button
            onClick={() => {
              sfx.playMagic();
              setHeadlightsOn(!headlightsOn);
            }}
            className={`p-1.5 rounded-lg border text-[10px] transition-colors cursor-pointer ${
              headlightsOn 
                ? "bg-amber-400/20 border-amber-400/40 text-amber-300" 
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
            }`}
            title="Farları Aç/Kapat"
          >
            💡
          </button>

          {/* Color Switchers (Special Whites: Moon White and Candy White) */}
          <div className="flex gap-1.5">
            {(["moon-white", "candy-white"] as const).map((color) => (
              <button
                key={color}
                onClick={() => {
                  setCarColor(color);
                  sfx.playMagic();
                }}
                className={`w-4 h-4 rounded-full border transition-transform relative overflow-hidden ${
                  color === "moon-white" 
                    ? "bg-gradient-to-br from-white via-slate-100 to-slate-200" 
                    : "bg-slate-50"
                } ${
                  carColor === color ? "scale-125 border-amber-400 ring-2 ring-amber-400/30" : "border-white/20 hover:scale-110"
                }`}
                title={color === "moon-white" ? "Ay Beyazı 🌙 (Moon White Metallic)" : "Şeker Beyazı 🍬 (Candy White)"}
              >
                {color === "moon-white" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Click instructions */}
      <p className="text-[10px] text-slate-300/80 mb-3 text-center leading-relaxed">
        Millet Bahçesi'nde çay içerken bizimle olan, rengini gökteki dolunaydan alan <span className="text-amber-300 font-semibold">Ay Beyazı (Moon White)</span> Fabiamıza dokunarak korna çalabilirsin!
      </p>

      {/* CAR CONTAINER */}
      <motion.div
        whileHover={{ y: -4 }}
        animate={isHonking ? {
          y: [0, -8, 0, -5, 0],
          scaleY: [1, 0.94, 1.02, 0.98, 1],
        } : {
          // Slow dreamy lunar float animation - "aya benzesin, yerçekimi az gibi süzülsün"
          y: [0, -4, 0],
        }}
        transition={isHonking ? {
          duration: 0.55,
          ease: "easeInOut"
        } : {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={handleCarClick}
        className="w-full flex justify-center items-center h-28 relative cursor-pointer select-none overflow-visible"
      >
        {/* Headlight beam glow */}
        {headlightsOn && (
          <div className="absolute left-1 top-[42px] w-24 h-10 bg-gradient-to-r from-amber-400/30 via-amber-300/10 to-transparent blur-sm rounded-r-full pointer-events-none origin-right rotate-[10deg] z-10 animate-pulse" />
        )}

        {/* Ambient road/grass shadow */}
        <div className="absolute bottom-4 left-6 right-6 h-3 bg-black/40 blur-md rounded-full" />

        {/* SVG SKODA FABIA 3 HATCHBACK PROFILE */}
        <svg
          viewBox="0 0 280 110"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Metallic Moon White or Candy White body gradient */}
            <linearGradient id="carBodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors[carColor].highlight} />
              <stop offset="45%" stopColor={colors[carColor].base} />
              <stop offset="100%" stopColor={colors[carColor].shadow} />
            </linearGradient>

            {/* Wheel rim gradient */}
            <linearGradient id="alloyRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Glass gradient */}
            <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>

            {/* Lunar Orbit gold/white gradient */}
            <linearGradient id="moonOrbitGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e0a96d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ==================== MOON AND CELESTIAL BACKGROUND ==================== */}
          {/* Glowing Full Moon in the sky behind the car */}
          <g transform="translate(230, 24)" className="pointer-events-none">
            {/* Soft moonlight aura */}
            <circle cx="0" cy="0" r="16" fill="#fef08a" opacity="0.15" />
            <circle cx="0" cy="0" r="11" fill="#fef08a" opacity="0.3" />
            {/* Moon sphere */}
            <circle cx="0" cy="0" r="9" fill="#fef08a" />
            {/* Crater shadows */}
            <circle cx="-3" cy="-3" r="1.8" fill="#eab308" opacity="0.25" />
            <circle cx="3" cy="3" r="1.5" fill="#eab308" opacity="0.25" />
            <circle cx="2" cy="-4" r="1" fill="#eab308" opacity="0.2" />
          </g>

          {/* Magical lunar orbit line or sparkling starry dust */}
          <path
            d="M 20,40 Q 140,-10 260,35"
            stroke="url(#moonOrbitGrad)"
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="4 4"
            opacity="0.3"
          />

          {/* Twinkling mini-stars in the sky */}
          <g opacity="0.5">
            <circle cx="35" cy="22" r="0.8" fill="#ffffff" />
            <circle cx="115" cy="18" r="1" fill="#ffffff" />
            <circle cx="165" cy="28" r="0.7" fill="#ffffff" />
          </g>

          {/* ==================== STEAMING TEA CUPS ON HOOD (FRONT) ==================== */}
          {/* Placed at (x: 42, y: 50) directly on the front hood (kaput) of the car */}
          <g transform="translate(42, 50)" className="pointer-events-none">
            {/* Cup 1 (left) */}
            <g transform="translate(0, 0)">
              {/* Cup shape */}
              <path d="M 0,10 L 8,10 L 6,18 L 2,18 Z" fill="#ea580c" opacity="0.95" />
              <ellipse cx="4" cy="10" rx="4" ry="1.5" fill="#f97316" />
              {/* Steam waves */}
              <motion.path
                d="M 4,7 Q 2,4 4,1 Q 6,-2 4,-5"
                fill="none"
                stroke="#fff"
                strokeWidth="0.8"
                opacity="0.75"
                animate={{ y: [0, -3, 0], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </g>
            {/* Cup 2 (right) */}
            <g transform="translate(12, 2)">
              {/* Cup shape */}
              <path d="M 0,10 L 8,10 L 6,18 L 2,18 Z" fill="#ea580c" opacity="0.95" />
              <ellipse cx="4" cy="10" rx="4" ry="1.5" fill="#f97316" />
              {/* Steam waves */}
              <motion.path
                d="M 4,7 Q 6,4 4,1 Q 2,-2 4,-5"
                fill="none"
                stroke="#fff"
                strokeWidth="0.8"
                opacity="0.75"
                animate={{ y: [0, -3, 0], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "linear", delay: 0.4 }}
              />
            </g>
          </g>

          {/* ==================== CAR BODY SHAPE ==================== */}
          {/* Black Pillars and roof structure for the signature black-roof combo of Fabia Style */}
          <path
            d="M 68,42 L 125,42 L 175,44 L 182,54 L 180,68 L 65,68 Z"
            fill="#090d16"
          />

          {/* Glass Windows */}
          {/* Front Side Window */}
          <path
            d="M 72,45 L 115,45 L 115,63 L 73,63 Z"
            fill="url(#carGlass)"
          />
          {/* Warm tea interior glow inside front window */}
          <circle cx="95" cy="55" r="5" fill="#ffd97d" opacity="0.15" />

          {/* Rear Side Window with the famous Fabia 3 upward kink at C-pillar */}
          <path
            d="M 120,45 L 158,47 L 168,58 Q 171,61 160,63 L 120,63 Z"
            fill="url(#carGlass)"
          />

          {/* Black Roofline panel */}
          <path
            d="M 66,41 L 115,41 L 170,44 Q 175,44 176,46 L 178,51 L 63,44 Z"
            fill="#020408"
          />

          {/* Main Metallic Painted Body Panel of Skoda Fabia 3 Hatchback */}
          {/* Designed to match Hatchback curve, angular hood crease and rear bumper projection */}
          <path
            d="M 24,75 
               C 22,74 24,71 28,68 
               L 65,65 
               Q 73,43 78,43 
               L 172,46 
               Q 185,46 188,58 
               L 205,62 
               C 214,64 216,74 212,85 
               L 211,92 
               L 194,92 
               Q 192,80 180,80 
               Q 168,80 166,92 
               L 84,92 
               Q 82,80 70,80 
               Q 58,80 56,92 
               L 32,92 
               Q 24,92 24,84 
               Z"
            fill="url(#carBodyGrad)"
          />

          {/* Headlights: Sharp angular modern design of Fabia 3 */}
          <path
            d="M 24,75 L 36,74 L 38,81 L 26,83 Z"
            fill={headlightsOn ? "#fef08a" : "#cbd5e1"}
            stroke={headlightsOn ? "#f59e0b" : "#94a3b8"}
            strokeWidth="0.5"
          />
          {headlightsOn && (
            <ellipse cx="26" cy="79" rx="3" ry="2.5" fill="#ffffff" className="animate-pulse" />
          )}

          {/* Taillight: Angular wrap-around red/C-shape of Skoda */}
          <path
            d="M 203,63 L 210,64 L 208,74 L 198,73 Z"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="0.5"
          />

          {/* Front Bumper & Grill highlight (notched front) */}
          <path
            d="M 24,84 L 28,91 L 34,91"
            stroke="#0f172a"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Crisp Character crease running through door handles */}
          <path
            d="M 38,74 Q 110,72 198,76"
            stroke="#ffffff"
            strokeWidth="0.7"
            opacity="0.25"
            fill="none"
          />

          {/* Rear Spoiler lip */}
          <path
            d="M 172,46 L 184,47 Q 188,48 186,52 Z"
            fill="#090d16"
          />

          {/* Door Handles */}
          <rect x="105" y="72" width="10" height="2" rx="1" fill="#090d16" opacity="0.6" />
          <rect x="145" y="73" width="10" height="2" rx="1" fill="#090d16" opacity="0.6" />

          {/* Rear Fuel cap flap (Fabia style) */}
          <rect x="178" y="68" width="8" height="7" rx="0.5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />

          {/* ==================== WHEELS ==================== */}
          {/* Wheel 1 (Front) */}
          <g transform="translate(70, 86)">
            {/* Outer rubber tire */}
            <circle cx="0" cy="0" r="16.5" fill="#111827" />
            <circle cx="0" cy="0" r="13" fill="#1e293b" />
            {/* Alloy rim multi-spoke design */}
            <circle cx="0" cy="0" r="11" fill="url(#alloyRim)" />
            {/* Spokes */}
            <g className={isHonking ? "animate-spin" : ""} style={{ transformOrigin: "center", animationDuration: "0.2s" }}>
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#f8fafc" strokeWidth="1.2" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#f8fafc" strokeWidth="1.2" />
              <line x1="-7" y1="-7" x2="7" y2="7" stroke="#e2e8f0" strokeWidth="1" />
              <line x1="7" y1="-7" x2="-7" y2="7" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="3.5" fill="#475569" />
              <circle cx="0" cy="0" r="1.5" fill="#cbd5e1" />
            </g>
          </g>

          {/* Wheel 2 (Rear) */}
          <g transform="translate(180, 86)">
            {/* Outer rubber tire */}
            <circle cx="0" cy="0" r="16.5" fill="#111827" />
            <circle cx="0" cy="0" r="13" fill="#1e293b" />
            {/* Alloy rim multi-spoke design */}
            <circle cx="0" cy="0" r="11" fill="url(#alloyRim)" />
            {/* Spokes */}
            <g className={isHonking ? "animate-spin" : ""} style={{ transformOrigin: "center", animationDuration: "0.2s" }}>
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#f8fafc" strokeWidth="1.2" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#f8fafc" strokeWidth="1.2" />
              <line x1="-7" y1="-7" x2="7" y2="7" stroke="#e2e8f0" strokeWidth="1" />
              <line x1="7" y1="-7" x2="-7" y2="7" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="3.5" fill="#475569" />
              <circle cx="0" cy="0" r="1.5" fill="#cbd5e1" />
            </g>
          </g>

          {/* Skoda green wheel caps center accent */}
          <circle cx="70" cy="86" r="1.5" fill="#22c55e" />
          <circle cx="180" cy="86" r="1.5" fill="#22c55e" />
        </svg>
      </motion.div>

      {/* Decorative grass blades under the car wheels */}
      <div className="w-full flex justify-between px-10 text-[9px] text-emerald-500/40 font-mono -mt-1 select-none pointer-events-none">
        <span>🌿🌾</span>
        <span>🌱🌿🌾</span>
      </div>
    </div>
  );
}

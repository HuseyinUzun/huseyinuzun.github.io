/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface AnimatedCoupleProps {
  pose: "stargaze" | "dance" | "surprise" | "sit" | "train" | "lantern" | "final";
  isMoving?: boolean;
  isCandleBlown?: boolean;
}

export default function AnimatedCouple({ pose, isMoving = false, isCandleBlown = false }: AnimatedCoupleProps) {
  // Creating high-fidelity, adorable, highly expressive vector characters for Hüseyin and Gamze.
  // Featuring glowing gradients, blushing cheeks, big beautiful eyes, and smooth emotional animations.

  const idleBreath = {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const hairSwayLeft = {
    animate: {
      rotate: [-1, 2, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const hairSwayRight = {
    animate: {
      rotate: [1, -2, 1],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      
      {/* Dynamic shadow cast on the ground depending on scene */}
      <div className="absolute -bottom-2 w-48 h-4 bg-black/35 blur-md rounded-full scale-x-125" />

      {/* SVG Container holding both characters side by side with high depth drop shadow */}
      <svg 
        width="300" 
        height="260" 
        viewBox="0 0 300 260" 
        className="overflow-visible drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
      >
        <defs>
          {/* Glowing Gradients for 3D Vector look */}
          <linearGradient id="huseyinHair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#252b47" />
            <stop offset="30%" stopColor="#1a1d30" />
            <stop offset="100%" stopColor="#0c0d17" />
          </linearGradient>
          <linearGradient id="huseyinCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d4673" />
            <stop offset="50%" stopColor="#2c3258" />
            <stop offset="100%" stopColor="#1a1e36" />
          </linearGradient>
          <linearGradient id="huseyinSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffebe1" />
            <stop offset="100%" stopColor="#f7cfbd" />
          </linearGradient>

          <linearGradient id="gamzeHair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffa0b0" />
            <stop offset="40%" stopColor="#f5718a" />
            <stop offset="100%" stopColor="#d14b65" />
          </linearGradient>
          <linearGradient id="gamzeDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffa6c5" />
            <stop offset="60%" stopColor="#e05c8d" />
            <stop offset="100%" stopColor="#b33663" />
          </linearGradient>
          <linearGradient id="gamzeSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff3ec" />
            <stop offset="100%" stopColor="#ffd8c5" />
          </linearGradient>

          <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff3d60" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff3d60" stopOpacity="0" />
          </radialGradient>

          {/* Magic lantern glow */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe082" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffb300" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ========================================== */}
        {/* CHARACTER 1: HÜSEYİN (Left side)           */}
        {/* ========================================== */}
        <g id="huseyin" transform="translate(10, 0)" className="origin-bottom">
          {/* Breathing & Scene Actions */}
          <motion.g
            animate={
              pose === "dance"
                ? { y: [0, -4, 0], rotate: [-1, 2, -1] }
                : pose === "final"
                ? { y: [0, -2, 0], x: [0, 1, 0] }
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: pose === "dance" ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Hüseyin's Body / Coat */}
            <path 
              d="M 65,160 C 50,165 45,210 45,230 L 105,230 C 105,210 100,165 85,160 Z" 
              fill="url(#huseyinCoat)" 
            />

            {/* Scarf / Gold Collar */}
            <path 
              d="M 60,160 C 60,160 75,170 90,160 C 100,150 70,145 60,160" 
              fill="#d4af37" 
              opacity="0.95"
            />

            {/* Hüseyin's Head */}
            <g id="huseyin-head" transform="translate(15, 0)">
              {/* Face Sphere */}
              <circle cx="60" cy="120" r="32" fill="url(#huseyinSkin)" />

              {/* Rosy Cheeks */}
              <circle cx="42" cy="128" r="8" fill="url(#cheekBlush)" />
              <circle cx="78" cy="128" r="8" fill="url(#cheekBlush)" />

              {/* HÜSEYİN'S EYES (Big, Cute Anime Style) */}
              <g id="huseyin-eyes">
                {pose === "surprise" ? (
                  // Overjoyed wide open eyes witnessing Gamze blow candle
                  <>
                    <circle cx="45" cy="116" r="8" fill="#141724" />
                    <circle cx="45" cy="116" r="3" fill="#ffffff" transform="translate(-2, -2)" />
                    <circle cx="43" cy="118" r="1" fill="#ffffff" />
                    <circle cx="75" cy="116" r="8" fill="#141724" />
                    <circle cx="75" cy="116" r="3" fill="#ffffff" transform="translate(-2, -2)" />
                    <circle cx="73" cy="118" r="1" fill="#ffffff" />
                  </>
                ) : pose === "dance" || pose === "sit" ? (
                  // Happy curved laughing eyes (closed)
                  <>
                    <path d="M 38,118 Q 45,110 52,118" fill="none" stroke="#141724" strokeWidth="3.2" strokeLinecap="round" />
                    <path d="M 68,118 Q 75,110 82,118" fill="none" stroke="#141724" strokeWidth="3.2" strokeLinecap="round" />
                  </>
                ) : (
                  // Normal large lovely eyes
                  <>
                    {/* Left Eye */}
                    <circle cx="45" cy="118" r="7.5" fill="#141724" />
                    <circle cx="43" cy="115" r="2.5" fill="#ffffff" /> {/* Glint */}
                    <circle cx="47" cy="120" r="1.2" fill="#ffffff" /> {/* Tiny glint */}

                    {/* Right Eye */}
                    <circle cx="75" cy="118" r="7.5" fill="#141724" />
                    <circle cx="73" cy="115" r="2.5" fill="#ffffff" /> {/* Glint */}
                    <circle cx="77" cy="120" r="1.2" fill="#ffffff" /> {/* Tiny glint */}
                  </>
                )}
              </g>

              {/* Eyebrows */}
              <path d="M 38,106 Q 45,102 52,107" fill="none" stroke="#141724" strokeWidth="2" strokeLinecap="round" />
              <path d="M 68,106 Q 75,102 82,107" fill="none" stroke="#141724" strokeWidth="2" strokeLinecap="round" />

              {/* Nose */}
              <path d="M 60,122 Q 58,126 62,126" fill="none" stroke="#e09d84" strokeWidth="1.8" strokeLinecap="round" />

              {/* Cute Smiling Mouth */}
              <g id="huseyin-mouth">
                {pose === "surprise" ? (
                  // Broad overjoyed smile of excitement
                  <path d="M 52,132 Q 60,144 68,132 Z" fill="#802a1e" />
                ) : (
                  <path d="M 54,133 Q 60,140 66,133" fill="none" stroke="#141724" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </g>

              {/* Fluffy Hair with highlights */}
              <motion.g animate={hairSwayLeft.animate}>
                <path 
                  d="M 23,115 C 10,110 10,80 30,75 C 35,60 65,55 75,70 C 85,65 98,75 95,95 C 100,105 92,120 90,120 C 85,105 78,100 70,105 C 60,95 40,98 35,110 Z" 
                  fill="url(#huseyinHair)" 
                />
                {/* Subtle shine highlight */}
                <path 
                  d="M 35,82 C 45,72 65,72 75,80" 
                  fill="none" 
                  stroke="#4b5585" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  opacity="0.4"
                />
              </motion.g>
            </g>

            {/* Arms / Hands Actions */}
            {pose === "surprise" ? (
              // Sweet romantic pose: one hand on heart, one hand pointing gently towards the cake
              <g id="huseyin-arms-surprise">
                {/* Left arm on heart */}
                <path d="M 45,180 Q 60,165 64,152" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="64" cy="152" r="5" fill="url(#huseyinSkin)" />

                {/* Right arm pointing gently to her birthday cake, resting stably with the body breath */}
                <path d="M 85,180 Q 100,182 104,176" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="104" cy="176" r="5" fill="url(#huseyinSkin)" />
              </g>
            ) : pose === "lantern" ? (
              // Releasing a warm flying lantern
              <g id="huseyin-arms-lantern">
                <path d="M 45,180 Q 25,185 40,200" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 85,180 Q 110,165 118,155" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="118" cy="155" r="5" fill="url(#huseyinSkin)" />
              </g>
            ) : pose === "stargaze" || pose === "final" ? (
              // Holding Hands with Gamze
              <g id="huseyin-arms-holding">
                <path d="M 45,180 C 35,190 35,215 42,225" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 85,180 Q 105,195 125,200" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="125" cy="200" r="5.5" fill="url(#huseyinSkin)" />
              </g>
            ) : (
              // Default cozy arms
              <g id="huseyin-arms-default">
                <path d="M 45,180 Q 30,195 40,215" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 85,180 Q 100,195 90,215" fill="none" stroke="#3d4673" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="40" cy="215" r="5" fill="url(#huseyinSkin)" />
                <circle cx="90" cy="215" r="5" fill="url(#huseyinSkin)" />
              </g>
            )}
          </motion.g>
        </g>

        {/* ========================================== */}
        {/* CHARACTER 2: GAMZE (Right side)            */}
        {/* ========================================== */}
        <g id="gamze" transform="translate(10, 0)" className="origin-bottom">
          {/* Subtle breathing animation offset from Hüseyin */}
          <motion.g
            animate={
              pose === "dance"
                ? { y: [-4, 0, -4], rotate: [2, -1, 2] }
                : pose === "final"
                ? { y: [0, -2, 0], x: [0, -1, 0] }
                : { y: [-3, 0, -3] }
            }
            transition={{
              duration: pose === "dance" ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            {/* Gamze's Body / Soft Pink Dress */}
            <path 
              d="M 215,160 C 200,165 180,210 170,232 L 235,232 C 235,210 230,165 215,160 Z" 
              fill="url(#gamzeDress)" 
            />

            {/* Cozy Soft White Scarf */}
            <path 
              d="M 200,163 Q 212,174 225,163 Q 235,153 210,150 Z" 
              fill="#ffffff" 
              opacity="0.95"
            />

            {/* Gamze's Head */}
            <g id="gamze-head" transform="translate(150, 0)">
              {/* Face Sphere */}
              <circle cx="60" cy="120" r="31" fill="url(#gamzeSkin)" />

              {/* Rosy blush cheeks */}
              <circle cx="42" cy="128" r="9" fill="url(#cheekBlush)" />
              <circle cx="78" cy="128" r="9" fill="url(#cheekBlush)" />

              {/* GAMZE'S EYES (Big, beautiful anime eyes with extra highlights and lovely lashes) */}
              <g id="gamze-eyes">
                {pose === "surprise" ? (
                  isCandleBlown ? (
                    // Closed/curved eyes of absolute ecstatic happiness after blowing!
                    <>
                      <path d="M 37,118 Q 44,110 51,118" fill="none" stroke="#b33663" strokeWidth="3.2" strokeLinecap="round" />
                      <path d="M 69,118 Q 76,110 83,118" fill="none" stroke="#b33663" strokeWidth="3.2" strokeLinecap="round" />
                    </>
                  ) : (
                    // Concentrated, focused wide eyes preparing to blow!
                    <>
                      <circle cx="44" cy="116" r="8.5" fill="#141724" />
                      <circle cx="42" cy="113" r="3.5" fill="#ffffff" />
                      <circle cx="46" cy="119" r="1.5" fill="#ffffff" />
                      <circle cx="76" cy="116" r="8.5" fill="#141724" />
                      <circle cx="74" cy="113" r="3.5" fill="#ffffff" />
                      <circle cx="78" cy="119" r="1.5" fill="#ffffff" />
                      {/* Lashes */}
                      <path d="M 36,112 Q 40,109 44,111" fill="none" stroke="#141724" strokeWidth="1.8" />
                      <path d="M 84,112 Q 80,109 76,111" fill="none" stroke="#141724" strokeWidth="1.8" />
                    </>
                  )
                ) : pose === "dance" || pose === "sit" ? (
                  // Closed eyes of pure romance & joy
                  <>
                    <path d="M 37,119 Q 44,111 51,119" fill="none" stroke="#d55883" strokeWidth="3.2" strokeLinecap="round" />
                    <path d="M 69,119 Q 76,111 83,119" fill="none" stroke="#d55883" strokeWidth="3.2" strokeLinecap="round" />
                  </>
                ) : (
                  // Extremely gorgeous, sparkling anime eyes
                  <>
                    {/* Left Eye */}
                    <circle cx="44" cy="118" r="8" fill="#141724" />
                    <circle cx="42" cy="115" r="3" fill="#ffffff" />
                    <circle cx="46" cy="120" r="1.2" fill="#ffffff" />
                    <path d="M 36,114 Q 40,111 44,113" fill="none" stroke="#141724" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Right Eye */}
                    <circle cx="76" cy="118" r="8" fill="#141724" />
                    <circle cx="74" cy="115" r="3" fill="#ffffff" />
                    <circle cx="78" cy="120" r="1.2" fill="#ffffff" />
                    <path d="M 84,114 Q 80,111 76,113" fill="none" stroke="#141724" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </g>

              {/* Elegant curved eyebrows */}
              <path d="M 36,105 Q 44,101 50,106" fill="none" stroke="#141724" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 70,105 Q 76,101 84,106" fill="none" stroke="#141724" strokeWidth="1.8" strokeLinecap="round" />

              {/* Little cute nose */}
              <path d="M 60,123 Q 59,126 61,126" fill="none" stroke="#e3a08b" strokeWidth="1.5" strokeLinecap="round" />

              {/* Interactive Sweet mouth */}
              <g id="gamze-mouth">
                {pose === "surprise" ? (
                  !isCandleBlown ? (
                    // Cute puckered blowing mouth (O shape) with little air wind lines blowing towards the cake
                    <>
                      <circle cx="60" cy="133" r="4.5" fill="none" stroke="#141724" strokeWidth="3" />
                      {/* Interactive blowing wind dashes reaching to her left */}
                      <path d="M 52,133 L 42,131 M 51,137 L 40,136" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
                    </>
                  ) : (
                    // Wide, joyous happy smile!
                    <path d="M 52,132 Q 60,144 68,132 Z" fill="#802a1e" />
                  )
                ) : (
                  // Sweet happy smile
                  <path d="M 53,132 Q 60,138 67,132" fill="none" stroke="#141724" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </g>

              {/* Lovely flowing hair with highlights and barrette */}
              <motion.g animate={hairSwayRight.animate}>
                {/* Main Hair Volume */}
                <path 
                  d="M 23,110 C 8,90 15,60 40,55 C 60,45 80,55 90,65 C 105,65 110,85 105,105 C 108,135 105,175 100,185 C 96,160 92,125 90,120 C 85,105 82,95 72,102 C 60,93 42,95 35,110 Z" 
                  fill="url(#gamzeHair)" 
                />
                {/* Flowing hair locks on shoulders */}
                <path d="M 24,105 C 15,120 12,160 18,185 C 20,165 25,140 28,125 Z" fill="url(#gamzeHair)" />

                {/* Soft hair strands highlight */}
                <path 
                  d="M 38,70 C 50,60 68,60 82,72" 
                  fill="none" 
                  stroke="#ffa6c5" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  opacity="0.45"
                />

                {/* Sparkling Golden Star Barrette */}
                <path 
                  d="M 86,75 L 89,78 L 93,78 L 90,81 L 91,85 L 88,83 L 85,85 L 86,81 L 83,78 L 87,78 Z" 
                  fill="#ffd54f" 
                />
              </motion.g>
            </g>

            {/* Gamze's Arms & Poses */}
            {pose === "surprise" ? (
              // Gamze holding her own beautiful birthday cake with candle!
              <g id="gamze-arms-surprise-holding">
                {/* Left arm reaching forward to support plate */}
                <path d="M 200,180 C 185,185 174,204 195,205" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                {/* Right arm reaching forward */}
                <path d="M 230,180 C 242,185 250,200 232,205" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="195" cy="205" r="5" fill="url(#gamzeSkin)" />
                <circle cx="232" cy="205" r="5" fill="url(#gamzeSkin)" />

                {/* The Romantic Miniature Birthday Cake */}
                <g transform="translate(176, 180)">
                  {/* Plate base */}
                  <path d="M -5,16 Q 26,24 57,16" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Cake layers */}
                  <rect x="0" y="8" width="52" height="15" rx="3" fill="#5d4037" /> {/* Chocolate base */}
                  <rect x="3" y="0" width="46" height="9" rx="2" fill="#fffde7" />  {/* Fluffy cream */}
                  <ellipse cx="26" cy="9" rx="23" ry="3.5" fill="#f48fb1" />        {/* Strawberry glaze */}

                  {/* Red sweet strawberries on top */}
                  <circle cx="12" cy="9" r="2.5" fill="#e91e63" />
                  <circle cx="26" cy="9" r="2.5" fill="#e91e63" />
                  <circle cx="40" cy="9" r="2.5" fill="#e91e63" />

                  {/* Candle */}
                  <line x1="26" y1="0" x2="26" y2="-6" stroke="#ff5252" strokeWidth="2.2" />

                  {/* Interactive Flame Core */}
                  {!isCandleBlown && (
                    <g className="animate-pulse">
                      <circle cx="26" cy="-9.5" r="5" fill="#ffd54f" />
                      <circle cx="26" cy="-9.5" r="2" fill="#ff6f00" />
                      {/* Dynamic light emission circles */}
                      <circle cx="26" cy="-9.5" r="9" fill="#ffd54f" opacity="0.3" />
                    </g>
                  )}
                </g>
              </g>
            ) : pose === "lantern" ? (
              // Releasing lantern: holding up left hand to lantern base
              <g id="gamze-arms-lantern">
                <path d="M 200,180 Q 170,165 162,155" fill="none" stroke="url(#gamzeDress)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 230,180 Q 240,195 235,215" fill="none" stroke="url(#gamzeDress)" strokeWidth="8" strokeLinecap="round" />
                <circle cx="162" cy="155" r="5" fill="url(#gamzeSkin)" />
                <circle cx="235" cy="215" r="5" fill="url(#gamzeSkin)" />
              </g>
            ) : pose === "stargaze" || pose === "final" ? (
              // Holding Hands with Hüseyin (Left hand reaches to center)
              <g id="gamze-arms-holding">
                <path d="M 200,180 Q 175,195 155,200" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 230,180 C 240,190 240,215 233,225" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="155" cy="200" r="5.5" fill="url(#gamzeSkin)" />
              </g>
            ) : (
              // Cozy resting posture
              <g id="gamze-arms-default">
                <path d="M 200,180 Q 185,195 195,215" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 230,180 Q 245,195 235,215" fill="none" stroke="url(#gamzeDress)" strokeWidth="8.5" strokeLinecap="round" />
                <circle cx="195" cy="215" r="5" fill="url(#gamzeSkin)" />
                <circle cx="235" cy="215" r="5" fill="url(#gamzeSkin)" />
              </g>
            )}
          </motion.g>
        </g>

        {/* ========================================== */}
        {/* INTERACTIVE SCENE-SPECIFIC OVERLAYS       */}
        {/* ========================================== */}
        
        {/* 1. Sky Lantern floating between them in 'lantern' pose */}
        {pose === "lantern" && (
          <motion.g
            initial={{ y: 25, opacity: 0.8 }}
            animate={{ y: [25, 15, 25], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            transform="translate(135, 125)"
          >
            {/* Soft Warm Light Glow */}
            <circle cx="15" cy="15" r="32" fill="url(#lanternGlow)" />
            
            {/* The paper lantern body */}
            <rect x="2" y="0" width="26" height="36" rx="3.5" fill="#ffd54f" opacity="0.95" />
            <path d="M 2,5 L 28,5 M 2,30 L 28,30" stroke="#ff8f00" strokeWidth="1" />
            <path d="M 15,36 L 15,46" stroke="#ff8f00" strokeWidth="1.6" />
            
            {/* Warm flame core */}
            <ellipse cx="15" cy="20" rx="4" ry="7.5" fill="#ff6f00" />
            <ellipse cx="15" cy="21" rx="2" ry="4" fill="#ffca28" />
          </motion.g>
        )}

        {/* 2. Cozy Shared Umbrella in "stargaze" pose */}
        {pose === "stargaze" && (
          <g id="umbrella" transform="translate(55, 15)">
            {/* Umbrella Pole */}
            <line x1="95" y1="65" x2="95" y2="180" stroke="#78909c" strokeWidth="3.5" />
            <path d="M 95,180 A 8,8 0 0,1 85,180" fill="none" stroke="#78909c" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Umbrella Canopy (Soft warm golden-orange gradient canopy) */}
            <path d="M 35,80 C 35,35 155,35 155,80 C 135,75 115,75 95,80 C 75,75 55,75 35,80 Z" fill="#d4af37" opacity="0.85" />
            <path d="M 35,80 Q 65,75 95,80 Q 125,75 155,80" fill="none" stroke="#b5843b" strokeWidth="1.5" />
            
            {/* Little star on top */}
            <circle cx="95" cy="40" r="4" fill="#ffd54f" />
          </g>
        )}
      </svg>
    </div>
  );
}

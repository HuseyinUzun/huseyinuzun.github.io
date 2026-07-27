/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, 
  Sparkles, Calendar, Heart, Clock, Compass, RotateCcw,
  MapPin, Camera, Home, Hourglass, Coffee
} from "lucide-react";
import confetti from "canvas-confetti";

import { StoryData } from "../types";
import { ambientAudio } from "../utils/ambientAudio";
import { sfx } from "../utils/soundEffects";

// Custom Sub-modules
import AnimatedCouple from "./AnimatedCouple";
import LivingEnvironment from "./LivingEnvironment";
import SkodaFabia from "./SkodaFabia";
import MemoryTrain from "./MemoryTrain";

interface FairytaleTheatreProps {
  storyData: StoryData;
  onToggleView: () => void;
}

export default function FairytaleTheatre({ storyData, onToggleView }: FairytaleTheatreProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlayingMovie, setIsPlayingMovie] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [selectedWagon, setSelectedWagon] = useState<number | null>(0);
  const [revealedDreams, setRevealedDreams] = useState<number[]>([]);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [windTrigger, setWindTrigger] = useState(0);
  const [elapsedTime, setElapsedTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const getDreamIcon = (id: number) => {
    switch (id) {
      case 1: return <Compass className="w-4 h-4" />;
      case 2: return <Camera className="w-4 h-4" />;
      case 3: return <Home className="w-4 h-4" />;
      case 4: return <Hourglass className="w-4 h-4" />;
      case 5: return <Coffee className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // References for autoplay timer loop
  const autoPlayTimerRef = useRef<any>(null);
  const scrollLockRef = useRef<boolean>(false);

  // High-precision scrollytelling: Wheel & Touch swipe detectors
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default browser scrolling jitter
      if (scrollLockRef.current) return;

      const threshold = 40; // Sensitivity threshold
      if (Math.abs(e.deltaY) < threshold) return;

      scrollLockRef.current = true;
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1500); // 1.5 second throttle lock to prevent accidental multiple skips

      if (e.deltaY > 0) {
        // Scroll down -> next scene
        setSceneIndex((prev) => {
          if (prev < 6) {
            sfx.playWindBreeze();
            return prev + 1;
          }
          return prev;
        });
        setIsPlayingMovie(false);
      } else {
        // Scroll up -> previous scene
        setSceneIndex((prev) => {
          if (prev > 0) {
            sfx.playWindBreeze();
            return prev - 1;
          }
          return prev;
        });
        setIsPlayingMovie(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollLockRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      const swipeThreshold = 50; // swipe pixels
      if (Math.abs(diffY) < swipeThreshold) return;

      scrollLockRef.current = true;
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1500);

      if (diffY > 0) {
        // Swipe up -> next scene
        setSceneIndex((prev) => {
          if (prev < 6) {
            sfx.playWindBreeze();
            return prev + 1;
          }
          return prev;
        });
        setIsPlayingMovie(false);
      } else {
        // Swipe down -> previous scene
        setSceneIndex((prev) => {
          if (prev > 0) {
            sfx.playWindBreeze();
            return prev - 1;
          }
          return prev;
        });
        setIsPlayingMovie(false);
      }
    };

    // Add listeners with non-passive support to allow e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Sound effects enabled state synced with general mute
  useEffect(() => {
    sfx.setEnabled(!isAudioMuted);
  }, [isAudioMuted]);

  // Handle auto-progress when isPlayingMovie is active
  useEffect(() => {
    if (isPlayingMovie) {
      autoPlayTimerRef.current = setInterval(() => {
        setSceneIndex((prev) => {
          if (prev >= 6) {
            setIsPlayingMovie(false);
            return 6;
          }
          // Play a gentle breeze sound effect on scene transition
          sfx.playWindBreeze();
          return prev + 1;
        });
      }, 11000); // 11 seconds per cinematic chapter
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlayingMovie]);

  // Sound effects triggered automatically based on scene entry
  useEffect(() => {
    if (sceneIndex === 1) {
      // Sakura Garden entry -> bird chirping
      setTimeout(() => sfx.playBirdChirp(), 1500);
    } else if (sceneIndex === 2) {
      // Memory Train entry -> whistle
      setTimeout(() => sfx.playTrainWhistle(), 1200);
    } else if (sceneIndex === 3 || sceneIndex === 4 || sceneIndex === 5 || sceneIndex === 6) {
      // Magical scenes -> warm chimes
      sfx.playMagic();
    }
  }, [sceneIndex]);

  // Real-time counter logic since relationship start (April 16, 2025)
  useEffect(() => {
    const startDate = new Date("2025-04-16T18:00:00").getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const diff = now - startDate;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setElapsedTime({ days, hours, minutes, seconds });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle ambient soundtrack music
  const toggleSoundtrack = () => {
    if (isAudioMuted) {
      ambientAudio.play();
      setIsAudioMuted(false);
    } else {
      ambientAudio.pause();
      setIsAudioMuted(true);
    }
  };

  // Next and Previous scene controls
  const handleNextScene = () => {
    setIsPlayingMovie(false);
    sfx.playWindBreeze();
    setSceneIndex((prev) => Math.min(6, prev + 1));
  };

  const handlePrevScene = () => {
    setIsPlayingMovie(false);
    sfx.playWindBreeze();
    setSceneIndex((prev) => Math.max(0, prev - 1));
  };

  // Scene names for the timeline tracker
  const scenesInfo = [
    { name: "Sonsuz Gece", desc: "Aşkın İlk Adımı" },
    { name: "Millet Bahçesi", desc: "Çay ve Tatlı Sürprizi" },
    { name: "Zaman Treni", desc: "Geçmiş Anılar" },
    { name: "Yıldönümü", desc: "Göksel Aşk" },
    { name: "Bulut Üstünde", desc: "Gelecek Hayalleri" },
    { name: "Sonsuz Hikaye", desc: "Gökyüzüne Yürüyüş" },
    { name: "Doğum Günü", desc: "Hüseyin'den Sürpriz" }
  ];

  // Specific Action: Blow Birthday Candle
  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    setIsCandleBlown(true);
    sfx.playMagic();
    
    // Shoot spectacular fairytale confetti
    const end = Date.now() + 2 * 1000;
    const colors = ["#ffb0cd", "#ffd54f", "#d4af37", "#ba68c8"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Specific Action: Reveal a Dream Lantern
  const handleRevealDream = (id: number) => {
    if (revealedDreams.includes(id)) return;
    setRevealedDreams((prev) => [...prev, id]);
    sfx.playMagic();
  };

  // Reset the interactive birthday scene candle if toggling out
  useEffect(() => {
    if (sceneIndex !== 6) {
      setIsCandleBlown(false);
    }
  }, [sceneIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030508] text-white flex flex-col font-sans select-none">
      
      {/* Dynamic atmospheric ambient lighting backing synced to active scene */}
      <div className="absolute inset-0 transition-all duration-1000 pointer-events-none z-0">
        <div className={`absolute inset-0 opacity-40 transition-all duration-1000 ${
          sceneIndex === 0 ? "bg-radial-gradient from-luxury-bordeaux/25 via-transparent to-transparent blur-[120px]" :
          sceneIndex === 1 ? "bg-radial-gradient from-pink-950/20 via-transparent to-transparent blur-[120px]" :
          sceneIndex === 2 ? "bg-radial-gradient from-blue-950/20 via-transparent to-transparent blur-[120px]" :
          sceneIndex === 3 ? "bg-radial-gradient from-amber-950/20 via-transparent to-transparent blur-[120px]" :
          sceneIndex === 4 ? "bg-radial-gradient from-indigo-950/20 via-transparent to-transparent blur-[120px]" :
          sceneIndex === 5 ? "bg-radial-gradient from-orange-950/15 via-transparent to-transparent blur-[120px]" :
          "bg-radial-gradient from-[#220c1e]/30 via-transparent to-transparent blur-[150px]"
        }`} />
      </div>

      {/* Living Environment Layer (Canvas particles like fireflies, sakura, balloons) */}
      <LivingEnvironment sceneIndex={sceneIndex} revealedDreams={revealedDreams} dreams={storyData.dreams} windTrigger={windTrigger} />

      {/* 1. CINEMATIC TOP BAR BRAND HUD */}
      <header className="relative z-30 w-full px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold">
              BİZİM MASALIMIZ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-pulse" />
          </div>
          <span className="font-serif italic text-xs md:text-sm text-white/50 tracking-wider">
            Hüseyin & Gamze'nin Romantik Sineması
          </span>
        </div>

        {/* Cinematic Chapter / Timeline Progress HUD */}
        <div className="hidden lg:flex items-center gap-4">
          {scenesInfo.map((sc, idx) => (
            <div key={idx} className="flex items-center">
              <button 
                onClick={() => {
                  sfx.playWindBreeze();
                  setSceneIndex(idx);
                  setIsPlayingMovie(false);
                }}
                className={`flex flex-col items-center group transition-all duration-300 ${
                  sceneIndex === idx ? "text-gold-300 scale-105" : "text-white/30 hover:text-white/70"
                }`}
              >
                <span className="font-mono text-[9px] mb-1">0{idx + 1}</span>
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  sceneIndex === idx ? "border-gold-300 bg-gold-400/10" : "border-white/20 group-hover:border-white/50"
                }`}>
                  {sceneIndex === idx && <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                </div>
                <span className="font-mono text-[8px] uppercase tracking-wider mt-1 scale-90 opacity-0 group-hover:opacity-100 transition-opacity">
                  {sc.name.split(" ")[0]}
                </span>
              </button>
              {idx < 6 && <div className="w-8 h-[1px] bg-white/10 mx-1" />}
            </div>
          ))}
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleView}
            className="px-4 py-2 rounded-full border border-gold-400/30 text-[9px] uppercase tracking-[0.15em] text-gold-300 hover:bg-gold-400/15 hover:border-gold-300 transition-all font-bold flex items-center gap-1.5 cursor-pointer"
          >
            📖 Aşk Defteri
          </button>

          <button
            onClick={toggleSoundtrack}
            className={`px-4 py-2 rounded-full border text-[9px] uppercase tracking-[0.15em] transition-all duration-500 font-bold flex items-center gap-1.5 ${
              isAudioMuted 
                ? "bg-black/60 border-white/15 text-white/60 hover:text-gold-300 hover:border-gold-400/40" 
                : "bg-gold-400 border-gold-300 text-luxury-black hover:bg-gold-500 scale-105 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
            }`}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                MÜZİK: KAPALI
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                MÜZİK: AKTİF
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. THE MAIN CINEMA STAGE CONTAINER */}
      <main className="flex-grow w-full relative flex items-center justify-center px-4 md:px-12 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-5xl h-full flex flex-col justify-center relative"
          >
            
            {/* BACKGROUND VECTOR LANDSCAPES DESIGNED NATIVELY WITH SVG FOR EACH SAHNE */}
            
            {/* SCENE 0: 🌙 GECE LANDSCAPE */}
            {sceneIndex === 0 && (
              <div className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden">
                <svg width="100%" height="240" viewBox="0 0 1000 240" className="opacity-30 absolute bottom-0">
                  {/* Soft hills silhouettes */}
                  <path d="M 0,200 Q 250,150 500,200 Q 750,250 1000,180 L 1000,240 L 0,240 Z" fill="#080c14" />
                  <path d="M 0,220 Q 350,180 700,220 Q 850,240 1000,210 L 1000,240 L 0,240 Z" fill="#05070a" />
                  {/* Street lamp post */}
                  <line x1="200" y1="50" x2="200" y2="240" stroke="#1f2937" strokeWidth="4" />
                  <circle cx="200" cy="50" r="12" fill="#ffd54f" className="animate-pulse" />
                  <polygon points="170,240 200,50 230,240" fill="url(#lampLight)" opacity="0.12" />
                  <defs>
                    <linearGradient id="lampLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffd54f" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* SCENE 1: 🌿 MİLLET BAHÇESİ LANDSCAPE */}
            {sceneIndex === 1 && (
              <div className="absolute inset-0 pointer-events-none flex items-end justify-between overflow-hidden">
                {/* Beautiful garden branch reaching down from top left */}
                <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
                  <path d="M 0,0 Q 180,60 140,140 Q 210,130 280,100 Q 320,160 370,140" fill="none" stroke="#223322" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 140,140 Q 120,200 90,250" fill="none" stroke="#223322" strokeWidth="4.5" />
                  {/* Hanging green & gold foliage lines */}
                  <path d="M 140,140 C 140,180 130,200 135,240" fill="none" stroke="#4caf50" strokeWidth="2" strokeDasharray="4 8" />
                  <path d="M 190,130 C 195,170 180,210 185,250" fill="none" stroke="#deb766" strokeWidth="1.5" strokeDasharray="3 6" />
                  <path d="M 230,115 C 235,160 225,190 230,230" fill="none" stroke="#81c784" strokeWidth="2.5" strokeDasharray="4 8" />
                  
                  {/* Cozy Çorum full golden moon */}
                  <circle cx="850" cy="140" r="110" fill="#fcd34d" opacity="0.08" />
                  <circle cx="850" cy="140" r="120" fill="#fcd34d" opacity="0.04" className="animate-pulse" />

                  {/* Çorum Clock Tower (Saat Kulesi) Silhouette in the distance */}
                  <g opacity="0.18" transform="translate(815, 30) scale(0.95)">
                    {/* Tower base */}
                    <rect x="15" y="80" width="16" height="120" fill="#475569" />
                    {/* Intermediate balconies */}
                    <rect x="11" y="80" width="24" height="4" fill="#64748b" />
                    <rect x="11" y="115" width="24" height="4" fill="#64748b" />
                    {/* Upper octagonal tower segment */}
                    <path d="M 16,35 L 30,35 L 28,80 L 18,80 Z" fill="#334155" />
                    {/* Clock dome area */}
                    <circle cx="23" cy="30" r="8" fill="#475569" />
                    <circle cx="23" cy="30" r="3" fill="#ffd34d" className="animate-pulse" /> {/* Glowing clock face */}
                    {/* Top spire/crescent */}
                    <line x1="23" y1="22" x2="23" y2="6" stroke="#475569" strokeWidth="1.5" />
                  </g>

                  {/* Romantic Car Silhouette on the side representing the Millet Bahçesi memory */}
                  <g transform="translate(450, 150) scale(0.65)" opacity="0.5">
                    {/* Road line */}
                    <line x1="-50" y1="95" x2="280" y2="95" stroke="#475569" strokeWidth="1" />
                    {/* Wheels */}
                    <circle cx="50" cy="95" r="16" fill="#0f172a" />
                    <circle cx="170" cy="95" r="16" fill="#0f172a" />
                    {/* Car body */}
                    <path d="M 10,75 L 35,75 Q 50,45 80,45 L 140,45 Q 160,45 175,75 L 210,75 C 220,75 220,95 210,95 L 10,95 C 0,95 0,75 10,75 Z" fill="#1e293b" />
                    {/* Warm light coming from car interior */}
                    <path d="M 52,70 L 80,50 L 125,50 L 138,70 Z" fill="#fde047" opacity="0.3" />
                    {/* Steam from tea glasses */}
                    <path d="M 215,65 Q 212,55 215,48" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
                    <circle cx="215" cy="70" r="3" fill="#ea580c" opacity="0.7" /> {/* Warm tea glass */}
                  </g>
                </svg>
              </div>
            )}

            {/* SCENE 2: 🚂 HATIRALAR (MINI TRAIN) LANDSCAPE */}
            {sceneIndex === 2 && (
              <div className="absolute inset-0 pointer-events-none flex items-end overflow-hidden">
                {/* Railroad track silhouette across clouds */}
                <svg width="100%" height="160" className="absolute bottom-6 opacity-20">
                  <line x1="0" y1="120" x2="2000" y2="120" stroke="#94a3b8" strokeWidth="4" />
                  <line x1="0" y1="130" x2="2000" y2="130" stroke="#94a3b8" strokeWidth="4" />
                  {/* Railroad sleepers */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <line key={i} x1={i * 80} y1="115" x2={i * 80 + 20} y2="135" stroke="#475569" strokeWidth="4.5" />
                  ))}
                </svg>
              </div>
            )}

            {/* SCENE 3: 💍 YILDÖNÜMÜ LANDSCAPE */}
            {sceneIndex === 3 && (
              <div className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden">
                {/* Cosmic Bench Silhouette facing a lake */}
                <svg width="100%" height="280" viewBox="0 0 1000 280" className="opacity-30 absolute bottom-0">
                  {/* Lakeside ground contour */}
                  <path d="M 0,240 Q 500,210 1000,240 L 1000,280 L 0,280 Z" fill="#04060b" />
                  <path d="M 0,255 Q 500,230 1000,255 L 1000,280 L 0,280 Z" fill="#020306" />
                  
                  {/* Romantic Garden Swing/Bench */}
                  <g transform="translate(380, 110)">
                    {/* Frame poles */}
                    <line x1="30" y1="10" x2="10" y2="135" stroke="#475569" strokeWidth="4" />
                    <line x1="210" y1="10" x2="230" y2="135" stroke="#475569" strokeWidth="4" />
                    <line x1="30" y1="10" x2="210" y2="10" stroke="#475569" strokeWidth="5" />
                    {/* Hanger ropes */}
                    <line x1="70" y1="10" x2="75" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="170" y1="10" x2="165" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                    {/* Bench seat */}
                    <rect x="60" y="95" width="120" height="8" rx="2" fill="#1e293b" />
                    <rect x="60" y="80" width="8" height="20" rx="1" fill="#1e293b" />
                    <rect x="172" y="80" width="8" height="20" rx="1" fill="#1e293b" />
                  </g>
                </svg>
              </div>
            )}

            {/* SCENE 4: 🎠 GELECEK LANDSCAPE */}
            {sceneIndex === 4 && (
              <div className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden">
                {/* Fluffy white clouds silhouettes stacked at the bottom */}
                <svg width="100%" height="200" className="absolute bottom-0 opacity-40">
                  <path d="M 0,180 C 100,140 250,140 350,180 C 450,150 600,150 700,180 C 800,140 950,140 1050,180 L 1050,200 L 0,200 Z" fill="#1e1e38" />
                  <path d="M -50,190 C 80,160 210,160 300,190 C 400,170 550,170 650,190 C 780,160 920,160 1050,190 L 1050,200 L -50,200 Z" fill="#0d0d1f" />
                </svg>
              </div>
            )}

            {/* SCENE 5: 🌌 FINAL LANDSCAPE */}
            {sceneIndex === 5 && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                {/* Beautiful star path leading upwards to a shining nebula heart */}
                <svg width="100%" height="100%" className="absolute inset-0 opacity-25">
                  <path d="M 500,600 Q 420,400 500,200" fill="none" stroke="url(#starBridge)" strokeWidth="6" strokeDasharray="5 15" />
                  <defs>
                    <linearGradient id="starBridge" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#25162a" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#ffd54f" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* SCENE 6: 🎈 DOĞUM GÜNÜ LANDSCAPE */}
            {sceneIndex === 6 && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden">
                {/* Hanging bulb decoration lines at the top */}
                <svg width="100%" height="80" className="opacity-50">
                  <path d="M 0,20 Q 250,50 500,20 Q 750,50 1000,20" fill="none" stroke="#475569" strokeWidth="1.5" />
                  {/* Floating string lights */}
                  {[100, 250, 400, 600, 750, 900].map((cx, i) => (
                    <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                      <circle cx={cx} cy={cx % 150 === 0 ? 35 : 43} r="7" fill="#ffe082" />
                      <circle cx={cx} cy={cx % 150 === 0 ? 35 : 43} r="14" fill="#ffe082" opacity="0.25" />
                    </g>
                  ))}
                </svg>
              </div>
            )}


            {/* THE CONTENT GRID: poetics on one side, characters on the other */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center min-h-[50vh] px-4">
              
              {/* LEFT HALF: THE STORY TEXT & POETICS */}
              <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-20">
                
                {/* Category/Chapter badge */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 justify-center lg:justify-start text-gold-400 text-[10px] uppercase tracking-[0.3em] font-extrabold mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                  BÖLÜM 0{sceneIndex + 1}: {scenesInfo[sceneIndex].name}
                </motion.div>

                {/* Main Poetic Dialogue */}
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white font-light mb-6"
                >
                  {sceneIndex === 0 && (
                    <>Her şey bir <span className="italic text-gold-200 border-b border-gold-400/20">Gülüşle</span> başladı...</>
                  )}
                  {sceneIndex === 1 && (
                    <>Millet Bahçesi'nde <span className="italic text-amber-300">Tatlı Bir Çay</span> Saati</>
                  )}
                  {sceneIndex === 2 && (
                    <>Güzel Hatıralar <span className="italic text-blue-300">Trenimiz</span></>
                  )}
                  {sceneIndex === 3 && (
                    <>Yıldızların <span className="italic text-indigo-300">Aşk</span> İmzası</>
                  )}
                  {sceneIndex === 4 && (
                    <>Bulutların Üstündeki <span className="italic text-orange-300">Düşlerimiz</span></>
                  )}
                  {sceneIndex === 5 && (
                    <>Sonsuz Aşkın <span className="italic text-gold-200">Kubbeleri</span></>
                  )}
                  {sceneIndex === 6 && (
                    <>Doğduğun Gün <span className="italic text-amber-300">Dünya</span> Parladı</>
                  )}
                </motion.h2>

                {/* Secondary Poetic Story paragraph */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1.0 }}
                  transition={{ delay: 0.6 }}
                  className="font-serif italic text-sm md:text-base lg:text-lg text-gold-50 leading-relaxed font-light mb-8 max-w-xl"
                >
                  {sceneIndex === 0 && "Hüseyin ve Gamze ilk kez konuşmaya başladığında gökyüzünde parlayan her yıldız, bizim en tatlı kelimelerimizin birer düğümü oldu. Göz göze geldiğimiz o ilk saniye zaman durdu."}
                  {sceneIndex === 1 && "Çorum Millet Bahçesi'nin huzur veren esintisinde, aşkımızın en sıcak hatıralarından birini yazdık. Ben sıcacık demli çayları getirmiştim, sen ise ellerinle yaptığın o nefis tatlıyı hazırlamıştın. Yapraklar gökyüzünde rüzgarla dans ederken, sevgiyle tatlanan sohbetimiz eşliğinde çaylarımızı yudumladık ve birbirimizin gözlerinde kaybolduk."}
                  {sceneIndex === 2 && "Anılarımızın büyülü trenine atladık. Her vagonda hayatımızın en özel dönüm noktaları parlıyor: İlk sohbetimiz, ilk buluşmamız, ilk fotoğrafımız, nişanımız, nikahımız ve yaklaşan düğünümüz... Hepsi aşkımızın sarsılmaz temelleri."}
                  {sceneIndex === 3 && "21 Ağustos düğün günümüze doğru yürürken, aynı bankta birbirimize yaslanıyoruz. Gökyüzü sessizce dönüyor ve binlerce kayan yıldız gök kubbede aşktan kocaman bir kalp oluşturuyor."}
                  {sceneIndex === 4 && "Dileklerimizi uçan fenerlerle gökyüzüne fısıldıyoruz. Her fener, geleceğimize ait sıcak bir hayal... Sabah kahvelerimiz, yeni şehirlerimiz, huzur dolu yuvamız ve birlikte yaşlanma sözümüz."}
                  {sceneIndex === 5 && "El ele, sonsuz gökyüzünün zirvesine, yıldızların ötesine yürüyoruz. Arkamızda bıraktığımız her adım, sevgimizle parıldayan gök adalarına dönüşüyor. Sen benim en güzel masalımsın."}
                  {sceneIndex === 6 && "11 Ağustos... Hayatıma girdiğin, dünyayı daha yaşanılası bir yer yaptığın o muhteşem doğum günün. Gamze kalbindeki tüm dileklerle bu tatlı pastanın mumlarını üflüyor, Hüseyin ise aşkla ona eşlik ediyor sevgilim."}
                </motion.p>

                {/* INTERACTIVE SCENE-SPECIFIC CONTROL BUTTONS & WIDGETS */}
                <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start w-full">
                  
                  {/* Scene 0 Action: Make Shooting Star */}
                  {sceneIndex === 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sfx.playMagic();
                        confetti({ particleCount: 30, colors: ["#D4AF37", "#FFFFFF"], origin: { y: 0.4 } });
                      }}
                      className="px-6 py-3 rounded-full border border-gold-400/30 text-xs tracking-widest uppercase text-gold-300 hover:bg-gold-400/10 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-gold-400" /> Yıldız Kaydır
                    </motion.button>
                  )}

                  {/* Scene 1 Action: Gentle Breeze */}
                  {sceneIndex === 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sfx.playWindBreeze();
                        sfx.playBirdChirp();
                        setWindTrigger((prev) => prev + 1);
                      }}
                      className="px-6 py-3 rounded-full border border-pink-400/30 text-xs tracking-widest uppercase text-pink-300 hover:bg-pink-400/10 transition-colors flex items-center gap-2"
                    >
                      <Compass className="w-4 h-4 text-pink-400" /> Çiçekleri Estir
                    </motion.button>
                  )}

                  {/* Scene 2 Action: Train Whistle */}
                  {sceneIndex === 2 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sfx.playTrainWhistle();
                        confetti({ particleCount: 20, colors: ["#60a5fa", "#ffffff"], origin: { y: 0.4 } });
                      }}
                      className="px-6 py-3 rounded-full border border-blue-400/30 text-xs tracking-widest uppercase text-blue-300 hover:bg-blue-400/10 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-blue-400" /> Hatıra Trenini Selamla
                    </motion.button>
                  )}

                  {/* Scene 3 Action: Beating Constellation (Yıldönümü - formerly Scene 4) */}
                  {sceneIndex === 3 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sfx.playMagic();
                        // Heart fireworks Confetti
                        confetti({
                          particleCount: 50,
                          spread: 60,
                          colors: ["#ea580c", "#ff007f", "#9333ea"]
                        });
                      }}
                      className="px-6 py-3 rounded-full border border-indigo-400/30 text-xs tracking-widest uppercase text-indigo-300 hover:bg-indigo-400/10 transition-colors flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-indigo-400 fill-current animate-ping" /> Kalbi Ateşle
                    </motion.button>
                  )}

                  {/* Scene 4 Action: Sky Wishes Constellation buttons (Bulut Üstünde - formerly Scene 5) */}
                  {sceneIndex === 4 && (
                    <div className="flex flex-col gap-4 w-full bg-[#0a0a14]/75 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-gold-400/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-orange-300">Düşlerimizin Dilek Kubbesi</span>
                      </div>
                      <p className="text-[11px] text-slate-200 font-sans leading-relaxed">
                        Geleceğe fısıldamak istediğiniz hayalimizin üzerine dokunarak gökyüzüne bir dilek feneri salın:
                      </p>
                      <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                        {storyData.dreams.map((dr) => {
                          const isRevealed = revealedDreams.includes(dr.id);
                          return (
                            <button
                              key={dr.id}
                              onClick={() => handleRevealDream(dr.id)}
                              className={`px-4 py-2.5 rounded-xl border text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                isRevealed
                                  ? "bg-gradient-to-r from-orange-500/20 to-amber-500/15 border-orange-400/60 text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.3)] font-semibold"
                                  : "bg-[#06060c]/50 border-white/10 text-slate-300 hover:border-orange-400/40 hover:text-white hover:bg-orange-500/5"
                              }`}
                            >
                              <span className={isRevealed ? "text-orange-400 animate-pulse" : "text-slate-400"}>
                                {getDreamIcon(dr.id)}
                              </span>
                              {dr.title.replace("✦", "").trim()}
                              {isRevealed && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Scene 5 Action: Endless Story - Write love to sky (Sonsuz Hikaye) */}
                  {sceneIndex === 5 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sfx.playMagic();
                        confetti({
                          particleCount: 45,
                          spread: 80,
                          colors: ["#ffd54f", "#e0a96d", "#ffffff", "#f0788c"],
                          origin: { y: 0.45 }
                        });
                      }}
                      className="px-6 py-3 rounded-full border border-amber-400/30 text-xs tracking-widest uppercase text-amber-300 hover:bg-amber-400/10 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Sonsuzluğa Adım At
                    </motion.button>
                  )}

                  {/* Scene 6 Action: Blow Birthday Candle (Doğum Günü - formerly Scene 3) */}
                  {sceneIndex === 6 && (
                    <div className="flex flex-col gap-3 w-full bg-gradient-to-br from-[#0c0514]/80 to-[#12081f]/80 backdrop-blur-md p-5 rounded-2xl border border-purple-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-pink-300">Hüseyin'den Sürpriz Pastamız</span>
                      </div>
                      
                      <p className="text-[11.5px] text-slate-200 font-sans leading-relaxed">
                        {!isCandleBlown 
                          ? "Sevgilim, kalbinden geçen en güzel dileği tut ve pastanın üzerindeki mumu üflemek için aşağıdaki sihirli butona dokun..."
                          : "İyi ki doğdun biriciğim! Tuttuğun tüm güzel dileklerin gerçeğe dönüşsün, her günümüz sevgiyle, huzurla ve yan yana geçsin. Seni çok seviyorum!"
                        }
                      </p>

                      <div className="flex justify-center lg:justify-start mt-1">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: isCandleBlown ? "0 0 20px rgba(16,185,129,0.2)" : "0 0 20px rgba(217,119,6,0.2)" }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isCandleBlown}
                          onClick={handleBlowCandle}
                          className={`px-6 py-3.5 rounded-full border text-xs font-bold tracking-widest uppercase transition-all duration-500 flex items-center gap-2.5 cursor-pointer shadow-lg ${
                            isCandleBlown 
                               ? "bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border-emerald-500/40 text-emerald-200" 
                               : "bg-gradient-to-r from-amber-500/10 to-pink-500/5 border-amber-400/40 text-amber-200 hover:border-pink-400/60"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isCandleBlown ? "fill-current text-emerald-400 animate-bounce" : "text-amber-400 animate-pulse"}`} />
                          <span>{isCandleBlown ? "Mumlar Üflendi! 🎉" : "Mumu Üfle & Dilek Tut"}</span>
                        </motion.button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Explanatory Dream Bubble when selected (for Scene 4) */}
                {sceneIndex === 4 && revealedDreams.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-[#120703]/90 to-[#220e03]/80 border border-orange-500/30 text-white shadow-2xl relative overflow-hidden max-w-md backdrop-blur-md"
                  >
                    {/* Decorative tiny corner lights */}
                    <div className="absolute top-3 right-4 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-orange-400/80 uppercase font-bold">Uçuruldu ✦</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    
                    <h4 className="font-serif italic text-base text-orange-200 mb-2.5 flex items-center gap-2 font-semibold">
                      <span>{getDreamIcon(revealedDreams[revealedDreams.length - 1])}</span>
                      <span>{storyData.dreams.find(d => d.id === revealedDreams[revealedDreams.length - 1])?.title.replace("✦", "").trim()}</span>
                    </h4>
                    
                    <p className="font-serif italic text-sm text-slate-100 leading-relaxed font-light mb-3">
                      &ldquo;{storyData.dreams.find(d => d.id === revealedDreams[revealedDreams.length - 1])?.description}&rdquo;
                    </p>
                    
                    <p className="font-sans text-[11px] text-orange-300/90 tracking-wide mt-3 border-t border-orange-500/10 pt-2.5 flex items-center gap-1">
                      <span>✨</span>
                      <span>Bu tatlı dilek fenerimiz şimdi gök kubbede diğer yıldızlarımızın arasında süzülüyor...</span>
                    </p>
                  </motion.div>
                )}

              </div>


              {/* RIGHT HALF: CHARACTER ANIMATIONS & STAGE PROPS */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[280px]">
                
                {/* 3D-Vector Expressive Couple component */}
                {sceneIndex !== 2 && (
                  <AnimatedCouple 
                    pose={
                      sceneIndex === 0 ? "stargaze" :
                      sceneIndex === 1 ? "dance" :
                      sceneIndex === 3 ? "sit" :
                      sceneIndex === 4 ? "lantern" :
                      sceneIndex === 5 ? "final" : "surprise"
                    } 
                    isCandleBlown={isCandleBlown}
                  />
                )}

                {/* 2015 Skoda Fabia Hatchback for Scene 1 (Millet Bahçesi) */}
                {sceneIndex === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 25, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 18 }}
                    className="w-full flex justify-center z-20 mt-1"
                  >
                    <SkodaFabia />
                  </motion.div>
                )}

                {/* SCENE 2 (ZAMAN TRENİ) - NEW HIGH FIDELITY MEMORY TRAIN */}
                {sceneIndex === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col items-center z-30"
                  >
                    <MemoryTrain 
                      timeline={storyData.timeline}
                      selectedWagon={selectedWagon}
                      onSelectWagon={(idx) => {
                        setSelectedWagon(idx);
                      }}
                    />

                    {/* Extended Wagon Memory Diary Card */}
                    <AnimatePresence mode="wait">
                      {selectedWagon !== null && (
                        <motion.div
                          key={selectedWagon}
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 15 }}
                          transition={{ type: "spring", damping: 20, duration: 0.4 }}
                          className="w-full max-w-md mt-5 p-5 rounded-2xl bg-gradient-to-br from-[#0c0d1e]/95 to-[#161a35]/90 border border-blue-400/20 text-white z-40 relative backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
                        >
                          {/* Decorative mini stars */}
                          <div className="absolute top-3.5 right-12 text-yellow-400/40 text-[10px] animate-pulse">
                            ✦ ✨
                          </div>

                          <button 
                            onClick={() => {
                              setSelectedWagon(null);
                              sfx.playMagic();
                            }}
                            className="absolute top-3 right-4 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs px-2.5 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                          >
                            ✕ kapat
                          </button>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold">
                              {storyData.timeline[selectedWagon].date}
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
                          </div>

                          <h4 className="font-serif italic text-base text-amber-200 mb-2.5 leading-tight font-semibold flex items-center gap-2">
                            <span className="text-amber-400">✨</span>
                            {storyData.timeline[selectedWagon].title}
                          </h4>
                          
                          <p className="text-xs text-slate-200 leading-relaxed font-sans font-light bg-black/30 p-3.5 rounded-xl border border-white/5">
                            {storyData.timeline[selectedWagon].description}
                          </p>

                          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-amber-400/70 font-serif italic justify-end">
                            <span>Bir ömür boyu el ele...</span>
                            <span>❤️</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* SCENE 6 OVERLAY: The ultimate constellation text and Astronomical Clock */}
                {sceneIndex === 6 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                    
                    {/* Glowing constellational title spelling the letter climax message */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 1], scale: [0.9, 1, 1.02] }}
                      transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute top-[-50px] w-full"
                    >
                      <h3 className="font-serif text-3xl md:text-5xl text-gold-300 tracking-wide gold-glow leading-tight italic px-4">
                        "Sen benim en güzel hikâyemsin."
                      </h3>
                      {/* Magical stars forming line */}
                      <div className="flex items-center justify-center gap-1 mt-2 text-gold-400/40 text-xs">
                        <span>✦</span>
                        <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent to-gold-400/40" />
                        <span>G & H</span>
                        <div className="w-16 h-[0.5px] bg-gradient-to-l from-transparent to-gold-400/40" />
                        <span>✦</span>
                      </div>
                    </motion.div>

                    {/* Integrated Astronomical Clock Widget */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ delay: 1.8 }}
                      className="absolute -bottom-[100px] w-full max-w-sm p-4 rounded-xl border border-gold-400/10 bg-black/50 backdrop-blur-md"
                    >
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-400/60 block mb-2">
                        BİRLİKTE GEÇEN MASALSI SÜREMİZ
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="flex flex-col">
                          <span className="font-serif text-2xl text-white">{elapsedTime.days}</span>
                          <span className="font-mono text-[7px] uppercase text-white/40">GÜN</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif text-2xl text-white">{elapsedTime.hours}</span>
                          <span className="font-mono text-[7px] uppercase text-white/40">SAAT</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif text-2xl text-white">{elapsedTime.minutes}</span>
                          <span className="font-mono text-[7px] uppercase text-white/40">DAKİKA</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif text-2xl text-gold-300 animate-pulse">{elapsedTime.seconds}</span>
                          <span className="font-mono text-[7px] uppercase text-gold-300/60">SANİYE</span>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                )}

              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM INTEGRATED CINEMATIC PLAYER PANEL */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
        
        {/* Left half: Movie playback progress and descriptions */}
        <div className="flex flex-col md:items-start text-center md:text-left gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 font-bold">
            {isPlayingMovie ? "✦ SİNEMA MODU: FİLM OYNATILIYOR..." : "✦ MANUEL KEŞFET MODU"}
          </span>
          <p className="text-xs text-white/50 font-serif italic">
            {sceneIndex < 6 
              ? `Sıradaki Bölüm: 0${sceneIndex + 2} — ${scenesInfo[sceneIndex + 1].name}`
              : "Sonsuz Sevgilerimizle — Film Sonu"
            }
          </p>
        </div>

        {/* Center: Movie Playback Core Controls */}
        <div className="flex items-center gap-4">
          
          {/* Previous Scene Button */}
          <button
            onClick={handlePrevScene}
            disabled={sceneIndex === 0}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            title="Önceki Bölüm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* PLAY/PAUSE THE CINEMATIC FILM */}
          <button
            onClick={() => {
              sfx.playWindBreeze();
              setIsPlayingMovie(!isPlayingMovie);
            }}
            className={`px-6 py-3 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              isPlayingMovie 
                ? "bg-white text-black hover:bg-white/80" 
                : "bg-gold-400 text-luxury-black hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.35)]"
            }`}
          >
            {isPlayingMovie ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                FİLMİ DURDUR
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                FİLMİ OYNAT
              </>
            )}
          </button>

          {/* Next Scene Button */}
          <button
            onClick={handleNextScene}
            disabled={sceneIndex === 6}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            title="Sonraki Bölüm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Right half: Reset/Loop or Quick actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sfx.playWindBreeze();
              setSceneIndex(0);
              setIsPlayingMovie(false);
            }}
            className="px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all text-[9px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> BAŞA DÖN
          </button>
        </div>

      </footer>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Heart, 
  MessageCircle, 
  Coffee, 
  Camera, 
  Sparkles, 
  Gift, 
  Smile, 
  MapPin 
} from "lucide-react";
import { TimelineEvent } from "../types";
import { useState } from "react";

// Robust icon resolver
function getTimelineIcon(name: string) {
  const css = "w-5 h-5 text-gold-300";
  switch (name) {
    case "Heart": return <Heart className={css} />;
    case "MessageCircle": return <MessageCircle className={css} />;
    case "Coffee": return <Coffee className={css} />;
    case "Camera": return <Camera className={css} />;
    case "Sparkles": return <Sparkles className={css} />;
    case "Gift": return <Gift className={css} />;
    case "Smile": return <Smile className={css} />;
    default: return <Heart className={css} />;
  }
}

// Gorgeous fallback graphic when actual physical image is not found or empty
export function ImageWithPlaceholder({
  src,
  alt,
  index,
  className = ""
}: {
  src: string;
  alt: string;
  index: number;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  // High-end procedural vector graphics designed based on wedding and stellar themes
  const getFallbackGraphic = (idx: number) => {
    const gradients = [
      "from-luxury-navy via-luxury-bordeaux/30 to-luxury-black",
      "from-luxury-black via-luxury-indigo/30 to-luxury-navy",
      "from-luxury-navy via-luxury-purple/30 to-luxury-black",
      "from-luxury-black via-luxury-bordeaux/40 to-luxury-navy",
      "from-luxury-navy via-luxury-purple/40 to-luxury-black",
      "from-luxury-black via-luxury-indigo/45 to-luxury-navy",
      "from-luxury-navy via-luxury-bordeaux/30 to-luxury-purple"
    ];
    
    const grad = gradients[idx % gradients.length];
    
    return (
      <div className={`w-full h-full bg-gradient-to-br ${grad} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none`}>
        {/* Abstract glowing core */}
        <div className="absolute w-40 h-40 rounded-full bg-gold-400/5 blur-2xl animate-gold-pulse" />
        
        {/* Golden fine lines pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#deb766" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50%" cy="50%" r="15%" fill="none" stroke="#deb766" strokeWidth="1" />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#deb766" strokeWidth="0.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#deb766" strokeWidth="0.5" />
        </svg>

        {/* Dynamic floating sparkles */}
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-60 animate-gold-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-gold-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gold-400 rounded-full opacity-50 animate-gold-pulse" style={{ animationDelay: "2s" }} />

        {/* Minimal Icon Overlay */}
        <div className="w-12 h-12 rounded-full bg-gold-950/40 border border-gold-500/20 flex items-center justify-center mb-3 shadow-inner z-10">
          <Heart className="w-5 h-5 text-gold-300/80 animate-pulse" />
        </div>

        <p className="font-serif italic text-xs text-gold-400/50 tracking-widest uppercase z-10">
          Sonsuz Aşk Anı
        </p>
        <span className="font-sans text-[10px] text-white/40 tracking-[0.2em] uppercase mt-1 z-10">
          {alt}
        </span >
      </div>
    );
  };

  if (hasError || !src || src.trim() === "") {
    return <div className={`relative overflow-hidden rounded-lg ${className}`}>{getFallbackGraphic(index)}</div>;
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-luxury-black/60 ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        referrerPolicy="no-referrer"
      />
      {/* Subtle gold overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-50 pointer-events-none" />
    </div>
  );
}

export default function StoryTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section id="story-timeline" className="relative w-full max-w-6xl mx-auto px-4 md:px-8 py-24 z-10">
      
      {/* Title block */}
      <div className="text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-gold-400 gold-glow mb-4 block"
        >
          YOLCULUĞUMUZ
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide"
        >
          Aşkımızın <span className="italic text-gold-200">Zaman Çizelgesi</span>
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6"
        />
      </div>

      {/* Main Timeline body */}
      <div className="relative">
        
        {/* Center line (Desktop) */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-500/10 via-gold-500/30 to-gold-500/5 -translate-x-1/2 pointer-events-none" />

        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={event.id}
              className={`relative flex flex-col md:flex-row items-stretch mb-20 last:mb-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Central Timeline node (Glow Dot) */}
              <div className="absolute left-[20px] md:left-1/2 top-6 w-9 h-9 rounded-full bg-luxury-black border border-gold-400/40 shadow-lg flex items-center justify-center -translate-x-1/2 z-20">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0.5 }}
                  whileInView={{ scale: [0.7, 1.1, 1], opacity: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8 }}
                  className="w-7 h-7 rounded-full bg-gold-950/60 border border-gold-400/20 flex items-center justify-center"
                >
                  {getTimelineIcon(event.icon)}
                </motion.div>
                
                {/* Decorative radial pulsing ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gold-400/5 animate-pulse -z-10 pointer-events-none" />
              </div>

              {/* Empty side space to balance layout */}
              <div className="w-full md:w-1/2 hidden md:block" />

              {/* Content Box (Left or Right side depending on Index) */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 flex flex-col"
              >
                <div className="glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl flex flex-col h-full relative overflow-hidden group">
                  
                  {/* Highlight bordeaux corner glow */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-luxury-bordeaux/20 rounded-full blur-xl group-hover:bg-luxury-bordeaux/30 transition-all duration-700 pointer-events-none" />

                  <span className="font-mono text-xs text-gold-400 tracking-widest uppercase font-medium mb-2 block">
                    {event.date}
                  </span>
                  
                  <h3 className="font-serif text-2xl text-white font-medium tracking-wide mb-4">
                    {event.title}
                  </h3>

                  {/* Stretched visual fallback card */}
                  <ImageWithPlaceholder
                    src={event.image}
                    alt={event.title}
                    index={index}
                    className="w-full h-48 md:h-56 mb-5"
                  />

                  <p className="text-slate-100 text-sm leading-relaxed font-normal mt-auto">
                    {event.description}
                  </p>

                  {/* Corner indicator */}
                  <div className="absolute bottom-4 right-4 text-gold-500/20 group-hover:text-gold-400/40 transition-colors duration-500 font-mono text-xs">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

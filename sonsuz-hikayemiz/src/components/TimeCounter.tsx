/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Clock, Heart } from "lucide-react";
import { CounterData } from "../types";

interface TimeCounterProps {
  weddingDateStr: string;
  counterConfig: CounterData;
}

export default function TimeCounter({ weddingDateStr, counterConfig }: TimeCounterProps) {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date(weddingDateStr);

    const calculateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - weddingDate.getTime();
      
      if (diffMs <= 0) {
        setTimePassed({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimePassed({ days, hours, minutes, seconds, totalSeconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [weddingDateStr]);

  const digitVariants = {
    initial: { y: 15, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const timeBlocks = [
    { label: "GÜN", value: timePassed.days },
    { label: "SAAT", value: timePassed.hours },
    { label: "DAKİKA", value: timePassed.minutes },
    { label: "SANİYE", value: timePassed.seconds }
  ];

  return (
    <section id="counter-section" className="relative w-full max-w-5xl mx-auto px-4 md:px-8 py-24 z-10">
      
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

      <div className="glass-panel p-8 md:p-16 rounded-3xl text-center relative overflow-hidden border border-gold-400/10">
        
        {/* Subtle decorative internal gold lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gold-950/40 border border-gold-400/20 flex items-center justify-center animate-pulse">
            <Clock className="w-5 h-5 text-gold-300" />
          </div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-gold-400 gold-glow mb-4 block"
        >
          {counterConfig.title}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide mb-6"
        >
          Seninle Geçen <span className="italic text-gold-200">Her Saniye</span> Bir Hazine
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1.0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs md:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed mb-16 font-normal"
        >
          {counterConfig.subtitle}
        </motion.p>

        {/* Live Tickers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto relative">
          {timeBlocks.map((block, idx) => (
            <div key={block.label} className="flex flex-col items-center">
              {/* Ticker Box */}
              <div className="w-full aspect-square md:aspect-auto md:h-32 bg-luxury-black/60 rounded-2xl border border-gold-500/10 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
                
                {/* Ticker inner light reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="font-mono text-4xl md:text-5xl font-extralight text-gold-200 tracking-wide gold-glow relative h-14 flex items-center justify-center">
                  {/* Digital clock flip feel */}
                  <motion.span
                    key={block.value}
                    variants={digitVariants}
                    initial="initial"
                    animate="animate"
                    className="inline-block"
                  >
                    {block.value.toString().padStart(2, "0")}
                  </motion.span>
                </div>

                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold-400/5 pointer-events-none" />
              </div>

              {/* Ticker Label */}
              <span className="font-mono text-[10px] tracking-[0.25em] text-gold-300 font-semibold mt-4 uppercase">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        {/* Cumulative Heartbeat */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-luxury-bordeaux animate-bounce fill-current" />
          <span className="font-mono text-[10px] text-gold-400 tracking-[0.25em] uppercase font-semibold">
            SÖZ: TOPLAM {timePassed.totalSeconds.toLocaleString()} SANİYE
          </span>
        </div>
      </div>
    </section>
  );
}

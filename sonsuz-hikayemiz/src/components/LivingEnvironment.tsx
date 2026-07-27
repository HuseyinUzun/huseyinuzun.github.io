/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

interface LivingEnvironmentProps {
  sceneIndex: number; // 0 to 6 representing current short film scene
  revealedDreams?: number[];
  dreams?: Array<{ id: number; title: string; description: string }>;
  windTrigger?: number;
}

export default function LivingEnvironment({ sceneIndex, revealedDreams = [], dreams = [], windTrigger = 0 }: LivingEnvironmentProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Track already spawned dream IDs so we don't duplicate
  const spawnedDreamIdsRef = useRef<Set<number>>(new Set());

  // Accumulator array of active special dream lanterns that persists across ticks
  const specialLanternsRef = useRef<any[]>([]);

  // Track wind velocity multiplier for the sakura gust effect
  const windMultiplierRef = useRef<number>(1.0);

  // Monitor windTrigger to spike the wind multiplier
  useEffect(() => {
    if (windTrigger > 0) {
      windMultiplierRef.current = 6.0; // Spike the wind multiplier
    }
  }, [windTrigger]);

  // Monitor newly revealed dreams and spawn special lanterns
  useEffect(() => {
    if (sceneIndex !== 4) {
      // Reset if not in the dreams scene
      specialLanternsRef.current = [];
      spawnedDreamIdsRef.current.clear();
      return;
    }

    revealedDreams.forEach((dreamId) => {
      if (!spawnedDreamIdsRef.current.has(dreamId)) {
        spawnedDreamIdsRef.current.add(dreamId);
        const matchedDream = dreams.find((d) => d.id === dreamId);
        if (matchedDream) {
          // Spawn!
          const newLantern = {
            id: dreamId,
            x: Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2),
            y: window.innerHeight + 60,
            size: 24,
            speed: Math.random() * 0.5 + 0.45,
            sway: Math.random() * Math.PI,
            swaySpeed: 0.004 + Math.random() * 0.005,
            title: matchedDream.title.replace("✦", "").trim(),
            alpha: 1.0,
            scale: 0.1, // starting small
            targetScale: 1.0
          };
          specialLanternsRef.current.push(newLantern);
        }
      }
    });
  }, [revealedDreams, dreams, sceneIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Classes depending on scene
    class Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      blinkSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.75); // top part of screen
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.blinkSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.alpha += this.blinkSpeed;
        if (this.alpha > 1 || this.alpha < 0.2) {
          this.blinkSpeed = -this.blinkSpeed;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, this.alpha)})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    class Firefly {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
      angle: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random();
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += 0.01;
        this.x += this.vx + Math.sin(this.angle) * 0.15;
        this.y += this.vy + Math.cos(this.angle) * 0.15;
        this.alpha += this.pulseSpeed;
        if (this.alpha > 0.95 || this.alpha < 0.15) {
          this.pulseSpeed = -this.pulseSpeed;
        }

        // Boundary wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(212, 175, 55, ${Math.max(0, this.alpha)})`;
        c.shadowBlur = 8;
        c.shadowColor = "#d4af37";
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0; // Reset
      }
    }

    class SakuraPetal {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      type: "leaf" | "rose" | "wildflower";

      constructor() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.size = Math.random() * 6 + 4;
        this.vx = Math.random() * 1.5 + 0.5; // blows to the right
        this.vy = Math.random() * 1.2 + 0.8; // falls down
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = 0.01 + Math.random() * 0.02;

        const rand = Math.random();
        if (rand < 0.45) {
          this.type = "leaf";
          // Gentle Turkish park leaves: lime green, emerald green, warm autumn olive
          const leaves = [
            "rgba(46, 125, 50, 0.75)", 
            "rgba(104, 159, 56, 0.75)", 
            "rgba(139, 195, 74, 0.7)",
            "rgba(76, 154, 42, 0.75)"
          ];
          this.color = leaves[Math.floor(Math.random() * leaves.length)];
        } else if (rand < 0.8) {
          this.type = "rose";
          // Rich Turkish red/pink rose petals
          const roses = [
            "rgba(198, 40, 40, 0.85)",   // Crimson red rose
            "rgba(224, 64, 90, 0.85)",   // Magenta rose
            "rgba(244, 143, 177, 0.8)"   // Light pink rose
          ];
          this.color = roses[Math.floor(Math.random() * roses.length)];
        } else {
          this.type = "wildflower";
          // Çorum steppe wildflowers: chamomile daisies and golden marigolds
          const wildflowers = [
            "rgba(255, 179, 0, 0.8)",    // Golden yellow marigold
            "rgba(244, 244, 244, 0.85)"  // White daisy
          ];
          this.color = wildflowers[Math.floor(Math.random() * wildflowers.length)];
        }
      }

      update() {
        const currentWind = windMultiplierRef.current;
        this.x += this.vx * currentWind + Math.sin(this.rotation) * 0.4;
        this.y += this.vy * (1.0 + (currentWind - 1.0) * 0.2); // slide slightly down-right during wind
        this.rotation += this.rotationSpeed * currentWind;

        if (this.y > height || this.x > width || this.x < -40) {
          this.y = -20 - Math.random() * 30;
          // When wind is blowing hard, spawn them more to the left so they slide across beautifully
          this.x = currentWind > 2 ? -20 - Math.random() * 100 : Math.random() * (width * 0.65);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.fillStyle = this.color;
        c.beginPath();
        if (this.type === "leaf") {
          // Draw leaf shape: double pointed bezier
          c.moveTo(0, -this.size);
          c.quadraticCurveTo(-this.size * 0.6, 0, 0, this.size);
          c.quadraticCurveTo(this.size * 0.6, 0, 0, -this.size);
        } else {
          // Draw lovely heart-shaped or round flower petal
          c.moveTo(0, 0);
          c.bezierCurveTo(-this.size, -this.size / 2, -this.size, this.size / 2, 0, this.size);
          c.bezierCurveTo(this.size, this.size / 2, this.size, -this.size / 2, 0, 0);
        }
        c.closePath();
        c.fill();
        c.restore();
      }
    }

    class Balloon {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      wiggle: number;
      wiggleSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + 50 + Math.random() * 100;
        this.size = Math.random() * 14 + 10;
        const colors = ["#ffb0cd", "#ffd54f", "#81c784", "#64b5f6", "#ba68c8", "#ff8a65"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 1.2 + 0.6;
        this.wiggle = Math.random() * Math.PI;
        this.wiggleSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.y -= this.speed;
        this.wiggle += this.wiggleSpeed;
        this.x += Math.sin(this.wiggle) * 0.35;

        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.fillStyle = this.color;
        c.shadowBlur = 10;
        c.shadowColor = this.color;
        c.beginPath();
        // Draw balloon oval
        c.ellipse(this.x, this.y, this.size * 0.8, this.size, 0, 0, Math.PI * 2);
        c.fill();

        // Draw balloon small knot at base
        c.beginPath();
        c.moveTo(this.x, this.y + this.size);
        c.lineTo(this.x - 4, this.y + this.size + 4);
        c.lineTo(this.x + 4, this.y + this.size + 4);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();

        // Draw balloon wave string
        c.beginPath();
        c.moveTo(this.x, this.y + this.size + 4);
        c.quadraticCurveTo(this.x + 6, this.y + this.size + 15, this.x - 3, this.y + this.size + 30);
        c.strokeStyle = "rgba(255, 255, 255, 0.25)";
        c.lineWidth = 1.2;
        c.stroke();
        c.restore();
      }
    }

    class SkyLantern {
      x: number;
      y: number;
      size: number;
      speed: number;
      sway: number;
      swaySpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + 100 + Math.random() * 200;
        this.size = Math.random() * 10 + 8;
        this.speed = Math.random() * 0.5 + 0.3;
        this.sway = Math.random() * Math.PI;
        this.swaySpeed = 0.005 + Math.random() * 0.01;
      }

      update() {
        this.y -= this.speed;
        this.sway += this.swaySpeed;
        this.x += Math.sin(this.sway) * 0.25;

        if (this.y < -100) {
          this.y = height + 100;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.shadowBlur = 15;
        c.shadowColor = "rgba(255, 179, 0, 0.6)";

        // Draw lantern box
        const grad = c.createLinearGradient(this.x, this.y, this.x, this.y + this.size * 1.5);
        grad.addColorStop(0, "#ffe082");
        grad.addColorStop(1, "#e65100");
        c.fillStyle = grad;

        c.beginPath();
        c.rect(this.x - this.size, this.y, this.size * 2, this.size * 1.5,);
        c.fill();

        // Draw burning core glow
        c.fillStyle = "#ffe082";
        c.beginPath();
        c.arc(this.x, this.y + this.size * 1.2, 4, 0, Math.PI * 2);
        c.fill();

        c.restore();
      }
    }

    class Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      active: boolean;
      delay: number;

      constructor() {
        this.reset();
        this.delay = Math.random() * 300; // Wait before shooting
      }

      reset() {
        this.x = Math.random() * (width * 0.6);
        this.y = Math.random() * (height * 0.3);
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 8 + 6;
        this.active = false;
        this.delay = Math.random() * 400 + 100;
      }

      update() {
        if (!this.active) {
          this.delay--;
          if (this.delay <= 0) {
            this.active = true;
          }
          return;
        }

        // Move downward-right diagonally
        this.x += this.speed;
        this.y += this.speed * 0.6;

        if (this.x > width || this.y > height) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.active) return;
        c.save();
        const grad = c.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length * 0.6);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(0.3, "rgba(212, 175, 55, 0.4)");
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");
        
        c.strokeStyle = grad;
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x - this.length, this.y - this.length * 0.6);
        c.stroke();
        c.restore();
      }
    }

    class GoldenPollen {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -Math.random() * 0.4 - 0.1; // rise slightly
        this.alpha = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += this.pulseSpeed;
        if (this.alpha > 0.8 || this.alpha < 0.2) {
          this.pulseSpeed = -this.pulseSpeed;
        }

        if (this.y < -10) this.y = height + 10;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(255, 224, 130, ${this.alpha})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    class FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      gravity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.015 + 0.012;
        this.gravity = 0.04;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.shadowBlur = 12;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, Math.random() * 1.5 + 1, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;
      particles: FireworkParticle[];
      trail: Array<{x: number, y: number, alpha: number}>;

      constructor() {
        this.reset();
        // Stagger their initial delays so they don't launch at once
        this.y = height + Math.random() * 400 + 100;
      }

      reset() {
        this.x = Math.random() * (width * 0.8) + width * 0.1;
        this.y = height + 20;
        this.targetY = Math.random() * (height * 0.45) + height * 0.12;
        this.vy = -Math.random() * 5 - 7;
        this.vx = (Math.random() - 0.5) * 1.8;
        const colors = ["#ff2a6d", "#ffd700", "#05d9e8", "#ff9900", "#9b51e0", "#00ffcc"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
        this.particles = [];
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.04; // Gravity pull

          // Add trail
          this.trail.push({ x: this.x, y: this.y, alpha: 0.6 });
          if (this.trail.length > 8) this.trail.shift();
          this.trail.forEach(t => t.alpha -= 0.07);

          if (this.vy >= 0 || this.y <= this.targetY) {
            this.explode();
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.alpha > 0);
          if (this.particles.length === 0) {
            this.reset();
          }
        }
      }

      explode() {
        this.exploded = true;
        const count = Math.floor(Math.random() * 35) + 35;
        for (let i = 0; i < count; i++) {
          this.particles.push(new FireworkParticle(this.x, this.y, this.color));
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.exploded) {
          // Draw trail
          this.trail.forEach((t) => {
            if (t.alpha <= 0) return;
            c.fillStyle = this.color;
            c.globalAlpha = t.alpha;
            c.beginPath();
            c.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
            c.fill();
          });
          c.globalAlpha = 1.0;

          c.save();
          c.fillStyle = this.color;
          c.shadowBlur = 10;
          c.shadowColor = this.color;
          c.beginPath();
          c.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
          c.fill();
          c.restore();
        } else {
          this.particles.forEach((p) => p.draw(c));
        }
      }
    }

    // Pool initialization
    const stars: Star[] = Array.from({ length: 90 }, () => new Star());
    const fireflies: Firefly[] = Array.from({ length: 30 }, () => new Firefly());
    const sakuraPetals: SakuraPetal[] = Array.from({ length: 45 }, () => new SakuraPetal());
    const balloons: Balloon[] = Array.from({ length: 60 }, () => new Balloon());
    const fireworks: Firework[] = Array.from({ length: 10 }, () => new Firework());
    const lanterns: SkyLantern[] = Array.from({ length: 20 }, () => new SkyLantern());
    const pollenList: GoldenPollen[] = Array.from({ length: 40 }, () => new GoldenPollen());
    const meteors: Meteor[] = Array.from({ length: 2 }, () => new Meteor());

    // Main animation tick
    const loop = () => {
      // Decay wind multiplier slowly towards 1.0
      if (windMultiplierRef.current > 1.0) {
        windMultiplierRef.current -= 0.06;
        if (windMultiplierRef.current < 1.0) {
          windMultiplierRef.current = 1.0;
        }
      }

      // Clear with soft trails for smooth visuals
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static background components depending on scene
      // 0, 3, 5 & 6 are night/cosmic scenes
      if (sceneIndex === 0 || sceneIndex === 3 || sceneIndex === 5 || sceneIndex === 6) {
        stars.forEach((s) => {
          s.update();
          s.draw(ctx);
        });
        meteors.forEach((m) => {
          m.update();
          m.draw(ctx);
        });
      }

      // Gentle romantic flower petals drift in all scenes except Scene 1 (which gets a heavy shower below)
      if (sceneIndex !== 1) {
        sakuraPetals.slice(0, 16).forEach((p) => {
          p.update();
          p.draw(ctx);
        });
      }

      // 2. Draw active environmental entities based on active scene
      if (sceneIndex === 0) {
        // Gece Night Scene: Fireflies + Gold light beams
        fireflies.forEach((f) => {
          f.update();
          f.draw(ctx);
        });
        drawSunbeams(ctx, width, height, "rgba(212, 175, 55, 0.03)");
      } else if (sceneIndex === 1) {
        // Millet Bahçesi: Falling leaves & petals (full heavy shower) + pollen + soft golden light rays
        sakuraPetals.forEach((p) => {
          p.update();
          p.draw(ctx);
        });
        pollenList.forEach((pol) => {
          pol.update();
          pol.draw(ctx);
        });
        drawSunbeams(ctx, width, height, "rgba(212, 175, 55, 0.04)");
      } else if (sceneIndex === 2) {
        // Hatıralar: Drifting stardust pollen + subtle light bars
        pollenList.forEach((pol) => {
          pol.update();
          pol.draw(ctx);
        });
        drawSunbeams(ctx, width, height, "rgba(255, 255, 255, 0.02)");
      } else if (sceneIndex === 3) {
        // Yıldönümü: Shooting stars + soft cloud mists + fireflies
        fireflies.forEach((f) => {
          f.update();
          f.draw(ctx);
        });
        drawCosmicGlows(ctx, width, height);
      } else if (sceneIndex === 4) {
        // Gelecek: Floating sky lanterns + rising gold pollen
        lanterns.forEach((l) => {
          l.update();
          l.draw(ctx);
        });
        pollenList.forEach((pol) => {
          pol.update();
          pol.draw(ctx);
        });

        // 3. Draw and Animate special Custom Interactive Dream Lanterns
        specialLanternsRef.current.forEach((sl) => {
          // Update
          sl.y -= sl.speed;
          sl.sway += sl.swaySpeed;
          sl.x += Math.sin(sl.sway) * 0.4;
          if (sl.scale < sl.targetScale) sl.scale += 0.03;

          if (sl.y < 240) {
            sl.alpha = Math.max(0, sl.y / 240);
          }

          // Draw
          if (sl.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = sl.alpha;
            ctx.shadowBlur = 25;
            ctx.shadowColor = "rgba(212, 175, 55, 0.9)";

            // Scale transform
            ctx.translate(sl.x, sl.y);
            ctx.scale(sl.scale, sl.scale);
            ctx.translate(-sl.x, -sl.y);

            // Double gradient body
            const lanternGrad = ctx.createLinearGradient(sl.x, sl.y, sl.x, sl.y + sl.size * 1.8);
            lanternGrad.addColorStop(0, "#ffe082");
            lanternGrad.addColorStop(0.35, "#ffb300");
            lanternGrad.addColorStop(1, "#d84315");
            ctx.fillStyle = lanternGrad;

            ctx.beginPath();
            // Draw beautiful rounded paper lantern
            ctx.rect(sl.x - sl.size, sl.y, sl.size * 2, sl.size * 1.7);
            ctx.fill();

            // Fire core glow
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(sl.x, sl.y + sl.size * 1.4, 5.5, 0, Math.PI * 2);
            ctx.fill();

            // Hanging golden tassel string
            ctx.strokeStyle = "#ffb300";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(sl.x, sl.y + sl.size * 1.7);
            ctx.lineTo(sl.x, sl.y + sl.size * 1.7 + 16);
            ctx.stroke();

            // Draw dream title on the paper lantern
            ctx.shadowBlur = 0; // Disable shadow for text clarity
            ctx.fillStyle = "rgba(22, 10, 3, 0.95)";
            ctx.font = "bold 10px 'Playfair Display', serif, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(sl.title, sl.x, sl.y + sl.size * 1.0);

            ctx.restore();
          }
        });
      } else if (sceneIndex === 5) {
        // Final: Cosmic stars, massive shooting stars, stardust glow
        pollenList.forEach((pol) => {
          pol.update();
          pol.draw(ctx);
        });
        drawCosmicGlows(ctx, width, height);
      } else if (sceneIndex === 6) {
        // Doğum günü: Rising balloons + spectacular fireworks + golden glitters
        balloons.forEach((b) => {
          b.update();
          b.draw(ctx);
        });
        fireworks.forEach((fw) => {
          fw.update();
          fw.draw(ctx);
        });
        pollenList.forEach((pol) => {
          pol.update();
          pol.draw(ctx);
        });
      }

      animationId = requestAnimationFrame(loop);
    };

    // Helper to draw beautiful soft light rays sweeps
    const drawSunbeams = (c: CanvasRenderingContext2D, w: number, h: number, style: string) => {
      c.save();
      c.fillStyle = style;
      const time = Date.now() * 0.0003;
      for (let i = 0; i < 4; i++) {
        const offset = Math.sin(time + i) * 60;
        c.beginPath();
        c.moveTo(w * 0.2 + offset, 0);
        c.lineTo(w * 0.4 + offset + 80, 0);
        c.lineTo(w * 0.8 + offset + 200, h);
        c.lineTo(w * 0.5 + offset + 50, h);
        c.closePath();
        c.fill();
      }
      c.restore();
    };

    // Helper to draw starry mystical nebula clouds
    const drawCosmicGlows = (c: CanvasRenderingContext2D, w: number, h: number) => {
      c.save();
      const time = Date.now() * 0.0001;
      const x = w * 0.5 + Math.sin(time) * 100;
      const y = h * 0.4 + Math.cos(time * 0.8) * 80;

      const grad = c.createRadialGradient(x, y, 10, x, y, 300);
      grad.addColorStop(0, "rgba(30, 9, 17, 0.15)"); // Bordeaux soft nebula
      grad.addColorStop(0.5, "rgba(7, 10, 20, 0.08)"); // Indigo soft nebula
      grad.addColorStop(1, "rgba(0,0,0,0)");

      c.fillStyle = grad;
      c.beginPath();
      c.arc(x, y, 400, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    // Handle screen resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [sceneIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-25 select-none overflow-hidden"
    />
  );
}

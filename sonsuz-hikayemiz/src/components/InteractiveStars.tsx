/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  twinkleSpeed: number;
  twinkleDir: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function InteractiveStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [meteorCount, setMeteorCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const colors = [
      "rgba(255, 255, 255, 0.8)",
      "rgba(244, 235, 214, 0.9)", // Gold-white
      "rgba(213, 185, 124, 0.75)", // Pure gold accent
      "rgba(173, 216, 230, 0.7)", // Soft cyan-blue star
    ];

    // Initialize stars
    const initStars = (width: number, height: number) => {
      stars = [];
      const density = Math.floor((width * height) / 4000); // Responsive density
      const maxStars = Math.min(density, 300);

      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          brightness: Math.random(),
          speed: Math.random() * 0.05 + 0.01,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Spawn single meteor
    const spawnMeteor = () => {
      const width = canvas.width;
      meteors.push({
        x: Math.random() * width * 1.2,
        y: -50,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 12 + 8,
        angle: (215 * Math.PI) / 180, // Diagonal angle
        opacity: 1,
      });
      setMeteorCount((prev) => prev + 1);
    };

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initStars(width, height);
      }
    });

    resizeObserver.observe(container);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Game loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw dynamic background nebula glow
      const midX = canvas.width / 2;
      const midY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(
        midX,
        midY,
        10,
        midX,
        midY,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "rgba(11, 11, 29, 0.45)"); // Deep luxury indigo
      gradient.addColorStop(0.5, "rgba(7, 7, 18, 0.35)"); // Midnight blue
      gradient.addColorStop(1, "rgba(3, 3, 5, 0.85)"); // Pitch black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle bordeaux aurora cloud
      ctx.save();
      const bordeauxGradient = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.2,
        50,
        canvas.width * 0.8,
        canvas.height * 0.2,
        canvas.width * 0.6
      );
      bordeauxGradient.addColorStop(0, "rgba(30, 7, 12, 0.22)"); // Bordeaux tint
      bordeauxGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bordeauxGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // 2. Twinkle and move stars
      stars.forEach((star) => {
        // Twinkle update
        star.brightness += star.twinkleSpeed * star.twinkleDir;
        if (star.brightness >= 1) {
          star.brightness = 1;
          star.twinkleDir = -1;
        } else if (star.brightness <= 0.1) {
          star.brightness = 0.1;
          star.twinkleDir = 1;
        }

        // Extremely slow drift upwards
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Apply mouse magnetic interactive nudge
        let drawX = star.x;
        let drawY = star.y;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - star.x;
          const dy = mouseRef.current.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            // Push stars slightly away or pull them
            drawX -= (dx / dist) * force * 15;
            drawY -= (dy / dist) * force * 15;
          }
        }

        // Draw star
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0; // Reset

      // 3. Draw and update meteors
      meteors.forEach((meteor, index) => {
        ctx.save();
        ctx.strokeStyle = `rgba(213, 185, 124, ${meteor.opacity})`; // Gold meteor streak
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        
        // Calculate endpoint based on diagonal angle
        const endX = meteor.x + Math.cos(meteor.angle) * meteor.length;
        const endY = meteor.y + Math.sin(meteor.angle) * meteor.length;
        
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
        grad.addColorStop(0, "rgba(213, 185, 124, 1)");
        grad.addColorStop(0.3, "rgba(197, 159, 86, 0.6)");
        grad.addColorStop(1, "rgba(30, 7, 12, 0)"); // Fade out trail
        
        ctx.strokeStyle = grad;
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();

        // Update positions
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.opacity -= 0.015;

        // Remove dead meteors
        if (meteor.opacity <= 0 || meteor.x < -100 || meteor.y > canvas.height + 100) {
          meteors.splice(index, 1);
        }
      });

      // Occasional random meteor spawn
      if (Math.random() < 0.0015 && meteors.length < 2) {
        spawnMeteor();
      }

      // 4. Interactive Mouse Glow Accent
      if (mouseRef.current.active) {
        ctx.save();
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          150
        );
        mouseGlow.addColorStop(0, "rgba(213, 185, 124, 0.08)"); // Golden warm haze
        mouseGlow.addColorStop(0.5, "rgba(11, 11, 29, 0.03)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Trigger initial meteor
    setTimeout(() => {
      spawnMeteor();
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="interactive-stars-container" ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas id="interactive-stars-canvas" ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-auto" />
    </div>
  );
}

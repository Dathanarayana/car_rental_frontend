
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revving, setRevving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      life: number;
      opacity: number;
    }

    let particles: Particle[] = [];
    let carX = -200;
    const carY = canvas.height / 2;
    const carWidth = 180;
    const carHeight = 50;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Car movement
      carX += 15;
      if (carX > canvas.width + 200) carX = -200;

      // Generate smoke particles
      if (carX > -100 && carX < canvas.width + 100) {
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: carX,
            y: carY + 20,
            size: Math.random() * 10 + 5,
            vx: -Math.random() * 5 - 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1.0,
            opacity: 0.6
          });
        }
      }

      // Update and draw particles
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        p.opacity -= 0.01;
        p.size += 0.5;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(200, 200, 200, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(100, 100, 100, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Car Silhouette
      ctx.save();
      ctx.translate(carX, carY);
      
      // Shadow
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
      
      // Car Body
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(20, 10);
      ctx.quadraticCurveTo(80, -20, 160, 20);
      ctx.lineTo(180, 25);
      ctx.lineTo(180, 45);
      ctx.lineTo(0, 45);
      ctx.closePath();
      ctx.fill();
      
      // Wheels
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(40, 45, 15, 0, Math.PI * 2);
      ctx.arc(140, 45, 15, 0, Math.PI * 2);
      ctx.fill();

      // Headlight trail
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ff0000';
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(175, 25, 10, 5);

      ctx.restore();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-chrome tracking-tighter mb-4"
        >
          VELOCE
        </motion.h1>
        
        <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)]"
          />
        </div>
        
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-red-600 font-display mt-6 tracking-[0.3em] text-xs uppercase"
        >
          Igniting Core Systems...
        </motion.p>
      </div>

      <div className="absolute bottom-10 left-10 flex items-center gap-4 text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs uppercase font-display">System Check: OK</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;


import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25;
      const y = (e.clientY - innerHeight / 2) / 25;

      const car = document.getElementById('hero-car-container');
      if (car) {
        car.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden carbon-pattern pt-20 lg:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-[#0a0a0a]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-red-500/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 2
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        <motion.div style={{ y: y1, opacity, scale }} className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-red-600/30 text-red-600 text-[10px] font-display tracking-[0.4em] uppercase mb-6 bg-red-600/5 backdrop-blur-sm">
              Automotive Perfection
            </span>
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black leading-tight md:leading-none tracking-tighter mb-8 transition-all duration-300">
              <span className="text-chrome block mb-2">VELOCE</span>
              <span className="text-red-600 block drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">STRADA</span>
            </h1>
            <p className="text-white/50 text-base md:text-xl max-w-md font-light leading-relaxed mb-10 mx-auto lg:mx-0 border-l-2 border-red-600 pl-6 text-left">
              Engineered beyond limits. A masterpiece of aerodynamic sculpting and raw Italian power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 0, 0, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-red-600 text-white font-display font-bold uppercase tracking-widest overflow-hidden rounded-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Performance
                </span>
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:left-[100%] transition-all duration-1000" />
              </motion.button>

              <button className="px-10 py-5 border border-white/10 text-white/70 font-display font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all rounded-sm backdrop-blur-md">
                Virtual Tour
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative order-1 lg:order-2 h-[40vh] lg:h-full flex items-center justify-center lg:justify-end perspective-1000">
          <motion.div
            id="hero-car-container"
            initial={{ opacity: 0, scale: 0.5, x: 200, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl preserve-3d relative"
          >
            <div className="relative z-20">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
                alt="Veloce Strada"
                className="w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(255,0,0,0.4)] brightness-110 contrast-110"
              />
            </div>

            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-20 bg-red-600 blur-[80px] rounded-[50%] z-10"
            />

            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                  style={{ width: '300px', top: 20 + i * 15 + '%', right: -150 }}
                  animate={{ right: '150%', opacity: [0, 1, 0], scaleX: [1, 2, 1] }}
                  transition={{ duration: 0.6 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0, rotateZ: -10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            whileHover={{ scale: 1.1, rotateY: 10, rotateX: -5 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute bottom-4 right-4 md:bottom-10 md:right-10 glass-morphism p-4 md:p-6 rounded-2xl border border-red-500/30 shadow-[0_0_50px_rgba(255,0,0,0.2)] backdrop-blur-xl group cursor-pointer z-30 transform scale-75 md:scale-100 origin-bottom-right"
          >
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <div className="text-[10px] text-red-500 font-display font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">DRAG COEFF</div>
                <div className="text-3xl font-display font-bold text-white tabular-nums">0.23 <span className="text-xs text-white/40 font-normal">cd</span></div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-red-600/30 flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-red-600 animate-ping opacity-20" />
              </div>
            </div>

            <div className="mt-4 flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "23%" }}
                transition={{ delay: 1.5, duration: 1 }}
                className="h-full bg-red-600 shadow-[0_0_10px_rgba(255,0,0,1)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

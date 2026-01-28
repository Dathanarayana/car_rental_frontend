
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => setScrollPercent(Math.round(v * 100)));
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed bottom-24 right-10 z-[100] flex flex-col items-end">
      {/* Speedometer Gauge Style */}
      <div className="relative w-24 h-24 glass-morphism rounded-full flex items-center justify-center border border-white/5">
        <svg className="w-full h-full -rotate-180">
          <circle
            cx="48"
            cy="48"
            r="40"
            className="stroke-white/5 fill-none"
            strokeWidth="4"
            strokeDasharray="125.6" // (2*PI*40) / 2 for semi circle
            strokeDashoffset="0"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="40"
            className="stroke-red-600 fill-none"
            strokeWidth="4"
            strokeDasharray="251.2"
            style={{ pathLength: scrollYProgress }}
            transition={{ type: "spring", damping: 30 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-display font-black text-white">{scrollPercent}</span>
          <span className="text-[8px] text-red-600 font-bold uppercase tracking-widest">Drive %</span>
        </div>

        {/* Needle */}
        <motion.div
          style={{ rotate: scrollPercent * 2.4 - 120 }}
          className="absolute top-1/2 left-1/2 w-1 h-12 bg-red-600 origin-bottom -translate-x-1/2 -translate-y-full transition-transform"
        />
      </div>

      {/* Speed lines appearing on side */}
      <div className="absolute top-[-200px] right-0 h-[150px] w-1 overflow-hidden opacity-20">
        <motion.div
          animate={{ y: [0, 150] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-full h-20 bg-gradient-to-b from-white to-transparent"
        />
      </div>
    </div>
  );
};

export default ScrollProgressBar;

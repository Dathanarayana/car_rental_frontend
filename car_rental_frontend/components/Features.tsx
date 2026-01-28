
import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    title: "V-Link Chassis",
    description: "Predictive suspension geometry that adapts to terrain in milliseconds.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  },
  {
    title: "Aero-Blade Tech",
    description: "Active aerodynamic elements that maximize cornering downforce.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  {
    title: "Neural HUD",
    description: "Mixed reality projection system integrated directly into the windscreen.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    )
  },
  {
    title: "Pulse-Shift",
    description: "Zero-lag dual-clutch transmission with biometric paddle feedback.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )
  }
];

const FeatureCard: React.FC<{ feature: typeof featureData[0], index: number }> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -15, rotateX: 10, rotateY: 10, scale: 1.05, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
      className="group relative p-8 glass-morphism rounded-2xl border border-white/5 transition-all duration-500 overflow-hidden preserve-3d cursor-pointer"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl group-hover:bg-red-600/30 transition-colors" />

      <div className="relative z-10">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 mb-8 border border-red-600/20 shadow-[0_0_20px_rgba(255,0,0,0.1)] group-hover:bg-red-600 group-hover:text-white transition-all duration-500"
        >
          {feature.icon}
        </motion.div>

        <h3 className="text-2xl font-display font-bold text-white uppercase mb-4 tracking-tight group-hover:text-red-600 transition-colors">
          {feature.title}
        </h3>

        <p className="text-white/40 leading-relaxed group-hover:text-white/70 transition-colors">
          {feature.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Technical Specs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="engineering" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-red-600 font-display font-bold uppercase tracking-[0.4em] text-xs">Innovation Hub</span>
            <h2 className="text-4xl lg:text-6xl font-black text-white uppercase mt-4">The Future is Mechanical</h2>
          </div>
          <p className="text-white/40 max-w-sm mb-2">
            Every component of a Veloce is designed to defy physics and reward the senses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

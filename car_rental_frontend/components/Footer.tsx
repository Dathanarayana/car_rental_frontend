
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Exhaust Smoke Animation placeholder */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none opacity-20">
        <motion.div
          animate={{ x: [-100, 1000], opacity: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-lg">
                <span className="font-display font-black text-white">V</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tighter text-white">VELOCE</span>
            </div>
            <p className="text-white/40 leading-relaxed mb-8">
              The evolution of Italian performance. Since 1994, pushing the boundaries of what is possible on four wheels.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'TW', 'YT'].map(social => (
                <button key={social} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-[10px] text-white/60 hover:bg-white hover:text-black transition-all">
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-8">Experience</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-red-600 transition-colors">Configurator</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Test Drive</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Certified Pre-owned</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Dealer Locator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-8">Engineering</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-red-600 transition-colors">V-Series Lab</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aerodynamics</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Engine Specs</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div className="relative group perspective-1000 h-64 flex items-center justify-center scale-75 md:scale-100">
            {/* HUD Technical Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48 border border-dashed border-red-600/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 border border-dotted border-white/5 rounded-full"
            />

            {/* 3D Rotating Turbine Core */}
            <div className="w-32 h-32 relative preserve-3d animate-[spin_10s_linear_infinite]">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-l border-red-600/40 bg-gradient-to-r from-red-600/5 to-transparent backdrop-blur-sm"
                  style={{
                    transform: `rotateY(${i * 45}deg) translateZ(60px)`,
                    backfaceVisibility: 'hidden',
                    clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)'
                  }}
                />
              ))}

              {/* Internal Glow Source */}
              <div className="absolute inset-4 bg-red-600/10 blur-3xl rounded-full animate-pulse" />
              <div className="absolute inset-10 bg-red-600 border border-red-400/50 shadow-[0_0_30px_rgba(255,0,0,0.8)] rounded-full animate-ping opacity-20" />
            </div>

            <div className="absolute bottom-[-20px] px-6 py-1 bg-red-600/10 border border-red-600/20 rounded-full">
              <p className="text-[7px] text-red-500 uppercase tracking-[0.5em] font-orbitron whitespace-nowrap">V-Series Core Active</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2024 VELOCE AUTOMOTIVE S.P.A. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Legal Information</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

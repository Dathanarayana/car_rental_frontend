
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-3xl font-black tracking-tighter chrome-text select-none">VELOCE</span>
          <div className="h-1 w-12 bg-red-600 shadow-[0_0_10px_#ff0000]"></div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['HOME', 'FLEET', 'EXPERIENCES', 'ABOUT', 'CONTACT'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className={`font-orbitron text-xs tracking-widest hover:text-red-500 transition-colors ${link === 'FLEET' ? 'text-red-500' : 'text-white/70'}`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block font-orbitron text-xs text-white/50 hover:text-white transition-colors">LOG IN</button>
          <button className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-2 rounded font-orbitron text-xs tracking-widest shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]">
            MEMBERSHIP
          </button>
        </div>
      </div>
    </nav>
  );
};

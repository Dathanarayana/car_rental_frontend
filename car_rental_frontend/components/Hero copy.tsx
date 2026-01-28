
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="relative z-10">
        <h4 className="font-orbitron text-red-500 text-sm tracking-[0.4em] mb-4 uppercase">The Ultimate Showroom</h4>
        <h1 className="font-orbitron text-5xl md:text-8xl font-black mb-6 leading-none tracking-tighter">
          EXPLORE <br />
          <span className="chrome-text">EXCELLENCE</span>
        </h1>
        <p className="font-rajdhani text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Step into our digital garage. Discover, rotate, and interact with the world's most 
          exclusive automobiles in full 3D.
        </p>
        
        <div className="mt-12 flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_#ff0000]"></div>
          <div className="h-[1px] w-12 bg-white/20"></div>
        </div>
      </div>
    </section>
  );
};

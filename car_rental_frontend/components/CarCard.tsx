import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarStatus } from '../types';
import { buildSketchfabUrl } from '../utils/sketchfab';
import { useAuth } from '../contexts/AuthContext';

interface CarCardProps {
  car: Car;
  onViewDetails: () => void;
  onEdit?: (car: Car) => void;
  onDelete?: (car: Car) => void;
  onStatusChange?: (id: number, status: CarStatus) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails, onEdit, onDelete, onStatusChange }) => {
  const { isAdmin } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimerRef.current = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const getBrandColor = () => {
    const b = car.brand.toUpperCase();
    if (b.includes('LAMBORGHINI')) return 'from-orange-600/60';
    if (b.includes('FERRARI')) return 'from-red-700/60';
    if (b.includes('BUGATTI')) return 'from-blue-700/60';
    if (b.includes('ASTON')) return 'from-emerald-900/60';
    return 'from-zinc-800/60';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'RENTED': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'MAINTENANCE': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'RETIRED': return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
      default: return 'bg-white/10 text-white/40 border-white/10';
    }
  };

  const embedUrl = buildSketchfabUrl(car.imageUrl, {
    autostart: true,
    ui_controls: false,
    ui_infos: false,
    transparent: true,
    preload: true
  });

  return (
    <motion.div
      layout
      onClick={onViewDetails}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={false}
      transition={{
        layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: 0.4 }
      }}
      className={`relative h-full cursor-pointer overflow-hidden rounded-2xl group flex-1 transition-all duration-700
        ${isHovered ? 'lg:flex-[4] z-20 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8),0_18px_36px_-18px_rgba(0,0,0,0.9)]' : 'z-10'}
        min-h-[500px] lg:min-h-0
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Admin Quick Actions */}
      {isAdmin && (
        <div className={`absolute top-6 left-6 right-6 z-50 flex justify-between items-start transition-all duration-500 
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 lg:opacity-0 lg:-translate-y-4'}`}>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(car); }}
              className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 text-white transition-all shadow-xl border border-white/5"
              title="Edit Vehicle"
            >
              ✏️
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(car); }}
              className="p-3 bg-red-600/20 backdrop-blur-md rounded-xl hover:bg-red-600/40 text-red-500 transition-all shadow-xl border border-red-500/20"
              title="Remove from Fleet"
            >
              🗑️
            </button>
          </div>

          <select
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => { e.stopPropagation(); onStatusChange?.(car.id, e.target.value as CarStatus); }}
            value={car.status}
            className={`px-4 py-2 rounded-xl text-[10px] font-orbitron font-bold uppercase tracking-widest border transition-all cursor-pointer outline-none ${getStatusColor(car.status)}`}
          >
            {Object.values(CarStatus).map(status => (
              <option key={status} value={status} className="bg-zinc-950 text-white">{status}</option>
            ))}
          </select>
        </div>
      )}

      {/* Background Gradient / Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${getBrandColor()} to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-700`}></div>

      {/* Dark tint */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-0"></div>

      {/* 3D Model Viewport */}
      <motion.div layout className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {shouldLoadIframe && isHovered ? (
            <motion.div
              key="iframe-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
            >
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/10 backdrop-blur-sm z-10">
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                src={embedUrl}
                title={car.fullName}
                className="w-full h-full border-none scale-105"
                onLoad={() => setIframeLoaded(true)}
                loading="eager"
              />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 backdrop-blur-[2px]"
            >
              <div className={`text-[12rem] opacity-5 grayscale contrast-150 transition-transform duration-1000 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                🏎️
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brand Text */}
      <div className="absolute bottom-10 left-0 right-0 z-30 px-6 text-center pointer-events-none">
        <motion.h3
          layout
          className={`font-orbitron font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap
            ${isHovered ? 'text-2xl md:text-6xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-xs md:text-base opacity-40'}
          `}
        >
          {car.brand}
        </motion.h3>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4"
            >
              <p className="font-rajdhani text-white/70 text-sm md:text-lg font-medium tracking-[0.3em] mb-4 md:mb-6 uppercase">{car.model}</p>
              <div className="flex justify-center gap-4">
                <button
                  className={`px-10 py-3 font-orbitron text-xs font-bold tracking-[0.2em] rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(0,0,0,0.3)] pointer-events-auto
                    ${car.status === 'AVAILABLE'
                      ? 'bg-white text-black hover:bg-red-600 hover:text-white'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5 opacity-50'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                  }}
                >
                  {car.status === 'AVAILABLE' ? (isHovered ? 'EXPERIENCE LUXURY' : 'VIEW') : 'RESERVED'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vertical Side Label */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span className="font-orbitron text-white/5 text-5xl font-black rotate-90 uppercase tracking-[0.6em] whitespace-nowrap">
            {car.model}
          </span>
        </div>
      )}

      {/* Sub-status label for non-hovered view if not available */}
      {!isHovered && car.status !== 'AVAILABLE' && (
        <div className="absolute top-8 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <span className={`px-4 py-1 rounded-full text-[8px] font-orbitron font-bold uppercase tracking-tighter border ${getStatusColor(car.status)}`}>
            {car.status}
          </span>
        </div>
      )}

      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </motion.div>
  );
};


import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { buildSketchfabUrl } from '../utils/sketchfab';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose, onReserve }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!car && !mounted) return null;

  const embedUrl = car ? buildSketchfabUrl(car.imageUrl, { autostart: true, ui_infos: true }) : '';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-6xl max-h-[95vh] overflow-y-auto glass-card rounded-[40px] shadow-2xl transition-all duration-500 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-12'}`}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all text-2xl"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Massive 3D Viewer */}
          <div className="w-full lg:w-3/5 relative bg-[#050505]">
            <div className="aspect-video lg:aspect-square w-full">
              <iframe
                src={embedUrl}
                title={`${car?.fullName} Details`}
                className="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
              />
            </div>

            {/* 3D Overlay Help */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div className="px-4 py-2 bg-black/60 backdrop-blur rounded-full text-[10px] font-orbitron tracking-widest text-white/50">
                DRAG TO ROTATE • SCROLL TO ZOOM
              </div>
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <span className="font-orbitron text-red-500 text-[10px] tracking-[0.5em] uppercase mb-2 block">
                  {car?.category} EXCELLENCE
                </span>
                <h2 className="font-orbitron text-4xl md:text-5xl font-black mb-2 chrome-text tracking-tighter">
                  {car?.brand}
                </h2>
                <p className="font-rajdhani text-2xl text-white/50">{car?.model}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">YEAR</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.year}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">COLOR</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.color}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">FUEL TYPE</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.fuelType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">MILEAGE</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.mileage} MI</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">TRANSMISSION</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase">SEATING</p>
                  <p className="font-rajdhani text-xl text-white font-bold">{car?.seats} ADULTS</p>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase mb-3">OVERVIEW</p>
                <p className="font-rajdhani text-white/70 leading-relaxed text-lg">
                  {car?.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-orbitron tracking-widest text-white/30 uppercase mb-1">RENTAL RATE</p>
                  <p className="font-orbitron text-4xl font-black neon-text">${car?.pricePerDay}</p>
                </div>
                <p className="font-rajdhani text-white/40 text-xl">/ PER DAY</p>
              </div>

              <button
                onClick={() => {
                  if (car && car.status === 'AVAILABLE') {
                    onReserve(car);
                    onClose();
                  }
                }}
                disabled={car?.status !== 'AVAILABLE'}
                className={`w-full py-5 rounded-2xl font-orbitron text-sm tracking-[0.3em] transition-all duration-300 group ${car?.status === 'AVAILABLE'
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)]'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'}`}
              >
                {car?.status === 'AVAILABLE' ? (
                  <>RESERVE THIS <span className="inline-block group-hover:translate-x-2 transition-transform">VEHICLE →</span></>
                ) : (
                  <span className="opacity-50">CURRENTLY UNAVAILABLE</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

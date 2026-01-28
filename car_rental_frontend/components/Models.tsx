
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const models = [
  {
    name: "Inferno V8",
    price: "$450,000",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    stats: { speed: "340 km/h", acceleration: "2.8s" },
    desc: "The purest expression of track focus, tuned for surgical precision on every apex.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: "720 HP",
      torque: "800 Nm",
      dimensions: "4,544 x 1,958 x 1,223 mm"
    }
  },
  {
    name: "Thunder V12",
    price: "$890,000",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop",
    stats: { speed: "365 km/h", acceleration: "2.3s" },
    desc: "Symphonic power meets grand touring luxury. The ultimate V12 heart.",
    specs: {
      engine: "6.5L Naturally Aspirated V12",
      power: "830 HP",
      torque: "692 Nm",
      dimensions: "4,943 x 2,098 x 1,136 mm"
    }
  },
  {
    name: "Spectre Hybrid",
    price: "$1.2M",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    stats: { speed: "350 km/h", acceleration: "2.1s" },
    desc: "Silent aggression. Instant torque. The future of the hyper-electric era.",
    specs: {
      engine: "Hybrid V6 Twin-Turbo + Axial Flux Motors",
      power: "1,000 HP",
      torque: "1,100 Nm",
      dimensions: "4,640 x 2,045 x 1,190 mm"
    }
  },
  {
    name: "Apex Spider",
    price: "$520,000",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf048?q=80&w=2073&auto=format&fit=crop",
    stats: { speed: "330 km/h", acceleration: "2.9s" },
    desc: "Unobstructed adrenaline. Hear the roar of the wind and the engine in perfect harmony.",
    specs: {
      engine: "3.9L Twin-Turbo V8 Carbon-Chassis",
      power: "670 HP",
      torque: "760 Nm",
      dimensions: "4,527 x 1,937 x 1,213 mm"
    }
  }
];

const Models: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const downloadTechnicalBrief = (model: typeof models[0]) => {
    const briefContent = `
      VELOCE LUXURY AUTOMOTIVE - TECHNICAL SPECIFICATION
      --------------------------------------------------
      Model: ${model.name}
      Base Price: ${model.price}
      
      PERFORMANCE DATA
      - Top Speed: ${model.stats.speed}
      - 0-100 km/h: ${model.stats.acceleration}
      - Engine: ${model.specs.engine}
      - Horsepower: ${model.specs.power}
      - Peak Torque: ${model.specs.torque}
      
      DIMENSIONS & FEATURES
      - Dimensions: ${model.specs.dimensions}
      - Chassis: Forged Carbon Fiber Monocoque
      - Aerodynamics: Active V-Link System
      - Suspension: Predictive Magnetorheological
      
      Generated for Veloce Membership Club.
    `;

    const element = document.createElement("a");
    const file = new Blob([briefContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${model.name.replace(/\s+/g, '_')}_Technical_Brief.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="models" className="py-24 bg-[#0a0a0a] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-red-600 font-display font-bold uppercase tracking-[0.5em] text-[10px]">The Fleet</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-chrome uppercase mt-4">Precision <br className="hidden md:block" />Engineering</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {models.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`px-6 py-2 rounded-full font-display text-[10px] uppercase tracking-widest border transition-all duration-500 ${activeIdx === i ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-auto lg:h-[650px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 50, rotateY: 20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row gap-16 perspective-1000"
            >
              <div className="lg:w-3/5 relative group preserve-3d">
                <motion.div
                  whileHover={{ rotateY: -15, rotateX: 5, scale: 1.02 }}
                  className="w-full h-[300px] md:h-[450px] lg:h-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out border border-white/10"
                >
                  <img
                    src={models[activeIdx].image}
                    alt={models[activeIdx].name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
                </motion.div>

                <div className="absolute bottom-10 left-10 hidden md:block">
                  <div className="glass-morphism px-8 py-6 rounded-2xl border-red-600/30">
                    <div className="text-[10px] text-red-600 font-display font-black uppercase tracking-[0.3em] mb-2">Exclusive Edition</div>
                    <div className="text-3xl font-display font-black text-white italic">STRADA {activeIdx + 1}</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/5 flex flex-col justify-center gap-10">
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-6xl font-black text-chrome italic leading-none">{models[activeIdx].name}</h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed">{models[activeIdx].desc}</p>
                  <p className="text-2xl md:text-3xl font-display text-red-600 font-black tracking-tighter">{models[activeIdx].price}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-morphism p-6 rounded-2xl border-white/5 group hover:border-red-600/50 transition-colors">
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-display">Velocity Threshold</div>
                    <div className="text-3xl font-display font-bold text-white group-hover:text-red-500 transition-colors">{models[activeIdx].stats.speed}</div>
                  </div>
                  <div className="glass-morphism p-6 rounded-2xl border-white/5 group hover:border-red-600/50 transition-colors">
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-display">Launch Matrix</div>
                    <div className="text-3xl font-display font-bold text-white group-hover:text-red-500 transition-colors">{models[activeIdx].stats.acceleration}</div>
                  </div>
                </div>

                <div className="space-y-4">

                  <button
                    onClick={() => downloadTechnicalBrief(models[activeIdx])}
                    className="w-full py-5 border border-white/10 text-white/50 font-display font-black uppercase tracking-[0.3em] hover:bg-white/5 hover:text-white transition-all rounded-xl"
                  >
                    Download Technical Brief
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Models;

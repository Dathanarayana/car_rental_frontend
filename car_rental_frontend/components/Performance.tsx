
import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  label: string;
  value: string;
  percent: number;
  unit: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, value, percent, unit }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateY: 15 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center group cursor-pointer perspective-1000"
    >
      <div className="relative w-48 h-48">
        {/* Outer Ring */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-white/5 fill-none"
            strokeWidth="8"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-red-600 fill-none"
            strokeWidth="8"
            strokeDasharray="502.6"
            initial={{ strokeDashoffset: 502.6 }}
            whileInView={{ strokeDashoffset: 502.6 - (502.6 * percent) / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-display font-black text-chrome">{value}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">{unit}</span>
        </div>

        {/* Needle Detail */}
        <motion.div
          initial={{ rotate: -90 }}
          whileInView={{ rotate: (percent / 100) * 270 - 90 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 w-[2px] h-20 bg-red-600 origin-bottom -translate-x-1/2 -translate-y-full"
        />
      </div>
      <h3 className="mt-6 font-display font-bold uppercase tracking-[0.2em] text-sm text-white/70 group-hover:text-red-600 transition-colors">
        {label}
      </h3>
    </motion.div>
  );
};

const Performance: React.FC = () => {
  return (
    <section id="performance" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-chrome uppercase tracking-tighter"
          >
            Engineering Supremacy
          </motion.h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <Gauge label="Acceleration" value="2.5" percent={95} unit="SEC (0-100)" />
          <Gauge label="Top Speed" value="355" percent={88} unit="KM/H" />
          <Gauge label="Engine Power" value="820" percent={92} unit="HP" />
          <Gauge label="Downforce" value="450" percent={80} unit="KG" />
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-display font-bold text-white uppercase italic">Forged in Carbon</h3>
            <p className="text-white/60 leading-relaxed text-lg">
              The V-Series utilizes a revolutionary carbon-fiber monocoque chassis that weighs 30% less than traditional supercars while offering twice the torsional rigidity. Every fiber is laid by hand in our Maranello laboratory.
            </p>
            <div className="flex gap-10">
              <div>
                <div className="text-3xl font-display font-bold text-red-600">30%</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Lighter Weight</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-red-600">2.1x</div>
                <div className="text-xs uppercase tracking-widest text-white/40">More Rigidity</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 group"
          >
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
              alt="Forged Carbon Detail"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                </div>
                <span className="font-display uppercase tracking-widest text-sm text-white">Heat Shield Thermal Mapping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Performance;

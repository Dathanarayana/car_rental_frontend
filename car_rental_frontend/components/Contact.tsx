
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-morphism rounded-3xl p-8 lg:p-20 relative overflow-hidden">
          {/* Decorative steering wheel bg */}
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 opacity-5 pointer-events-none">
            <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100" fill="white">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
              <circle cx="50" cy="50" r="5" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black text-chrome uppercase tracking-tighter mb-8 leading-none">RESERVE YOUR <br /><span className="text-red-600">PLACE</span></h2>
              <p className="text-white/60 text-lg mb-12 max-w-sm">
                Connect with our consultants to begin your bespoke configuration process.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-all">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="text-white/80 font-display uppercase tracking-widest text-sm">+39 0536 123456</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-all">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-white/80 font-display uppercase tracking-widest text-sm">concierge@veloce.it</span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-red-600 font-display font-bold uppercase tracking-[0.3em]">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white focus:border-red-600 focus:outline-none transition-all" placeholder="Enzo Ferrari" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-red-600 font-display font-bold uppercase tracking-[0.3em]">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white focus:border-red-600 focus:outline-none transition-all" placeholder="enzo@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-red-600 font-display font-bold uppercase tracking-[0.3em]">Interested Model</label>
                <select className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white focus:border-red-600 focus:outline-none transition-all appearance-none">
                  <option className="bg-[#0a0a0a]">Inferno V8</option>
                  <option className="bg-[#0a0a0a]">Thunder V12</option>
                  <option className="bg-[#0a0a0a]">Spectre Hybrid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-red-600 font-display font-bold uppercase tracking-[0.3em]">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white focus:border-red-600 focus:outline-none transition-all" placeholder="How can we help you reach peak performance?"></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-red-600 text-white font-display font-black uppercase tracking-[0.3em] rounded-lg shadow-xl"
              >
                Send Transmission
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

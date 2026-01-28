
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Formula Racing Driver",
    text: "Driving the Veloce feels like becoming one with the machine. The response time of the chassis is telepathic. It's not a car, it's a nervous system extension.",
    avatar: "https://picsum.photos/200/200?random=1"
  },
  {
    name: "Sarah Jenkins",
    role: "Automotive Enthusiast",
    text: "I've owned every major supercar in the last decade. Nothing compares to the presence and raw soul of the V-Series. It's the pinnacle of design.",
    avatar: "https://picsum.photos/200/200?random=2"
  }
];

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <section id="lifestyle" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square rounded-full border-2 border-red-600/20 flex items-center justify-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent animate-pulse" />
             <img 
               src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" 
               alt="Steering Wheel" 
               className="w-4/5 h-4/5 object-contain rotate-12 drop-shadow-2xl"
             />
          </motion.div>
        </div>

        <div className="relative">
           <span className="text-red-600 font-display font-bold uppercase tracking-[0.4em] text-xs">Testimonials</span>
           <h2 className="text-4xl lg:text-5xl font-black text-white uppercase mt-4 mb-12">The Driver's Perspective</h2>

           <div className="relative min-h-[300px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={index}
                 initial={{ x: 50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: -50, opacity: 0 }}
                 transition={{ duration: 0.5, ease: "easeOut" }}
                 className="space-y-8"
               >
                 <p className="text-2xl italic text-white/80 leading-relaxed font-light">
                   "{testimonials[index].text}"
                 </p>
                 <div className="flex items-center gap-6">
                   <img src={testimonials[index].avatar} alt={testimonials[index].name} className="w-16 h-16 rounded-full border-2 border-red-600" />
                   <div>
                     <div className="text-xl font-display font-bold text-white uppercase">{testimonials[index].name}</div>
                     <div className="text-red-600 text-sm uppercase tracking-widest">{testimonials[index].role}</div>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>

           <div className="mt-12 flex gap-4">
             <button 
               onClick={() => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
             </button>
             <button 
               onClick={() => setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

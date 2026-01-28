import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Car } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface AIAssistantProps {
  onSelectCar: (car: Car) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onSelectCar }) => {
  const { setMessage } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
      if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        throw new Error('API Key missing or invalid');
      }

      const ai = new GoogleGenAI({ apiKey });
      const res = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `The user wants advice on picking a car from our luxury fleet. 
        FLEET INFO: We have Lamborghinis, Ferraris, Rolls-Royces, G-Wagons, and high-end SUVs.
        USER REQUEST: "${prompt}"
        
        Act as a sophisticated Veloce Concierge. Suggest 1-2 types of cars we carry and why they match the user's vibe. Be elegant and concise. Keep characters under 200.`
      });

      const text = res.text;
      setResponse(text || "I apologize, my systems are experiencing a slight recalibration. How else can I assist your selection today?");
    } catch (err) {
      console.error('AI Error:', err);
      setResponse("Our AI concierge is currently attending to another VIP. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="glass-morphism w-80 md:w-96 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                  <span className="text-xl">🤵</span>
                </div>
                <h3 className="font-orbitron text-[10px] tracking-[0.3em] font-black uppercase text-white">Concierge</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-all text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 h-[350px] overflow-y-auto font-rajdhani flex flex-col gap-6 custom-scrollbar bg-black/40">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/5 text-white/80 text-sm leading-relaxed"
              >
                "Welcome to the inner circle of Veloce. Tell me, what mission can I facilitate for you today?"
              </motion.div>

              {response && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-600/10 border border-red-600/20 p-5 rounded-3xl rounded-tr-none text-white text-sm leading-relaxed shadow-[0_10px_30px_rgba(255,0,0,0.1)] relative group"
                >
                  <div className="absolute -top-2 -left-2 bg-red-600 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,0,0,1)]" />
                  {response}
                </motion.div>
              )}

              {isLoading && (
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="font-orbitron text-[8px] tracking-[0.3em] text-red-500 uppercase font-bold">Synchronizing...</span>
                </div>
              )}
            </div>

            <div className="p-5 bg-white/5 border-t border-white/5 flex gap-3">
              <input
                type="text"
                placeholder="Describe your destination..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-3 font-rajdhani text-sm focus:outline-none focus:border-red-600 transition-all text-white placeholder:text-white/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAsk}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-red-900/20 group"
              >
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗️</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center text-3xl shadow-[0_20px_40px_rgba(255,0,0,0.3)] border border-white/10 group relative"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
          <span className="group-hover:animate-pulse">🍷</span>
        </motion.button>
      )}
    </div>
  );
};

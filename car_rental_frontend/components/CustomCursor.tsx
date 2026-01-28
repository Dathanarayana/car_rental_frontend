
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.5 }}
    >
      <div className={`relative flex items-center justify-center transition-all duration-300 ${isHovering ? 'rotate-45' : ''}`}>
        {/* Cursor Outer Ring */}
        <div className={`w-6 h-6 rounded-full border-2 ${isHovering ? 'border-red-600 bg-red-600/10 shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'border-white/50'}`} />
        
        {/* Internal Steering Wheel Icon on Hover */}
        {isHovering && (
           <div className="absolute inset-0 flex items-center justify-center text-white scale-50">
             <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V3m0 0a9 9 0 110 18 9 9 0 010-18zm0 8a3 3 0 100 6 3 3 0 000-6z"/>
             </svg>
           </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomCursor;

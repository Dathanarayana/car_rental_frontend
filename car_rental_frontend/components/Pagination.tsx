
import React from 'react';

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button 
        disabled={current === 0}
        onClick={() => onPageChange(current - 1)}
        className="w-12 h-12 flex items-center justify-center rounded-xl glass-card border border-white/10 hover:border-red-600 transition-colors disabled:opacity-20 disabled:pointer-events-none"
      >
        ←
      </button>

      {[...Array(total)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx)}
          className={`w-12 h-12 rounded-xl font-orbitron text-sm transition-all border ${current === idx ? 'bg-red-600 border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.4)]' : 'glass-card border-white/10 hover:border-white/30'}`}
        >
          {idx + 1}
        </button>
      ))}

      <button 
        disabled={current === total - 1}
        onClick={() => onPageChange(current + 1)}
        className="w-12 h-12 flex items-center justify-center rounded-xl glass-card border border-white/10 hover:border-red-600 transition-colors disabled:opacity-20 disabled:pointer-events-none"
      >
        →
      </button>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Filters, CarCategory } from '../types';
import { carService } from '../services/carService';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    carService.getBrands().then(setBrands);
  }, []);

  const categories = Object.values(CarCategory);

  const [searchValue, setSearchValue] = useState(filters.search);

  // Sync internal state with prop (for external resets)
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  useEffect(() => {
    // Only trigger if internal state differs from prop
    if (searchValue === filters.search) return;

    const timer = setTimeout(() => {
      onFilterChange({ search: searchValue });
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchValue, onFilterChange, filters.search]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        {/* Search */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search fleet..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full bg-white/5 border ${isSearchFocused ? 'border-red-600' : 'border-white/10'} rounded-full px-12 py-3 font-rajdhani text-base focus:outline-none transition-all duration-300`}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 lg:col-span-2">
          <button
            onClick={() => onFilterChange({ category: null })}
            className={`px-4 py-1.5 rounded-full font-orbitron text-[10px] tracking-widest transition-all ${!filters.category ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'}`}
          >
            ALL
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSearchValue('');
                onFilterChange({ category: cat, search: '' });
              }}
              className={`px-4 py-1.5 rounded-full font-orbitron text-[10px] tracking-widest transition-all ${filters.category === cat ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

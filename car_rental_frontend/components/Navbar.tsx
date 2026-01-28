import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  setView: (view: 'home' | 'login' | 'register' | 'fleet' | 'booking' | 'my-bookings') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setView }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = ['Home', 'Fleet', 'Hangar'];
  const filteredMenuItems = user ? menuItems : [];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled && !mobileMenuOpen ? 'py-2' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-700 ${isScrolled && !mobileMenuOpen ? 'glass-morphism rounded-2xl px-8 py-3 translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5 mx-4' : ''}`}>

        <div className="flex-shrink-0">
          <motion.div
            onClick={() => setView('home')}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 md:gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.4)] group-hover:rotate-[360deg] transition-transform duration-1000">
              <span className="font-display font-black text-xl md:text-2xl text-white">V</span>
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tighter text-white">VELOCE</span>
          </motion.div>
        </div>

        <div className="hidden lg:flex items-center flex-grow justify-center px-10">
          <div className="flex items-center gap-8">
            {filteredMenuItems.map((item) => (
              <motion.a
                key={item}
                href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Fleet') {
                    setView('fleet');
                  } else if (item === 'Hangar') {
                    setView('my-bookings');
                  } else if (item === 'Home') {
                    setView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="relative text-xs font-display font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors group whitespace-nowrap"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          {!user ? (
            <>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setView('login')}
                className="px-4 py-2 text-xs font-display font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all whitespace-nowrap"
              >
                Client Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 0, 0, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('register')}
                className="px-6 py-2 bg-red-600 rounded-lg text-xs font-display font-black uppercase tracking-widest text-white transition-all neon-border-red whitespace-nowrap"
              >
                Join the Club
              </motion.button>
            </>
          ) : (
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255, 0, 0, 0.6)' }}
                whileTap={{ scale: 0.9 }}
                className="relative w-14 h-14 bg-red-600/5 rounded-2xl flex items-center justify-center text-red-600 transition-all border border-red-600/20 group"
              >
                {/* Internal Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Decorative Glowing Border */}
                <div className="absolute inset-[-2px] rounded-2xl border border-red-600/40 opacity-50 shadow-[0_0_15px_rgba(255,0,0,0.3)]" />

                <svg className="w-7 h-7 relative z-10 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-56 glass-morphism rounded-xl border border-white/10 p-2 shadow-2xl z-50 backdrop-blur-2xl"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-1">
                      <p className="text-[8px] text-red-500 font-display font-black uppercase tracking-[0.2em]">Active Operator</p>
                      <p className="text-sm font-display font-bold text-white truncate uppercase tracking-tight">{user.firstName} {user.lastName}</p>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setView('home');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 text-white/70 hover:text-red-500 transition-all text-left group border-t border-white/5"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest">Terminate Session</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110] relative text-white"
        >
          <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} className="w-6 h-0.5 bg-current" />
          <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-current" />
          <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[80] bg-zinc-900/95 flex flex-col items-center justify-center p-12 lg:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {filteredMenuItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    if (item === 'Fleet') {
                      setView('fleet');
                    } else if (item === 'Hangar') {
                      setView('my-bookings');
                    } else {
                      setView('home');
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="text-4xl font-display font-black text-chrome uppercase hover:text-red-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <div className="h-px w-24 bg-red-600 my-4" />
              {!user ? (
                <>
                  <button onClick={() => { setView('login'); setMobileMenuOpen(false); }} className="text-2xl font-display font-bold text-white/50 uppercase">Login</button>
                  <button onClick={() => { setView('register'); setMobileMenuOpen(false); }} className="px-10 py-4 bg-red-600 rounded-full text-white font-display font-black uppercase tracking-widest">Register</button>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setView('home');
                    setMobileMenuOpen(false);
                  }}
                  className="px-10 py-4 border border-red-600 rounded-full text-red-600 font-display font-black uppercase tracking-widest"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

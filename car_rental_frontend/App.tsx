
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Models from './components/Models';
import Performance from './components/Performance';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import OAuthCallback from './components/Auth/OAuthCallback';
import { Fleet } from './components/Fleet';
import BookingPage from './components/Booking/BookingPage';
import MyBookings from './components/Booking/MyBookings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Car } from './types';

const MessageToast: React.FC = () => {
  const { message, setMessage } = useAuth();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-8 py-4 rounded-xl shadow-2xl backdrop-blur-md border font-display uppercase tracking-widest text-xs font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-600/20 border-green-600/50 text-green-500' :
            message.type === 'error' ? 'bg-red-600/20 border-red-600/50 text-red-500' :
              'bg-blue-600/20 border-blue-600/50 text-blue-500'
            }`}
        >
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-4 hover:scale-110 transition-transform">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const { logout, setMessage } = useAuth();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'login' | 'register' | 'fleet' | 'booking' | 'my-bookings' | 'oauth-callback'>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    // Detect if we are in an OAuth callback path
    if (window.location.pathname === '/auth/callback') {
      setView('oauth-callback');
    }
  }, []);

  useEffect(() => {
    const handleAuthError = () => {
      logout();
      setView('login');
      setMessage('Session expired. Please login again.', 'error');
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, [logout, setMessage]);

  const handleReserve = (car: Car) => {
    setSelectedCar(car);
    setView('booking');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative overflow-y-visible bg-[#0a0a0a] selection:bg-red-600 selection:text-white min-h-screen">
      <MessageToast />
      <CustomCursor />
      <Navbar setView={setView} />

      {view === 'home' && (
        <>
          <ScrollProgressBar />
          <main>
            <Hero />
            <Models />
            <Performance />
            <Features />
            <Testimonials />
          </main>
          <Footer />
        </>
      )}

      {view === 'fleet' && <Fleet onReserve={handleReserve} />}
      {view === 'login' && <Login setView={setView} />}
      {view === 'register' && <Register setView={setView} />}
      {view === 'booking' && selectedCar && (
        <BookingPage car={selectedCar} setView={setView} />
      )}
      {view === 'my-bookings' && <MyBookings setView={setView} />}
      {view === 'oauth-callback' && <OAuthCallback setView={setView} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

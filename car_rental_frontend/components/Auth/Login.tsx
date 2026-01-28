import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
  setView: (view: 'home' | 'login' | 'register') => void;
}

const Login: React.FC<LoginProps> = ({ setView }) => {
  const { login, setMessage } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Frontend validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login to /api/v1/auth/login');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
          console.log('Response data:', data);
        } catch (jsonErr) {
          console.error('JSON parsing failed:', jsonErr);
          throw new Error('Server returned an empty or invalid JSON response.');
        }
      } else {
        const text = await response.text();
        console.warn('--- NON-JSON RESPONSE DETECTED ---');
        console.warn('Status:', response.status);
        console.warn('Status Text:', response.statusText);
        console.warn('Content-Type:', contentType);
        console.warn('Body Content (first 200 chars):', text.substring(0, 200));
        console.log('Headers:', Object.fromEntries([...response.headers.entries()]));

        throw new Error(`Server returned invalid format (${response.status}). Expected JSON.`);
      }

      if (response.ok && data?.success) {
        login(data.data.user, data.data.accessToken);
        setMessage('Login successful! Welcome back.', 'success');
        setView('home');
      } else if (response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(data?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login process error:', err);

      // "Smooth Comfort Full" - Fallback for demo/dev purposes if backend is down
      const isConnectionError = (err as Error).message.includes('Failed to fetch') ||
        (err as Error).message.includes('unreachable') ||
        (err as Error).message.includes('JSON');

      if (isConnectionError) {
        console.warn('Backend server seems to be offline. Initiating Demo Mode.');
        setError('Server connection offline. Entering Demo Mode...');

        // Brief delay for better UX (showing the message)
        setTimeout(() => {
          login({
            firstName: 'Elite',
            lastName: 'Driver',
            email: formData.email || 'guest@veloce.it'
          }, 'demo-token-luxury');

          setMessage('Welcome to Veloce Demo Mode. Explorer access granted.', 'info');
          setView('home');
        }, 1500);
      } else {
        setError((err as Error).message || 'An unexpected error occurred.');
      }
    } finally {
      if (!error?.includes('Entering Demo Mode')) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 carbon-pattern relative">
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-lg glass-morphism p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 perspective-1000"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
            <span className="text-3xl font-display font-black text-white">V</span>
          </div>
          <h2 className="text-4xl font-black text-chrome uppercase tracking-tighter">Client Access</h2>
          <p className="text-white/40 font-display uppercase tracking-widest text-[10px] mt-2">Authenticated Connection Required</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-xl text-red-500 text-xs font-display uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Digital ID / Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all placeholder:text-white/20"
              placeholder="id_01994@veloce.it"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Neural Key / Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-red-600 accent-red-600" />
              <span className="text-xs text-white/40 uppercase font-display tracking-widest group-hover:text-white/60 transition-colors">Remember Node</span>
            </label>
            <button type="button" className="text-xs text-red-500 uppercase font-display font-bold tracking-widest hover:text-red-400 transition-colors">Forgot Key?</button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 40px rgba(255, 0, 0, 0.4)' }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full py-5 ${loading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600'} text-white font-display font-black uppercase tracking-[0.4em] rounded-xl shadow-xl mt-4 flex items-center justify-center gap-3`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authorizing...
              </>
            ) : 'Authorize Entry'}
          </motion.button>


        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs font-display uppercase tracking-widest">
            New operative? <button onClick={() => setView('register')} className="text-red-500 font-bold hover:underline">Apply for membership</button>
          </p>
        </div>
      </motion.div>

      <motion.button
        onClick={() => setView('home')}
        className="fixed top-10 left-10 p-4 rounded-full glass-morphism text-white/50 hover:text-white transition-all hover:scale-110 z-[100] cursor-pointer pointer-events-auto"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </motion.button>
    </div>
  );
};

export default Login;

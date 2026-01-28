import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  setView: (view: 'home' | 'login' | 'register') => void;
}

const Register: React.FC<RegisterProps> = ({ setView }) => {
  const { login, setMessage } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    driversLicense: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Frontend validation
    if (formData.firstName.length < 2 || formData.firstName.length > 50) {
      setFieldErrors({ firstName: 'First name must be 2-50 characters' });
      return;
    }
    if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      setFieldErrors({ lastName: 'Last name must be 2-50 characters' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFieldErrors({ email: 'Please provide a valid email address' });
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,100}$/;
    if (!passwordRegex.test(formData.password)) {
      setFieldErrors({ password: 'Password must be 8-100 chars with 1 uppercase, 1 lowercase, 1 digit, and 1 special character (@#$%^&+=!)' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
          driversLicense: formData.driversLicense || undefined,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error('JSON parsing failed:', jsonErr);
          throw new Error('Server returned an invalid response format.');
        }
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server unreachable or returned an invalid format.');
      }

      if (response.ok && data?.success) {
        login(data.data.user, data.data.accessToken);
        setMessage('Registration successful! Please check your mail to activate your account.', 'success');
        setView('home');
      } else if (response.status === 409) {
        setError('This email is already registered. Please use a different email or login.');
      } else if (response.status === 400 || response.status === 422) {
        setError(data?.message || 'Validation failed');
        if (data?.error?.details) {
          setFieldErrors(data.error.details);
        }
      } else {
        setError(data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);

      const isConnectionError = (err as Error).message.includes('Failed to fetch') ||
        (err as Error).message.includes('unreachable') ||
        (err as Error).message.includes('JSON');

      if (isConnectionError) {
        setError('Server offline. Creating demo profile...');
        setTimeout(() => {
          login({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
          }, 'demo-token-reg');

          setMessage('Welcome to Veloce! Demo profile created successfully.', 'success');
          setView('home');
        }, 1500);
      } else {
        setError((err as Error).message || 'Connection to server failed.');
      }
    } finally {
      if (!error?.includes('Creating demo profile')) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 carbon-pattern relative">
      <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-2xl glass-morphism p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-chrome uppercase tracking-tighter">Membership Application</h2>
          <p className="text-white/40 font-display uppercase tracking-widest text-[10px] mt-2">Join the world's most exclusive automotive collective</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-xl text-red-500 text-xs font-display uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">First Name</label>
              <input
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${fieldErrors.firstName ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all`}
                placeholder="Horacio"
              />
              {fieldErrors.firstName && <p className="text-[9px] text-red-500 uppercase ml-2">{fieldErrors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Last Name</label>
              <input
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${fieldErrors.lastName ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all`}
                placeholder="Pagani"
              />
              {fieldErrors.lastName && <p className="text-[9px] text-red-500 uppercase ml-2">{fieldErrors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white/5 border ${fieldErrors.email ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all`}
              placeholder="contact@veloce.it"
            />
            {fieldErrors.email && <p className="text-[9px] text-red-500 uppercase ml-2">{fieldErrors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Secure Passcode</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${fieldErrors.password ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all`}
              />
              {fieldErrors.password && <p className="text-[9px] text-red-500 uppercase ml-2">{fieldErrors.password}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-red-500 font-display font-bold uppercase tracking-[0.3em] ml-2">Confirm Node Key</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${fieldErrors.confirmPassword ? 'border-red-600' : 'border-white/10'} p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all`}
              />
              {fieldErrors.confirmPassword && <p className="text-[9px] text-red-500 uppercase ml-2">{fieldErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="p-4 bg-red-600/5 border border-red-600/20 rounded-xl">
            <p className="text-[10px] text-white/50 uppercase leading-relaxed text-center font-display tracking-widest">
              By applying, you agree to our <span className="text-red-500 font-bold">Terms of Performance</span> and data privacy protocols. All applications are subject to high-speed verification.
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 40px rgba(255, 0, 0, 0.4)' }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full py-5 ${loading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600'} text-white font-display font-black uppercase tracking-[0.4em] rounded-xl shadow-xl flex items-center justify-center gap-3`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : 'Initiate Protocol'}
          </motion.button>
        </form>



        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs font-display uppercase tracking-widest">
            Already verified? <button onClick={() => setView('login')} className="text-red-500 font-bold hover:underline">Access node</button>
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

export default Register;

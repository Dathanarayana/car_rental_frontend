import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../../types';
import { buildSketchfabUrl } from '../../utils/sketchfab';
import BookingForm from './BookingForm';

interface BookingPageProps {
    car: Car;
    setView: (view: 'home' | 'fleet' | 'booking' | 'my-bookings') => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ car, setView }) => {
    const [successReference, setSuccessReference] = useState<string | null>(null);

    const handleSuccess = (reference: string) => {
        setSuccessReference(reference);
    };

    return (
        <main className="min-h-screen pt-32 pb-40 px-6 carbon-pattern relative flex flex-col">
            <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-6xl z-10 relative mx-auto"
            >
                <AnimatePresence mode="wait">
                    {!successReference ? (
                        <div key="booking-flow" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                            {/* Left Side: Car Info */}
                            <div className="space-y-6 lg:space-y-8">
                                <div className="space-y-4">
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="font-orbitron text-red-500 text-[10px] tracking-[0.5em] uppercase block"
                                    >
                                        Exotic Fleet Reservation
                                    </motion.span>
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="font-orbitron text-3xl md:text-5xl font-black chrome-text uppercase tracking-tighter"
                                    >
                                        {car.brand}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="font-rajdhani text-xl text-white/60 uppercase tracking-[0.2em]"
                                    >
                                        {car.model}
                                    </motion.p>
                                </div>

                                <div className="aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 relative group bg-[#050505]">
                                    <iframe
                                        src={buildSketchfabUrl(car.imageUrl, { autostart: true, ui_infos: false, ui_controls: false })}
                                        title={`${car.fullName} 3D View`}
                                        className="w-full h-full border-none"
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-40"></div>
                                    <div className="absolute bottom-4 left-6">
                                        <p className="font-orbitron text-[8px] tracking-widest text-white/50 mb-1 uppercase">Daily Rate</p>
                                        <p className="font-orbitron text-2xl font-black text-white">${car.pricePerDay}<span className="text-[10px] font-normal text-white/40">/DAY</span></p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Power', value: '700+ HP' },
                                        { label: 'Top Speed', value: '210+ MPH' },
                                        { label: 'Engine', value: 'V12 Bi-Turbo' },
                                        { label: 'Category', value: car.category }
                                    ].map((spec, i) => (
                                        <div key={i} className="glass-card p-4 rounded-2xl border border-white/5">
                                            <p className="text-[8px] font-orbitron text-red-500/60 uppercase tracking-widest mb-1">{spec.label}</p>
                                            <p className="font-rajdhani text-white font-bold text-lg">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <BookingForm
                                car={car}
                                onSuccess={handleSuccess}
                                onCancel={() => setView('fleet')}
                            />
                        </div>
                    ) : (
                        <motion.div
                            key="success-view"
                            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            className="w-full max-w-2xl mx-auto glass-morphism p-8 md:p-12 rounded-[40px] border border-green-500/20 text-center relative overflow-hidden z-50"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
                            <div className="mb-8 w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                ✓
                            </div>
                            <h2 className="font-orbitron text-2xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4">Transmission Confirmed</h2>
                            <p className="font-rajdhani text-white/60 text-base md:text-lg mb-8 leading-relaxed">
                                Your reservation for the <span className="text-white font-bold">{car.fullName}</span> has been processed. A confirmation packet has been encrypted and sent to your secure email.
                            </p>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10">
                                <p className="text-[10px] font-orbitron text-white/40 uppercase tracking-[0.3em] mb-2">Reservation Node Reference</p>
                                <p className="font-orbitron text-2xl font-black text-green-500 tracking-[0.2em]">{successReference}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setView('my-bookings')}
                                    className="flex-1 py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-orbitron text-[10px] font-black tracking-[0.3em] transition-all uppercase"
                                >
                                    View My Hangar
                                </button>
                                <button
                                    onClick={() => setView('home')}
                                    className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-orbitron text-[10px] tracking-[0.3em] transition-all border border-white/5 uppercase"
                                >
                                    Return to Command
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Back Button */}
            {!successReference && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setView('fleet')}
                    className="fixed top-10 left-10 p-4 rounded-full glass-morphism text-white/50 hover:text-white transition-all hover:scale-110 z-[60]"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </motion.button>
            )}
        </main>
    );
};

export default BookingPage;

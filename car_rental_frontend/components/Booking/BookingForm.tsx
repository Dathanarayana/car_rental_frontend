import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, BookingRequest, BookingStatus } from '../../types';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../contexts/AuthContext';

interface BookingFormProps {
    car: Car;
    onSuccess: (bookingReference: string) => void;
    onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ car, onSuccess, onCancel }) => {
    const { user, setMessage } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<BookingRequest, 'carId'>>({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        pickupLocation: 'Veloce HQ, Modena',
        dropoffLocation: 'Veloce HQ, Modena',
        notes: ''
    });

    const [totalPrice, setTotalPrice] = useState(car.pricePerDay);

    useEffect(() => {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            const diffTime = Math.max(0, end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setTotalPrice(diffDays * car.pricePerDay);
        }
    }, [formData.startDate, formData.endDate, car.pricePerDay]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            setError("Start date cannot be in the past.");
            return;
        }

        if (end < start) {
            setError("End date must be after or on the start date.");
            return;
        }

        setLoading(true);

        try {
            const request: BookingRequest = {
                carId: car.id,
                ...formData
            };

            const res = await bookingService.createBooking(request);

            if (res.success) {
                setMessage(`Booking successful! Reference: ${res.data.reference}`, 'success');
                onSuccess(res.data.reference);
            } else {
                setError(res.message || "Failed to create booking.");
            }
        } catch (err: any) {
            console.error("Booking error:", err);
            setError(err.message || "An error occurred while creating your booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-morphism p-4 sm:p-6 md:p-8 rounded-[24px] border border-white/10 shadow-2xl relative overflow-visible"
            >
                {/* Decorative steering wheel bg */}
                <div className="absolute top-1/2 left-[-20%] -translate-y-1/2 opacity-[0.05] pointer-events-none">
                    <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="white">
                        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
                        <circle cx="50" cy="50" r="5" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="mb-6 text-center">
                        <h3 className="font-orbitron font-black text-2xl uppercase tracking-tighter chrome-text mb-1">Secure Reservation</h3>
                        <p className="font-rajdhani text-white/40 uppercase tracking-widest text-[10px]">Complete your high-performance booking</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-8 p-4 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500 text-xs font-orbitron uppercase tracking-widest text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] text-red-500 font-orbitron font-bold uppercase tracking-[0.3em] ml-2">Pickup Date</label>
                                <div className="relative group">
                                    <input
                                        name="startDate"
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all font-rajdhani text-base"
                                    />
                                    <div className="absolute inset-0 rounded-xl border border-red-600/0 group-hover:border-red-600/20 pointer-events-none transition-all"></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] text-red-500 font-orbitron font-bold uppercase tracking-[0.3em] ml-2">Return Date</label>
                                <div className="relative group">
                                    <input
                                        name="endDate"
                                        type="date"
                                        required
                                        min={formData.startDate}
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all font-rajdhani text-base"
                                    />
                                    <div className="absolute inset-0 rounded-xl border border-red-600/0 group-hover:border-red-600/20 pointer-events-none transition-all"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] text-red-500 font-orbitron font-bold uppercase tracking-[0.3em] ml-2">Pickup Location</label>
                                <input
                                    name="pickupLocation"
                                    type="text"
                                    value={formData.pickupLocation}
                                    onChange={handleChange}
                                    placeholder="e.g. Modena Central"
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all font-rajdhani text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] text-red-500 font-orbitron font-bold uppercase tracking-[0.3em] ml-2">Dropoff Location</label>
                                <input
                                    name="dropoffLocation"
                                    type="text"
                                    value={formData.dropoffLocation}
                                    onChange={handleChange}
                                    placeholder="e.g. Milan Airport"
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all font-rajdhani text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] text-red-500 font-orbitron font-bold uppercase tracking-[0.3em] ml-2">Special Requirements (Optional)</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-red-600 focus:outline-none transition-all font-rajdhani text-sm resize-y min-h-[80px] max-h-[200px]"
                                placeholder="Tell us about any specific needs..."
                            />
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-[9px] font-orbitron tracking-widest text-white/30 uppercase mb-1">Total Experience Investment</p>
                                    <p className="font-orbitron text-3xl font-black neon-text">${totalPrice.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-rajdhani text-white/40 text-base">${car.pricePerDay.toLocaleString()} / DAY</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-orbitron text-[9px] tracking-[0.3em] transition-all duration-300 border border-white/5 uppercase"
                                >
                                    Abort
                                </button>
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    className={`flex-[2] py-4 ${loading ? 'bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white rounded-xl font-orbitron text-[9px] font-black tracking-[0.4em] transition-all duration-300 shadow-[0_0_30px_rgba(255,0,0,0.3)] uppercase flex items-center justify-center gap-3`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>Confirm <span className="text-lg">→</span></>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingForm;

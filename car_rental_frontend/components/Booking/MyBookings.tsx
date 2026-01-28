import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingDTO, BookingStatus } from '../../types';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../contexts/AuthContext';
import { BookingCancellationModal } from '../BookingCancellationModal';
import { buildSketchfabUrl } from '../../utils/sketchfab';

interface MyBookingsProps {
    setView: (view: 'home' | 'login' | 'register' | 'fleet' | 'booking' | 'my-bookings') => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ setView }) => {
    const { setMessage } = useAuth();
    const [bookings, setBookings] = useState<BookingDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<BookingDTO | null>(null);
    const [cancellingId, setCancellingId] = useState<number | null>(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await bookingService.getMyBookings();
            if (res.success) {
                setBookings(res.data);
            } else {
                setError(res.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    const openCancelModal = (booking: BookingDTO) => {
        setBookingToCancel(booking);
        setIsCancelModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (!bookingToCancel) return;

        setCancellingId(bookingToCancel.id);
        try {
            const res = await bookingService.cancelBooking(bookingToCancel.id, "User requested cancellation via dashboard");
            if (res.success) {
                setMessage("Reservation cancelled successfully", "success");
                setBookings(bookings.map(b => b.id === bookingToCancel.id ? { ...b, status: BookingStatus.CANCELLED } : b));
                setIsCancelModalOpen(false);
            } else {
                setMessage(res.message, "error");
            }
        } catch (err: any) {
            setMessage(err.message || "Cancellation failed", "error");
        } finally {
            setCancellingId(null);
        }
    };

    const getStatusStyle = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.CONFIRMED: return 'bg-green-500/20 text-green-500 border-green-500/30';
            case BookingStatus.PENDING: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
            case BookingStatus.CANCELLED: return 'bg-red-500/20 text-red-500 border-red-500/30';
            case BookingStatus.COMPLETED: return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
            default: return 'bg-white/10 text-white border-white/10';
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-40 px-6 carbon-pattern relative">
            <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-orbitron text-red-500 text-[10px] tracking-[0.5em] uppercase block mb-2"
                        >
                            Private Collection
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-orbitron text-4xl md:text-6xl font-black chrome-text uppercase tracking-tighter"
                        >
                            My Reservations
                        </motion.h1>
                    </div>

                    <button
                        onClick={() => setView('fleet')}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-orbitron text-[10px] font-black tracking-[0.3em] transition-all uppercase shadow-[0_0_30px_rgba(255,0,0,0.3)]"
                    >
                        Reserve New Vehicle
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-16 h-16 border-4 border-white/5 border-t-red-600 rounded-full animate-spin"></div>
                        <p className="font-orbitron text-xs tracking-widest text-white/40 uppercase">Synchronizing with Global Fleet...</p>
                    </div>
                ) : error ? (
                    <div className="glass-morphism p-20 rounded-[40px] text-center border border-red-600/20">
                        <p className="font-orbitron text-red-500 mb-6 uppercase tracking-widest">{error}</p>
                        <button onClick={fetchBookings} className="text-white hover:underline uppercase text-xs font-orbitron tracking-widest">Retry Connection</button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="glass-morphism p-20 rounded-[40px] border border-white/5 text-center">
                        <div className="text-6xl mb-8 opacity-20">🏎️</div>
                        <h2 className="font-orbitron text-2xl font-black text-white/60 mb-4 uppercase tracking-tighter">Your Hangar is Empty</h2>
                        <p className="font-rajdhani text-white/40 mb-10 max-w-md mx-auto">You haven't reserved any high-performance vehicles yet. Start your journey with our exclusive fleet.</p>
                        <button
                            onClick={() => setView('fleet')}
                            className="px-10 py-5 border border-white/20 hover:border-red-600 hover:text-red-500 text-white rounded-2xl font-orbitron text-xs font-bold tracking-[0.2em] transition-all uppercase"
                        >
                            Explore Fleet
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnimatePresence>
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        delay: index * 0.1
                                    }}
                                    className="glass-morphism rounded-[32px] border border-white/5 overflow-hidden hover:border-red-600/30 transition-all group relative bg-gradient-to-br from-zinc-900/50 to-black/50"
                                >
                                    <div className="absolute top-8 right-8 z-10">
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`px-4 py-1 rounded-full text-[8px] font-orbitron font-bold uppercase tracking-widest border shadow-lg ${getStatusStyle(booking.status)}`}
                                        >
                                            {booking.status}
                                        </motion.span>
                                    </div>
                                    <div className="p-10">
                                        {/* Luxury Header Section */}
                                        <div className="mb-10 pb-8 border-b border-white/5 relative">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-orbitron text-red-500 font-bold uppercase tracking-[0.4em]">MISSION ID</span>
                                                    <span className="text-sm font-orbitron text-white font-black tracking-[0.2em]">
                                                        #{booking.reference || (booking as any).bookingNumber || (booking as any).confirmationCode || 'PRT-X' + booking.id}
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    <h3 className="font-orbitron font-black text-white uppercase tracking-tighter text-4xl chrome-text leading-tight">
                                                        {booking.car?.brand || (booking as any).carBrand || (booking as any).vehicleBrand || (booking.car?.fullName?.split(' ')[1]) || 'UNIDENTIFIED'}
                                                    </h3>
                                                    <div className="inline-block mt-2 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
                                                        <p className="text-[11px] font-orbitron text-red-500 font-black uppercase tracking-[0.3em]">
                                                            {booking.car?.model || (booking as any).carModel || (booking as any).vehicleModel || (booking.car?.fullName?.split(' ').slice(2).join(' ')) || 'EXPERIMENTAL UNIT'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Accent Elements */}
                                            <div className="absolute -bottom-px left-0 w-24 h-px bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 mb-10">
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-orbitron text-white/30 uppercase tracking-[0.3em]">Temporal Range</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                                    <p className="font-rajdhani text-white text-sm font-semibold tracking-wide">{booking.startDate} — {booking.endDate}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-orbitron text-white/30 uppercase tracking-[0.3em]">Investment</p>
                                                <p className="font-orbitron text-2xl font-black neon-text leading-none">${booking.totalPrice.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            {booking.status === BookingStatus.PENDING && (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    disabled={cancellingId === booking.id}
                                                    onClick={() => openCancelModal(booking)}
                                                    className="w-full py-5 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white border border-red-500/30 rounded-2xl font-orbitron text-[10px] font-black tracking-[0.4em] uppercase transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(255,0,0,0.2)]"
                                                >
                                                    {cancellingId === booking.id ? 'TERMINATING...' : 'ABORT MISSION'}
                                                </motion.button>
                                            )}
                                            {booking.status !== BookingStatus.PENDING && (
                                                <div className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-center opacity-40">
                                                    <span className="font-orbitron text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase">MISSION {booking.status}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <BookingCancellationModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleConfirmCancel}
                booking={bookingToCancel}
                loading={!!cancellingId}
            />

            <motion.button
                onClick={() => setView('home')}
                className="fixed top-10 left-10 p-4 rounded-full glass-morphism text-white/50 hover:text-white transition-all hover:scale-110 z-[100]"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </motion.button>
        </main>
    );
};

export default MyBookings;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    car: Car | null;
    loading?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    car,
    loading
}) => {
    if (!isOpen || !car) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md bg-zinc-950 border border-red-600/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,0,0,0.15)] overflow-hidden p-10 text-center"
                >
                    <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                        <span className="text-4xl">⚠️</span>
                    </div>

                    <h2 className="text-2xl font-orbitron font-black uppercase text-white mb-4 tracking-tighter">
                        Confirm Deletion
                    </h2>

                    <p className="text-white/60 font-rajdhani uppercase tracking-widest text-sm mb-6 leading-relaxed">
                        Are you sure you want to remove this vehicle from the fleet?
                    </p>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 mb-8">
                        <p className="text-white font-orbitron font-bold uppercase tracking-widest">
                            {car.year} {car.brand} {car.model}
                        </p>
                        <p className="text-red-500 font-rajdhani text-xs mt-1 font-bold">
                            ID: {car.licensePlate}
                        </p>
                    </div>

                    <p className="text-red-600 font-orbitron text-[10px] font-bold uppercase tracking-widest mb-8 animate-pulse">
                        ⚠️ This action cannot be undone!
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-orbitron text-xs uppercase tracking-[0.2em] rounded-2xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-orbitron font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-red-900/40 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Deleting...' : '🗑️ Delete'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarRequestDTO, CarCategory, Transmission, FuelType } from '../types';
import { carService } from '../services/carService';
import { useAuth } from '../contexts/AuthContext';

interface AdminCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    carToEdit?: Car | null;
}

export const AdminCarModal: React.FC<AdminCarModalProps> = ({ isOpen, onClose, onSuccess, carToEdit }) => {
    const { setMessage } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CarRequestDTO>({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        category: CarCategory.LUXURY,
        pricePerDay: 0,
        color: '',
        seats: 2,
        transmission: Transmission.AUTOMATIC,
        fuelType: FuelType.PETROL,
        mileage: 0,
        features: [],
        imageUrl: '',
        description: ''
    });

    useEffect(() => {
        if (carToEdit) {
            setFormData({
                brand: carToEdit.brand,
                model: carToEdit.model,
                year: carToEdit.year,
                licensePlate: carToEdit.licensePlate,
                category: carToEdit.category,
                pricePerDay: carToEdit.pricePerDay,
                color: carToEdit.color,
                seats: carToEdit.seats,
                transmission: carToEdit.transmission as Transmission,
                fuelType: carToEdit.fuelType as FuelType,
                mileage: carToEdit.mileage,
                features: carToEdit.features || [],
                imageUrl: carToEdit.imageUrl,
                description: carToEdit.description
            });
        } else {
            setFormData({
                brand: '',
                model: '',
                year: new Date().getFullYear(),
                licensePlate: '',
                category: CarCategory.LUXURY,
                pricePerDay: 0,
                color: '',
                seats: 2,
                transmission: Transmission.AUTOMATIC,
                fuelType: FuelType.PETROL,
                mileage: 0,
                features: [],
                imageUrl: '',
                description: ''
            });
        }
    }, [carToEdit, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (carToEdit) {
                await carService.updateCar(carToEdit.id, formData);
                setMessage('✅ Vehicle updated successfully!', 'success');
            } else {
                await carService.addCar(formData);
                setMessage(`🎉 Vehicle added successfully! ${formData.brand} ${formData.model} is now in your fleet.`, 'success');
            }
            onSuccess();
            onClose();
        } catch (err) {
            setMessage((err as Error).message || '❌ Something went wrong. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureToggle = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...(prev.features || []), feature]
        }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-zinc-950/90 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl"
                >
                    {/* Decorative steering wheel bg */}
                    <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 opacity-[0.03] pointer-events-none">
                        <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100" fill="white">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
                            <circle cx="50" cy="50" r="5" />
                        </svg>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"></div>

                    <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <header className="mb-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-orbitron font-black uppercase tracking-tighter text-white">
                                    {carToEdit ? '✏️ Edit Vehicle' : '🚗 Add New Vehicle'}
                                </h2>
                                <p className="text-white/40 font-rajdhani uppercase tracking-[0.2em] text-xs mt-1">
                                    Fleet Management Protocol
                                </p>
                            </div>
                            <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Image URL Section */}
                            <div className="relative group">
                                <label className="text-[10px] text-blue-500 font-orbitron font-bold uppercase tracking-widest mb-2 block">
                                    3D Model / Image URL (Sketchfab Embed)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-rajdhani focus:border-purple-600 focus:outline-none transition-all"
                                    placeholder="https://sketchfab.com/models/..."
                                />
                            </div>

                            {/* Main Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Brand</label>
                                    <input
                                        type="text" required
                                        value={formData.brand}
                                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                        placeholder="e.g. Lamborghini"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Model</label>
                                    <input
                                        type="text" required
                                        value={formData.model}
                                        onChange={e => setFormData({ ...formData, model: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                        placeholder="e.g. Aventador SVJ"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Year</label>
                                    <input
                                        type="number" required
                                        value={formData.year}
                                        onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">License Plate</label>
                                    <input
                                        type="text" required
                                        value={formData.licensePlate}
                                        onChange={e => setFormData({ ...formData, licensePlate: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all uppercase"
                                        placeholder="ABC-1234"
                                    />
                                </div>
                            </div>

                            {/* Category & Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value as CarCategory })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all appearance-none"
                                    >
                                        {Object.values(CarCategory).map(cat => (
                                            <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Price Per Day ($)</label>
                                    <input
                                        type="number" required
                                        value={formData.pricePerDay}
                                        onChange={e => setFormData({ ...formData, pricePerDay: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Technical Specs */}
                            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                                <h3 className="text-[10px] font-orbitron font-bold uppercase tracking-[0.3em] mb-6 text-white/20 text-center italic">Vehicle Technical Profile</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-[8px] text-white/30 uppercase tracking-widest mb-1 block">Color</label>
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={e => setFormData({ ...formData, color: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                            placeholder="Silver"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] text-white/30 uppercase tracking-widest mb-1 block">Seats</label>
                                        <input
                                            type="number"
                                            value={formData.seats}
                                            onChange={e => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] text-white/30 uppercase tracking-widest mb-1 block">Transmission</label>
                                        <select
                                            value={formData.transmission}
                                            onChange={e => setFormData({ ...formData, transmission: e.target.value as Transmission })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all appearance-none"
                                        >
                                            {Object.values(Transmission).map(t => <option key={t} value={t} className="bg-zinc-900">{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[8px] text-white/30 uppercase tracking-widest mb-1 block">Fuel Type</label>
                                        <select
                                            value={formData.fuelType}
                                            onChange={e => setFormData({ ...formData, fuelType: e.target.value as FuelType })}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all appearance-none"
                                        >
                                            {Object.values(FuelType).map(f => <option key={f} value={f} className="bg-zinc-900">{f}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Features Tags */}
                            <div>
                                <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-4 block">Included Features</label>
                                <div className="flex flex-wrap gap-2">
                                    {['GPS', 'Bluetooth', 'Sunroof', 'Leather', 'Backup Cam', 'Heated Seats', 'Autopilot', 'Carbon Fiber'].map(feature => (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() => handleFeatureToggle(feature)}
                                            className={`px-4 py-2 rounded-full font-rajdhani text-xs uppercase tracking-widest transition-all ${formData.features?.includes(feature)
                                                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-[10px] text-white/40 font-orbitron font-bold uppercase tracking-widest mb-2 block">Vehicle Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-rajdhani focus:border-red-600 focus:outline-none transition-all h-32 resize-none"
                                    placeholder="Describe the driving experience..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-orbitron text-xs uppercase tracking-[0.2em] rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-orbitron font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-purple-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : (
                                        <>
                                            <span>{carToEdit ? '💾 Save Changes' : '🚀 Add Vehicle'}</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

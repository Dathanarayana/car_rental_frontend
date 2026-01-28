import React, { useState, useEffect, useCallback } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { FilterBar } from './FilterBar';
import { CarCard } from './CarCard';
import { CarDetailModal } from './CarDetailModal';
import { AdminCarModal } from './AdminCarModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { AIAssistant } from './AIAssistant';
import { Pagination } from './Pagination';
import { carService } from '../services/carService';
import { Car, Filters, PagedResponse, CarStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface FleetProps {
    onReserve: (car: Car) => void;
}

export const Fleet: React.FC<FleetProps> = ({ onReserve }) => {
    const { isAdmin, setMessage } = useAuth();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    // Admin States
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [carToEdit, setCarToEdit] = useState<Car | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<Car | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        search: '',
        category: null,
        brand: null,
        sortBy: 'pricePerDay',
        sortDir: 'asc'
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 7;

    const fetchCars = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let response: PagedResponse<Car>;

            if (filters.search) {
                response = await carService.searchCars(filters.search, currentPage, PAGE_SIZE);
            } else if (filters.category) {
                response = await carService.getCarsByCategory(filters.category, currentPage, PAGE_SIZE);
            } else {
                response = await carService.getCars(currentPage, PAGE_SIZE, filters.sortBy, filters.sortDir);
            }

            setCars(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Failed to fetch elite fleet. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [filters, currentPage]);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setCurrentPage(0); // Reset to first page on filter change
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // ADMIN HANDLERS
    const handleEdit = (car: Car) => {
        setCarToEdit(car);
        setIsAdminModalOpen(true);
    };

    const handleDeleteClick = (car: Car) => {
        setCarToDelete(car);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!carToDelete) return;
        setActionLoading(true);
        try {
            await carService.deleteCar(carToDelete.id);
            setMessage('🗑️ Vehicle removed from fleet.', 'success');
            setIsDeleteModalOpen(false);
            setCarToDelete(null);
            fetchCars(); // Refresh list
        } catch (err) {
            setMessage((err as Error).message, 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, status: CarStatus) => {
        try {
            await carService.updateCarStatus(id, status);
            setMessage(`🔄 Status changed to ${status}`, 'success');
            setCars(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        } catch (err) {
            setMessage('❌ Failed to update status.', 'error');
        }
    };

    return (
        <div className="min-h-screen carbon-pattern text-white flex flex-col pt-24">
            {/* Centered Header */}
            <header className="pt-12 pb-8 text-center relative px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-orbitron text-5xl md:text-7xl font-black tracking-[0.2em] uppercase chrome-text"
                >
                    CHOOSE YOUR CAR
                </motion.h1>

                {isAdmin && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 flex justify-center"
                    >
                        <button
                            onClick={() => { setCarToEdit(null); setIsAdminModalOpen(true); }}
                            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-orbitron font-black text-sm tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all active:scale-95"
                        >
                            <span className="relative z-10">🚀 Add New Ride</span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                        </button>
                    </motion.div>
                )}
            </header>

            <main className="flex-1 flex flex-col items-center px-4 pb-20">
                {/* Simplified Filter for this View */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-4xl mb-16"
                >
                    <FilterBar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </motion.div>

                {loading ? (
                    <div className="w-full h-[60vh] flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center glass-card p-12 rounded-[40px]">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="font-orbitron text-2xl mb-2 uppercase">{error}</h3>
                        <button
                            onClick={fetchCars}
                            className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-full font-orbitron text-sm tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                        >
                            RETRY CONNECTION
                        </button>
                    </div>
                ) : cars.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center glass-card p-12 rounded-[40px]">
                        <div className="text-8xl mb-6 opacity-20">🏎️</div>
                        <h3 className="font-orbitron text-3xl mb-2">NO VEHICLES FOUND</h3>
                        <button
                            onClick={() => handleFilterChange({ search: '', category: null, brand: null })}
                            className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-full font-orbitron text-sm tracking-widest"
                        >
                            RESET FILTERS
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-12 w-full max-w-[1600px]">
                        <LayoutGroup>
                            <motion.div
                                layout
                                className="w-full h-auto lg:h-[70vh] flex flex-col lg:flex-row gap-3 p-2"
                            >
                                {cars.map((car) => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        onViewDetails={() => setSelectedCar(car)}
                                        onEdit={handleEdit}
                                        onDelete={handleDeleteClick}
                                        onStatusChange={handleStatusUpdate}
                                    />
                                ))}
                            </motion.div>
                        </LayoutGroup>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Pagination
                                current={currentPage}
                                total={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </motion.div>
                    </div>
                )}
            </main>

            {/* Modals */}
            <CarDetailModal
                car={selectedCar}
                isOpen={!!selectedCar}
                onClose={() => setSelectedCar(null)}
                onReserve={onReserve}
            />

            <AdminCarModal
                isOpen={isAdminModalOpen}
                onClose={() => { setIsAdminModalOpen(false); setCarToEdit(null); }}
                onSuccess={fetchCars}
                carToEdit={carToEdit}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setCarToDelete(null); }}
                onConfirm={confirmDelete}
                car={carToDelete}
                loading={actionLoading}
            />


        </div>
    );
};

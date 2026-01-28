import { BookingRequest, BookingDTO, ApiResponse, PagedResponse, BookingStatus } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const bookingService = {
    getAuthHeaders() {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    },

    async handleResponse(response: Response) {
        if (response.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('token');
            // Dispatch event for App.tsx to handle redirect to login
            window.dispatchEvent(new CustomEvent('auth-error', { detail: 'Unauthorized' }));
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'An unexpected error occurred');
        }
        return response.json();
    },

    // --- CUSTOMER ENDPOINTS ---

    async createBooking(bookingData: BookingRequest): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(bookingData),
        });
        return this.handleResponse(response);
    },

    async getMyBookings(): Promise<ApiResponse<BookingDTO[]>> {
        const response = await fetch(`${API_BASE}/bookings/my`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async getMyBookingsPaged(page = 0, size = 10): Promise<ApiResponse<PagedResponse<BookingDTO>>> {
        const response = await fetch(`${API_BASE}/bookings/my/paged?page=${page}&size=${size}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async getBookingById(id: number): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings/${id}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async getBookingByReference(reference: string): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings/reference/${reference}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async cancelBooking(id: number, reason: string): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings/${id}/cancel?reason=${encodeURIComponent(reason)}`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    // --- ADMIN ENDPOINTS ---

    async getAllBookings(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc'): Promise<ApiResponse<PagedResponse<BookingDTO>>> {
        const response = await fetch(
            `${API_BASE}/bookings/admin/all?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
            { headers: this.getAuthHeaders() }
        );
        return this.handleResponse(response);
    },

    async getBookingsByStatus(status: BookingStatus, page = 0, size = 10): Promise<ApiResponse<PagedResponse<BookingDTO>>> {
        const response = await fetch(`${API_BASE}/bookings/admin/status/${status}?page=${page}&size=${size}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async searchBookings(query: string, page = 0, size = 10): Promise<ApiResponse<PagedResponse<BookingDTO>>> {
        const response = await fetch(`${API_BASE}/bookings/admin/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async getBookingsForCar(carId: number): Promise<ApiResponse<BookingDTO[]>> {
        const response = await fetch(`${API_BASE}/bookings/admin/car/${carId}`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async getUpcomingBookings(): Promise<ApiResponse<BookingDTO[]>> {
        const response = await fetch(`${API_BASE}/bookings/admin/upcoming`, {
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async confirmBooking(id: number): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings/admin/${id}/confirm`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    },

    async completeBooking(id: number): Promise<ApiResponse<BookingDTO>> {
        const response = await fetch(`${API_BASE}/bookings/admin/${id}/complete`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse(response);
    }
};

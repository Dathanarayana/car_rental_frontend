
export enum CarCategory {
  ECONOMY = 'ECONOMY',
  COMPACT = 'COMPACT',
  MIDSIZE = 'MIDSIZE',
  FULLSIZE = 'FULLSIZE',
  SUV = 'SUV',
  LUXURY = 'LUXURY',
  SPORTS = 'SPORTS',
  VAN = 'VAN',
  SEDAN = 'SEDAN',
  CONVERTIBLE = 'CONVERTIBLE'
}

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  BOOKED = 'BOOKED',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED'
}

export enum Transmission {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL'
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID'
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  category: CarCategory;
  pricePerDay: number;
  status: CarStatus;
  description: string;
  imageUrl: string;
  seats: number;
  transmission: Transmission | string;
  fuelType: FuelType | string;
  mileage: number;
  features?: string[];
  fullName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CarRequestDTO {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  category: CarCategory;
  pricePerDay: number;
  color?: string;
  seats?: number;
  transmission: Transmission;
  fuelType: FuelType;
  mileage?: number;
  features?: string[];
  imageUrl?: string;
  description?: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface PagedResponse<T> {
  success: boolean;
  message: string;
  data: {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

export interface Filters {
  search: string;
  category: string | null;
  brand: string | null;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface BookingRequest {
  carId: number;
  startDate: string;
  endDate: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  notes?: string;
}

export interface BookingDTO {
  id: number;
  reference: string;
  userEmail: string;
  car: Car;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: BookingStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

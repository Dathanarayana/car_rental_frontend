
import { Car, PagedResponse, CarCategory, CarStatus, CarRequestDTO, Transmission, FuelType } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Enhanced Mock Data for when the API is not available
const MOCK_CARS: Car[] = [
  {
    id: 1,
    brand: "LAMBORGHINI",
    model: "Aventador SVJ",
    year: 2024,
    licensePlate: "VEL-001",
    color: "Arancio Atlas",
    category: CarCategory.SPORTS,
    pricePerDay: 2500,
    status: CarStatus.AVAILABLE,
    description: "Built to exceed all expectations. The Aventador SVJ combines cutting-edge technology with extraordinary design.",
    imageUrl: "https://sketchfab.com/models/028c1143872b4c1981180218731057c0/embed",
    seats: 2,
    transmission: "ISR 7-speed",
    fuelType: "Gasoline",
    mileage: 800,
    fullName: "2024 Lamborghini Aventador SVJ"
  },
  {
    id: 2,
    brand: "FERRARI",
    model: "488 Spider",
    year: 2023,
    licensePlate: "VEL-002",
    color: "Rosso Corsa",
    category: CarCategory.SPORTS,
    pricePerDay: 1200,
    status: CarStatus.AVAILABLE,
    description: "The Ferrari 488 Spider is the latest chapter in Maranello's ongoing history of open-top V8 sports cars.",
    imageUrl: "https://sketchfab.com/models/78893d599c27415286541f53d2657e2d/embed",
    seats: 2,
    transmission: "F1 Dual-Clutch",
    fuelType: "Gasoline",
    mileage: 1200,
    fullName: "2023 Ferrari 488 Spider"
  },
  {
    id: 3,
    brand: "BUGATTI",
    model: "Chiron",
    year: 2024,
    licensePlate: "VEL-003",
    color: "French Racing Blue",
    category: CarCategory.LUXURY,
    pricePerDay: 5500,
    status: CarStatus.AVAILABLE,
    description: "The Chiron is the fastest, most powerful, and exclusive production super sports car in BUGATTI's history.",
    imageUrl: "https://sketchfab.com/models/3039d506d87e4184a2cf52945d817448/embed",
    seats: 2,
    transmission: "7-speed DSG",
    fuelType: "Gasoline",
    mileage: 50,
    fullName: "2024 Bugatti Chiron"
  },
  {
    id: 4,
    brand: "ASTON MARTIN",
    model: "Valkyrie",
    year: 2024,
    licensePlate: "VEL-004",
    color: "British Racing Green",
    category: CarCategory.SPORTS,
    pricePerDay: 4500,
    status: CarStatus.AVAILABLE,
    description: "An era-defining hypercar. The Valkyrie is Aston Martin’s first-ever hypercar and it leaves nothing in reserve.",
    imageUrl: "https://sketchfab.com/models/19323714b98c4038a8e1df157e1003d1/embed",
    seats: 2,
    transmission: "Single-clutch",
    fuelType: "Hybrid",
    mileage: 100,
    fullName: "2024 Aston Martin Valkyrie"
  },
  {
    id: 5, brand: "LAMBORGHINI", model: "Huracan Evo", year: 2023, licensePlate: "VEL-005", color: "Verde Mantis", category: CarCategory.SPORTS, pricePerDay: 1800, status: CarStatus.AVAILABLE, description: "The Huracán EVO is the evolution of the most successful V10-powered Lamborghini.", imageUrl: "https://sketchfab.com/models/028c1143872b4c1981180218731057c0/embed", seats: 2, transmission: "Automatic", fuelType: "Gasoline", mileage: 2000, fullName: "2023 Lamborghini Huracan Evo"
  },
  {
    id: 6, brand: "FERRARI", model: "SF90 Stradale", year: 2024, licensePlate: "VEL-006", color: "Giallo Modena", category: CarCategory.SPORTS, pricePerDay: 3000, status: CarStatus.AVAILABLE, description: "The SF90 Stradale is the first ever Ferrari to feature PHEV (Plug-in Hybrid Electric Vehicle) architecture.", imageUrl: "https://sketchfab.com/models/78893d599c27415286541f53d2657e2d/embed", seats: 2, transmission: "8-speed Dual-Clutch", fuelType: "Hybrid", mileage: 500, fullName: "2024 Ferrari SF90 Stradale"
  },
  {
    id: 7, brand: "PORSCHE", model: "911 GT3 RS", year: 2024, licensePlate: "VEL-007", color: "Shark Blue", category: CarCategory.SPORTS, pricePerDay: 1500, status: CarStatus.AVAILABLE, description: "Athletic, muscular, and perfectly designed for the track.", imageUrl: "https://sketchfab.com/models/3039d506d87e4184a2cf52945d817448/embed", seats: 2, transmission: "PDK", fuelType: "Gasoline", mileage: 300, fullName: "2024 Porsche 911 GT3 RS"
  },
  {
    id: 8, brand: "MCLAREN", model: "720S", year: 2023, licensePlate: "VEL-008", color: "Papaya Spark", category: CarCategory.SPORTS, pricePerDay: 1700, status: CarStatus.AVAILABLE, description: "The McLaren 720S is a supercar that challenges convention.", imageUrl: "https://sketchfab.com/models/19323714b98c4038a8e1df157e1003d1/embed", seats: 2, transmission: "7-speed SSG", fuelType: "Gasoline", mileage: 1500, fullName: "2023 McLaren 720S"
  },
  {
    id: 9, brand: "ROLLS ROYCE", model: "Phantom", year: 2024, licensePlate: "VEL-009", color: "Midnight Sapphire", category: CarCategory.LUXURY, pricePerDay: 4000, status: CarStatus.AVAILABLE, description: "The signature Rolls-Royce. The ultimate in luxury and presence.", imageUrl: "https://sketchfab.com/models/028c1143872b4c1981180218731057c0/embed", seats: 5, transmission: "8-speed Automatic", fuelType: "Gasoline", mileage: 100, fullName: "2024 Rolls Royce Phantom"
  },
  {
    id: 10, brand: "BENTLEY", model: "Continental GT", year: 2024, licensePlate: "VEL-010", color: "Dragon Red", category: CarCategory.LUXURY, pricePerDay: 2200, status: CarStatus.AVAILABLE, description: "A grand tourer in every sense of the word.", imageUrl: "https://sketchfab.com/models/78893d599c27415286541f53d2657e2d/embed", seats: 4, transmission: "8-speed Dual-Clutch", fuelType: "Gasoline", mileage: 400, fullName: "2024 Bentley Continental GT"
  }
];

const paginateMock = <T>(data: T[], page: number, size: number) => {
  const start = page * size;
  const end = start + size;
  return {
    content: data.slice(start, end),
    page,
    size,
    totalElements: data.length,
    totalPages: Math.ceil(data.length / size),
    first: page === 0,
    last: page >= Math.ceil(data.length / size) - 1
  };
};

export const carService = {
  async getCars(page = 0, size = 12, sortBy = 'pricePerDay', sortDir = 'asc'): Promise<PagedResponse<Car>> {
    try {
      const res = await fetch(
        `${API_BASE}/cars?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
      );
      if (!res.ok) throw new Error('API unavailable');
      return res.json();
    } catch (e) {
      console.warn("API Error, falling back to mock data:", e);
      return {
        success: true,
        message: "Mock data fallback",
        data: paginateMock(MOCK_CARS, page, size)
      };
    }
  },

  async getCarsByCategory(category: string, page = 0, size = 12): Promise<PagedResponse<Car>> {
    try {
      const res = await fetch(`${API_BASE}/cars/category/${category}?page=${page}&size=${size}`);
      if (!res.ok) throw new Error('API unavailable');
      return res.json();
    } catch (e) {
      const filtered = MOCK_CARS.filter(c => c.category === category);
      return {
        success: true,
        message: "Mock data fallback",
        data: paginateMock(filtered, page, size)
      };
    }
  },

  async searchCars(query: string, page = 0, size = 12): Promise<PagedResponse<Car>> {
    try {
      const res = await fetch(`${API_BASE}/cars/search?query=${query}&page=${page}&size=${size}`);
      if (!res.ok) throw new Error('API unavailable');
      return res.json();
    } catch (e) {
      const filtered = MOCK_CARS.filter(c =>
        c.brand.toLowerCase().includes(query.toLowerCase()) ||
        c.model.toLowerCase().includes(query.toLowerCase())
      );
      return {
        success: true,
        message: "Mock data fallback",
        data: paginateMock(filtered, page, size)
      };
    }
  },

  async getBrands(): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE}/cars/brands`);
      if (!res.ok) throw new Error('API unavailable');
      return res.json();
    } catch (e) {
      return Array.from(new Set(MOCK_CARS.map(c => c.brand))).sort();
    }
  },

  // --- ADMIN OPERATIONS ---

  getAuthHeaders() {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'An unexpected error occurred');
    }
    return response.json();
  },

  async addCar(carData: CarRequestDTO): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(carData),
    });
    return this.handleResponse(response);
  },

  async updateCar(id: number, carData: CarRequestDTO): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(carData),
    });
    return this.handleResponse(response);
  },

  async updateCarStatus(id: number, status: CarStatus): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars/${id}/status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return this.handleResponse(response);
  },

  async deleteCar(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete car');
    }
  }
};

// Mock data for the MetroMerge admin panel

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  buses: number;
  routes: number;
  totalBookings: number;
  revenue: number;
  joinDate: string;
  address: string;
  documents: 'verified' | 'pending' | 'rejected';
}

export interface Bus {
  id: string;
  registrationNumber: string;
  model: string;
  capacity: number;
  type: 'AC Sleeper' | 'AC Seater' | 'Non-AC Seater' | 'Semi Sleeper';
  status: 'active' | 'maintenance' | 'inactive';
  driver: string;
  route: string;
  lastMaintenance: string;
  nextMaintenance: string;
  totalTrips: number;
  revenue: number;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  fare: number;
  stops: string[];
  departureTime: string;
  arrivalTime: string;
  frequency: 'Daily' | 'Weekdays' | 'Weekends' | 'Alternate';
  status: 'active' | 'inactive';
  busAssigned: string;
  totalBookings: number;
  revenue: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  route: string;
  busNumber: string;
  seatNumbers: string[];
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentMethod: string;
  boardingPoint: string;
  droppingPoint: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: 'booking' | 'payment' | 'technical' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdBy: string;
  assignedTo?: string;
  createdDate: string;
  updatedDate: string;
}

// Mock data generators
export const generateMockVendors = (): Vendor[] => [
  {
    id: 'V001',
    name: 'Karachi Express',
    email: 'contact@karachiexpress.com',
    phone: '+92 21 98765 43210',
    status: 'active',
    buses: 15,
    routes: 8,
    totalBookings: 2847,
    revenue: 850000,
    joinDate: '2023-06-15',
    address: 'Karachi, Sindh',
    documents: 'verified'
  },
  {
    id: 'V002',
    name: 'Sindh Royal Travels',
    email: 'info@sindhroyal.com',
    phone: '+92 22 87654 32109',
    status: 'pending',
    buses: 8,
    routes: 4,
    totalBookings: 0,
    revenue: 0,
    joinDate: '2024-01-10',
    address: 'Hyderabad, Sindh',
    documents: 'pending'
  },
  {
    id: 'V003',
    name: 'Punjab Express',
    email: 'support@punjabexpress.com',
    phone: '+92 42 76543 21098',
    status: 'suspended',
    buses: 12,
    routes: 6,
    totalBookings: 1523,
    revenue: 574000,
    joinDate: '2023-09-20',
    address: 'Lahore, Punjab',
    documents: 'verified'
  }
];

export const generateMockBuses = (): Bus[] => [
  {
    id: 'BUS001',
    registrationNumber: 'KHI-2023-1234',
    model: 'Volvo B11R',
    capacity: 45,
    type: 'AC Sleeper',
    status: 'active',
    driver: 'Muhammad Hassan',
    route: 'Karachi - Hyderabad',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    totalTrips: 234,
    revenue: 250000
  },
  {
    id: 'BUS002',
    registrationNumber: 'KHI-2024-5678',
    model: 'Tata Starbus',
    capacity: 40,
    type: 'AC Seater',
    status: 'maintenance',
    driver: 'Ali Ahmed',
    route: 'Karachi - Umerkot',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    totalTrips: 189,
    revenue: 196000
  }
];

export const generateMockRoutes = (): Route[] => [
  {
    id: 'RT001',
    name: 'Karachi - Hyderabad Express',
    origin: 'Karachi',
    destination: 'Hyderabad',
    distance: '165 km',
    duration: '3h 00m',
    fare: 800,
    stops: ['Kotri', 'Jamshoro'],
    departureTime: '06:00',
    arrivalTime: '09:00',
    frequency: 'Daily',
    status: 'active',
    busAssigned: 'KHI-2023-1234',
    totalBookings: 1247,
    revenue: 997600
  },
  {
    id: 'RT002',
    name: 'Karachi - Umerkot Highway',
    origin: 'Karachi',
    destination: 'Umerkot',
    distance: '420 km',
    duration: '6h 00m',
    fare: 1200,
    stops: ['Hyderabad', 'Mirpurkhas', 'Mithi'],
    departureTime: '08:00',
    arrivalTime: '14:00',
    frequency: 'Daily',
    status: 'active',
    busAssigned: 'KHI-2024-5678',
    totalBookings: 892,
    revenue: 1070400
  }
];

export const generateMockBookings = (): Booking[] => [
  {
    id: 'BK001',
    bookingRef: 'MM2024001',
    passengerName: 'Ahmed Ali Khan',
    passengerPhone: '+92 21 98765 43210',
    passengerEmail: 'ahmed.ali@email.com',
    route: 'Karachi - Hyderabad',
    busNumber: 'KHI-2023-1234',
    seatNumbers: ['A1', 'A2'],
    travelDate: '2024-01-20',
    departureTime: '06:00',
    arrivalTime: '09:00',
    fare: 1600,
    bookingDate: '2024-01-15',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'JazzCash',
    boardingPoint: 'Karachi Saddar',
    droppingPoint: 'Hyderabad Station'
  },
  {
    id: 'BK002',
    bookingRef: 'MM2024002',
    passengerName: 'Fatima Sheikh',
    passengerPhone: '+92 22 87654 32109',
    passengerEmail: 'fatima.sheikh@email.com',
    route: 'Karachi - Umerkot',
    busNumber: 'KHI-2024-5678',
    seatNumbers: ['B3'],
    travelDate: '2024-01-18',
    departureTime: '08:00',
    arrivalTime: '14:00',
    fare: 1200,
    bookingDate: '2024-01-16',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'EasyPaisa',
    boardingPoint: 'Karachi Cantt',
    droppingPoint: 'Umerkot Bus Stand'
  }
];

export const generateMockUsers = (): User[] => [
  {
    id: 'U001',
    name: 'Zara Hassan',
    email: 'zara.hassan@email.com',
    phone: '+92 21 98765 43210',
    role: 'user',
    status: 'active',
    joinDate: '2023-08-15',
    totalBookings: 12,
    totalSpent: 19200
  },
  {
    id: 'U002',
    name: 'Omar Malik',
    email: 'omar.malik@email.com',
    phone: '+92 22 87654 32109',
    role: 'user',
    status: 'active',
    joinDate: '2023-11-20',
    totalBookings: 8,
    totalSpent: 9600
  }
];

export const generateMockSupportTickets = (): SupportTicket[] => [
  {
    id: 'ST001',
    ticketNumber: 'MM-2024-001',
    subject: 'Booking cancellation issue',
    description: 'Unable to cancel my booking for tomorrow\'s journey from Karachi to Hyderabad',
    category: 'booking',
    priority: 'high',
    status: 'open',
    createdBy: 'ahmed.ali@email.com',
    assignedTo: 'support@metromerge.com',
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15'
  },
  {
    id: 'ST002',
    ticketNumber: 'MM-2024-002',
    subject: 'JazzCash payment not reflected',
    description: 'Made payment via JazzCash but booking status still shows pending',
    category: 'payment',
    priority: 'medium',
    status: 'in-progress',
    createdBy: 'fatima.sheikh@email.com',
    assignedTo: 'finance@metromerge.com',
    createdDate: '2024-01-14',
    updatedDate: '2024-01-16'
  }
];

// Analytics data
export const generateAnalyticsData = () => ({
  dailyBookings: [
    { date: '2024-01-10', bookings: 45, revenue: 45000 },
    { date: '2024-01-11', bookings: 52, revenue: 52800 },
    { date: '2024-01-12', bookings: 38, revenue: 38600 },
    { date: '2024-01-13', bookings: 61, revenue: 62200 },
    { date: '2024-01-14', bookings: 47, revenue: 47900 },
    { date: '2024-01-15', bookings: 55, revenue: 56100 },
    { date: '2024-01-16', bookings: 49, revenue: 49800 }
  ],
  topRoutes: [
    { route: 'Karachi - Hyderabad', bookings: 1247, revenue: 997600 },
    { route: 'Karachi - Umerkot', bookings: 892, revenue: 1070400 },
    { route: 'Lahore - Islamabad', bookings: 456, revenue: 684000 }
  ],
  vendorPerformance: [
    { vendor: 'Karachi Express', bookings: 2847, revenue: 850000, rating: 4.8 },
    { vendor: 'Punjab Express', bookings: 1523, revenue: 574000, rating: 4.6 },
    { vendor: 'Sindh Royal', bookings: 3456, revenue: 1356000, rating: 4.9 }
  ]
});

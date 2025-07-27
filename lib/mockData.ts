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
    name: 'Metro Express',
    email: 'contact@metroexpress.com',
    phone: '+91 98765 43210',
    status: 'active',
    buses: 15,
    routes: 8,
    totalBookings: 2847,
    revenue: 425000,
    joinDate: '2023-06-15',
    address: 'Mumbai, Maharashtra',
    documents: 'verified'
  },
  {
    id: 'V002',
    name: 'Royal Travels',
    email: 'info@royaltravels.com',
    phone: '+91 87654 32109',
    status: 'pending',
    buses: 8,
    routes: 4,
    totalBookings: 0,
    revenue: 0,
    joinDate: '2024-01-10',
    address: 'Delhi, India',
    documents: 'pending'
  },
  {
    id: 'V003',
    name: 'South Express',
    email: 'support@southexpress.com',
    phone: '+91 76543 21098',
    status: 'suspended',
    buses: 12,
    routes: 6,
    totalBookings: 1523,
    revenue: 287000,
    joinDate: '2023-09-20',
    address: 'Bangalore, Karnataka',
    documents: 'verified'
  }
];

export const generateMockBuses = (): Bus[] => [
  {
    id: 'BUS001',
    registrationNumber: 'MH-12-AB-1234',
    model: 'Volvo B11R',
    capacity: 45,
    type: 'AC Sleeper',
    status: 'active',
    driver: 'Rajesh Kumar',
    route: 'Mumbai - Pune',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    totalTrips: 234,
    revenue: 125000
  },
  {
    id: 'BUS002',
    registrationNumber: 'MH-12-CD-5678',
    model: 'Tata Starbus',
    capacity: 40,
    type: 'AC Seater',
    status: 'maintenance',
    driver: 'Suresh Patil',
    route: 'Mumbai - Nashik',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    totalTrips: 189,
    revenue: 98000
  }
];

export const generateMockRoutes = (): Route[] => [
  {
    id: 'RT001',
    name: 'Mumbai - Pune Express',
    origin: 'Mumbai',
    destination: 'Pune',
    distance: '148 km',
    duration: '3h 30m',
    fare: 450,
    stops: ['Lonavala', 'Khandala'],
    departureTime: '06:00',
    arrivalTime: '09:30',
    frequency: 'Daily',
    status: 'active',
    busAssigned: 'MH-12-AB-1234',
    totalBookings: 1247,
    revenue: 560150
  },
  {
    id: 'RT002',
    name: 'Mumbai - Nashik Highway',
    origin: 'Mumbai',
    destination: 'Nashik',
    distance: '165 km',
    duration: '4h 00m',
    fare: 380,
    stops: ['Thane', 'Kalyan', 'Igatpuri'],
    departureTime: '07:30',
    arrivalTime: '11:30',
    frequency: 'Daily',
    status: 'active',
    busAssigned: 'MH-12-CD-5678',
    totalBookings: 892,
    revenue: 338960
  }
];

export const generateMockBookings = (): Booking[] => [
  {
    id: 'BK001',
    bookingRef: 'MM2024001',
    passengerName: 'John Doe',
    passengerPhone: '+91 98765 43210',
    passengerEmail: 'john.doe@email.com',
    route: 'Mumbai - Pune',
    busNumber: 'MH-12-AB-1234',
    seatNumbers: ['A1', 'A2'],
    travelDate: '2024-01-20',
    departureTime: '06:00',
    arrivalTime: '09:30',
    fare: 900,
    bookingDate: '2024-01-15',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    boardingPoint: 'Mumbai Central',
    droppingPoint: 'Pune Station'
  },
  {
    id: 'BK002',
    bookingRef: 'MM2024002',
    passengerName: 'Jane Smith',
    passengerPhone: '+91 87654 32109',
    passengerEmail: 'jane.smith@email.com',
    route: 'Mumbai - Nashik',
    busNumber: 'MH-12-CD-5678',
    seatNumbers: ['B3'],
    travelDate: '2024-01-18',
    departureTime: '07:30',
    arrivalTime: '11:30',
    fare: 380,
    bookingDate: '2024-01-16',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Credit Card',
    boardingPoint: 'Mumbai Dadar',
    droppingPoint: 'Nashik CBS'
  }
];

export const generateMockUsers = (): User[] => [
  {
    id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+91 98765 43210',
    role: 'user',
    status: 'active',
    joinDate: '2023-08-15',
    totalBookings: 12,
    totalSpent: 5400
  },
  {
    id: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+91 87654 32109',
    role: 'user',
    status: 'active',
    joinDate: '2023-11-20',
    totalBookings: 8,
    totalSpent: 3200
  }
];

export const generateMockSupportTickets = (): SupportTicket[] => [
  {
    id: 'ST001',
    ticketNumber: 'MM-2024-001',
    subject: 'Booking cancellation issue',
    description: 'Unable to cancel my booking for tomorrow\'s journey',
    category: 'booking',
    priority: 'high',
    status: 'open',
    createdBy: 'john.doe@email.com',
    assignedTo: 'support@metromerge.com',
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15'
  },
  {
    id: 'ST002',
    ticketNumber: 'MM-2024-002',
    subject: 'Payment not reflected',
    description: 'Made payment but booking status still shows pending',
    category: 'payment',
    priority: 'medium',
    status: 'in-progress',
    createdBy: 'jane.smith@email.com',
    assignedTo: 'finance@metromerge.com',
    createdDate: '2024-01-14',
    updatedDate: '2024-01-16'
  }
];

// Analytics data
export const generateAnalyticsData = () => ({
  dailyBookings: [
    { date: '2024-01-10', bookings: 45, revenue: 18500 },
    { date: '2024-01-11', bookings: 52, revenue: 21200 },
    { date: '2024-01-12', bookings: 38, revenue: 15800 },
    { date: '2024-01-13', bookings: 61, revenue: 24900 },
    { date: '2024-01-14', bookings: 47, revenue: 19300 },
    { date: '2024-01-15', bookings: 55, revenue: 22700 },
    { date: '2024-01-16', bookings: 49, revenue: 20100 }
  ],
  topRoutes: [
    { route: 'Mumbai - Pune', bookings: 1247, revenue: 560150 },
    { route: 'Mumbai - Nashik', bookings: 892, revenue: 338960 },
    { route: 'Mumbai - Aurangabad', bookings: 456, revenue: 296400 }
  ],
  vendorPerformance: [
    { vendor: 'Metro Express', bookings: 2847, revenue: 425000, rating: 4.8 },
    { vendor: 'South Express', bookings: 1523, revenue: 287000, rating: 4.6 },
    { vendor: 'Highway Kings', bookings: 3456, revenue: 678000, rating: 4.9 }
  ]
});

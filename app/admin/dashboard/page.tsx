'use client';

import { useAuth } from '@/contexts/AuthContext';
import DashboardCard from '@/components/admin/DashboardCard';
import DataTable, { Column } from '@/components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Bus,
  Route,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock data for admin dashboard
const adminStats = {
  totalVendors: 45,
  totalBookings: 12847,
  totalRevenue: 2847392,
  activeUsers: 8934
};

const vendorStats = {
  dailyBookings: 127,
  dailyEarnings: 15420,
  activeBuses: 12,
  activeRoutes: 8
};

// Mock recent bookings data
const recentBookings = [
  {
    id: 'BK001',
    passenger: 'John Doe',
    route: 'Mumbai - Pune',
    vendor: 'Metro Express',
    amount: 450,
    status: 'confirmed',
    date: '2024-01-15'
  },
  {
    id: 'BK002',
    passenger: 'Jane Smith',
    route: 'Delhi - Agra',
    vendor: 'Royal Travels',
    amount: 320,
    status: 'pending',
    date: '2024-01-15'
  },
  {
    id: 'BK003',
    passenger: 'Mike Johnson',
    route: 'Bangalore - Chennai',
    vendor: 'South Express',
    amount: 680,
    status: 'cancelled',
    date: '2024-01-14'
  }
];

// Mock vendors data
const recentVendors = [
  {
    id: 'V001',
    name: 'Metro Express',
    email: 'contact@metroexpress.com',
    status: 'active',
    buses: 15,
    routes: 8,
    joinDate: '2023-06-15'
  },
  {
    id: 'V002',
    name: 'Royal Travels',
    email: 'info@royaltravels.com',
    status: 'pending',
    buses: 8,
    routes: 4,
    joinDate: '2024-01-10'
  }
];

const bookingColumns: Column[] = [
  { key: 'id', title: 'Booking ID', sortable: true },
  { key: 'passenger', title: 'Passenger', sortable: true, filterable: true },
  { key: 'route', title: 'Route', sortable: true, filterable: true },
  { key: 'vendor', title: 'Vendor', sortable: true, filterable: true },
  { 
    key: 'amount', 
    title: 'Amount', 
    sortable: true,
    render: (value) => `₹${value}`
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'confirmed' ? 'default' :
        value === 'pending' ? 'secondary' : 'destructive'
      }>
        {value}
      </Badge>
    )
  },
  { key: 'date', title: 'Date', sortable: true }
];

const vendorColumns: Column[] = [
  { key: 'name', title: 'Vendor Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={value === 'active' ? 'default' : 'secondary'}>
        {value}
      </Badge>
    )
  },
  { key: 'buses', title: 'Buses', sortable: true },
  { key: 'routes', title: 'Routes', sortable: true },
  { key: 'joinDate', title: 'Join Date', sortable: true }
];

export default function AdminDashboard() {
  const { user } = useAuth();

  const handleViewBooking = (booking: any) => {
    console.log('View booking:', booking);
  };

  const handleEditVendor = (vendor: any) => {
    console.log('Edit vendor:', vendor);
  };

  const handleDeleteVendor = (vendor: any) => {
    console.log('Delete vendor:', vendor);
  };

  const bookingActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewBooking(row)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );

  const vendorActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleEditVendor(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleDeleteVendor(row)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Vendors"
            value={adminStats.totalVendors}
            description="Active vendors"
            icon={Building2}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Total Bookings"
            value={adminStats.totalBookings}
            description="All time bookings"
            icon={Calendar}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Total Revenue"
            value={`₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`}
            description="All time revenue"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <DashboardCard
            title="Active Users"
            value={adminStats.activeUsers}
            description="Registered users"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable
            title="Recent Bookings"
            data={recentBookings}
            columns={bookingColumns}
            pageSize={5}
            actions={bookingActions}
          />
          
          <DataTable
            title="Recent Vendors"
            data={recentVendors}
            columns={vendorColumns}
            pageSize={5}
            actions={vendorActions}
          />
        </div>
      </div>
    );
  }

  // Vendor Dashboard
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Vendor Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Daily Bookings"
          value={vendorStats.dailyBookings}
          description="Today's bookings"
          icon={Calendar}
          trend={{ value: 23, isPositive: true }}
        />
        <DashboardCard
          title="Daily Earnings"
          value={`₹${vendorStats.dailyEarnings.toLocaleString()}`}
          description="Today's earnings"
          icon={DollarSign}
          trend={{ value: 18, isPositive: true }}
        />
        <DashboardCard
          title="Active Buses"
          value={vendorStats.activeBuses}
          description="Buses in service"
          icon={Bus}
          trend={{ value: 0, isPositive: true }}
        />
        <DashboardCard
          title="Active Routes"
          value={vendorStats.activeRoutes}
          description="Routes in operation"
          icon={Route}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Vendor Activity */}
      <div className="grid grid-cols-1 gap-6">
        <DataTable
          title="Recent Bookings"
          data={recentBookings.filter(booking => booking.vendor === user?.name)}
          columns={bookingColumns}
          pageSize={10}
          actions={bookingActions}
        />
      </div>
    </div>
  );
}

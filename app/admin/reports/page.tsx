'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardCard from '@/components/admin/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Download,
  BarChart3
} from 'lucide-react';

// Mock analytics data for admin
const platformStats = {
  totalRevenue: 5694784,
  totalVendors: 45,
  totalBookings: 12847,
  activeUsers: 8934,
  monthlyGrowth: 15.2
};

const monthlyRevenueData = [
  { month: 'Jul 2023', revenue: 1850000, bookings: 8156, vendors: 38 },
  { month: 'Aug 2023', revenue: 2120000, bookings: 9298, vendors: 40 },
  { month: 'Sep 2023', revenue: 1980000, bookings: 8987, vendors: 41 },
  { month: 'Oct 2023', revenue: 2450000, bookings: 10456, vendors: 42 },
  { month: 'Nov 2023', revenue: 2670000, bookings: 11598, vendors: 44 },
  { month: 'Dec 2023', revenue: 2930000, bookings: 12847, vendors: 45 },
  { month: 'Jan 2024', revenue: 2847392, bookings: 12847, vendors: 45 }
];

const topVendorsData = [
  { vendor: 'Sindh Royal', revenue: 1356000, bookings: 3456, share: 24 },
  { vendor: 'Karachi Express', revenue: 1120300, bookings: 2847, share: 20 },
  { vendor: 'Punjab Express', revenue: 850000, bookings: 2156, share: 15 },
  { vendor: 'Lahore Travels', revenue: 677920, bookings: 1892, share: 12 },
  { vendor: 'Others', revenue: 1688564, bookings: 2496, share: 29 }
];

const routePerformanceData = [
  { route: 'Karachi - Hyderabad', bookings: 2847, revenue: 2276400, vendors: 8 },
  { route: 'Lahore - Islamabad', bookings: 2156, revenue: 3234000, vendors: 6 },
  { route: 'Karachi - Umerkot', bookings: 1892, revenue: 2270400, vendors: 5 },
  { route: 'Hyderabad - Mithi', bookings: 1654, revenue: 1653600, vendors: 4 },
  { route: 'Lahore - Multan', bookings: 1298, revenue: 1297200, vendors: 3 }
];

const userGrowthData = [
  { month: 'Jul 2023', users: 6500, newUsers: 450 },
  { month: 'Aug 2023', users: 7100, newUsers: 600 },
  { month: 'Sep 2023', users: 7450, newUsers: 350 },
  { month: 'Oct 2023', users: 8000, newUsers: 550 },
  { month: 'Nov 2023', users: 8500, newUsers: 500 },
  { month: 'Dec 2023', users: 8934, newUsers: 434 },
  { month: 'Jan 2024', users: 8934, newUsers: 0 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminReports() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleExportReport = () => {
    const csvData = monthlyRevenueData.map(item => 
      `${item.month},${item.revenue},${item.bookings},${item.vendors}`
    ).join('\n');
    
    const csv = `Month,Revenue,Bookings,Vendors\n${csvData}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'platform-analytics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Platform performance and business insights</p>
        </div>
        
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value={`Rs.${(platformStats.totalRevenue / 100000).toFixed(1)}L`}
          description="Platform revenue"
          icon={DollarSign}
          trend={{ value: 15.2, isPositive: true }}
        />
        <DashboardCard
          title="Total Vendors"
          value={platformStats.totalVendors}
          description="Active vendors"
          icon={Building2}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Total Bookings"
          value={platformStats.totalBookings}
          description="All time bookings"
          icon={BarChart3}
          trend={{ value: 18, isPositive: true }}
        />
        <DashboardCard
          title="Active Users"
          value={platformStats.activeUsers}
          description="Registered users"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`Rs.${value}`, 'Revenue']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Vendors Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topVendorsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ vendor, share }) => `${vendor}: ${share}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {topVendorsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`Rs.${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Total Users" />
                <Bar dataKey="newUsers" fill="#82ca9d" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Route</th>
                    <th className="text-right py-2">Bookings</th>
                    <th className="text-right py-2">Revenue</th>
                    <th className="text-right py-2">Vendors</th>
                  </tr>
                </thead>
                <tbody>
                  {routePerformanceData.map((route, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{route.route}</td>
                      <td className="text-right py-2">{route.bookings}</td>
                      <td className="text-right py-2">Rs.{route.revenue.toLocaleString()}</td>
                      <td className="text-right py-2">{route.vendors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Vendor</th>
                    <th className="text-right py-2">Bookings</th>
                    <th className="text-right py-2">Revenue</th>
                    <th className="text-right py-2">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {topVendorsData.slice(0, 4).map((vendor, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{vendor.vendor}</td>
                      <td className="text-right py-2">{vendor.bookings}</td>
                      <td className="text-right py-2">Rs.{vendor.revenue.toLocaleString()}</td>
                      <td className="text-right py-2">{vendor.share}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

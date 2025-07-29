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
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
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
  Calendar,
  Download,
  BarChart3
} from 'lucide-react';

// Mock revenue data
const revenueStats = {
  totalRevenue: 850000,
  monthlyRevenue: 90400,
  weeklyRevenue: 25600,
  dailyRevenue: 3700,
  totalBookings: 2847,
  averageTicketValue: 298
};

const dailyRevenueData = [
  { date: '2024-01-10', revenue: 37000, bookings: 45 },
  { date: '2024-01-11', revenue: 42400, bookings: 52 },
  { date: '2024-01-12', revenue: 31600, bookings: 38 },
  { date: '2024-01-13', revenue: 49800, bookings: 61 },
  { date: '2024-01-14', revenue: 38600, bookings: 47 },
  { date: '2024-01-15', revenue: 45400, bookings: 55 },
  { date: '2024-01-16', revenue: 40200, bookings: 49 }
];

const routeRevenueData = [
  { route: 'Karachi - Hyderabad', revenue: 997600, bookings: 1247, percentage: 45 },
  { route: 'Karachi - Umerkot', revenue: 1070400, bookings: 892, percentage: 27 },
  { route: 'Lahore - Islamabad', revenue: 684000, bookings: 456, percentage: 23 },
  { route: 'Others', revenue: 124980, bookings: 252, percentage: 5 }
];

const monthlyRevenueData = [
  { month: 'Jul 2023', revenue: 770000, bookings: 2156 },
  { month: 'Aug 2023', revenue: 824000, bookings: 2298 },
  { month: 'Sep 2023', revenue: 796000, bookings: 2187 },
  { month: 'Oct 2023', revenue: 890000, bookings: 2456 },
  { month: 'Nov 2023', revenue: 934000, bookings: 2598 },
  { month: 'Dec 2023', revenue: 1046000, bookings: 2847 },
  { month: 'Jan 2024', revenue: 850000, bookings: 2847 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function RevenueReports() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedRoute, setSelectedRoute] = useState('all');

  // Redirect if not vendor
  if (user?.role !== 'vendor') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Vendor privileges required.</p>
      </div>
    );
  }

  const handleExportReport = () => {
    // Simple CSV export logic
    const csvData = dailyRevenueData.map(item => 
      `${item.date},${item.revenue},${item.bookings}`
    ).join('\n');
    
    const csv = `Date,Revenue,Bookings\n${csvData}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'revenue-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Reports</h1>
          <p className="text-gray-600">Track your earnings and performance metrics</p>
        </div>
        
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value={`Rs.${(revenueStats.totalRevenue / 1000).toFixed(0)}K`}
          description="All time earnings"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <DashboardCard
          title="Monthly Revenue"
          value={`Rs.${(revenueStats.monthlyRevenue / 1000).toFixed(0)}K`}
          description="This month"
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Total Bookings"
          value={revenueStats.totalBookings}
          description="All time bookings"
          icon={BarChart3}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Avg. Ticket Value"
          value={`Rs.${revenueStats.averageTicketValue}`}
          description="Per booking"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
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

        {/* Route Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Route</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={routeRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ route, percentage }) => `${route}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {routeRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`Rs.${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`Rs.${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Route Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Route</th>
                  <th className="text-right py-2">Total Revenue</th>
                  <th className="text-right py-2">Total Bookings</th>
                  <th className="text-right py-2">Avg. Fare</th>
                  <th className="text-right py-2">Share</th>
                </tr>
              </thead>
              <tbody>
                {routeRevenueData.map((route, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium">{route.route}</td>
                    <td className="text-right py-2">Rs.{route.revenue.toLocaleString()}</td>
                    <td className="text-right py-2">{route.bookings}</td>
                    <td className="text-right py-2">Rs.{Math.round(route.revenue / route.bookings)}</td>
                    <td className="text-right py-2">{route.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

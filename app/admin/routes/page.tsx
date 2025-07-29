'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DataTable, { Column } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Clock
} from 'lucide-react';

// Mock routes data
const routesData = [
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
  },
  {
    id: 'RT003',
    name: 'Lahore - Islamabad Express',
    origin: 'Lahore',
    destination: 'Islamabad',
    distance: '375 km',
    duration: '5h 00m',
    fare: 1500,
    stops: ['Gujranwala', 'Rawalpindi'],
    departureTime: '20:00',
    arrivalTime: '01:00',
    frequency: 'Daily',
    status: 'active',
    busAssigned: 'LHR-2023-3456',
    totalBookings: 456,
    revenue: 684000
  }
];

const routeColumns: Column[] = [
  { key: 'name', title: 'Route Name', sortable: true, filterable: true },
  { key: 'origin', title: 'Origin', sortable: true, filterable: true },
  { key: 'destination', title: 'Destination', sortable: true, filterable: true },
  { key: 'distance', title: 'Distance', sortable: true },
  { key: 'duration', title: 'Duration', sortable: true },
  { 
    key: 'fare', 
    title: 'Fare', 
    sortable: true,
    render: (value) => `Rs.${value}`
  },
  { key: 'departureTime', title: 'Departure', sortable: true },
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
  { 
    key: 'revenue', 
    title: 'Revenue', 
    sortable: true,
    render: (value) => `Rs.${value.toLocaleString()}`
  }
];

export default function RouteManagement() {
  const { user } = useAuth();
  const [routes, setRoutes] = useState(routesData);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Redirect if not vendor
  if (user?.role !== 'vendor') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Vendor privileges required.</p>
      </div>
    );
  }

  const handleViewRoute = (route: any) => {
    setSelectedRoute(route);
    setIsViewDialogOpen(true);
  };

  const handleEditRoute = (route: any) => {
    setSelectedRoute(route);
    setIsEditDialogOpen(true);
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(routes.filter(route => route.id !== routeId));
  };

  const routeActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewRoute(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleEditRoute(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleDeleteRoute(row.id)}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
          <p className="text-gray-600">Manage your bus routes and schedules</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
              <DialogDescription>
                Create a new bus route with stops and timings
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input id="routeName" placeholder="e.g., Mumbai - Pune Express" />
              </div>
              <div>
                <Label htmlFor="busAssigned">Assign Bus</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus1">MH-12-AB-1234 (Volvo B11R)</SelectItem>
                    <SelectItem value="bus2">MH-12-CD-5678 (Tata Starbus)</SelectItem>
                    <SelectItem value="bus3">MH-12-EF-9012 (Ashok Leyland)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="origin">Origin City</Label>
                <Input id="origin" placeholder="e.g., Mumbai" />
              </div>
              <div>
                <Label htmlFor="destination">Destination City</Label>
                <Input id="destination" placeholder="e.g., Pune" />
              </div>
              <div>
                <Label htmlFor="distance">Distance</Label>
                <Input id="distance" placeholder="e.g., 148 km" />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 3h 30m" />
              </div>
              <div>
                <Label htmlFor="fare">Base Fare</Label>
                <Input id="fare" type="number" placeholder="e.g., 450" />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekdays">Weekdays Only</SelectItem>
                    <SelectItem value="weekends">Weekends Only</SelectItem>
                    <SelectItem value="alternate">Alternate Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input id="departureTime" type="time" />
              </div>
              <div>
                <Label htmlFor="arrivalTime">Arrival Time</Label>
                <Input id="arrivalTime" type="time" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="stops">Intermediate Stops</Label>
                <Textarea id="stops" placeholder="Enter stops separated by commas (e.g., Lonavala, Khandala)" />
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Route
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={routes}
        columns={routeColumns}
        actions={routeActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Route Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Route Details</DialogTitle>
          </DialogHeader>
          {selectedRoute && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Route Name</Label>
                  <p className="text-sm font-medium">{selectedRoute.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge variant={selectedRoute.status === 'active' ? 'default' : 'secondary'}>
                    {selectedRoute.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Origin</Label>
                  <p className="text-sm">{selectedRoute.origin}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Destination</Label>
                  <p className="text-sm">{selectedRoute.destination}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Distance</Label>
                  <p className="text-sm">{selectedRoute.distance}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Duration</Label>
                  <p className="text-sm">{selectedRoute.duration}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Base Fare</Label>
                  <p className="text-sm">Rs.{selectedRoute.fare}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Frequency</Label>
                  <p className="text-sm">{selectedRoute.frequency}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Departure Time</Label>
                  <p className="text-sm">{selectedRoute.departureTime}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Arrival Time</Label>
                  <p className="text-sm">{selectedRoute.arrivalTime}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Assigned Bus</Label>
                  <p className="text-sm">{selectedRoute.busAssigned}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Total Bookings</Label>
                  <p className="text-sm">{selectedRoute.totalBookings.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Intermediate Stops</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRoute.stops.map((stop: string, index: number) => (
                    <Badge key={index} variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {stop}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-gray-500">Performance</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      Rs.{selectedRoute.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedRoute.totalBookings}
                    </p>
                    <p className="text-xs text-gray-500">Total Bookings</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
  Settings,
  Bus
} from 'lucide-react';

// Mock fleet data
const fleetData = [
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
  },
  {
    id: 'BUS003',
    registrationNumber: 'HYD-2022-9012',
    model: 'Ashok Leyland',
    capacity: 35,
    type: 'Non-AC Seater',
    status: 'active',
    driver: 'Ayesha Malik',
    route: 'Hyderabad - Mithi',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-02-05',
    totalTrips: 156,
    revenue: 156000
  }
];

const fleetColumns: Column[] = [
  { key: 'registrationNumber', title: 'Registration', sortable: true, filterable: true },
  { key: 'model', title: 'Model', sortable: true, filterable: true },
  { key: 'capacity', title: 'Capacity', sortable: true },
  { key: 'type', title: 'Type', sortable: true, filterable: true },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'active' ? 'default' :
        value === 'maintenance' ? 'secondary' :
        value === 'inactive' ? 'destructive' : 'secondary'
      }>
        {value}
      </Badge>
    )
  },
  { key: 'driver', title: 'Driver', sortable: true, filterable: true },
  { key: 'route', title: 'Current Route', sortable: true, filterable: true },
  { 
    key: 'revenue', 
    title: 'Revenue', 
    sortable: true,
    render: (value) => `Rs.${value.toLocaleString()}`
  }
];

export default function FleetManagement() {
  const { user } = useAuth();
  const [fleet, setFleet] = useState(fleetData);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSeatLayoutOpen, setIsSeatLayoutOpen] = useState(false);

  // Redirect if not vendor
  if (user?.role !== 'vendor') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Vendor privileges required.</p>
      </div>
    );
  }

  const handleViewBus = (bus: any) => {
    setSelectedBus(bus);
    setIsViewDialogOpen(true);
  };

  const handleEditBus = (bus: any) => {
    setSelectedBus(bus);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBus = (busId: string) => {
    setFleet(fleet.filter(bus => bus.id !== busId));
  };

  const handleSeatLayout = (bus: any) => {
    setSelectedBus(bus);
    setIsSeatLayoutOpen(true);
  };

  const fleetActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewBus(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleEditBus(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleSeatLayout(row)}>
        <Settings className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleDeleteBus(row.id)}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Manage your bus fleet and configurations</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bus</DialogTitle>
              <DialogDescription>
                Add a new bus to your fleet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="regNumber">Registration Number</Label>
                <Input id="regNumber" placeholder="e.g., MH-12-AB-1234" />
              </div>
              <div>
                <Label htmlFor="model">Bus Model</Label>
                <Input id="model" placeholder="e.g., Volvo B11R" />
              </div>
              <div>
                <Label htmlFor="capacity">Seating Capacity</Label>
                <Input id="capacity" type="number" placeholder="e.g., 45" />
              </div>
              <div>
                <Label htmlFor="type">Bus Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac-sleeper">AC Sleeper</SelectItem>
                    <SelectItem value="ac-seater">AC Seater</SelectItem>
                    <SelectItem value="non-ac-seater">Non-AC Seater</SelectItem>
                    <SelectItem value="semi-sleeper">Semi Sleeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="driver">Assigned Driver</Label>
                <Input id="driver" placeholder="Driver name" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Bus
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={fleet}
        columns={fleetColumns}
        actions={fleetActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Bus Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bus Details</DialogTitle>
          </DialogHeader>
          {selectedBus && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Registration Number</Label>
                <p className="text-sm">{selectedBus.registrationNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Model</Label>
                <p className="text-sm">{selectedBus.model}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Capacity</Label>
                <p className="text-sm">{selectedBus.capacity} seats</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Type</Label>
                <p className="text-sm">{selectedBus.type}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <Badge variant={selectedBus.status === 'active' ? 'default' : 'secondary'}>
                  {selectedBus.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Driver</Label>
                <p className="text-sm">{selectedBus.driver}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Current Route</Label>
                <p className="text-sm">{selectedBus.route}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Trips</Label>
                <p className="text-sm">{selectedBus.totalTrips}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Maintenance</Label>
                <p className="text-sm">{selectedBus.lastMaintenance}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Next Maintenance</Label>
                <p className="text-sm">{selectedBus.nextMaintenance}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Revenue</Label>
                <p className="text-sm">Rs.{selectedBus.revenue.toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Seat Layout Dialog */}
      <Dialog open={isSeatLayoutOpen} onOpenChange={setIsSeatLayoutOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Seat Layout Configuration</DialogTitle>
            <DialogDescription>
              Configure the seat layout for {selectedBus?.registrationNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="text-center mb-4">
              <div className="inline-block bg-gray-300 px-4 py-2 rounded">
                Driver
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {Array.from({ length: selectedBus?.capacity || 40 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs cursor-pointer hover:bg-blue-200"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">
              Click on seats to configure availability and pricing
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

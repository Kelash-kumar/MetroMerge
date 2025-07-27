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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';

// Mock vendors data
const vendorsData = [
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
  },
  {
    id: 'V004',
    name: 'Highway Kings',
    email: 'admin@highwaykings.com',
    phone: '+91 65432 10987',
    status: 'active',
    buses: 20,
    routes: 12,
    totalBookings: 3456,
    revenue: 678000,
    joinDate: '2023-03-12',
    address: 'Pune, Maharashtra',
    documents: 'verified'
  }
];

const vendorColumns: Column[] = [
  { key: 'name', title: 'Vendor Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'phone', title: 'Phone', sortable: true },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'active' ? 'default' :
        value === 'pending' ? 'secondary' :
        value === 'suspended' ? 'destructive' : 'secondary'
      }>
        {value}
      </Badge>
    )
  },
  { key: 'buses', title: 'Buses', sortable: true },
  { key: 'routes', title: 'Routes', sortable: true },
  { 
    key: 'revenue', 
    title: 'Revenue', 
    sortable: true,
    render: (value) => `₹${value.toLocaleString()}`
  },
  { key: 'joinDate', title: 'Join Date', sortable: true }
];

export default function VendorManagement() {
  const { user } = useAuth();
  const [vendors, setVendors] = useState(vendorsData);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleApproveVendor = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: 'active' }
        : vendor
    ));
  };

  const handleRejectVendor = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: 'rejected' }
        : vendor
    ));
  };

  const handleSuspendVendor = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: 'suspended' }
        : vendor
    ));
  };

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(vendors.filter(vendor => vendor.id !== vendorId));
  };

  const handleViewVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsViewDialogOpen(true);
  };

  const handleEditVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsEditDialogOpen(true);
  };

  const vendorActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewVendor(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleEditVendor(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      {row.status === 'pending' && (
        <>
          <Button variant="ghost" size="sm" onClick={() => handleApproveVendor(row.id)}>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleRejectVendor(row.id)}>
            <XCircle className="h-4 w-4 text-red-600" />
          </Button>
        </>
      )}
      {row.status === 'active' && (
        <Button variant="ghost" size="sm" onClick={() => handleSuspendVendor(row.id)}>
          <Pause className="h-4 w-4 text-orange-600" />
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={() => handleDeleteVendor(row.id)}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600">Manage and monitor all vendors</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Create a new vendor account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Vendor Name</Label>
                <Input id="name" placeholder="Enter vendor name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter address" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Vendor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={vendors}
        columns={vendorColumns}
        actions={vendorActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Vendor Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Name</Label>
                <p className="text-sm">{selectedVendor.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm">{selectedVendor.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone</Label>
                <p className="text-sm">{selectedVendor.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <Badge variant={selectedVendor.status === 'active' ? 'default' : 'secondary'}>
                  {selectedVendor.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Buses</Label>
                <p className="text-sm">{selectedVendor.buses}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Routes</Label>
                <p className="text-sm">{selectedVendor.routes}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Bookings</Label>
                <p className="text-sm">{selectedVendor.totalBookings.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Revenue</Label>
                <p className="text-sm">₹{selectedVendor.revenue.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-500">Address</Label>
                <p className="text-sm">{selectedVendor.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

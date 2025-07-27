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
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  UserX,
  UserCheck
} from 'lucide-react';

// Mock staff data
const staffData = [
  {
    id: 'S001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@metroexpress.com',
    phone: '+91 98765 43210',
    role: 'driver',
    status: 'active',
    joinDate: '2023-06-15',
    licenseNumber: 'DL-12-AB-1234567',
    experience: '8 years',
    assignedBus: 'MH-12-AB-1234',
    salary: 25000,
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 'S002',
    name: 'Suresh Patil',
    email: 'suresh.patil@metroexpress.com',
    phone: '+91 87654 32109',
    role: 'driver',
    status: 'active',
    joinDate: '2023-08-20',
    licenseNumber: 'DL-12-CD-2345678',
    experience: '5 years',
    assignedBus: 'MH-12-CD-5678',
    salary: 22000,
    address: 'Pune, Maharashtra'
  },
  {
    id: 'S003',
    name: 'Priya Sharma',
    email: 'priya.sharma@metroexpress.com',
    phone: '+91 76543 21098',
    role: 'conductor',
    status: 'active',
    joinDate: '2023-09-10',
    licenseNumber: 'N/A',
    experience: '3 years',
    assignedBus: 'MH-12-AB-1234',
    salary: 18000,
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 'S004',
    name: 'Amit Desai',
    email: 'amit.desai@metroexpress.com',
    phone: '+91 65432 10987',
    role: 'mechanic',
    status: 'active',
    joinDate: '2023-07-05',
    licenseNumber: 'N/A',
    experience: '10 years',
    assignedBus: 'All',
    salary: 30000,
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 'S005',
    name: 'Ravi Joshi',
    email: 'ravi.joshi@metroexpress.com',
    phone: '+91 54321 09876',
    role: 'driver',
    status: 'inactive',
    joinDate: '2023-05-12',
    licenseNumber: 'DL-12-EF-3456789',
    experience: '12 years',
    assignedBus: 'None',
    salary: 28000,
    address: 'Nashik, Maharashtra'
  }
];

const staffColumns: Column[] = [
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'phone', title: 'Phone', sortable: true },
  {
    key: 'role',
    title: 'Role',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'driver' ? 'default' :
        value === 'conductor' ? 'secondary' :
        value === 'mechanic' ? 'outline' : 'secondary'
      }>
        {value}
      </Badge>
    )
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={value === 'active' ? 'default' : 'destructive'}>
        {value}
      </Badge>
    )
  },
  { key: 'assignedBus', title: 'Assigned Bus', sortable: true, filterable: true },
  { key: 'experience', title: 'Experience', sortable: true },
  { 
    key: 'salary', 
    title: 'Salary', 
    sortable: true,
    render: (value) => `₹${value.toLocaleString()}`
  },
  { key: 'joinDate', title: 'Join Date', sortable: true }
];

export default function StaffManagement() {
  const { user } = useAuth();
  const [staff, setStaff] = useState(staffData);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
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

  const handleViewStaff = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setIsViewDialogOpen(true);
  };

  const handleEditStaff = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setIsEditDialogOpen(true);
  };

  const handleActivateStaff = (staffId: string) => {
    setStaff(staff.map(member => 
      member.id === staffId 
        ? { ...member, status: 'active' }
        : member
    ));
  };

  const handleDeactivateStaff = (staffId: string) => {
    setStaff(staff.map(member => 
      member.id === staffId 
        ? { ...member, status: 'inactive' }
        : member
    ));
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter(member => member.id !== staffId));
  };

  const staffActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewStaff(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleEditStaff(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      {row.status === 'active' ? (
        <Button variant="ghost" size="sm" onClick={() => handleDeactivateStaff(row.id)}>
          <UserX className="h-4 w-4 text-orange-600" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => handleActivateStaff(row.id)}>
          <UserCheck className="h-4 w-4 text-green-600" />
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={() => handleDeleteStaff(row.id)}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage drivers, conductors, and other staff members</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new staff member to your team
              </DialogDescription>
            </DialogHeader>
            <StaffForm onSave={() => setIsAddDialogOpen(false)} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={staff}
        columns={staffColumns}
        actions={staffActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Staff Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Staff Member Details</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-sm font-medium">{selectedStaff.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p className="text-sm">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Address</Label>
                    <p className="text-sm">{selectedStaff.address}</p>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Employment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Role</Label>
                    <Badge variant={
                      selectedStaff.role === 'driver' ? 'default' :
                      selectedStaff.role === 'conductor' ? 'secondary' :
                      'outline'
                    }>
                      {selectedStaff.role}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge variant={selectedStaff.status === 'active' ? 'default' : 'destructive'}>
                      {selectedStaff.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                    <p className="text-sm">{selectedStaff.joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Experience</Label>
                    <p className="text-sm">{selectedStaff.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Assigned Bus</Label>
                    <p className="text-sm">{selectedStaff.assignedBus}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Salary</Label>
                    <p className="text-sm font-bold text-green-600">₹{selectedStaff.salary.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* License Information */}
              {selectedStaff.licenseNumber !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">License Information</h3>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">License Number</Label>
                    <p className="text-sm">{selectedStaff.licenseNumber}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>
              Update staff member information
            </DialogDescription>
          </DialogHeader>
          <StaffForm 
            staff={selectedStaff}
            onSave={() => setIsEditDialogOpen(false)} 
            onCancel={() => setIsEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Staff Form Component
function StaffForm({ staff, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    role: staff?.role || 'driver',
    licenseNumber: staff?.licenseNumber || '',
    experience: staff?.experience || '',
    assignedBus: staff?.assignedBus || '',
    salary: staff?.salary || '',
    address: staff?.address || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving staff:', formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="conductor">Conductor</SelectItem>
              <SelectItem value="mechanic">Mechanic</SelectItem>
              <SelectItem value="cleaner">Cleaner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="Enter license number (if applicable)"
          />
        </div>
        <div>
          <Label htmlFor="experience">Experience</Label>
          <Input
            id="experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            placeholder="e.g., 5 years"
          />
        </div>
        <div>
          <Label htmlFor="assignedBus">Assigned Bus</Label>
          <Select value={formData.assignedBus} onValueChange={(value) => setFormData({ ...formData, assignedBus: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select bus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MH-12-AB-1234">MH-12-AB-1234</SelectItem>
              <SelectItem value="MH-12-CD-5678">MH-12-CD-5678</SelectItem>
              <SelectItem value="MH-12-EF-9012">MH-12-EF-9012</SelectItem>
              <SelectItem value="All">All Buses</SelectItem>
              <SelectItem value="None">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salary">Monthly Salary</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            placeholder="Enter monthly salary"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter full address"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {staff ? 'Update Staff Member' : 'Add Staff Member'}
        </Button>
      </div>
    </form>
  );
}

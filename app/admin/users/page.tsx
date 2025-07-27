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

// Mock users data
const usersData = [
  {
    id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+91 98765 43210',
    role: 'user',
    status: 'active',
    joinDate: '2023-08-15',
    lastLogin: '2024-01-16',
    totalBookings: 12,
    totalSpent: 5400,
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+91 87654 32109',
    role: 'user',
    status: 'active',
    joinDate: '2023-11-20',
    lastLogin: '2024-01-15',
    totalBookings: 8,
    totalSpent: 3200,
    location: 'Delhi, India'
  },
  {
    id: 'U003',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    phone: '+91 76543 21098',
    role: 'admin',
    status: 'active',
    joinDate: '2023-05-10',
    lastLogin: '2024-01-16',
    totalBookings: 0,
    totalSpent: 0,
    location: 'Bangalore, Karnataka'
  },
  {
    id: 'U004',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+91 65432 10987',
    role: 'user',
    status: 'inactive',
    joinDate: '2023-12-05',
    lastLogin: '2023-12-20',
    totalBookings: 2,
    totalSpent: 800,
    location: 'Pune, Maharashtra'
  }
];

const userColumns: Column[] = [
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'phone', title: 'Phone', sortable: true },
  {
    key: 'role',
    title: 'Role',
    filterable: true,
    render: (value) => (
      <Badge variant={value === 'admin' ? 'default' : 'secondary'}>
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
  { key: 'totalBookings', title: 'Bookings', sortable: true },
  { 
    key: 'totalSpent', 
    title: 'Total Spent', 
    sortable: true,
    render: (value) => `₹${value.toLocaleString()}`
  },
  { key: 'joinDate', title: 'Join Date', sortable: true },
  { key: 'lastLogin', title: 'Last Login', sortable: true }
];

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState<any>(null);
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

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleActivateUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' }
        : user
    ));
  };

  const handleDeactivateUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'inactive' }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const userActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewUser(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleEditUser(row)}>
        <Edit className="h-4 w-4" />
      </Button>
      {row.status === 'active' ? (
        <Button variant="ghost" size="sm" onClick={() => handleDeactivateUser(row.id)}>
          <UserX className="h-4 w-4 text-orange-600" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => handleActivateUser(row.id)}>
          <UserCheck className="h-4 w-4 text-green-600" />
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(row.id)}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage platform users and administrators</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
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
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={users}
        columns={userColumns}
        actions={userActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-sm font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p className="text-sm">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Location</Label>
                    <p className="text-sm">{selectedUser.location}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Role</Label>
                    <Badge variant={selectedUser.role === 'admin' ? 'default' : 'secondary'}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : 'destructive'}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                    <p className="text-sm">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                    <p className="text-sm">{selectedUser.lastLogin}</p>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Activity Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Bookings</Label>
                    <p className="text-2xl font-bold text-blue-600">{selectedUser.totalBookings}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Spent</Label>
                    <p className="text-2xl font-bold text-green-600">₹{selectedUser.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Full Name</Label>
                <Input id="editName" defaultValue={selectedUser.name} />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input id="editEmail" type="email" defaultValue={selectedUser.email} />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input id="editPhone" defaultValue={selectedUser.phone} />
              </div>
              <div>
                <Label htmlFor="editRole">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editLocation">Location</Label>
                <Input id="editLocation" defaultValue={selectedUser.location} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

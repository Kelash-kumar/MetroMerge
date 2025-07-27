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
} from '@/components/ui/dialog';
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
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock support tickets data
const supportTicketsData = [
  {
    id: 'ST001',
    ticketNumber: 'MM-2024-001',
    subject: 'Booking cancellation issue',
    description: 'Unable to cancel my booking for tomorrow\'s journey. The cancel button is not working on the website.',
    category: 'booking',
    priority: 'high',
    status: 'open',
    createdBy: 'john.doe@email.com',
    assignedTo: 'support@metromerge.com',
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15',
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210'
  },
  {
    id: 'ST002',
    ticketNumber: 'MM-2024-002',
    subject: 'Payment not reflected',
    description: 'Made payment using UPI but booking status still shows pending. Transaction ID: TXN123456789',
    category: 'payment',
    priority: 'medium',
    status: 'in-progress',
    createdBy: 'jane.smith@email.com',
    assignedTo: 'finance@metromerge.com',
    createdDate: '2024-01-14',
    updatedDate: '2024-01-16',
    customerName: 'Jane Smith',
    customerPhone: '+91 87654 32109'
  },
  {
    id: 'ST003',
    ticketNumber: 'MM-2024-003',
    subject: 'Website loading issues',
    description: 'The website is very slow and sometimes doesn\'t load at all. This is affecting my ability to book tickets.',
    category: 'technical',
    priority: 'low',
    status: 'resolved',
    createdBy: 'mike.johnson@email.com',
    assignedTo: 'tech@metromerge.com',
    createdDate: '2024-01-12',
    updatedDate: '2024-01-16',
    customerName: 'Mike Johnson',
    customerPhone: '+91 76543 21098'
  },
  {
    id: 'ST004',
    ticketNumber: 'MM-2024-004',
    subject: 'Refund not processed',
    description: 'Cancelled my booking 3 days ago but refund hasn\'t been processed yet. Booking ref: MM2024001',
    category: 'payment',
    priority: 'urgent',
    status: 'open',
    createdBy: 'sarah.wilson@email.com',
    assignedTo: 'finance@metromerge.com',
    createdDate: '2024-01-16',
    updatedDate: '2024-01-16',
    customerName: 'Sarah Wilson',
    customerPhone: '+91 65432 10987'
  }
];

const ticketColumns: Column[] = [
  { key: 'ticketNumber', title: 'Ticket #', sortable: true, filterable: true },
  { key: 'subject', title: 'Subject', sortable: true, filterable: true },
  { key: 'customerName', title: 'Customer', sortable: true, filterable: true },
  {
    key: 'category',
    title: 'Category',
    filterable: true,
    render: (value) => (
      <Badge variant="outline">
        {value}
      </Badge>
    )
  },
  {
    key: 'priority',
    title: 'Priority',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'urgent' ? 'destructive' :
        value === 'high' ? 'default' :
        value === 'medium' ? 'secondary' : 'outline'
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
      <Badge variant={
        value === 'open' ? 'destructive' :
        value === 'in-progress' ? 'default' :
        value === 'resolved' ? 'secondary' : 'outline'
      }>
        {value}
      </Badge>
    )
  },
  { key: 'assignedTo', title: 'Assigned To', sortable: true, filterable: true },
  { key: 'createdDate', title: 'Created', sortable: true },
  { key: 'updatedDate', title: 'Updated', sortable: true }
];

export default function SupportTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState(supportTicketsData);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [response, setResponse] = useState('');

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewDialogOpen(true);
    setResponse('');
  };

  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedDate: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  const handleSendResponse = () => {
    if (selectedTicket && response.trim()) {
      // In a real app, this would send the response to the customer
      console.log('Sending response:', response);
      handleUpdateStatus(selectedTicket.id, 'in-progress');
      setResponse('');
      setIsViewDialogOpen(false);
    }
  };

  const ticketActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewTicket(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      {row.status === 'open' && (
        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(row.id, 'in-progress')}>
          <Clock className="h-4 w-4 text-blue-600" />
        </Button>
      )}
      {row.status !== 'resolved' && (
        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(row.id, 'resolved')}>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </Button>
      )}
      {row.status !== 'closed' && (
        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(row.id, 'closed')}>
          <XCircle className="h-4 w-4 text-red-600" />
        </Button>
      )}
    </div>
  );

  const getStatusCounts = () => {
    const counts = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      open: counts.open || 0,
      inProgress: counts['in-progress'] || 0,
      resolved: counts.resolved || 0,
      closed: counts.closed || 0
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600">Manage customer support requests</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Open</p>
              <p className="text-2xl font-bold text-red-700">{statusCounts.open}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <MessageSquare className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-700">{statusCounts.inProgress}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">{statusCounts.resolved}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Closed</p>
              <p className="text-2xl font-bold text-gray-700">{statusCounts.closed}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <XCircle className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <DataTable
        data={tickets}
        columns={ticketColumns}
        actions={ticketActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Ticket Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Support Ticket Details</DialogTitle>
            <DialogDescription>
              Ticket #{selectedTicket?.ticketNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Ticket Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Subject</Label>
                    <p className="text-sm font-medium">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Category</Label>
                    <Badge variant="outline">{selectedTicket.category}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Priority</Label>
                    <Badge variant={
                      selectedTicket.priority === 'urgent' ? 'destructive' :
                      selectedTicket.priority === 'high' ? 'default' :
                      selectedTicket.priority === 'medium' ? 'secondary' : 'outline'
                    }>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge variant={
                      selectedTicket.status === 'open' ? 'destructive' :
                      selectedTicket.status === 'in-progress' ? 'default' :
                      selectedTicket.status === 'resolved' ? 'secondary' : 'outline'
                    }>
                      {selectedTicket.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Created Date</Label>
                    <p className="text-sm">{selectedTicket.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                    <p className="text-sm">{selectedTicket.updatedDate}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-sm">{selectedTicket.customerName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{selectedTicket.createdBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p className="text-sm">{selectedTicket.customerPhone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Assigned To</Label>
                    <p className="text-sm">{selectedTicket.assignedTo}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedTicket.description}</p>
                </div>
              </div>

              {/* Response Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Send Response</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Update Status</Label>
                    <Select 
                      value={selectedTicket.status} 
                      onValueChange={(value) => handleUpdateStatus(selectedTicket.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="response">Response Message</Label>
                    <Textarea
                      id="response"
                      placeholder="Type your response to the customer..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={handleSendResponse} disabled={!response.trim()}>
                      Send Response
                    </Button>
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

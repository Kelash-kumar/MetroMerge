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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Eye,
  XCircle,
  Edit,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// Mock bookings data
const bookingsData = [
  {
    id: 'BK001',
    bookingRef: 'MM2024001',
    passengerName: 'Ahmed Ali Khan',
    passengerPhone: '+92 21 98765 43210',
    passengerEmail: 'ahmed.ali@email.com',
    route: 'Karachi - Hyderabad',
    busNumber: 'KHI-2023-1234',
    seatNumbers: ['A1', 'A2'],
    travelDate: '2024-01-20',
    departureTime: '06:00',
    arrivalTime: '09:00',
    fare: 1600,
    bookingDate: '2024-01-15',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'JazzCash',
    boardingPoint: 'Karachi Saddar',
    droppingPoint: 'Hyderabad Station'
  },
  {
    id: 'BK002',
    bookingRef: 'MM2024002',
    passengerName: 'Fatima Sheikh',
    passengerPhone: '+92 22 87654 32109',
    passengerEmail: 'fatima.sheikh@email.com',
    route: 'Karachi - Umerkot',
    busNumber: 'KHI-2024-5678',
    seatNumbers: ['B3'],
    travelDate: '2024-01-18',
    departureTime: '08:00',
    arrivalTime: '14:00',
    fare: 1200,
    bookingDate: '2024-01-16',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'EasyPaisa',
    boardingPoint: 'Karachi Cantt',
    droppingPoint: 'Umerkot Bus Stand'
  },
  {
    id: 'BK003',
    bookingRef: 'MM2024003',
    passengerName: 'Hassan Raza',
    passengerPhone: '+92 42 76543 21098',
    passengerEmail: 'hassan.raza@email.com',
    route: 'Lahore - Islamabad',
    busNumber: 'LHR-2023-3456',
    seatNumbers: ['C5', 'C6'],
    travelDate: '2024-01-22',
    departureTime: '20:00',
    arrivalTime: '01:00',
    fare: 3000,
    bookingDate: '2024-01-14',
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Bank Transfer',
    boardingPoint: 'Lahore Kalma Chowk',
    droppingPoint: 'Islamabad Blue Area'
  }
];

const bookingColumns: Column[] = [
  { key: 'bookingRef', title: 'Booking Ref', sortable: true, filterable: true },
  { key: 'passengerName', title: 'Passenger', sortable: true, filterable: true },
  { key: 'route', title: 'Route', sortable: true, filterable: true },
  { key: 'travelDate', title: 'Travel Date', sortable: true },
  { key: 'seatNumbers', title: 'Seats', render: (value) => value.join(', ') },
  { 
    key: 'fare', 
    title: 'Fare', 
    sortable: true,
    render: (value) => `Rs.${value}`
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'confirmed' ? 'default' :
        value === 'pending' ? 'secondary' :
        value === 'cancelled' ? 'destructive' : 'secondary'
      }>
        {value}
      </Badge>
    )
  },
  {
    key: 'paymentStatus',
    title: 'Payment',
    filterable: true,
    render: (value) => (
      <Badge variant={
        value === 'paid' ? 'default' :
        value === 'pending' ? 'secondary' :
        value === 'refunded' ? 'outline' : 'secondary'
      }>
        {value}
      </Badge>
    )
  }
];

export default function BookingManagement() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(bookingsData);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<any>(null);

  // Redirect if not vendor
  if (user?.role !== 'vendor') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Vendor privileges required.</p>
      </div>
    );
  }

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleCancelBooking = (booking: any) => {
    setBookingToCancel(booking);
    setIsCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      setBookings(bookings.map(booking => 
        booking.id === bookingToCancel.id 
          ? { ...booking, status: 'cancelled', paymentStatus: 'refunded' }
          : booking
      ));
      setIsCancelDialogOpen(false);
      setBookingToCancel(null);
    }
  };

  const bookingActions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => handleViewBooking(row)}>
        <Eye className="h-4 w-4" />
      </Button>
      {row.status !== 'cancelled' && (
        <Button variant="ghost" size="sm" onClick={() => handleCancelBooking(row)}>
          <XCircle className="h-4 w-4 text-red-600" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600">View and manage all passenger bookings</p>
        </div>
      </div>

      <DataTable
        data={bookings}
        columns={bookingColumns}
        actions={bookingActions}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Booking Reference: {selectedBooking?.bookingRef}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Passenger Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Passenger Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-sm font-medium">{selectedBooking.passengerName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedBooking.passengerPhone}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedBooking.passengerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Journey Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Route</Label>
                    <p className="text-sm font-medium">{selectedBooking.route}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Bus Number</Label>
                    <p className="text-sm">{selectedBooking.busNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Travel Date</Label>
                    <p className="text-sm">{selectedBooking.travelDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Seat Numbers</Label>
                    <p className="text-sm">{selectedBooking.seatNumbers.join(', ')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Departure Time</Label>
                    <p className="text-sm">{selectedBooking.departureTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Arrival Time</Label>
                    <p className="text-sm">{selectedBooking.arrivalTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Boarding Point</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedBooking.boardingPoint}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Dropping Point</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{selectedBooking.droppingPoint}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking & Payment Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Booking & Payment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Booking Date</Label>
                    <p className="text-sm">{selectedBooking.bookingDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Fare</Label>
                    <p className="text-sm font-bold text-green-600">Rs.{selectedBooking.fare}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Booking Status</Label>
                    <Badge variant={
                      selectedBooking.status === 'confirmed' ? 'default' :
                      selectedBooking.status === 'pending' ? 'secondary' :
                      'destructive'
                    }>
                      {selectedBooking.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Payment Status</Label>
                    <Badge variant={
                      selectedBooking.paymentStatus === 'paid' ? 'default' :
                      selectedBooking.paymentStatus === 'pending' ? 'secondary' :
                      'outline'
                    }>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Payment Method</Label>
                    <p className="text-sm">{selectedBooking.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Confirmation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel booking {bookingToCancel?.bookingRef}? 
              This action cannot be undone and a refund will be processed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelBooking}>
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

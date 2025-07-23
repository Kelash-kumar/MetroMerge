"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bus, Calendar, Clock, Download, MapPin, MoreVertical, Search, Share, Star, Ticket, User } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for bookings
const upcomingBookings = [
  {
    id: "BK12345",
    from: "New York",
    to: "Boston",
    date: "2025-03-25",
    departureTime: "07:30",
    arrivalTime: "13:45",
    operator: "Express Travels",
    operatorRating: 4.5,
    busType: "AC Sleeper",
    seats: ["L2A", "L2B"],
    status: "confirmed",
    pnr: "PNR123456",
    passengers: [
      { name: "John Doe", age: "32", gender: "male" },
      { name: "Jane Doe", age: "28", gender: "female" },
    ],
    totalAmount: 90,
  },
  {
    id: "BK12346",
    from: "Boston",
    to: "Washington DC",
    date: "2025-04-10",
    departureTime: "09:00",
    arrivalTime: "16:30",
    operator: "Royal Coaches",
    operatorRating: 4.2,
    busType: "AC Seater",
    seats: ["U3C"],
    status: "confirmed",
    pnr: "PNR789012",
    passengers: [{ name: "John Doe", age: "32", gender: "male" }],
    totalAmount: 45,
  },
]

const completedBookings = [
  {
    id: "BK12340",
    from: "New York",
    to: "Philadelphia",
    date: "2025-02-15",
    departureTime: "10:15",
    arrivalTime: "13:30",
    operator: "City Link",
    operatorRating: 3.8,
    busType: "AC Seater",
    seats: ["L1A"],
    status: "completed",
    pnr: "PNR345678",
    passengers: [{ name: "John Doe", age: "32", gender: "male" }],
    totalAmount: 35,
  },
  {
    id: "BK12341",
    from: "Philadelphia",
    to: "New York",
    date: "2025-02-20",
    departureTime: "16:30",
    arrivalTime: "19:45",
    operator: "City Link",
    operatorRating: 3.8,
    busType: "AC Seater",
    seats: ["L3B"],
    status: "completed",
    pnr: "PNR901234",
    passengers: [{ name: "John Doe", age: "32", gender: "male" }],
    totalAmount: 35,
  },
]

const cancelledBookings = [
  {
    id: "BK12342",
    from: "New York",
    to: "Atlantic City",
    date: "2025-01-05",
    departureTime: "08:45",
    arrivalTime: "11:30",
    operator: "Comfort Rides",
    operatorRating: 4.0,
    busType: "AC Sleeper",
    seats: ["U2A", "U2B"],
    status: "cancelled",
    pnr: "PNR567890",
    passengers: [
      { name: "John Doe", age: "32", gender: "male" },
      { name: "Jane Doe", age: "28", gender: "female" },
    ],
    totalAmount: 76,
    refundAmount: 68.4,
  },
]

export default function MyBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showTicketDialog, setShowTicketDialog] = useState(false)

  const filterBookings = (bookings: any[]) => {
    if (!searchQuery) return bookings

    const query = searchQuery.toLowerCase()
    return bookings.filter(
      (booking) =>
        booking.from.toLowerCase().includes(query) ||
        booking.to.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query) ||
        booking.pnr.toLowerCase().includes(query) ||
        booking.operator.toLowerCase().includes(query),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="text-muted-foreground">View and manage all your bus bookings</p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by booking ID, destination, or operator"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {filterBookings(upcomingBookings).length > 0 ? (
                <div className="space-y-4">
                  {filterBookings(upcomingBookings).map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewTicket={() => {
                        setSelectedBooking(booking)
                        setShowTicketDialog(true)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming bookings"
                  description="You don't have any upcoming bus journeys. Book a trip to get started!"
                  actionLabel="Book a Bus"
                  actionHref="/"
                />
              )}
            </TabsContent>

            <TabsContent value="completed">
              {filterBookings(completedBookings).length > 0 ? (
                <div className="space-y-4">
                  {filterBookings(completedBookings).map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewTicket={() => {
                        setSelectedBooking(booking)
                        setShowTicketDialog(true)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No completed bookings"
                  description="You don't have any completed bus journeys yet."
                  actionLabel="Book a Bus"
                  actionHref="/"
                />
              )}
            </TabsContent>

            <TabsContent value="cancelled">
              {filterBookings(cancelledBookings).length > 0 ? (
                <div className="space-y-4">
                  {filterBookings(cancelledBookings).map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewTicket={() => {
                        setSelectedBooking(booking)
                        setShowTicketDialog(true)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No cancelled bookings"
                  description="You don't have any cancelled bus journeys."
                  actionLabel="Book a Bus"
                  actionHref="/"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-md">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Bus Ticket</DialogTitle>
                <DialogDescription>
                  Booking ID: {selectedBooking.id} | PNR: {selectedBooking.pnr}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-primary" />
                      <span className="font-medium">{selectedBooking.operator}</span>
                    </div>
                    <Badge
                      variant={
                        selectedBooking.status === "confirmed"
                          ? "outline"
                          : selectedBooking.status === "completed"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {selectedBooking.status}
                    </Badge>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xl font-bold">{selectedBooking.departureTime}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.from}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-sm text-muted-foreground">{formatDate(selectedBooking.date)}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{selectedBooking.arrivalTime}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.to}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bus Type:</span>
                      <span className="text-sm font-medium">{selectedBooking.busType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Seat(s):</span>
                      <span className="text-sm font-medium">{selectedBooking.seats.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Passenger(s):</span>
                      <span className="text-sm font-medium">
                        {selectedBooking.passengers.map((p) => p.name).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Amount:</span>
                      <span className="text-sm font-medium">${selectedBooking.totalAmount.toFixed(2)}</span>
                    </div>
                    {selectedBooking.refundAmount && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Refund Amount:</span>
                        <span className="text-sm font-medium text-green-600">
                          ${selectedBooking.refundAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Important: Show this ticket to the bus operator before boarding</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button className="flex-1">Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

function BookingCard({ booking, onViewTicket }: { booking: any; onViewTicket: () => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{booking.operator}</h3>
                <div className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-800">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span>{booking.operatorRating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Booking ID: {booking.id}</span>
                <span>•</span>
                <span>PNR: {booking.pnr}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "outline"
                    : booking.status === "completed"
                      ? "secondary"
                      : "destructive"
                }
                className="capitalize"
              >
                {booking.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewTicket}>View Ticket</DropdownMenuItem>
                  <DropdownMenuItem>Download Ticket</DropdownMenuItem>
                  <DropdownMenuItem>Share Ticket</DropdownMenuItem>
                  {booking.status === "confirmed" && (
                    <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(booking.date)}</span>
            <span>•</span>
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {booking.departureTime} - {booking.arrivalTime}
            </span>
            <span>•</span>
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{booking.passengers.length} passenger(s)</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold">{booking.departureTime}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {booking.from}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bus className="h-4 w-4" />
                <span>{booking.busType}</span>
              </div>
              <div className="mt-1 text-xs">Seat(s): {booking.seats.join(", ")}</div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{booking.arrivalTime}</p>
              <p className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {booking.to}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm">
              <span className="font-medium">Total Amount:</span> ${booking.totalAmount.toFixed(2)}
              {booking.refundAmount && (
                <span className="ml-2 text-green-600">(Refunded: ${booking.refundAmount.toFixed(2)})</span>
              )}
            </div>
            <Button size="sm" onClick={onViewTicket}>
              View Ticket
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Ticket className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-md">{description}</p>
      <Button asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}


import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BusDetails } from "./bus-details"
import { SeatSelection } from "./seat-selection"
import { PassengerForm } from "./passenger-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for bus details
const busData = {
  id: 1,
  operator: "Express Travels",
  operatorRating: 4.5,
  busType: "AC Sleeper",
  departureTime: "07:30",
  arrivalTime: "13:45",
  duration: "6h 15m",
  price: 45,
  totalSeats: 36,
  availableSeats: 12,
  amenities: ["wifi", "charging-point", "water-bottle", "blanket"],
  discount: "10% OFF",
  boardingPoints: [
    { id: 1, name: "Central Bus Station", time: "07:30", address: "123 Main St" },
    { id: 2, name: "North Terminal", time: "07:45", address: "456 North Ave" },
    { id: 3, name: "South Terminal", time: "08:00", address: "789 South Blvd" },
  ],
  droppingPoints: [
    { id: 1, name: "Main Bus Terminal", time: "13:45", address: "321 Main St" },
    { id: 2, name: "Downtown Station", time: "14:00", address: "654 Downtown Ave" },
    { id: 3, name: "East Terminal", time: "14:15", address: "987 East Blvd" },
  ],
}

export default function BookingPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { from?: string; to?: string; date?: string }
}) {
  const from = searchParams.from || "New York"
  const to = searchParams.to || "Boston"
  const date = searchParams.date ? new Date(searchParams.date) : new Date()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <Link
              href={`/search?from=${from}&to=${to}&date=${date.toISOString()}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to search results
            </Link>
            <h1 className="mt-2 text-2xl font-bold">
              Book Tickets: {from} to {to}
            </h1>
            <p className="text-muted-foreground">
              {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              <BusDetails bus={busData} from={from} to={to} />
              <SeatSelection bus={busData} />
              <PassengerForm />
            </div>

            <div className="h-fit lg:sticky lg:top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Fare Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Fare</span>
                      <span>${busData.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>$2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>$3.75</span>
                    </div>
                    {busData.discount && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-$4.50</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>${(busData.price + 2.5 + 3.75 - 4.5).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full">Proceed to Payment</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


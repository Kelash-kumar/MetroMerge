"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Generate a mock seat layout
const generateSeatLayout = () => {
  const layout = []
  // Lower deck
  const lowerDeck = []
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 4; col++) {
      // Skip aisle seats
      if (col === 3) continue

      const seatNumber = `L${row}${col === 1 ? "A" : col === 2 ? "B" : col === 4 ? "C" : "D"}`
      const isBooked = Math.random() > 0.7
      lowerDeck.push({
        id: seatNumber,
        number: seatNumber,
        price: 45,
        isBooked,
        deck: "lower",
        row,
        col: col === 4 ? 3 : col, // Adjust column for display
      })
    }
  }
  layout.push({ deck: "lower", seats: lowerDeck })

  // Upper deck
  const upperDeck = []
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 4; col++) {
      // Skip aisle seats
      if (col === 3) continue

      const seatNumber = `U${row}${col === 1 ? "A" : col === 2 ? "B" : col === 4 ? "C" : "D"}`
      const isBooked = Math.random() > 0.7
      upperDeck.push({
        id: seatNumber,
        number: seatNumber,
        price: 45,
        isBooked,
        deck: "upper",
        row,
        col: col === 4 ? 3 : col, // Adjust column for display
      })
    }
  }
  layout.push({ deck: "upper", seats: upperDeck })

  return layout
}

const seatLayout = generateSeatLayout()

type SeatSelectionProps = {
  bus: {
    id: number
    price: number
  }
}

export function SeatSelection({ bus }: SeatSelectionProps) {
  const [selectedDeck, setSelectedDeck] = useState("lower")
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const currentDeck = seatLayout.find((deck) => deck.deck === selectedDeck)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Seats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex gap-4">
          <Button variant={selectedDeck === "lower" ? "default" : "outline"} onClick={() => setSelectedDeck("lower")}>
            Lower Deck
          </Button>
          <Button variant={selectedDeck === "upper" ? "default" : "outline"} onClick={() => setSelectedDeck("upper")}>
            Upper Deck
          </Button>
        </div>

        <div className="mb-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-gray-300 bg-white"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-gray-300 bg-gray-300"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-primary bg-primary"></div>
            <span className="text-sm">Selected</span>
          </div>
        </div>

        <div className="relative mb-8 overflow-auto">
          {/* Bus front */}
          <div className="mb-4 flex justify-center">
            <div className="w-20 rounded-t-full border-2 border-gray-300 bg-gray-100 py-2 text-center text-sm">
              Front
            </div>
          </div>

          {/* Seat grid */}
          <div className="grid grid-cols-4 gap-2 p-4">
            {currentDeck?.seats.map((seat) => (
              <div
                key={seat.id}
                style={{
                  gridColumn: seat.col,
                  gridRow: seat.row,
                }}
                className={cn(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded border text-xs font-medium",
                  seat.isBooked
                    ? "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-500"
                    : selectedSeats.includes(seat.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-gray-300 bg-white hover:border-primary hover:bg-primary/10",
                )}
                onClick={() => !seat.isBooked && handleSeatClick(seat.id)}
              >
                {seat.number}
              </div>
            ))}

            {/* Aisle */}
            <div className="col-span-4 row-span-5 col-start-3 row-start-1 w-2 bg-transparent"></div>
          </div>

          {/* Bus rear */}
          <div className="mt-4 flex justify-center">
            <div className="w-20 rounded-b-full border-2 border-gray-300 bg-gray-100 py-2 text-center text-sm">
              Rear
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-medium">Selected Seats</h3>
          {selectedSeats.length > 0 ? (
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {selectedSeats.map((seatId) => (
                  <div key={seatId} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {seatId}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span>Total: {selectedSeats.length} seat(s)</span>
                <span className="font-medium">${(selectedSeats.length * bus.price).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No seats selected</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


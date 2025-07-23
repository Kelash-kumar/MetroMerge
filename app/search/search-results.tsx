"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wifi, BatteryCharging, Droplets, Bed, Star, Clock, ArrowRight } from "lucide-react"

// Mock data for bus results
const busResults = [
  {
    id: 1,
    operator: "Express Travels",
    operatorRating: 4.5,
    busType: "AC Sleeper",
    departureTime: "07:30",
    arrivalTime: "13:45",
    duration: "6h 15m",
    price: 45,
    seatsAvailable: 12,
    amenities: ["wif", "charging-point", "water-bottle"],
    discount: "10% OFF",
  },
  {
    id: 2,
    operator: "Royal Coaches",
    operatorRating: 4.2,
    busType: "AC Seater",
    departureTime: "09:00",
    arrivalTime: "14:30",
    duration: "5h 30m",
    price: 35,
    seatsAvailable: 8,
    amenities: ["wifi", "charging-point"],
  },
  {
    id: 3,
    operator: "City Link",
    operatorRating: 3.8,
    busType: "Non-AC Sleeper",
    departureTime: "10:15",
    arrivalTime: "16:45",
    duration: "6h 30m",
    price: 28,
    seatsAvailable: 20,
    amenities: ["water-bottle"],
  },
  {
    id: 4,
    operator: "Metro Express",
    operatorRating: 4.7,
    busType: "AC Sleeper",
    departureTime: "16:30",
    arrivalTime: "22:00",
    duration: "5h 30m",
    price: 50,
    seatsAvailable: 5,
    amenities: ["wifi", "charging-point", "water-bottle"],
    discount: "15% OFF",
  },
  {
    id: 5,
    operator: "Comfort Rides",
    operatorRating: 4.0,
    busType: "AC Seater",
    departureTime: "18:45",
    arrivalTime: "23:30",
    duration: "4h 45m",
    price: 38,
    seatsAvailable: 15,
    amenities: ["charging-point", "water-bottle"],
  },
]

type AmenityIcon = {
  [key: string]: React.ReactNode
}

const amenityIcons: AmenityIcon = {
  wifi: <Wifi className="h-4 w-4" />,
  "charging-point": <BatteryCharging className="h-4 w-4" />,
  "water-bottle": <Droplets className="h-4 w-4" />,
  blanket: <Bed className="h-4 w-4" />,
}

export function SearchResults({
  from,
  to,
  date,
}: {
  from: string
  to: string
  date: Date
}) {
  const [sortBy, setSortBy] = useState("departure")

  // Sort results based on selected option
  const sortedResults = [...busResults].sort((a, b) => {
    switch (sortBy) {
      case "departure":
        return a.departureTime.localeCompare(b.departureTime)
      case "arrival":
        return a.arrivalTime.localeCompare(b.arrivalTime)
      case "duration":
        return a.duration.localeCompare(b.duration)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.operatorRating - a.operatorRating
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{busResults.length} buses found</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="arrival">Arrival Time</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedResults.map((bus) => (
        <Card key={bus.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] border-b">
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{bus.operator}</h3>
                      <div className="flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-800">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span>{bus.operatorRating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{bus.busType}</p>
                  </div>
                  {bus.discount && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {bus.discount}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-2xl font-bold">{bus.departureTime}</p>
                    <p className="text-sm text-muted-foreground">{from}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{bus.duration}</span>
                    </div>
                    <div className="relative mt-2 h-0.5 w-full bg-gray-200">
                      <ArrowRight className="absolute -right-1 -top-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{bus.arrivalTime}</p>
                    <p className="text-sm text-muted-foreground">{to}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {bus.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
                      {amenityIcons[amenity]}
                      <span className="capitalize">{amenity.replace("-", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 md:p-6 md:border-l">
                <div className="text-center">
                  <p className="text-2xl font-bold">${bus.price}</p>
                  <p className="text-sm text-muted-foreground">{bus.seatsAvailable} seats left</p>
                </div>
                <Link href={`/booking/${bus.id}?from=${from}&to=${to}&date=${date.toISOString()}`}>
                  <Button className="w-full">View Seats</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


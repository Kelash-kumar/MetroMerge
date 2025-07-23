"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, BatteryCharging, Droplets, Bed, Star, Clock, ArrowRight, MapPin } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type AmenityIcon = {
  [key: string]: React.ReactNode
}

const amenityIcons: AmenityIcon = {
  wifi: <Wifi className="h-4 w-4" />,
  "charging-point": <BatteryCharging className="h-4 w-4" />,
  "water-bottle": <Droplets className="h-4 w-4" />,
  blanket: <Bed className="h-4 w-4" />,
}

type BusDetailsProps = {
  bus: {
    id: number
    operator: string
    operatorRating: number
    busType: string
    departureTime: string
    arrivalTime: string
    duration: string
    price: number
    totalSeats: number
    availableSeats: number
    amenities: string[]
    discount?: string
    boardingPoints: {
      id: number
      name: string
      time: string
      address: string
    }[]
    droppingPoints: {
      id: number
      name: string
      time: string
      address: string
    }[]
  }
  from: string
  to: string
}

export function BusDetails({ bus, from, to }: BusDetailsProps) {
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<string>(bus.boardingPoints[0].id.toString())
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<string>(bus.droppingPoints[0].id.toString())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bus Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{bus.operator}</h3>
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

        <div className="mt-6">
          <Tabs defaultValue="boarding">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="boarding">Boarding Points</TabsTrigger>
              <TabsTrigger value="dropping">Dropping Points</TabsTrigger>
            </TabsList>
            <TabsContent value="boarding" className="mt-4">
              <RadioGroup value={selectedBoardingPoint} onValueChange={setSelectedBoardingPoint}>
                {bus.boardingPoints.map((point) => (
                  <div key={point.id} className="flex items-start gap-3 rounded-lg border p-3 mb-2">
                    <RadioGroupItem value={point.id.toString()} id={`boarding-${point.id}`} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={`boarding-${point.id}`} className="font-medium">
                        {point.name} - {point.time}
                      </Label>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {point.address}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>
            <TabsContent value="dropping" className="mt-4">
              <RadioGroup value={selectedDroppingPoint} onValueChange={setSelectedDroppingPoint}>
                {bus.droppingPoints.map((point) => (
                  <div key={point.id} className="flex items-start gap-3 rounded-lg border p-3 mb-2">
                    <RadioGroupItem value={point.id.toString()} id={`dropping-${point.id}`} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={`dropping-${point.id}`} className="font-medium">
                        {point.name} - {point.time}
                      </Label>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {point.address}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}


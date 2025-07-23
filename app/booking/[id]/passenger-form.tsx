"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export function PassengerForm() {
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }])

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }])
  }

  const removePassenger = (index: number) => {
    const updatedPassengers = [...passengers]
    updatedPassengers.splice(index, 1)
    setPassengers(updatedPassengers)
  }

  const updatePassenger = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value }
    setPassengers(updatedPassengers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="your@email.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Ticket will be sent to this email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="Your phone number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">For updates about your journey</p>
            </div>
          </div>

          <Separator />

          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Passenger {index + 1}</h3>
                {index > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => removePassenger(index)}>
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Full Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, "name", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`age-${index}`}>Age</Label>
                  <Input
                    id={`age-${index}`}
                    type="number"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(e) => updatePassenger(index, "age", e.target.value)}
                    placeholder="Age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gender-${index}`}>Gender</Label>
                  <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, "gender", value)}>
                    <SelectTrigger id={`gender-${index}`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {index === passengers.length - 1 && <Separator />}
            </div>
          ))}

          <Button variant="outline" onClick={addPassenger}>
            Add Another Passenger
          </Button>

          <div className="flex items-start space-x-2">
            <Checkbox id="insurance" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="insurance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add travel insurance for $2.99
              </Label>
              <p className="text-xs text-muted-foreground">
                Protect your journey with our comprehensive travel insurance
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </Label>
              <p className="text-xs text-muted-foreground">
                By proceeding, you agree to MetroMerge's terms of service and privacy policy
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


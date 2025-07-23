"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [busTypes, setBusTypes] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [ratings, setRatings] = useState<string[]>([])

  const handleDepartureTimeChange = (value: string) => {
    setDepartureTime(
      departureTime.includes(value) ? departureTime.filter((item) => item !== value) : [...departureTime, value],
    )
  }

  const handleBusTypeChange = (value: string) => {
    setBusTypes(busTypes.includes(value) ? busTypes.filter((item) => item !== value) : [...busTypes, value])
  }

  const handleAmenityChange = (value: string) => {
    setAmenities(amenities.includes(value) ? amenities.filter((item) => item !== value) : [...amenities, value])
  }

  const handleRatingChange = (value: string) => {
    setRatings(ratings.includes(value) ? ratings.filter((item) => item !== value) : [...ratings, value])
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        <Accordion type="multiple" defaultValue={["price", "departure", "bus-type"]}>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="departure">
            <AccordionTrigger>Departure Time</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="morning"
                    checked={departureTime.includes("morning")}
                    onCheckedChange={() => handleDepartureTimeChange("morning")}
                  />
                  <Label htmlFor="morning">Morning (6AM - 12PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="afternoon"
                    checked={departureTime.includes("afternoon")}
                    onCheckedChange={() => handleDepartureTimeChange("afternoon")}
                  />
                  <Label htmlFor="afternoon">Afternoon (12PM - 6PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="evening"
                    checked={departureTime.includes("evening")}
                    onCheckedChange={() => handleDepartureTimeChange("evening")}
                  />
                  <Label htmlFor="evening">Evening (6PM - 12AM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="night"
                    checked={departureTime.includes("night")}
                    onCheckedChange={() => handleDepartureTimeChange("night")}
                  />
                  <Label htmlFor="night">Night (12AM - 6AM)</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bus-type">
            <AccordionTrigger>Bus Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ac"
                    checked={busTypes.includes("ac")}
                    onCheckedChange={() => handleBusTypeChange("ac")}
                  />
                  <Label htmlFor="ac">AC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="non-ac"
                    checked={busTypes.includes("non-ac")}
                    onCheckedChange={() => handleBusTypeChange("non-ac")}
                  />
                  <Label htmlFor="non-ac">Non-AC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sleeper"
                    checked={busTypes.includes("sleeper")}
                    onCheckedChange={() => handleBusTypeChange("sleeper")}
                  />
                  <Label htmlFor="sleeper">Sleeper</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="seater"
                    checked={busTypes.includes("seater")}
                    onCheckedChange={() => handleBusTypeChange("seater")}
                  />
                  <Label htmlFor="seater">Seater</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="amenities">
            <AccordionTrigger>Amenities</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={amenities.includes("wifi")}
                    onCheckedChange={() => handleAmenityChange("wifi")}
                  />
                  <Label htmlFor="wifi">WiFi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charging-point"
                    checked={amenities.includes("charging-point")}
                    onCheckedChange={() => handleAmenityChange("charging-point")}
                  />
                  <Label htmlFor="charging-point">Charging Point</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="water-bottle"
                    checked={amenities.includes("water-bottle")}
                    onCheckedChange={() => handleAmenityChange("water-bottle")}
                  />
                  <Label htmlFor="water-bottle">Water Bottle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blanket"
                    checked={amenities.includes("blanket")}
                    onCheckedChange={() => handleAmenityChange("blanket")}
                  />
                  <Label htmlFor="blanket">Blanket</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ratings">
            <AccordionTrigger>Ratings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="4-plus"
                    checked={ratings.includes("4-plus")}
                    onCheckedChange={() => handleRatingChange("4-plus")}
                  />
                  <Label htmlFor="4-plus">4+ Star</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="3-plus"
                    checked={ratings.includes("3-plus")}
                    onCheckedChange={() => handleRatingChange("3-plus")}
                  />
                  <Label htmlFor="3-plus">3+ Star</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="2-plus"
                    checked={ratings.includes("2-plus")}
                    onCheckedChange={() => handleRatingChange("2-plus")}
                  />
                  <Label htmlFor="2-plus">2+ Star</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
          <Button className="flex-1">Apply</Button>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPin, ArrowRightLeft } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function SearchForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [from, setFrom] = useState("karachi")
  const [to, setTo] = useState("Hyderabad")

  const handleSwapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?from=${from}&to=${to}&date=${date?.toISOString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid gap-4 md:grid-cols-[1fr_1fr_auto_auto] rounded-xl bg-white p-4 shadow-lg"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <Label htmlFor="from" className="sr-only">
          From
        </Label>
        <Input id="from" placeholder="From" className="pl-10" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <Label htmlFor="to" className="sr-only">
          To
        </Label>
        <Input id="to" placeholder="To" className="pl-10" value={to} onChange={(e) => setTo(e.target.value)} />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-2 bg-white shadow-md md:left-auto md:-right-6"
          onClick={handleSwapLocations}
        >
          <ArrowRightLeft className="h-5 w-5" />
          <span className="sr-only">Swap locations</span>
        </Button>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="bg-primary hover:bg-primary/90">
        SEARCH BUSES
      </Button>
    </form>
  )
}


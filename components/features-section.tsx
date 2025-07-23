import { Card, CardContent } from "@/components/ui/card"
import { Clock, ThumbsUp, Star, Shield, CreditCard, MapPin, Smartphone, TicketCheck } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Why Choose MetroMerge?</h2>
          <p className="text-muted-foreground">
            We offer the best bus booking experience with exclusive benefits and features
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">On Time</h3>
              <p className="text-sm text-muted-foreground">Punctual arrivals on 95% of trips</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Friendly Staff</h3>
              <p className="text-sm text-muted-foreground">Always ready to help with your needs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Top Rated</h3>
              <p className="text-sm text-muted-foreground">Buses with 4+ star customer ratings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Secure Booking</h3>
              <p className="text-sm text-muted-foreground">Safe and secure payment methods</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Multiple Payments</h3>
              <p className="text-sm text-muted-foreground">Pay using UPI, cards, net banking & more</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Live Tracking</h3>
              <p className="text-sm text-muted-foreground">Track your bus location in real-time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Mobile Tickets</h3>
              <p className="text-sm text-muted-foreground">Paperless m-tickets for easy boarding</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TicketCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Easy Cancellation</h3>
              <p className="text-sm text-muted-foreground">Hassle-free cancellation and quick refunds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


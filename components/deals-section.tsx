import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Percent, Clock, Calendar } from "lucide-react"

export function DealsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Exclusive MetroDeals</h2>
          <p className="text-muted-foreground">
            Don't miss out on these incredible offers, book your bus tickets now and travel with convenience and
            affordability.
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md bg-primary">
                      <Percent className="absolute inset-0 h-10 w-10 p-2 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Unlock Unbeatable Exclusive MetroDeals!</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>2,500+ Deals</span>
                        <span>1,500+ Bus Operators</span>
                        <span>100,000+ Routes</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                        <Percent className="mr-1 h-3 w-3" />
                        20% OFF
                      </Badge>
                      <span className="text-sm text-muted-foreground">on your first booking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        WEEKEND
                      </Badge>
                      <span className="text-sm text-muted-foreground">special discounts on weekend trips</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                        <Clock className="mr-1 h-3 w-3" />
                        LIMITED
                      </Badge>
                      <span className="text-sm text-muted-foreground">time offers on popular routes</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-gray-100 p-6 md:w-64">
                  <Button size="lg" className="w-full">
                    Book now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


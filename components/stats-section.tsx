import { Bus, Users, MapPin } from "lucide-react"

export function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Bus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">2,500+</h3>
              <p className="text-muted-foreground">Bus Operators</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">10M+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">100,000+</h3>
              <p className="text-muted-foreground">Routes Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


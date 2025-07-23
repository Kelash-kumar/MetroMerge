import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Bus, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md py-16 px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-24 w-24">
              <MapPin className="absolute h-24 w-24 text-gray-200" />
              <Bus className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold">Page Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            Oops! It seems like the bus route you're looking for doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/search?from=New%20York&to=Boston">
                Search Buses
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Loader2 } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BookingLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-2 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-1 h-5 w-48 animate-pulse rounded bg-gray-200"></div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg border bg-card"></div>
              ))}
            </div>
            
            <div className="h-fit lg:sticky lg:top-24">
              <div className="h-96 animate-pulse rounded-lg border bg-card"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

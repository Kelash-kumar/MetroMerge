import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyBookingsLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200"></div>
            <div className="mt-1 h-5 w-64 animate-pulse rounded-md bg-gray-200"></div>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-10 w-full max-w-md animate-pulse rounded-md bg-gray-200"></div>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-6 w-40 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                    </div>
                    <div className="mb-4 h-4 w-64 animate-pulse rounded bg-gray-200"></div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-9 w-24 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}


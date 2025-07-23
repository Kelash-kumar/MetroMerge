import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchResults } from "./search-results"
import { SearchFilters } from "./search-filters"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string }
}) {
  const from = searchParams.from || "New York"
  const to = searchParams.to || "Boston"
  const date = searchParams.date ? new Date(searchParams.date) : new Date()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
          <h1 className="text-2xl font-bold">
  Bus Tickets from <span className="text-teal-600">{from}</span> to 
  <span className="text-orange-500"> {to}</span>
</h1>

            <p className="text-muted-foreground">
              {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <SearchFilters />
            <SearchResults from={from} to={to} date={date} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


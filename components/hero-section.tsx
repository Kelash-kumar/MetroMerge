import { SearchForm } from "@/components/search-form";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4">
        <div className="h-full w-full rounded-full bg-yellow-300 opacity-80"></div>
      </div>
      <div className="absolute bottom-0 right-0 h-32 w-96">
        <svg
          viewBox="0 0 400 150"
          className="h-full w-full text-primary-foreground/10"
        >
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your One-Stop Bus Ticket Booking Platform
            Apka safar, apki marzi 
          </h1> */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Apka <span className="text-teal-600">safar</span>, apki{" "}
            <span className="text-orange-500">marzi</span>
          </h1>

          <p className="mb-10 text-md text-white/90">
            Pakistan’s smartest bus booking platform, fast, and hassle-free
            travel experience!
            {/* Compare prices, find the best deals, and book tickets from multiple bus operators in one place. */}
          </p>
          <SearchForm />
          <h1 className="mt-14 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            ! بس کا سفر, اب پہلے سے بھی آسان
          </h1>
        </div>
      </div>
    </section>
  );
}

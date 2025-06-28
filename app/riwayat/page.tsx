import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BookingHistory } from "@/components/history/booking-history"

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <BookingHistory />
      </main>
      <Footer />
    </div>
  )
}

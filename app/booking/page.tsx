import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BookingForm } from "@/components/booking/booking-form"

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("bookingConfirmation")
      if (data) {
        setBookingData(JSON.parse(data))
      } else {
        router.push("/")
      }
    }
  }, [router])

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <BookingConfirmation data={bookingData} />
      </main>
      <Footer />
    </div>
  )
}

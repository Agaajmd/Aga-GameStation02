import { Navbar } from "@/components/layout/navbar"
import { AdminBookingManagement } from "@/components/admin/admin-booking-management"

export default function AdminBookingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AdminBookingManagement />
      </main>
    </div>
  )
}

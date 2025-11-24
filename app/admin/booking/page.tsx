import { Navbar } from "@/components/layout/navbar"
import { AdminBookingManagement } from "@/components/admin/admin-booking-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminBookingPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <AdminBookingManagement />
        </main>
      </div>
    </ProtectedRoute>
  )
}

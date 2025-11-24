import { Navbar } from "@/components/layout/navbar"
import { PSAvailability } from "@/components/admin/ps-availability"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function KetersediaanPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <PSAvailability />
        </main>
      </div>
    </ProtectedRoute>
  )
}

import { Navbar } from "@/components/layout/navbar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <AdminDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}

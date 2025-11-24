import { Navbar } from "@/components/layout/navbar"
import { SuperAdminDashboard } from "@/components/super-admin/super-admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SuperAdminPage() {
  return (
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <SuperAdminDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}

import { Navbar } from "@/components/layout/navbar"
import { AdminManagement } from "@/components/super-admin/admin-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminManagementPage() {
  return (
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <AdminManagement />
        </main>
      </div>
    </ProtectedRoute>
  )
}

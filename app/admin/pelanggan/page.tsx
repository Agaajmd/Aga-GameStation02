import { Navbar } from "@/components/layout/navbar"
import { CustomerManagement } from "@/components/admin/customer-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function PelangganPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <CustomerManagement />
        </main>
      </div>
    </ProtectedRoute>
  )
}

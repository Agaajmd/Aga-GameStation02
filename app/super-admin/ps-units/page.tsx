import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PSUnitsManagement } from "@/components/super-admin/ps-units/branch-list"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function PSUnitsPage() {
  return (
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <PSUnitsManagement />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

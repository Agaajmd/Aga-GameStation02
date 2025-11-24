import { Navbar } from "@/components/layout/navbar"
import { BusinessReports } from "@/components/super-admin/business-reports"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function LaporanPage() {
  return (
    <ProtectedRoute allowedRoles={["super-admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <BusinessReports />
        </main>
      </div>
    </ProtectedRoute>
  )
}

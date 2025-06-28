import { Navbar } from "@/components/layout/navbar"
import { SuperAdminDashboard } from "@/components/super-admin/super-admin-dashboard"

export default function SuperAdminPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <SuperAdminDashboard />
      </main>
    </div>
  )
}

import { Navbar } from "@/components/layout/navbar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AdminDashboard />
      </main>
    </div>
  )
}

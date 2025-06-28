import { Navbar } from "@/components/layout/navbar"
import { AdminManagement } from "@/components/super-admin/admin-management"

export default function AdminManagementPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AdminManagement />
      </main>
    </div>
  )
}

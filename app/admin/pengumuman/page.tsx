import { Navbar } from "@/components/layout/navbar"
import { AnnouncementManagement } from "@/components/admin/announcement-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminAnnouncementPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <AnnouncementManagement />
        </main>
      </div>
    </ProtectedRoute>
  )
}

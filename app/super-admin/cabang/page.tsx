import { Navbar } from "@/components/layout/navbar"
import { BranchManagement } from "@/components/super-admin/branch-management"

export default function BranchManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <BranchManagement />
      </main>
    </div>
  )
}

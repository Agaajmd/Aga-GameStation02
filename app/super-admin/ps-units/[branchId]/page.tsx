import { Navbar } from "@/components/layout/navbar"
import { BranchUnitsManagement } from "@/components/super-admin/ps-units/unit-management"

export default function BranchUnitsPage({ params }: { params: { branchId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <BranchUnitsManagement branchId={params.branchId} />
      </main>
    </div>
  )
}

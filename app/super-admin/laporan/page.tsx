import { Navbar } from "@/components/layout/navbar"
import { BusinessReports } from "@/components/super-admin/business-reports"

export default function BusinessReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <BusinessReports />
      </main>
    </div>
  )
}

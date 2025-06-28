import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PSUnitsManagement } from "@/components/super-admin/ps-units-management"

export default function PSUnitsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <PSUnitsManagement />
      </main>
      <Footer />
    </div>
  )
}

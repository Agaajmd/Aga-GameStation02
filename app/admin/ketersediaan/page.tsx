import { Navbar } from "@/components/layout/navbar"
import { PSAvailability } from "@/components/admin/ps-availability"

export default function PSAvailabilityPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <PSAvailability />
      </main>
    </div>
  )
}

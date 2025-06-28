import { Navbar } from "@/components/layout/navbar"
import { CustomerManagement } from "@/components/admin/customer-management"

export default function CustomerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <CustomerManagement />
      </main>
    </div>
  )
}

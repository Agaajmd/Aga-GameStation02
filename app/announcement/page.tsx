import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AnnouncementList } from "@/components/announcement/announcement"

export default function PromoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AnnouncementList />
      </main>
      <Footer />
    </div>
  )
}

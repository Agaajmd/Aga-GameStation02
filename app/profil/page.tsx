import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <ProfileContent />
      </main>
      <Footer />
    </div>
  )
}

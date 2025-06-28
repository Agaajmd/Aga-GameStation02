import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PromoList } from "@/components/promo/promo-list"

export default function PromoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <PromoList />
      </main>
      <Footer />
    </div>
  )
}

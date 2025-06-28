import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}

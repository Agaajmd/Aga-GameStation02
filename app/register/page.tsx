import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

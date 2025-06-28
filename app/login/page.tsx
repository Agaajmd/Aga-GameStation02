import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

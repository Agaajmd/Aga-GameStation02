"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BookingHistory } from "@/components/history/booking-history"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn, History, Lock } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const { user, isLoading } = useAuth()
  const { showError } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      showError("Login diperlukan", "Silakan login terlebih dahulu untuk melihat riwayat booking")
    }
  }, [user, isLoading]) // Removed showError from dependency array to prevent infinite loop

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show login required message if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="max-w-md mx-auto">
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Login Diperlukan
                  </h1>
                  
                  <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                    Anda harus login terlebih dahulu untuk melihat riwayat booking Anda
                  </p>

                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Link href="/login">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login Sekarang
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-border hover:bg-muted"
                    >
                      <Link href="/">
                        Kembali ke Beranda
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <History className="w-4 h-4" />
                      <span className="text-sm">Riwayat booking Anda akan muncul di sini setelah login</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show booking history for authenticated users
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <BookingHistory />
      </main>
      <Footer />
    </div>
  )
}

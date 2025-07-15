"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/providers/auth-provider"
import { useBooking } from "@/components/providers/booking-provider"
import { useToast } from "@/components/providers/toast-provider"
import { CategorySelector } from "./category-selector"
import { BranchSelector } from "./branch-selector"
import { ConsoleSelector } from "./console-selector"
import { DateSelector } from "./date-selector"
import { TimeSlotSelector } from "./time-slot-selector"
import { DurationSelector } from "./duration-selector"
import { ShoppingCart, MapPin, Gamepad2, Calendar, Clock, Timer, AlertCircle, User, LogIn, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export function BookingForm() {
  const { user } = useAuth()
  const { addToCart } = useBooking()
  const { showSuccess, showError } = useToast()

  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"reguler" | "vip" | "vvip" | null>(null)
  const [selectedConsole, setSelectedConsole] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const categoryPrices = {
    reguler: 5000,
    vip: 8000,
    vvip: 12000,
  }

  const calculateTotal = () => {
    if (!selectedCategory || !selectedDuration) return 0
    return categoryPrices[selectedCategory] * selectedDuration
  }

  const handleAddToCart = async () => {
    if (!user) {
      showError("Login diperlukan", "Silakan login terlebih dahulu untuk melakukan booking")
      return
    }

    if (
      !selectedBranch ||
      !selectedCategory ||
      !selectedConsole ||
      !selectedDate ||
      !selectedTimeSlot ||
      !selectedDuration
    ) {
      showError("Form belum lengkap", "Mohon lengkapi semua pilihan booking")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const bookingItem = {
        id: Date.now().toString(),
        branch: selectedBranch,
        category: selectedCategory,
        option: selectedConsole,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        duration: selectedDuration,
        price: calculateTotal(),
      }

      addToCart(bookingItem)
      
      setIsLoading(false)
      setShowSuccessModal(true)

      // Reset form
      setSelectedBranch(null)
      setSelectedCategory(null)
      setSelectedConsole(null)
      setSelectedDate(null)
      setSelectedTimeSlot(null)
      setSelectedDuration(null)

      // Hide success modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 2000)

    } catch (error) {
      setIsLoading(false)
      showError("Gagal menambahkan ke keranjang", "Silakan coba lagi")
    }
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white animate-pulse">Menambahkan ke keranjang...</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mohon tunggu sebentar</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-bold text-gray-900 dark:text-white">Berhasil Ditambahkan!</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Item booking telah ditambahkan ke keranjang</p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                <ShoppingCart className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Siap untuk checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Alert - Show if user is not logged in */}
      {!user && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-800/50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Login Diperlukan
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 max-w-md">
                  Silakan masuk ke akun Anda untuk melanjutkan proses booking gaming dan mendapatkan akses ke semua fitur
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button 
                  asChild 
                  variant="outline" 
                  className="flex-1 border-amber-300 text-amber-800 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-200 dark:hover:bg-amber-800/50"
                >
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Masuk ke Akun
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white border-0"
                >
                  <Link href="/register">
                    <User className="w-4 h-4 mr-2" />
                    Buat Akun Baru
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Info - Show if user is logged in */}
      {user && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Selamat datang, {user.name}! 👋
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {user.email}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center justify-center sm:justify-start space-x-2">
                  <span>Siap untuk gaming?</span>
                  <span className="text-lg">🎮</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Branch Selection */}
      <Card className="animate-slide-up border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Pilih Cabang</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BranchSelector selected={selectedBranch} onSelect={setSelectedBranch} />
        </CardContent>
      </Card>

      {/* Step 2: Category Selection */}
      {selectedBranch && (
        <Card className="animate-slide-up border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <span>Pilih Kategori PlayStation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
          </CardContent>
        </Card>
      )}

      {/* Step 3: Console Selection */}
      {selectedCategory && (
        <Card className="animate-slide-up border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <span>Pilih Room/Console</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConsoleSelector category={selectedCategory} selected={selectedConsole} onSelect={setSelectedConsole} />
          </CardContent>
        </Card>
      )}

      {/* Step 4: Date Selection */}
      {selectedConsole && (
        <Card className="animate-slide-up border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Pilih Tanggal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DateSelector selected={selectedDate || ""} onSelect={setSelectedDate} />
          </CardContent>
        </Card>
      )}

      {/* Step 5: Time Selection */}
      {selectedDate && (
        <Card className="animate-slide-up border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span>Pilih Jam</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSlotSelector selected={selectedTimeSlot} onSelect={setSelectedTimeSlot} />
          </CardContent>
        </Card>
      )}

      {/* Step 6: Duration Selection */}
      {selectedTimeSlot && (
        <Card className="animate-slide-up border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Timer className="w-5 h-5 text-primary" />
              <span>Berapa Lama Bermain?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DurationSelector selected={selectedDuration} onSelect={setSelectedDuration} />
          </CardContent>
        </Card>
      )}

      {/* Summary and Add to Cart */}
      {selectedDuration && (
        <Card className="animate-scale-in bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Ringkasan Booking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cabang:</span>
                <span className="font-medium text-foreground">{selectedBranch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kategori:</span>
                <span className="font-medium text-foreground capitalize">{selectedCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room/Console:</span>
                <span className="font-medium text-foreground">{selectedConsole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal:</span>
                <span className="font-medium text-foreground">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jam:</span>
                <span className="font-medium text-foreground">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durasi:</span>
                <span className="font-medium text-foreground">{selectedDuration} jam</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">Rp {calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Login Required Alert in Summary */}
            {!user && (
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                        Login Diperlukan
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 max-w-md">
                        Anda harus login untuk melanjutkan booking. Login sekarang untuk menyelesaikan booking Anda dan mendapatkan akses ke semua fitur
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button 
                        asChild 
                        variant="outline" 
                        className="flex-1 border-red-300 text-red-800 hover:bg-red-100 dark:border-red-600 dark:text-red-200 dark:hover:bg-red-800/50"
                      >
                        <Link href="/login">
                          <LogIn className="w-4 h-4 mr-2" />
                          Login Sekarang
                        </Link>
                      </Button>
                      <Button 
                        asChild 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                      >
                        <Link href="/register">
                          <User className="w-4 h-4 mr-2" />
                          Daftar Akun
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!user || isLoading}
              className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                !user 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400" 
                  : isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Menambahkan...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {!user ? "Login untuk Booking" : "Tambah ke Keranjang"}
                </>
              )}
            </Button>

            {!user && (
              <div className="text-center py-3">
                <div className="inline-flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-200 dark:border-blue-800">
                  <span>💡</span>
                  <span className="font-medium">Tip: Login untuk menyimpan booking dan mendapatkan promo khusus!</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

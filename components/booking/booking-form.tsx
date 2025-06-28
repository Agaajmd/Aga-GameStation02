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
import { ShoppingCart, MapPin, Gamepad2, Calendar, Clock, Timer, AlertCircle, User, LogIn } from "lucide-react"
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

  const categoryPrices = {
    reguler: 5000,
    vip: 8000,
    vvip: 12000,
  }

  const calculateTotal = () => {
    if (!selectedCategory || !selectedDuration) return 0
    return categoryPrices[selectedCategory] * selectedDuration
  }

  const handleAddToCart = () => {
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
    showSuccess("Berhasil ditambahkan!", "Item booking telah ditambahkan ke keranjang")

    // Reset form
    setSelectedBranch(null)
    setSelectedCategory(null)
    setSelectedConsole(null)
    setSelectedDate(null)
    setSelectedTimeSlot(null)
    setSelectedDuration(null)
  }

  return (
    <div className="space-y-6">
      {/* Login Alert - Show if user is not logged in */}
      {!user && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <AlertDescription className="text-amber-800 dark:text-amber-200 ml-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base">Login diperlukan untuk melakukan booking</p>
                  <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Silakan masuk ke akun Anda untuk melanjutkan proses booking gaming
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:ml-8">
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="border-amber-300 text-amber-800 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-200 dark:hover:bg-amber-800/50 h-9"
                >
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Masuk ke Akun
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-amber-600 hover:bg-amber-700 text-white border-0 h-9"
                >
                  <Link href="/register">
                    <User className="w-4 h-4 mr-2" />
                    Buat Akun Baru
                  </Link>
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* User Info - Show if user is logged in */}
      {user && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <User className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          <AlertDescription className="text-green-800 dark:text-green-200 ml-6">
            <div className="space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <p className="font-semibold text-sm sm:text-base">
                    Selamat datang, {user.name}! 👋
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <span className="text-xs sm:text-sm font-medium">Siap untuk gaming?</span>
                  <span className="text-lg">🎮</span>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
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
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <AlertDescription className="text-red-800 dark:text-red-200 ml-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm sm:text-base">Anda harus login untuk melanjutkan booking</p>
                        <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 mt-1">
                          Login sekarang untuk menyelesaikan booking Anda dan mendapatkan akses ke semua fitur
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:ml-8">
                      <Button 
                        asChild 
                        size="sm" 
                        variant="outline" 
                        className="border-red-300 text-red-800 hover:bg-red-100 dark:border-red-600 dark:text-red-200 dark:hover:bg-red-800/50 h-9"
                      >
                        <Link href="/login">
                          <LogIn className="w-4 h-4 mr-2" />
                          Login Sekarang
                        </Link>
                      </Button>
                      <Button 
                        asChild 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-white border-0 h-9"
                      >
                        <Link href="/register">
                          <User className="w-4 h-4 mr-2" />
                          Daftar Akun
                        </Link>
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!user}
              className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                !user 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400" 
                  : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {!user ? "Login untuk Booking" : "Tambah ke Keranjang"}
            </Button>

            {!user && (
              <div className="text-center py-2">
                <p className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
                  <span>💡</span>
                  <span>Tip: Login untuk menyimpan booking dan mendapatkan promo khusus!</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

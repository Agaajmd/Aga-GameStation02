"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { useBooking } from "@/components/providers/booking-provider"
import { useToast } from "@/components/providers/toast-provider"
import { CategorySelector } from "./category-selector"
import { BranchSelector } from "./branch-selector"
import { ConsoleSelector } from "./console-selector"
import { DateSelector } from "./date-selector"
import { TimeSlotSelector } from "./time-slot-selector"
import { DurationSelector } from "./duration-selector"
import { ShoppingCart, MapPin, Gamepad2, Calendar, Clock, Timer } from "lucide-react"

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
            <DateSelector selected={selectedDate} onSelect={setSelectedDate} />
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
            <CardTitle className="text-primary">Ringkasan Booking</CardTitle>
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

            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Tambah ke Keranjang
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

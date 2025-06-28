"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/providers/auth-provider"
import { useBooking } from "@/components/providers/booking-provider"
import { useToast } from "@/components/providers/toast-provider"
import { PaymentMethodSelector } from "./payment-method-selector"
import { ShoppingCart, CreditCard, User, MapPin, Calendar, Clock } from "lucide-react"

export function CheckoutForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { cart, clearCart, getTotalPrice } = useBooking()
  const { showSuccess, showError } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotalPrice()
  const adminFee = 2500
  const discount = 0
  const total = subtotal + adminFee - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentMethod) {
      showError("Pilih metode pembayaran", "Silakan pilih metode pembayaran terlebih dahulu")
      return
    }

    if (cart.length === 0) {
      showError("Keranjang kosong", "Tidak ada item dalam keranjang")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate booking data
      const bookingData = {
        bookingId: `AGS${Date.now()}`,
        items: cart,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        paymentMethod,
        subtotal,
        discount,
        adminFee,
        total,
        paymentCode: paymentMethod === "cash" ? `PAY${Math.random().toString(36).substr(2, 8).toUpperCase()}` : null,
        createdAt: new Date().toISOString(),
        status: paymentMethod === "cash" ? "pending" : "confirmed",
        // For display purposes, use first item details
        branch: cart[0]?.branch || "",
        category: cart[0]?.category || "",
        option: cart[0]?.option || "",
        date: cart[0]?.date || "",
        timeSlot: cart[0]?.timeSlot || "",
        duration: cart[0]?.duration || 0,
      }

      // Store booking data for confirmation page
      if (typeof window !== 'undefined') {
        localStorage.setItem("bookingConfirmation", JSON.stringify(bookingData))
      }

      // Clear cart
      clearCart()

      // Show success message
      showSuccess("Pembayaran berhasil!", "Anda akan dialihkan ke halaman konfirmasi")

      // Redirect to confirmation page
      setTimeout(() => {
        router.push("/booking-confirmation")
      }, 1000)
    } catch (error) {
      showError("Pembayaran gagal", "Terjadi kesalahan saat memproses pembayaran")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!user) {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Login Diperlukan</h2>
          <p className="text-muted-foreground">Silakan login terlebih dahulu untuk melakukan checkout</p>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground">Tidak ada item dalam keranjang untuk di-checkout</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Lengkapi informasi dan pilih metode pembayaran</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <User className="w-5 h-5 text-primary" />
                    <span>Informasi Customer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-card-foreground">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    <span>Ringkasan Pesanan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground capitalize">{item.category}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.branch}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {item.timeSlot} ({item.duration}h)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Biaya Admin</span>
                      <span className="text-foreground">Rp {adminFee.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Diskon</span>
                        <span className="text-green-600">-Rp {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">Rp {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Memproses..." : "Bayar Sekarang"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

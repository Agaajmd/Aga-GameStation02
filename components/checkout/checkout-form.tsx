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
import { ShoppingCart, CreditCard, User, MapPin, Calendar, Clock, CheckCircle, Loader2, ArrowRight } from "lucide-react"

export function CheckoutForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { cart, clearCart, getTotalPrice } = useBooking()
  const { showSuccess, showError } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("")
  const [transferProof, setTransferProof] = useState<File | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")

  const subtotal = getTotalPrice()
  const adminFee = 2500
  const discount = 0
  const total = subtotal + adminFee - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation checks first
    if (cart.length === 0) {
      showError("Keranjang kosong", "Tidak ada item dalam keranjang")
      return
    }

    if (!paymentMethod) {
      showError("Pilih metode pembayaran", "Silakan pilih metode pembayaran terlebih dahulu")
      return
    }

    // Check if transfer proof is required for non-cash payments
    const requiresTransferProof = ["ewallet-dana", "ewallet-gopay", "ewallet-ovo", "bank-bca", "bank-mandiri", "bank-bri", "qris"].includes(paymentMethod)
    
    if (requiresTransferProof && !transferProof) {
      showError("Upload bukti pembayaran", "Silakan upload bukti pembayaran untuk metode pembayaran yang dipilih")
      return
    }

    // Start processing
    setIsProcessing(true)
    setShowLoadingModal(true)
    setLoadingMessage("Memvalidasi pembayaran...")

    try {
      // Phase 1: Validation
      await new Promise((resolve) => setTimeout(resolve, 800))
      setLoadingMessage("Memproses pembayaran...")
      
      // Phase 2: Payment processing
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setLoadingMessage("Menyimpan data booking...")
      
      // Phase 3: Data saving
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Generate booking data
      const bookingData = {
        bookingId: `AGS${Date.now()}`,
        items: cart,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        paymentMethod,
        transferProof: transferProof?.name || null,
        transferProofUploaded: !!transferProof,
        subtotal,
        discount,
        adminFee,
        total,
        paymentCode: paymentMethod === "cash-counter" ? `PAY${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}` : null,
        createdAt: new Date().toISOString(),
        status: paymentMethod === "cash-counter" ? "pending" : "confirmed",
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

      setShowLoadingModal(false)
      setShowSuccessModal(true)

      // Clear cart after successful payment
      setTimeout(() => {
        clearCart()
        setShowSuccessModal(false)
        router.push("/booking-confirmation")
      }, 2000)

    } catch (error) {
      setShowLoadingModal(false)
      setIsProcessing(false)
      showError("Pembayaran gagal", "Terjadi kesalahan saat memproses pembayaran")
    }
  }

  if (!user) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <User className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Diperlukan</h2>
          <p className="text-gray-600 dark:text-gray-400">Silakan login terlebih dahulu untuk melakukan checkout</p>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keranjang Kosong</h2>
          <p className="text-gray-600 dark:text-gray-400">Tidak ada item dalam keranjang untuk di-checkout</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 min-h-screen transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading Modal */}
        {showLoadingModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300 max-w-md w-full mx-4">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Memproses Pembayaran</p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">{loadingMessage}</p>
                  <div className="flex items-center justify-center space-x-1 mt-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300 max-w-md w-full mx-4">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center space-y-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Pembayaran Berhasil!</p>
                  <p className="text-gray-600 dark:text-gray-300">Terima kasih atas pembayaran Anda</p>
                  <div className="flex items-center justify-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800 mt-4">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Mengarahkan ke halaman konfirmasi</span>
                    <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Lengkapi informasi dan pilih metode pembayaran</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Informasi Customer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-green-900 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <PaymentMethodSelector 
                    selected={paymentMethod} 
                    onSelect={setPaymentMethod}
                    transferProof={transferProof}
                    onTransferProofSelect={setTransferProof}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                    <ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Ringkasan Pesanan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {cart.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white capitalize">{item.category}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
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
                          <p className="font-medium text-gray-900 dark:text-white">Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <Separator className="bg-gray-200 dark:bg-gray-700" />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Biaya Admin</span>
                      <span className="text-gray-900 dark:text-white">Rp {adminFee.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Diskon</span>
                        <span className="text-green-600">-Rp {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-purple-600 dark:text-purple-400">Rp {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Bayar Sekarang
                      </>
                    )}
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

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Calendar, User, CreditCard, Copy, Download, Home, History } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/providers/toast-provider"

interface BookingConfirmationProps {
  data: any
}

export function BookingConfirmation({ data }: BookingConfirmationProps) {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds
  const { showSuccess } = useToast()

  useEffect(() => {
    if (data.paymentMethod === "cash-counter") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [data.paymentMethod])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyPaymentCode = () => {
    navigator.clipboard.writeText(data.paymentCode)
    showSuccess("Kode pembayaran disalin!", "Kode telah disalin ke clipboard")
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Berhasil!</h1>
          <p className="text-muted-foreground">
            Terima kasih telah melakukan booking. Berikut adalah detail pesanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Detail Booking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kode Booking</p>
                    <p className="font-mono font-bold text-foreground">{data.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {data.paymentMethod === "cash" ? "Menunggu Pembayaran" : "Dikonfirmasi"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cabang</p>
                    <p className="font-medium text-foreground">{data.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kategori</p>
                    <p className="font-medium text-foreground capitalize">{data.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room/Console</p>
                    <p className="font-medium text-foreground">{data.option}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Durasi</p>
                    <p className="font-medium text-foreground">{data.duration} jam</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal</p>
                    <p className="font-medium text-foreground">{data.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Waktu</p>
                    <p className="font-medium text-foreground">{data.timeSlot}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
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
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium text-foreground">{data.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{data.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium text-foreground">{data.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal Booking</p>
                    <p className="font-medium text-foreground">
                      {new Date(data.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Info */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Ringkasan Pembayaran</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">Rp {data.subtotal.toLocaleString()}</span>
                  </div>
                  {data.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diskon</span>
                      <span className="text-green-600">-Rp {data.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biaya Admin</span>
                    <span className="text-foreground">Rp {data.adminFee.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">Rp {data.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                  <p className="font-medium text-foreground capitalize">{data.paymentMethod}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Code for Cash */}
            {data.paymentMethod === "cash-counter" && (
              <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
                    <Clock className="w-5 h-5" />
                    <span>Kode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">Tunjukkan kode ini ke kasir</p>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-orange-300 dark:border-orange-700">
                      <p className="text-2xl font-mono font-bold text-orange-800 dark:text-orange-200">
                        {data.paymentCode}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyPaymentCode}
                      className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900 bg-transparent"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Salin Kode
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">Batas waktu pembayaran</p>
                    <div className="text-2xl font-mono font-bold text-orange-800 dark:text-orange-200">
                      {formatTime(timeLeft)}
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Booking akan dibatalkan otomatis jika tidak dibayar
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/riwayat">
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    <History className="w-4 h-4 mr-2" />
                    Riwayat
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Beranda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">Informasi Penting:</h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Harap datang 15 menit sebelum waktu booking untuk check-in</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Bawa kartu identitas dan tunjukkan kode booking/pembayaran</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Keterlambatan lebih dari 30 menit akan mengakibatkan pembatalan otomatis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Hubungi cabang jika ada perubahan atau pembatalan</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

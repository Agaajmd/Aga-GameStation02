"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/providers/toast-provider"
import { QrCode, Camera, CameraOff, CheckCircle, Clock, User, MapPin } from "lucide-react"

interface BookingData {
  id: string
  customer: string
  category: string
  room: string
  date: string
  time: string
  status: "confirmed" | "checked-in" | "checked-out"
  paymentStatus: "confirmed"
}

const mockBookingData: { [key: string]: BookingData } = {
  BK025: {
    id: "BK025",
    customer: "Ahmad Rizki",
    category: "VIP",
    room: "VIP Room 2",
    date: "2024-01-20",
    time: "14:00-17:00",
    status: "confirmed",
    paymentStatus: "confirmed",
  },
  BK026: {
    id: "BK026",
    customer: "Sari Dewi",
    category: "VVIP",
    room: "VVIP Suite 1",
    date: "2024-01-20",
    time: "16:00-20:00",
    status: "checked-in",
    paymentStatus: "confirmed",
  },
}

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState("")
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { showSuccess, showError } = useToast()

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (error) {
      showError("Kamera tidak dapat diakses", "Pastikan izin kamera telah diberikan")
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const handleManualInput = () => {
    if (scannedCode.trim()) {
      processBookingCode(scannedCode.trim())
    }
  }

  const processBookingCode = (code: string) => {
    const booking = mockBookingData[code]
    if (booking) {
      setBookingData(booking)
      setScanResult("success")
      showSuccess("Booking ditemukan!", `Data booking ${code} berhasil dimuat`)
    } else {
      setScanResult("error")
      setBookingData(null)
      showError("Booking tidak ditemukan", "Kode booking tidak valid atau sudah kedaluwarsa")
    }
  }

  const handleCheckIn = () => {
    if (bookingData) {
      setBookingData({ ...bookingData, status: "checked-in" })
      showSuccess("Check-in berhasil!", `${bookingData.customer} telah check-in`)
      resetScanner()
    }
  }

  const handleCheckOut = () => {
    if (bookingData) {
      setBookingData({ ...bookingData, status: "checked-out" })
      showSuccess("Check-out berhasil!", `${bookingData.customer} telah check-out`)
      resetScanner()
    }
  }

  const resetScanner = () => {
    setScannedCode("")
    setBookingData(null)
    setScanResult(null)
    stopScanning()
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Scanner Card */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>QR Code Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Camera View */}
          <div className="relative">
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {isScanning ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Kamera tidak aktif</p>
                </div>
              )}
            </div>

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary rounded-lg">
                  <div className="w-full h-full border border-primary/30 rounded-lg animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex space-x-2">
            {!isScanning ? (
              <Button onClick={startScanning} className="flex-1 gradient-primary text-white">
                <Camera className="w-4 h-4 mr-2" />
                Mulai Scan
              </Button>
            ) : (
              <Button onClick={stopScanning} variant="outline" className="flex-1">
                <CameraOff className="w-4 h-4 mr-2" />
                Stop Scan
              </Button>
            )}
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Atau masukkan kode booking manual:</p>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Masukkan kode booking (contoh: BK025)"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
              <Button onClick={handleManualInput} variant="outline">
                Cari
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Information */}
      {bookingData && (
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informasi Booking</CardTitle>
              <Badge
                className={
                  bookingData.status === "confirmed"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : bookingData.status === "checked-in"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {bookingData.status === "confirmed"
                  ? "Dikonfirmasi"
                  : bookingData.status === "checked-in"
                    ? "Sedang Bermain"
                    : "Selesai"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Pelanggan:</span>
                  <span className="font-medium text-foreground">{bookingData.customer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">ID Booking:</span>
                  <span className="font-medium text-foreground">#{bookingData.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Ruangan:</span>
                  <span className="font-medium text-foreground">{bookingData.room}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tanggal:</span>
                  <span className="font-medium text-foreground">{bookingData.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Waktu:</span>
                  <span className="font-medium text-foreground">{bookingData.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Pembayaran:</span>
                  <span className="font-medium text-green-600">Lunas</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              {bookingData.status === "confirmed" && (
                <Button onClick={handleCheckIn} className="flex-1 gradient-primary text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check-in
                </Button>
              )}
              {bookingData.status === "checked-in" && (
                <Button onClick={handleCheckOut} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                  <Clock className="w-4 h-4 mr-2" />
                  Check-out
                </Button>
              )}
              <Button onClick={resetScanner} variant="outline" className="flex-1">
                Scan Lagi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {scanResult === "error" && (
        <Card className="animate-scale-in border-red-200 dark:border-red-800">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Booking Tidak Ditemukan</h3>
            <p className="text-muted-foreground mb-4">Kode booking tidak valid atau sudah kedaluwarsa</p>
            <Button onClick={resetScanner} variant="outline">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

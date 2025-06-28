"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Calendar, Clock, Star, MapPin, Receipt, Download, Eye, RotateCcw } from "lucide-react"

export function BookingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const bookings = [
    {
      id: "BK001",
      date: "2024-01-15",
      time: "14:00 - 17:00",
      duration: 3,
      console: "PlayStation 5",
      branch: "AGA Gaming Center Sudirman",
      status: "completed",
      totalPrice: "Rp 45.000",
      paymentMethod: "QRIS",
      paymentCode: "QR123456789",
      rating: 5,
      review: "Pengalaman gaming yang luar biasa! Konsol berjalan lancar dan staff sangat membantu.",
      games: ["FIFA 24", "Call of Duty", "Spider-Man 2"],
      promoUsed: "Flash Sale PS5 - 50%",
      originalPrice: "Rp 90.000",
    },
    {
      id: "BK002",
      date: "2024-01-10",
      time: "19:00 - 22:00",
      duration: 3,
      console: "PlayStation 4 Pro",
      branch: "AGA Gaming Center Kemang",
      status: "completed",
      totalPrice: "Rp 30.000",
      paymentMethod: "Cash",
      paymentCode: "CASH001",
      rating: 4,
      review: "Gaming seru, tapi AC kurang dingin. Overall masih recommended!",
      games: ["GTA V", "The Last of Us", "God of War"],
      promoUsed: null,
      originalPrice: "Rp 30.000",
    },
    {
      id: "BK003",
      date: "2024-01-08",
      time: "16:00 - 20:00",
      duration: 4,
      console: "PlayStation VR",
      branch: "AGA Gaming Center Sudirman",
      status: "completed",
      totalPrice: "Rp 80.000",
      paymentMethod: "Transfer Bank",
      paymentCode: "TF789012345",
      rating: 5,
      review: "VR experience yang menakjubkan! Benar-benar immersive dan worth it.",
      games: ["Beat Saber", "Astro Bot", "Resident Evil 7 VR"],
      promoUsed: "VR Weekend Special - 20%",
      originalPrice: "Rp 100.000",
    },
    {
      id: "BK004",
      date: "2024-01-05",
      time: "13:00 - 15:00",
      duration: 2,
      console: "PlayStation 5",
      branch: "AGA Gaming Center Kemang",
      status: "cancelled",
      totalPrice: "Rp 0",
      paymentMethod: "-",
      paymentCode: "-",
      rating: null,
      review: null,
      games: [],
      promoUsed: null,
      originalPrice: "Rp 40.000",
      cancelReason: "Dibatalkan karena ada keperluan mendadak",
    },
    {
      id: "BK005",
      date: "2024-01-20",
      time: "10:00 - 13:00",
      duration: 3,
      console: "PlayStation 5",
      branch: "AGA Gaming Center Sudirman",
      status: "upcoming",
      totalPrice: "Rp 37.500",
      paymentMethod: "QRIS",
      paymentCode: "QR987654321",
      rating: null,
      review: null,
      games: ["Horizon Forbidden West", "Ratchet & Clank"],
      promoUsed: "Student Discount - 25%",
      originalPrice: "Rp 50.000",
    },
  ]

  const stats = [
    {
      title: "Total Booking",
      value: bookings.length.toString(),
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Jam Gaming",
      value: bookings.reduce((total, booking) => total + booking.duration, 0).toString() + "h",
      icon: Clock,
      color: "text-green-500",
    },
    {
      title: "Total Pengeluaran",
      value:
        "Rp " +
        bookings
          .filter((b) => b.status === "completed")
          .reduce((total, booking) => total + Number.parseInt(booking.totalPrice.replace(/\D/g, "")), 0)
          .toLocaleString(),
      icon: Receipt,
      color: "text-purple-500",
    },
    {
      title: "Rating Rata-rata",
      value: (
        bookings.filter((b) => b.rating).reduce((total, booking) => total + (booking.rating || 0), 0) /
          bookings.filter((b) => b.rating).length || 0
      ).toFixed(1),
      icon: Star,
      color: "text-yellow-500",
    },
  ]

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "completed", label: "Selesai" },
    { value: "upcoming", label: "Akan Datang" },
    { value: "cancelled", label: "Dibatalkan" },
  ]

  const dateOptions = [
    { value: "all", label: "Semua Waktu" },
    { value: "today", label: "Hari Ini" },
    { value: "week", label: "Minggu Ini" },
    { value: "month", label: "Bulan Ini" },
    { value: "year", label: "Tahun Ini" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">Selesai</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500 text-white">Akan Datang</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Dibatalkan</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.console.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.branch.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRebook = (booking: any) => {
    // Handle rebook logic
    console.log("Rebooking:", booking.id)
  }

  const handleDownloadReceipt = (booking: any) => {
    // Handle download receipt logic
    console.log("Downloading receipt for:", booking.id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Riwayat Booking
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Lihat semua riwayat booking gaming Anda dan kelola pengalaman gaming masa depan
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari booking ID, konsol, atau cabang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-48 h-12">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Menampilkan {filteredBookings.length} dari {bookings.length} booking
          </p>
        </div>

        {/* Booking List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{booking.console}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">Booking ID: {booking.id}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(booking.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          {booking.time} ({booking.duration} jam)
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          {booking.branch}
                        </div>
                      </div>

                      {booking.games.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Game yang dimainkan:</p>
                          <div className="flex flex-wrap gap-1">
                            {booking.games.map((game, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {game}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price Info */}
                    <div className="text-center lg:text-left">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{booking.totalPrice}</div>
                        {booking.promoUsed && (
                          <>
                            <div className="text-sm text-gray-500 line-through">{booking.originalPrice}</div>
                            <Badge className="bg-green-500 text-white text-xs mt-1">{booking.promoUsed}</Badge>
                          </>
                        )}
                      </div>

                      {booking.paymentMethod !== "-" && (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>Pembayaran: {booking.paymentMethod}</p>
                          <p className="font-mono text-xs">{booking.paymentCode}</p>
                        </div>
                      )}

                      {booking.rating && (
                        <div className="flex items-center justify-center lg:justify-start mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">({booking.rating}/5)</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Detail Booking {selectedBooking?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedBooking && (
                            <div className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Informasi Booking</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Konsol:</strong> {selectedBooking.console}
                                    </p>
                                    <p>
                                      <strong>Tanggal:</strong>{" "}
                                      {new Date(selectedBooking.date).toLocaleDateString("id-ID")}
                                    </p>
                                    <p>
                                      <strong>Waktu:</strong> {selectedBooking.time}
                                    </p>
                                    <p>
                                      <strong>Durasi:</strong> {selectedBooking.duration} jam
                                    </p>
                                    <p>
                                      <strong>Cabang:</strong> {selectedBooking.branch}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Informasi Pembayaran</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Total:</strong> {selectedBooking.totalPrice}
                                    </p>
                                    <p>
                                      <strong>Metode:</strong> {selectedBooking.paymentMethod}
                                    </p>
                                    <p>
                                      <strong>Kode:</strong> {selectedBooking.paymentCode}
                                    </p>
                                    {selectedBooking.promoUsed && (
                                      <p>
                                        <strong>Promo:</strong> {selectedBooking.promoUsed}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {selectedBooking.games.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">Game yang Dimainkan</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedBooking.games.map((game: string, idx: number) => (
                                      <Badge key={idx} variant="outline">
                                        {game}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {selectedBooking.review && (
                                <div>
                                  <h4 className="font-semibold mb-2">Review & Rating</h4>
                                  <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < selectedBooking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="ml-2 font-medium">{selectedBooking.rating}/5</span>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">{selectedBooking.review}</p>
                                </div>
                              )}

                              {selectedBooking.cancelReason && (
                                <div>
                                  <h4 className="font-semibold mb-2">Alasan Pembatalan</h4>
                                  <p className="text-red-600 dark:text-red-400">{selectedBooking.cancelReason}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {booking.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleRebook(booking)}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Booking Lagi
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadReceipt(booking)}>
                            <Download className="w-4 h-4 mr-2" />
                            Unduh Struk
                          </Button>
                        </>
                      )}

                      {booking.status === "upcoming" && (
                        <Button variant="destructive" size="sm">
                          Batalkan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada booking ditemukan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah filter pencarian atau mulai booking gaming pertama Anda
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setDateFilter("all")
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

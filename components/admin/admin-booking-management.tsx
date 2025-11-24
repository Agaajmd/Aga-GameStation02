"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  MapPin,
  CreditCard,
  Printer,
} from "lucide-react"

const mockBookings = [
  {
    id: "BK025",
    customer: "Ahmad Rizki",
    email: "ahmad@email.com",
    phone: "081234567890",
    category: "VIP",
    room: "VIP Room 2",
    date: "2024-01-20",
    time: "14:00-17:00",
    duration: 3,
    total: 24000,
    status: "active",
    payment: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentProof: "/placeholder.svg?height=200&width=300",
    checkedIn: true,
    checkedOut: false,
  },
  {
    id: "BK026",
    customer: "Sari Dewi",
    email: "sari@email.com",
    phone: "081234567891",
    category: "VVIP",
    room: "VVIP Suite 1",
    date: "2024-01-20",
    time: "16:00-20:00",
    duration: 4,
    total: 48000,
    status: "confirmed",
    payment: "pending",
    paymentMethod: "Cashier Code",
    paymentCode: "AGG2024001",
    checkedIn: false,
    checkedOut: false,
  },
  {
    id: "BK027",
    customer: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567892",
    category: "Reguler",
    console: "PS5",
    date: "2024-01-20",
    time: "19:00-22:00",
    duration: 3,
    total: 15000,
    status: "confirmed",
    payment: "confirmed",
    paymentMethod: "E-Wallet",
    paymentProof: "/placeholder.svg?height=200&width=300",
    checkedIn: false,
    checkedOut: false,
  },
]

export function AdminBookingManagement() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [bookings, setBookings] = useState(mockBookings)
  const [showInvoice, setShowInvoice] = useState<any>(null)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handlePaymentAction = (bookingId: string, action: "confirm" | "reject") => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, payment: action === "confirm" ? "confirmed" : "rejected" } : booking,
      ),
    )

    if (action === "confirm") {
      showSuccess("Pembayaran dikonfirmasi", "Pembayaran telah berhasil dikonfirmasi")
    } else {
      showError("Pembayaran ditolak", "Pembayaran telah ditolak")
    }
  }

  const handlePrintInvoice = (booking: any) => {
    setShowInvoice(booking)
  }

  const printInvoice = () => {
    window.print()
    setShowInvoice(null)
    showSuccess("Invoice dicetak", "Invoice thermal telah dicetak")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  if (!user || user.role !== "admin") {
    return <div className="text-center py-20 text-contrast">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-contrast mb-2">Manajemen Booking</h1>
          <p className="text-muted-contrast">
            Kelola semua booking dan konfirmasi pembayaran - {user.branch || "Jakarta Pusat"}
          </p>
          <p className="text-sm text-muted-contrast">Admin: {user.name}</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan ID booking atau nama pelanggan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                  <SelectItem value="active">Sedang Bermain</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Booking List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <Card
              key={booking.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-bold text-contrast">#{booking.id}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === "active"
                          ? "Sedang Bermain"
                          : booking.status === "confirmed"
                            ? "Dikonfirmasi"
                            : booking.status === "completed"
                              ? "Selesai"
                              : "Dibatalkan"}
                      </Badge>
                      <Badge className={getPaymentColor(booking.payment)}>
                        {booking.payment === "confirmed"
                          ? "Lunas"
                          : booking.payment === "pending"
                            ? "Pending"
                            : "Ditolak"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {booking.category}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-contrast">{booking.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-contrast">{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-contrast">{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-contrast">{booking.room || booking.console}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4">
                      <span className="text-lg font-bold text-primary">Rp {booking.total.toLocaleString()}</span>
                      <span className="text-sm text-muted-contrast">({booking.duration} jam)</span>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-contrast">{booking.paymentMethod}</span>
                        {booking.paymentCode && (
                          <Badge variant="outline" className="text-xs">
                            Code: {booking.paymentCode}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>

                    {booking.payment === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => handlePaymentAction(booking.id, "confirm")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Konfirmasi
                        </Button>
                        <Button
                          size="sm"
                          className="btn-danger"
                          onClick={() => handlePaymentAction(booking.id, "reject")}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Tolak
                        </Button>
                      </>
                    )}

                    {booking.payment === "confirmed" && (
                      <Button size="sm" className="btn-primary" onClick={() => handlePrintInvoice(booking)}>
                        <Printer className="w-4 h-4 mr-1" />
                        Print Invoice
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-contrast">Detail Booking #{selectedBooking.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h4 className="font-semibold mb-3 text-contrast">Informasi Pelanggan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-contrast">Nama:</span>
                      <p className="font-medium text-contrast">{selectedBooking.customer}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Email:</span>
                      <p className="font-medium text-contrast">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Telepon:</span>
                      <p className="font-medium text-contrast">{selectedBooking.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div>
                  <h4 className="font-semibold mb-3 text-contrast">Detail Booking</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-contrast">Kategori:</span>
                      <p className="font-medium text-contrast capitalize">{selectedBooking.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Lokasi:</span>
                      <p className="font-medium text-contrast">{selectedBooking.room || selectedBooking.console}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Tanggal:</span>
                      <p className="font-medium text-contrast">{selectedBooking.date}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Waktu:</span>
                      <p className="font-medium text-contrast">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Durasi:</span>
                      <p className="font-medium text-contrast">{selectedBooking.duration} jam</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Total:</span>
                      <p className="font-medium text-primary">Rp {selectedBooking.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-contrast">Metode Pembayaran:</span>
                      <p className="font-medium text-contrast">{selectedBooking.paymentMethod}</p>
                    </div>
                    {selectedBooking.paymentCode && (
                      <div>
                        <span className="text-muted-contrast">Kode Pembayaran:</span>
                        <p className="font-medium text-contrast">{selectedBooking.paymentCode}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Proof */}
                {selectedBooking.paymentProof && (
                  <div>
                    <h4 className="font-semibold mb-3 text-contrast">Bukti Pembayaran</h4>
                    <img
                      src={selectedBooking.paymentProof || "/placeholder.svg"}
                      alt="Bukti Pembayaran"
                      className="w-full max-w-md border rounded-3xl"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button onClick={() => setSelectedBooking(null)} variant="outline" className="flex-1">
                    Tutup
                  </Button>
                  {selectedBooking.payment === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          handlePaymentAction(selectedBooking.id, "confirm")
                          setSelectedBooking(null)
                        }}
                        className="btn-success"
                      >
                        Konfirmasi Pembayaran
                      </Button>
                      <Button
                        onClick={() => {
                          handlePaymentAction(selectedBooking.id, "reject")
                          setSelectedBooking(null)
                        }}
                        className="btn-danger"
                      >
                        Tolak Pembayaran
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invoice Modal */}
        {showInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-contrast text-center">Invoice Thermal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center border-b pb-4">
                  <h3 className="font-bold text-contrast">AGA GAME STATION</h3>
                  <p className="text-sm text-muted-contrast">{user.branch || "Jakarta Pusat"}</p>
                  <p className="text-xs text-muted-contrast">Jl. Thamrin No. 123</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Invoice:</span>
                    <span className="text-contrast">#{showInvoice.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Tanggal:</span>
                    <span className="text-contrast">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Pelanggan:</span>
                    <span className="text-contrast">{showInvoice.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Kategori:</span>
                    <span className="text-contrast">{showInvoice.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Lokasi:</span>
                    <span className="text-contrast">{showInvoice.room || showInvoice.console}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Waktu:</span>
                    <span className="text-contrast">{showInvoice.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-contrast">Durasi:</span>
                    <span className="text-contrast">{showInvoice.duration} jam</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span className="text-contrast">Total:</span>
                    <span className="text-contrast">Rp {showInvoice.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted-contrast border-t pt-4">
                  <p>Terima kasih atas kunjungan Anda!</p>
                  <p>Admin: {user.name}</p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => setShowInvoice(null)} variant="outline" className="flex-1">
                    Batal
                  </Button>
                  <Button onClick={printInvoice} className="btn-primary flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

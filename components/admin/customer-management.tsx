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
  Users,
  Search,
  Filter,
  Eye,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Trophy,
  Play,
} from "lucide-react"

const mockCustomers = [
  {
    id: "CUST001",
    name: "Ahmad Rizki",
    email: "ahmad@email.com",
    phone: "081234567890",
    joinDate: "2024-01-15",
    totalBookings: 12,
    totalSpent: 240000,
    lastBooking: "2024-01-20",
    status: "sedang bermain", // sedang bermain, tidak aktif
    loyaltyPoints: 150,
    favoriteCategory: "VIP",
    averageRating: 4.8,
    address: "Jakarta Selatan",
    currentBooking: "BK025",
    currentRoom: "VIP Room 2",
    playingSince: "14:00",
  },
  {
    id: "CUST002",
    name: "Sari Dewi",
    email: "sari@email.com",
    phone: "081234567891",
    joinDate: "2024-01-10",
    totalBookings: 8,
    totalSpent: 320000,
    lastBooking: "2024-01-19",
    status: "sedang bermain",
    loyaltyPoints: 200,
    favoriteCategory: "VVIP",
    averageRating: 5.0,
    address: "Jakarta Pusat",
    currentBooking: "BK026",
    currentRoom: "VVIP Suite 1",
    playingSince: "16:00",
  },
  {
    id: "CUST003",
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567892",
    joinDate: "2024-01-05",
    totalBookings: 15,
    totalSpent: 180000,
    lastBooking: "2024-01-18",
    status: "tidak aktif",
    loyaltyPoints: 120,
    favoriteCategory: "Reguler",
    averageRating: 4.5,
    address: "Jakarta Timur",
  },
  {
    id: "CUST004",
    name: "Maya Putri",
    email: "maya@email.com",
    phone: "081234567893",
    joinDate: "2023-12-20",
    totalBookings: 25,
    totalSpent: 500000,
    lastBooking: "2024-01-17",
    status: "tidak aktif",
    loyaltyPoints: 350,
    favoriteCategory: "VIP",
    averageRating: 4.9,
    address: "Jakarta Barat",
  },
]

export function CustomerManagement() {
  const { user } = useAuth()
  const { showSuccess } = useToast()
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  // Sort customers: sedang bermain first, then by status
  const sortedCustomers = [...customers].sort((a, b) => {
    if (a.status === "sedang bermain" && b.status !== "sedang bermain") return -1
    if (a.status !== "sedang bermain" && b.status === "sedang bermain") return 1
    return 0
  })

  const filteredCustomers = sortedCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const playingCustomers = customers.filter((c) => c.status === "sedang bermain").length
  const inactiveCustomers = customers.filter((c) => c.status === "tidak aktif").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sedang bermain":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "tidak aktif":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (customerId: string, newStatus: string) => {
    setCustomers((prev) =>
      prev.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
    )
    showSuccess("Status berhasil diubah", `Status pelanggan telah diperbarui`)
  }

  if (!user || user.role !== "admin") {
    return <div className="text-center py-20 text-contrast">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-contrast mb-2">Manajemen Pelanggan</h1>
              <p className="text-muted-contrast">
                Kelola data pelanggan Aga GAME Station - {user.branch || "Jakarta Pusat"}
              </p>
              <p className="text-sm text-muted-contrast">Admin: {user.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up card-available">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Total Pelanggan</p>
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{totalCustomers}</p>
                </div>
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">+12%</span>
                <span className="text-blue-700 dark:text-blue-300 ml-1">bulan ini</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up card-occupied" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300">Sedang Bermain</p>
                  <p className="text-3xl font-bold text-green-800 dark:text-green-200">{playingCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-green-200 dark:bg-green-800 rounded-2xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-700 dark:text-green-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-700 dark:text-green-300">
                  {((playingCustomers / totalCustomers) * 100).toFixed(1)}% dari total
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up card-maintenance" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Tidak Aktif</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{queuedCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Belum booking</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up card-offline" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Total Revenue</p>
                  <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
                    Rp {(totalRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-700 dark:text-yellow-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">+8%</span>
                <span className="text-yellow-700 dark:text-yellow-300 ml-1">bulan ini</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan nama, email, atau ID..."
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
                  <SelectItem value="sedang bermain">Sedang Bermain</SelectItem>
                  <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer, index) => (
            <Card
              key={customer.id}
              className={`animate-slide-up hover:shadow-lg transition-all duration-300 ${
                customer.status === "sedang bermain" ? "card-occupied" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{customer.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-bold text-contrast">{customer.name}</h3>
                          {customer.status === "sedang bermain" && (
                            <Badge className="bg-green-500 text-white animate-pulse">
                              <Play className="w-3 h-3 mr-1" />
                              SEDANG BERMAIN
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-contrast">#{customer.id}</p>
                        {customer.status === "sedang bermain" && (
                          <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                            {customer.currentRoom} • Sejak {customer.playingSince} • Booking #{customer.currentBooking}
                          </p>
                        )}
                      </div>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status === "sedang bermain" ? "Sedang Bermain" : "Tidak Aktif"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-contrast">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-contrast">{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-contrast">Bergabung: {customer.joinDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-contrast">{customer.address}</span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-contrast">Total Booking:</span>
                        <p className="font-medium text-contrast">{customer.totalBookings}x</p>
                      </div>
                      <div>
                        <span className="text-muted-contrast">Total Spent:</span>
                        <p className="font-medium text-primary">Rp {customer.totalSpent.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-contrast">Poin Loyalty:</span>
                        <p className="font-medium text-yellow-600">{customer.loyaltyPoints} poin</p>
                      </div>
                      <div>
                        <span className="text-muted-contrast">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-contrast">{customer.averageRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Select value={customer.status} onValueChange={(value) => handleStatusChange(customer.id, value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedang bermain">Sedang Bermain</SelectItem>
                        <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-contrast">Detail Pelanggan - {selectedCustomer.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-contrast">Informasi Pribadi</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">ID Pelanggan:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Nama:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Email:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Telepon:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Alamat:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Bergabung:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-contrast">Statistik Gaming</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Status:</span>
                        <Badge className={getStatusColor(selectedCustomer.status)}>
                          {selectedCustomer.status === "sedang bermain" ? "Sedang Bermain" : "Tidak Aktif"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Total Booking:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.totalBookings} kali</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Total Pengeluaran:</span>
                        <span className="font-medium text-primary">
                          Rp {selectedCustomer.totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Booking Terakhir:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.lastBooking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Kategori Favorit:</span>
                        <span className="font-medium text-contrast">{selectedCustomer.favoriteCategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Poin Loyalty:</span>
                        <span className="font-medium text-yellow-600">{selectedCustomer.loyaltyPoints} poin</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-contrast">Rating Rata-rata:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-contrast">{selectedCustomer.averageRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => setSelectedCustomer(null)} variant="outline" className="flex-1">
                    Tutup
                  </Button>
                  <Button
                    onClick={() => {
                      showSuccess("Email terkirim", "Email promosi telah dikirim ke pelanggan")
                      setSelectedCustomer(null)
                    }}
                    className="btn-primary"
                  >
                    Kirim Promo
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

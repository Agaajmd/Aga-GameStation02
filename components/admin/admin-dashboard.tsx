"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { Calendar, Users, Gamepad2, DollarSign, Clock, AlertCircle, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

const todayStats = {
  totalBookings: 24,
  revenue: 480000,
  activePS: 8,
  availablePS: 4,
  pendingPayments: 3,
}

const recentBookings = [
  {
    id: "BK025",
    customer: "Ahmad Rizki",
    category: "VIP",
    room: "VIP Room 2",
    time: "14:00-17:00",
    status: "active",
    payment: "confirmed",
  },
  {
    id: "BK026",
    customer: "Sari Dewi",
    category: "VVIP",
    room: "VVIP Suite 1",
    time: "16:00-20:00",
    status: "confirmed",
    payment: "pending",
  },
  {
    id: "BK027",
    customer: "Budi Santoso",
    category: "Reguler",
    console: "PS5",
    time: "19:00-22:00",
    status: "confirmed",
    payment: "confirmed",
  },
]

const notifications = [
  {
    id: 1,
    type: "payment",
    message: "Pembayaran baru dari Ahmad Rizki - BK025",
    time: "5 menit lalu",
    urgent: true,
  },
  {
    id: 2,
    type: "booking",
    message: "Booking baru VIP Room 3 - BK028",
    time: "15 menit lalu",
    urgent: false,
  },
  {
    id: 3,
    type: "system",
    message: "PS4 Unit 3 perlu maintenance",
    time: "1 jam lalu",
    urgent: true,
  },
]

export function AdminDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-contrast mb-2">Akses Ditolak</h2>
          <p className="text-muted-contrast">Anda tidak memiliki akses ke halaman admin</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-contrast mb-2">Dashboard Admin</h1>
          <p className="text-muted-contrast">
            Selamat datang, {user.name}. Kelola operasional Aga GAME Station - {user.branch || "Jakarta Pusat"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Booking Hari Ini</p>
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{todayStats.totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">+12%</span>
                <span className="text-blue-600 dark:text-blue-400 ml-1">dari kemarin</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300">Pendapatan</p>
                  <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                    Rp {todayStats.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-200 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-700 dark:text-green-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">+8%</span>
                <span className="text-green-600 dark:text-green-400 ml-1">dari kemarin</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">PS Aktif</p>
                  <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                    {todayStats.activePS}/{todayStats.activePS + todayStats.availablePS}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Clock className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-purple-600 dark:text-purple-400">{todayStats.availablePS} tersedia</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200 dark:border-red-800"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 dark:text-red-300">Pembayaran Pending</p>
                  <p className="text-3xl font-bold text-red-800 dark:text-red-200">{todayStats.pendingPayments}</p>
                </div>
                <div className="w-12 h-12 bg-red-200 dark:bg-red-800 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-700 dark:text-red-300" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/booking">
                  <Button size="sm" className="btn-danger text-xs">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-contrast">Booking Terbaru</CardTitle>
                  <Link href="/admin/booking">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Semua
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-contrast">#{booking.id}</h4>
                          <Badge variant="outline" className="capitalize">
                            {booking.category}
                          </Badge>
                          <Badge
                            className={
                              booking.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            }
                          >
                            {booking.status === "active" ? "Sedang Bermain" : "Dikonfirmasi"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-contrast">{booking.customer}</p>
                        <p className="text-sm text-muted-contrast">
                          {booking.room || booking.console} • {booking.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            booking.payment === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          }
                        >
                          {booking.payment === "confirmed" ? "Lunas" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-contrast">
                  <AlertCircle className="w-5 h-5" />
                  <span>Notifikasi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg ${
                        notif.urgent
                          ? "bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-800"
                          : "bg-muted/50"
                      }`}
                    >
                      <p className="text-sm font-medium text-contrast">{notif.message}</p>
                      <p className="text-xs text-muted-contrast mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-contrast">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/booking" className="block">
                  <Button className="w-full justify-start btn-primary" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Kelola Booking
                  </Button>
                </Link>
                <Link href="/admin/ketersediaan" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Ketersediaan PS
                  </Button>
                </Link>
                <Link href="/admin/pelanggan" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Data Pelanggan
                  </Button>
                </Link>
                <Link href="/admin/booking" className="block">
                  <Button className="w-full justify-start btn-primary">
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Booking Terkonfirmasi
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

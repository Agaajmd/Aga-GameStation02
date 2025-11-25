"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { Users, FileText, DollarSign, TrendingUp, Gamepad2, Shield, AlertCircle, Crown, Activity } from "lucide-react"
import Link from "next/link"

const businessMetrics = {
  totalRevenue: 15750000,
  monthlyGrowth: 23.5,
  totalCustomers: 1247,
  activeAdmins: 5,
  totalBookings: 3456,
  avgSessionTime: 2.8,
  topCategory: "VIP",
  profitMargin: 68.2,
}

const revenueData = [
  { month: "Jan", revenue: 12500000 },
  { month: "Feb", revenue: 13200000 },
  { month: "Mar", revenue: 15750000 },
]

const topPerformers = [
  { category: "VIP", bookings: 156, revenue: 6240000 },
  { category: "VVIP", bookings: 89, revenue: 5340000 },
  { category: "Reguler", bookings: 234, revenue: 4170000 },
]

export function SuperAdminDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== "super-admin") {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Akses Ditolak</h2>
          <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman super admin</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Selamat datang, {user.name}. Pantau performa bisnis Aga Game secara menyeluruh.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-foreground">
                    Rp {businessMetrics.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+{businessMetrics.monthlyGrowth}%</span>
                <span className="text-muted-foreground ml-1">bulan ini</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                  <p className="text-2xl font-bold text-foreground">
                    {businessMetrics.totalCustomers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+12%</span>
                <span className="text-muted-foreground ml-1">bulan ini</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Booking</p>
                  <p className="text-2xl font-bold text-foreground">{businessMetrics.totalBookings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">Avg: {businessMetrics.avgSessionTime}h per sesi</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                  <p className="text-2xl font-bold text-foreground">{businessMetrics.profitMargin}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">Kategori terbaik: {businessMetrics.topCategory}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Activity className="w-5 h-5" />
                  <span>Performa Pendapatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{data.month} 2024</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.revenue / 16000000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        Rp {(data.revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  ))}
                </div>

                {/* Top Performers */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4 text-foreground">Kategori Terbaik</h4>
                  <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                      <div
                        key={performer.category}
                        className="flex items-center justify-between p-3 bg-muted rounded-2xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-purple-500" : "bg-blue-500"
                            }`}
                          ></div>
                          <span className="font-medium text-foreground">{performer.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">
                            Rp {(performer.revenue / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-xs text-muted-foreground">{performer.bookings} booking</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Actions */}
          <div className="space-y-6">
            <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Shield className="w-5 h-5" />
                  <span>Manajemen Sistem</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/super-admin/admins" className="block">
                  <Button
                    className="w-full justify-start bg-background hover:bg-muted text-foreground border border-border"
                    variant="outline"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Kelola Admin ({businessMetrics.activeAdmins})
                  </Button>
                </Link>
                <Link href="/super-admin/ps-units" className="block">
                  <Button
                    className="w-full justify-start bg-background hover:bg-muted text-foreground border border-border"
                    variant="outline"
                  >
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Inventaris PS
                  </Button>
                </Link>
                <Link href="/super-admin/laporan" className="block">
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    Laporan Bisnis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="animate-slide-up bg-card border-border" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-card-foreground">Status Sistem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Server Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment Gateway</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Backup Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Scheduled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

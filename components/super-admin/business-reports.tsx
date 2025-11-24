"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import {
  TrendingUp,
  DollarSign,
  Users,
  Gamepad2,
  Star,
  AlertCircle,
  FileText,
  Download,
  MapPin,
  Wrench,
  UserCheck,
  PieChart,
  BarChart3,
} from "lucide-react"

const branches = [
  {
    id: "jakarta-selatan",
    name: "Jakarta Selatan",
    address: "Jl. Gaming Center No. 123",
    rating: 4.8,
    totalRevenue: 45000000,
    monthlyGrowth: 15.2,
    totalCustomers: 1247,
    activeUnits: 24,
    maintenanceUnits: 2,
    totalBookings: 3456,
    avgSessionTime: 2.5,
  },
  {
    id: "jakarta-utara",
    name: "Jakarta Utara",
    address: "Jl. PlayStation Ave No. 456",
    rating: 4.6,
    totalRevenue: 38000000,
    monthlyGrowth: 12.8,
    totalCustomers: 987,
    activeUnits: 20,
    maintenanceUnits: 1,
    totalBookings: 2789,
    avgSessionTime: 2.2,
  },
  {
    id: "bandung",
    name: "Bandung",
    address: "Jl. Game Station No. 789",
    rating: 4.9,
    totalRevenue: 52000000,
    monthlyGrowth: 18.5,
    totalCustomers: 1456,
    activeUnits: 28,
    maintenanceUnits: 0,
    totalBookings: 4123,
    avgSessionTime: 2.8,
  },
]

const reportTypes = [
  {
    id: "financial",
    name: "Laporan Keuangan",
    icon: DollarSign,
    description: "Pendapatan, pengeluaran, dan profit per periode",
  },
  {
    id: "employee",
    name: "Laporan Karyawan",
    icon: UserCheck,
    description: "Performa dan aktivitas karyawan",
  },
  {
    id: "units",
    name: "Laporan PS Units",
    icon: Gamepad2,
    description: "Status dan utilisasi PlayStation units",
  },
  {
    id: "maintenance",
    name: "Laporan Maintenance",
    icon: Wrench,
    description: "Jadwal dan riwayat perawatan perangkat",
  },
  {
    id: "revenue",
    name: "Laporan Pendapatan",
    icon: TrendingUp,
    description: "Analisis pendapatan per kategori dan waktu",
  },
  {
    id: "profit",
    name: "Laporan Keuntungan",
    icon: PieChart,
    description: "Margin keuntungan dan analisis profitabilitas",
  },
  {
    id: "customer",
    name: "Laporan Pelanggan",
    icon: Users,
    description: "Demografi dan perilaku pelanggan",
  },
]

const periods = [
  { id: "daily", name: "Harian" },
  { id: "weekly", name: "Mingguan" },
  { id: "monthly", name: "Bulanan" },
  { id: "quarterly", name: "Kuartalan" },
  { id: "yearly", name: "Tahunan" },
]

export function BusinessReports() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [selectedReport, setSelectedReport] = useState<string>("")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<any[]>([])

  if (!user || user.role !== "super-admin") {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Akses Ditolak</h2>
          <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman laporan bisnis</p>
        </div>
      </section>
    )
  }

  const selectedBranchData = branches.find((branch) => branch.id === selectedBranch)
  const selectedReportType = reportTypes.find((report) => report.id === selectedReport)

  const generateReportData = (branchData: any, reportType: string) => {
    const baseData = {
      id: `RPT-${Date.now()}`,
      branchId: branchData.id,
      branchName: branchData.name,
      reportType,
      period: selectedPeriod,
      startDate: startDate || "2024-01-01",
      endDate: endDate || "2024-01-31",
      generatedAt: new Date().toISOString(),
    }

    switch (reportType) {
      case "financial":
        return {
          ...baseData,
          data: {
            totalRevenue: branchData.totalRevenue,
            totalExpenses: branchData.totalRevenue * 0.7,
            netProfit: branchData.totalRevenue * 0.3,
            grossMargin: 30,
            operatingExpenses: branchData.totalRevenue * 0.2,
            taxes: branchData.totalRevenue * 0.1,
          },
        }
      case "customer":
        return {
          ...baseData,
          data: {
            totalCustomers: branchData.totalCustomers,
            newCustomers: Math.floor(branchData.totalCustomers * 0.2),
            returningCustomers: Math.floor(branchData.totalCustomers * 0.8),
            avgSessionTime: branchData.avgSessionTime,
            customerSatisfaction: branchData.rating,
            churnRate: 5.2,
          },
        }
      case "units":
        return {
          ...baseData,
          data: {
            totalUnits: branchData.activeUnits + branchData.maintenanceUnits,
            activeUnits: branchData.activeUnits,
            maintenanceUnits: branchData.maintenanceUnits,
            utilization: Math.floor((branchData.totalBookings / (branchData.activeUnits * 30 * 12)) * 100),
            avgUptime: 95.5,
            totalBookings: branchData.totalBookings,
          },
        }
      case "revenue":
        return {
          ...baseData,
          data: {
            totalRevenue: branchData.totalRevenue,
            regularRevenue: branchData.totalRevenue * 0.4,
            vipRevenue: branchData.totalRevenue * 0.35,
            vvipRevenue: branchData.totalRevenue * 0.25,
            growthRate: branchData.monthlyGrowth,
            avgRevenuePerCustomer: Math.floor(branchData.totalRevenue / branchData.totalCustomers),
          },
        }
      default:
        return {
          ...baseData,
          data: {
            summary: "Laporan berhasil dibuat",
            details: "Data laporan tersedia untuk diunduh",
          },
        }
    }
  }

  const handleGenerateReport = async () => {
    if (!selectedBranch || !selectedReport) {
      showError("Pilihan belum lengkap", "Mohon pilih cabang dan jenis laporan")
      return
    }

    setIsGenerating(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const branchData = branches.find((b) => b.id === selectedBranch)
      const reportData = generateReportData(branchData, selectedReport)

      setGeneratedReports((prev) => [reportData, ...prev])
      showSuccess("Laporan berhasil dibuat!", "Laporan telah ditambahkan ke daftar laporan")
    } catch (error) {
      showError("Gagal membuat laporan", "Terjadi kesalahan saat membuat laporan")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = (report: any) => {
    // Simulate download
    const dataStr = JSON.stringify(report, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${report.branchName}_${report.reportType}_${report.period}.json`
    link.click()
    URL.revokeObjectURL(url)

    showSuccess("Laporan diunduh", "File laporan telah diunduh ke perangkat Anda")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Laporan Bisnis</h1>
          <p className="text-muted-foreground">Analisis mendalam performa bisnis per cabang</p>
        </div>

        {/* Branch Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedBranch === branch.id
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:shadow-md bg-card border-border"
              }`}
              onClick={() => setSelectedBranch(branch.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{branch.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {branch.address}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-foreground">{branch.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pendapatan</span>
                    <span className="font-semibold text-foreground">{formatCurrency(branch.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pertumbuhan</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        +{branch.monthlyGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pelanggan</span>
                    <span className="font-semibold text-foreground">{branch.totalCustomers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">PS Units</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {branch.activeUnits} Aktif
                      </Badge>
                      {branch.maintenanceUnits > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {branch.maintenanceUnits} Maintenance
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Report Generator */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Generator Laporan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground">Pilih Cabang</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Pilih cabang untuk laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground">Periode</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map((period) => (
                          <SelectItem key={period.id} value={period.id}>
                            {period.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-foreground">
                      Tanggal Mulai
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-foreground">
                      Tanggal Selesai
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">Jenis Laporan</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {reportTypes.map((report) => {
                      const Icon = report.icon
                      return (
                        <Card
                          key={report.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedReport === report.id
                              ? "ring-2 ring-primary border-primary bg-primary/5"
                              : "hover:border-primary/50 bg-background border-border"
                          }`}
                          onClick={() => setSelectedReport(report.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{report.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateReport}
                  disabled={!selectedBranch || !selectedReport || isGenerating}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Membuat Laporan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Generate Laporan</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Reports */}
            {generatedReports.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Laporan yang Dibuat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {reportTypes.find((r) => r.id === report.reportType)?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {report.branchName} • {periods.find((p) => p.id === report.period)?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Dibuat: {new Date(report.generatedAt).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleDownloadReport(report)}
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Branch Report */}
            {selectedBranchData && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Detail Laporan - {selectedBranchData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Financial Metrics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Metrik Keuangan</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Total Pendapatan</span>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(selectedBranchData.totalRevenue)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Pertumbuhan Bulanan</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              +{selectedBranchData.monthlyGrowth}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Rata-rata per Hari</span>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(Math.round(selectedBranchData.totalRevenue / 30))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Metrics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Metrik Operasional</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Total Pelanggan</span>
                          <span className="font-semibold text-foreground">
                            {selectedBranchData.totalCustomers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Rating Pelayanan</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-foreground">{selectedBranchData.rating}/5.0</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
                          <span className="text-sm text-muted-foreground">Utilitas PS</span>
                          <span className="font-semibold text-foreground">
                            {Math.round(
                              (selectedBranchData.activeUnits /
                                (selectedBranchData.activeUnits + selectedBranchData.maintenanceUnits)) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Ringkasan Bisnis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl border border-primary/20">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(branches.reduce((sum, branch) => sum + branch.totalRevenue, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {branches.reduce((sum, branch) => sum + branch.totalCustomers, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <Gamepad2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {branches.reduce((sum, branch) => sum + branch.activeUnits, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total PS Units</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {(branches.reduce((sum, branch) => sum + branch.rating, 0) / branches.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Rata-rata Rating</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Cabang Terbaik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {branches
                  .sort((a, b) => b.totalRevenue - a.totalRevenue)
                  .map((branch, index) => (
                    <div
                      key={branch.id}
                      className="flex items-center justify-between p-3 bg-background rounded-2xl border border-border"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                                ? "bg-gray-400 text-white"
                                : "bg-orange-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{branch.name}</p>
                          <p className="text-xs text-muted-foreground">{formatCurrency(branch.totalRevenue)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-foreground">{branch.rating}</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

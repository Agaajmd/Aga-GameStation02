"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { Gamepad2, Power, PowerOff, Wrench, CheckCircle, Search, Edit } from "lucide-react"

interface PSUnit {
  id: string
  name: string
  type: string
  category: string
  location: string
  status: "available" | "occupied" | "maintenance" | "offline"
  condition: "excellent" | "good" | "fair" | "needs_repair"
  lastMaintenance: string
  totalHours: number
  currentBooking: string | null
  currentUser?: string
  playingSince?: string
  maintenanceReason?: string
}

const mockPSUnits: PSUnit[] = [
  // Available units first
  {
    id: "PS001",
    name: "PlayStation 4 - Unit 1",
    type: "PS4",
    category: "reguler",
    location: "Lantai 1 - Area A",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2024-01-15",
    totalHours: 1250,
    currentBooking: null,
  },
  {
    id: "VIP001",
    name: "VIP Room 1 - PS5",
    type: "PS5",
    category: "vip",
    location: "VIP Room 1",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2024-01-18",
    totalHours: 650,
    currentBooking: null,
  },
  {
    id: "VVIP001",
    name: "VVIP Suite 1 - PS5 Pro",
    type: "PS5 Pro",
    category: "vvip",
    location: "VVIP Suite 1",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2024-01-20",
    totalHours: 320,
    currentBooking: null,
  },
  // Occupied units
  {
    id: "PS002",
    name: "PlayStation 5 - Unit 1",
    type: "PS5",
    category: "reguler",
    location: "Lantai 1 - Area B",
    status: "occupied",
    condition: "good",
    lastMaintenance: "2024-01-10",
    totalHours: 890,
    currentBooking: "BK025",
    currentUser: "Ahmad Rizki",
    playingSince: "14:00",
  },
  {
    id: "VIP002",
    name: "VIP Room 2 - PS5",
    type: "PS5",
    category: "vip",
    location: "VIP Room 2",
    status: "occupied",
    condition: "good",
    lastMaintenance: "2024-01-12",
    totalHours: 1200,
    currentBooking: "BK026",
    currentUser: "Sari Dewi",
    playingSince: "16:00",
  },
  // Maintenance units
  {
    id: "PS003",
    name: "PlayStation 4 - Unit 3",
    type: "PS4",
    category: "reguler",
    location: "Lantai 1 - Area C",
    status: "maintenance",
    condition: "needs_repair",
    lastMaintenance: "2024-01-05",
    totalHours: 1450,
    currentBooking: null,
    maintenanceReason: "Controller rusak",
  },
]

export function PSAvailability() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [units, setUnits] = useState(mockPSUnits)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUnit, setSelectedUnit] = useState<PSUnit | null>(null)
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    category: "",
    location: ""
  })

  // Sort units: available first, then occupied, then maintenance
  const sortedUnits = [...units].sort((a, b) => {
    const statusOrder = { available: 0, occupied: 1, maintenance: 2, offline: 3 }
    return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
  })

  const filteredUnits = sortedUnits.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const availableUnits = units.filter((u) => u.status === "available").length
  const occupiedUnits = units.filter((u) => u.status === "occupied").length
  const maintenanceUnits = units.filter((u) => u.status === "maintenance").length
  const offlineUnits = units.filter((u) => u.status === "offline").length

  const handleStatusChange = (unitId: string, newStatus: PSUnit["status"]) => {
    setUnits((prev) =>
      prev.map((unit) =>
        unit.id === unitId
          ? { ...unit, status: newStatus, currentBooking: newStatus === "available" ? null : unit.currentBooking }
          : unit,
      ),
    )

    const statusText = {
      available: "tidak aktif",
      occupied: "sedang bermain",
      maintenance: "dalam maintenance",
      offline: "offline",
    }

    showSuccess("Status berhasil diubah", `Unit ${unitId} sekarang ${statusText[newStatus as keyof typeof statusText]}`)
  }

  const handleEditUnit = (unit: PSUnit) => {
    setSelectedUnit(unit)
    setEditForm({
      name: unit.name,
      type: unit.type,
      category: unit.category,
      location: unit.location
    })
  }

  const handleSaveChanges = () => {
    if (!selectedUnit) return

    setUnits(prev => 
      prev.map(unit => 
        unit.id === selectedUnit.id 
          ? { ...unit, ...editForm }
          : unit
      )
    )

    showSuccess("Unit berhasil diperbarui", "Perubahan telah disimpan")
    setSelectedUnit(null)
    setEditForm({ name: "", type: "", category: "", location: "" })
  }

  const handleCloseModal = () => {
    setSelectedUnit(null)
    setEditForm({ name: "", type: "", category: "", location: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "occupied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "fair":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "needs_repair":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4" />
      case "occupied":
        return <Power className="w-4 h-4" />
      case "maintenance":
        return <Wrench className="w-4 h-4" />
      case "offline":
        return <PowerOff className="w-4 h-4" />
      default:
        return <Gamepad2 className="w-4 h-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Tidak Aktif"
      case "occupied":
        return "Sedang Bermain"
      case "maintenance":
        return "Maintenance"
      case "offline":
        return "Offline"
      default:
        return status
    }
  }

  if (!user || user.role !== "admin") {
    return <div className="text-center py-20 text-foreground">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Ketersediaan PlayStation</h1>
              <p className="text-muted-foreground">
                Kelola status dan kondisi semua unit PlayStation - {user.branch || "Jakarta Pusat"}
              </p>
              <p className="text-sm text-muted-foreground">Admin: {user.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300">Tidak Aktif</p>
                  <p className="text-3xl font-bold text-green-800 dark:text-green-200">{availableUnits}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Sedang Bermain</p>
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{occupiedUnits}</p>
                </div>
                <Power className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Maintenance</p>
                  <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">{maintenanceUnits}</p>
                </div>
                <Wrench className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Total Unit</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{units.length}</p>
                </div>
                <Gamepad2 className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up border-border bg-card" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan nama, ID, atau lokasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="available">Tidak Aktif</SelectItem>
                  <SelectItem value="occupied">Sedang Bermain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit, index) => (
            <Card
              key={unit.id}
              className={`animate-slide-up hover:shadow-lg transition-all duration-300 border-border bg-card ${
                unit.status === "available"
                  ? "ring-1 ring-green-200 dark:ring-green-800"
                  : unit.status === "occupied"
                    ? "ring-1 ring-blue-200 dark:ring-blue-800"
                    : unit.status === "maintenance"
                      ? "ring-1 ring-yellow-200 dark:ring-yellow-800"
                      : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-card-foreground">{unit.name}</CardTitle>
                  <Badge variant="outline" className="capitalize border-border text-foreground">
                    {unit.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(unit.status)}>
                    {getStatusIcon(unit.status)}
                    <span className="ml-1">{getStatusLabel(unit.status)}</span>
                  </Badge>
                  <Badge className={getConditionColor(unit.condition)}>
                    {unit.condition === "excellent"
                      ? "Sangat Baik"
                      : unit.condition === "good"
                        ? "Baik"
                        : unit.condition === "fair"
                          ? "Cukup"
                          : "Perlu Perbaikan"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Unit:</span>
                    <span className="font-medium text-card-foreground">{unit.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipe:</span>
                    <span className="font-medium text-card-foreground">{unit.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lokasi:</span>
                    <span className="font-medium text-card-foreground">{unit.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Jam:</span>
                    <span className="font-medium text-card-foreground">{unit.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance Terakhir:</span>
                    <span className="font-medium text-card-foreground">{unit.lastMaintenance}</span>
                  </div>

                  {unit.status === "occupied" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking Aktif:</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">#{unit.currentBooking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pemain:</span>
                        <span className="font-medium text-card-foreground">{unit.currentUser}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sejak:</span>
                        <span className="font-medium text-card-foreground">{unit.playingSince}</span>
                      </div>
                    </>
                  )}

                  {unit.status === "maintenance" && unit.maintenanceReason && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alasan:</span>
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">{unit.maintenanceReason}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Select value={unit.status} onValueChange={(value) => handleStatusChange(unit.id, value as PSUnit["status"])}>
                    <SelectTrigger className="flex-1 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Tidak Aktif</SelectItem>
                      <SelectItem value="occupied">Sedang Bermain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUnit(unit)}
                    className="border-border hover:bg-muted"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unit Detail Modal */}
        {selectedUnit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-card-foreground">Detail Unit {selectedUnit.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nama Unit</label>
                    <Input 
                      value={editForm.name} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 bg-background border-border text-foreground" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipe</label>
                    <Input 
                      value={editForm.type} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                      className="mt-1 bg-background border-border text-foreground" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Kategori</label>
                    <Select 
                      value={editForm.category}
                      onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reguler">Reguler</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="vvip">VVIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lokasi</label>
                    <Input 
                      value={editForm.location} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      className="mt-1 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Simpan Perubahan
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

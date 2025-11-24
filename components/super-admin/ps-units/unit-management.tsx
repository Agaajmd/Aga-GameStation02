"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { StatCard, EmptyState } from "@/components/super-admin/shared"
import { getStatusColor, getCategoryColor, getStatusLabel, getConditionLabel, generateUnitId, formatCurrency } from "@/lib/utils/super-admin"
import type { PSUnit, PSUnitFormData } from "@/lib/types/super-admin"
import {
  Gamepad2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Power,
  Wrench,
  CheckCircle,
  ArrowLeft,
  Building2,
  Search,
} from "lucide-react"

const branchData: Record<string, any> = {
  BR001: { name: "Jakarta Selatan", manager: "John Doe" },
  BR002: { name: "Jakarta Utara", manager: "Jane Smith" },
  BR003: { name: "Bandung", manager: "Mike Johnson" },
  BR004: { name: "Surabaya", manager: "Sarah Wilson" },
}

const mockPSUnits: Record<string, any[]> = {
  BR001: [
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
      price: 5000,
      specifications: {
        storage: "500GB",
        controllers: 2,
        accessories: ["Headset", "Charging Station"],
      },
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
      price: 8000,
      specifications: {
        storage: "825GB SSD",
        controllers: 2,
        accessories: ['4K TV 55"', "Surround Sound", "Gaming Chair"],
      },
    },
  ],
  BR002: [
    {
      id: "PS002",
      name: "PlayStation 5 - Unit 2",
      type: "PS5",
      category: "reguler",
      location: "Lantai 2 - Area B",
      status: "maintenance",
      condition: "needs_repair",
      lastMaintenance: "2024-01-10",
      totalHours: 890,
      price: 5000,
      specifications: {
        storage: "825GB SSD",
        controllers: 2,
        accessories: ["Standard TV", "Basic Audio"],
      },
    },
  ],
  BR003: [],
  BR004: [],
}

interface BranchUnitsManagementProps {
  branchId: string
}

export function BranchUnitsManagement({ branchId }: BranchUnitsManagementProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [units, setUnits] = useState(mockPSUnits[branchId] || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedUnit, setSelectedUnit] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUnit, setEditingUnit] = useState<any>(null)
  const [newUnit, setNewUnit] = useState({
    name: "",
    type: "PS4",
    category: "reguler",
    location: "",
    condition: "excellent",
    price: 5000,
    specifications: {
      storage: "",
      controllers: 2,
      accessories: [] as string[],
    },
  })

  const branch = branchData[branchId]

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter
    const matchesCategory = categoryFilter === "all" || unit.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalUnits = units.length
  const availableUnits = units.filter((u) => u.status === "available").length
  const occupiedUnits = units.filter((u) => u.status === "occupied").length
  const maintenanceUnits = units.filter((u) => u.status === "maintenance").length

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.location) {
      showError("Form tidak lengkap", "Mohon lengkapi nama unit dan lokasi")
      return
    }

    const unitId = generateUnitId(newUnit.type, units.length)
    const unit: PSUnit = {
      id: unitId,
      ...newUnit,
      status: "available",
      lastMaintenance: new Date().toISOString().split("T")[0],
      totalHours: 0,
    }

    setUnits((prev) => [...prev, unit])
    setNewUnit({
      name: "",
      type: "PS4",
      category: "reguler",
      location: "",
      condition: "excellent",
      price: 5000,
      specifications: {
        storage: "",
        controllers: 2,
        accessories: [],
      },
    })
    setShowAddModal(false)
    showSuccess("Unit berhasil ditambahkan", `${unit.name} telah ditambahkan ke sistem`)
  }

  const handleEditUnit = () => {
    if (!editingUnit.name || !editingUnit.location) {
      showError("Form tidak lengkap", "Mohon lengkapi nama unit dan lokasi")
      return
    }

    setUnits((prev) => prev.map((unit) => (unit.id === editingUnit.id ? editingUnit : unit)))
    setShowEditModal(false)
    setEditingUnit(null)
    showSuccess("Unit berhasil diperbarui", "Perubahan telah disimpan")
  }

  const handleDeleteUnit = (unitId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus unit ini?")) {
      setUnits((prev) => prev.filter((unit) => unit.id !== unitId))
      showSuccess("Unit dihapus", "Unit berhasil dihapus dari sistem")
    }
  }

  const openEditModal = (unit: any) => {
    setEditingUnit({ ...unit })
    setShowEditModal(true)
  }

  if (!user || user.role !== "super-admin") {
    return <div className="text-center py-20 text-foreground">Akses ditolak</div>
  }

  if (!branch) {
    return <div className="text-center py-20 text-foreground">Cabang tidak ditemukan</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/super-admin/ps-units")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Cabang
          </Button>

          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{branch.name}</h1>
              <p className="text-muted-foreground">Manager: {branch.manager} • ID: {branchId}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Unit"
            value={totalUnits}
            icon={<Gamepad2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatCard
            title="Tersedia"
            value={availableUnits}
            icon={<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />}
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            valueColor="text-green-600 dark:text-green-400"
          />
          <StatCard
            title="Sedang Digunakan"
            value={occupiedUnits}
            icon={<Power className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            valueColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Maintenance"
            value={maintenanceUnits}
            icon={<Wrench className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
            iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
            valueColor="text-yellow-600 dark:text-yellow-400"
          />
        </div>

        {/* Filters */}
        <Card className="mb-8 border-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari unit berdasarkan nama, ID, atau lokasi..."
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
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="occupied">Digunakan</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="reguler">Reguler</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="vvip">VVIP</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={() => setShowAddModal(true)} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Unit PS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Units Grid */}
        {filteredUnits.length === 0 ? (
          <EmptyState
            icon={<Gamepad2 className="w-12 h-12" />}
            title="Belum Ada Unit PS"
            description="Mulai tambahkan unit PS untuk cabang ini"
            actionLabel="Tambah Unit PS"
            onAction={() => setShowAddModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit, index) => (
            <Card key={unit.id} className="hover:shadow-lg transition-all duration-300 border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-card-foreground">{unit.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className={getCategoryColor(unit.category)}>{unit.category.toUpperCase()}</Badge>
                    <Badge className={getStatusColor(unit.status)}>
                      {getStatusLabel(unit.status)}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{unit.location}</p>
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
                    <span className="text-muted-foreground">Harga/Jam:</span>
                    <span className="font-medium text-card-foreground">{formatCurrency(unit.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Jam:</span>
                    <span className="font-medium text-card-foreground">{unit.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance Terakhir:</span>
                    <span className="font-medium text-card-foreground">{unit.lastMaintenance}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-card-foreground">Spesifikasi:</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Storage: {unit.specifications.storage}</p>
                    <p>• Controllers: {unit.specifications.controllers}</p>
                    <p>• Accessories: {unit.specifications.accessories.join(", ")}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUnit(unit)}
                    className="flex-1 border-border hover:bg-muted"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(unit)}
                    className="border-border hover:bg-muted"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Add Unit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-card-foreground">Tambah Unit PS Baru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nama Unit
                    </Label>
                    <Input
                      id="name"
                      value={newUnit.name}
                      onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                      placeholder="PlayStation 5 - Unit 1"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-foreground">
                      Tipe Console
                    </Label>
                    <Select value={newUnit.type} onValueChange={(value) => setNewUnit({ ...newUnit, type: value })}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PS4">PlayStation 4</SelectItem>
                        <SelectItem value="PS5">PlayStation 5</SelectItem>
                        <SelectItem value="PS5 Pro">PlayStation 5 Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-foreground">
                      Kategori
                    </Label>
                    <Select
                      value={newUnit.category}
                      onValueChange={(value) => setNewUnit({ ...newUnit, category: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
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
                    <Label htmlFor="location" className="text-foreground">
                      Lokasi
                    </Label>
                    <Input
                      id="location"
                      value={newUnit.location}
                      onChange={(e) => setNewUnit({ ...newUnit, location: e.target.value })}
                      placeholder="Lantai 1 - Area A"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-foreground">
                      Harga per Jam
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newUnit.price}
                      onChange={(e) => setNewUnit({ ...newUnit, price: parseInt(e.target.value) || 0 })}
                      placeholder="5000"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="condition" className="text-foreground">
                      Kondisi
                    </Label>
                    <Select
                      value={newUnit.condition}
                      onValueChange={(value) => setNewUnit({ ...newUnit, condition: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Sangat Baik</SelectItem>
                        <SelectItem value="good">Baik</SelectItem>
                        <SelectItem value="fair">Cukup</SelectItem>
                        <SelectItem value="needs_repair">Perlu Perbaikan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Spesifikasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="storage" className="text-foreground">
                        Storage
                      </Label>
                      <Input
                        id="storage"
                        value={newUnit.specifications.storage}
                        onChange={(e) =>
                          setNewUnit({
                            ...newUnit,
                            specifications: { ...newUnit.specifications, storage: e.target.value },
                          })
                        }
                        placeholder="500GB / 825GB SSD"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="controllers" className="text-foreground">
                        Jumlah Controller
                      </Label>
                      <Input
                        id="controllers"
                        type="number"
                        value={newUnit.specifications.controllers}
                        onChange={(e) =>
                          setNewUnit({
                            ...newUnit,
                            specifications: {
                              ...newUnit.specifications,
                              controllers: parseInt(e.target.value) || 2,
                            },
                          })
                        }
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accessories" className="text-foreground">
                      Accessories (pisahkan dengan koma)
                    </Label>
                    <Input
                      id="accessories"
                      value={newUnit.specifications.accessories.join(", ")}
                      onChange={(e) =>
                        setNewUnit({
                          ...newUnit,
                          specifications: {
                            ...newUnit.specifications,
                            accessories: e.target.value
                              .split(",")
                              .map((item) => item.trim())
                              .filter((item) => item),
                          },
                        })
                      }
                      placeholder="Headset, Charging Station, Gaming Chair"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowAddModal(false)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleAddUnit}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Tambah Unit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Unit Modal */}
        {showEditModal && editingUnit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-card-foreground">Edit Unit - {editingUnit.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editName" className="text-foreground">
                      Nama Unit
                    </Label>
                    <Input
                      id="editName"
                      value={editingUnit.name}
                      onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editType" className="text-foreground">
                      Tipe Console
                    </Label>
                    <Select
                      value={editingUnit.type}
                      onValueChange={(value) => setEditingUnit({ ...editingUnit, type: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PS4">PlayStation 4</SelectItem>
                        <SelectItem value="PS5">PlayStation 5</SelectItem>
                        <SelectItem value="PS5 Pro">PlayStation 5 Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editCategory" className="text-foreground">
                      Kategori
                    </Label>
                    <Select
                      value={editingUnit.category}
                      onValueChange={(value) => setEditingUnit({ ...editingUnit, category: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
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
                    <Label htmlFor="editLocation" className="text-foreground">
                      Lokasi
                    </Label>
                    <Input
                      id="editLocation"
                      value={editingUnit.location}
                      onChange={(e) => setEditingUnit({ ...editingUnit, location: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrice" className="text-foreground">
                      Harga per Jam
                    </Label>
                    <Input
                      id="editPrice"
                      type="number"
                      value={editingUnit.price}
                      onChange={(e) => setEditingUnit({ ...editingUnit, price: parseInt(e.target.value) || 0 })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCondition" className="text-foreground">
                      Kondisi
                    </Label>
                    <Select
                      value={editingUnit.condition}
                      onValueChange={(value) => setEditingUnit({ ...editingUnit, condition: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Sangat Baik</SelectItem>
                        <SelectItem value="good">Baik</SelectItem>
                        <SelectItem value="fair">Cukup</SelectItem>
                        <SelectItem value="needs_repair">Perlu Perbaikan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editStatus" className="text-foreground">
                      Status
                    </Label>
                    <Select
                      value={editingUnit.status}
                      onValueChange={(value) => setEditingUnit({ ...editingUnit, status: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Tersedia</SelectItem>
                        <SelectItem value="occupied">Digunakan</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Spesifikasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editStorage" className="text-foreground">
                        Storage
                      </Label>
                      <Input
                        id="editStorage"
                        value={editingUnit.specifications.storage}
                        onChange={(e) =>
                          setEditingUnit({
                            ...editingUnit,
                            specifications: { ...editingUnit.specifications, storage: e.target.value },
                          })
                        }
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editControllers" className="text-foreground">
                        Jumlah Controller
                      </Label>
                      <Input
                        id="editControllers"
                        type="number"
                        value={editingUnit.specifications.controllers}
                        onChange={(e) =>
                          setEditingUnit({
                            ...editingUnit,
                            specifications: {
                              ...editingUnit.specifications,
                              controllers: parseInt(e.target.value) || 2,
                            },
                          })
                        }
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editAccessories" className="text-foreground">
                      Accessories (pisahkan dengan koma)
                    </Label>
                    <Input
                      id="editAccessories"
                      value={editingUnit.specifications.accessories.join(", ")}
                      onChange={(e) =>
                        setEditingUnit({
                          ...editingUnit,
                          specifications: {
                            ...editingUnit.specifications,
                            accessories: e.target.value
                              .split(",")
                              .map((item: string) => item.trim())
                              .filter((item: string) => item),
                          },
                        })
                      }
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingUnit(null)
                    }}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleEditUnit}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Unit Detail Modal */}
        {selectedUnit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-card-foreground">Detail Unit - {selectedUnit.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Informasi Unit</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Unit:</span>
                        <span className="font-medium text-foreground">{selectedUnit.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama:</span>
                        <span className="font-medium text-foreground">{selectedUnit.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipe:</span>
                        <span className="font-medium text-foreground">{selectedUnit.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kategori:</span>
                        <Badge className={getCategoryColor(selectedUnit.category)}>
                          {selectedUnit.category.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={getStatusColor(selectedUnit.status)}>
                          {getStatusLabel(selectedUnit.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lokasi:</span>
                        <span className="font-medium text-foreground">{selectedUnit.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Operasional & Harga</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Harga per Jam:</span>
                        <span className="font-medium text-foreground">{formatCurrency(selectedUnit.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Jam Operasi:</span>
                        <span className="font-medium text-foreground">{selectedUnit.totalHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance Terakhir:</span>
                        <span className="font-medium text-foreground">{selectedUnit.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kondisi:</span>
                        <span className="font-medium text-foreground">
                          {getConditionLabel(selectedUnit.condition)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Spesifikasi & Accessories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Storage:</span>
                      <p className="font-medium text-foreground">{selectedUnit.specifications.storage}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Controllers:</span>
                      <p className="font-medium text-foreground">{selectedUnit.specifications.controllers} unit</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accessories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedUnit.specifications.accessories.map((accessory: string) => (
                          <Badge key={accessory} variant="outline" className="text-xs border-border">
                            {accessory}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedUnit(null)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={() => {
                      openEditModal(selectedUnit)
                      setSelectedUnit(null)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Unit
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

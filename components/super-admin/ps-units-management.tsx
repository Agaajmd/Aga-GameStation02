"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { Gamepad2, Search, Plus, Edit, Trash2, Eye, Power, Wrench, CheckCircle, Building, MapPin } from "lucide-react"

const mockPSUnits = [
  {
    id: "PS001",
    name: "PlayStation 4 - Unit 1",
    type: "PS4",
    category: "reguler",
    location: "Lantai 1 - Area A",
    branch: "Jakarta Pusat",
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
    branch: "Jakarta Pusat",
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
  {
    id: "VVIP001",
    name: "VVIP Suite 1 - PS5 Pro",
    type: "PS5 Pro",
    category: "vvip",
    location: "VVIP Suite 1",
    branch: "Jakarta Selatan",
    status: "occupied",
    condition: "excellent",
    lastMaintenance: "2024-01-20",
    totalHours: 320,
    price: 12000,
    specifications: {
      storage: "1TB SSD",
      controllers: 4,
      accessories: ['8K TV 65"', "Premium Sound System", "Luxury Gaming Setup", "Mini Fridge"],
    },
  },
  {
    id: "PS002",
    name: "PlayStation 5 - Unit 2",
    type: "PS5",
    category: "reguler",
    location: "Lantai 2 - Area B",
    branch: "Jakarta Barat",
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
]

const branches = ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"]

export function PSUnitsManagement() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [units, setUnits] = useState(mockPSUnits)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
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
    branch: "Jakarta Pusat",
    condition: "excellent",
    price: 5000,
    specifications: {
      storage: "",
      controllers: 2,
      accessories: [] as string[],
    },
  })

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || unit.status === statusFilter
    const matchesBranch = branchFilter === "all" || unit.branch === branchFilter
    const matchesCategory = categoryFilter === "all" || unit.category === categoryFilter
    return matchesSearch && matchesStatus && matchesBranch && matchesCategory
  })

  const totalUnits = units.length
  const availableUnits = units.filter((u) => u.status === "available").length
  const occupiedUnits = units.filter((u) => u.status === "occupied").length
  const maintenanceUnits = units.filter((u) => u.status === "maintenance").length

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "reguler":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "vip":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "vvip":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.location) {
      showError("Form tidak lengkap", "Mohon lengkapi nama unit dan lokasi")
      return
    }

    const unitId = `${newUnit.type}${String(units.length + 1).padStart(3, "0")}`
    const unit = {
      id: unitId,
      ...newUnit,
      status: "available" as const,
      lastMaintenance: new Date().toISOString().split("T")[0],
      totalHours: 0,
    }

    setUnits((prev) => [...prev, unit])
    setNewUnit({
      name: "",
      type: "PS4",
      category: "reguler",
      location: "",
      branch: "Jakarta Pusat",
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

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen PS Units & Inventaris</h1>
          <p className="text-muted-foreground">Kelola semua unit PlayStation dan room di seluruh cabang</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Unit</p>
                  <p className="text-3xl font-bold text-foreground">{totalUnits}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tersedia</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{availableUnits}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sedang Digunakan</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{occupiedUnits}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Power className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{maintenanceUnits}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up border-border bg-card" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
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
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Semua Cabang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Cabang</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Semua Kategori" />
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
                Tambah Unit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit, index) => (
            <Card
              key={unit.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300 border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-card-foreground">{unit.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className={getCategoryColor(unit.category)}>{unit.category.toUpperCase()}</Badge>
                    <Badge className={getStatusColor(unit.status)}>
                      {unit.status === "available"
                        ? "Tersedia"
                        : unit.status === "occupied"
                          ? "Digunakan"
                          : unit.status === "maintenance"
                            ? "Maintenance"
                            : "Offline"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{unit.branch}</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>{unit.location}</span>
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
                    <span className="text-muted-foreground">Harga/Jam:</span>
                    <span className="font-medium text-card-foreground">Rp {unit.price.toLocaleString()}</span>
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

        {/* Add Unit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Tambah Unit Baru</CardTitle>
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
                    <Label htmlFor="branch" className="text-foreground">
                      Cabang
                    </Label>
                    <Select value={newUnit.branch} onValueChange={(value) => setNewUnit({ ...newUnit, branch: value })}>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
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
                      onChange={(e) => setNewUnit({ ...newUnit, price: Number.parseInt(e.target.value) || 0 })}
                      placeholder="5000"
                      className="bg-background border-border text-foreground"
                    />
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
                              controllers: Number.parseInt(e.target.value) || 2,
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
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
                    <Label htmlFor="editBranch" className="text-foreground">
                      Cabang
                    </Label>
                    <Select
                      value={editingUnit.branch}
                      onValueChange={(value) => setEditingUnit({ ...editingUnit, branch: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
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
                      onChange={(e) => setEditingUnit({ ...editingUnit, price: Number.parseInt(e.target.value) || 0 })}
                      className="bg-background border-border text-foreground"
                    />
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
                              controllers: Number.parseInt(e.target.value) || 2,
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
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
                          {selectedUnit.status === "available"
                            ? "Tersedia"
                            : selectedUnit.status === "occupied"
                              ? "Digunakan"
                              : selectedUnit.status === "maintenance"
                                ? "Maintenance"
                                : "Offline"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cabang:</span>
                        <span className="font-medium text-foreground">{selectedUnit.branch}</span>
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
                        <span className="font-medium text-foreground">Rp {selectedUnit.price.toLocaleString()}</span>
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
                          {selectedUnit.condition === "excellent"
                            ? "Sangat Baik"
                            : selectedUnit.condition === "good"
                              ? "Baik"
                              : selectedUnit.condition === "fair"
                                ? "Cukup"
                                : "Perlu Perbaikan"}
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

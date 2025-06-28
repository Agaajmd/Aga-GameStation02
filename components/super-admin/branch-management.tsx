"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import {
  MapPin,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Building2,
  Phone,
  Mail,
  Clock,
  Users,
  Gamepad2,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

const mockBranches = [
  {
    id: "BR001",
    name: "Jakarta Selatan",
    address: "Jl. Gaming Center No. 123, Jakarta Selatan, 12345",
    phone: "+62 21-1234-5678",
    email: "jaksel@agagame.com",
    manager: "John Doe",
    status: "active",
    openingHours: "10:00 - 23:00",
    totalUnits: 26,
    activeUnits: 24,
    maintenanceUnits: 2,
    totalCustomers: 1247,
    monthlyRevenue: 45000000,
    rating: 4.8,
    openDate: "2023-01-15",
    description: "Cabang flagship dengan fasilitas terlengkap di Jakarta Selatan",
  },
  {
    id: "BR002",
    name: "Jakarta Utara",
    address: "Jl. PlayStation Ave No. 456, Jakarta Utara, 14240",
    phone: "+62 21-2345-6789",
    email: "jakut@agagame.com",
    manager: "Jane Smith",
    status: "active",
    openingHours: "09:00 - 24:00",
    totalUnits: 21,
    activeUnits: 20,
    maintenanceUnits: 1,
    totalCustomers: 987,
    monthlyRevenue: 38000000,
    rating: 4.6,
    openDate: "2023-03-20",
    description: "Cabang strategis di area bisnis Jakarta Utara",
  },
  {
    id: "BR003",
    name: "Bandung",
    address: "Jl. Game Station No. 789, Bandung, 40123",
    phone: "+62 22-3456-7890",
    email: "bandung@agagame.com",
    manager: "Mike Johnson",
    status: "active",
    openingHours: "10:00 - 22:00",
    totalUnits: 28,
    activeUnits: 28,
    maintenanceUnits: 0,
    totalCustomers: 1456,
    monthlyRevenue: 52000000,
    rating: 4.9,
    openDate: "2023-02-10",
    description: "Cabang terbesar dengan teknologi terdepan di Bandung",
  },
  {
    id: "BR004",
    name: "Surabaya",
    address: "Jl. Gaming Hub No. 321, Surabaya, 60123",
    phone: "+62 31-4567-8901",
    email: "surabaya@agagame.com",
    manager: "Sarah Wilson",
    status: "maintenance",
    openingHours: "10:00 - 23:00",
    totalUnits: 18,
    activeUnits: 15,
    maintenanceUnits: 3,
    totalCustomers: 756,
    monthlyRevenue: 28000000,
    rating: 4.4,
    openDate: "2023-06-01",
    description: "Cabang baru dengan potensi pertumbuhan tinggi",
  },
]

export function BranchManagement() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [branches, setBranches] = useState(mockBranches)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBranch, setEditingBranch] = useState<any>(null)
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
    openingHours: "10:00 - 23:00",
    description: "",
    totalUnits: 20,
  })

  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || branch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalBranches = branches.length
  const activeBranches = branches.filter((b) => b.status === "active").length
  const maintenanceBranches = branches.filter((b) => b.status === "maintenance").length
  const totalRevenue = branches.reduce((sum, branch) => sum + branch.monthlyRevenue, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (branchId: string, newStatus: string) => {
    setBranches((prev) => prev.map((branch) => (branch.id === branchId ? { ...branch, status: newStatus } : branch)))
    showSuccess("Status berhasil diubah", `Status cabang telah diperbarui`)
  }

  const handleDeleteBranch = (branchId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus cabang ini?")) {
      setBranches((prev) => prev.filter((branch) => branch.id !== branchId))
      showSuccess("Cabang dihapus", "Cabang berhasil dihapus dari sistem")
    }
  }

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.address || !newBranch.phone || !newBranch.email || !newBranch.manager) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    const branchId = `BR${String(branches.length + 1).padStart(3, "0")}`
    const branch = {
      id: branchId,
      ...newBranch,
      status: "active" as const,
      activeUnits: newBranch.totalUnits,
      maintenanceUnits: 0,
      totalCustomers: 0,
      monthlyRevenue: 0,
      rating: 0,
      openDate: new Date().toISOString().split("T")[0],
    }

    setBranches((prev) => [...prev, branch])
    setNewBranch({
      name: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      openingHours: "10:00 - 23:00",
      description: "",
      totalUnits: 20,
    })
    setShowAddModal(false)
    showSuccess("Cabang berhasil ditambahkan", `${branch.name} telah ditambahkan ke sistem`)
  }

  const openEditModal = (branch: any) => {
    setEditingBranch(branch)
    setNewBranch({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      openingHours: branch.openingHours,
      description: branch.description,
      totalUnits: branch.totalUnits,
    })
    setShowEditModal(true)
  }

  const handleEditBranch = () => {
    if (!newBranch.name || !newBranch.address || !newBranch.phone || !newBranch.email || !newBranch.manager) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    setBranches((prev) => prev.map((branch) => (branch.id === editingBranch.id ? { ...branch, ...newBranch } : branch)))

    setNewBranch({
      name: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      openingHours: "10:00 - 23:00",
      description: "",
      totalUnits: 20,
    })
    setShowEditModal(false)
    setEditingBranch(null)
    showSuccess("Cabang berhasil diperbarui", `Data ${newBranch.name} telah diperbarui`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (!user || user.role !== "super-admin") {
    return <div className="text-center py-20 text-foreground">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen Cabang</h1>
          <p className="text-muted-foreground">Kelola semua cabang Aga Game Station</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cabang</p>
                  <p className="text-3xl font-bold text-foreground">{totalBranches}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cabang Aktif</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeBranches}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{maintenanceBranches}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <Card className="mb-8 animate-slide-up border-border bg-card" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan nama, alamat, atau manager..."
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
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="closed">Tutup</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Cabang
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Branch List */}
        <div className="space-y-4">
          {filteredBranches.map((branch, index) => (
            <Card
              key={branch.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300 border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{branch.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          #{branch.id} • Manager: {branch.manager}
                        </p>
                      </div>
                      <Badge className={getStatusColor(branch.status)}>
                        {branch.status === "active"
                          ? "Aktif"
                          : branch.status === "maintenance"
                            ? "Maintenance"
                            : "Tutup"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{branch.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{branch.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{branch.openingHours}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {branch.activeUnits}/{branch.totalUnits} Units
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {branch.totalCustomers.toLocaleString()} Pelanggan
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{formatCurrency(branch.monthlyRevenue)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-muted-foreground">{branch.rating}/5.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBranch(branch)}
                      className="border-border hover:bg-muted"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(branch)}
                      className="border-border hover:bg-muted"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Select value={branch.status} onValueChange={(value) => handleStatusChange(branch.id, value)}>
                      <SelectTrigger className="w-32 bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="closed">Tutup</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBranch(branch.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Branch Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Tambah Cabang Baru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nama Cabang
                    </Label>
                    <Input
                      id="name"
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      placeholder="Jakarta Timur"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager" className="text-foreground">
                      Manager
                    </Label>
                    <Input
                      id="manager"
                      value={newBranch.manager}
                      onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                      placeholder="Nama Manager"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-foreground">
                      Alamat Lengkap
                    </Label>
                    <Textarea
                      id="address"
                      value={newBranch.address}
                      onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                      placeholder="Jl. Gaming Center No. 123, Jakarta Timur, 13240"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                      placeholder="+62 21-1234-5678"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newBranch.email}
                      onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                      placeholder="cabang@agagame.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="openingHours" className="text-foreground">
                      Jam Operasional
                    </Label>
                    <Select
                      value={newBranch.openingHours}
                      onValueChange={(value) => setNewBranch({ ...newBranch, openingHours: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 - 22:00">09:00 - 22:00</SelectItem>
                        <SelectItem value="10:00 - 23:00">10:00 - 23:00</SelectItem>
                        <SelectItem value="09:00 - 24:00">09:00 - 24:00</SelectItem>
                        <SelectItem value="24 Jam">24 Jam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="totalUnits" className="text-foreground">
                      Jumlah PS Units
                    </Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      value={newBranch.totalUnits}
                      onChange={(e) => setNewBranch({ ...newBranch, totalUnits: Number.parseInt(e.target.value) || 0 })}
                      placeholder="20"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="description"
                    value={newBranch.description}
                    onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                    placeholder="Deskripsi singkat tentang cabang ini..."
                    className="bg-background border-border text-foreground"
                  />
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
                    onClick={handleAddBranch}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Tambah Cabang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Branch Modal */}
        {showEditModal && editingBranch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Edit Cabang - {editingBranch.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editName" className="text-foreground">
                      Nama Cabang
                    </Label>
                    <Input
                      id="editName"
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editManager" className="text-foreground">
                      Manager
                    </Label>
                    <Input
                      id="editManager"
                      value={newBranch.manager}
                      onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="editAddress" className="text-foreground">
                      Alamat Lengkap
                    </Label>
                    <Textarea
                      id="editAddress"
                      value={newBranch.address}
                      onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPhone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="editPhone"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEmail" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={newBranch.email}
                      onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editOpeningHours" className="text-foreground">
                      Jam Operasional
                    </Label>
                    <Select
                      value={newBranch.openingHours}
                      onValueChange={(value) => setNewBranch({ ...newBranch, openingHours: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 - 22:00">09:00 - 22:00</SelectItem>
                        <SelectItem value="10:00 - 23:00">10:00 - 23:00</SelectItem>
                        <SelectItem value="09:00 - 24:00">09:00 - 24:00</SelectItem>
                        <SelectItem value="24 Jam">24 Jam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editTotalUnits" className="text-foreground">
                      Jumlah PS Units
                    </Label>
                    <Input
                      id="editTotalUnits"
                      type="number"
                      value={newBranch.totalUnits}
                      onChange={(e) => setNewBranch({ ...newBranch, totalUnits: Number.parseInt(e.target.value) || 0 })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editDescription" className="text-foreground">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="editDescription"
                    value={newBranch.description}
                    onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingBranch(null)
                    }}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleEditBranch}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Perbarui Cabang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Branch Detail Modal */}
        {selectedBranch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Detail Cabang - {selectedBranch.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Informasi Umum</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Cabang:</span>
                        <span className="font-medium text-foreground">{selectedBranch.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manager:</span>
                        <span className="font-medium text-foreground">{selectedBranch.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Telepon:</span>
                        <span className="font-medium text-foreground">{selectedBranch.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-foreground">{selectedBranch.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jam Buka:</span>
                        <span className="font-medium text-foreground">{selectedBranch.openingHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Buka Sejak:</span>
                        <span className="font-medium text-foreground">{selectedBranch.openDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Performa & Statistik</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={getStatusColor(selectedBranch.status)}>
                          {selectedBranch.status === "active"
                            ? "Aktif"
                            : selectedBranch.status === "maintenance"
                              ? "Maintenance"
                              : "Tutup"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total PS Units:</span>
                        <span className="font-medium text-foreground">{selectedBranch.totalUnits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Units Aktif:</span>
                        <span className="font-medium text-foreground">{selectedBranch.activeUnits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance:</span>
                        <span className="font-medium text-foreground">{selectedBranch.maintenanceUnits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Pelanggan:</span>
                        <span className="font-medium text-foreground">
                          {selectedBranch.totalCustomers.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pendapatan Bulanan:</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(selectedBranch.monthlyRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-foreground">{selectedBranch.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Alamat Lengkap</h4>
                  <p className="text-muted-foreground">{selectedBranch.address}</p>
                </div>

                {selectedBranch.description && (
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Deskripsi</h4>
                    <p className="text-muted-foreground">{selectedBranch.description}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedBranch(null)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedBranch(null)
                      openEditModal(selectedBranch)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Edit Cabang
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

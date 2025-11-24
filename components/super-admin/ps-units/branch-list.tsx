"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { StatCard, FilterBar, ModalWrapper } from "@/components/super-admin/shared"
import { getStatusColor, getStatusLabel, generateBranchId } from "@/lib/utils/super-admin"
import type { Branch, BranchFormData } from "@/lib/types/super-admin"
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Gamepad2,
  MapPin,
  Phone,
  Mail,
  User,
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
    totalUnits: 26,
    activeUnits: 24,
    maintenanceUnits: 2,
    regularUnits: 20,
    vipUnits: 4,
    vvipUnits: 2,
  },
  {
    id: "BR002",
    name: "Jakarta Utara",
    address: "Jl. PlayStation Ave No. 456, Jakarta Utara, 14240",
    phone: "+62 21-2345-6789",
    email: "jakut@agagame.com",
    manager: "Jane Smith",
    status: "active",
    totalUnits: 21,
    activeUnits: 20,
    maintenanceUnits: 1,
    regularUnits: 15,
    vipUnits: 4,
    vvipUnits: 2,
  },
  {
    id: "BR003",
    name: "Bandung",
    address: "Jl. Game Station No. 789, Bandung, 40123",
    phone: "+62 22-3456-7890",
    email: "bandung@agagame.com",
    manager: "Mike Johnson",
    status: "active",
    totalUnits: 28,
    activeUnits: 28,
    maintenanceUnits: 0,
    regularUnits: 20,
    vipUnits: 5,
    vvipUnits: 3,
  },
  {
    id: "BR004",
    name: "Surabaya",
    address: "Jl. Gaming Hub No. 321, Surabaya, 60123",
    phone: "+62 31-4567-8901",
    email: "surabaya@agagame.com",
    manager: "Sarah Wilson",
    status: "maintenance",
    totalUnits: 18,
    activeUnits: 15,
    maintenanceUnits: 3,
    regularUnits: 12,
    vipUnits: 4,
    vvipUnits: 2,
  },
]

export function PSUnitsManagement() {
  const router = useRouter()
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
    regularUnits: 0,
    vipUnits: 0,
    vvipUnits: 0,
    description: "",
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
  const totalUnits = branches.reduce((sum, branch) => sum + branch.totalUnits, 0)
  const totalActive = branches.reduce((sum, branch) => sum + branch.activeUnits, 0)

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.address || !newBranch.phone || !newBranch.email || !newBranch.manager) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    const branchId = generateBranchId(branches.length)
    const totalUnits = newBranch.regularUnits + newBranch.vipUnits + newBranch.vvipUnits
    
    const branch: Branch = {
      id: branchId,
      name: newBranch.name,
      address: newBranch.address,
      phone: newBranch.phone,
      email: newBranch.email,
      manager: newBranch.manager,
      status: "active",
      totalUnits: totalUnits,
      activeUnits: totalUnits,
      maintenanceUnits: 0,
      regularUnits: newBranch.regularUnits,
      vipUnits: newBranch.vipUnits,
      vvipUnits: newBranch.vvipUnits,
    }

    setBranches((prev) => [...prev, branch])
    setNewBranch({
      name: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      regularUnits: 0,
      vipUnits: 0,
      vvipUnits: 0,
      description: "",
    })
    setShowAddModal(false)
    showSuccess("Cabang berhasil ditambahkan", `${branch.name} telah ditambahkan ke sistem`)
  }

  const handleEditBranch = () => {
    if (!newBranch.name || !newBranch.address || !newBranch.phone || !newBranch.email || !newBranch.manager) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    const totalUnits = newBranch.regularUnits + newBranch.vipUnits + newBranch.vvipUnits

    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === editingBranch.id
          ? {
              ...branch,
              name: newBranch.name,
              address: newBranch.address,
              phone: newBranch.phone,
              email: newBranch.email,
              manager: newBranch.manager,
              regularUnits: newBranch.regularUnits,
              vipUnits: newBranch.vipUnits,
              vvipUnits: newBranch.vvipUnits,
              totalUnits: totalUnits,
            }
          : branch
      )
    )

    setNewBranch({
      name: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      regularUnits: 0,
      vipUnits: 0,
      vvipUnits: 0,
      description: "",
    })
    setShowEditModal(false)
    setEditingBranch(null)
    showSuccess("Cabang berhasil diperbarui", `Data ${newBranch.name} telah diperbarui`)
  }

  const handleDeleteBranch = (branchId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus cabang ini?")) {
      setBranches((prev) => prev.filter((branch) => branch.id !== branchId))
      showSuccess("Cabang dihapus", "Cabang berhasil dihapus dari sistem")
    }
  }

  const openEditModal = (branch: any) => {
    setEditingBranch(branch)
    setNewBranch({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      regularUnits: branch.regularUnits,
      vipUnits: branch.vipUnits,
      vvipUnits: branch.vvipUnits,
      description: "",
    })
    setShowEditModal(true)
  }

  const handleViewUnits = (branchId: string) => {
    router.push(`/super-admin/ps-units/${branchId}`)
  }

  if (!user || user.role !== "super-admin") {
    return <div className="text-center py-20 text-foreground">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen PS Units Cabang</h1>
          <p className="text-muted-foreground">Kelola cabang rental PlayStation dan unit PS di setiap cabang</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Cabang"
            value={totalBranches}
            icon={<Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatCard
            title="Cabang Aktif"
            value={activeBranches}
            icon={<Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            valueColor="text-green-600 dark:text-green-400"
            delay="0.1s"
          />
          <StatCard
            title="Total PS Units"
            value={totalUnits}
            icon={<Gamepad2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            valueColor="text-purple-600 dark:text-purple-400"
            delay="0.2s"
          />
          <StatCard
            title="Units Aktif"
            value={totalActive}
            icon={<Gamepad2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            valueColor="text-green-600 dark:text-green-400"
            delay="0.3s"
          />
        </div>

        {/* Filters and Add Button */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddClick={() => setShowAddModal(true)}
          addButtonText="Tambah Cabang"
        />

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
                      <Badge className={getStatusColor(branch.status)}>{getStatusLabel(branch.status)}</Badge>
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
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{branch.manager}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Total Units</span>
                        <span className="font-bold text-foreground">{branch.totalUnits}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Reguler</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{branch.regularUnits}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">VIP</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">{branch.vipUnits}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">VVIP</span>
                        <span className="font-bold text-yellow-600 dark:text-yellow-400">{branch.vvipUnits}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewUnits(branch.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Gamepad2 className="w-4 h-4 mr-1" />
                      Kelola Unit PS
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBranch(branch)}
                      className="border-border hover:bg-muted"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Lihat Detail Cabang
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
                <CardTitle className="text-card-foreground">Tambah Cabang Rental PS Baru</CardTitle>
                <CardDescription>Masukkan informasi cabang dan jumlah unit PS yang tersedia</CardDescription>
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
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    Jumlah Unit PS per Kategori
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="regularUnits" className="text-foreground">
                        Unit Reguler
                      </Label>
                      <Input
                        id="regularUnits"
                        type="number"
                        min="0"
                        value={newBranch.regularUnits}
                        onChange={(e) =>
                          setNewBranch({ ...newBranch, regularUnits: parseInt(e.target.value) || 0 })
                        }
                        placeholder="0"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vipUnits" className="text-foreground">
                        Unit VIP
                      </Label>
                      <Input
                        id="vipUnits"
                        type="number"
                        min="0"
                        value={newBranch.vipUnits}
                        onChange={(e) => setNewBranch({ ...newBranch, vipUnits: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vvipUnits" className="text-foreground">
                        Unit VVIP
                      </Label>
                      <Input
                        id="vvipUnits"
                        type="number"
                        min="0"
                        value={newBranch.vvipUnits}
                        onChange={(e) => setNewBranch({ ...newBranch, vvipUnits: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Unit: {newBranch.regularUnits + newBranch.vipUnits + newBranch.vvipUnits}
                  </p>
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
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    Jumlah Unit PS per Kategori
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="editRegularUnits" className="text-foreground">
                        Unit Reguler
                      </Label>
                      <Input
                        id="editRegularUnits"
                        type="number"
                        min="0"
                        value={newBranch.regularUnits}
                        onChange={(e) =>
                          setNewBranch({ ...newBranch, regularUnits: parseInt(e.target.value) || 0 })
                        }
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editVipUnits" className="text-foreground">
                        Unit VIP
                      </Label>
                      <Input
                        id="editVipUnits"
                        type="number"
                        min="0"
                        value={newBranch.vipUnits}
                        onChange={(e) => setNewBranch({ ...newBranch, vipUnits: parseInt(e.target.value) || 0 })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editVvipUnits" className="text-foreground">
                        Unit VVIP
                      </Label>
                      <Input
                        id="editVvipUnits"
                        type="number"
                        min="0"
                        value={newBranch.vvipUnits}
                        onChange={(e) => setNewBranch({ ...newBranch, vvipUnits: parseInt(e.target.value) || 0 })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Unit: {newBranch.regularUnits + newBranch.vipUnits + newBranch.vvipUnits}
                  </p>
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
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={getStatusColor(selectedBranch.status)}>
                          {getStatusLabel(selectedBranch.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Unit PS & Statistik</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Units:</span>
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
                        <span className="text-muted-foreground">Unit Reguler:</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {selectedBranch.regularUnits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Unit VIP:</span>
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {selectedBranch.vipUnits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Unit VVIP:</span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                          {selectedBranch.vvipUnits}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Alamat Lengkap</h4>
                  <p className="text-muted-foreground">{selectedBranch.address}</p>
                </div>

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
                      handleViewUnits(selectedBranch.id)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Kelola Unit PS
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

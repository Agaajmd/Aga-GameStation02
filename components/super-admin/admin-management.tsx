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
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Clock,
  Key,
  EyeOff,
} from "lucide-react"

const mockAdmins = [
  {
    id: "ADM001",
    name: "John Doe",
    email: "john@agagame.com",
    phone: "081234567890",
    role: "admin",
    status: "active",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-20 14:30",
    permissions: ["booking", "customers", "inventory"],
    totalActions: 156,
    department: "Operation",
    workingHours: "09:00 - 17:00",
    workingDays: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    password: "admin123",
  },
  {
    id: "ADM002",
    name: "Jane Smith",
    email: "jane@agagame.com",
    phone: "081234567891",
    role: "admin",
    status: "active",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-20 09:15",
    permissions: ["booking", "customers"],
    totalActions: 89,
    department: "Operation",
    workingHours: "14:00 - 22:00",
    workingDays: ["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    password: "admin456",
  },
  {
    id: "ADM003",
    name: "Mike Johnson",
    email: "mike@agagame.com",
    phone: "081234567892",
    role: "admin",
    status: "inactive",
    joinDate: "2023-12-15",
    lastLogin: "2024-01-15 16:45",
    permissions: ["inventory"],
    totalActions: 234,
    department: "Operation",
    workingHours: "09:00 - 17:00",
    workingDays: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    password: "admin789",
  },
]

const workingDaysOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

export function AdminManagement() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [admins, setAdmins] = useState(mockAdmins)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordResetAdmin, setPasswordResetAdmin] = useState<any>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<any>(null)
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Operation",
    permissions: [] as string[],
    workingHours: "09:00 - 17:00",
    workingDays: [] as string[],
    password: "",
  })

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || admin.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAdmins = admins.length
  const activeAdmins = admins.filter((a) => a.status === "active").length
  const inactiveAdmins = admins.filter((a) => a.status === "inactive").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (adminId: string, newStatus: string) => {
    setAdmins((prev) => prev.map((admin) => (admin.id === adminId ? { ...admin, status: newStatus } : admin)))
    showSuccess("Status berhasil diubah", `Status admin telah diperbarui`)
  }

  const handleDeleteAdmin = (adminId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
      setAdmins((prev) => prev.filter((admin) => admin.id !== adminId))
      showSuccess("Admin dihapus", "Admin berhasil dihapus dari sistem")
    }
  }

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.phone || !newAdmin.password) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    if (newAdmin.workingDays.length === 0) {
      showError("Hari kerja belum dipilih", "Mohon pilih minimal satu hari kerja")
      return
    }

    const adminId = `ADM${String(admins.length + 1).padStart(3, "0")}`
    const admin = {
      id: adminId,
      ...newAdmin,
      role: "admin" as const,
      status: "active" as const,
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "-",
      totalActions: 0,
    }

    setAdmins((prev) => [...prev, admin])
    setNewAdmin({
      name: "",
      email: "",
      phone: "",
      department: "Operation",
      permissions: [],
      workingHours: "09:00 - 17:00",
      workingDays: [],
      password: "",
    })
    setShowAddModal(false)
    showSuccess("Admin berhasil ditambahkan", `${admin.name} telah ditambahkan sebagai admin`)
  }

  const handleEditAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.phone) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    if (newAdmin.workingDays.length === 0) {
      showError("Hari kerja belum dipilih", "Mohon pilih minimal satu hari kerja")
      return
    }

    setAdmins((prev) => prev.map((admin) => (admin.id === editingAdmin.id ? { ...admin, ...newAdmin } : admin)))

    setNewAdmin({
      name: "",
      email: "",
      phone: "",
      department: "Operation",
      permissions: [],
      workingHours: "09:00 - 17:00",
      workingDays: [],
      password: "",
    })
    setShowEditModal(false)
    setEditingAdmin(null)
    showSuccess("Admin berhasil diperbarui", `Data ${newAdmin.name} telah diperbarui`)
  }

  const handlePasswordReset = () => {
    if (!newPassword || !confirmPassword) {
      showError("Form tidak lengkap", "Mohon isi password baru dan konfirmasi password")
      return
    }

    if (newPassword !== confirmPassword) {
      showError("Password tidak cocok", "Password baru dan konfirmasi password harus sama")
      return
    }

    if (newPassword.length < 6) {
      showError("Password terlalu pendek", "Password minimal 6 karakter")
      return
    }

    setAdmins((prev) =>
      prev.map((admin) => (admin.id === passwordResetAdmin.id ? { ...admin, password: newPassword } : admin)),
    )

    setShowPasswordModal(false)
    setPasswordResetAdmin(null)
    setNewPassword("")
    setConfirmPassword("")
    showSuccess("Password berhasil diubah", "Password admin telah diperbarui")
  }

  const openPasswordModal = (admin: any) => {
    setPasswordResetAdmin(admin)
    setShowPasswordModal(true)
    setNewPassword("")
    setConfirmPassword("")
  }

  const openEditModal = (admin: any) => {
    setEditingAdmin(admin)
    setNewAdmin({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      department: admin.department,
      permissions: admin.permissions,
      workingHours: admin.workingHours,
      workingDays: admin.workingDays,
      password: admin.password,
    })
    setShowEditModal(true)
  }

  if (!user || user.role !== "super-admin") {
    return <div className="text-center py-20 text-foreground">Akses ditolak</div>
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen Admin</h1>
          <p className="text-muted-foreground">Kelola akun admin dan hak akses sistem</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Admin</p>
                  <p className="text-3xl font-bold text-foreground">{totalAdmins}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Admin Aktif</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeAdmins}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Admin Tidak Aktif</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{inactiveAdmins}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <Card className="mb-8 animate-slide-up border-border bg-card" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan nama, email, atau ID..."
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
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin List */}
        <div className="space-y-4">
          {filteredAdmins.map((admin, index) => (
            <Card
              key={admin.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300 border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{admin.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          #{admin.id} • {admin.department}
                        </p>
                      </div>
                      <Badge className={getStatusColor(admin.status)}>
                        {admin.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{admin.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Jam: {admin.workingHours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Bergabung: {admin.joinDate}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Hari Kerja:</span>
                        {admin.workingDays.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs border-border">
                            {day}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Permissions:</span>
                        {admin.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs border-border">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAdmin(admin)}
                      className="border-border hover:bg-muted"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(admin)}
                      className="border-border hover:bg-muted"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPasswordModal(admin)}
                      className="border-border hover:bg-muted"
                    >
                      <Key className="w-4 h-4 mr-1" />
                      Reset Password
                    </Button>
                    <Select value={admin.status} onValueChange={(value) => handleStatusChange(admin.id, value)}>
                      <SelectTrigger className="w-32 bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAdmin(admin.id)}
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

        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Tambah Admin Baru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
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
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      placeholder="admin@agagame.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={newAdmin.phone}
                      onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                      placeholder="081234567890"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      placeholder="Minimal 6 karakter"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workingHours" className="text-foreground">
                      Jam Kerja
                    </Label>
                    <Select
                      value={newAdmin.workingHours}
                      onValueChange={(value) => setNewAdmin({ ...newAdmin, workingHours: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Pilih jam kerja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 - 17:00">09:00 - 17:00 (Shift Pagi)</SelectItem>
                        <SelectItem value="14:00 - 22:00">14:00 - 22:00 (Shift Sore)</SelectItem>
                        <SelectItem value="22:00 - 06:00">22:00 - 06:00 (Shift Malam)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">Departemen</Label>
                    <Input value="Operation" disabled className="bg-muted border-border text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Hari Kerja</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {workingDaysOptions.map((day) => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newAdmin.workingDays.includes(day)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAdmin({ ...newAdmin, workingDays: [...newAdmin.workingDays, day] })
                            } else {
                              setNewAdmin({
                                ...newAdmin,
                                workingDays: newAdmin.workingDays.filter((d) => d !== day),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["booking", "customers", "inventory", "reports"].map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newAdmin.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAdmin({ ...newAdmin, permissions: [...newAdmin.permissions, permission] })
                            } else {
                              setNewAdmin({
                                ...newAdmin,
                                permissions: newAdmin.permissions.filter((p) => p !== permission),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm capitalize text-foreground">{permission}</span>
                      </label>
                    ))}
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
                    onClick={handleAddAdmin}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Tambah Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Admin Modal */}
        {showEditModal && editingAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Edit Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
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
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      placeholder="admin@agagame.com"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={newAdmin.phone}
                      onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                      placeholder="081234567890"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      placeholder="Minimal 6 karakter"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workingHours" className="text-foreground">
                      Jam Kerja
                    </Label>
                    <Select
                      value={newAdmin.workingHours}
                      onValueChange={(value) => setNewAdmin({ ...newAdmin, workingHours: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Pilih jam kerja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 - 17:00">09:00 - 17:00 (Shift Pagi)</SelectItem>
                        <SelectItem value="14:00 - 22:00">14:00 - 22:00 (Shift Sore)</SelectItem>
                        <SelectItem value="22:00 - 06:00">22:00 - 06:00 (Shift Malam)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">Departemen</Label>
                    <Input value="Operation" disabled className="bg-muted border-border text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Hari Kerja</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {workingDaysOptions.map((day) => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newAdmin.workingDays.includes(day)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAdmin({ ...newAdmin, workingDays: [...newAdmin.workingDays, day] })
                            } else {
                              setNewAdmin({
                                ...newAdmin,
                                workingDays: newAdmin.workingDays.filter((d) => d !== day),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["booking", "customers", "inventory", "reports"].map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newAdmin.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAdmin({ ...newAdmin, permissions: [...newAdmin.permissions, permission] })
                            } else {
                              setNewAdmin({
                                ...newAdmin,
                                permissions: newAdmin.permissions.filter((p) => p !== permission),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm capitalize text-foreground">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowEditModal(false)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleEditAdmin}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Perbarui Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Password Reset Modal */}
        {showPasswordModal && passwordResetAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Reset Password</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Mengubah password untuk: <strong>{passwordResetAdmin.name}</strong>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="newPassword" className="text-foreground">
                    Password Baru
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru"
                      className="bg-background border-border text-foreground pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Konfirmasi Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password baru"
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Password saat ini:</strong> {passwordResetAdmin.password}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setShowPasswordModal(false)
                      setPasswordResetAdmin(null)
                      setNewPassword("")
                      setConfirmPassword("")
                    }}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handlePasswordReset}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Ubah Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Detail Modal */}
        {selectedAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Detail Admin - {selectedAdmin.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Informasi Pribadi</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Admin:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Telepon:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Departemen:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bergabung:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Aktivitas & Jadwal</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={getStatusColor(selectedAdmin.status)}>
                          {selectedAdmin.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jam Kerja:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.workingHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Login Terakhir:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Aksi:</span>
                        <span className="font-medium text-foreground">{selectedAdmin.totalActions}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-muted-foreground">Hari Kerja:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedAdmin.workingDays.map((day: string) => (
                            <Badge key={day} variant="outline" className="text-xs border-border">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-muted-foreground">Permissions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedAdmin.permissions.map((permission: string) => (
                            <Badge key={permission} variant="outline" className="text-xs border-border">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedAdmin(null)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={() => openPasswordModal(selectedAdmin)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Reset Password
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

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { User, Mail, Phone, Calendar, Edit, Save, X, Shield, Crown, Gem, Lock, CheckCircle, Loader2 } from "lucide-react"
import { PasswordUpdate } from "./password-update"

export function ProfileContent() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [activeSecurityView, setActiveSecurityView] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  if (!user) {
    return (
      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Akses Ditolak</h2>
          <p className="text-muted-foreground">Silakan login terlebih dahulu</p>
        </div>
      </section>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showError("Form tidak lengkap", "Mohon isi semua field")
      return
    }

    setIsLoading(true)
    setLoadingMessage("Menyimpan perubahan...")

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsLoading(false)
      setIsEditing(false)
      setSuccessMessage("Profil berhasil diperbarui!")
      setShowSuccessModal(true)
      
      // Hide success modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      showError("Gagal memperbarui profil", "Silakan coba lagi")
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
    setIsEditing(false)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "customer":
        return <User className="w-5 h-5" />
      case "admin":
        return <Shield className="w-5 h-5" />
      case "super-admin":
        return <Crown className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "customer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "super-admin":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "customer":
        return "Pelanggan"
      case "admin":
        return "Admin"
      case "super-admin":
        return "Super Admin"
      default:
        return "Unknown"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 min-h-screen transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white animate-pulse">{loadingMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white text-center">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Render security components based on active view */}
        {activeSecurityView === "password" && (
          <PasswordUpdate onBack={() => setActiveSecurityView(null)} />
        )}
        
        {/* Main profile view */}
        {!activeSecurityView && (
          <>
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Profil Saya</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Kelola informasi akun dan preferensi Anda</p>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Informasi Pribadi</CardTitle>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                      className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                      Nama Lengkap
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-900 dark:text-white font-medium">{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-900 dark:text-white font-medium">{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                      Nomor Telepon
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-900 dark:text-white font-medium">{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Bergabung Sejak</Label>
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">2024-01-01</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <Card className="animate-slide-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-t-lg">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Status Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Role</span>
                  <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1 shadow-md`}>
                    {getRoleIcon(user.role)}
                    <span>{getRoleName(user.role)}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-green-900 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Status</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 shadow-md">Aktif</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">ID Pengguna</span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{user.id || "USR001"}</span>
                </div>
              </CardContent>
            </Card>

            {user.role === "customer" && (
              <Card className="animate-slide-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "0.2s" }}>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 rounded-t-lg">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Statistik Gaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Booking</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-green-900 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Jam Bermain</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">48 jam</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Game Favorit</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">FIFA 24</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-yellow-900 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Kategori Favorit</span>
                    <Badge variant="outline" className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                      <Gem className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="animate-slide-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-red-900 rounded-t-lg">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Keamanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-red-900 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 transition-all duration-200"
                  onClick={() => setActiveSecurityView("password")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Ubah Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )}
    </div>
    </section>
  )
}

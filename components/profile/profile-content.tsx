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
import { User, Mail, Phone, Calendar, Edit, Save, X, Shield, Crown, Gem, Lock, Clock } from "lucide-react"
import { PasswordUpdate } from "./password-update"
import { EmailVerification } from "./email-verification"
import { LoginHistory } from "./login-history"

export function ProfileContent() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [activeSecurityView, setActiveSecurityView] = useState<string | null>(null)
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

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditing(false)
      showSuccess("Profil berhasil diperbarui", "Data Anda telah disimpan")
    } catch (error) {
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
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render security components based on active view */}
        {activeSecurityView === "password" && (
          <PasswordUpdate onBack={() => setActiveSecurityView(null)} />
        )}
        {activeSecurityView === "email" && (
          <EmailVerification onBack={() => setActiveSecurityView(null)} />
        )}
        {activeSecurityView === "history" && (
          <LoginHistory onBack={() => setActiveSecurityView(null)} />
        )}
        
        {/* Main profile view */}
        {!activeSecurityView && (
          <>
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Profil Saya</h1>
              <p className="text-muted-foreground">Kelola informasi akun dan preferensi Anda</p>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up bg-card border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-2xl text-card-foreground">Informasi Pribadi</CardTitle>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="border-border hover:bg-muted bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nama Lengkap
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Nomor Telepon
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Bergabung Sejak</Label>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">2024-01-01</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <Card className="animate-slide-up bg-card border-border shadow-lg" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Status Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1`}>
                    {getRoleIcon(user.role)}
                    <span>{getRoleName(user.role)}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Aktif</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ID Pengguna</span>
                  <span className="text-sm font-mono text-foreground">{user.id || "USR001"}</span>
                </div>
              </CardContent>
            </Card>

            {user.role === "customer" && (
              <Card className="animate-slide-up bg-card border-border shadow-lg" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">Statistik Gaming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Booking</span>
                    <span className="text-lg font-bold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jam Bermain</span>
                    <span className="text-lg font-bold text-foreground">48 jam</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Game Favorit</span>
                    <span className="text-sm text-foreground">FIFA 24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kategori Favorit</span>
                    <Badge variant="outline" className="border-border">
                      <Gem className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="animate-slide-up bg-card border-border shadow-lg" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Keamanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-muted bg-transparent"
                  onClick={() => setActiveSecurityView("password")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Ubah Password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-muted bg-transparent"
                  onClick={() => setActiveSecurityView("email")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Verifikasi Email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-muted bg-transparent"
                  onClick={() => setActiveSecurityView("history")}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Riwayat Login
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

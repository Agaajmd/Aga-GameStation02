"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/providers/toast-provider"
import { Building2, MapPin, Phone, Mail, Clock, User, Gamepad2, ArrowLeft } from "lucide-react"

export function AddBranchForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
    openingHours: "10:00 - 23:00",
    description: "",
    totalUnits: 20,
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validasi
    if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.manager) {
      showError("Form tidak lengkap", "Mohon lengkapi semua field yang diperlukan")
      return
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showError("Email tidak valid", "Mohon masukkan email yang valid")
      return
    }

    // Validasi nomor telepon
    if (formData.phone.length < 10) {
      showError("Nomor telepon tidak valid", "Mohon masukkan nomor telepon yang valid")
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement API call untuk menyimpan data cabang
      // const response = await fetch('/api/branches', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      showSuccess("Cabang berhasil ditambahkan", `${formData.name} telah ditambahkan ke sistem`)
      
      // Reset form
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        manager: "",
        openingHours: "10:00 - 23:00",
        description: "",
        totalUnits: 20,
      })

      // Redirect ke halaman daftar cabang
      setTimeout(() => {
        router.push("/super-admin/cabang")
      }, 1500)
      
    } catch (error) {
      showError("Gagal menambahkan cabang", "Terjadi kesalahan saat menyimpan data")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.role !== "super-admin") {
    return (
      <div className="text-center py-20 text-foreground">
        <p className="text-xl">Akses ditolak. Halaman ini hanya untuk Super Admin.</p>
      </div>
    )
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/super-admin/cabang")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Cabang
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Tambah Cabang Baru</h1>
          <p className="text-muted-foreground">Lengkapi form di bawah untuk menambahkan cabang baru</p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Building2 className="w-5 h-5" />
              Informasi Cabang
            </CardTitle>
            <CardDescription>
              Masukkan detail lengkap cabang yang akan ditambahkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informasi Dasar */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Informasi Dasar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nama Cabang <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="contoh: Jakarta Selatan"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manager" className="text-foreground flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Nama Manager <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="manager"
                      value={formData.manager}
                      onChange={(e) => handleChange("manager", e.target.value)}
                      placeholder="contoh: John Doe"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Jl. Gaming Center No. 123, Jakarta Selatan, 12345"
                    className="bg-background border-border text-foreground min-h-[80px]"
                    required
                  />
                </div>
              </div>

              {/* Kontak */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Kontak</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Nomor Telepon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+62 21-1234-5678"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="cabang@agagame.com"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Operasional */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Operasional</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingHours" className="text-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Jam Operasional <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.openingHours}
                      onValueChange={(value) => handleChange("openingHours", value)}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00 - 22:00">08:00 - 22:00</SelectItem>
                        <SelectItem value="09:00 - 22:00">09:00 - 22:00</SelectItem>
                        <SelectItem value="10:00 - 23:00">10:00 - 23:00</SelectItem>
                        <SelectItem value="09:00 - 24:00">09:00 - 24:00</SelectItem>
                        <SelectItem value="10:00 - 24:00">10:00 - 24:00</SelectItem>
                        <SelectItem value="24 Jam">24 Jam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalUnits" className="text-foreground flex items-center gap-2">
                      <Gamepad2 className="w-3 h-3" />
                      Jumlah PS Units <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.totalUnits}
                      onChange={(e) => handleChange("totalUnits", parseInt(e.target.value) || 0)}
                      placeholder="20"
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Deskripsi Cabang (Opsional)
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Deskripsi singkat tentang cabang ini..."
                  className="bg-background border-border text-foreground min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Tambahkan informasi tambahan seperti fasilitas khusus, lokasi strategis, dll.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/super-admin/cabang")}
                  className="flex-1 border-border hover:bg-muted"
                  disabled={isLoading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4 mr-2" />
                      Tambah Cabang
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Informasi Penting
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Pastikan semua informasi yang dimasukkan sudah benar</li>
                  <li>• Alamat email akan digunakan untuk korespondensi resmi</li>
                  <li>• Jumlah PS Units dapat diubah kemudian sesuai kebutuhan</li>
                  <li>• Cabang baru akan otomatis berstatus "Aktif"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

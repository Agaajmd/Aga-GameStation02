"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/providers/toast-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react"

interface PasswordUpdateProps {
  onBack: () => void
}

export function PasswordUpdate({ onBack }: PasswordUpdateProps) {
  const { showSuccess, showError } = useToast()
  const { user } = useAuth()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      showError("Form tidak lengkap", "Mohon isi semua field")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError("Password tidak cocok", "Password baru dan konfirmasi password tidak sama")
      return
    }

    if (formData.newPassword.length < 6) {
      showError("Password terlalu pendek", "Password minimal 6 karakter")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      showSuccess("Password berhasil diubah", "Password Anda telah diperbarui")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      onBack()
    } catch (error) {
      showError("Gagal mengubah password", "Silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-slide-up">
      <Card className="bg-card border-border shadow-lg max-w-2xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Ubah Password</CardTitle>
              <p className="text-muted-foreground">Perbarui password untuk keamanan akun Anda</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-foreground">
                Password Saat Ini
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Masukkan password saat ini"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-foreground">
                Password Baru
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Masukkan password baru"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Password minimal 6 karakter</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Konfirmasi Password Baru
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground pr-10"
                  placeholder="Konfirmasi password baru"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Memperbarui...
                  </>
                ) : (
                  "Perbarui Password"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-border hover:bg-muted"
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

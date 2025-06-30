"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/providers/toast-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Send } from "lucide-react"

interface EmailVerificationProps {
  onBack: () => void
}

export function EmailVerification({ onBack }: EmailVerificationProps) {
  const { showSuccess, showError } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [isChangingEmail, setIsChangingEmail] = useState(false)

  const handleSendVerification = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setVerificationSent(true)
      showSuccess("Kode verifikasi terkirim", "Silakan cek email Anda")
    } catch (error) {
      showError("Gagal mengirim verifikasi", "Silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      showError("Kode verifikasi kosong", "Mohon masukkan kode verifikasi")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      showSuccess("Email berhasil diverifikasi", "Email Anda telah terverifikasi")
      setVerificationSent(false)
      setVerificationCode("")
    } catch (error) {
      showError("Kode verifikasi salah", "Silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeEmail = async () => {
    if (!newEmail) {
      showError("Email kosong", "Mohon masukkan email baru")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
      showError("Format email salah", "Mohon masukkan email yang valid")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      showSuccess("Email berhasil diubah", "Email Anda telah diperbarui")
      setNewEmail("")
      setIsChangingEmail(false)
    } catch (error) {
      showError("Gagal mengubah email", "Silakan coba lagi")
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
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Verifikasi Email</CardTitle>
              <p className="text-muted-foreground">Kelola verifikasi dan perubahan email</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Email Status */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground">Email saat ini</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Terverifikasi
              </Badge>
            </div>
          </div>

          {/* Send Verification */}
          {!verificationSent && !isChangingEmail && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Kirim ulang verifikasi email atau ubah email</span>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleSendVerification}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Verifikasi
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsChangingEmail(true)}
                  className="border-border hover:bg-muted"
                >
                  Ubah Email
                </Button>
              </div>
            </div>
          )}

          {/* Verification Code Input */}
          {verificationSent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-foreground">
                  Kode Verifikasi
                </Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="bg-background border-border text-foreground"
                  placeholder="Masukkan 6 digit kode verifikasi"
                  maxLength={6}
                />
                <p className="text-sm text-muted-foreground">
                  Kode verifikasi telah dikirim ke {user?.email}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleVerifyCode}
                  disabled={isLoading || !verificationCode}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Memverifikasi...
                    </>
                  ) : (
                    "Verifikasi"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVerificationSent(false)
                    setVerificationCode("")
                  }}
                  className="border-border hover:bg-muted"
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {/* Change Email */}
          {isChangingEmail && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newEmail" className="text-foreground">
                  Email Baru
                </Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-background border-border text-foreground"
                  placeholder="Masukkan email baru"
                />
                <p className="text-sm text-muted-foreground">
                  Email baru akan memerlukan verifikasi
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleChangeEmail}
                  disabled={isLoading || !newEmail}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Mengubah...
                    </>
                  ) : (
                    "Ubah Email"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsChangingEmail(false)
                    setNewEmail("")
                  }}
                  className="border-border hover:bg-muted"
                >
                  Batal
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

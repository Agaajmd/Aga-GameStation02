"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { ArrowLeft, Clock, MapPin, Monitor, Shield } from "lucide-react"

interface LoginHistoryProps {
  onBack: () => void
}

// Mock data for login history
const loginHistory = [
  {
    id: 1,
    date: "2024-06-30",
    time: "14:30:25",
    location: "Jakarta, Indonesia",
    device: "Chrome on Windows",
    ip: "192.168.1.100",
    status: "success"
  },
  {
    id: 2,
    date: "2024-06-29",
    time: "09:15:42",
    location: "Jakarta, Indonesia", 
    device: "Safari on iPhone",
    ip: "192.168.1.101",
    status: "success"
  },
  {
    id: 3,
    date: "2024-06-28",
    time: "19:45:12",
    location: "Bandung, Indonesia",
    device: "Chrome on Android",
    ip: "203.142.45.67",
    status: "success"
  },
  {
    id: 4,
    date: "2024-06-27",
    time: "22:30:08",
    location: "Unknown Location",
    device: "Firefox on Linux",
    ip: "185.234.67.89",
    status: "failed"
  },
  {
    id: 5,
    date: "2024-06-26",
    time: "16:20:33",
    location: "Jakarta, Indonesia",
    device: "Chrome on Windows",
    ip: "192.168.1.100",
    status: "success"
  }
]

export function LoginHistory({ onBack }: LoginHistoryProps) {
  const { user } = useAuth()

  const getStatusBadge = (status: string) => {
    if (status === "success") {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <Shield className="w-3 h-3 mr-1" />
          Berhasil
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          <Shield className="w-3 h-3 mr-1" />
          Gagal
        </Badge>
      )
    }
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="animate-slide-up">
      <Card className="bg-card border-border shadow-lg max-w-4xl mx-auto">
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
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Riwayat Login</CardTitle>
              <p className="text-muted-foreground">Aktivitas login untuk akun {user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div
                key={login.id}
                className="p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {formatDate(login.date)} - {login.time}
                        </span>
                      </div>
                      {getStatusBadge(login.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Lokasi:</span>
                        <span className="text-foreground">{login.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Perangkat:</span>
                        <span className="text-foreground">{login.device}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">IP:</span>
                        <span className="text-foreground font-mono text-xs">{login.ip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Tips Keamanan</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Jika Anda melihat aktivitas yang mencurigakan, segera ubah password</li>
                  <li>• Selalu logout dari perangkat yang tidak Anda kenali</li>
                  <li>• Gunakan password yang kuat dan unik</li>
                  <li>• Aktifkan verifikasi email untuk keamanan tambahan</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

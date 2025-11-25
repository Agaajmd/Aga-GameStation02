"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, MessageCircle, Mail, Instagram } from "lucide-react"

export function ContactSection() {
  const branches = [
    {
      name: "Aga Game Station Kelapa Gading",
      address: "Jl. Boulevard Raya No. 123, Kelapa Gading, Jakarta Utara",
      phone: "+62 21 4567 8901",
      hours: "24 Jam",
      maps: "https://maps.google.com",
    },
    {
      name: "Aga Game Station Senayan",
      address: "Jl. Asia Afrika No. 456, Senayan, Jakarta Pusat",
      phone: "+62 21 4567 8902",
      hours: "24 Jam",
      maps: "https://maps.google.com",
    },
    {
      name: "Aga Game Station PIK",
      address: "Jl. Pantai Indah Kapuk No. 789, PIK, Jakarta Utara",
      phone: "+62 21 4567 8903",
      hours: "24 Jam",
      maps: "https://maps.google.com",
    },
  ]

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      value: "+62 812 3456 7890",
      link: "https://wa.me/6281234567890",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      name: "Email",
      icon: Mail,
      value: "info@agagame.com",
      link: "mailto:info@agagame.com",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6">Hubungi Kami</h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Kontak Utama */}
          <div className="space-y-8">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6">Kontak Utama</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Card key={social.name} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${social.bgColor} rounded-full flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${social.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm mb-1">{social.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{social.value}</p>
                          <Button size="sm" variant="outline" className="border-border text-foreground h-8 text-xs" onClick={() => window.open(social.link, "_blank")}>Hubungi</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-bold text-foreground">24 Jam / Tetap Buka</span>
                </div>
                <p className="text-sm text-muted-foreground">Senin - Minggu & Hari Libur Nasional</p>
              </CardContent>
            </Card>
          </div>
          {/* Lokasi Cabang */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6">Lokasi Cabang</h3>
            <div className="space-y-4">
              {branches.map((branch, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{branch.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{branch.address}</p>
                        <Button size="sm" variant="outline" className="border-border text-foreground h-8 text-xs" onClick={() => window.open(branch.maps, "_blank")}>Lihat di Maps</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

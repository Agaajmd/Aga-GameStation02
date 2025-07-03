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
      name: "Instagram",
      icon: Instagram,
      value: "@agagamestation",
      link: "https://instagram.com/agagamestation",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-950",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8 lg:space-y-12">
            {/* Social Media */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6 lg:mb-8">Kontak Langsung</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Card
                      key={social.name}
                      className="group hover:shadow-lg transition-all duration-300 bg-card border-border"
                    >
                      <CardContent className="p-4 lg:p-6">
                        <div className="text-center">
                          <div
                            className={`w-12 h-12 lg:w-16 lg:h-16 ${social.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4`}
                          >
                            <IconComponent className={`w-6 h-6 lg:w-8 lg:h-8 ${social.color}`} />
                          </div>
                          <h4 className="font-medium text-foreground mb-1 lg:mb-2 text-sm lg:text-base">{social.name}</h4>
                          <p className="text-sm lg:text-base text-muted-foreground mb-3 lg:mb-4">{social.value}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-border text-foreground hover:bg-muted bg-transparent h-8 lg:h-10 text-xs lg:text-sm"
                            onClick={() => window.open(social.link, "_blank")}
                          >
                            Hubungi
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Operating Hours */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">Jam Operasional</h3>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground lg:text-lg">Senin - Minggu</span>
                    <span className="font-medium text-foreground lg:text-lg">24 Jam</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground lg:text-lg">Hari Libur Nasional</span>
                    <span className="font-medium text-foreground lg:text-lg">Tetap Buka</span>
                  </div>
                  <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm lg:text-base text-green-700 dark:text-green-300 text-center">
                      🎮 Siap melayani gamer 24/7 tanpa henti!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Branch Locations */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6 lg:mb-8">Lokasi Cabang</h3>
            <div className="space-y-4 lg:space-y-6">
              {branches.map((branch, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start space-x-4 lg:space-x-6">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-2 lg:mb-3 text-base lg:text-lg">{branch.name}</h4>
                        <p className="text-sm lg:text-base text-muted-foreground mb-3 lg:mb-4">{branch.address}</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{branch.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{branch.hours}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4 border-border text-foreground hover:bg-muted bg-transparent"
                          onClick={() => window.open(branch.maps, "_blank")}
                        >
                          Lihat di Maps
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Butuh Bantuan Lebih Lanjut?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tim customer service kami siap membantu Anda dengan pertanyaan seputar booking, pembayaran, atau informasi
              lainnya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary text-white hover:opacity-90"
                onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted bg-transparent"
                onClick={() => window.open("mailto:info@agagame.com", "_blank")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Kirim Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Users, 
  Zap, 
  Gift, 
  Calendar, 
  ArrowRight, 
  FlameIcon as Fire, 
  Percent,
  Megaphone,
  Bell,
  Trophy,
  Info,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export function AnnouncementSection() {
  const [isVisible, setIsVisible] = useState(false)

  const announcements = [
    {
      id: 1,
      title: "🔥 Flash Sale PlayStation 5 - Diskon 50%!",
      description: "BREAKING: Flash sale terbesar tahun ini! PlayStation 5 dengan diskon hingga 50% hanya untuk 24 jam ke depan.",
      image: "/imgVIP1.jpg",
      type: "promo",
      priority: "urgent",
      discount: "50%",
      originalPrice: "Rp 20.000/jam",
      discountPrice: "Rp 10.000/jam",
      validUntil: "2024-12-31",
      isFlashSale: true,
      isActive: true,
      ctaText: "Ambil Promo",
      ctaLink: "/booking"
    },
    {
      id: 2,
      title: "📢 Update: Jam Operasional Baru Mulai Senin",
      description: "PENTING: Perubahan jam operasional gaming center mulai Senin depan. Buka lebih awal dan tutup lebih malam!",
      image: "/imgVIP2.jpg",
      type: "update",
      priority: "high",
      validUntil: "2024-12-31",
      isFlashSale: false,
      isActive: true,
      ctaText: "Booking Sekarang",
      ctaLink: "/booking"
    },
    {
      id: 3,
      title: "🏆 Turnamen FIFA 24 Championship - Prize Pool 10 Juta!",
      description: "Daftarkan diri untuk turnamen FIFA 24 terbesar dengan total hadiah 10 juta rupiah! Registrasi terbuka.",
      image: "/imgVIP3.jpg",
      type: "tournament",
      priority: "medium",
      validUntil: "2024-12-20",
      isFlashSale: false,
      isActive: true,
      ctaText: "Daftar Turnamen",
      ctaLink: "https://forms.google.com/tournament-fifa24", // Google Form link
      isExternal: true
    },
  ]

  const typeColors = {
    promo: "bg-green-500",
    update: "bg-blue-500", 
    tournament: "bg-purple-500"
  }

  const priorityColors = {
    urgent: "bg-red-500",
    high: "bg-orange-500",
    medium: "bg-yellow-500"
  }

  const filteredAnnouncements = announcements.filter((announcement) => announcement.isActive)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("announcement-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="announcement-section"
      className="py-16 lg:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="secondary" className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <Megaphone className="w-4 h-4 mr-1" />
            Pengumuman Terbaru
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pengumuman & Update Gaming
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dapatkan info terbaru tentang promo, turnamen, dan update penting dari gaming center kami.
          </p>
        </div>

        {/* Announcement Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {filteredAnnouncements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 h-full flex flex-col"
            >
              <div className="relative">
                <img
                  src={announcement.image || "/placeholder.svg"}
                  alt={announcement.title}
                  className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex flex-col gap-1 lg:gap-2">
                  {announcement.isFlashSale && (
                    <Badge className="bg-red-500 text-white animate-pulse text-xs">
                      <Fire className="w-3 h-3 mr-1" />
                      FLASH SALE
                    </Badge>
                  )}
                  
                  {/* Type Badge */}
                  <Badge className={`text-white text-xs ${typeColors[announcement.type as keyof typeof typeColors]}`}>
                    {announcement.type === 'promo' && <Gift className="w-3 h-3 mr-1" />}
                    {announcement.type === 'update' && <Bell className="w-3 h-3 mr-1" />}
                    {announcement.type === 'tournament' && <Trophy className="w-3 h-3 mr-1" />}
                    {announcement.type === 'promo' && 'PROMO'}
                    {announcement.type === 'update' && 'UPDATE'}
                    {announcement.type === 'tournament' && 'TURNAMEN'}
                  </Badge>

                  {/* Priority Badge */}
                  <Badge className={`text-white text-xs ${priorityColors[announcement.priority as keyof typeof priorityColors]}`}>
                    {announcement.priority === 'urgent' && 'URGENT'}
                    {announcement.priority === 'high' && 'PENTING'}
                    {announcement.priority === 'medium' && 'INFO'}
                  </Badge>

                  {/* Discount Badge for Promos */}
                  {announcement.type === 'promo' && announcement.discount && (
                    <Badge className="bg-green-500 text-white text-xs">
                      <Percent className="w-3 h-3 mr-1" />-{announcement.discount}
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4 lg:p-6 flex-1 flex flex-col">
                <div className="flex-1 mb-4">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base line-clamp-3">{announcement.description}</p>
                </div>

                {/* Price for Promos */}
                {announcement.type === 'promo' && announcement.discountPrice && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">{announcement.discountPrice}</span>
                    {announcement.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{announcement.originalPrice}</span>
                    )}
                  </div>
                )}

                {/* Valid Until */}
                <div className="flex items-center text-xs lg:text-sm text-gray-500 mb-4">
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  Berlaku hingga {new Date(announcement.validUntil).toLocaleDateString("id-ID")}
                </div>

                {/* CTA */}
                {announcement.isExternal ? (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 h-10 lg:h-12 text-sm lg:text-base"
                  >
                    <a href={announcement.ctaLink} target="_blank" rel="noopener noreferrer">
                      <Trophy className="w-4 h-4 mr-2" />
                      {announcement.ctaText}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-10 lg:h-12 text-sm lg:text-base"
                  >
                    <Link href={announcement.ctaLink}>
                      {announcement.type === 'promo' && <Gift className="w-4 h-4 mr-2" />}
                      {announcement.type === 'update' && <Info className="w-4 h-4 mr-2" />}
                      {announcement.type === 'tournament' && <Trophy className="w-4 h-4 mr-2" />}
                      {announcement.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 max-w-3xl lg:max-w-4xl mx-auto">
            <CardContent className="p-6 lg:p-8 xl:p-12">
              <Megaphone className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 animate-pulse" />
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">Masih Ada Pengumuman Lainnya!</h3>
              <p className="text-white/90 mb-6 lg:mb-8 text-base lg:text-lg max-w-2xl mx-auto">
                Lihat semua pengumuman penting dan jangan sampai terlewat info terbaru dari gaming center kami
              </p>
              <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg">
                <Link href="/promo">
                  Lihat Semua Pengumuman
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

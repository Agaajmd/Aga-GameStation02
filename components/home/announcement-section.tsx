"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Star, 
  Users, 
  Search, 
  Filter, 
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
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

  const categories = [
    { value: "all", label: "Semua Pengumuman", icon: Megaphone },
    { value: "promo", label: "Promosi & Diskon", icon: Gift },
    { value: "update", label: "Update & Info", icon: Bell },
    { value: "tournament", label: "Turnamen", icon: Trophy },
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

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || announcement.type === selectedCategory
    return matchesSearch && matchesCategory && announcement.isActive
  })

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

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [])

  return (
    <section
      id="announcement-section"
      className="py-16 lg:py-24 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
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

        {/* Flash Sale Banner */}
        <div
          className={`mb-12 lg:mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/imgVIP4.jpg')] bg-cover bg-center opacity-20" />
            <CardContent className="p-6 lg:p-8 xl:p-12 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                <div className="text-center lg:text-left flex-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 lg:mb-4">
                    <Fire className="w-6 h-6 lg:w-8 lg:h-8 animate-pulse" />
                    <Badge className="bg-white text-red-500 font-bold text-sm lg:text-base">FLASH SALE</Badge>
                  </div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">Diskon Hingga 50% Hari Ini!</h3>
                  <p className="text-white/90 text-base lg:text-lg">
                    Booking sekarang dan nikmati gaming dengan harga terbaik sepanjang masa
                  </p>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-sm lg:text-base font-medium mb-3 lg:mb-4">Berakhir dalam:</div>
                  <div className="flex gap-2 lg:gap-3 justify-center lg:justify-end">
                    <div className="bg-white/20 rounded-lg p-3 lg:p-4 min-w-[60px] lg:min-w-[80px]">
                      <div className="text-2xl lg:text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                      <div className="text-xs lg:text-sm">Jam</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 lg:p-4 min-w-[60px] lg:min-w-[80px]">
                      <div className="text-2xl lg:text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                      <div className="text-xs lg:text-sm">Menit</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 lg:p-4 min-w-[60px] lg:min-w-[80px]">
                      <div className="text-2xl lg:text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                      <div className="text-xs lg:text-sm">Detik</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div
          className={`mb-8 lg:mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-56 lg:w-64 h-12 text-base">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center">
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

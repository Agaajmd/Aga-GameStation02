"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Users, Search, Filter, Zap, Gift, Calendar, ArrowRight, FlameIcon as Fire, Percent } from "lucide-react"
import Link from "next/link"

export function PromoSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const [isVisible, setIsVisible] = useState(false)

  const promos = [
    {
      id: 1,
      title: "Flash Sale PlayStation 5",
      description: "Diskon hingga 50% untuk booking PS5 hari ini! Jangan sampai terlewat kesempatan emas ini.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "50%",
      originalPrice: "Rp 20.000/jam",
      discountPrice: "Rp 10.000/jam",
      validUntil: "2024-12-31",
      category: "console",
      rating: 4.9,
      reviews: 1250,
      saved: 450,
      isFlashSale: true,
      features: ["4K Gaming", "Ray Tracing", "SSD Ultra Cepat"],
    },
    {
      id: 2,
      title: "Paket Gaming Marathon",
      description: "Booking 5 jam dapat bonus 2 jam gratis! Perfect untuk gaming session yang panjang.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "40%",
      originalPrice: "Rp 100.000",
      discountPrice: "Rp 60.000",
      validUntil: "2024-12-25",
      category: "package",
      rating: 4.8,
      reviews: 890,
      saved: 320,
      isFlashSale: false,
      features: ["7 Jam Gaming", "Snack Gratis", "Minuman Unlimited"],
    },
    {
      id: 3,
      title: "Tournament Entry Promo",
      description: "Daftar turnamen dengan harga spesial dan kesempatan memenangkan hadiah jutaan rupiah.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "30%",
      originalPrice: "Rp 75.000",
      discountPrice: "Rp 52.500",
      validUntil: "2024-12-20",
      category: "tournament",
      rating: 4.9,
      reviews: 650,
      saved: 180,
      isFlashSale: false,
      features: ["Prize Pool 10 Juta", "Live Streaming", "Certificate"],
    },
  ]

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "console", label: "Konsol Gaming" },
    { value: "package", label: "Paket Gaming" },
    { value: "tournament", label: "Turnamen" },
  ]

  const filteredPromos = promos.filter((promo) => {
    const matchesSearch =
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || promo.category === selectedCategory
    return matchesSearch && matchesCategory
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

    const element = document.getElementById("promo-section")
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
      id="promo-section"
      className="py-16 lg:py-24 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="secondary" className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <Fire className="w-4 h-4 mr-1" />
            Promo Terbatas
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Promo Gaming Spektakuler
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan emas untuk gaming dengan harga terbaik. Promo terbatas waktu!
          </p>
        </div>

        {/* Flash Sale Banner */}
        <div
          className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=800')] bg-cover bg-center opacity-20" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <Fire className="w-6 h-6 animate-pulse" />
                    <Badge className="bg-white text-red-500 font-bold">FLASH SALE</Badge>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">Diskon Hingga 50% Hari Ini!</h3>
                  <p className="text-white/90">
                    Booking sekarang dan nikmati gaming dengan harga terbaik sepanjang masa
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-sm font-medium mb-2">Berakhir dalam:</div>
                  <div className="flex gap-2 justify-center">
                    <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                      <div className="text-xs">Jam</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                      <div className="text-xs">Menit</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                      <div className="text-xs">Detik</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari promo gaming..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Promo Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {filteredPromos.map((promo, index) => (
            <Card
              key={promo.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800"
            >
              <div className="relative">
                <img
                  src={promo.image || "/placeholder.svg"}
                  alt={promo.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {promo.isFlashSale && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <Fire className="w-3 h-3 mr-1" />
                      FLASH SALE
                    </Badge>
                  )}
                  <Badge className="bg-green-500 text-white">
                    <Percent className="w-3 h-3 mr-1" />-{promo.discount}
                  </Badge>
                </div>

                {/* Saved Count */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    <Users className="w-3 h-3 mr-1" />
                    {promo.saved} tersimpan
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{promo.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(promo.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{promo.rating}</span>
                  <span className="text-sm text-gray-500">({promo.reviews})</span>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {promo.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{promo.discountPrice}</span>
                  <span className="text-sm text-gray-500 line-through">{promo.originalPrice}</span>
                </div>

                {/* Valid Until */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  Berlaku hingga {new Date(promo.validUntil).toLocaleDateString("id-ID")}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Link href="/booking">
                    <Gift className="w-4 h-4 mr-2" />
                    Ambil Promo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">Masih Ada Promo Lainnya!</h3>
              <p className="text-white/90 mb-6">
                Lihat semua promo menarik dan jangan sampai terlewat kesempatan gaming dengan harga terbaik
              </p>
              <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/promo">
                  Lihat Semua Promo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

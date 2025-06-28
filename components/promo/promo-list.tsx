"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  Clock,
  Gift,
  ArrowRight,
  FlameIcon as Fire,
  Percent,
  Gamepad2,
  Trophy,
  Package,
  Share2,
  BookmarkPlus,
  Eye,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"

export function PromoList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedPromo, setSelectedPromo] = useState<any>(null)

  const promos = [
    {
      id: 1,
      title: "Flash Sale PlayStation 5",
      description:
        "Diskon hingga 50% untuk booking PS5 hari ini! Jangan sampai terlewat kesempatan emas ini untuk merasakan gaming next-gen.",
      longDescription:
        "PlayStation 5 dengan teknologi terdepan kini tersedia dengan harga spesial. Nikmati ray tracing, loading ultra cepat dengan SSD, dan DualSense controller yang revolusioner. Promo terbatas hanya untuk 100 booking pertama!",
      image: "/placeholder.svg?height=300&width=400",
      discount: "50%",
      originalPrice: "Rp 20.000/jam",
      discountPrice: "Rp 10.000/jam",
      validUntil: "2024-12-31",
      category: "console",
      rating: 4.9,
      reviews: 1250,
      saved: 450,
      views: 15420,
      likes: 890,
      isFlashSale: true,
      isPopular: true,
      features: ["4K Gaming", "Ray Tracing", "SSD Ultra Cepat", "DualSense Controller"],
      terms: [
        "Berlaku untuk member baru dan lama",
        "Maksimal 4 jam per booking",
        "Tidak dapat digabung dengan promo lain",
      ],
      stock: 25,
      totalStock: 100,
    },
    {
      id: 2,
      title: "Paket Gaming Marathon",
      description:
        "Booking 5 jam dapat bonus 2 jam gratis! Perfect untuk gaming session yang panjang dengan teman-teman.",
      longDescription:
        "Paket hemat untuk para gamer sejati! Dapatkan 7 jam gaming dengan harga 5 jam, plus snack gratis dan minuman unlimited. Cocok untuk turnamen pribadi atau gaming marathon bersama squad.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "40%",
      originalPrice: "Rp 100.000",
      discountPrice: "Rp 60.000",
      validUntil: "2024-12-25",
      category: "package",
      rating: 4.8,
      reviews: 890,
      saved: 320,
      views: 8750,
      likes: 445,
      isFlashSale: false,
      isPopular: true,
      features: ["7 Jam Gaming", "Snack Gratis", "Minuman Unlimited", "Private Room"],
      terms: ["Minimal booking H-1", "Berlaku untuk semua konsol", "Snack sesuai ketersediaan"],
      stock: 15,
      totalStock: 50,
    },
    {
      id: 3,
      title: "Tournament Entry Promo",
      description: "Daftar turnamen dengan harga spesial dan kesempatan memenangkan hadiah jutaan rupiah.",
      longDescription:
        "Ikuti turnamen gaming terbesar dengan prize pool fantastis! Kompetisi fair play dengan sistem ranking profesional. Live streaming di platform utama dan sertifikat untuk juara.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "30%",
      originalPrice: "Rp 75.000",
      discountPrice: "Rp 52.500",
      validUntil: "2024-12-20",
      category: "tournament",
      rating: 4.9,
      reviews: 650,
      saved: 180,
      views: 12300,
      likes: 720,
      isFlashSale: false,
      isPopular: false,
      features: ["Prize Pool 10 Juta", "Live Streaming", "Certificate", "Professional Setup"],
      terms: ["Registrasi ditutup H-3", "Wajib hadir tepat waktu", "Bawa ID Card asli"],
      stock: 8,
      totalStock: 32,
    },
    {
      id: 4,
      title: "Weekend Gaming Special",
      description: "Promo khusus weekend dengan diskon menarik untuk semua konsol gaming terpopuler.",
      longDescription:
        "Rayakan weekend dengan gaming seru! Diskon spesial untuk booking di hari Sabtu dan Minggu. Semua konsol tersedia dengan harga terbaik.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "25%",
      originalPrice: "Rp 16.000/jam",
      discountPrice: "Rp 12.000/jam",
      validUntil: "2024-12-22",
      category: "console",
      rating: 4.7,
      reviews: 420,
      saved: 150,
      views: 6800,
      likes: 280,
      isFlashSale: false,
      isPopular: false,
      features: ["All Console", "Weekend Only", "Extended Hours", "Free Drinks"],
      terms: ["Hanya berlaku Sabtu-Minggu", "Booking minimal 2 jam", "Subject to availability"],
      stock: 30,
      totalStock: 60,
    },
    {
      id: 5,
      title: "VIP Gaming Experience",
      description: "Pengalaman gaming premium dengan private room dan service eksklusif untuk para VIP.",
      longDescription:
        "Nikmati gaming dengan kemewahan penuh! Private room dengan AC dingin, kursi gaming premium, snack premium, dan dedicated staff. Perfect untuk special occasion.",
      image: "/placeholder.svg?height=300&width=400",
      discount: "20%",
      originalPrice: "Rp 50.000/jam",
      discountPrice: "Rp 40.000/jam",
      validUntil: "2024-12-30",
      category: "package",
      rating: 4.9,
      reviews: 280,
      saved: 95,
      views: 4200,
      likes: 180,
      isFlashSale: false,
      isPopular: false,
      features: ["Private Room", "Premium Snacks", "Dedicated Staff", "Gaming Chair"],
      terms: ["Booking minimal 3 jam", "Advance booking required", "Cancellation 24h before"],
      stock: 5,
      totalStock: 10,
    },
    {
      id: 6,
      title: "Student Discount Gaming",
      description: "Diskon khusus pelajar dan mahasiswa dengan menunjukkan kartu pelajar yang masih berlaku.",
      longDescription:
        "Promo spesial untuk para pelajar! Tunjukkan kartu pelajar atau kartu mahasiswa yang masih berlaku dan dapatkan diskon menarik. Gaming jadi lebih terjangkau!",
      image: "/placeholder.svg?height=300&width=400",
      discount: "35%",
      originalPrice: "Rp 15.000/jam",
      discountPrice: "Rp 9.750/jam",
      validUntil: "2024-12-31",
      category: "console",
      rating: 4.6,
      reviews: 680,
      saved: 240,
      views: 9500,
      likes: 380,
      isFlashSale: false,
      isPopular: true,
      features: ["Student Only", "Valid ID Required", "All Console", "Study Break Gaming"],
      terms: ["Wajib tunjukkan kartu pelajar", "Tidak berlaku saat weekend", "Maksimal 3 jam per hari"],
      stock: 20,
      totalStock: 40,
    },
  ]

  const categories = [
    { value: "all", label: "Semua Kategori", icon: Gift },
    { value: "console", label: "Konsol Gaming", icon: Gamepad2 },
    { value: "package", label: "Paket Gaming", icon: Package },
    { value: "tournament", label: "Turnamen", icon: Trophy },
  ]

  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "discount", label: "Diskon Terbesar" },
    { value: "popular", label: "Terpopuler" },
    { value: "rating", label: "Rating Tertinggi" },
    { value: "price-low", label: "Harga Terendah" },
    { value: "price-high", label: "Harga Tertinggi" },
  ]

  const filteredAndSortedPromos = promos
    .filter((promo) => {
      const matchesSearch =
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || promo.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return Number.parseInt(b.discount) - Number.parseInt(a.discount)
        case "popular":
          return b.saved - a.saved
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return (
            Number.parseInt(a.discountPrice.replace(/\D/g, "")) - Number.parseInt(b.discountPrice.replace(/\D/g, ""))
          )
        case "price-high":
          return (
            Number.parseInt(b.discountPrice.replace(/\D/g, "")) - Number.parseInt(a.discountPrice.replace(/\D/g, ""))
          )
        default:
          return b.id - a.id
      }
    })

  const handleSavePromo = (promoId: number) => {
    // Handle save promo logic
    console.log("Saved promo:", promoId)
  }

  const handleSharePromo = (promo: any) => {
    // Handle share promo logic
    if (navigator.share) {
      navigator.share({
        title: promo.title,
        text: promo.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Gift className="w-4 h-4 mr-1" />
            Promo Gaming
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Semua Promo Gaming Terbaik
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan promo gaming terbaik dan hemat lebih banyak untuk pengalaman gaming yang tak terlupakan
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari promo gaming..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-12">
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

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Menampilkan {filteredAndSortedPromos.length} dari {promos.length} promo
          </p>
        </div>

        {/* Promo Grid */}
        {filteredAndSortedPromos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredAndSortedPromos.map((promo) => (
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
                    {promo.isPopular && (
                      <Badge className="bg-purple-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        POPULER
                      </Badge>
                    )}
                    <Badge className="bg-green-500 text-white">
                      <Percent className="w-3 h-3 mr-1" />-{promo.discount}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white p-2"
                      onClick={() => handleSavePromo(promo.id)}
                    >
                      <BookmarkPlus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white p-2"
                      onClick={() => handleSharePromo(promo)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Stock Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      <Clock className="w-3 h-3 mr-1" />
                      {promo.stock} tersisa
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

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {promo.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {promo.likes}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {promo.saved}
                    </div>
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
                    <span className="text-sm text-gray-500">({promo.reviews} ulasan)</span>
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

                  {/* Stock Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Stok tersisa</span>
                      <span className="font-medium">
                        {promo.stock}/{promo.totalStock}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(promo.stock / promo.totalStock) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedPromo(promo)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{selectedPromo?.title}</DialogTitle>
                        </DialogHeader>
                        {selectedPromo && (
                          <div className="space-y-6">
                            <img
                              src={selectedPromo.image || "/placeholder.svg"}
                              alt={selectedPromo.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />

                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500 text-white">-{selectedPromo.discount}</Badge>
                              <span className="text-2xl font-bold text-blue-600">{selectedPromo.discountPrice}</span>
                              <span className="text-gray-500 line-through">{selectedPromo.originalPrice}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300">{selectedPromo.longDescription}</p>

                            <Tabs defaultValue="features" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="features">Fitur</TabsTrigger>
                                <TabsTrigger value="terms">Syarat & Ketentuan</TabsTrigger>
                              </TabsList>
                              <TabsContent value="features" className="space-y-2">
                                {selectedPromo.features.map((feature: string, idx: number) => (
                                  <div key={idx} className="flex items-center">
                                    <Gift className="w-4 h-4 mr-2 text-green-500" />
                                    {feature}
                                  </div>
                                ))}
                              </TabsContent>
                              <TabsContent value="terms" className="space-y-2">
                                {selectedPromo.terms.map((term: string, idx: number) => (
                                  <div key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                    {term}
                                  </div>
                                ))}
                              </TabsContent>
                            </Tabs>

                            <Button
                              asChild
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                              <Link href="/booking">
                                <Gift className="w-4 h-4 mr-2" />
                                Ambil Promo Sekarang
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Link href="/booking">
                        <Gift className="w-4 h-4 mr-2" />
                        Ambil Promo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada promo ditemukan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah filter pencarian atau kata kunci untuk menemukan promo yang sesuai
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSortBy("newest")
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Fire className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">Jangan Lewatkan Promo Terbaru!</h3>
              <p className="text-white/90 mb-6">
                Daftar newsletter untuk mendapatkan notifikasi promo terbaru dan penawaran eksklusif
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Email address"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

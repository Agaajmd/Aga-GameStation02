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
  Bell,
  Megaphone,
  AlertCircle,
  Info,
  CheckCircle,
  Zap,
  Settings,
  TrendingUp,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export function AnnouncementList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)

  const announcements = [
    {
      id: 1,
      title: "🔥 Flash Sale PlayStation 5 - Diskon 50%!",
      description:
        "BREAKING: Flash sale terbesar tahun ini! PlayStation 5 dengan diskon hingga 50% hanya untuk 24 jam ke depan. Jangan sampai terlewat!",
      longDescription:
        "Pengumuman penting untuk semua gamers! Kami mengadakan flash sale spektakuler untuk PlayStation 5 dengan diskon hingga 50%. Kesempatan emas ini hanya berlaku untuk 100 booking pertama dan terbatas waktu. Nikmati gaming next-gen dengan harga terbaik yang pernah ada!",
      image: "/imgVIP1.jpg",
      type: "promo",
      priority: "urgent",
      publishedAt: "2024-12-15T10:00:00Z",
      validUntil: "2024-12-16T23:59:59Z",
      author: "Admin Gaming",
      views: 15420,
      likes: 890,
      isPinned: true,
      isActive: true,
      tags: ["Flash Sale", "PlayStation 5", "Diskon", "Terbatas"],
      details: {
        discount: "50%",
        originalPrice: "Rp 20.000/jam",
        discountPrice: "Rp 10.000/jam",
        stock: 25,
        totalStock: 100,
      }
    },
    {
      id: 2,
      title: "📢 Update: Jam Operasional Baru Mulai Senin Depan",
      description:
        "PENTING: Perubahan jam operasional gaming center mulai Senin, 18 Desember 2024. Kami akan buka lebih awal dan tutup lebih malam!",
      longDescription:
        "Sesuai dengan permintaan member yang ingin gaming lebih fleksibel, kami dengan bangga mengumumkan perubahan jam operasional. Mulai Senin, 18 Desember 2024, gaming center akan buka dari jam 08:00 hingga 02:00 dini hari. Ini memberikan lebih banyak waktu untuk kalian menikmati gaming session!",
      image: "/imgVIP2.jpg",
      type: "update",
      priority: "high",
      publishedAt: "2024-12-14T14:30:00Z",
      validUntil: "2024-12-31T23:59:59Z",
      author: "Management",
      views: 8750,
      likes: 445,
      isPinned: true,
      isActive: true,
      tags: ["Jam Operasional", "Update", "Penting"],
      details: {
        oldHours: "10:00 - 24:00",
        newHours: "08:00 - 02:00",
        effectiveDate: "18 Desember 2024"
      }
    },
    {
      id: 3,
      title: "🏆 Turnamen FIFA 24 Championship - Prize Pool 10 Juta!",
      description: "Daftarkan diri kalian untuk turnamen FIFA 24 terbesar dengan total hadiah 10 juta rupiah! Registrasi dibuka sampai 20 Desember.",
      longDescription:
        "Gaming center mengadakan turnamen FIFA 24 Championship dengan format knockout system. Turnamen ini terbuka untuk semua level dengan sistem bracket yang fair. Pendaftaran gratis untuk member dan ada fee registrasi untuk non-member. Jangan lewatkan kesempatan menjadi champion!",
      image: "/imgVIP3.jpg",
      type: "event",
      priority: "medium",
      publishedAt: "2024-12-13T16:00:00Z",
      validUntil: "2024-12-20T23:59:59Z",
      author: "Event Manager",
      views: 12300,
      likes: 720,
      isPinned: false,
      isActive: true,
      tags: ["Turnamen", "FIFA 24", "Prize Pool", "Championship"],
      isExternal: true,
      externalLink: "https://forms.google.com/tournament-fifa24",
      details: {
        prizePool: "Rp 10.000.000",
        registrationFee: "Gratis (Member) / Rp 25.000 (Non-member)",
        maxParticipants: 64,
        tournamentDate: "22-23 Desember 2024"
      }
    },
    {
      id: 4,
      title: "💡 Tips Gaming: Optimalisasi Performa PlayStation",
      description: "Tips dan trik dari admin untuk mengoptimalkan performa gaming kalian. Baca panduan lengkap untuk pengalaman gaming yang lebih baik!",
      longDescription:
        "Tim teknis kami ingin berbagi beberapa tips untuk memaksimalkan pengalaman gaming kalian. Mulai dari setting display, audio, hingga tips ergonomis untuk gaming session yang panjang. Semua tips ini sudah teruji dan digunakan di gaming center kami.",
      image: "/imgVIP4.jpg",
      type: "tips",
      priority: "low",
      publishedAt: "2024-12-12T09:15:00Z",
      validUntil: "2024-12-31T23:59:59Z",
      author: "Technical Team",
      views: 6800,
      likes: 280,
      isPinned: false,
      isActive: true,
      tags: ["Tips", "Gaming", "Performa", "PlayStation"],
      details: {
        tipCategories: ["Display Settings", "Audio Setup", "Controller Tips", "Ergonomics"],
        readTime: "5 menit"
      }
    },
    {
      id: 5,
      title: "⚠️ Maintenance Server Online: 16 Desember 2024",
      description: "Pemberitahuan maintenance server untuk peningkatan kualitas koneksi internet. Maintenance dijadwalkan Senin, 16 Desember pagi.",
      longDescription:
        "Untuk meningkatkan kualitas gaming experience, kami akan melakukan maintenance server dan upgrade infrastruktur internet. Selama maintenance, beberapa layanan online gaming mungkin akan terganggu. Kami mohon pengertian dan akan menyelesaikan secepat mungkin.",
      image: "/imgVIP1.jpg",
      type: "maintenance",
      priority: "high",
      publishedAt: "2024-12-11T08:00:00Z",
      validUntil: "2024-12-16T12:00:00Z",
      author: "IT Support",
      views: 4200,
      likes: 180,
      isPinned: false,
      isActive: true,
      tags: ["Maintenance", "Server", "Internet", "Upgrade"],
      details: {
        maintenanceDate: "16 Desember 2024",
        startTime: "06:00 WIB",
        estimatedDuration: "2-3 jam",
        affectedServices: ["Online Gaming", "WiFi", "Live Streaming"]
      }
    },
    {
      id: 6,
      title: "🎉 Selamat! Gaming Center Raih Penghargaan Best Gaming Spot 2024",
      description: "Kabar gembira! Gaming center kita berhasil meraih penghargaan 'Best Gaming Spot 2024' dari Indonesian Gaming Association. Terima kasih atas dukungan kalian semua!",
      longDescription:
        "Dengan bangga kami umumkan bahwa gaming center telah meraih penghargaan 'Best Gaming Spot 2024' dari Indonesian Gaming Association. Penghargaan ini tidak lepas dari dukungan dan kepercayaan semua member yang telah setia gaming di tempat kami. Sebagai bentuk terima kasih, akan ada surprise special untuk semua member bulan ini!",
      image: "/imgVIP2.jpg",
      type: "achievement",
      priority: "medium",
      publishedAt: "2024-12-10T15:30:00Z",
      validUntil: "2024-12-31T23:59:59Z",
      author: "Management",
      views: 9500,
      likes: 1200,
      isPinned: true,
      isActive: true,
      tags: ["Penghargaan", "Achievement", "Best Gaming Spot", "Terima Kasih"],
      details: {
        award: "Best Gaming Spot 2024",
        organization: "Indonesian Gaming Association",
        criteria: "Fasilitas, Pelayanan, Komunitas",
        specialThanks: "Surprise coming soon untuk semua member!"
      }
    },
  ]

  const categories = [
    { value: "all", label: "Semua Pengumuman", icon: Megaphone },
    { value: "promo", label: "Promosi & Diskon", icon: Gift },
    { value: "update", label: "Update & Perubahan", icon: Settings },
    { value: "event", label: "Event & Turnamen", icon: Trophy },
    { value: "tips", label: "Tips & Tutorial", icon: Info },
    { value: "maintenance", label: "Maintenance", icon: AlertCircle },
    { value: "achievement", label: "Pencapaian", icon: Star },
  ]

  const priorityColors = {
    urgent: "bg-red-500",
    high: "bg-orange-500", 
    medium: "bg-yellow-500",
    low: "bg-green-500"
  }

  const typeIcons = {
    promo: Fire,
    update: Bell,
    event: Trophy,
    tips: Info,
    maintenance: AlertCircle,
    achievement: Star
  }
  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "priority", label: "Prioritas" },
    { value: "popular", label: "Terpopuler" },
    { value: "pinned", label: "Dipinkan" },
  ]

  const filteredAndSortedAnnouncements = announcements
    .filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || announcement.type === selectedCategory
      return matchesSearch && matchesCategory && announcement.isActive
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
        case "popular":
          return b.views - a.views
        case "pinned":
          return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })

  const handleBookmarkAnnouncement = (announcementId: number) => {
    console.log("Bookmarked announcement:", announcementId)
  }

  const handleShareAnnouncement = (announcement: any) => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const isExpiringSoon = (validUntil: string) => {
    const now = new Date()
    const expiry = new Date(validUntil)
    const timeDiff = expiry.getTime() - now.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff <= 3 && daysDiff > 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Megaphone className="w-4 h-4 mr-1" />
            Pengumuman Gaming Center
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pengumuman & Update Terbaru
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dapatkan informasi terbaru tentang promosi, update, dan berbagai pengumuman penting dari gaming center
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-56 h-12">
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
            Menampilkan {filteredAndSortedAnnouncements.length} dari {announcements.length} pengumuman
          </p>
        </div>

        {/* Announcements Grid */}
        {filteredAndSortedAnnouncements.length > 0 ? (
          <div className="space-y-6 mb-8">
            {filteredAndSortedAnnouncements.map((announcement) => {
              const TypeIcon = typeIcons[announcement.type as keyof typeof typeIcons] || Bell
              return (
                <Card
                  key={announcement.id}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 ${
                    announcement.isPinned ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="relative lg:w-80 h-48 lg:h-auto">
                        <img
                          src={announcement.image || "/imgVIP1.jpg"}
                          alt={announcement.title}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />

                        {/* Priority Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${priorityColors[announcement.priority as keyof typeof priorityColors]} text-white`}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {announcement.priority.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Pinned Badge */}
                        {announcement.isPinned && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              PINNED
                            </Badge>
                          </div>
                        )}

                        {/* Expiring Soon */}
                        {isExpiringSoon(announcement.validUntil) && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-red-500 text-white animate-pulse">
                              <Clock className="w-3 h-3 mr-1" />
                              Berakhir Segera
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.value === announcement.type)?.label}
                              </Badge>
                              {announcement.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                              {announcement.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                              {announcement.description}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleBookmarkAnnouncement(announcement.id)}
                            >
                              <BookmarkPlus className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleShareAnnouncement(announcement)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {announcement.views.toLocaleString()} views
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {announcement.likes} likes
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(announcement.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {announcement.author}
                          </div>
                        </div>

                        {/* Special Details for Different Types */}
                        {announcement.type === 'promo' && announcement.details && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-4">
                              <div>
                                <span className="text-2xl font-bold text-green-600">{announcement.details.discountPrice}</span>
                                <span className="text-sm text-gray-500 line-through ml-2">{announcement.details.originalPrice}</span>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                -{announcement.details.discount}
                              </Badge>
                              <div className="text-sm text-gray-600">
                                Stok: {announcement.details.stock}/{announcement.details.totalStock}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedAnnouncement(announcement)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Baca Selengkapnya
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <TypeIcon className="w-5 h-5" />
                                  {selectedAnnouncement?.title}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedAnnouncement && (
                                <div className="space-y-6">
                                  <img
                                    src={selectedAnnouncement.image || "/imgVIP1.jpg"}
                                    alt={selectedAnnouncement.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />

                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge className={`${priorityColors[selectedAnnouncement.priority as keyof typeof priorityColors]} text-white`}>
                                      {selectedAnnouncement.priority.toUpperCase()}
                                    </Badge>
                                    {selectedAnnouncement.tags.map((tag: string, idx: number) => (
                                      <Badge key={idx} variant="secondary">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>

                                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    {selectedAnnouncement.longDescription}
                                  </p>

                                  {/* Special Content Based on Type */}
                                  {selectedAnnouncement.type === 'promo' && selectedAnnouncement.details && (
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                      <h4 className="font-semibold mb-4 flex items-center">
                                        <Gift className="w-5 h-5 mr-2 text-green-600" />
                                        Detail Promo
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <span className="text-sm text-gray-600">Harga Normal:</span>
                                          <div className="text-lg line-through">{selectedAnnouncement.details.originalPrice}</div>
                                        </div>
                                        <div>
                                          <span className="text-sm text-gray-600">Harga Promo:</span>
                                          <div className="text-2xl font-bold text-green-600">{selectedAnnouncement.details.discountPrice}</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {selectedAnnouncement.type === 'event' && selectedAnnouncement.details && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                                      <h4 className="font-semibold mb-4 flex items-center">
                                        <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                                        Detail Event
                                      </h4>
                                      <div className="space-y-3">
                                        <div><strong>Prize Pool:</strong> {selectedAnnouncement.details.prizePool}</div>
                                        <div><strong>Biaya Daftar:</strong> {selectedAnnouncement.details.registrationFee}</div>
                                        <div><strong>Tanggal:</strong> {selectedAnnouncement.details.tournamentDate}</div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                                    <span>Dipublikasi: {formatDate(selectedAnnouncement.publishedAt)}</span>
                                    <span>Berlaku hingga: {formatDate(selectedAnnouncement.validUntil)}</span>
                                  </div>

                                  {selectedAnnouncement.type === 'promo' && (
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
                                  )}

                                  {selectedAnnouncement.type === 'event' && selectedAnnouncement.isExternal && (
                                    <Button
                                      asChild
                                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                      <a href={selectedAnnouncement.externalLink} target="_blank" rel="noopener noreferrer">
                                        <Trophy className="w-4 h-4 mr-2" />
                                        Daftar Turnamen
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                      </a>
                                    </Button>
                                  )}

                                  {selectedAnnouncement.type === 'event' && !selectedAnnouncement.isExternal && (
                                    <Button
                                      asChild
                                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                      <Link href="/booking">
                                        <Trophy className="w-4 h-4 mr-2" />
                                        Booking untuk Event
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                      </Link>
                                    </Button>
                                  )}

                                  {(selectedAnnouncement.type === 'update' || selectedAnnouncement.type === 'maintenance' || selectedAnnouncement.type === 'tips') && (
                                    <Button
                                      asChild
                                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                      <Link href="/booking">
                                        <Info className="w-4 h-4 mr-2" />
                                        Booking Sekarang
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {announcement.type === 'promo' && (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                              <Link href="/booking">
                                <Gift className="w-4 h-4 mr-2" />
                                Ambil Promo
                              </Link>
                            </Button>
                          )}

                          {announcement.type === 'event' && announcement.isExternal ? (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            >
                              <a href={announcement.externalLink} target="_blank" rel="noopener noreferrer">
                                <Trophy className="w-4 h-4 mr-2" />
                                Daftar Turnamen
                                <ExternalLink className="w-4 h-4 ml-1" />
                              </a>
                            </Button>
                          ) : announcement.type === 'event' ? (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            >
                              <Link href="/booking">
                                <Trophy className="w-4 h-4 mr-2" />
                                Booking untuk Event
                              </Link>
                            </Button>
                          ) : null}

                          {(announcement.type === 'update' || announcement.type === 'maintenance' || announcement.type === 'tips' || announcement.type === 'achievement') && (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                              <Link href="/booking">
                                <Info className="w-4 h-4 mr-2" />
                                Booking Sekarang
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Megaphone className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada pengumuman ditemukan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah filter pencarian atau kata kunci untuk menemukan pengumuman yang sesuai
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
              <Bell className="w-12 h-12 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">Jangan Lewatkan Update Terbaru!</h3>
              <p className="text-white/90 mb-6">
                Daftar newsletter untuk mendapatkan notifikasi pengumuman terbaru dan update penting dari gaming center
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

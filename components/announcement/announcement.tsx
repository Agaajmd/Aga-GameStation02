"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
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
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/providers/toast-provider"

export function AnnouncementList() {
    const categories = [
      { value: "promo", label: "Promosi & Diskon" },
      { value: "update", label: "Update & Perubahan" },
      { value: "event", label: "Event & Turnamen" },
      { value: "tips", label: "Tips & Tutorial" },
      { value: "maintenance", label: "Maintenance" },
      { value: "achievement", label: "Pencapaian" },
    ];
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const { showSuccess, showError, showInfo } = useToast()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0')
            setVisibleCards(prev => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    return () => observerRef.current?.disconnect()
  }, [])

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

  const filteredAndSortedAnnouncements = announcements
    .filter((announcement) => announcement.isActive)
    .sort((a, b) => {
      // Sort by pinned first, then by date
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

  const handleBookmarkAnnouncement = (announcementId: number) => {
    // Save bookmark to localStorage or backend
    // In production, call API to save bookmark
    try {
      // Simulate bookmark action
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedAnnouncements') || '[]')
      if (bookmarks.includes(announcementId)) {
        showInfo('Sudah Dibookmark', 'Pengumuman ini sudah ada di bookmark Anda')
      } else {
        bookmarks.push(announcementId)
        localStorage.setItem('bookmarkedAnnouncements', JSON.stringify(bookmarks))
        showSuccess('Bookmark Berhasil!', 'Pengumuman telah ditambahkan ke bookmark')
      }
    } catch (error) {
      showError('Bookmark Gagal', 'Terjadi kesalahan saat menyimpan bookmark')
    }
  }

  const handleShareAnnouncement = (announcement: any) => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.description,
        url: window.location.href,
      })
        .then(() => showSuccess('Berhasil Dibagikan!', 'Pengumuman telah dibagikan'))
        .catch(() => showError('Gagal Berbagi', 'Tidak dapat membagikan pengumuman'))
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showSuccess('Link Disalin!', 'Link pengumuman telah disalin ke clipboard'))
        .catch(() => showError('Gagal Menyalin', 'Tidak dapat menyalin link ke clipboard'))
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

        {/* Announcements Grid - Mobile Optimized */}
        {filteredAndSortedAnnouncements.length > 0 ? (
          <div className="space-y-4 mb-8">
            {filteredAndSortedAnnouncements.map((announcement) => {
              const TypeIcon = typeIcons[announcement.type as keyof typeof typeIcons] || Bell
              return (
                <Card
                  key={announcement.id}
                  className={`overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white dark:bg-gray-800 ${
                    announcement.isPinned ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* Mobile: Image first, then content */}
                      <div className="relative w-full h-40 sm:h-48 md:h-56">
                        <img
                          src={announcement.image || "/imgVIP1.jpg"}
                          alt={announcement.title}
                        className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />                        {/* Badges - Mobile optimized */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <Badge className={`${priorityColors[announcement.priority as keyof typeof priorityColors]} text-white text-xs px-2 py-1`}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {announcement.priority.toUpperCase()}
                          </Badge>
                          {announcement.isPinned && (
                            <Badge className="bg-yellow-500 text-white text-xs px-2 py-1">
                              <Star className="w-3 h-3 mr-1" />
                              PINNED
                            </Badge>
                          )}
                        </div>

                        {/* Expiring Soon */}
                        {isExpiringSoon(announcement.validUntil) && (
                          <div className="absolute bottom-2 left-2">
                            <Badge className="bg-red-500 text-white animate-pulse text-xs px-2 py-1">
                              <Clock className="w-3 h-3 mr-1" />
                              Berakhir Segera
                            </Badge>
                          </div>
                        )}

                        {/* Quick Actions - Mobile positioned on image */}
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 dark:bg-gray-800/95 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                            onClick={() => handleBookmarkAnnouncement(announcement.id)}
                          >
                            <BookmarkPlus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary" 
                            className="h-8 w-8 p-0 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 dark:bg-gray-800/95 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                            onClick={() => handleShareAnnouncement(announcement)}
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        {/* Tags */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            {categories.find(c => c.value === announcement.type)?.label}
                          </Badge>
                          {announcement.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                          {announcement.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
                          {announcement.description}
                        </p>

                        {/* Stats - Simplified for mobile */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {announcement.views > 1000 ? `${(announcement.views/1000).toFixed(1)}k` : announcement.views}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {announcement.likes}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(announcement.publishedAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short"
                            })}
                          </div>
                        </div>

                        {/* Special Details for Promo */}
                        {announcement.type === 'promo' && announcement.details && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-base sm:text-lg font-bold text-green-600">{announcement.details.discountPrice}</span>
                                <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">{announcement.details.originalPrice}</span>
                              </div>
                              <Badge className="bg-green-500 text-white text-xs">
                                -{announcement.details.discount}
                              </Badge>
                            </div>
                          </div>
                        )}

                        {/* Actions - Mobile optimized */}
                        <div className="flex flex-col gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-10 text-sm"
                                onClick={() => setSelectedAnnouncement(announcement)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Baca Selengkapnya
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-left">
                                  <TypeIcon className="w-5 h-5" />
                                  {selectedAnnouncement?.title}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedAnnouncement && (
                                <div className="space-y-4 sm:space-y-6">
                                  <img
                                    src={selectedAnnouncement.image || "/imgVIP1.jpg"}
                                    alt={selectedAnnouncement.title}
                                    className="w-full h-48 sm:h-64 object-cover rounded-3xl"
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

                                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                                    {selectedAnnouncement.longDescription}
                                  </p>

                                  {/* Special Content Based on Type */}
                                  {selectedAnnouncement.type === 'promo' && selectedAnnouncement.details && (
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 sm:p-6">
                                      <h4 className="font-semibold mb-4 flex items-center">
                                        <Gift className="w-5 h-5 mr-2 text-green-600" />
                                        Detail Promo
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <span className="text-sm text-gray-600">Harga Normal:</span>
                                          <div className="text-lg line-through">{selectedAnnouncement.details.originalPrice}</div>
                                        </div>
                                        <div>
                                          <span className="text-sm text-gray-600">Harga Promo:</span>
                                          <div className="text-xl sm:text-2xl font-bold text-green-600">{selectedAnnouncement.details.discountPrice}</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {selectedAnnouncement.type === 'event' && selectedAnnouncement.details && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 sm:p-6">
                                      <h4 className="font-semibold mb-4 flex items-center">
                                        <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                                        Detail Event
                                      </h4>
                                      <div className="space-y-3 text-sm sm:text-base">
                                        <div><strong>Prize Pool:</strong> {selectedAnnouncement.details.prizePool}</div>
                                        <div><strong>Biaya Daftar:</strong> {selectedAnnouncement.details.registrationFee}</div>
                                        <div><strong>Tanggal:</strong> {selectedAnnouncement.details.tournamentDate}</div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 border-t">
                                    <span>Dipublikasi: {formatDate(selectedAnnouncement.publishedAt)}</span>
                                    <span>Berlaku hingga: {formatDate(selectedAnnouncement.validUntil)}</span>
                                  </div>

                                  {/* Action Buttons in Dialog */}
                                  <div className="flex flex-col gap-2 sm:gap-3">
                                    {selectedAnnouncement.type === 'promo' && (
                                      <Button
                                        asChild
                                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
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
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
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
                                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                      >
                                        <Link href="/booking">
                                          <Info className="w-4 h-4 mr-2" />
                                          Booking Sekarang
                                          <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* Primary Action Buttons */}
                          <div className="flex flex-col gap-2">
                            {announcement.type === 'promo' && (
                              <Button
                                asChild
                                size="sm"
                                className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
                                size="sm"
                                className="w-full h-10 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
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
                                size="sm"
                                className="w-full h-10 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
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
                                size="sm"
                                className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Megaphone className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada pengumuman ditemukan</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Coba ubah filter pencarian atau kata kunci untuk menemukan pengumuman yang sesuai
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSortBy("newest")
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg"
                >
                  Reset Filter
                </Button>
              </div>
            </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <Bell className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Jangan Lewatkan Update Terbaru!</h3>
              <p className="text-white/90 mb-6 text-sm sm:text-base">
                Daftar newsletter untuk mendapatkan notifikasi pengumuman terbaru dan update penting dari gaming center
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Email address"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl h-12"
                />
                <Button 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100 border-0 rounded-xl h-12 px-6 font-medium shadow-lg"
                >
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

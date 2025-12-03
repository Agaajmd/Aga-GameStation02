"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Clock,
  Calendar,
  Gift,
  Trophy,
  Info,
  AlertCircle,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Copy,
  FileEdit,
  Archive,
  TrendingUp,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Announcement {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  type: "promo" | "update" | "event" | "tips" | "maintenance" | "achievement"
  priority: "urgent" | "high" | "medium" | "low"
  publishedAt: string
  validUntil: string
  author: string
  views: number
  likes: number
  isPinned: boolean
  isActive: boolean
  tags: string[]
  details?: any
  isExternal?: boolean
  externalLink?: string
}

export function AnnouncementManagement() {
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "🔥 Flash Sale PlayStation 5 - Diskon 50%!",
      description: "BREAKING: Flash sale terbesar tahun ini! PlayStation 5 dengan diskon hingga 50% hanya untuk 24 jam ke depan.",
      longDescription: "Pengumuman penting untuk semua gamers! Kami mengadakan flash sale spektakuler untuk PlayStation 5 dengan diskon hingga 50%. Kesempatan emas ini hanya berlaku untuk 100 booking pertama dan terbatas waktu. Nikmati gaming next-gen dengan harga terbaik yang pernah ada!",
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
      description: "PENTING: Perubahan jam operasional gaming center mulai Senin, 18 Desember 2024.",
      longDescription: "Sesuai dengan permintaan member yang ingin gaming lebih fleksibel, kami dengan bangga mengumumkan perubahan jam operasional. Mulai Senin, 18 Desember 2024, gaming center akan buka dari jam 08:00 hingga 02:00 dini hari.",
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
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: "",
    description: "",
    longDescription: "",
    image: "/imgVIP1.jpg",
    type: "promo",
    priority: "medium",
    publishedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: "Admin",
    views: 0,
    likes: 0,
    isPinned: false,
    isActive: true,
    tags: [],
    details: {},
  })

  const [tagInput, setTagInput] = useState("")
  const [imagePreview, setImagePreview] = useState<string>("/imgVIP1.jpg")

  const typeOptions = [
    { value: "promo", label: "Promosi & Diskon", icon: Gift },
    { value: "update", label: "Update & Perubahan", icon: Bell },
    { value: "event", label: "Event & Turnamen", icon: Trophy },
    { value: "tips", label: "Tips & Tutorial", icon: Info },
    { value: "maintenance", label: "Maintenance", icon: AlertCircle },
    { value: "achievement", label: "Pencapaian", icon: Star },
  ]

  const priorityOptions = [
    { value: "urgent", label: "Urgent", color: "bg-red-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "low", label: "Low", color: "bg-green-500" },
  ]

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || announcement.type === filterType
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && announcement.isActive) ||
                         (filterStatus === "inactive" && !announcement.isActive)
    return matchesSearch && matchesType && matchesStatus
  })

  const handleCreateAnnouncement = () => {
    const newAnnouncement: Announcement = {
      ...formData as Announcement,
      id: announcements.length + 1,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    }

    setAnnouncements([newAnnouncement, ...announcements])
    setIsCreateDialogOpen(false)
    resetForm()
    
    toast({
      title: "Pengumuman Berhasil Dibuat",
      description: "Pengumuman baru telah ditambahkan dan dapat dilihat oleh user.",
    })
  }

  const handleEditAnnouncement = () => {
    if (!selectedAnnouncement) return

    setAnnouncements(announcements.map(announcement => 
      announcement.id === selectedAnnouncement.id 
        ? { ...announcement, ...formData }
        : announcement
    ))
    
    setIsEditDialogOpen(false)
    setSelectedAnnouncement(null)
    resetForm()
    
    toast({
      title: "Pengumuman Berhasil Diupdate",
      description: "Perubahan telah disimpan.",
    })
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id))
    
    toast({
      title: "Pengumuman Dihapus",
      description: "Pengumuman telah dihapus dari sistem.",
      variant: "destructive",
    })
  }

  const handleToggleActive = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isActive: !announcement.isActive }
        : announcement
    ))
    
    toast({
      title: "Status Diubah",
      description: "Status pengumuman berhasil diubah.",
    })
  }

  const handleTogglePin = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isPinned: !announcement.isPinned }
        : announcement
    ))
    
    toast({
      title: "Pin Status Diubah",
      description: "Status pin pengumuman berhasil diubah.",
    })
  }

  const handleDuplicateAnnouncement = (announcement: Announcement) => {
    const duplicate: Announcement = {
      ...announcement,
      id: announcements.length + 1,
      title: `${announcement.title} (Copy)`,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    }
    
    setAnnouncements([duplicate, ...announcements])
    
    toast({
      title: "Pengumuman Diduplikasi",
      description: "Salinan pengumuman telah dibuat.",
    })
  }

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      description: announcement.description,
      longDescription: announcement.longDescription,
      image: announcement.image,
      type: announcement.type,
      priority: announcement.priority,
      publishedAt: announcement.publishedAt,
      validUntil: announcement.validUntil,
      author: announcement.author,
      isPinned: announcement.isPinned,
      isActive: announcement.isActive,
      tags: announcement.tags,
      details: announcement.details,
      isExternal: announcement.isExternal,
      externalLink: announcement.externalLink,
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      image: "/imgVIP1.jpg",
      type: "promo",
      priority: "medium",
      publishedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      author: "Admin",
      views: 0,
      likes: 0,
      isPinned: false,
      isActive: true,
      tags: [],
      details: {},
    })
    setTagInput("")
    setImagePreview("/imgVIP1.jpg")
  }

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (formData.tags) {
      setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const AnnouncementForm = () => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 pb-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold">
          Judul Pengumuman <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Contoh: 🔥 Flash Sale PlayStation 5 - Diskon 50%!"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold">
          Deskripsi Singkat <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Deskripsi singkat yang akan ditampilkan di kartu pengumuman (max 200 karakter)"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longDescription" className="text-sm font-semibold">
          Deskripsi Lengkap <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="longDescription"
          placeholder="Deskripsi lengkap yang akan ditampilkan saat user membuka detail pengumuman"
          value={formData.longDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, longDescription: e.target.value })}
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-semibold">
            Tipe Pengumuman <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-sm font-semibold">
            Prioritas <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${option.color} mr-2`}></div>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publishedAt" className="text-sm font-semibold">Tanggal Publikasi</Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, publishedAt: new Date(e.target.value).toISOString() })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="validUntil" className="text-sm font-semibold">Berlaku Hingga</Label>
          <Input
            id="validUntil"
            type="datetime-local"
            value={formData.validUntil ? new Date(formData.validUntil).toISOString().slice(0, 16) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, validUntil: new Date(e.target.value).toISOString() })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-sm font-semibold">URL Gambar</Label>
        {formData.image && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-border mb-2">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/imgVIP1.jpg'
              }}
            />
            <div className="absolute bottom-2 right-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setFormData({ ...formData, image: '/imgVIP1.jpg' })}
              >
                Reset
              </Button>
            </div>
          </div>
        )}
        <Input
          id="image"
          placeholder="/imgVIP1.jpg atau URL eksternal"
          value={formData.image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, image: e.target.value })}
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {['/imgVIP1.jpg', '/imgVIP2.jpg', '/imgVIP3.jpg', '/imgVIP4.jpg'].map((img) => (
            <Button
              key={img}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setFormData({ ...formData, image: img })}
              className="text-xs"
            >
              {img.replace('/img', '').replace('.jpg', '')}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Klik tombol di atas untuk memilih gambar cepat, atau masukkan URL custom</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="author" className="text-sm font-semibold">Penulis</Label>
        <Input
          id="author"
          placeholder="Nama penulis pengumuman"
          value={formData.author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, author: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold">Tags</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Tambah tag (tekan Enter atau klik Tambah)"
            value={tagInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
          />
          <Button type="button" variant="outline" onClick={handleAddTag}>
            Tambah
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="pl-2 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {formData.type === "promo" && (
        <div className="space-y-4 border-t pt-6 mt-2">
          <h4 className="font-bold text-base flex items-center text-primary">
            <Gift className="w-5 h-5 mr-2" />
            Detail Promo
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Diskon (%)</Label>
              <Input
                placeholder="50"
                value={formData.details?.discount || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, discount: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Harga Normal</Label>
              <Input
                placeholder="Rp 20.000/jam"
                value={formData.details?.originalPrice || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, originalPrice: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Harga Diskon</Label>
              <Input
                placeholder="Rp 10.000/jam"
                value={formData.details?.discountPrice || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, discountPrice: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Stok Tersedia</Label>
              <Input
                type="number"
                placeholder="100"
                value={formData.details?.totalStock || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, totalStock: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
          </div>
        </div>
      )}

      {formData.type === "event" && (
        <div className="space-y-4 border-t pt-6 mt-2">
          <h4 className="font-bold text-base flex items-center text-primary">
            <Trophy className="w-5 h-5 mr-2" />
            Detail Event
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Prize Pool</Label>
              <Input
                placeholder="Rp 10.000.000"
                value={formData.details?.prizePool || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, prizePool: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Biaya Registrasi</Label>
              <Input
                placeholder="Gratis (Member) / Rp 25.000 (Non-member)"
                value={formData.details?.registrationFee || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, registrationFee: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tanggal Event</Label>
              <Input
                placeholder="22-23 Desember 2024"
                value={formData.details?.tournamentDate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ 
                  ...formData, 
                  details: { ...formData.details, tournamentDate: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isExternal"
                  checked={formData.isExternal || false}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, isExternal: checked })}
                />
                <Label htmlFor="isExternal">Event External (Link ke form registrasi external)</Label>
              </div>
            </div>
            {formData.isExternal && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Link External</Label>
                <Input
                  placeholder="https://forms.google.com/tournament-fifa24"
                  value={formData.externalLink || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, externalLink: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-6 border-t pt-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="isPinned"
            checked={formData.isPinned}
            onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPinned: checked })}
          />
          <Label htmlFor="isPinned">Pin Pengumuman</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked: boolean) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">Aktif</Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Megaphone className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Manajemen Pengumuman
          </h1>
          <p className="text-sm text-muted-foreground">Kelola pengumuman dan update untuk user</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto" onClick={resetForm}>
              <Plus className="w-4 h-4" />
              Buat Pengumuman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Buat Pengumuman Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <AnnouncementForm />
            </div>
            <DialogFooter className="gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="w-full sm:w-auto">
                Batal
              </Button>
              <Button onClick={handleCreateAnnouncement} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Buat Pengumuman
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengumuman</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Semua pengumuman</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {announcements.filter(a => a.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ditampilkan ke user</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dipinkan</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {announcements.filter(a => a.isPinned).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pengumuman penting</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total views semua</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul & Tipe</TableHead>
                  <TableHead>Prioritas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Statistik</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.map((announcement) => {
                  const TypeIcon = typeOptions.find(t => t.value === announcement.type)?.icon || Bell
                  const priorityColor = priorityOptions.find(p => p.value === announcement.priority)?.color
                  
                  return (
                    <TableRow key={announcement.id} className="hover:bg-muted/50">
                      <TableCell className="py-3">
                        <div className="flex items-start gap-3">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-border">
                            <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold line-clamp-2 mb-1.5">{announcement.title}</div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                <TypeIcon className="w-3 h-3 mr-1" />
                                {typeOptions.find(t => t.value === announcement.type)?.label}
                              </Badge>
                              {announcement.isPinned && (
                                <Badge className="bg-yellow-500 text-white text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Pinned
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${priorityColor} text-white`}>
                          {announcement.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {announcement.isActive ? (
                          <Badge className="bg-green-500 text-white">
                            <Eye className="w-3 h-3 mr-1" />
                            Aktif
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <EyeOff className="w-3 h-3 mr-1" />
                            Tidak Aktif
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(announcement.publishedAt)}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(announcement.validUntil)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1 text-blue-600" />
                            <span className="text-blue-600 font-medium">{announcement.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-600" />
                            <span className="text-yellow-600 font-medium">{announcement.likes}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(announcement)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateAnnouncement(announcement)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplikat
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTogglePin(announcement.id)}>
                              <Star className="w-4 h-4 mr-2" />
                              {announcement.isPinned ? "Unpin" : "Pin"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(announcement.id)}>
                              {announcement.isActive ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Nonaktifkan
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Aktifkan
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteAnnouncement(announcement.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12">
                <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada pengumuman</h3>
                <p className="text-muted-foreground">Buat pengumuman pertama Anda</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Pengumuman
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <AnnouncementForm />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false)
              setSelectedAnnouncement(null)
              resetForm()
            }} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button onClick={handleEditAnnouncement} className="w-full sm:w-auto">
              <FileEdit className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

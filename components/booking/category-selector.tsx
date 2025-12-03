"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Crown, Gem, Check } from "lucide-react"

const categories = [
  {
    id: "reguler" as const,
    name: "PlayStation Reguler",
    price: 5000,
    description: "Pengalaman gaming standar dengan kualitas terbaik",
    features: ["PS4 Slim", "Controller Wireless", "Kursi Gaming", "Headset"],
    icon: Gamepad2,
    color: "from-blue-500 to-blue-600",
    popular: false,
  },
  {
    id: "vip" as const,
    name: "Room VIP",
    price: 8000,
    description: "Fasilitas premium dengan kenyamanan ekstra",
    features: ["PS5", "Controller DualSense", "Kursi Gaming Premium", "Headset Gaming", "Snack Gratis"],
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    popular: true,
  },
  {
    id: "vvip" as const,
    name: "Room VVIP",
    price: 12000,
    description: "Pengalaman gaming mewah dengan layanan eksklusif",
    features: [
      "PS5 Pro",
      "Controller Elite",
      "Sofa Gaming Mewah",
      "Headset Premium",
      "Snack & Minuman",
      "Ruang Privat",
    ],
    icon: Gem,
    color: "from-yellow-500 to-yellow-600",
    popular: false,
  },
]

interface CategorySelectorProps {
  selected: "reguler" | "vip" | "vvip" | null
  onSelect: (category: "reguler" | "vip" | "vvip") => void
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const handleCardClick = (categoryId: "reguler" | "vip" | "vvip") => {
    if (selected === categoryId) {
      onSelect(null as any)
    } else {
      onSelect(categoryId)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left px-4 sm:px-0">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Kategori PlayStation</h3>
        <p className="text-sm text-muted-foreground">Temukan paket gaming yang sesuai dengan kebutuhan Anda</p>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="lg:hidden py-6 mt-2 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-6 snap-x snap-mandatory">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selected === category.id

            return (
              <Card
                key={category.id}
                className={`group cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0 w-[calc(100vw-80px)] max-w-[340px] snap-center ${
                  isSelected 
                    ? "shadow-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-transparent scale-[1.02]" 
                    : "shadow-lg hover:shadow-xl hover:scale-[1.01] border-border/40 bg-card active:scale-[0.98]"
                }`}
                onClick={() => handleCardClick(category.id)}
              >
                <CardContent className="p-0 relative h-full flex flex-col">
                  {/* Popular Badge */}
                  {category.popular && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 shadow-lg border border-white/20 animate-pulse">
                        🔥 Populer
                      </Badge>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 animate-in zoom-in duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 backdrop-blur-sm">
                        <Check className="w-5 h-5 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}

                  <div className="p-5 h-full flex flex-col bg-gradient-to-b from-transparent via-muted/5 to-muted/20">
                    {/* Header */}
                    <div className="text-center mb-4 space-y-2">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white mb-3 shadow-lg ring-2 ring-white/20`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                        {category.name}
                      </h3>
                      <div className="flex items-baseline justify-center space-x-1.5 mb-2">
                        <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Rp {category.price.toLocaleString()}</p>
                        <span className="text-xs text-muted-foreground font-medium">/jam</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed px-2">{category.description}</p>
                    </div>

                    {/* Features - Scrollable like Game Library */}
                    <div className="flex-1 overflow-hidden space-y-2">
                      <p className="text-xs font-bold text-foreground/80 text-center uppercase tracking-wide">Fasilitas</p>
                      <div className="max-h-32 overflow-y-auto scrollbar-hide">
                        <div className="space-y-1.5">
                          {category.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-2.5 hover:from-muted/70 hover:to-muted/50 transition-all duration-200 border border-border/30">
                              <div className="w-1.5 h-1.5 bg-gradient-to-br from-primary to-primary/60 rounded-full flex-shrink-0 shadow-sm"></div>
                              <span className="text-xs text-foreground font-medium leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Selection Status */}
                    <div className="mt-4 pt-3 border-t border-border/30">
                      <div className="text-center">
                        {isSelected ? (
                          <p className="text-sm font-semibold text-primary">✓ Terpilih · Tap lagi untuk batal</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Tap untuk memilih</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center items-center gap-2.5 mt-6 pt-2">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 shadow-sm ${
                selected === categories[index].id 
                  ? 'w-8 h-2.5 bg-primary shadow-primary/50' 
                  : 'w-2.5 h-2.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-muted/30 rounded-full backdrop-blur-sm border border-border/30">
            <span className="font-medium">← Geser untuk melihat kategori lain →</span>
          </div>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <Card
              key={category.id}
              className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary shadow-xl bg-gradient-to-b from-primary/5 to-blue-50 dark:to-blue-950 border-primary scale-[1.05]" 
                  : "hover:shadow-xl hover:scale-[1.02] border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => handleCardClick(category.id)}
            >
              <CardContent className="p-0 relative">
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute top-5 left-5 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 shadow-lg">
                      🔥 Populer
                    </Badge>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-5 right-5 z-10">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Check className="w-6 h-6 text-white font-bold" />
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                    <div className="flex items-baseline justify-center space-x-2 mb-3">
                      <p className="text-2xl font-bold text-primary">Rp {category.price.toLocaleString()}</p>
                      <span className="text-sm text-muted-foreground">/jam</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>

                  {/* Features - Scrollable like Game Library */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground text-center">Fasilitas Lengkap:</p>
                    <div className="max-h-40 overflow-y-auto scrollbar-hide">
                      <div className="space-y-2">
                        {category.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-foreground font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selection Status */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      {isSelected ? (
                        <p className="text-sm font-semibold text-primary">✓ Terpilih · Klik lagi untuk batal</p>
                      ) : (
                        <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Klik untuk memilih</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

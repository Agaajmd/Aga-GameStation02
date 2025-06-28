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
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Kategori PlayStation</h3>
        <p className="text-sm text-muted-foreground">Temukan paket gaming yang sesuai dengan kebutuhan Anda</p>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selected === category.id

            return (
              <Card
                key={category.id}
                className={`group cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0 w-64 ${
                  isSelected 
                    ? "ring-2 ring-primary shadow-lg bg-gradient-to-br from-primary/5 to-blue-50 dark:to-blue-950 border-primary scale-[1.02]" 
                    : "hover:shadow-md hover:scale-[1.01] border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => onSelect(category.id)}
              >
                <CardContent className="p-0 relative h-full">
                  {/* Header with gradient accent */}
                  <div className={`h-2 w-full bg-gradient-to-r ${category.color}`} />
                  
                  {/* Popular Badge */}
                  {category.popular && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-2 py-1 shadow-md">
                        🔥 Populer
                      </Badge>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 text-white font-bold" />
                      </div>
                    </div>
                  )}

                  <div className="p-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-3">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-2 shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {category.name}
                      </h3>
                      <div className="flex items-baseline justify-center space-x-1 mb-2">
                        <p className="text-lg font-bold text-primary">Rp {category.price.toLocaleString()}</p>
                        <span className="text-xs text-muted-foreground">/jam</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                    </div>

                    {/* Features - Compact */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground mb-2 text-center">Fasilitas:</p>
                      <div className="space-y-1">
                        {category.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-foreground truncate">{feature}</span>
                          </div>
                        ))}
                        {category.features.length > 4 && (
                          <div className="text-xs text-muted-foreground text-center pt-1">
                            +{category.features.length - 4} lainnya
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selection Status */}
                    <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      {isSelected ? (
                        <div className="flex items-center justify-center space-x-1 text-primary">
                          <Check className="w-3 h-3" />
                          <p className="text-xs font-semibold">Terpilih</p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                          Tap untuk pilih
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center space-x-1 mt-2">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                selected === categories[index].id ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
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
              onClick={() => onSelect(category.id)}
            >
              <CardContent className="p-0 relative">
                {/* Header with gradient accent */}
                <div className={`h-3 w-full bg-gradient-to-r ${category.color}`} />
                
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

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground text-center">Fasilitas Lengkap:</p>
                    <div className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selection Hint */}
                  {!isSelected && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                        👆 Klik untuk memilih
                      </p>
                    </div>
                  )}

                  {isSelected && (
                    <div className="mt-6 pt-4 border-t border-primary/20">
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <Check className="w-4 h-4" />
                        <p className="text-sm font-semibold">Terpilih</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

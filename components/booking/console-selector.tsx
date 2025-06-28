"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Check, Monitor, Crown, Gem } from "lucide-react"

interface ConsoleSelectorProps {
  category: "reguler" | "vip" | "vvip"
  selected: string | null
  onSelect: (option: string) => void
}

interface ConsoleOption {
  id: string
  name: string
  console: string
  available: boolean
  number: string
  features?: string[]
}

const consoleOptions: Record<"reguler" | "vip" | "vvip", ConsoleOption[]> = {
  reguler: [
    { id: "ps4-slim-1", name: "PS4 Slim #1", console: "PlayStation 4 Slim", available: true, number: "PS-001" },
    { id: "ps4-slim-2", name: "PS4 Slim #2", console: "PlayStation 4 Slim", available: true, number: "PS-002" },
    { id: "ps4-pro-1", name: "PS4 Pro #1", console: "PlayStation 4 Pro", available: false, number: "PS-003" },
    { id: "ps4-pro-2", name: "PS4 Pro #2", console: "PlayStation 4 Pro", available: true, number: "PS-004" },
    { id: "ps5-1", name: "PS5 #1", console: "PlayStation 5", available: true, number: "PS-005" },
    { id: "ps5-2", name: "PS5 #2", console: "PlayStation 5", available: false, number: "PS-006" },
    { id: "ps5-digital-1", name: "PS5 Digital #1", console: "PlayStation 5 Digital", available: true, number: "PS-007" },
    { id: "ps5-digital-2", name: "PS5 Digital #2", console: "PlayStation 5 Digital", available: true, number: "PS-008" },
  ],
  vip: [
    { id: "vip-1", name: "VIP Room Alpha", console: "PlayStation 5", available: true, number: "VIP-001", features: ["Kursi Gaming Premium", "Headset Premium"] },
    { id: "vip-2", name: "VIP Room Beta", console: "PlayStation 5", available: false, number: "VIP-002", features: ["Kursi Gaming Premium", "Snack Gratis"] },
    { id: "vip-3", name: "VIP Room Gamma", console: "PlayStation 5 Pro", available: true, number: "VIP-003", features: ["Kursi Gaming Premium", "Minuman Gratis"] },
    { id: "vip-4", name: "VIP Room Delta", console: "PlayStation 5", available: true, number: "VIP-004", features: ["Kursi Gaming Premium", "AC Dingin"] },
    { id: "vip-5", name: "VIP Room Epsilon", console: "PlayStation 5 Pro", available: true, number: "VIP-005", features: ["Kursi Gaming Premium", "Sound System"] },
    { id: "vip-6", name: "VIP Room Zeta", console: "PlayStation 5", available: false, number: "VIP-006", features: ["Kursi Gaming Premium", "Lampu RGB"] },
  ],
  vvip: [
    { id: "vvip-1", name: "VVIP Suite Platinum", console: "PlayStation 5 Pro", available: true, number: "VVIP-001", features: ["Sofa Mewah", "Mini Bar", "TV 65 inch"] },
    { id: "vvip-2", name: "VVIP Suite Diamond", console: "PlayStation 5 Pro", available: false, number: "VVIP-002", features: ["Sofa Mewah", "Karaoke System", "TV 75 inch"] },
    { id: "vvip-3", name: "VVIP Suite Gold", console: "PlayStation 5 Pro", available: true, number: "VVIP-003", features: ["Sofa Mewah", "Ruang Privat", "Sound System Premium"] },
    { id: "vvip-4", name: "VVIP Suite Royal", console: "PlayStation 5 Pro", available: true, number: "VVIP-004", features: ["Sofa Mewah", "Butler Service", "Premium Snacks"] },
  ],
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "reguler": return Gamepad2
    case "vip": return Crown
    case "vvip": return Gem
    default: return Monitor
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "reguler": return "from-blue-500 to-blue-600"
    case "vip": return "from-purple-500 to-purple-600"
    case "vvip": return "from-yellow-500 to-yellow-600"
    default: return "from-gray-500 to-gray-600"
  }
}

export function ConsoleSelector({ category, selected, onSelect }: ConsoleSelectorProps) {
  const options = consoleOptions[category]
  const isRoom = category !== "reguler"
  const CategoryIcon = getCategoryIcon(category)
  const categoryColor = getCategoryColor(category)

  const getTitle = () => {
    switch (category) {
      case "reguler": return "Pilih Console PlayStation"
      case "vip": return "Pilih VIP Room"
      case "vvip": return "Pilih VVIP Suite"
      default: return "Pilih Console"
    }
  }

  const getSubtitle = () => {
    switch (category) {
      case "reguler": return "Pilih console gaming yang tersedia"
      case "vip": return "Ruang VIP dengan fasilitas premium"
      case "vvip": return "Suite mewah dengan layanan eksklusif"
      default: return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{getTitle()}</h3>
        <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
      </div>

      {/* Mobile & Tablet: 2 columns grid with rows of 2 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {options.map((option) => {
          const isSelected = selected === option.id

          return (
            <Card
              key={option.id}
              className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
                !option.available
                  ? "opacity-60 cursor-not-allowed border-gray-300 dark:border-gray-600"
                  : isSelected
                    ? "ring-2 ring-primary shadow-xl bg-gradient-to-r from-primary/5 to-blue-50 dark:to-blue-950 border-primary scale-[1.02]"
                    : "hover:shadow-lg hover:scale-[1.01] border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => option.available && onSelect(option.id)}
            >
              <CardContent className="p-0 relative">
                {/* Header with gradient accent */}
                <div className={`h-2 w-full ${option.available ? `bg-gradient-to-r ${categoryColor}` : 'bg-gray-300 dark:bg-gray-600'}`} />

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Check className="w-4 h-4 text-white font-bold" />
                    </div>
                  </div>
                )}

                {/* Availability Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    variant="secondary"
                    className={`text-xs font-semibold px-2 py-1 ${
                      option.available
                        ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                        : "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${option.available ? "bg-green-500" : "bg-red-500"}`} />
                    {option.available ? "Tersedia" : "Penuh"}
                  </Badge>
                </div>

                <div className="p-3 pt-8">
                  <div className="text-center mb-3">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${categoryColor} text-white mb-2 shadow-lg ${!option.available ? 'opacity-50' : ''}`}>
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors leading-tight">
                      {option.name}
                    </h4>
                    <p className="text-xs text-primary font-semibold mb-1">{option.number}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{option.console}</p>
                  </div>

                  {/* Features for VIP/VVIP - Show only 2 most important */}
                  {(category === "vip" || category === "vvip") && option.features && (
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-semibold text-foreground">Fasilitas:</p>
                      <div className="space-y-1">
                        {option.features.slice(0, 2).map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-md p-2">
                            <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-foreground leading-tight">{feature}</span>
                          </div>
                        ))}
                        {option.features.length > 2 && (
                          <p className="text-xs text-muted-foreground text-center">+{option.features.length - 2} lainnya</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Selection Hint */}
                  {!isSelected && option.available && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                        👆 Pilih
                      </p>
                    </div>
                  )}

                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-primary/20">
                      <div className="flex items-center justify-center space-x-1 text-primary">
                        <Check className="w-3 h-3" />
                        <p className="text-xs font-semibold">Terpilih</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop: 3-4 columns grid */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {options.map((option) => {
          const isSelected = selected === option.id

          return (
            <Card
              key={option.id}
              className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
                !option.available
                  ? "opacity-60 cursor-not-allowed border-gray-300 dark:border-gray-600"
                  : isSelected
                    ? "ring-2 ring-primary shadow-xl bg-gradient-to-b from-primary/5 to-blue-50 dark:to-blue-950 border-primary scale-[1.05]"
                    : "hover:shadow-xl hover:scale-[1.02] border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => option.available && onSelect(option.id)}
            >
              <CardContent className="p-0 relative">
                {/* Header with gradient accent */}
                <div className={`h-3 w-full ${option.available ? `bg-gradient-to-r ${categoryColor}` : 'bg-gray-300 dark:bg-gray-600'}`} />

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-5 right-5 z-10">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Check className="w-6 h-6 text-white font-bold" />
                    </div>
                  </div>
                )}

                {/* Availability Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <Badge
                    variant="secondary"
                    className={`text-xs font-semibold ${
                      option.available
                        ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                        : "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-1 ${option.available ? "bg-green-500" : "bg-red-500"}`} />
                    {option.available ? "Tersedia" : "Penuh"}
                  </Badge>
                </div>

                <div className="p-6 pt-16">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryColor} text-white mb-4 shadow-lg ${!option.available ? 'opacity-50' : ''}`}>
                      <CategoryIcon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                      {option.name}
                    </h4>
                    <p className="text-sm text-primary font-semibold mb-1">{option.number}</p>
                    <p className="text-sm text-muted-foreground">{option.console}</p>
                  </div>

                  {/* Features for VIP/VVIP */}
                  {(category === "vip" || category === "vvip") && option.features && (
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-foreground text-center">Fasilitas:</p>
                      <div className="space-y-2">
                        {option.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selection Hint */}
                  {!isSelected && option.available && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                        👆 Klik untuk memilih
                      </p>
                    </div>
                  )}

                  {isSelected && (
                    <div className="pt-4 border-t border-primary/20">
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

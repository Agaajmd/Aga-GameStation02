"use client"

import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gamepad2, Check, Monitor, Crown, Gem, RotateCcw, Joystick } from "lucide-react"

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
  games?: string[]
}

// Game library untuk setiap console type
const gameLibrary: Record<string, string[]> = {
  "PlayStation 4 Slim": [
    "FIFA 24", "Call of Duty: Modern Warfare", "Grand Theft Auto V", "Marvel's Spider-Man", 
    "God of War", "The Last of Us Part II", "Horizon Zero Dawn", "Uncharted 4", "Tekken 7"
  ],
  "PlayStation 4 Pro": [
    "FIFA 24", "Call of Duty: Modern Warfare", "Grand Theft Auto V", "Marvel's Spider-Man", 
    "God of War", "The Last of Us Part II", "Horizon Zero Dawn", "Uncharted 4", "Tekken 7",
    "Red Dead Redemption 2", "Assassin's Creed Valhalla"
  ],
  "PlayStation 5": [
    "FIFA 24", "Call of Duty: Modern Warfare III", "Marvel's Spider-Man 2", "God of War Ragnarök",
    "Horizon Forbidden West", "Ratchet & Clank: Rift Apart", "Demon's Souls", "Returnal",
    "Gran Turismo 7", "The Last of Us Part I", "Tekken 8", "Street Fighter 6"
  ],
  "PlayStation 5 Digital": [
    "FIFA 24", "Call of Duty: Modern Warfare III", "Marvel's Spider-Man 2", "God of War Ragnarök",
    "Horizon Forbidden West", "Ratchet & Clank: Rift Apart", "Demon's Souls", "Returnal",
    "Gran Turismo 7", "The Last of Us Part I", "Tekken 8", "Street Fighter 6"
  ],
  "PlayStation 5 Pro": [
    "FIFA 24", "Call of Duty: Modern Warfare III", "Marvel's Spider-Man 2", "God of War Ragnarök",
    "Horizon Forbidden West", "Ratchet & Clank: Rift Apart", "Demon's Souls", "Returnal",
    "Gran Turismo 7", "The Last of Us Part I", "Tekken 8", "Street Fighter 6",
    "Final Fantasy VII Rebirth", "Baldur's Gate 3", "Cyberpunk 2077"
  ]
}

const consoleOptions: Record<"reguler" | "vip" | "vvip", ConsoleOption[]> = {
  reguler: [
    { id: "ps4-slim-1", name: "PS4 Slim #1", console: "PlayStation 4 Slim", available: true, number: "PS-001", games: gameLibrary["PlayStation 4 Slim"] },
    { id: "ps4-slim-2", name: "PS4 Slim #2", console: "PlayStation 4 Slim", available: true, number: "PS-002", games: gameLibrary["PlayStation 4 Slim"] },
    { id: "ps4-pro-1", name: "PS4 Pro #1", console: "PlayStation 4 Pro", available: false, number: "PS-003", games: gameLibrary["PlayStation 4 Pro"] },
    { id: "ps4-pro-2", name: "PS4 Pro #2", console: "PlayStation 4 Pro", available: true, number: "PS-004", games: gameLibrary["PlayStation 4 Pro"] },
    { id: "ps5-1", name: "PS5 #1", console: "PlayStation 5", available: true, number: "PS-005", games: gameLibrary["PlayStation 5"] },
    { id: "ps5-2", name: "PS5 #2", console: "PlayStation 5", available: false, number: "PS-006", games: gameLibrary["PlayStation 5"] },
    { id: "ps5-digital-1", name: "PS5 Digital #1", console: "PlayStation 5 Digital", available: true, number: "PS-007", games: gameLibrary["PlayStation 5 Digital"] },
    { id: "ps5-digital-2", name: "PS5 Digital #2", console: "PlayStation 5 Digital", available: true, number: "PS-008", games: gameLibrary["PlayStation 5 Digital"] },
  ],
  vip: [
    { id: "vip-1", name: "VIP Room Alpha", console: "PlayStation 5", available: true, number: "VIP-001", features: ["Kursi Gaming Premium", "Headset Premium"], games: gameLibrary["PlayStation 5"] },
    { id: "vip-2", name: "VIP Room Beta", console: "PlayStation 5", available: false, number: "VIP-002", features: ["Kursi Gaming Premium", "Snack Gratis"], games: gameLibrary["PlayStation 5"] },
    { id: "vip-3", name: "VIP Room Gamma", console: "PlayStation 5 Pro", available: true, number: "VIP-003", features: ["Kursi Gaming Premium", "Minuman Gratis"], games: gameLibrary["PlayStation 5 Pro"] },
    { id: "vip-4", name: "VIP Room Delta", console: "PlayStation 5", available: true, number: "VIP-004", features: ["Kursi Gaming Premium", "AC Dingin"], games: gameLibrary["PlayStation 5"] },
    { id: "vip-5", name: "VIP Room Epsilon", console: "PlayStation 5 Pro", available: true, number: "VIP-005", features: ["Kursi Gaming Premium", "Sound System"], games: gameLibrary["PlayStation 5 Pro"] },
    { id: "vip-6", name: "VIP Room Zeta", console: "PlayStation 5", available: false, number: "VIP-006", features: ["Kursi Gaming Premium", "Lampu RGB"], games: gameLibrary["PlayStation 5"] },
  ],
  vvip: [
    { id: "vvip-1", name: "VVIP Suite Platinum", console: "PlayStation 5 Pro", available: true, number: "VVIP-001", features: ["Sofa Mewah", "Mini Bar", "TV 65 inch"], games: gameLibrary["PlayStation 5 Pro"] },
    { id: "vvip-2", name: "VVIP Suite Diamond", console: "PlayStation 5 Pro", available: false, number: "VVIP-002", features: ["Sofa Mewah", "Karaoke System", "TV 75 inch"], games: gameLibrary["PlayStation 5 Pro"] },
    { id: "vvip-3", name: "VVIP Suite Gold", console: "PlayStation 5 Pro", available: true, number: "VVIP-003", features: ["Sofa Mewah", "Ruang Privat", "Sound System Premium"], games: gameLibrary["PlayStation 5 Pro"] },
    { id: "vvip-4", name: "VVIP Suite Royal", console: "PlayStation 5 Pro", available: true, number: "VVIP-004", features: ["Sofa Mewah", "Butler Service", "Premium Snacks"], games: gameLibrary["PlayStation 5 Pro"] },
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
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  const options = consoleOptions[category]
  const isRoom = category !== "reguler"
  const CategoryIcon = getCategoryIcon(category)
  const categoryColor = getCategoryColor(category)

  const toggleFlip = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const renderFrontCard = (option: ConsoleOption, isSelected: boolean, isMobile: boolean = false) => (
    <Card
      className={`group cursor-pointer transition-all duration-300 overflow-hidden h-full ${
        !option.available
          ? "opacity-60 cursor-not-allowed border-gray-300 dark:border-gray-600"
          : isSelected
            ? `ring-2 ring-primary shadow-xl bg-gradient-to-${isMobile ? 'r' : 'b'} from-primary/5 to-blue-50 dark:to-blue-950 border-primary scale-[${isMobile ? '1.02' : '1.05'}]`
            : "hover:shadow-lg hover:scale-[1.01] border-gray-200 dark:border-gray-700"
      }`}
    >
      <CardContent className="p-0 relative h-full">
        {/* Header with gradient accent */}
        <div className={`h-${isMobile ? '2' : '3'} w-full ${option.available ? `bg-gradient-to-r ${categoryColor}` : 'bg-gray-300 dark:bg-gray-600'}`} />

        {/* Selection Indicator */}
        {isSelected && (
          <div className={`absolute top-${isMobile ? '2' : '5'} right-${isMobile ? '2' : '5'} z-10`}>
            <div className={`w-${isMobile ? '6' : '10'} h-${isMobile ? '6' : '10'} bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
              <Check className={`w-${isMobile ? '4' : '6'} h-${isMobile ? '4' : '6'} text-white font-bold`} />
            </div>
          </div>
        )}

        {/* Game List Button */}
        <div className={`absolute top-${isMobile ? '2' : '5'} ${isSelected ? 'left-2' : `left-${isMobile ? '2' : '5'}`} z-10`}>
          <Button
            variant="default"
            size={isMobile ? "sm" : "default"}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg font-semibold animate-pulse hover:animate-none transition-all duration-300"
            onClick={(e) => toggleFlip(option.id, e)}
          >
            <Joystick className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} mr-1`} />
            🎮 Games
          </Button>
        </div>

        {/* Availability Badge */}
        <div className={`absolute top-${isMobile ? '12' : '20'} right-${isMobile ? '2' : '5'} z-10`}>
          <Badge
            variant="secondary"
            className={`text-xs font-semibold ${isMobile ? 'px-2 py-1' : ''} ${
              option.available
                ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                : "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mr-1 ${option.available ? "bg-green-500" : "bg-red-500"}`} />
            {option.available ? "Tersedia" : "Penuh"}
          </Badge>
        </div>

        <div className={`p-${isMobile ? '3' : '6'} pt-${isMobile ? '8' : '16'} h-full flex flex-col`}>
          <div className={`text-center mb-${isMobile ? '3' : '6'}`}>
            <div className={`inline-flex items-center justify-center w-${isMobile ? '10' : '16'} h-${isMobile ? '10' : '16'} rounded-${isMobile ? 'xl' : '2xl'} bg-gradient-to-r ${categoryColor} text-white mb-${isMobile ? '2' : '4'} shadow-lg ${!option.available ? 'opacity-50' : ''}`}>
              <CategoryIcon className={`w-${isMobile ? '5' : '8'} h-${isMobile ? '5' : '8'}`} />
            </div>
            <h4 className={`font-bold text-foreground text-${isMobile ? 'sm' : 'lg'} mb-${isMobile ? '1' : '2'} group-hover:text-primary transition-colors ${isMobile ? 'leading-tight' : ''}`}>
              {option.name}
            </h4>
            <p className={`text-${isMobile ? 'xs' : 'sm'} text-primary font-semibold mb-1`}>{option.number}</p>
            <p className={`text-${isMobile ? 'xs' : 'sm'} text-muted-foreground ${isMobile ? 'leading-tight' : ''}`}>{option.console}</p>
          </div>

          {/* Features for VIP/VVIP */}
          {(category === "vip" || category === "vvip") && option.features && (
            <div className={`space-y-${isMobile ? '1' : '3'} mb-${isMobile ? '3' : '6'} flex-grow`}>
              <p className={`text-${isMobile ? 'xs' : 'sm'} font-semibold text-foreground ${isMobile ? '' : 'text-center'}`}>Fasilitas:</p>
              <div className={`space-y-${isMobile ? '1' : '2'}`}>
                {(isMobile ? option.features.slice(0, 2) : option.features).map((feature: string, idx: number) => (
                  <div key={idx} className={`flex items-center space-x-${isMobile ? '2' : '3'} bg-gray-50 dark:bg-gray-800 rounded-${isMobile ? 'md' : 'lg'} p-${isMobile ? '2' : '3'}`}>
                    <div className={`w-${isMobile ? '1' : '2'} h-${isMobile ? '1' : '2'} bg-primary rounded-full flex-shrink-0`}></div>
                    <span className={`text-${isMobile ? 'xs' : 'sm'} text-foreground ${isMobile ? 'leading-tight' : ''}`}>{feature}</span>
                  </div>
                ))}
                {isMobile && option.features.length > 2 && (
                  <p className="text-xs text-muted-foreground text-center">+{option.features.length - 2} lainnya</p>
                )}
              </div>
            </div>
          )}

          {/* Selection Status */}
          <div className="mt-auto">
            {!isSelected && option.available && (
              <div className={`pt-${isMobile ? '2' : '4'} border-t border-gray-200 dark:border-gray-700`}>
                <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                  👆 {isMobile ? 'Pilih' : 'Klik untuk memilih'}
                </p>
              </div>
            )}

            {isSelected && (
              <div className={`pt-${isMobile ? '2' : '4'} border-t border-primary/20`}>
                <div className={`flex items-center justify-center space-x-${isMobile ? '1' : '2'} text-primary`}>
                  <Check className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'}`} />
                  <p className={`text-${isMobile ? 'xs' : 'sm'} font-semibold`}>Terpilih</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderBackCard = (option: ConsoleOption, isMobile: boolean = false) => (
    <Card className="group cursor-pointer transition-all duration-300 overflow-hidden h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-700">
      <CardContent className="p-0 relative h-full">
        {/* Header with game-themed gradient */}
        <div className={`h-${isMobile ? '2' : '3'} w-full bg-gradient-to-r from-indigo-500 to-purple-600`} />

        {/* Back Button */}
        <div className={`absolute top-${isMobile ? '2' : '5'} left-${isMobile ? '2' : '5'} z-10`}>
          <Button
            variant="default"
            size={isMobile ? "sm" : "default"}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg font-semibold transition-all duration-300"
            onClick={(e) => toggleFlip(option.id, e)}
          >
            <RotateCcw className={`w-${isMobile ? '3' : '4'} h-${isMobile ? '3' : '4'} mr-1`} />
            ⬅️ Back
          </Button>
        </div>

        <div className={`p-${isMobile ? '3' : '6'} pt-${isMobile ? '8' : '16'} h-full flex flex-col`}>
          <div className="text-center mb-4">
            <div className={`inline-flex items-center justify-center w-${isMobile ? '8' : '12'} h-${isMobile ? '8' : '12'} rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-3 shadow-lg`}>
              <Joystick className={`w-${isMobile ? '4' : '6'} h-${isMobile ? '4' : '6'}`} />
            </div>
            <h4 className={`font-bold text-foreground text-${isMobile ? 'sm' : 'lg'} mb-1`}>
              Game Library
            </h4>
            <p className={`text-${isMobile ? 'xs' : 'sm'} text-muted-foreground`}>{option.console}</p>
          </div>

          {/* Games List */}
          <div className="flex-grow overflow-hidden">
            <div className={`grid grid-cols-1 gap-${isMobile ? '1' : '2'} max-h-full overflow-y-auto scrollbar-hide`}>
              {option.games?.map((game, idx) => (
                <div key={idx} className={`flex items-center space-x-${isMobile ? '2' : '3'} bg-white/50 dark:bg-gray-800/50 rounded-md p-${isMobile ? '2' : '3'} hover:bg-white/70 dark:hover:bg-gray-700/50 transition-colors`}>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  <span className={`text-${isMobile ? 'xs' : 'sm'} text-foreground font-medium ${isMobile ? 'leading-tight' : ''}`}>{game}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-${isMobile ? '2' : '4'} pt-${isMobile ? '2' : '4'} border-t border-indigo-200 dark:border-indigo-700 text-center`}>
            <p className={`text-${isMobile ? 'xs' : 'sm'} text-muted-foreground`}>
              Total: {option.games?.length || 0} games
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

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

  const getGameInstruction = () => {
    switch (category) {
      case "reguler": return "💡 Tip: Klik tombol 'Games' pada setiap console untuk melihat daftar game yang tersedia"
      case "vip": return "💡 Tip: Klik tombol 'Games' untuk melihat koleksi game yang dapat dimainkan di ruang VIP"
      case "vvip": return "💡 Tip: Klik tombol 'Games' untuk melihat koleksi game premium yang tersedia di suite VVIP"
      default: return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{getTitle()}</h3>
        <p className="text-sm text-muted-foreground mb-3">{getSubtitle()}</p>
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            {getGameInstruction()}
          </p>
        </div>
      </div>

      {/* Mobile & Tablet: 2 columns grid with rows of 2 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {options.map((option) => {
          const isSelected = selected === option.id
          const isFlipped = flippedCards[option.id] || false

          return (
            <div key={option.id} className="h-[280px] sm:h-[320px]">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ height: '100%' }}>
                <div onClick={() => option.available && onSelect(option.id)} className="h-full">
                  {renderFrontCard(option, isSelected, true)}
                </div>
                <div className="h-full">
                  {renderBackCard(option, true)}
                </div>
              </ReactCardFlip>
            </div>
          )
        })}
      </div>

      {/* Desktop: 3-4 columns grid */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {options.map((option) => {
          const isSelected = selected === option.id
          const isFlipped = flippedCards[option.id] || false

          return (
            <div key={option.id} className="h-[400px]">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ height: '100%' }}>
                <div onClick={() => option.available && onSelect(option.id)} className="h-full">
                  {renderFrontCard(option, isSelected, false)}
                </div>
                <div className="h-full">
                  {renderBackCard(option, false)}
                </div>
              </ReactCardFlip>
            </div>
          )
        })}
      </div>
    </div>
  )
}

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
    name: "PlayStation VIP",
    price: 8000,
    description: "Fasilitas premium dengan kenyamanan ekstra",
    features: ["PS5", "Controller DualSense", "Kursi Gaming Premium", "Headset Gaming", "Snack Gratis"],
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    popular: true,
  },
  {
    id: "vvip" as const,
    name: "PlayStation VVIP",
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
    <div className="space-y-4">
      {/* Mobile: Stack vertically */}
      <div className="flex flex-col space-y-4 md:hidden">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                isSelected ? "ring-2 ring-primary shadow-lg bg-primary/5 border-primary/20" : "hover:shadow-md"
              }`}
              onClick={() => onSelect(category.id)}
            >
              <CardContent className="p-4 relative">
                {category.popular && (
                  <Badge className="absolute -top-2 left-4 bg-accent-cyan text-white text-xs">Populer</Badge>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.color} text-white flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-contrast mb-1">{category.name}</h3>
                    <p className="text-lg font-bold text-primary">Rp {category.price.toLocaleString()}/jam</p>
                    <p className="text-xs text-muted-contrast mt-1 line-clamp-2">{category.description}</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1">
                  {category.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-muted-contrast truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg card-hover ${
                isSelected ? "ring-2 ring-primary shadow-lg bg-primary/5 border-primary/20" : "hover:shadow-md"
              }`}
              onClick={() => onSelect(category.id)}
            >
              <CardContent className="p-6 relative">
                {category.popular && (
                  <Badge className="absolute -top-2 left-4 bg-accent-cyan text-white text-xs">Populer</Badge>
                )}

                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="text-center mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.color} text-white mb-3`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-contrast mb-1">{category.name}</h3>
                  <p className="text-2xl font-bold text-primary">Rp {category.price.toLocaleString()}/jam</p>
                  <p className="text-sm text-muted-contrast mt-2">{category.description}</p>
                </div>

                <div className="space-y-2">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-contrast">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

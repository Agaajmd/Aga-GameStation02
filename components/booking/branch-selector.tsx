"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Check } from "lucide-react"

const branches = [
  {
    id: "jakarta-pusat",
    name: "Aga GAME Station Jakarta Pusat",
    address: "Jl. Thamrin No. 123, Jakarta Pusat",
    distance: "2.5 km",
    rating: 4.8,
    openHours: "10:00 - 23:00",
    facilities: ["20 PS Units", "VIP Rooms", "Cafe", "Parking"],
    status: "open",
    popular: true,
  },
  {
    id: "jakarta-selatan",
    name: "Aga GAME Station Jakarta Selatan",
    address: "Jl. Sudirman No. 456, Jakarta Selatan",
    distance: "5.2 km",
    rating: 4.7,
    openHours: "10:00 - 23:00",
    facilities: ["15 PS Units", "VIP Rooms", "Cafe"],
    status: "open",
    popular: false,
  },
  {
    id: "jakarta-barat",
    name: "Aga GAME Station Jakarta Barat",
    address: "Jl. Gajah Mada No. 789, Jakarta Barat",
    distance: "8.1 km",
    rating: 4.6,
    openHours: "10:00 - 22:00",
    facilities: ["12 PS Units", "Cafe", "Parking"],
    status: "open",
    popular: false,
  },
]

interface BranchSelectorProps {
  selected: string | null
  onSelect: (branchId: string) => void
}

export function BranchSelector({ selected, onSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Lokasi Gaming Center</h3>
        <p className="text-sm text-muted-foreground">Temukan cabang terdekat dengan fasilitas terbaik</p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {branches.map((branch) => {
          const isSelected = selected === branch.id

          return (
            <Card
              key={branch.id}
              className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary shadow-xl bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/20 dark:to-blue-900/30 border-primary scale-[1.02]" 
                  : "hover:shadow-lg hover:scale-[1.01] border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
              }`}
              onClick={() => onSelect(branch.id)}
            >
              <CardContent className="p-0 relative">
                {/* Header with colored accent */}
                <div className={`h-2 w-full ${isSelected ? 'bg-gradient-to-r from-primary to-blue-500' : 'bg-gray-100 dark:bg-gray-600'}`} />
                
                {/* Popular Badge */}
                {branch.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 shadow-lg">
                      🔥 Populer
                    </Badge>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6">
                  {/* Branch Name & Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <h4 className="font-bold text-foreground text-base sm:text-lg mb-1 group-hover:text-primary transition-colors dark:text-gray-100">
                        {branch.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{branch.address}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 font-semibold ${
                        branch.status === "open" 
                          ? "text-green-700 border-green-300 bg-green-50 dark:bg-green-950 dark:text-green-400 dark:border-green-700" 
                          : "text-red-700 border-red-300 bg-red-50 dark:bg-red-950 dark:text-red-400 dark:border-red-700"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${branch.status === "open" ? "bg-green-500" : "bg-red-500"}`} />
                      {branch.status === "open" ? "Buka" : "Tutup"}
                    </Badge>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Jarak</p>
                        <p className="text-sm font-semibold text-foreground dark:text-gray-100">{branch.distance}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-300 fill-current" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Rating</p>
                        <p className="text-sm font-semibold text-foreground dark:text-gray-100">{branch.rating}/5</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Jam Buka</p>
                        <p className="text-sm font-semibold text-foreground dark:text-gray-100">{branch.openHours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground dark:text-gray-100">Fasilitas:</p>
                    <div className="flex flex-wrap gap-2">
                      {branch.facilities.map((facility, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30"
                        >
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Selection Hint */}
                  {!isSelected && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-muted-foreground dark:text-gray-300 text-center group-hover:text-primary transition-colors">
                        👆 Klik untuk memilih cabang ini
                      </p>
                    </div>
                  )}

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-primary/20 dark:border-primary/40">
                      <div className="flex items-center justify-center space-x-2 text-primary dark:text-primary-foreground">
                        <Check className="w-4 h-4" />
                        <p className="text-sm font-semibold">Cabang dipilih</p>
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

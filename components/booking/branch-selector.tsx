"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Check, Gamepad2, CheckCircle2 } from "lucide-react"

const branches = [
  {
    id: "jakarta-pusat",
    name: "Aga GAME Station Jakarta Pusat",
    address: "Jl. Thamrin No. 123, Jakarta Pusat",
    distance: "2.5 km",
    rating: 4.8,
    openHours: "10:00 - 23:00",
    facilities: ["20 PS Units", "VIP Rooms", "Cafe", "Parking"],
    totalPS: 20,
    availablePS: 12,
    status: "open",
    popular: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    id: "jakarta-selatan",
    name: "Aga GAME Station Jakarta Selatan",
    address: "Jl. Sudirman No. 456, Jakarta Selatan",
    distance: "5.2 km",
    rating: 4.7,
    openHours: "10:00 - 23:00",
    facilities: ["15 PS Units", "VIP Rooms", "Cafe"],
    totalPS: 15,
    availablePS: 8,
    status: "open",
    popular: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
  },
  {
    id: "jakarta-barat",
    name: "Aga GAME Station Jakarta Barat",
    address: "Jl. Gajah Mada No. 789, Jakarta Barat",
    distance: "8.1 km",
    rating: 4.6,
    openHours: "10:00 - 22:00",
    facilities: ["12 PS Units", "Cafe", "Parking"],
    totalPS: 12,
    availablePS: 5,
    status: "open",
    popular: false,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
  },
]

interface BranchSelectorProps {
  selected: string | null
  onSelect: (branchId: string) => void
}

export function BranchSelector({ selected, onSelect }: BranchSelectorProps) {
  const handleCardClick = (branchId: string) => {
    if (selected === branchId) {
      onSelect(null as any)
    } else {
      onSelect(branchId)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left px-4 sm:px-0">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Lokasi Gaming Center</h3>
        <p className="text-sm text-muted-foreground">Temukan cabang terdekat dengan fasilitas terbaik</p>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden py-6 mt-2 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-6 snap-x snap-mandatory">
          {branches.map((branch, index) => {
            const isSelected = selected === branch.id
            
            return (
              <Card
                key={branch.id}
                className={`group cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0 w-[calc(100vw-80px)] max-w-[400px] snap-center ${
                  isSelected 
                    ? "shadow-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-transparent scale-[1.02]" 
                    : "shadow-lg hover:shadow-xl hover:scale-[1.01] border-border/40 bg-card active:scale-[0.98]"
                }`}
                onClick={() => handleCardClick(branch.id)}
              >
                <CardContent className="p-0 relative h-full flex flex-col">
                        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 rounded-t-2xl group">
                          <Image 
                            src={branch.image} 
                            alt={branch.name}
                            fill
                            loading="lazy"
                            quality={85}
                            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                            sizes="(max-width: 640px) 85vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                          <div className="absolute top-3 left-3 flex gap-2 z-10">
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 backdrop-blur-md px-3 py-1.5 rounded-full text-xs shadow-lg border border-white/20">
                              <Star className="w-3.5 h-3.5 text-white fill-white drop-shadow" />
                              <span className="font-bold text-white drop-shadow">{branch.rating}</span>
                            </div>
                            {branch.popular && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-md text-white text-xs px-3 py-1.5 shadow-lg border border-white/20 animate-pulse">
                                🔥 Populer
                              </Badge>
                            )}
                          </div>

                          {isSelected && (
                            <div className="absolute bottom-3 right-3 z-10 animate-in zoom-in duration-300">
                              <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                                <Check className="w-6 h-6 text-white drop-shadow-lg" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-3 bg-gradient-to-b from-transparent to-muted/20">
                          <div className="space-y-2">
                            <h4 className="font-bold text-base tracking-tight line-clamp-1 text-foreground">{branch.name}</h4>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-primary/80 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {branch.address}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 backdrop-blur-sm rounded-xl p-3 border border-border/30 shadow-sm">
                            <div className="flex items-center gap-1.5">
                              <div className="p-1 rounded-md bg-primary/10">
                                <Gamepad2 className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="font-semibold text-foreground">{branch.totalPS}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="p-1 rounded-md bg-green-500/10">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              </div>
                              <span className="text-green-600 dark:text-green-400 font-semibold">{branch.availablePS}</span>
                            </div>
                            <div className="flex items-center gap-1.5 ml-auto">
                              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="font-medium text-muted-foreground">{branch.openHours}</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-border/30">
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
              {branches.map((branch, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 shadow-sm ${
                    selected === branch.id
                      ? 'w-8 h-2.5 bg-primary shadow-primary/50' 
                      : 'w-2.5 h-2.5 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center mt-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-muted/30 rounded-full backdrop-blur-sm border border-border/30">
                <span className="font-medium">← Geser untuk melihat cabang lain →</span>
              </div>
            </div>
          </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => {
          const isSelected = selected === branch.id

          return (
            <Card
              key={branch.id}
              className={`group cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary shadow-xl scale-[1.02] bg-primary/5 border-primary" 
                  : "hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 border-border"
              }`}
              onClick={() => handleCardClick(branch.id)}
            >
              <CardContent className="p-0 relative">
                <div className="relative h-48 overflow-hidden bg-muted/30">
                  <Image 
                    src={branch.image} 
                    alt={branch.name}
                    fill
                    loading="lazy"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/50" />
                
                  <div className="absolute top-2 left-2 flex gap-2">
                    {branch.popular && (
                      <Badge className="bg-orange-500/90 text-white text-xs px-2 py-1">
                        🔥 Populer
                      </Badge>
                    )}
                    <Badge
                      className={`text-xs px-2 py-1 ${
                        branch.status === "open" 
                          ? "bg-green-500/90 text-white" 
                          : "bg-red-500/90 text-white"
                      }`}
                    >
                      {branch.status === "open" ? "Buka" : "Tutup"}
                    </Badge>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-sm md:text-base mb-2 line-clamp-1">{branch.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{branch.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{branch.openHours}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.facilities.slice(0, 2).map((facility, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs px-2 py-1"
                        >
                          {facility}
                        </Badge>
                      ))}
                      {branch.facilities.length > 2 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-2 py-1"
                        >
                          +{branch.facilities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="text-center">
                      {isSelected ? (
                        <p className="text-sm font-semibold text-primary">✓ Terpilih · Klik lagi untuk batal</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Klik untuk memilih</p>
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

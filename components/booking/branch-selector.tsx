"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Check, ChevronLeft, ChevronRight, Gamepad2, CheckCircle2 } from "lucide-react"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % branches.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + branches.length) % branches.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  const handleCardClick = (branchId: string) => {
    if (selected === branchId) {
      onSelect(null as any)
    } else {
      onSelect(branchId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Lokasi Gaming Center</h3>
        <p className="text-sm text-muted-foreground">Temukan cabang terdekat dengan fasilitas terbaik</p>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div 
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            <div className="flex">
              {branches.map((branch, index) => {
                const isSelected = selected === branch.id
                const isVisible = index === currentIndex
                
                return (
                  <div 
                    key={branch.id}
                    className="w-full flex-shrink-0 px-4"
                    style={{ display: isVisible ? 'block' : 'none' }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl ${
                        isSelected 
                          ? "ring-2 ring-primary shadow-xl border-primary/50 bg-primary/5" 
                          : "shadow-md border-border/40 bg-card"
                      }`}
                      onClick={() => handleCardClick(branch.id)}
                    >
                      <CardContent className="p-0 relative h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-muted/30 rounded-t-2xl">
                          <Image 
                            src={branch.image} 
                            alt={branch.name}
                            fill
                            loading="lazy"
                            quality={75}
                            className="object-cover"
                            sizes="90vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                          <div className="absolute top-2 left-2 flex gap-2">
                            <div className="flex items-center gap-1 bg-yellow-500/90 px-2 py-1 rounded-full text-xs">
                              <Star className="w-3 h-3 text-white fill-white" />
                              <span className="font-bold text-white">{branch.rating}</span>
                            </div>
                            {branch.popular && (
                              <Badge className="bg-orange-500/90 text-white text-xs px-2 py-1">
                                🔥 Populer
                              </Badge>
                            )}
                          </div>

                          {isSelected && (
                            <div className="absolute bottom-2 right-2">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <h4 className="font-bold text-sm mb-1 line-clamp-1">{branch.name}</h4>
                          <div className="flex items-start gap-1.5 mb-2">
                            <MapPin className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground line-clamp-2">
                              {branch.address}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Gamepad2 className="w-3 h-3 text-primary" />
                              <span>{branch.totalPS}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                              <span className="text-green-500">{branch.availablePS}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Clock className="w-3 h-3" />
                              <span>{branch.openHours}</span>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t">
                            {isSelected ? (
                              <div className="flex items-center justify-center gap-1 text-primary">
                                <Check className="w-3 h-3" />
                                <p className="text-xs font-semibold">Terpilih</p>
                              </div>
                            ) : (
                              <p className="text-xs text-center text-muted-foreground">Tap untuk pilih</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-card/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-primary transition-all duration-300 group"
          aria-label="Previous branch"
        >
          <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-card/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-primary transition-all duration-300 group"
          aria-label="Next branch"
        >
          <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white" />
        </button>

        <div className="flex justify-center items-center space-x-2 mt-4">
          {branches.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-primary' 
                  : 'w-2 h-2 bg-muted hover:bg-primary/60'
              }`}
              aria-label={`Go to branch ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-full">
            <ChevronLeft className="w-4 h-4" />
            <span>Geser untuk melihat cabang lain</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => {
          const isSelected = selected === branch.id

          return (
            <Card
              key={branch.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "ring-2 ring-primary shadow-lg" 
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleCardClick(branch.id)}
            >
              <CardContent className="p-0 relative">
                <div className="relative h-48 overflow-hidden bg-muted/30 rounded-t-2xl">
                  <Image 
                    src={branch.image} 
                    alt={branch.name}
                    fill
                    loading="lazy"
                    quality={75}
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
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
                    {isSelected ? (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Check className="w-4 h-4" />
                        <p className="text-xs font-semibold">Cabang dipilih</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground text-center">
                        👆 Klik untuk pilih
                      </p>
                    )}
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

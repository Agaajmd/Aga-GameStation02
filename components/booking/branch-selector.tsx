"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Check, ChevronLeft, ChevronRight } from "lucide-react"

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isScrollingRef = useRef(false)
  
  // Create infinite loop by repeating branches 5 times for smoother experience
  const repeatCount = 5
  const infiniteBranches = Array(repeatCount).fill(branches).flat()
  const totalBranches = branches.length
  const startIndex = totalBranches * Math.floor(repeatCount / 2) // Start in middle

  const scrollToIndex = (index: number, smooth = true) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 260
      const gap = 24
      const scrollLeft = (cardWidth + gap) * index
      container.scrollTo({
        left: scrollLeft,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  }

  useEffect(() => {
    // Start at middle to enable infinite scroll both directions
    if (scrollContainerRef.current) {
      const timer = setTimeout(() => {
        setCurrentIndex(startIndex)
        scrollToIndex(startIndex, false)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [startIndex])
  
  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = 260
    const gap = 24
    const scrollLeft = container.scrollLeft
    const newIndex = Math.round(scrollLeft / (cardWidth + gap))
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    })
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Set flag that we're scrolling
    isScrollingRef.current = true
    
    // Wait for scroll to finish, then check if we need to reposition
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current) return
      
      isScrollingRef.current = false
      
      // If we're in the first or last set, jump to equivalent position in middle
      const actualIndex = newIndex % totalBranches
      
      if (newIndex < totalBranches || newIndex >= infiniteBranches.length - totalBranches) {
        requestAnimationFrame(() => {
          const jumpToIndex = startIndex + actualIndex
          setCurrentIndex(jumpToIndex)
          scrollToIndex(jumpToIndex, false)
        })
      }
    }, 200)
  }

  const nextSlide = () => {
    scrollToIndex(currentIndex + 1)
  }

  const prevSlide = () => {
    scrollToIndex(currentIndex - 1)
  }

  const handleCardClick = (branchId: string) => {
    // Toggle selection: if already selected, deselect it; otherwise select it
    if (selected === branchId) {
      onSelect(null as any) // Deselect
    } else {
      onSelect(branchId) // Select
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pilih Lokasi Gaming Center</h3>
        <p className="text-sm text-muted-foreground">Temukan cabang terdekat dengan fasilitas terbaik</p>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative pt-8 pb-24 mt-12 mb-12">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pt-6"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollPaddingInline: 'calc(50% - 130px)',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {infiniteBranches.map((branch, index) => {
            const isSelected = selected === branch.id
            const isCurrent = index === currentIndex
            
            return (
              <div 
                key={`${branch.id}-${index}`} 
                className="flex-shrink-0 w-[260px] h-[390px] snap-center first:ml-[calc(50%-130px)] last:mr-[calc(50%-130px)]"
              >
                <Card
                  className={`cursor-pointer transition-all duration-700 ease-out overflow-hidden h-full rounded-3xl backdrop-blur-md ${
                    isSelected 
                      ? "ring-2 ring-primary/60 shadow-2xl border-primary/40 -translate-y-3 bg-primary/5" 
                      : "shadow-lg hover:shadow-2xl hover:-translate-y-2 border-border/40 bg-card/60 hover:bg-card/80"
                  } ${isCurrent ? '-translate-y-3 shadow-2xl scale-105' : 'scale-100'}`}
                  onClick={() => handleCardClick(branch.id)}
                >
                  <CardContent className="p-0 relative h-full flex flex-col">
                    {/* Branch Image - 60% height (4:6 ratio) */}
                    <div className="relative h-[234px] overflow-hidden bg-muted/30 rounded-t-3xl flex-shrink-0">
                      <Image 
                        src={branch.image} 
                        alt={branch.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out hover:scale-110"
                        sizes="100vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500" />
                      
                      {/* Shine effect on current card */}
                      {isCurrent && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                      )}
                    
                      {/* Top Info Overlay - Rating & Jam Buka */}
                      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 transition-all duration-500">
                        <div className="flex items-center gap-1.5 bg-yellow-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-yellow-500">
                          <Star className="w-3.5 h-3.5 text-white fill-white" />
                          <span className="text-xs font-bold text-white">{branch.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-500">
                          <Clock className="w-3.5 h-3.5 text-white" />
                          <span className="text-xs font-semibold text-white">{branch.openHours}</span>
                        </div>
                      </div>

                      {branch.popular && (
                        <div className="absolute top-14 left-3 z-10 animate-bounce-subtle transition-all duration-500">
                          <Badge className="bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                            🔥 Populer
                          </Badge>
                        </div>
                      )}

                      {isSelected && (
                        <div className="absolute bottom-3 right-3 z-10 transition-all duration-500 animate-pulse-slow">
                          <div className="w-10 h-10 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg shadow-primary/50 hover:scale-110 transition-all duration-300">
                            <Check className="w-6 h-6 text-white font-bold" />
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 z-10 transition-all duration-500">
                        <Badge
                          variant="outline"
                          className={`px-3 py-1.5 text-sm font-semibold backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105 ${
                            branch.status === "open" 
                              ? "text-white border-white/30 bg-green-500/90 shadow-lg shadow-green-500/30" 
                              : "text-white border-white/30 bg-red-500/90 shadow-lg shadow-red-500/30"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 bg-white animate-pulse`} />
                          {branch.status === "open" ? "Buka" : "Tutup"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content - 40% height */}
                    <div className="p-3 bg-card/60 backdrop-blur-sm flex-1 flex flex-col h-[156px] transition-all duration-500 rounded-b-3xl">
                      <div className="flex-1 overflow-hidden">
                        <h4 className="font-bold text-foreground text-sm mb-1.5 line-clamp-1 transition-colors duration-300">
                          {branch.name}
                        </h4>
                        <div className="flex items-start gap-1.5 mb-2 transition-all duration-300">
                          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 hover:scale-110" />
                          <span className="text-[11px] text-muted-foreground line-clamp-2 leading-tight transition-colors duration-300">
                            {branch.address}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {branch.facilities.slice(0, 3).map((facility, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary/20"
                            >
                              {facility}
                            </Badge>
                          ))}
                          {branch.facilities.length > 3 && (
                            <Badge 
                              variant="secondary" 
                              className="text-[9px] px-1.5 py-0.5 bg-muted/60 text-muted-foreground rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                              +{branch.facilities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="transition-all duration-300">
                        {isSelected ? (
                          <div className="flex items-center justify-center gap-1.5 text-primary transition-all duration-300 animate-pulse-slow">
                            <Check className="w-3.5 h-3.5 transition-transform duration-300" />
                            <p className="text-xs font-semibold">Terpilih</p>
                          </div>
                        ) : (
                          <p className="text-xs text-center text-muted-foreground transition-all duration-300 hover:text-primary">
                            Tap untuk pilih
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-[45%] -translate-y-1/2 z-30 w-14 h-14 bg-card/70 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-500 ease-out group border border-border/40 hover:border-primary/60"
          aria-label="Previous branch"
        >
          <ChevronLeft className="w-7 h-7 text-foreground group-hover:text-white transition-all duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-[45%] -translate-y-1/2 z-30 w-14 h-14 bg-card/70 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-500 ease-out group border border-border/40 hover:border-primary/60"
          aria-label="Next branch"
        >
          <ChevronRight className="w-7 h-7 text-foreground group-hover:text-white transition-all duration-300" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center space-x-3 mt-6">
          {branches.map((_, index) => {
            const actualIndex = currentIndex % totalBranches
            return (
              <button
                key={index}
                onClick={() => scrollToIndex(totalBranches + index)}
                className={`transition-all duration-700 ease-out rounded-full backdrop-blur-sm ${
                  index === actualIndex 
                    ? 'w-10 h-3 bg-gradient-to-r from-primary/90 to-blue-500/90 shadow-lg shadow-primary/40 scale-110' 
                    : 'w-3 h-3 bg-muted/60 hover:bg-primary/60 hover:w-6 hover:scale-110'
                }`}
                aria-label={`Go to branch ${index + 1}`}
              />
            )
          })}
        </div>

        {/* Swipe Hint */}
        <div className="flex items-center justify-center mt-5 text-xs text-muted-foreground transition-all duration-500">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 backdrop-blur-md rounded-full shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-500">
            <ChevronLeft className="w-4 h-4 animate-bounce-left text-primary" />
            <span className="font-medium">Geser untuk melihat cabang lain</span>
            <ChevronRight className="w-4 h-4 animate-bounce-right text-primary" />
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {branches.map((branch) => {
          const isSelected = selected === branch.id

          return (
            <Card
              key={branch.id}
              className={`group cursor-pointer transition-all duration-700 ease-out overflow-hidden rounded-3xl backdrop-blur-md ${
                isSelected 
                  ? "ring-2 ring-primary/60 shadow-2xl border-primary/40 -translate-y-3 scale-105 bg-primary/5" 
                  : "hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] border-border/40 bg-card/60 hover:bg-card/80"
              }`}
              onClick={() => handleCardClick(branch.id)}
            >
              <CardContent className="p-0 relative">
                {/* Branch Image */}
                <div className="relative h-40 md:h-48 overflow-hidden bg-muted/30 rounded-t-3xl">
                  <Image 
                    src={branch.image} 
                    alt={branch.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500" />
                
                  {/* Popular Badge */}
                  {branch.popular && (
                    <div className="absolute top-3 left-3 z-10 transition-all duration-500">
                      <Badge className="bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                        🔥 Populer
                      </Badge>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 transition-all duration-500">
                      <div className="w-9 h-9 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-all duration-300">
                        <Check className="w-5 h-5 text-white font-bold" />
                      </div>
                    </div>
                  )}

                  {/* Status Badge on Image */}
                  <div className="absolute bottom-3 right-3 z-10 transition-all duration-500">
                    <Badge
                      variant="outline"
                      className={`px-3 py-1.5 text-xs font-semibold backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105 ${
                        branch.status === "open" 
                          ? "text-white border-white/30 bg-green-500/90 shadow-lg" 
                          : "text-white border-white/30 bg-red-500/90 shadow-lg"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-white animate-pulse`} />
                      {branch.status === "open" ? "Buka" : "Tutup"}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-card/60 backdrop-blur-sm transition-all duration-500">
                  {/* Branch Name & Address */}
                  <div className="mb-3">
                    <h4 className="font-bold text-foreground text-sm md:text-base mb-1.5 group-hover:text-primary transition-all duration-300 line-clamp-1">
                      {branch.name}
                    </h4>
                    <div className="flex items-center space-x-1.5 text-xs text-muted-foreground transition-all duration-300">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                      <span className="line-clamp-1 transition-colors duration-300">{branch.address}</span>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex flex-col items-center bg-muted/40 backdrop-blur-sm rounded-2xl p-2 transition-all duration-300 hover:scale-105 hover:bg-muted/60">
                      <Star className="w-4 h-4 text-yellow-600 fill-current mb-1 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="text-xs font-semibold text-foreground">{branch.rating}/5</p>
                    </div>

                    <div className="flex flex-col items-center bg-muted/40 backdrop-blur-sm rounded-2xl p-2 transition-all duration-300 hover:scale-105 hover:bg-muted/60">
                      <Clock className="w-4 h-4 text-green-600 mb-1 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground">Jam Buka</p>
                      <p className="text-xs font-semibold text-foreground">{branch.openHours}</p>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground transition-colors duration-300">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.facilities.slice(0, 2).map((facility, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary/20"
                        >
                          {facility}
                        </Badge>
                      ))}
                      {branch.facilities.length > 2 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-2 py-1 bg-muted/60 text-muted-foreground rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                          +{branch.facilities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Selection Status */}
                  <div className="mt-3 pt-3 transition-all duration-300">
                    {isSelected ? (
                      <div className="flex items-center justify-center space-x-2 text-primary transition-all duration-300 animate-pulse-slow">
                        <Check className="w-4 h-4" />
                        <p className="text-xs font-semibold">Cabang dipilih</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground dark:text-gray-400 text-center group-hover:text-primary transition-colors">
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

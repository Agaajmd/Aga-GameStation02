"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star, Gamepad2 } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Static content - tidak berubah
  const heroContent = {
    title: "PlayStation Gaming Center Terbaik",
    subtitle: "Nikmati pengalaman gaming terbaik dengan konsol PlayStation terbaru dan fasilitas premium",
    primaryCta: "Booking Sekarang",
    secondaryCta: "Tonton Video"
  }

  const slides = [
    {
      image: "/Ps1.jpg",
      alt: "PlayStation Gaming Setup"
    },
    {
      image: "/ps2.jpg", 
      alt: "Gaming Console Collection"
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [isVisible, slides.length])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 gpu-accelerate"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 dark:from-primary/10 dark:to-purple-500/10" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)]" 
             style={{ backgroundSize: '100px 100px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Content Section */}
          <div
            className={`text-center transition-all duration-1000 mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 inline-flex rounded-full shadow-lg">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
              Gaming Center #1 di Indonesia
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight max-w-5xl mx-auto bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {heroContent.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">{heroContent.subtitle}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="gradient-primary text-white border-0 h-14 px-8 text-lg font-semibold shadow-2xl hover:shadow-primary/50 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Link href="/booking">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  {heroContent.primaryCta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/20 text-foreground hover:bg-primary/5 h-14 px-8 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                {heroContent.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Hero Image/Slider - Centered */}
          <div
            className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative mb-12 gpu-accelerate">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                {!isImageLoaded && (
                  <div className="absolute inset-0 shimmer bg-muted" />
                )}
                <Image
                  src={slides[currentSlide].image || "/Ps1.jpg"}
                  alt={slides[currentSlide].alt || "Gaming Setup"}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px"
                  className={`object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "w-8 bg-white shadow-lg" : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

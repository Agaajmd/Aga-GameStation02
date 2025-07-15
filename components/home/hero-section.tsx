"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star, Users, Calendar, Trophy, Gamepad2, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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

  const stats = [
    { icon: Users, label: "Member Aktif", value: "10K+", color: "text-blue-500" },
    { icon: Calendar, label: "Booking Harian", value: "500+", color: "text-green-500" },
    { icon: Trophy, label: "Turnamen", value: "50+", color: "text-yellow-500" },
    { icon: Star, label: "Rating", value: "4.9", color: "text-purple-500" },
  ]

  const features = [
    { icon: Gamepad2, title: "PlayStation 5 Terbaru", desc: "Konsol gaming terdepan" },
    { icon: Zap, title: "Internet Super Cepat", desc: "Koneksi 1Gbps tanpa lag" },
    { icon: Shield, title: "Lingkungan Aman", desc: "CCTV 24/7 & keamanan terjamin" },
    { icon: Clock, title: "Buka 24 Jam", desc: "Gaming kapan saja sesuai keinginan" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-gray-900">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-gray-900/98 to-slate-900/95" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)]" 
             style={{ backgroundSize: '50px 50px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Content Section */}
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge variant="secondary" className="mb-4 lg:mb-6 bg-white/10 text-white border-white/20 inline-flex">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Gaming Center #1 di Indonesia
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight max-w-6xl mx-auto">
              {heroContent.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">{heroContent.subtitle}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 lg:mb-20">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 text-base sm:text-lg lg:text-xl font-semibold shadow-2xl"
              >
                <Link href="/booking">
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                  {heroContent.primaryCta}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 text-base sm:text-lg lg:text-xl font-semibold bg-transparent"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                {heroContent.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Main Grid Layout for Desktop */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Side - Image and Features */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              {/* Hero Image/Slider */}
              <div className="relative mb-8 lg:mb-12">
                <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={slides[currentSlide].image || "/Ps1.jpg"}
                    alt={slides[currentSlide].alt || "Gaming Setup"}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full transition-all ${
                          index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-4 lg:p-6 text-center">
                      <feature.icon className={`w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-3 lg:mb-4 ${index < 2 ? 'text-blue-600' : 'text-purple-600'} group-hover:scale-110 transition-transform`} />
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-2">{feature.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-600">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Side - Stats and Additional Info */}
            <div
              className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-4 lg:p-6 text-center">
                      <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-3 ${stat.color}`} />
                      <div className="text-xl lg:text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs lg:text-sm text-white/70">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6 lg:mb-8">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Mengapa Pilih Kami?</h3>
                  <div className="space-y-4 lg:space-y-6">
                    {[
                      { icon: Gamepad2, title: "PS5 Terbaru", desc: "Grafis 4K Ray Tracing" },
                      { icon: Zap, title: "Internet 1Gbps", desc: "Zero Lag Gaming" },
                      { icon: Shield, title: "Keamanan 24/7", desc: "CCTV & Security" },
                      { icon: Clock, title: "Buka 24 Jam", desc: "Gaming Tanpa Batas" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm lg:text-base">{item.title}</h4>
                          <p className="text-white/70 text-xs lg:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

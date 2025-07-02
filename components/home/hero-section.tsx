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

  const slides = [
    {
      title: "PlayStation Gaming Center Terbaik",
      subtitle: "Nikmati pengalaman gaming terbaik dengan konsol PlayStation terbaru",
      image: "/Ps1.jpg",
      cta: "Booking Sekarang",
    },

    {
      title: "Promo Spesial Hari Ini",
      subtitle: "Dapatkan diskon hingga 50% untuk booking hari ini",
      image: "/ps2.jpg",
      cta: "Lihat Promo",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/Ps1.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 inline-flex">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Gaming Center #1 di Indonesia
          {/* Hero Image/Slider */}
          <div
            className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-lg lg:max-w-none">
              <img
                src={slides[currentSlide].image || "/Ps1.jpg"}
                alt="Gaming Setup"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Feature Cards - Hidden on small screens */}
            <div className="hidden sm:block">
              <div className="absolute -bottom-4 lg:-bottom-6 -left-3 lg:-left-6 right-3 lg:right-6 grid grid-cols-2 gap-2 lg:gap-3">
                {features.slice(0, 2).map((feature, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-3 lg:p-4">
                      <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-gray-900 text-xs lg:text-sm">{feature.title}</h3>
                      <p className="text-xs text-gray-600 hidden lg:block">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="absolute -top-4 lg:-top-6 -right-3 lg:-right-6 left-3 lg:left-6 grid grid-cols-2 gap-2 lg:gap-3">
                {features.slice(2, 4).map((feature, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-3 lg:p-4">
                      <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-gray-900 text-xs lg:text-sm">{feature.title}</h3>
                      <p className="text-xs text-gray-600 hidden lg:block">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">{slides[currentSlide].subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold shadow-2xl"
              >
                <Link href="/booking">
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-transparent"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Tonton Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:max-w-none lg:mx-0">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${stat.color}`} />
                    <div className="text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


          {/* Mobile Feature Cards - Visible only on small screens */}
          <div className="sm:hidden mt-6">
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-3 text-center">
                    <feature.icon className={`w-6 h-6 mx-auto mb-2 ${index < 2 ? 'text-blue-600' : 'text-purple-600'}`} />
                    <h3 className="font-semibold text-gray-900 text-xs">{feature.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

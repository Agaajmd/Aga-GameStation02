"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Users, Clock, Gamepad2, Trophy, Zap, Shield, Heart } from "lucide-react"
import Link from "next/link"

export function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const categories = [
    {
      id: 1,
      title: "PlayStation 5",
      description: "Konsol gaming terbaru dengan grafis 4K dan ray tracing",
      image: "/imgVIP1.jpg",
      price: "Rp 15.000/jam",
      originalPrice: "Rp 20.000/jam",
      discount: "25%",
      rating: 4.9,
      reviews: 1250,
      features: ["4K Gaming", "Ray Tracing", "SSD Ultra Cepat", "DualSense Controller"],
      popular: true,
      available: 8,
    },
    {
      id: 2,
      title: "PlayStation 4 Pro",
      description: "Gaming berkualitas tinggi dengan harga terjangkau",
      image: "/imgVIP2.jpg",
      price: "Rp 10.000/jam",
      originalPrice: "Rp 12.000/jam",
      discount: "17%",
      rating: 4.7,
      reviews: 890,
      features: ["1080p Gaming", "HDR Support", "Boost Mode", "Wireless Controller"],
      popular: false,
      available: 12,
    },
    {
      id: 3,
      title: "PlayStation VR",
      description: "Pengalaman gaming virtual reality yang menakjubkan",
      image: "/imgVIP3.jpg",
      price: "Rp 25.000/jam",
      originalPrice: "Rp 30.000/jam",
      discount: "17%",
      rating: 4.8,
      reviews: 650,
      features: ["VR Gaming", "360° Experience", "Motion Controllers", "Immersive Audio"],
      popular: false,
      available: 4,
    },
    {
      id: 4,
      title: "Gaming Tournament",
      description: "Ikuti turnamen mingguan dan menangkan hadiah menarik",
      image: "/imgVIP4.jpg",
      price: "Rp 50.000/entry",
      originalPrice: "Rp 75.000/entry",
      discount: "33%",
      rating: 4.9,
      reviews: 420,
      features: ["Prize Pool 10 Juta", "Weekly Tournament", "Ranking System", "Live Streaming"],
      popular: true,
      available: 24,
    },
  ]

  const stats = [
    { icon: Users, label: "Total Pemain", value: "15,000+", color: "text-blue-500" },
    { icon: Gamepad2, label: "Konsol Tersedia", value: "50+", color: "text-green-500" },
    { icon: Trophy, label: "Turnamen Bulanan", value: "12+", color: "text-yellow-500" },
    { icon: Star, label: "Rating Rata-rata", value: "4.8/5", color: "text-purple-500" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("category-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section
      id="category-section"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="secondary" className="mb-4 lg:mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 inline-flex text-sm lg:text-base">
            <Gamepad2 className="w-4 h-4 mr-1" />
            Kategori Gaming
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 px-4">
            Pilih Pengalaman Gaming Terbaik
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Dari PlayStation terbaru hingga turnamen kompetitif, temukan pengalaman gaming yang sesuai dengan passion
            Anda
          </p>
        </div>

        {/* Main Slider */}
        <div
          className={`relative mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => (
                <div key={category.id} className="w-full flex-shrink-0">
                  <Card className="mx-1 sm:mx-2 lg:mx-3 overflow-hidden border-0 shadow-xl sm:shadow-2xl lg:shadow-3xl bg-white dark:bg-gray-800">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5]">
                        <Image
                          src={category.image || "/imgVIP1.jpg"}
                          alt={category.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 flex flex-wrap gap-1 sm:gap-2">
                          {category.popular && (
                            <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs sm:text-sm">
                              <Heart className="w-3 h-3 mr-1" />
                              Populer
                            </Badge>
                          )}
                          {category.discount && (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs sm:text-sm">-{category.discount} OFF</Badge>
                          )}
                        </div>

                        {/* Availability */}
                        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6">
                          <Badge variant="secondary" className="bg-white/95 text-gray-900 border-0 text-xs sm:text-sm">
                            <Zap className="w-3 h-3 mr-1 text-green-500" />
                            {category.available} Unit Tersedia
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12 2xl:p-16 flex flex-col justify-center">
                        <div className="mb-4 sm:mb-6 lg:mb-8">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4">
                            {category.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 lg:mb-6">{category.description}</p>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                                    i < Math.floor(category.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 dark:text-white">{category.rating}</span>
                            <span className="text-xs sm:text-sm lg:text-base text-gray-500">({category.reviews} ulasan)</span>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 lg:gap-3 mb-4 sm:mb-6 lg:mb-8">
                            {category.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300">
                                <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 text-green-500 flex-shrink-0" />
                                <span className="truncate">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                            <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 dark:text-blue-400">
                              {category.price}
                            </span>
                            {category.originalPrice && (
                              <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-500 line-through">{category.originalPrice}</span>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                            <Button
                              asChild
                              size="lg"
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold shadow-lg"
                            >
                              <Link href="/booking">
                                <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                                Booking Sekarang
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="lg" 
                              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold"
                            >
                              <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                              Lihat Jadwal
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white border-gray-200 text-gray-700 hover:text-gray-900 shadow-lg z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white border-gray-200 text-gray-700 hover:text-gray-900 shadow-lg z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            onClick={nextSlide}
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </Button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 space-x-1 sm:space-x-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 sm:h-3 lg:h-4 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-blue-600 w-6 sm:w-8 lg:w-10" 
                    : "bg-gray-300 hover:bg-gray-400 w-2 sm:w-3 lg:w-4"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-3 sm:p-4 lg:p-6 xl:p-8 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto mb-2 sm:mb-3 lg:mb-4 ${stat.color}`} />
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

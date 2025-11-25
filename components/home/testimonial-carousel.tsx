"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ahmad Rizki",
    rating: 5,
    comment: "Tempat gaming terbaik! PS5 nya lancar banget, kursi nyaman, dan pelayanan ramah. Pasti balik lagi!",
    category: "VIP",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Sari Dewi",
    rating: 5,
    comment: "Fasilitas VVIP nya amazing! Ruang privat, snack enak, dan game koleksinya lengkap. Worth it banget!",
    category: "VVIP",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Budi Santoso",
    rating: 5,
    comment: "Harga terjangkau tapi kualitas premium. Booking online juga gampang, ga perlu antri. Recommended!",
    category: "Reguler",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Maya Putri",
    rating: 5,
    comment: "Staff nya helpful banget, tempat bersih, dan AC dingin. Perfect buat hangout sama temen-temen!",
    category: "VIP",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000) // Increase to 8s to reduce re-renders

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Apa Kata <span className="text-primary">Pelanggan</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Ribuan pelanggan telah merasakan pengalaman gaming terbaik bersama kami
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop View - Show 2 testimonials */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .concat(testimonials.slice(0, Math.max(0, currentIndex + 2 - testimonials.length)))
              .map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
          </div>

          {/* Tablet View - Show 1 testimonial centered */}
          <div className="hidden md:block lg:hidden max-w-2xl mx-auto">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Mobile View - Show 1 testimonial */}
          <div className="md:hidden">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-6 sm:w-8" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2 sm:w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-scale-in border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-primary opacity-20">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        </div>

        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 overflow-hidden relative border-2 border-gray-200 dark:border-gray-600">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">{testimonial.name}</h4>
            <span className="text-xs sm:text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-full inline-block mt-1">
              {testimonial.category}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-3 sm:mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            ({testimonial.rating}/5)
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          "{testimonial.comment}"
        </p>

        {/* Decorative gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </CardContent>
    </Card>
  )
}

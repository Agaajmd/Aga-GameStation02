"use client"

import { useState, useEffect } from "react"
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
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apa Kata <span className="text-primary">Pelanggan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ribuan pelanggan telah merasakan pengalaman gaming terbaik bersama kami
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop View - Show 2 testimonials */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .concat(testimonials.slice(0, Math.max(0, currentIndex + 2 - testimonials.length)))
              .map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
          </div>

          {/* Mobile View - Show 1 testimonial */}
          <div className="md:hidden">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
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
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-scale-in">
      <CardContent className="p-8">
        <div className="absolute top-4 right-4 text-primary opacity-20">
          <Quote className="w-12 h-12" />
        </div>

        <div className="flex items-center mb-6">
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <span className="text-sm text-primary font-medium">{testimonial.category}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
      </CardContent>
    </Card>
  )
}

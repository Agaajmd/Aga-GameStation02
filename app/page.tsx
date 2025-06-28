"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { CategorySlider } from "@/components/home/category-slider"
import { PromoSection } from "@/components/home/promo-section"
import { ContactSection } from "@/components/home/contact-section"
import { TestimonialCarousel } from "@/components/home/testimonial-carousel"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>

        {/* Category Skeleton */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Promo Skeleton */}
        <div className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CategorySlider />
      <PromoSection />
      <TestimonialCarousel />
      <ContactSection />
    </div>
  )
}

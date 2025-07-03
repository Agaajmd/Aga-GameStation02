"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { CategorySlider } from "@/components/home/category-slider"
import { AnnouncementSection } from "@/components/home/announcement-section"
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Skeleton className="h-12 sm:h-16 lg:h-20 w-3/4 mx-auto mb-4 sm:mb-6" />
            <Skeleton className="h-4 sm:h-6 w-1/2 mx-auto mb-6 sm:mb-8" />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Skeleton className="h-10 sm:h-12 w-32 sm:w-40" />
              <Skeleton className="h-10 sm:h-12 w-32 sm:w-40" />
            </div>
          </div>
        </div>

        {/* Category Skeleton */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-6 sm:h-8 w-48 sm:w-64 mx-auto mb-8 sm:mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 sm:h-64 lg:h-72 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Promo Skeleton */}
        <div className="py-12 sm:py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-6 sm:h-8 w-40 sm:w-48 mx-auto mb-8 sm:mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 sm:h-80 lg:h-96 rounded-lg" />
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
      <AnnouncementSection />
      <TestimonialCarousel />
      <ContactSection />
    </div>
  )
}

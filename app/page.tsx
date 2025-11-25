"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/home/hero-section"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load below-the-fold components to reduce initial mobile bundle
const CategorySlider = dynamic(() => import("@/components/home/category-slider").then((mod) => mod.CategorySlider), {
  ssr: false,
  loading: () => <Skeleton className="h-48" />,
})
const AnnouncementSection = dynamic(() => import("@/components/home/announcement-section").then((mod) => mod.AnnouncementSection), {
  ssr: false,
  loading: () => <Skeleton className="h-32" />,
})
const TestimonialCarousel = dynamic(() => import("@/components/home/testimonial-carousel").then((mod) => mod.TestimonialCarousel), {
  ssr: false,
  loading: () => <Skeleton className="h-48" />,
})
const ContactSection = dynamic(() => import("@/components/home/contact-section").then((mod) => mod.ContactSection), {
  ssr: false,
  loading: () => <Skeleton className="h-32" />,
})

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
        {/* Hero Skeleton */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <Skeleton className="h-12 sm:h-16 lg:h-20 w-3/4 mx-auto bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <Skeleton className="h-4 sm:h-6 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
                <Skeleton className="h-12 w-36 bg-blue-200 dark:bg-blue-800 rounded-lg" />
                <Skeleton className="h-12 w-36 bg-purple-200 dark:bg-purple-800 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Skeleton */}
        <div className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64 mx-auto mb-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcement Skeleton */}
        <div className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-48 mx-auto mb-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-56 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Skeleton */}
        <div className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-56 mx-auto mb-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Contact Skeleton */}
        <div className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-40 mx-auto mb-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="max-w-2xl mx-auto space-y-6">
              <Skeleton className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <Skeleton className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="bg-background dark:bg-gray-900 transition-colors duration-500">
        <CategorySlider />
      </div>
      
      <div className="bg-muted/30 dark:bg-gray-800 transition-colors duration-500">
        <AnnouncementSection />
      </div>
      
      <div className="bg-background dark:bg-gray-900 transition-colors duration-500">
        <TestimonialCarousel />
      </div>
      
      <div className="bg-muted/30 dark:bg-gray-800 transition-colors duration-500">
        <ContactSection />
      </div>
    </div>
  )
}

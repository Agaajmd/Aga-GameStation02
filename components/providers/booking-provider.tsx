"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface BookingItem {
  id: string
  branch: string
  category: string
  option: string
  date: string
  timeSlot: string
  duration: number
  price: number
}

interface BookingContextType {
  cart: BookingItem[]
  addToCart: (item: BookingItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  getTotalPrice: () => number
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<BookingItem[]>(() => {
    // Initialize cart from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('bookingCart')
      if (savedCart) {
        try {
          return JSON.parse(savedCart)
        } catch {
          return []
        }
      }
    }
    return []
  })

  const addToCart = (item: BookingItem) => {
    setCart((prev) => {
      const updated = [...prev, item]
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookingCart', JSON.stringify(updated))
      }
      return updated
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookingCart', JSON.stringify(updated))
      }
      return updated
    })
  }

  const clearCart = () => {
    setCart([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bookingCart')
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  return (
    <BookingContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

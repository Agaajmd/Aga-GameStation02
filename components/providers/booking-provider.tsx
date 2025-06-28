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
  const [cart, setCart] = useState<BookingItem[]>([])

  const addToCart = (item: BookingItem) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
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
